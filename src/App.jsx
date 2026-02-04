import { useEffect, useRef } from 'react'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import logo from './assets/logo.png'
import Home from './pages/Home'
import Listings from './pages/Listings'
import Services from './pages/Services'
import About from './pages/About'
import Contact from './pages/Contact'

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

function App() {
  return (
    <HashRouter>
      <div className="page">
        <Cursor />
        <header className="nav">
          <div className="brand">
            <img src={logo} alt="The Quinlan Group logo" />
            <div>
              <span className="brand-title">The Quinlan Group</span>
              <span className="brand-sub">Real Estate Collective</span>
            </div>
          </div>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Home
            </NavLink>
            <NavLink to="/listings" className={({ isActive }) => (isActive ? 'active' : '')}>
              Listings
            </NavLink>
            <NavLink to="/services" className={({ isActive }) => (isActive ? 'active' : '')}>
              Services
            </NavLink>
            <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
              About
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'active' : '')}>
              Contact
            </NavLink>
          </nav>
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
          <div className="footer-line" />
          <p>The Quinlan Group · Keller Williams Leading Edge Realty</p>
          <p>Modern, honest, and relationship-first real estate guidance.</p>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
