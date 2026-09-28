/**
 * Where the published auth record lives, and how a signed-in session is kept.
 *
 * The decrypted GitHub token is held in sessionStorage, not localStorage: it
 * dies with the tab, so a shared or public machine does not stay signed in.
 */

const SESSION_KEY = 'tqg_admin_session'

const authUrl = () => `${import.meta.env.BASE_URL}admin-auth.json?t=${Date.now()}`

export async function loadAuthRecord() {
  try {
    const res = await fetch(authUrl())
    if (!res.ok) return { configured: false }
    return await res.json()
  } catch {
    // A 404 on GitHub Pages serves HTML, which fails to parse - same meaning.
    return { configured: false }
  }
}

export function readSession() {
  try {
    return sessionStorage.getItem(SESSION_KEY) || ''
  } catch {
    return ''
  }
}

export function writeSession(token) {
  try {
    if (token) sessionStorage.setItem(SESSION_KEY, token)
    else sessionStorage.removeItem(SESSION_KEY)
  } catch {
    /* private browsing */
  }
}
