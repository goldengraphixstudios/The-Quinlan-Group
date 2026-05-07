import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroBg from '../assets/hero-bg.png'
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
      const cw = Math.floor((w - (VISIBLE - 1) * CARD_GAP) / VISIBLE)
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
        <div className="hero-content">
          <p className="eyebrow">Rhode Island · Massachusetts · Connecticut · Florida</p>
          <h1>
            Top RI Real Estate team helping 200+ families since 2017.
            <span className="hero-divider">Integrity, expertise &amp; client-first service.</span>
            <span className="hero-divider">With us, you're family.</span>
          </h1>
          <div className="hero-pillars">
            <span>Servicing; RI, MA, CT &amp; FL</span>
            <span>Seen on; Projo · WPRI · WNRI</span>
          </div>
          <div className="hero-actions">
            <Link className="btn primary" to="/contact">Schedule a Private Consult</Link>
            <Link className="btn ghost" to="/listings">View Closed Listings</Link>
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
              <span>RI · MA · CT · FL</span>
              <p>Full regional coverage</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <section className="marquee">
        <div className="marquee-track">
          <div className="marquee-row">
            <span>Servicing · Rhode Island · Massachusetts · Connecticut · Florida</span>
            <span>Seen on</span>
            <img src={projoLogo} alt="Providence Journal logo" className="logo-mark logo-projo" />
            <img src={wpriLogo} alt="WPRI logo" className="logo-mark logo-wpri" />
            <img src={wnriLogo} alt="WNRI logo" className="logo-mark logo-wnri" />
            <span>Integrity · Expertise · Client-first service</span>
          </div>
          <div className="marquee-row" aria-hidden="true">
            <span>Servicing · Rhode Island · Massachusetts · Connecticut · Florida</span>
            <span>Seen on</span>
            <img src={projoLogo} alt="" className="logo-mark logo-projo" />
            <img src={wpriLogo} alt="" className="logo-mark logo-wpri" />
            <img src={wnriLogo} alt="" className="logo-mark logo-wnri" />
            <span>Integrity · Expertise · Client-first service</span>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
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
            <div className="approach-icon">◈</div>
            <h3>Relationships First</h3>
            <p>
              We treat every client like family, pairing thoughtful guidance with
              clear, honest communication throughout every step.
            </p>
          </div>
          <div className="approach-card">
            <div className="approach-icon">◆</div>
            <h3>Luxury Minimalism</h3>
            <p>
              A black-and-white visual language keeps focus on the property, the
              story, and the client experience — never the noise.
            </p>
          </div>
          <div className="approach-card">
            <div className="approach-icon">◉</div>
            <h3>Precision Strategy</h3>
            <p>
              Market intelligence, modern marketing, and calm negotiation —
              executed with intention and delivered with results.
            </p>
          </div>
        </div>
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
              The Quinlan Group is a family-driven real estate team serving clients across Rhode Island,
              Massachusetts, Connecticut, and now Florida. Known for honest guidance, modern marketing,
              and strong local market knowledge — we help buyers, sellers, and investors move with confidence.
            </p>
            <p>
              Over 200 families have trusted us to navigate major real estate decisions. We deliver
              tailored strategy, thoughtful communication, and a team that treats your goals like our own.
            </p>
            <div className="home-about-stats">
              <div>
                <span>200+</span>
                <p>Families guided</p>
              </div>
              <div>
                <span>8+</span>
                <p>Years active</p>
              </div>
              <div>
                <span>4</span>
                <p>States licensed</p>
              </div>
            </div>
            <Link className="btn ghost" to="/about">Our Full Story →</Link>
          </div>
        </div>
      </section>

      {/* ── TEAM PREVIEW ── */}
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

      {/* ── JOURNEY BANNER ── */}
      <section className="journey-banner">
        <img src={brandJourney} alt="Your journey home starts here" className="journey-img" />
        <div className="journey-overlay">
          <p className="eyebrow">Since 2017</p>
          <h2>Your Journey Home Starts Here.</h2>
          <p>Calm guidance. Modern strategy. A team that treats your goals like their own.</p>
          <Link className="btn primary" to="/contact">Start the Conversation</Link>
        </div>
      </section>

      {/* ── RECENT CLOSINGS FEED ── */}
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

      {/* ── INSIGHTS & RESOURCES FEED ── */}
      <section className="section social-feed insights-feed">
        <div className="section-title">
          <h2>Insights &amp; Resources</h2>
          <p>
            Market education, honest guidance, and real estate intelligence — straight from our team.
          </p>
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
        <div className="insights-row insights-row--4">
          {eduPosts.slice(3).map((post) => (
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
        <div className="teaser-actions">
          <a
            className="btn ghost"
            href="https://www.instagram.com/thequinlangroup"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow on Instagram
          </a>
        </div>
      </section>

      {/* ── LEAD MAGNET ── */}
      <section className="section lead-magnet">
        <div className="lead-magnet-inner">
          <div className="lead-magnet-text">
            <p className="eyebrow">Free Resource</p>
            <h2>First-Time Homebuyer Guide — Rhode Island</h2>
            <p>
              A practical, 12-page guide covering everything first-time buyers need to know
              in today's RI market. No fluff — just honest, step-by-step guidance.
            </p>
            <ul className="lead-magnet-list">
              <li>Understanding the buying process from offer to close</li>
              <li>What to look for in a property and neighborhood</li>
              <li>Common mistakes and how to avoid them</li>
              <li>Financing tips for first-time buyers in RI</li>
            </ul>
          </div>
          <div className="lead-magnet-cta">
            <p className="lead-magnet-label">Request Your Free Copy</p>
            <div className="lead-magnet-form">
              <input type="text" placeholder="Your name" className="lead-magnet-input" />
              <input type="email" placeholder="your@email.com" className="lead-magnet-input" />
              <Link className="btn primary lead-magnet-btn" to="/contact">
                Get the Free Guide
              </Link>
            </div>
            <p className="lead-magnet-note">No spam. We reply within 24 hours.</p>
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
