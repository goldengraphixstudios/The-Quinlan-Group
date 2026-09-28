/**
 * Password-based encryption for the stored GitHub token.
 *
 * Why this exists: the site is static, so the admin bundle and everything it
 * ships are public. A password *check* in client code is worthless on its own
 * — an attacker would ignore the check and read the GitHub token straight out
 * of the JS. So the token is never shipped in usable form. It is encrypted
 * with a key derived from the editor's password, and only a correct password
 * can produce it.
 *
 * What this does and does not buy you:
 *   - The ciphertext IS public (it lives in the repo). Anyone can download it.
 *   - Recovering the token therefore means guessing the password offline.
 *   - 600k PBKDF2 iterations make each guess expensive, but a short or common
 *     password will still fall. Use a long passphrase.
 */

const ITERATIONS = 600_000
const KEY_LEN = 256

const enc = new TextEncoder()
const dec = new TextDecoder()

const toB64 = (bytes) => btoa(String.fromCharCode(...new Uint8Array(bytes)))
const fromB64 = (b64) => Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))

async function deriveKey(password, salt, iterations = ITERATIONS) {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, [
    'deriveKey',
  ])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations, hash: 'SHA-256' },
    base,
    { name: 'AES-GCM', length: KEY_LEN },
    false,
    ['encrypt', 'decrypt']
  )
}

/** Encrypt the token. Returns the record that gets committed to the repo. */
export async function sealToken(username, password, token) {
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(token))

  return {
    configured: true,
    username,
    iterations: ITERATIONS,
    salt: toB64(salt),
    iv: toB64(iv),
    token: toB64(ct),
  }
}

/**
 * Recover the token from a password. AES-GCM is authenticated, so a wrong
 * password fails to decrypt rather than returning garbage — that is what
 * makes this a real check and not a cosmetic one.
 */
export async function openToken(record, password) {
  const key = await deriveKey(password, fromB64(record.salt), record.iterations ?? ITERATIONS)
  try {
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromB64(record.iv) },
      key,
      fromB64(record.token)
    )
    return dec.decode(plain)
  } catch {
    throw new Error('Incorrect username or password.')
  }
}

/** Rough strength gate — the ciphertext is public, so this is the real defence. */
export function passwordProblem(password) {
  if (password.length < 12) return 'Use at least 12 characters.'
  if (!/[^a-zA-Z]/.test(password)) return 'Add a number or symbol.'
  if (/^(password|letmein|admin|quinlan)/i.test(password)) return 'Too easy to guess.'
  return null
}
