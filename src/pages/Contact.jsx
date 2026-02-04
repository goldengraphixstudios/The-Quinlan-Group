function Contact() {
  return (
    <section className="section contact-page">
      <div className="section-title">
        <h2>Contact</h2>
        <p>
          Let’s make your next move feel effortless. We reply within 24 hours and
          offer private consultations for buyers and sellers.
        </p>
      </div>
      <div className="contact-grid">
        <div>
          <div className="contact-card">
            <div>
              <p className="contact-label">Phone</p>
              <a href="tel:+15086427521">508-642-7521</a>
            </div>
            <div>
              <p className="contact-label">Email</p>
              <a href="mailto:Rebecca.manchester@kw.com">
                Rebecca.manchester@kw.com
              </a>
            </div>
            <div>
              <p className="contact-label">Service Area</p>
              <p>Rhode Island · Massachusetts · Connecticut</p>
            </div>
          </div>
        </div>
        <div className="form-card">
          <p className="contact-label">Private Consultation</p>
          <h3>Tell us about your goals.</h3>
          <p>
            This is a temporary form placeholder. We can wire it to email or a CRM
            once you decide on the platform.
          </p>
          <div className="form-grid">
            <div className="form-row">
              <label htmlFor="name">Full Name</label>
              <input id="name" type="text" placeholder="Your name" />
            </div>
            <div className="form-row">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@email.com" />
            </div>
            <div className="form-row">
              <label htmlFor="goal">Goal</label>
              <select id="goal">
                <option>Buying</option>
                <option>Selling</option>
                <option>Investing</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows="4" placeholder="Tell us the vision." />
            </div>
          </div>
          <button className="btn primary" type="button">
            Send Inquiry
          </button>
        </div>
      </div>
    </section>
  )
}

export default Contact
