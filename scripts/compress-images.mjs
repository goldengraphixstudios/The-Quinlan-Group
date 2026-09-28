/**
 * One-off image optimiser.
 *
 * Resizes oversized source images and recompresses them. Photographic PNGs
 * with no alpha channel are converted to JPEG (they were costing megabytes
 * for no reason); the script rewrites the matching import paths in src/ so
 * nothing breaks.
 *
 *   node scripts/compress-images.mjs          # report only
 *   node scripts/compress-images.mjs --write  # apply
 */
import { readdir, readFile, writeFile, stat, unlink } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'src')
const MAX_W = 1900
const JPEG_Q = 82
const APPLY = process.argv.includes('--write')

const mb = (n) => `${(n / 1048576).toFixed(2)}MB`

async function walk(dir) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(p)))
    else if (/\.(png|jpe?g)$/i.test(e.name)) out.push(p)
  }
  return out
}

async function sourceFiles(dir = SRC) {
  const out = []
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await sourceFiles(p)))
    else if (/\.(jsx?|css)$/.test(e.name)) out.push(p)
  }
  return out
}

const files = [
  ...(await walk(path.join(SRC, 'assets'))),
  ...(await walk(path.join(ROOT, 'public'))),
]

let before = 0
let after = 0
const renames = []

for (const file of files) {
  const orig = (await stat(file)).size
  before += orig

  // Read into memory first: on Windows sharp keeps a handle on the source
  // file, which blocks writing the optimised version back out.
  const input = await readFile(file)
  const meta = await sharp(input, { failOn: 'none' }).metadata()
  const isPng = meta.format === 'png'
  // Only convert PNGs that carry no transparency — logos keep their alpha.
  const toJpeg = isPng && !meta.hasAlpha

  const pipeline = sharp(input, { failOn: 'none' }).rotate()
  if (meta.width > MAX_W) pipeline.resize({ width: MAX_W, withoutEnlargement: true })

  const buf = toJpeg
    ? await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toBuffer()
    : isPng
      ? await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_Q, mozjpeg: true }).toBuffer()

  // Never let "optimisation" make a file larger.
  if (buf.length >= orig && !toJpeg) {
    after += orig
    continue
  }

  const target = toJpeg ? file.replace(/\.png$/i, '.jpg') : file
  after += buf.length

  const label = path.relative(ROOT, file).replace(/\\/g, '/')
  console.log(
    `${label}\n  ${mb(orig)} -> ${mb(buf.length)}` +
      (toJpeg ? '  (png -> jpg)' : '') +
      (meta.width > MAX_W ? `  (${meta.width}px -> ${MAX_W}px)` : '')
  )

  if (APPLY) {
    await writeFile(target, buf)
    if (target !== file) {
      await unlink(file)
      renames.push([path.basename(file), path.basename(target)])
    }
  }
}

if (APPLY && renames.length) {
  const srcs = await sourceFiles()
  for (const f of srcs) {
    let text = await readFile(f, 'utf8')
    const orig = text
    for (const [from, to] of renames) {
      text = text.split(from).join(to)
    }
    if (text !== orig) {
      await writeFile(f, text)
      console.log(`updated refs: ${path.relative(ROOT, f).replace(/\\/g, '/')}`)
    }
  }
}

console.log(
  `\nTotal ${mb(before)} -> ${mb(after)}  (saved ${mb(before - after)}, ` +
    `${Math.round((1 - after / before) * 100)}%)`
)
if (!APPLY) console.log('\nDry run. Re-run with --write to apply.')
