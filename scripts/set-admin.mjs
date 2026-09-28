/**
 * Seeds the admin sign-in record once.
 *
 *   GITHUB_TOKEN=github_pat_xxx node scripts/set-admin.mjs
 *
 * Encrypts the token under the admin password and writes
 * public/admin-auth.json. The password itself is never written anywhere -
 * it is the decryption key, so typing it correctly is the check.
 *
 * Pass the token by environment variable, not as an argument, so it does
 * not land in shell history.
 */
import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { webcrypto as crypto } from 'node:crypto'

const USERNAME = 'bryanquinlan'
const PASSWORD = 'bryanq12345'
const ITERATIONS = 600_000

const token = process.env.GITHUB_TOKEN?.trim()
if (!token) {
  console.error(
    'No token.\n\n' +
      '  GITHUB_TOKEN=github_pat_xxx node scripts/set-admin.mjs\n\n' +
      'Create one at https://github.com/settings/personal-access-tokens/new\n' +
      '  Repository access -> Only select repositories -> The-Quinlan-Group\n' +
      '  Permissions -> Repository permissions -> Contents -> Read and write'
  )
  process.exit(1)
}

const enc = new TextEncoder()
const b64 = (b) => Buffer.from(b).toString('base64')

const salt = crypto.getRandomValues(new Uint8Array(16))
const iv = crypto.getRandomValues(new Uint8Array(12))

const base = await crypto.subtle.importKey('raw', enc.encode(PASSWORD), 'PBKDF2', false, [
  'deriveKey',
])
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  base,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt', 'decrypt']
)
const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(token))

const record = {
  configured: true,
  username: USERNAME,
  iterations: ITERATIONS,
  salt: b64(salt),
  iv: b64(iv),
  token: b64(ct),
}

const out = path.join(import.meta.dirname, '..', 'public', 'admin-auth.json')
await writeFile(out, JSON.stringify(record, null, 2) + '\n')

console.log(`Wrote public/admin-auth.json for "${USERNAME}".`)
console.log('Commit and push; sign-in works once the deploy finishes.')
