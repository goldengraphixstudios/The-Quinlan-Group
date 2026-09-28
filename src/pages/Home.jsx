import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.png'
import teamHero from '../assets/team-hero.jpg'
import brandJourney from '../assets/brand-journey.jpg'
import aboutUsImg from '../assets/about-us.png'
import bryanPhoto from '../assets/bryan-quinlan.png'
import rebeccaPhoto from '../assets/rebecca-manchester.png'
import projoLogo from '../assets/logos/projo.svg'
import wpriLogo from '../assets/logos/wpri.svg'
import wnriLogo from '../assets/logos/wnri.png'

import postHamptonClosed from '../assets/social/post-hampton-closed.jpg'
import postBrewsterSold from '../assets/social/post-brewster-sold.jpg'
import postHarrisonClosed from '../assets/social/post-harrison-closed.jpg'
import postPutnamClosed from '../assets/social/post-putnam-closed.jpg'
import postSwanClosed from '../assets/social/post-swan-closed.png'
import postWoodwineClosed from '../assets/social/post-woodbine-closed.jpg'
import postWestfordClosed from '../assets/social/post-westford-closed.png'

import postWhyDontSell from '../assets/social/post-why-homes-dont-sell.jpg'
import postMortgageRent from '../assets/social/post-mortgage-vs-rent.jpg'
import postHiddenCosts from '../assets/social/post-hidden-costs.jpg'
import postFirstImpressions from '../assets/social/post-first-impressions.jpg'
import postDontRush from '../assets/social/post-dont-rush.jpg'
import postRealtorBeats from '../assets/social/post-realtor-beats-solo.jpg'
import postTimeToSell from '../assets/social/post-time-to-sell.jpg'

const dealPosts = [
  { id: 'd1', img: postHamptonClosed, caption: 'Just Closed · 21 Hampton Ave, Warwick RI' },
  { id: 'd2', img: postBrewsterSold, caption: 'Just Sold · 67 Brewster Dr, Warwick RI' },
  { id: 'd3', img: postHarrisonClosed, caption: 'Closed Deal · 193 Harrison St, Pawtucket RI' },
  { id: 'd4', img: postPutnamClosed, caption: 'Closed Deal · 290 Providence Pike, Putnam CT' },
  { id: 'd5', img: postSwanClosed, caption: 'Just Closed · 58 Swan St, East Providence RI' },
  { id: 'd6', img: postWoodwineClosed, caption: 'Just Closed · 0 Woodbine St, Johnston RI' },
  { id: 'd7', img: postWestfordClosed, caption: 'Just Closed · 64 Westford Rd, Eastford CT' },
]

