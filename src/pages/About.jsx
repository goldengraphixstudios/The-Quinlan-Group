import { Link } from 'react-router-dom'
import bryanPhoto from '../assets/bryan-quinlan.png'
import rebeccaPhoto from '../assets/rebecca-manchester.png'
import aboutUsImg from '../assets/about-us.jpg'
import brandAchievements from '../assets/brand-achievements.jpg'

function About() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="page-hero">
        <p className="eyebrow">Our Story</p>
        <h1 className="page-hero-title">About The Quinlan Group</h1>
        <p className="page-hero-sub">
          A family-driven real estate team serving clients across Rhode Island, Massachusetts,
          and Connecticut with integrity, modern strategy, and a relationship-first approach.
        </p>
      </section>

      {/* ── STORY SECTION ── */}
      <section className="section about-story">
        <div className="about-story-grid">
          <div className="about-story-text">
            <p className="eyebrow">Since 2017</p>
            <h2>Built on Integrity. Driven by People.</h2>
            <p>
              The Quinlan Group is a family-driven real estate team serving clients across Rhode Island,
              Massachusetts, and Connecticut. Built on integrity, expertise, and a true client-first
              approach, the team is known for combining honest guidance, modern marketing, and strong
              local market knowledge to help buyers, sellers, and investors move with confidence.
            </p>
            <p>
              Since 2017, The Quinlan Group has helped more than 200 families navigate major real
              estate decisions with a process designed to feel clear, personal, and fully supported.
              Rather than a one-size-fits-all approach, every client receives tailored strategy,
              thoughtful communication, and a team that treats their goals like their own.
            </p>
            <p>
              From first showings to final signatures, The Quinlan Group focuses on making complex
              transactions feel calm, intentional, and results-driven.
            </p>
            <div className="about-stats">
              <div>
                <span>200+</span>
                <p>Families guided</p>
              </div>
              <div>
                <span>8+</span>
                <p>Years in the market</p>
              </div>
              <div>
                <span>3</span>
                <p>States served</p>
              </div>
            </div>
          </div>
          <div className="about-story-img">
            <img src={aboutUsImg} alt="The Quinlan Group" />
          </div>
        </div>
      </section>

      {/* ── MISSION & VALUES ── */}
      <section className="section about-values">
        <div className="section-title">
          <h2>Mission & Values</h2>
          <p>
            Everything we do is anchored in these commitments — to clients, to craft, and to community.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">◈</div>
            <h3>Our Mission</h3>
            <p>
              To make every transaction feel simple and supported through transparent communication,
              modern strategy, and a calm, client-first experience from start to finish.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">◆</div>
            <h3>Our Values</h3>
            <p>
              Authentic relationships, precision guidance, and unwavering trust — the foundation
              of every move we make and every conversation we have.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-icon">◉</div>
            <h3>Service Area</h3>
            <p>
              Rhode Island, Massachusetts, and Connecticut with deep local market intelligence,
              community presence, and cross-state transaction experience.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section team-full">
        <div className="section-title">
          <h2>The People Behind the Group</h2>
          <p>Experienced, approachable, and genuinely invested in your outcome.</p>
        </div>
        <div className="team-full-grid">
          <div className="team-full-card">
            <div className="team-full-photo-wrap">
              <img src={bryanPhoto} alt="Bryan Quinlan" />
              <div className="team-full-photo-glow" />
            </div>
            <div className="team-full-info">
              <p className="eyebrow">Team Lead</p>
              <h3>Bryan Quinlan</h3>
              <p className="team-full-role">Market Strategist · Buyer & Seller Advisor</p>
              <p>
                Bryan is the strategic engine behind The Quinlan Group. With deep regional market
                knowledge and a calm, results-oriented approach, he guides buyers and sellers through
                every phase of the process with precision and care. Whether negotiating a complex
                multi-family deal or positioning a single-family home for maximum value, Bryan brings
                the same intentional focus every time.
              </p>
              <p>
                His belief: every client deserves honest strategy, clear communication, and a team
                that's fully invested in their outcome — not just the transaction.
              </p>
              <div className="team-full-contact">
                <a href="tel:+14012157582" className="team-contact-item">
                  <span className="contact-icon">📞</span>
                  <span>401-215-7582</span>
                </a>
                <a href="mailto:bryanq@therise.group" className="team-contact-item">
                  <span className="contact-icon">✉</span>
                  <span>bryanq@therise.group</span>
                </a>
              </div>
              <Link className="btn ghost team-contact-btn" to="/contact">
                Connect with Bryan
              </Link>
            </div>
          </div>

          <div className="team-full-card team-full-card--reverse">
            <div className="team-full-photo-wrap">
              <img src={rebeccaPhoto} alt="Rebecca Ann Manchester" />
              <div className="team-full-photo-glow" />
            </div>
            <div className="team-full-info">
              <p className="eyebrow">Client Advisor</p>
              <h3>Rebecca Ann Manchester</h3>
              <p className="team-full-role">Realtor · Relationship-Driven Advisor</p>
              <p>
                Rebecca is the heart of the client experience at The Quinlan Group. Known for her
                warmth, responsiveness, and genuine care, she makes the process feel personal and
                supported from the very first conversation. Her relationship-first philosophy means
                clients never feel like a number — they feel like family.
              </p>
              <p>
                With visibility across regional media including Projo, WPRI, and WNRI, Rebecca brings
                both credibility and approachability to every client interaction.
              </p>
              <div className="team-full-contact">
                <a href="tel:+15086427521" className="team-contact-item">
                  <span className="contact-icon">📞</span>
                  <span>508-642-7521</span>
                </a>
                <a href="mailto:rebecca@therise.group" className="team-contact-item">
                  <span className="contact-icon">✉</span>
                  <span>rebecca@therise.group</span>
                </a>
              </div>
              <Link className="btn ghost team-contact-btn" to="/contact">
                Connect with Rebecca
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section className="section about-achievements">
        <div className="about-achievements-inner">
          <img src={brandAchievements} alt="Quinlan Group Achievements" className="achievements-img" />
          <div className="achievements-text">
            <p className="eyebrow">Recognition & Results</p>
            <h2>A Track Record Built on Trust</h2>
            <p>
              Featured on Projo, WPRI, and WNRI — The Quinlan Group has established itself as one of
              Rhode Island's most recognized real estate teams. But the numbers that matter most are the
              families helped, the goals achieved, and the trust earned along the way.
            </p>
            <div className="achievements-press">
              <span className="press-badge">Projo</span>
              <span className="press-badge">WPRI</span>
              <span className="press-badge">WNRI</span>
              <span className="press-badge">The Rhode Show</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLIENT EXPERIENCE ── */}
      <section className="section about-experience">
        <div className="about-highlight">
          <p className="eyebrow">The Client Experience</p>
          <h3>"With us, you're family."</h3>
          <p>
            We keep the process calm and transparent, with tailored strategy for each buyer and seller.
            No hard selling — just honest guidance, modern execution, and exceptional outcomes. From
            the first consultation to the closing table, we're with you every step of the way.
          </p>
          <Link className="btn primary" to="/contact">Schedule a Private Consultation</Link>
        </div>
      </section>
    </>
  )
}

export default About
