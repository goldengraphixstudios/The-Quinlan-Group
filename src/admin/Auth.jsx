import { useEffect, useState } from 'react'
import { openToken, passwordProblem, sealToken } from './crypto'
import { verifyToken, writeBinary, encodeBase64 } from './github'
import { loadAuthRecord, writeSession } from './session'

const AUTH_FILE = 'public/admin-auth.json'

/* ----------------------------------------------------------------- setup -- */

/**
 * One-time setup. Takes a GitHub token once, encrypts it under the chosen
 * password, and commits the result. After this nobody needs the token again —
 * they sign in with username and password.
 */
function Setup({ onDone }) {
  const [username, setUsername] = useState('bryan')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [token, setTok] = useState('')
  const [busy, setBusy] = useState('')
  const [error, setError] = useState('')

  const weak = password ? passwordProblem(password) : null

  async function submit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) return setError('Passwords do not match.')
    if (weak) return setError(weak)

    try {
      setBusy('Checking token…')
      await verifyToken(token.trim())

      setBusy('Encrypting…')
      const record = await sealToken(username.trim().toLowerCase(), password, token.trim())

      setBusy('Saving…')
      await writeBinary(
        token.trim(),
        AUTH_FILE,
        encodeBase64(JSON.stringify(record, null, 2) + '\n'),
        'Configure content manager sign-in'
      )

      setBusy('')
      onDone(
        'Account created. It goes live once the site finishes rebuilding — about a minute. ' +
          'You can sign in here after that.'
      )
    } catch (err) {
      setBusy('')
      setError(err.message)
    }
  }

  return (
    <form className="a-login-card" onSubmit={submit}>
      <p className="a-eyebrow">The Quinlan Group</p>
      <h1>Set up sign-in</h1>
      <p className="a-login-sub">
        One-time setup. You supply a GitHub token once; it gets encrypted with your password and
        stored. From then on it is just username and password.
      </p>

      <label className="a-label" htmlFor="su">Username</label>
      <input
        id="su"
        className="a-input"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />

      <label className="a-label" htmlFor="sp">Password</label>
      <input
        id="sp"
        className="a-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="new-password"
        placeholder="Long passphrase — 12+ characters"
      />
      {password && weak && <p className="a-hint a-hint--warn">{weak}</p>}
      {password && !weak && <p className="a-hint a-hint--ok">Strong enough.</p>}

      <label className="a-label" htmlFor="sc">Confirm password</label>
      <input
        id="sc"
        className="a-input"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        autoComplete="new-password"
      />

      <label className="a-label" htmlFor="st">GitHub token (this once only)</label>
      <input
        id="st"
        className="a-input"
        type="password"
        value={token}
        onChange={(e) => setTok(e.target.value)}
        placeholder="github_pat_…"
        autoComplete="off"
      />

      {error && <p className="a-error">{error}</p>}

      <button
        className="a-btn a-btn--primary"
        disabled={!!busy || !username.trim() || !password || !confirm || !token.trim()}
      >
        {busy || 'Create account'}
      </button>

      <details className="a-help">
        <summary>Where do I get the token?</summary>
        <ol>
          <li>
            <a
              href="https://github.com/settings/personal-access-tokens/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub → Fine-grained tokens → Generate new
            </a>
          </li>
          <li>
            <b>Repository access</b> → Only select repositories → <b>The-Quinlan-Group</b>
          </li>
          <li>
            <b>Permissions → Repository permissions → Contents</b> → <b>Read and write</b>
          </li>
        </ol>
        <p>
          The token is encrypted with your password before it is stored, so it is never readable
          from the site. Your password is never stored anywhere — losing it means redoing this
          setup with a fresh token.
        </p>
      </details>
    </form>
  )
}

/* ----------------------------------------------------------------- login -- */

function Login({ record, onAuth, notice }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      if (username.trim().toLowerCase() !== record.username) {
        throw new Error('Incorrect username or password.')
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
    <form className="a-login-card" onSubmit={submit}>
      <p className="a-eyebrow">The Quinlan Group</p>
      <h1>Content Manager</h1>
      <p className="a-login-sub">Sign in to edit articles, closings, and news.</p>

      {notice && <p className="a-hint a-hint--ok">{notice}</p>}

      <label className="a-label" htmlFor="u">Username</label>
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
  )
}

/* ----------------------------------------------------------------- gate -- */

export default function AuthGate({ onAuth }) {
  const [record, setRecord] = useState(null)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    loadAuthRecord().then(setRecord)
  }, [])

  return (
    <div className="a-login">
      {!record && <p className="a-empty">Loading…</p>}
      {record && !record.configured && <Setup onDone={setNotice} />}
      {record?.configured && <Login record={record} onAuth={onAuth} notice={notice} />}
    </div>
  )
}