const eduPosts = [
  {
    id: 'e1',
    img: postWhyDontSell,
    caption: 'The Real Reason Your Home Isn\'t Selling',
    article: {
      title: 'The Real Reason Your Home Isn\'t Selling',
      intro: 'You\'ve listed your home. The photos look great. But weeks have passed and the offers just aren\'t coming. Here\'s the uncomfortable truth — most homes that sit on the market have at least one of these five problems.',
      sections: [
        {
          heading: '1. Pricing It Like It\'s 2022',
          body: 'The market has shifted. Buyers have more inventory to choose from, and they know it. If your home is priced even 5% above comparable sales, you\'re likely being skipped entirely. Precision pricing isn\'t guessing — it\'s data-driven strategy, and it\'s the single biggest lever in your sale.',
        },
        {
          heading: '2. Weak Listing Photos',
          body: 'Over 90% of buyers begin their search online. Dim, wide-angle, or cluttered photos send buyers to the next listing in seconds. Professional photography — proper lighting, staged rooms, and a compelling narrative — is no longer optional.',
        },
        {
          heading: '3. Minimal Marketing Reach',
          body: 'MLS alone isn\'t enough. Top-performing listings use targeted digital ad campaigns, Instagram/Facebook placement, email outreach to buyer databases, and media contacts. If your home isn\'t showing up in front of the right buyers, price doesn\'t matter.',
        },
        {
          heading: '4. Poor First Impressions',
          body: 'Buyers form an emotional judgment within 8 seconds of arriving. Overgrown landscaping, scuffed doors, and dated entryways kill deals before anyone walks through. Staging direction and pre-list preparation are key — not optional extras.',
        },
        {
          heading: '5. The Wrong Agent',
          body: 'Not all agents offer the same service level. The difference between a passive listing agent and a strategic marketing partner can mean tens of thousands of dollars — and months of your time. Ask the right questions before you sign.',
        },
      ],
      cta: 'Book a Seller Strategy Call',
    },
  },
  {
    id: 'e2',
    img: postMortgageRent,
    caption: 'Monthly Mortgage vs. Monthly Rent',
    article: {
      title: 'Monthly Mortgage vs. Monthly Rent: What Nobody Tells You',
      intro: 'The rent-vs-buy debate gets oversimplified constantly. Here\'s a clear-eyed breakdown of what you\'re actually comparing — and why the math often surprises people.',
      sections: [
        {
          heading: 'What You\'re Actually Paying in Rent',
          body: 'Every rent check disappears. You\'re paying your landlord\'s mortgage, property taxes, and profit margin while building zero equity of your own. In most Rhode Island markets, monthly rent on a 3-bedroom home now exceeds $2,200 — and it goes up every year.',
        },
        {
          heading: 'The Real Cost of a Mortgage',
          body: 'A $350,000 home at today\'s rates puts your principal + interest at roughly $2,100/month. Add taxes and insurance and you\'re close to $2,500. But — you\'re building equity from day one. After 5 years, tens of thousands of dollars in equity belong to you.',
        },
        {
          heading: 'The Hidden Advantage: Appreciation',
          body: 'RI home values have averaged 4–6% annual appreciation over the past decade. A $350K home could be worth $425K+ in five years. That\'s a gain your rent check will never produce.',
        },
        {
          heading: 'When Renting Still Makes Sense',
          body: 'If you\'re moving in under 18 months, still building your down payment, or in a highly uncertain employment situation — renting short-term is rational. Buying is a long game, and we always advise clients honestly about timing.',
        },
        {
          heading: 'The Bottom Line',
          body: 'There\'s no universal right answer, but in most cases, buyers who delay for 1–2 years lose more in appreciation and rising prices than they save. Talk to a lender and a buyer\'s agent — not just a landlord.',
        },
      ],
      cta: 'Book a Buyer Consultation',
    },
  },
  {
    id: 'e3',
    img: postHiddenCosts,
    caption: 'Hidden Costs in Home Ownership',
    article: {
      title: 'Hidden Costs in Home Ownership You Need to Budget For',
      intro: 'Your mortgage payment is just the beginning. Here\'s what most first-time buyers aren\'t told — and what catches them off guard in year one.',
      sections: [
        {
          heading: 'Property Taxes',
          body: 'Rhode Island property taxes average around 1.3–1.6% of assessed value annually. On a $400K home, that\'s $5,200–$6,400 per year — often escrow-wrapped into your payment, but always real money.',
        },
        {
          heading: 'Homeowner\'s Insurance',
          body: 'Expect $1,200–$2,000/year for a standard RI policy. Flood zones, older construction, and coastal properties can push this significantly higher. Always request quotes before closing.',
        },
        {
          heading: 'Maintenance & Repairs',
          body: 'The rule of thumb: budget 1% of home value per year for maintenance. On a $400K home, that\'s $4,000. New roofs, HVAC service, appliance replacements — they come for every homeowner eventually.',
        },
        {
          heading: 'HOA Fees',
          body: 'Many condos and planned communities charge $200–$600/month. This gets overlooked during the excitement of offer acceptance, then shows up as a real line item. Always ask upfront.',
        },
        {
          heading: 'Closing Costs',
          body: 'Buyers typically pay 2–5% of the loan in closing costs. On a $350K purchase, that\'s $7,000–$17,500 due at closing — in addition to your down payment. Budget for this early in the process.',
        },
      ],
      cta: 'Get a Free Buyer\'s Guide',
    },
  },
  {
    id: 'e4',
    img: postFirstImpressions,
    caption: 'The Psychology of First Impressions',
    article: {
      title: 'The Psychology of First Impressions in Real Estate',
      intro: 'Buyers make their emotional decision in the first 8 seconds. Everything after that is justification. Understanding buyer psychology is the most underrated advantage a seller can have.',
      sections: [
        {
          heading: 'Curb Appeal Isn\'t Optional',
          body: 'The driveway, front door, landscaping, and entry path all contribute to the buyer\'s gut feeling before they ever step inside. A fresh coat of paint on the door, trimmed hedges, and a clean walkway can add perceived value of $10,000+ in a buyer\'s mind.',
        },
        {
          heading: 'Scent Is the Most Powerful Sense',
          body: 'Before they see the kitchen, they smell it. Pet odors, mustiness, and cooking smells are immediate deal-breakers. A neutral, freshly cleaned home with subtle natural scents signals that the property has been cared for.',
        },
        {
          heading: 'Declutter to Create Mental Space',
          body: 'Buyers can\'t visualize themselves in a space filled with your things. Professional staging — or even a focused declutter session — allows buyers to project their own life into the home. Empty space is a selling tool.',
        },
        {
          heading: 'Light Is Everything',
          body: 'Dark rooms feel smaller and less valuable. Open blinds, replace dim bulbs, clean windows, and let natural light do the work. In listing photos and showings, brightness is directly correlated with perceived price.',
        },
        {
          heading: 'The Agent\'s Role in Managing Impressions',
          body: 'A skilled listing agent coordinates every touchpoint — from the listing description framing to the order of the showing tour. It\'s not accidental. Every part of the buyer\'s experience is intentionally designed to create emotional connection.',
        },
      ],
      cta: 'Request a Free Staging Consultation',
    },
  },
  {
    id: 'e5',
    img: postDontRush,
    caption: 'Don\'t Rush Your Home Decisions',
    article: {
      title: 'Why You Shouldn\'t Rush Your Real Estate Decisions',
      intro: 'We live in a culture of urgency. And real estate markets can feel like pressure cookers. But making rushed decisions on a $400,000 asset is how people end up in the wrong home — or the wrong deal.',
      sections: [
        {
          heading: 'FOMO Is the Enemy of Good Decisions',
          body: 'Fear of missing out causes buyers to overbid, skip inspections, and ignore red flags. Yes, good properties move fast — but the right advisor helps you act decisively on the right home, not impulsively on the wrong one.',
        },
        {
          heading: 'The Inspection Is Non-Negotiable',
          body: 'Waiving inspections to win in a competitive market is a calculated risk — and in most cases, not one worth taking. A $500 inspection can uncover $30,000 in deferred maintenance. We guide clients to find creative ways to compete without skipping due diligence.',
        },
        {
          heading: 'Slow Down on Sellers Too',
          body: 'Sellers who price out of fear or frustration often underprice. Sellers who rush to accept the first offer without reviewing terms often leave money on the table. Strategy beats speed.',
        },
        {
          heading: 'The Right Timeline Is Yours',
          body: 'Every client\'s situation is different. A first-time buyer needs different pacing than an investor or a relocating family. We build your process around your life — not market pressure.',
        },
        {
          heading: 'What Good Guidance Looks Like',
          body: 'The right advisor gives you clarity, not urgency. They explain the market, help you understand risk vs. opportunity, and let you make an informed decision with confidence. That\'s the standard we hold ourselves to.',
        },
      ],
      cta: 'Schedule a No-Pressure Consultation',
    },
  },
  {
    id: 'e6',
    img: postRealtorBeats,
    caption: 'Why Working with a Realtor Beats Going Solo',
    article: {
      title: 'Why Working With a Realtor Beats Going It Alone',
      intro: 'In the age of Zillow and online listings, it\'s tempting to think you can buy or sell without representation. Here\'s what that decision actually costs you.',
      sections: [
        {
          heading: 'Access to the Full Market',
          body: 'Experienced agents have access to off-market opportunities, coming-soon listings, and agent networks that never appear on public platforms. In competitive markets, these are the deals that actually close at favorable terms.',
        },
        {
          heading: 'Negotiation Is a Skill',
          body: 'The average person negotiates a home purchase once or twice in a lifetime. An active agent negotiates dozens of transactions each year. That experience translates directly to better terms, better prices, and fewer surprises.',
        },
        {
          heading: 'Transaction Management',
          body: 'A real estate contract involves dozens of deadlines, contingencies, and coordination with attorneys, lenders, inspectors, and title companies. Missing one deadline can kill a deal — or cost you your deposit. An agent manages this so you don\'t have to.',
        },
        {
          heading: 'Sellers Who Go FSBO Often Net Less',
          body: 'Studies consistently show that For Sale By Owner listings sell for 5–15% less than agent-represented properties. The commission you\'re trying to save is often less than the value an agent\'s marketing and negotiation adds.',
        },
        {
          heading: 'Protection and Advocacy',
          body: 'Your agent\'s job is to represent your interests — not the other party\'s. From spotting red flags in disclosures to pushing back on inflated repair credits, having someone in your corner is the difference between a good deal and a great one.',
        },
      ],
      cta: 'Connect With Our Team',
    },
  },
  {
    id: 'e7',
    img: postTimeToSell,
    caption: 'How to Know When It\'s Time to Sell',
    article: {
      title: 'How to Know When It\'s Time to Sell Your Home',
      intro: 'Selling is one of the biggest financial decisions you\'ll make. How do you know when the timing is right? Here are the signals that experienced agents watch for — and what they mean for your situation.',
      sections: [
        {
          heading: 'You\'ve Outgrown the Space',
          body: 'Growing families, aging parents moving in, or new remote work needs can all signal that your current home no longer fits your life. If you find yourself routinely frustrated by the lack of space, it\'s time to have the conversation.',
        },
        {
          heading: 'Your Equity Has Grown Substantially',
          body: 'If you purchased before 2020 or made consistent improvements, your equity position may be strong enough to fund a meaningful move-up purchase. A market analysis will tell you exactly where you stand.',
        },
        {
          heading: 'The Market Favors Sellers',
          body: 'Low inventory markets — like much of RI and southern New England in recent years — give sellers significant leverage. When demand outpaces supply, motivated buyers compete, and sellers win on price and terms.',
        },
        {
          heading: 'Life Has Changed',
          body: 'Divorce, job relocation, retirement, or the loss of a family member — life events create real estate decisions, and timing them well matters. There\'s no single right answer, but thoughtful planning protects your financial outcome.',
        },
        {
          heading: 'You\'re Ready for the Process',
          body: 'Selling requires preparation, patience, and emotional readiness to let go. If you\'re there mentally and your equity supports the move, the next step is a no-obligation market analysis with a trusted advisor.',
        },
      ],
      cta: 'Request a Free Market Analysis',
    },
  },
]

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
              <img src={post.img} alt={post.caption} />
              <div className="social-caption">{post.caption}</div>
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
  const { article } = post
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal article-modal" role="dialog" aria-modal="true" aria-label={article.title}>
      <button className="modal-backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="modal-card modal-card--article">
        <button type="button" className="modal-close" onClick={onClose}>✕ Close</button>
        <div className="article-modal-img-wrap">
          <img src={post.img} alt={post.caption} className="article-modal-img" />
        </div>
        <div className="article-modal-body">
          <p className="eyebrow">Insights &amp; Resources</p>
          <h2 className="article-modal-title">{article.title}</h2>
          <p className="article-modal-intro">{article.intro}</p>
          <div className="article-sections">
            {article.sections.map((sec) => (
              <div key={sec.heading} className="article-section">
                <h4 className="article-section-heading">{sec.heading}</h4>
                <p className="article-section-body">{sec.body}</p>
              </div>
            ))}
          </div>
          <Link className="btn primary article-modal-cta" to="/contact" onClick={onClose}>
            {article.cta} →
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
            We've guided 200+ families through buying, selling, and investing since 2017 —
            with honest counsel, modern marketing, and zero pressure.
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
            <div className="hero-portrait-scrim" aria-hidden="true" />
            <div className="hero-portrait-caption">
              <p className="hero-portrait-names">Bryan Quinlan &amp; Rebecca Ann Manchester</p>
              <p className="hero-portrait-role">Your advisors, start to close</p>
            </div>
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
                <img src={post.img} alt={post.caption} />
              </div>
              <div className="edu-card-body">
                <h4 className="edu-card-title">{post.article.title}</h4>
                <p className="edu-card-intro">{post.article.intro}</p>
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
                {post.article.title}
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
