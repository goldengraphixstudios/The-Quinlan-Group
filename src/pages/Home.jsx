import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { listings } from '../data/listings'
import projoLogo from '../assets/logos/projo.svg'
import wpriLogo from '../assets/logos/wpri.svg'
import wnriLogo from '../assets/logos/wnri.png'

function Home() {
  useEffect(() => {
    let raf = null
    const handleScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll', `${window.scrollY}px`)
        raf = null
      })
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <section className="hero hero-home">
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Rhode Island · Massachusetts · Connecticut</p>
          <h1>
            Top RI Real Estate team helping 200+ families since 2017.
            <span className="hero-divider">Integrity, expertise & client-first service.</span>
            <span className="hero-divider">With us, you’re family.</span>
          </h1>
          <div className="hero-pillars">
            <span>Servicing; RI, MA, CT</span>
            <span>Seen on; Projo · WPRI · WNRI</span>
          </div>
          <div className="hero-actions">
            <Link className="btn primary" to="/contact">
              Schedule a Private Consult
            </Link>
            <Link className="btn ghost" to="/listings">
              View Closed Listings
            </Link>
          </div>
        </div>
        <div className="hero-frame">
          <div className="hero-outline">
            <p className="frame-title">Brand Essence</p>
            <h3>Authentic. Approachable. Family-driven.</h3>
            <p>
              We navigate complexity with clarity, so every client feels confident
              and protected from first showing to final signature.
            </p>
          </div>
          <div className="hero-credibility">
            <div>
              <span>8+</span>
              <p>Years serving the region</p>
            </div>
            <div>
              <span>200+</span>
              <p>Families guided since 2017</p>
            </div>
            <div>
              <span>Full-service</span>
              <p>Buy, sell, invest with one team</p>
            </div>
          </div>
        </div>
      </section>

      <section className="marquee">
        <div className="marquee-track">
          <div className="marquee-row">
            <span>Servicing · Rhode Island · Massachusetts · Connecticut</span>
            <span>Seen on</span>
            <img src={projoLogo} alt="Providence Journal logo" className="logo-mark logo-projo" />
            <img src={wpriLogo} alt="WPRI logo" className="logo-mark logo-wpri" />
            <img src={wnriLogo} alt="WNRI logo" className="logo-mark logo-wnri" />
            <span>Integrity · Expertise · Client-first service</span>
          </div>
          <div className="marquee-row" aria-hidden="true">
            <span>Servicing · Rhode Island · Massachusetts · Connecticut</span>
            <span>Seen on</span>
            <img src={projoLogo} alt="" className="logo-mark logo-projo" />
            <img src={wpriLogo} alt="" className="logo-mark logo-wpri" />
            <img src={wnriLogo} alt="" className="logo-mark logo-wnri" />
            <span>Integrity · Expertise · Client-first service</span>
          </div>
        </div>
      </section>

      <section className="section approach">
        <div className="section-title">
          <h2>Our Approach</h2>
          <p>
            A refined, calm, and trustworthy experience that replaces noise with
            clarity and makes each decision feel confident.
          </p>
        </div>
        <div className="approach-grid">
          <div className="approach-card">
            <h3>Relationships First</h3>
            <p>
              We treat every client like family, pairing thoughtful guidance with
              clear, honest communication.
            </p>
          </div>
          <div className="approach-card">
            <h3>Luxury Minimalism</h3>
            <p>
              A black-and-white visual language keeps focus on the property, the
              story, and the client experience.
            </p>
          </div>
          <div className="approach-card">
            <h3>Precision Strategy</h3>
            <p>
              Market intelligence, modern marketing, and calm negotiation —
              executed with intention.
            </p>
          </div>
        </div>
      </section>

      <section className="section teaser">
        <div className="section-title">
          <h2>Recent Successes</h2>
          <p>
            Closed listings across Rhode Island, Massachusetts, and Connecticut —
            each managed with care and discretion.
          </p>
        </div>
        <div className="listing-grid">
          {listings.slice(0, 2).map((listing) => (
            <article key={listing.id} className="listing-card">
              <img src={listing.image} alt={listing.title} />
              <div className="listing-meta">
                <span className="listing-tag">{listing.tag}</span>
                <h3>{listing.title}</h3>
                <p>{listing.details}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="teaser-actions">
          <Link className="btn ghost" to="/listings">
            Property Listings
          </Link>
        </div>
      </section>
    </>
  )
}

export default Home
