import { Link } from 'react-router-dom'

function Services() {
  return (
    <section className="section services">
      <div className="section-title">
        <h2>Services</h2>
        <p>
          Full-service real estate support for buyers, sellers, and investors —
          delivered with clarity, discretion, and a modern marketing edge.
        </p>
      </div>
      <div className="service-grid">
        <div className="service-card">
          <h3>Buyer Representation</h3>
          <p>
            Strategic search, private tours, and negotiation built on real-time
            local insight and a calm, guided process.
          </p>
        </div>
        <div className="service-card">
          <h3>Seller Strategy</h3>
          <p>
            Luxury-forward positioning, pricing strategy, and staging direction to
            maximize attention and value.
          </p>
        </div>
        <div className="service-card">
          <h3>Marketing & Media</h3>
          <p>
            Premium listing assets, digital campaigns, and buyer-focused narratives
            that make properties feel unforgettable.
          </p>
        </div>
        <div className="service-card">
          <h3>Investment Advisory</h3>
          <p>
            Guidance for multi-family acquisitions, portfolio planning, and
            long-term equity growth.
          </p>
        </div>
      </div>
      <div className="section-cta">
        <Link className="btn primary" to="/contact">
          Book a Strategy Call
        </Link>
      </div>
    </section>
  )
}

export default Services
