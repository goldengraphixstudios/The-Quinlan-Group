import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { actionsUrl, latestRun, readJson, writeJson } from './github'
import AuthGate from './Auth'
import { readSession, writeSession } from './session'
import ImageField from './ImageField'
import './admin.css'

const COLLECTIONS = {
  articles: {
    label: 'Articles',
    file: 'src/content/articles.json',
    titleOf: (i) => i.title || 'Untitled article',
    blank: () => ({
      id: `a${Date.now().toString(36)}`,
      title: '',
      image: '',
      intro: '',
      sections: [{ heading: '', body: '' }],
      cta: 'Book a Consultation',
      published: false,
      date: new Date().toISOString().slice(0, 10),
    }),
  },
  closings: {
    label: 'Closings',
    file: 'src/content/closings.json',
    titleOf: (i) => i.caption || 'Untitled closing',
    blank: () => ({
      id: `c${Date.now().toString(36)}`,
      caption: '',
      image: '',
      published: false,
      date: new Date().toISOString().slice(0, 10),
    }),
  },
  news: {
    label: 'News',
    file: 'src/content/news.json',
    titleOf: (i) => i.headline || i.text || 'Untitled news item',
    blank: () => ({
      id: `n${Date.now().toString(36)}`,
      text: '',
      eyebrow: '',
      headline: '',
      sub: '',
      cta: 'Learn More →',
      href: '#/contact',
      image: '',
      published: false,
      date: new Date().toISOString().slice(0, 10),
    }),
  },
}

/* ------------------------------------------------------------- editors -- */

function Field({ label, hint, children }) {
  return (
    <div className="a-field">
      <label className="a-label">{label}</label>
      {children}
      {hint && <p className="a-hint">{hint}</p>}
    </div>
  )
}

function ArticleForm({ item, set, token }) {
  const sections = item.sections || []
  const setSection = (i, patch) =>
    set({ sections: sections.map((s, j) => (j === i ? { ...s, ...patch } : s)) })

  return (
    <>
      <Field label="Title">
        <input
          className="a-input"
          value={item.title || ''}
          onChange={(e) => set({ title: e.target.value })}
          placeholder="How to Know When It's Time to Sell"
        />
      </Field>

      <ImageField token={token} value={item.image} onChange={(image) => set({ image })} />

      <Field label="Intro" hint="Shown on the card and at the top of the article.">
        <textarea
          className="a-input a-textarea"
          rows={3}
          value={item.intro || ''}
          onChange={(e) => set({ intro: e.target.value })}
        />
      </Field>

      <div className="a-subhead">
        <span>Sections</span>
        <button
          type="button"
          className="a-btn a-btn--quiet"
          onClick={() => set({ sections: [...sections, { heading: '', body: '' }] })}
        >
          + Add section
        </button>
      </div>

      {sections.map((s, i) => (
        <div className="a-section-card" key={i}>
          <div className="a-section-head">
            <span className="a-section-n">{String(i + 1).padStart(2, '0')}</span>
            <div className="a-section-tools">
              <button
                type="button"
                className="a-icon-btn"
                disabled={i === 0}
                title="Move up"
                onClick={() => {
                  const next = [...sections]
                  ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
                  set({ sections: next })
                }}
              >
                ↑
              </button>
              <button
                type="button"
                className="a-icon-btn"
                disabled={i === sections.length - 1}
                title="Move down"
                onClick={() => {
                  const next = [...sections]
                  ;[next[i + 1], next[i]] = [next[i], next[i + 1]]
                  set({ sections: next })
                }}
              >
                ↓
              </button>
              <button
                type="button"
                className="a-icon-btn a-icon-btn--danger"
                title="Delete section"
                onClick={() => set({ sections: sections.filter((_, j) => j !== i) })}
              >
                ✕
              </button>
            </div>
          </div>
          <input
            className="a-input"
            placeholder="Section heading"
            value={s.heading || ''}
            onChange={(e) => setSection(i, { heading: e.target.value })}
          />
          <textarea
            className="a-input a-textarea"
            rows={4}
            placeholder="Section body"
            value={s.body || ''}
            onChange={(e) => setSection(i, { body: e.target.value })}
          />
        </div>
      ))}

      <Field label="Call to action" hint="Button text at the end of the article.">
        <input
          className="a-input"
          value={item.cta || ''}
          onChange={(e) => set({ cta: e.target.value })}
        />
      </Field>
    </>
  )
}

