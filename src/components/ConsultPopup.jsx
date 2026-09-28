import { useEffect, useRef, useState } from 'react'

export default function ConsultPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', phone: '', goal: 'Buying', message: '' })
  const timerRef = useRef(null)

  useEffect(() => {
    const alreadyDismissed = sessionStorage.getItem('tqg_popup_dismissed')
    if (alreadyDismissed) return

    // Staggered well after the Florida toast (4s) so the two never stack.
    timerRef.current = setTimeout(() => {
      setVisible(true)
    }, 25000)

    const onExitIntent = (e) => {
      if (e.clientY <= 0 && !dismissed) {
        clearTimeout(timerRef.current)
        const alreadyDismissed2 = sessionStorage.getItem('tqg_popup_dismissed')
        if (!alreadyDismissed2) setVisible(true)
      }
    }
    document.addEventListener('mouseleave', onExitIntent)

    return () => {
      clearTimeout(timerRef.current)
      document.removeEventListener('mouseleave', onExitIntent)
    }
  }, [dismissed])

  const close = () => {
    setVisible(false)
    setDismissed(true)
    sessionStorage.setItem('tqg_popup_dismissed', '1')
  }

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email) return
    setSubmitted(true)
  }

  if (!visible) return null

  return (
    <div className="popup-overlay" role="dialog" aria-modal="true" aria-label="Private Consultation">
      <button className="popup-backdrop" type="button" aria-label="Close" onClick={close} />
      <div className="popup-card">
        <button className="popup-close" type="button" onClick={close} aria-label="Close popup">
          ✕
        </button>

        {submitted ? (
          <div className="popup-success">
            <div className="popup-success-icon">✓</div>
            <h3>We'll be in touch.</h3>
            <p>
              Thank you, {form.name.split(' ')[0]}. A member of The Quinlan Group will reach out
              within 24 hours to schedule your private consultation.
            </p>
            <button className="btn primary popup-done-btn" type="button" onClick={close}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="popup-header">
              <p className="popup-eyebrow">Private Consultation · No Obligation</p>
              <h2 className="popup-title">
                {step === 1 ? 'Ready to make your move?' : 'Tell us your goals.'}
              </h2>
              <p className="popup-sub">
                {step === 1
                  ? 'The Quinlan Group has helped 200+ families across RI, MA & CT. Let\'s talk about yours.'
                  : 'We\'ll reach out within 24 hours with a personalized strategy.'}
              </p>
            </div>

            <form className="popup-form" onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="popup-field">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="popup-field">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="popup-field">
                    <label htmlFor="goal">I'm looking to…</label>
                    <select id="goal" value={form.goal} onChange={handleChange}>
                      <option>Buying</option>
                      <option>Selling</option>
                      <option>Investing</option>
                      <option>Just exploring</option>
                    </select>
                  </div>
                  <button
                    className="btn primary popup-btn"
                    type="button"
                    onClick={() => {
                      if (form.name && form.email) setStep(2)
                    }}
                  >
                    Continue →
                  </button>
                </>
              ) : (
                <>
                  <div className="popup-field">
                    <label htmlFor="phone">Phone (optional)</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="(401) 000-0000"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="popup-field">
                    <label htmlFor="message">Anything you'd like us to know?</label>
                    <textarea
                      id="message"
                      rows="3"
                      placeholder="Timeline, location, budget — anything helps."
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="popup-step2-actions">
                    <button
                      className="btn ghost popup-back-btn"
                      type="button"
                      onClick={() => setStep(1)}
                    >
                      ← Back
                    </button>
                    <button className="btn primary popup-btn" type="submit">
                      Request Consultation
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="popup-trust">
              <span>8+ Years</span>
              <span className="popup-dot">·</span>
              <span>200+ Families</span>
              <span className="popup-dot">·</span>
              <span>RI · MA · CT</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
