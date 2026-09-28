/**
 * One-off migration: lifts the hard-coded content arrays out of the JSX and
 * writes them to src/content/*.json, and copies the images they reference
 * into public/uploads/ so the CMS can add siblings at a stable URL.
 *
 * Bundled imports (src/assets) get content-hashed at build time, so a CMS
 * cannot add to them. Files under public/ are copied verbatim and keep the
 * path we store in the JSON.
 */
import { readFile, writeFile, mkdir, copyFile } from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const UPLOADS = path.join(ROOT, 'public', 'uploads')

await mkdir(path.join(ROOT, 'src', 'content'), { recursive: true })
await mkdir(UPLOADS, { recursive: true })

const home = await readFile(path.join(ROOT, 'src/pages/Home.jsx'), 'utf8')

// import postFoo from '../assets/social/post-foo.jpg'  ->  postFoo: 'uploads/post-foo.jpg'
const imageVars = {}
const copies = []
for (const m of home.matchAll(/import\s+(\w+)\s+from\s+'(\.\.\/assets\/[^']+)'/g)) {
  const [, name, rel] = m
  if (!/\.(png|jpe?g|webp)$/i.test(rel)) continue
  const base = path.basename(rel)
  imageVars[name] = `uploads/${base}`
  copies.push([path.join(ROOT, 'src', rel.replace('../', '')), path.join(UPLOADS, base)])
}

function extractArray(source, name) {
  const start = source.indexOf(`const ${name} = [`)
  if (start === -1) throw new Error(`array ${name} not found`)
  let i = source.indexOf('[', start)
  let depth = 0
  for (let j = i; j < source.length; j++) {
    if (source[j] === '[') depth++
    else if (source[j] === ']') {
      depth--
      if (depth === 0) return source.slice(i, j + 1)
    }
  }
  throw new Error(`unterminated array ${name}`)
}

const names = Object.keys(imageVars)
const evalArray = (literal) =>
  new Function(...names, `return ${literal}`)(...names.map((n) => imageVars[n]))

const dealPosts = evalArray(extractArray(home, 'dealPosts'))
const eduPosts = evalArray(extractArray(home, 'eduPosts'))

const today = '2026-09-28'

const articles = eduPosts.map((p, i) => ({
  id: p.id,
  title: p.article.title,
  image: p.img,
  intro: p.article.intro,
  sections: p.article.sections,
  cta: p.article.cta,
  published: true,
  date: today,
  order: i,
}))

const closings = dealPosts.map((p, i) => ({
  id: p.id,
  caption: p.caption,
  image: p.img,
  published: true,
  date: today,
  order: i,
}))

// The ticker (App.jsx NEWS) and the toast (FloridaToast ITEMS) were separate
// hard-coded lists describing the same three announcements. One record now
// feeds both: `text` drives the ticker, the rest drives the toast.
const news = [
  {
    id: 'n1',
    text: 'Now Licensed in Florida — Serving buyers, sellers & investors statewide',
    eyebrow: 'Expanding Coverage',
    headline: 'Now Licensed in Florida',
    sub: 'Serving buyers, sellers & investors in FL alongside RI, MA & CT.',
    cta: 'Connect With Us →',
    href: '#/contact',
    image: 'uploads/florida-license.jpg',
    published: true,
    date: today,
    order: 0,
  },
  {
    id: 'n2',
    text: 'Just Closed · 64 Westford Rd, Eastford CT — Rural CT property, precision closing',
    eyebrow: 'Just Closed',
    headline: '64 Westford Rd, Eastford CT',
    sub: 'Rural CT property closed with cross-state precision.',
    cta: 'View All Closings →',
    href: '#/listings',
    image: 'uploads/post-westford-closed.jpg',
    published: true,
    date: today,
    order: 1,
  },
  {
    id: 'n3',
    text: 'Just Closed · 58 Swan St, East Providence RI — Renovated Cape Cod, sold with strategy',
    eyebrow: 'Just Closed',
    headline: '58 Swan St, East Providence RI',
    sub: 'Renovated Cape Cod sold with targeted digital strategy.',
    cta: 'View All Closings →',
    href: '#/listings',
    image: 'uploads/post-swan-closed.jpg',
    published: true,
    date: today,
    order: 2,
  },
]

// florida-license lives outside Home.jsx's imports; copy it explicitly.
copies.push([
  path.join(ROOT, 'src/assets/florida-license.jpg'),
  path.join(UPLOADS, 'florida-license.jpg'),
])

for (const [from, to] of copies) {
  try {
    await copyFile(from, to)
  } catch (err) {
    console.warn(`skip ${path.basename(from)}: ${err.code}`)
  }
}

const write = (name, data) =>
  writeFile(path.join(ROOT, 'src/content', name), JSON.stringify(data, null, 2) + '\n')

await write('articles.json', articles)
await write('closings.json', closings)
await write('news.json', news)

console.log(
  `articles: ${articles.length}\nclosings: ${closings.length}\nnews: ${news.length}\n` +
    `images copied to public/uploads: ${copies.length}`
)
