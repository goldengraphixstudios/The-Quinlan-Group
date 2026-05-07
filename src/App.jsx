import { useEffect, useRef, useState } from 'react'
import { HashRouter, NavLink, Route, Routes, Link } from 'react-router-dom'
import logo from './assets/logo.png'
import realLogo from './assets/real-broker-logo.jpg'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'
import ConsultPopup from './components/ConsultPopup'
import FloridaToast from './components/FloridaToast'

function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let frame = 0
    const move = (event) => {
      mouse.current.x = event.clientX
      mouse.current.y = event.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`
      }
    }
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`
      }
      frame = requestAnimationFrame(animate)
    }
    window.addEventListener('mousemove', move)
    frame = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  )
}

function MobileMenu({ open, setOpen }) {
  return (
    <>
      <button
        className={`hamburger${open ? ' open' : ''}`}
        type="button"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span /><span /><span />
      </button>
      {open && (
        <div className="mobile-nav" onClick={() => setOpen(false)}>
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/listings">Listings</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <Link className="btn primary mobile-nav-cta" to="/contact">Schedule a Consult</Link>
        </div>
      )}
    </>
  )
}

const NEWS = [
  { text: 'Now Licensed in Florida — Serving buyers, sellers & investors statewide', href: '#/contact' },
  { text: 'Just Closed · 64 Westford Rd, Eastford CT — Rural CT property, precision closing', href: '#/listings' },
  { text: 'Just Closed · 58 Swan St, East Providence RI — Renovated Cape Cod, sold with strategy', href: '#/listings' },
]

function NewsBar() {
  const [idx, setIdx] = useState(0)
  const [out, setOut] = useState(false)
  const curIdx = useRef(0)

  useEffect(() => {
    let alive = true
    const advance = () => {
      if (!alive) return
      setOut(true)
      setTimeout(() => {
        if (!alive) return
        curIdx.current = (curIdx.current + 1) % NEWS.length
        setIdx(curIdx.current)
        setTimeout(() => { if (alive) setOut(false) }, 60)
      }, 380)
    }
    const id = setInterval(advance, 6000)
    return () => { alive = false; clearInterval(id) }
  }, [])

  return (
    <div className="news-bar">
      <span className="news-bar-tag">LATEST</span>
      <a href={NEWS[idx].href} className={`news-bar-text${out ? ' news-bar-text--out' : ''}`}>
        {NEWS[idx].text}
      </a>
      <div className="news-bar-dots" aria-hidden="true">
        {NEWS.map((_, i) => (
          <span key={i} className={`news-dot${i === idx ? ' news-dot--active' : ''}`} />
        ))}
      </div>
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <HashRouter>
      <div className="page">
        <Cursor />
        <ConsultPopup />
        <FloridaToast />
        <NewsBar />

        <header className="nav">
          <Link to="/" className="brand">
            <img src={logo} alt="The Quinlan Group logo" />
            <div>
              <span className="brand-title">The Quinlan Group</span>
              <span className="brand-sub">Real Estate Collective</span>
            </div>
          </Link>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
            <NavLink to="/listings" className={({ isActive }) => (isActive ? 'active' : '')}>Listings</NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>Services</NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>Contact</NavLink>
          </nav>
          <Link className="btn primary nav-cta" to="/contact">Schedule a Consult</Link>
          <MobileMenu open={menuOpen} setOpen={setMenuOpen} />
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="footer-cta-bar">
            <div className="footer-cta-content">
              <h3>Ready to make your move?</h3>
              <p>Let's talk. We reply within 24 hours and never pressure — just clarity.</p>
            </div>
            <Link className="btn primary footer-cta-btn" to="/contact">Schedule a Private Consult</Link>
          </div>
          <div className="footer-main">
            <div className="footer-brand">
              <img src={logo} alt="The Quinlan Group" className="footer-logo" />
              <div>
                <p className="footer-brand-name">The Quinlan Group</p>
                <div className="footer-broker-row">
                  <span className="footer-brand-brokerage">Brokered by</span>
                  <img src={realLogo} alt="Real Broker LLC" className="footer-real-logo" />
                </div>
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <p className="footer-col-head">Navigate</p>
                <Link to="/">Home</Link>
                <Link to="/listings">Listings</Link>
                <Link to="/services">Services</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
              </div>
              <div className="footer-col">
                <p className="footer-col-head">Services</p>
                <Link to="/services">Buyer Representation</Link>
                <Link to="/services">Seller Strategy</Link>
                <Link to="/services">Marketing & Media</Link>
                <Link to="/services">Investment Advisory</Link>
              </div>
              <div className="footer-col">
                <p className="footer-col-head">Contact</p>
                <a href="tel:+14012157582" className="footer-contact-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13 19.79 19.79 0 011.62 4.38 2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Bryan: 401-215-7582
                </a>
                <a href="mailto:bryanq@therise.group" className="footer-contact-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  bryanq@therise.group
                </a>
                <a href="tel:+15086427521" className="footer-contact-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.69 13 19.79 19.79 0 011.62 4.38 2 2 0 013.6 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                  Rebecca: 508-642-7521
                </a>
                <a href="mailto:rebecca@therise.group" className="footer-contact-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
                  rebecca@therise.group
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} The Quinlan Group · Rhode Island · Massachusetts · Connecticut</p>
            <p className="footer-press">As seen on Projo · WPRI · WNRI</p>
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
