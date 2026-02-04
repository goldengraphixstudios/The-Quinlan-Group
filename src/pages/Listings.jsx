import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listings } from '../data/listings'

function Listings() {
  const [activeListing, setActiveListing] = useState(null)

  return (
    <section className="section listings-page">
      <div className="section-title">
        <h2>Closed Listings</h2>
        <p>Recent successes, delivered with care and precision.</p>
      </div>
      <div className="listing-grid">
        {listings.map((listing) => (
          <button
            key={listing.id}
            type="button"
            className="listing-card"
            onClick={() => setActiveListing(listing)}
          >
            <img src={listing.image} alt={listing.title} />
            <div className="listing-meta">
              <span className="listing-tag">{listing.tag}</span>
              <h3>{listing.title}</h3>
              <p>{listing.details}</p>
            </div>
          </button>
        ))}
      </div>
      <div className="future-slot">
        <div className="future-card">
          <span>Future Listing</span>
          <h3>Your next success story belongs here.</h3>
          <p>
            Secure a private consultation and let’s position your property with a
            luxury-forward marketing plan.
          </p>
          <Link className="btn ghost" to="/contact">
            Request a Listing Strategy
          </Link>
        </div>
      </div>

      {activeListing ? (
        <div className="modal" role="dialog" aria-modal="true">
          <button
            className="modal-backdrop"
            type="button"
            aria-label="Close listing details"
            onClick={() => setActiveListing(null)}
          />
          <div className="modal-card">
            <button
              type="button"
              className="modal-close"
              onClick={() => setActiveListing(null)}
            >
              Close
            </button>
            <img src={activeListing.image} alt={activeListing.title} />
            <div className="modal-content">
              <span className="listing-tag">{activeListing.tag}</span>
              <h3>{activeListing.title}</h3>
              <p>{activeListing.details}</p>
              <p className="modal-highlight">{activeListing.highlight}</p>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  )
}

export default Listings