function ClosingForm({ item, set, token }) {
  return (
    <>
      <Field label="Caption" hint="e.g. Just Closed · 58 Swan St, East Providence RI">
        <input
          className="a-input"
          value={item.caption || ''}
          onChange={(e) => set({ caption: e.target.value })}
        />
      </Field>
      <ImageField token={token} value={item.image} onChange={(image) => set({ image })} />
    </>
  )
}

function NewsForm({ item, set, token }) {
  return (
    <>
      <Field label="Ticker line" hint="The one-line version shown in the bar above the nav.">
        <input
          className="a-input"
          value={item.text || ''}
          onChange={(e) => set({ text: e.target.value })}
        />
      </Field>

      <div className="a-subhead">
        <span>Popup card</span>
      </div>

      <Field label="Eyebrow">
        <input
          className="a-input"
          placeholder="Just Closed"
          value={item.eyebrow || ''}
          onChange={(e) => set({ eyebrow: e.target.value })}
        />
      </Field>
      <Field label="Headline">
        <input
          className="a-input"
          value={item.headline || ''}
          onChange={(e) => set({ headline: e.target.value })}
        />
      </Field>
      <Field label="Supporting line">
        <textarea
          className="a-input a-textarea"
          rows={2}
          value={item.sub || ''}
          onChange={(e) => set({ sub: e.target.value })}
        />
      </Field>
      <ImageField token={token} value={item.image} onChange={(image) => set({ image })} />
      <div className="a-grid-2">
        <Field label="Button text">
          <input
            className="a-input"
            value={item.cta || ''}
            onChange={(e) => set({ cta: e.target.value })}
          />
        </Field>
        <Field label="Button link" hint="#/contact, #/listings, or a full URL.">
          <input
            className="a-input"
            value={item.href || ''}
            onChange={(e) => set({ href: e.target.value })}
          />
        </Field>
      </div>
    </>
  )
}

const FORMS = { articles: ArticleForm, closings: ClosingForm, news: NewsForm }

/* ---------------------------------------------------------------- shell -- */

