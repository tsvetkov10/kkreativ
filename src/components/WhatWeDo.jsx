import React from 'react';

const steps = [
  {
    num: "01",
    title: "GOAL\nALIGNMENT",
    desc: "Разучаваме всичко за бизнеса и нишата ти, след което изграждаме печеливша креативна концепция с ясни цели и цялостна естетика на профила.",
    image: "/photos-of-owners/concept.png"
  },
  {
    num: "02",
    title: "CONTENT\nCREATION",
    desc: "Идваме, снимаме, обработваме и публикуваме цялото съдържание - вие единствено се наслаждавате на резултатите :)",
    image: "/photos-of-owners/production.png"
  },
  {
    num: "03",
    title: "RAPID\nGROWTH",
    desc: "Следим растежа и анализираме реакцията и поведението на аудиторията, спрямо които адаптираме концепциите и надграждаме с всеки един месец.",
    image: "/photos-of-owners/services.png"
  }
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="section what-we-do-section" style={{ padding: '6rem 0', position: 'relative' }}>
      
      {/* Header */}
      <div className="container reveal-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <span 
          className="section-tag text-gold" 
          style={{ 
            fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
            fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', 
            letterSpacing: '0.06em', 
            textTransform: 'none',
            marginBottom: '0.5rem',
            display: 'inline-block'
          }}
        >
          [what we do]
        </span>
        <h2 style={{
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', 
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          margin: 0,
          color: 'var(--text-primary)'
        }}>
          ПРОЦЕСЪТ КЪМ РЕЗУЛТАТИТЕ
        </h2>
      </div>

      {/* 3 Step Cards Grid */}
      <div className="container">
        <div className="what-we-do-grid">
          {steps.map((step, idx) => (
            <div key={idx} className="what-we-do-card reveal-up" style={{ animationDelay: `${idx * 0.15}s` }}>
              
              {/* Image & Number Badge */}
              <div className="what-we-do-card-media">
                <img 
                  src={step.image} 
                  alt={step.title.replace('\n', ' ')} 
                  className="what-we-do-card-img" 
                  loading="lazy" 
                />
                <div className="what-we-do-card-overlay">
                  <span className="what-we-do-number">{step.num}</span>
                </div>
              </div>

              {/* Title in Akira Expanded */}
              <h3 style={{
                fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
                fontSize: 'clamp(1.3rem, 1.8vw, 1.6rem)',
                lineHeight: 1.25,
                letterSpacing: '0.02em',
                color: 'var(--text-primary)',
                margin: 0,
                whiteSpace: 'pre-line'
              }}>
                {step.title}
              </h3>

              {/* Gold Accent Divider */}
              <div style={{ width: '36px', height: '2px', background: 'var(--gold-gradient)', margin: '1.1rem 0' }}></div>

              {/* Description Copy */}
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.98rem',
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: 0
              }}>
                {step.desc}
              </p>

            </div>
          ))}
        </div>
      </div>

      <style>{`
        .what-we-do-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.2rem;
          width: 100%;
        }

        .what-we-do-card {
          background: rgba(18, 18, 22, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 1.75rem;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease;
        }

        .what-we-do-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.45);
          box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(212, 175, 55, 0.12);
        }

        .what-we-do-card-media {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 1.6rem;
          background: #141416;
        }

        .what-we-do-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .what-we-do-card:hover .what-we-do-card-img {
          transform: scale(1.06);
        }

        .what-we-do-card-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.6) 100%);
          pointer-events: none;
        }

        .what-we-do-number {
          font-size: clamp(3.8rem, 5.5vw, 5rem);
          font-weight: 900;
          font-family: var(--font-sans);
          color: #ffffff;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.85);
          letter-spacing: -0.02em;
          user-select: none;
        }

        @media (max-width: 1024px) {
          .what-we-do-grid {
            grid-template-columns: 1fr;
            max-width: 540px;
            margin: 0 auto;
            gap: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
