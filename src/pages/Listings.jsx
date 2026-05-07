import { useState } from 'react'
import { Link } from 'react-router-dom'
import { listings } from '../data/listings'

const STATUS_FILTERS = ['All', 'Just Sold', 'Just Closed', 'Closed Deal', 'Under Contract']

function GalleryModal({ listing, onClose }) {
  const [activeImg, setActiveImg] = useState(0)
  const gallery = listing.gallery || [listing.image]

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={listing.title}>
      <button
        className="modal-backdrop"
        type="button"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="modal-card modal-card--listing">
        <button type="button" className="modal-close" onClick={onClose}>✕ Close</button>
        <div className="modal-gallery">
          <img
            src={gallery[activeImg]}
            alt={listing.title}
            className="modal-gallery-main"
          />
          {gallery.length > 1 && (
            <div className="modal-gallery-thumbs">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  className={`gallery-thumb${activeImg === i ? ' active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img src={img} alt={`View ${i + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="modal-content">
          <span className="listing-tag">{listing.tag}</span>
          <h3>{listing.title}</h3>
          <div className="modal-specs">
            {listing.beds && <span>{listing.beds} beds</span>}
            {listing.baths && <span>{listing.baths} baths</span>}
            <span>{listing.sqft} sqft</span>
          </div>
          <p>{listing.details}</p>
          <p className="modal-highlight">{listing.highlight}</p>
          {listing.description && <p className="modal-description">{listing.description}</p>}
          <Link className="btn primary modal-cta" to="/contact">
            Discuss This Property
          </Link>
        </div>
      </div>
    </div>
  )
}

function Listings() {
  const [activeListing, setActiveListing] = useState(null)
  const [filter, setFilter] = useState('All')

  const filtered = filter === 'All'
    ? listings
    : listings.filter((l) => l.tag === filter)

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Portfolio</p>
        <h1 className="page-hero-title">Closed Listings</h1>
        <p className="page-hero-sub">
          Recent successes across Rhode Island, Massachusetts, and Connecticut —
          each delivered with precision, care, and a results-first strategy.
        </p>
      </section>

      <section className="section listings-page">
        <div className="listings-filters">
          {STATUS_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={`filter-btn${filter === f ? ' active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="listing-grid listing-grid--3col">
          {filtered.map((listing) => (
            <button
              key={listing.id}
              type="button"
              className="listing-card"
              onClick={() => setActiveListing(listing)}
            >
              <div className="listing-card-img-wrap">
                <img src={listing.image} alt={listing.title} />
                <span className="listing-tag-overlay">{listing.tag}</span>
                {listing.gallery && listing.gallery.length > 1 && (
                  <span className="listing-photo-count">+{listing.gallery.length} photos</span>
                )}
              </div>
              <div className="listing-meta">
                <h3>{listing.title}</h3>
                <p className="listing-details">{listing.details}</p>
                <p className="listing-highlight">{listing.highlight}</p>
                <span className="listing-view-link">View Details →</span>
              </div>
            </button>
          ))}
        </div>

        <div className="future-slot">
          <div className="future-card">
            <span>Future Listing</span>
            <h3>Your next success story belongs here.</h3>
            <p>
              Secure a private consultation and let's position your property with a
              luxury-forward marketing plan designed to maximize attention and value.
            </p>
            <Link className="btn primary" to="/contact">
              Request a Listing Strategy
            </Link>
          </div>
        </div>
      </section>

      {activeListing && (
        <GalleryModal listing={activeListing} onClose={() => setActiveListing(null)} />
      )}
    </>
  )
}

export default Listings
