import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { articles as eduPosts, closings as dealPosts } from '../content'
import heroBg from '../assets/hero-bg.jpg'
import teamHero from '../assets/team-hero.jpg'
import brandJourney from '../assets/brand-journey.jpg'
import aboutUsImg from '../assets/about-us.jpg'
import bryanPhoto from '../assets/bryan-quinlan.png'
import rebeccaPhoto from '../assets/rebecca-manchester.png'
import projoLogo from '../assets/logos/projo.svg'
import wpriLogo from '../assets/logos/wpri.svg'
import wnriLogo from '../assets/logos/wnri.png'

/* ── ICONS ── */
const Ico = {
  search: <path d="M11 3a8 8 0 105.3 14l4.4 4.4 1.4-1.4-4.4-4.4A8 8 0 0011 3zm0 2a6 6 0 110 12 6 6 0 010-12z" />,
  tag: <><path d="M3 12V5a2 2 0 012-2h7l9 9-9 9-9-9z" /><circle cx="7.5" cy="7.5" r="1.5" /></>,
  spark: <><path d="M12 2l2.2 6.2L20.5 10l-6.3 1.8L12 18l-2.2-6.2L3.5 10l6.3-1.8L12 2z" /><path d="M18.5 15l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9.9-2.4z" /></>,
  chart: <><path d="M3 21h18" /><rect x="5" y="12" width="3.5" height="7" /><rect x="10.2" y="7" width="3.5" height="12" /><rect x="15.4" y="3" width="3.5" height="16" /></>,
}

function Icon({ d }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{d}</svg>
  )
}

const SERVICES = [
  {
    id: 'buyer', icon: Ico.search, title: 'Buyer Representation',
    line: 'Find the right home, at the right price, with the right support.',
    points: ['Tailored property search', 'Off-market access', 'Offer strategy & negotiation'],
  },
  {
    id: 'seller', icon: Ico.tag, title: 'Seller Strategy',
    line: 'Position your property to attract serious buyers and top-dollar offers.',
    points: ['Precision pricing analysis', 'Staging & pre-list prep', 'Multi-channel campaigns'],
  },
  {
    id: 'marketing', icon: Ico.spark, title: 'Marketing & Media',
    line: 'Premium presentation that makes properties unforgettable.',
    points: ['Professional photography', 'Branded listing creative', 'Targeted digital ads'],
  },
  {
    id: 'investment', icon: Ico.chart, title: 'Investment Advisory',
    line: 'Strategic acquisitions and portfolio growth across the region.',
    points: ['Multi-family acquisition', 'Cap rate & ROI analysis', 'Cross-state sourcing'],
  },
]

const PROCESS = [
  { n: '01', t: 'Consultation', d: 'A private conversation — no pressure, just clarity. We learn your goals, timeline, and what success looks like for you.' },
  { n: '02', t: 'Strategy', d: 'We build a tailored plan. For buyers, a search and offer strategy. For sellers, a positioning and marketing plan built around your property.' },
  { n: '03', t: 'Execution', d: 'Showings, negotiations, campaigns, and transaction management — executed with precision, with you informed at every step.' },
  { n: '04', t: 'Close', d: 'Calm, clear communication through the final steps. From contract to keys, we stay with you until the ink is dry.' },
]

const CARD_GAP = 14
const VISIBLE = 4

