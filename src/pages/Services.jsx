import { Link } from 'react-router-dom'
import brandServices from '../assets/brand-services.jpg'

const services = [
  {
    id: 'buyer',
    icon: '◈',
    title: 'Buyer Representation',
    tagline: 'Find the right home, at the right price, with the right support.',
    description:
      'We guide every buyer through a strategic, fully-supported search process — from understanding your goals and budget to private tours, competitive offer preparation, and confident negotiation.',
    points: [
      'Personalized property search tailored to your criteria',
      'Private showings and off-market opportunity access',
      'Real-time local market intelligence',
      'Offer strategy, negotiation, and contract guidance',
      'Full support from search to close',
    ],
    cta: 'Start Your Search',
  },
  {
    id: 'seller',
    icon: '◆',
    title: 'Seller Strategy',
    tagline: 'Position your property to attract serious buyers and top-dollar offers.',
    description:
      'We combine luxury-forward presentation, data-driven pricing, and targeted marketing to maximize your home\'s value and minimize time on market. Every listing is treated like a campaign.',
    points: [
      'Comparative market analysis and precision pricing',
      'Staging direction and pre-list preparation guidance',
      'Professional photography and visual storytelling',
      'Multi-channel digital marketing campaigns',
      'Expert negotiation and transaction management',
    ],
    cta: 'List Your Property',
  },
  {
    id: 'marketing',
    icon: '◉',
    title: 'Marketing & Media',
    tagline: 'Premium presentation that makes properties unforgettable.',
    description:
      'Our marketing approach goes beyond standard listings. Every property receives a curated content package designed to capture attention, build desire, and drive competitive offers.',
    points: [
      'High-resolution professional photography',
      'Branded listing graphics for social media',
      'Targeted digital ad campaigns across platforms',
      'Buyer-focused narrative copywriting',
      'Featured visibility through regional media contacts',
    ],
    cta: 'See Our Marketing',
  },
  {
    id: 'investment',
    icon: '⬡',
    title: 'Investment Advisory',
    tagline: 'Strategic acquisitions and portfolio growth across RI, MA, and CT.',
    description:
      'Whether you\'re acquiring your first investment property or expanding an existing portfolio, we bring market intelligence, off-market sourcing, and long-term equity strategy to every deal.',
    points: [
      'Multi-family and income property acquisition',
      'Off-market deal sourcing and due diligence',
      'Portfolio planning and equity growth strategy',
      'Cap rate, cash flow, and ROI analysis',
      'Cross-state investment guidance (RI, MA, CT)',
    ],
    cta: 'Explore Investment Opportunities',
  },
]

const process = [
  { step: '01', title: 'Consultation', desc: 'We start with a private conversation — no pressure, just clarity. We learn your goals, timeline, and what success looks like for you.' },
  { step: '02', title: 'Strategy', desc: 'We build a tailored plan. For buyers, that\'s a search and offer strategy. For sellers, it\'s a positioning and marketing plan built around your property.' },
  { step: '03', title: 'Execution', desc: 'We move with precision — showings, negotiations, marketing campaigns, and transaction management — keeping you informed at every step.' },
  { step: '04', title: 'Close', desc: 'We guide you through the final steps with calm, clear communication. From contract to keys, we\'re with you until the ink is dry.' },
]

function Services() {
  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">What We Do</p>
        <h1 className="page-hero-title">Full-Service Real Estate</h1>
        <p className="page-hero-sub">
          Comprehensive support for buyers, sellers, and investors — delivered with clarity,
          discretion, and a modern marketing edge across Rhode Island, Massachusetts, and Connecticut.
        </p>
      </section>

      {/* ── SERVICE CARDS ── */}
      <section className="section services">
        <div className="service-grid service-grid--2col">
          {services.map((svc) => (
            <div key={svc.id} className="service-card service-card--full">
              <div className="service-card-header">
                <span className="service-icon">{svc.icon}</span>
                <div>
                  <h3>{svc.title}</h3>
                  <p className="service-tagline">{svc.tagline}</p>
                </div>
              </div>
              <p className="service-desc">{svc.description}</p>
              <ul className="service-points">
                {svc.points.map((pt) => (
                  <li key={pt}>
                    <span className="service-check">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <Link className="btn ghost service-card-cta" to="/contact">
                {svc.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section className="section services-process">
        <div className="section-title">
          <h2>How We Work</h2>
          <p>A clear, four-step process designed to feel calm and fully supported at every stage.</p>
        </div>
        <div className="process-grid">
          {process.map((p) => (
            <div key={p.step} className="process-card">
              <span className="process-step">{p.step}</span>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MARKETING VISUAL ── */}
      <section className="section services-media">
        <div className="services-media-inner">
          <img src={brandServices} alt="Real Estate Services Overview" className="services-media-img" />
          <div className="services-media-text">
            <p className="eyebrow">Full-Service Support</p>
            <h2>One Team. Every Step.</h2>
            <p>
              From the first conversation to the final closing, The Quinlan Group handles every detail
              with the same level of care and precision. You never have to navigate it alone.
            </p>
            <Link className="btn primary" to="/contact">Book a Strategy Call</Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section services-faq">
        <div className="section-title">
          <h2>Frequently Asked Questions</h2>
          <p>Straight answers to the questions we hear most often.</p>
        </div>
        <div className="faq-grid">
          {[
            {
              q: 'How long does it take to buy or sell a home?',
              a: 'It varies by market conditions and goals, but most transactions close within 30–60 days once under contract. We\'ll give you a realistic timeline in your initial consultation.',
            },
            {
              q: 'Do you work with first-time buyers?',
              a: 'Absolutely. We specialize in guiding first-time buyers through the process with patience and clarity. We\'ll also provide a free copy of our RI First-Time Homebuyer Guide.',
            },
            {
              q: 'What does seller representation include?',
              a: 'Everything from pricing strategy and staging guidance to professional photography, social media campaigns, and expert negotiation. We manage the full process for you.',
            },
            {
              q: 'Do you work across all three states?',
              a: 'Yes. We actively serve clients in Rhode Island, Massachusetts, and Connecticut with licensed representation and local market knowledge in each area.',
            },
          ].map((faq) => (
            <div key={faq.q} className="faq-card">
              <h4>{faq.q}</h4>
              <p>{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link className="btn primary" to="/contact">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}

export default Services
