import { useEffect, useState } from 'react'
import { openToken } from './crypto'
import { loadAuthRecord, writeSession } from './session'

/**
 * Sign-in is email + password. Nothing else.
 *
 * The password is never stored or compared against anything — it is the key
 * that decrypts the GitHub token the CMS commits with. AES-GCM is
 * authenticated, so a wrong password fails to decrypt rather than returning
 * garbage. Typing it correctly *is* the check.
 *
 * The record is seeded once by scripts/set-admin.mjs.
 */
export default function AuthGate({ onAuth }) {
  const [record, setRecord] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadAuthRecord().then(setRecord)
  }, [])

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (username.trim().toLowerCase() !== record.username) {
        throw new Error('Incorrect email or password.')
      }
      const token = await openToken(record, password)
      writeSession(token)
      onAuth(token)
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="a-login">
      {!record && <p className="a-empty">Loading…</p>}

      {record && !record.configured && (
        <div className="a-login-card">
          <p className="a-eyebrow">The Quinlan Group</p>
          <h1>Not set up yet</h1>
          <p className="a-login-sub">
            Sign-in has not been configured. Run this once from the project folder, then commit
            and push:
          </p>
          <pre className="a-code">GITHUB_TOKEN=github_pat_xxx node scripts/set-admin.mjs</pre>
        </div>
      )}

      {record?.configured && (
        <form className="a-login-card" onSubmit={submit}>
          <p className="a-eyebrow">The Quinlan Group</p>
          <h1>Content Manager</h1>
          <p className="a-login-sub">Sign in to edit articles, closings, and news.</p>

          <label className="a-label" htmlFor="u">Email</label>
          <input
            id="u"
            className="a-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="username"
            autoFocus
          />

          <label className="a-label" htmlFor="p">Password</label>
          <input
            id="p"
            className="a-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />

          {error && <p className="a-error">{error}</p>}

          <button className="a-btn a-btn--primary" disabled={busy || !username || !password}>
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      )}
    </div>
  )
}
