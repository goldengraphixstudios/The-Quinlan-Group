import { useState, useEffect, useRef } from 'react'
import { news as ITEMS } from '../content'

export default function FloridaToast() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [idx, setIdx] = useState(0)
  const [out, setOut] = useState(false)
  const curIdx = useRef(0)

  useEffect(() => {
    if (!ITEMS.length) return
    if (sessionStorage.getItem('tqg_fl_dismissed')) return
    const timer = setTimeout(() => setVisible(true), 4000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!visible) return
    let alive = true
    const advance = () => {
      if (!alive) return
      setOut(true)
      setTimeout(() => {
        if (!alive) return
        curIdx.current = (curIdx.current + 1) % ITEMS.length
        setIdx(curIdx.current)
        setTimeout(() => { if (alive) setOut(false) }, 60)
      }, 380)
    }
    const id = setInterval(advance, 6000)
    return () => { alive = false; clearInterval(id) }
  }, [visible])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('tqg_fl_dismissed', '1')
    setTimeout(() => setVisible(false), 400)
  }

  if (!visible || !ITEMS.length) return null

  const item = ITEMS[idx]

  return (
    <div className={`fl-toast${dismissed ? ' fl-toast--out' : ''}`} role="status" aria-live="polite">
      <button className="fl-toast-close" type="button" onClick={dismiss} aria-label="Dismiss">✕</button>
      <div className={`fl-toast-img-wrap${out ? ' fl-toast-img-wrap--out' : ''}`}>
        <img src={item.img} alt={item.headline} className="fl-toast-img" />
      </div>
      <div className={`fl-toast-body${out ? ' fl-toast-body--out' : ''}`}>
        <p className="fl-toast-eyebrow">{item.eyebrow}</p>
        <p className="fl-toast-headline">{item.headline}</p>
        <p className="fl-toast-sub">{item.sub}</p>
        <a href={item.href} className="fl-toast-cta">{item.cta}</a>
      </div>
      <div className="fl-toast-dots" aria-hidden="true">
        {ITEMS.map((_, i) => (
          <span key={i} className={`fl-toast-dot${i === idx ? ' fl-toast-dot--active' : ''}`} />
        ))}
      </div>
    </div>
  )
}