export default function AdminApp() {
  const [token, setTok] = useState(readSession)
  const [tab, setTab] = useState('articles')
  // Keyed by tab, so switching collections shows "Loading…" without an
  // effect having to synchronously reset it.
  const [loaded, setLoaded] = useState({ tab: null, items: null, sha: null })
  const [selected, setSelected] = useState(null)
  const [dirty, setDirty] = useState(false)
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')
  const [run, setRun] = useState(null)

  const col = COLLECTIONS[tab]
  const items = loaded.tab === tab ? loaded.items : null
  const sha = loaded.sha

  const setItems = useCallback(
    (update) =>
      setLoaded((prev) => ({
        ...prev,
        items: typeof update === 'function' ? update(prev.items) : update,
      })),
    []
  )

  useEffect(() => {
    if (!token) return
    let cancelled = false
    ;(async () => {
      try {
        const { data, sha } = await readJson(token, COLLECTIONS[tab].file)
        if (cancelled) return
        setLoaded({
          tab,
          sha,
          items: data.slice().sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
        })
        setSelected(null)
        setDirty(false)
        setError('')
      } catch (err) {
        if (cancelled) return
        setLoaded({ tab, sha: null, items: [] })
        setError(err.message)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [token, tab])

  useEffect(() => {
    const warn = (e) => {
      if (!dirty) return
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const current = useMemo(
    () => (selected == null ? null : items?.[selected]),
    [items, selected]
  )

  const patch = (changes) => {
    setItems((list) => list.map((it, i) => (i === selected ? { ...it, ...changes } : it)))
    setDirty(true)
  }

  const move = (i, dir) => {
    setItems((list) => {
      const next = [...list]
      const j = i + dir
      if (j < 0 || j >= next.length) return list
      ;[next[i], next[j]] = [next[j], next[i]]
      return next
    })
    setSelected((s) => (s === i ? i + dir : s))
    setDirty(true)
  }

  async function save() {
    setStatus('Saving…')
    setError('')
    try {
      const ordered = items.map((it, i) => ({ ...it, order: i }))
      const newSha = await writeJson(
        token,
        col.file,
        ordered,
        sha,
        `Update ${tab} via content manager`
      )
      setLoaded({ tab, sha: newSha, items: ordered })
      setDirty(false)
      setStatus('Saved. The site rebuilds in about a minute.')
      setTimeout(() => latestRun(token).then(setRun), 4000)
    } catch (err) {
      setError(err.message)
      setStatus('')
    }
  }

  if (!token) return <AuthGate onAuth={setTok} />

  const Form = FORMS[tab]

  return (
    <div className="a-shell">
      <header className="a-top">
        <div className="a-top-left">
          <span className="a-eyebrow">Content Manager</span>
          <nav className="a-tabs">
            {Object.entries(COLLECTIONS).map(([key, c]) => (
              <button
                key={key}
                className={`a-tab${tab === key ? ' a-tab--on' : ''}`}
                onClick={() => {
                  if (dirty && !confirm('Discard unsaved changes?')) return
                  setTab(key)
                }}
              >
                {c.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="a-top-right">
          {dirty && <span className="a-dot" title="Unsaved changes" />}
          <button className="a-btn a-btn--primary" disabled={!dirty} onClick={save}>
            {dirty ? 'Publish changes' : 'Saved'}
          </button>
          <Link className="a-btn a-btn--quiet" to="/">
            View site
          </Link>
          <button
            className="a-btn a-btn--quiet"
            onClick={() => {
              if (dirty && !confirm('Discard unsaved changes?')) return
              writeSession('')
              setTok('')
            }}
          >
            Sign out
          </button>
        </div>
      </header>

      {(status || error || run) && (
        <div className={`a-banner${error ? ' a-banner--error' : ''}`}>
          {error || status}
          {run && !error && (
            <>
              {' '}
              <a href={run.url} target="_blank" rel="noopener noreferrer">
                Build {run.status === 'completed' ? run.conclusion : run.status} →
              </a>
            </>
          )}
          {!error && (
            <a href={actionsUrl} target="_blank" rel="noopener noreferrer" className="a-banner-link">
              Deploy log
            </a>
          )}
        </div>
      )}

      <div className="a-body">
        <aside className="a-list">
          <div className="a-list-head">
            <span>
              {items ? `${items.length} ${col.label.toLowerCase()}` : 'Loading…'}
            </span>
            <button
              className="a-btn a-btn--quiet"
              onClick={() => {
                setItems((l) => [...l, col.blank()])
                setSelected(items.length)
                setDirty(true)
              }}
              disabled={!items}
            >
              + New
            </button>
          </div>

          {items?.map((it, i) => (
            <div
              key={it.id || i}
              className={`a-row${selected === i ? ' a-row--on' : ''}`}
              onClick={() => setSelected(i)}
            >
              <div className="a-row-main">
                <span className="a-row-title">{col.titleOf(it)}</span>
                <span className={`a-pill${it.published ? ' a-pill--live' : ''}`}>
                  {it.published ? 'Live' : 'Draft'}
                </span>
              </div>
              <div className="a-row-tools" onClick={(e) => e.stopPropagation()}>
                <button className="a-icon-btn" disabled={i === 0} onClick={() => move(i, -1)}>
                  ↑
                </button>
                <button
                  className="a-icon-btn"
                  disabled={i === items.length - 1}
                  onClick={() => move(i, 1)}
                >
                  ↓
                </button>
              </div>
            </div>
          ))}

          {items?.length === 0 && <p className="a-empty">Nothing here yet.</p>}
        </aside>

        <main className="a-editor">
          {!current && <p className="a-empty">Select an item, or create a new one.</p>}

          {current && (
            <>
              <div className="a-editor-head">
                <label className="a-switch">
                  <input
                    type="checkbox"
                    checked={!!current.published}
                    onChange={(e) => patch({ published: e.target.checked })}
                  />
                  <span>{current.published ? 'Published' : 'Draft'}</span>
                </label>
                <div className="a-grow" />
                <input
                  type="date"
                  className="a-input a-input--date"
                  value={current.date || ''}
                  onChange={(e) => patch({ date: e.target.value })}
                />
                <button
                  className="a-btn a-btn--danger"
                  onClick={() => {
                    if (!confirm(`Delete "${col.titleOf(current)}"? This cannot be undone.`)) return
                    setItems((l) => l.filter((_, i) => i !== selected))
                    setSelected(null)
                    setDirty(true)
                  }}
                >
                  Delete
                </button>
              </div>

              <Form item={current} set={patch} token={token} />
            </>
          )}
        </main>
      </div>
    </div>
  )
}
