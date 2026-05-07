import { useState } from 'react'
import bryanPhoto from '../assets/bryan-quinlan.png'
import rebeccaPhoto from '../assets/rebecca-manchester.png'

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: 'Buying', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email) setSubmitted(true)
  }

  return (
    <>
      <section className="page-hero">
        <p className="eyebrow">Let's Talk</p>
        <h1 className="page-hero-title">Contact The Quinlan Group</h1>
        <p className="page-hero-sub">
          Let's make your next move feel effortless. We reply within 24 hours and offer
          private consultations — no pressure, just clarity and honest guidance.
        </p>
      </section>

      <section className="section contact-page">
        <div className="contact-grid">
          {/* ── LEFT: Team Contacts ── */}
          <div className="contact-left">
            <div className="contact-team-card">
              <img src={bryanPhoto} alt="Bryan Quinlan" className="contact-team-photo" />
              <div>
                <p className="contact-label">Bryan Quinlan</p>
                <p className="contact-team-role">Team Lead · Market Strategist</p>
                <a href="tel:+14012157582" className="contact-team-phone">401-215-7582</a>
                <a href="mailto:bryanq@therise.group" className="contact-team-email">bryanq@therise.group</a>
              </div>
            </div>

            <div className="contact-team-card">
              <img src={rebeccaPhoto} alt="Rebecca Ann Manchester" className="contact-team-photo" />
              <div>
                <p className="contact-label">Rebecca Ann Manchester</p>
                <p className="contact-team-role">Realtor · Client Advisor</p>
                <a href="tel:+15086427521" className="contact-team-phone">508-642-7521</a>
                <a href="mailto:rebecca@therise.group" className="contact-team-email">rebecca@therise.group</a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-row">
                <p className="contact-label">Brokerage</p>
                <p>Keller Williams Leading Edge Realty</p>
              </div>
              <div className="contact-info-row">
                <p className="contact-label">Service Area</p>
                <p>Rhode Island · Massachusetts · Connecticut</p>
              </div>
              <div className="contact-info-row">
                <p className="contact-label">Response Time</p>
                <p>Within 24 hours — typically same day</p>
              </div>
              <div className="contact-info-row">
                <p className="contact-label">Featured On</p>
                <p>Projo · WPRI · WNRI · The Rhode Show</p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form ── */}
          <div className="form-card">
            {submitted ? (
              <div className="form-success">
                <div className="form-success-icon">✓</div>
                <h3>Message received.</h3>
                <p>
                  Thank you, {form.name.split(' ')[0]}. A member of The Quinlan Group will reach out
                  within 24 hours to schedule your private consultation.
                </p>
                <p className="form-success-note">
                  Need something sooner? Call us directly at{' '}
                  <a href="tel:+14012157582">401-215-7582</a>.
                </p>
              </div>
            ) : (
              <>
                <p className="contact-label">Private Consultation</p>
                <h3>Tell us about your goals.</h3>
                <p className="form-intro">
                  Whether you're buying, selling, or exploring your options — we're here to listen
                  and build a plan around what matters to you.
                </p>
                <form className="form-grid" onSubmit={handleSubmit}>
                  <div className="contact-form-row-pair">
                    <div className="form-row">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="email">Email *</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="you@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="contact-form-row-pair">
                    <div className="form-row">
                      <label htmlFor="phone">Phone</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="(401) 000-0000"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-row">
                      <label htmlFor="goal">I'm looking to…</label>
                      <select id="goal" value={form.goal} onChange={handleChange}>
                        <option>Buying</option>
                        <option>Selling</option>
                        <option>Investing</option>
                        <option>Just exploring</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      rows="5"
                      placeholder="Tell us your timeline, location, budget, or anything else on your mind."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  <button className="btn primary contact-submit-btn" type="submit">
                    Send Inquiry
                  </button>
                  <p className="form-note">No spam. No hard sell. We reply within 24 hours.</p>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── QUICK ACTIONS ── */}
      <section className="section contact-quick">
        <div className="section-title">
          <h2>Prefer a Direct Line?</h2>
          <p>Reach out however works best for you.</p>
        </div>
        <div className="contact-quick-grid">
          <a href="tel:+14012157582" className="quick-action-card">
            <span className="quick-icon">📞</span>
            <h3>Call Bryan</h3>
            <p>401-215-7582</p>
          </a>
          <a href="tel:+15086427521" className="quick-action-card">
            <span className="quick-icon">📞</span>
            <h3>Call Rebecca</h3>
            <p>508-642-7521</p>
          </a>
          <a href="mailto:bryanq@therise.group" className="quick-action-card">
            <span className="quick-icon">✉</span>
            <h3>Email Bryan</h3>
            <p>bryanq@therise.group</p>
          </a>
          <a href="mailto:rebecca@therise.group" className="quick-action-card">
            <span className="quick-icon">✉</span>
            <h3>Email Rebecca</h3>
            <p>rebecca@therise.group</p>
          </a>
        </div>
      </section>
    </>
  )
}

export default Contact