function DealCarousel({ posts }) {
  const n = posts.length
  const items = [...posts, ...posts, ...posts]
  const [pos, setPos] = useState(n)
  const trackRef = useRef(null)
  const wrapRef = useRef(null)
  const jumping = useRef(false)
  const [step, setStep] = useState(274)
  const [cardW, setCardW] = useState(260)

  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return
      const w = wrapRef.current.offsetWidth
      const per = w < 640 ? 1 : w < 900 ? 2 : w < 1200 ? 3 : VISIBLE
      const cw = Math.floor((w - (per - 1) * CARD_GAP) / per)
      setCardW(cw)
      setStep(cw + CARD_GAP)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const jumpTo = (newPos) => {
    jumping.current = true
    if (trackRef.current) trackRef.current.style.transition = 'none'
    setPos(newPos)
    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = ''
        jumping.current = false
      })
    )
  }

  useEffect(() => {
    if (jumping.current) return
    if (pos >= n * 2) {
      const t = setTimeout(() => jumpTo(pos - n), 460)
      return () => clearTimeout(t)
    }
    if (pos < n) {
      const t = setTimeout(() => jumpTo(pos + n), 460)
      return () => clearTimeout(t)
    }
  }, [pos])

  useEffect(() => {
    const id = setInterval(() => {
      if (!jumping.current) setPos((p) => p + 1)
    }, 3500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="deal-carousel" ref={wrapRef}>
      <div className="carousel-viewport">
        <div
          ref={trackRef}
          className="carousel-track"
          style={{ transform: `translateX(${-pos * step}px)` }}
        >
          {items.map((post, i) => (
            <div
              key={`${post.id}_${i}`}
              className="deal-c-card"
              style={{ width: cardW, flexBasis: cardW }}
            >
              <img src={post.img} alt={post.title} />
              <div className="social-caption">{post.title}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-nav">
        <button
          type="button"
          className="carousel-btn"
          onClick={() => { if (!jumping.current) setPos((p) => p - 1) }}
          aria-label="Previous"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="carousel-btn"
          onClick={() => { if (!jumping.current) setPos((p) => p + 1) }}
          aria-label="Next"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function ArticleModal({ post, onClose }) {
    useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal article-modal" role="dialog" aria-modal="true" aria-label={post.title}>
      <button className="modal-backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="modal-card modal-card--article">
        <button type="button" className="modal-close" onClick={onClose}>✕ Close</button>
        <div className="article-modal-img-wrap">
          <img src={post.img} alt={post.title} className="article-modal-img" />
        </div>
        <div className="article-modal-body">
          <p className="eyebrow">Insights &amp; Resources</p>
          <h2 className="article-modal-title">{post.title}</h2>
          <p className="article-modal-intro">{post.intro}</p>
          <div className="article-sections">
            {(post.sections || []).map((sec) => (
              <div key={sec.heading} className="article-section">
                <h4 className="article-section-heading">{sec.heading}</h4>
                <p className="article-section-body">{sec.body}</p>
              </div>
            ))}
          </div>
          <Link className="btn primary article-modal-cta" to="/contact" onClick={onClose}>
            {post.cta} →
          </Link>
        </div>
      </div>
    </div>
  )
}

function Home() {
  const [activeArticle, setActiveArticle] = useState(null)

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
      {/* ── HERO ── */}
      <section className="hero hero-home" style={{ '--hero-bg': `url(${heroBg})` }}>
        <div className="hero-bg-layer" aria-hidden="true" />
        <div className="hero-veil" aria-hidden="true" />
        <div className="hero-lines" aria-hidden="true" />
        <div className="hero-content hero-content--focused">
          <p className="eyebrow">Rhode Island · Massachusetts · Connecticut · Florida</p>
          <h1 className="hero-h1">
            Real estate that treats you<br />
            <em>like family.</em>
          </h1>
          <p className="hero-lede">
            Honest counsel, modern marketing, and zero pressure — guiding buyers,
            sellers, and investors from first showing to final signature.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" to="/contact">Schedule a Private Consult</Link>
            <Link className="btn ghost" to="/listings">View Closed Listings</Link>
          </div>
          <p className="hero-reassure">Free consultation · No obligation · We reply within 24 hours</p>
        </div>

        <div className="hero-portrait">
          <div className="hero-portrait-frame">
            <img src={teamHero} alt="Bryan Quinlan and Rebecca Ann Manchester of The Quinlan Group" />
          </div>
          <div className="hero-stat">
            <span className="hero-stat-num">200+</span>
            <span className="hero-stat-label">Families guided<br />since 2017</span>
          </div>
          <div className="hero-portrait-caption">
            <p className="hero-portrait-names">Bryan Quinlan &amp; Rebecca Ann Manchester</p>
            <p className="hero-portrait-role">Your advisors, start to close</p>
          </div>
        </div>
      </section>

      {/* ═══ 2. PROOF BAR — stats stated once ═══ */}
      <section className="proof-bar">
        <div className="proof-stats">
          <div className="proof-stat">
            <span className="proof-num">200+</span>
            <p>Families guided</p>
          </div>
          <div className="proof-stat">
            <span className="proof-num">8+</span>
            <p>Years serving the region</p>
          </div>
          <div className="proof-stat">
            <span className="proof-num">4</span>
            <p>States licensed</p>
          </div>
        </div>
        <div className="proof-press">
          <span className="proof-press-label">As seen on</span>
          <img src={projoLogo} alt="The Providence Journal" className="logo-mark logo-projo" />
          <img src={wpriLogo} alt="WPRI" className="logo-mark logo-wpri" />
          <img src={wnriLogo} alt="WNRI" className="logo-mark logo-wnri" />
        </div>
      </section>

      {/* ═══ 3. WHAT WE DO ═══ */}
      <section className="section services-home">
        <div className="section-title">
          <h2>What We Do</h2>
          <p>Full-service representation for buyers, sellers, and investors — each with a clear plan behind it.</p>
        </div>
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <Link key={s.id} to="/services" className="svc-card">
              <span className="svc-icon"><Icon d={s.icon} /></span>
              <h3>{s.title}</h3>
              <p className="svc-line">{s.line}</p>
              <ul className="svc-points">
                {s.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <span className="svc-more">Learn more →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ 4. HOW IT WORKS ═══ */}
      <section className="section process-home">
        <div className="section-title">
          <h2>How It Works</h2>
          <p>Four steps. No surprises. You'll always know exactly where you stand.</p>
        </div>
        <ol className="proc-grid">
          {PROCESS.map((p) => (
            <li key={p.n} className="proc-card">
              <span className="proc-n">{p.n}</span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── ABOUT US ── */}
      <section className="section home-about">
        <div className="home-about-grid">
          <div className="home-about-img-wrap">
            <img src={aboutUsImg} alt="The Quinlan Group team" className="home-about-img" />
          </div>
          <div className="home-about-text">
            <p className="eyebrow">Since 2017</p>
            <h2>Built on Integrity. Driven by People.</h2>
            <p>
              The Quinlan Group is a family-driven team serving Rhode Island, Massachusetts,
              Connecticut, and now Florida. We're known for honest guidance, modern marketing,
              and market knowledge that's actually local.
            </p>
            <p>
              Most agents hand you a listing. We hand you a strategy — and stay in the room
              until it works. That's the difference 200+ families have trusted us with.
            </p>
            <Link className="btn ghost" to="/about">Our Full Story →</Link>
          </div>
        </div>
      </section>

      {/* ═══ 6. RECENT CLOSINGS ═══ */}
      <section className="section social-feed">
        <div className="section-title">
          <h2>Recent Closings</h2>
          <p>Every deal represents a family served and a goal achieved.</p>
        </div>
        <DealCarousel posts={dealPosts} />
        <div className="teaser-actions">
          <Link className="btn ghost" to="/listings">View Full Portfolio</Link>
        </div>
      </section>

      {/* ═══ 7. MEET THE TEAM ═══ */}
      <section className="section team-preview">
        <div className="section-title">
          <h2>Meet the Team</h2>
          <p>Two dedicated advisors. One shared commitment to your success.</p>
        </div>
        <div className="team-grid">
          <div className="team-card">
            <div className="team-photo-wrap">
              <img src={bryanPhoto} alt="Bryan Quinlan" className="team-photo" />
            </div>
            <div className="team-info">
              <h3>Bryan Quinlan</h3>
              <p className="team-role">Team Lead · Market Strategist</p>
              <p className="team-bio">
                Bryan brings market intelligence, calm negotiation, and a seller- and buyer-first mindset
                to every transaction. His precision strategy has helped hundreds of families move with confidence.
              </p>
              <div className="team-contact">
                <a href="tel:+14012157582">401-215-7582</a>
                <a href="mailto:bryanq@therise.group">bryanq@therise.group</a>
              </div>
            </div>
          </div>
          <div className="team-card">
            <div className="team-photo-wrap">
              <img src={rebeccaPhoto} alt="Rebecca Ann Manchester" className="team-photo" />
            </div>
            <div className="team-info">
              <h3>Rebecca Ann Manchester</h3>
              <p className="team-role">Realtor · Client Relationship Advisor</p>
              <p className="team-bio">
                Rebecca is the warm, responsive heart of The Quinlan Group — guiding clients through
                every step with honest communication, genuine care, and a relationship-first approach.
              </p>
              <div className="team-contact">
                <a href="tel:+15086427521">508-642-7521</a>
                <a href="mailto:rebecca@therise.group">rebecca@therise.group</a>
              </div>
            </div>
          </div>
        </div>
        <div className="teaser-actions">
          <Link className="btn ghost" to="/about">Full Team Story</Link>
        </div>
      </section>

      {/* ═══ 8. INSIGHTS ═══ */}
      <section className="section social-feed insights-feed">
        <div className="section-title">
          <h2>Insights &amp; Resources</h2>
          <p>Market education and honest guidance — straight from our team.</p>
        </div>
        <div className="insights-row insights-row--3">
          {eduPosts.slice(0, 3).map((post) => (
            <button
              key={post.id}
              type="button"
              className="social-card social-card--edu"
              onClick={() => setActiveArticle(post)}
            >
              <div className="edu-img-wrap">
                <img src={post.img} alt={post.title} />
              </div>
              <div className="edu-card-body">
                <h4 className="edu-card-title">{post.title}</h4>
                <p className="edu-card-intro">{post.intro}</p>
                <span className="social-read-more">Read Article →</span>
              </div>
            </button>
          ))}
        </div>
        <div className="insights-more">
          <p className="insights-more-label">More reading</p>
          <div className="insights-more-list">
            {eduPosts.slice(3).map((post) => (
              <button
                key={post.id}
                type="button"
                className="insight-link"
                onClick={() => setActiveArticle(post)}
              >
                {post.title}
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 9. FINAL CTA ═══ */}
      <section className="final-cta" style={{ '--cta-bg': `url(${brandJourney})` }}>
        <div className="final-cta-veil" aria-hidden="true" />
        <div className="final-cta-inner">
          <div className="final-cta-text">
            <p className="eyebrow">Free Resource</p>
            <h2>First-Time Homebuyer Guide — Rhode Island</h2>
            <p className="final-cta-sub">
              A practical 12-page guide covering everything first-time buyers need to know
              in today's RI market. No fluff — just honest, step-by-step guidance.
            </p>
            <ul className="final-cta-list">
              <li>The buying process from offer to close</li>
              <li>What to look for in a property and neighborhood</li>
              <li>Common mistakes and how to avoid them</li>
              <li>Financing tips for first-time buyers in RI</li>
            </ul>
          </div>
          <div className="final-cta-card">
            <p className="final-cta-label">Request your free copy</p>
            <input type="text" placeholder="Your name" className="final-cta-input" aria-label="Your name" />
            <input type="email" placeholder="your@email.com" className="final-cta-input" aria-label="Your email" />
            <Link className="btn primary final-cta-btn" to="/contact">Get the Free Guide</Link>
            <p className="final-cta-note">No spam. We reply within 24 hours.</p>
          </div>
        </div>
      </section>

      {activeArticle && (
        <ArticleModal post={activeArticle} onClose={() => setActiveArticle(null)} />
      )}
    </>
  )
}

export default Home
