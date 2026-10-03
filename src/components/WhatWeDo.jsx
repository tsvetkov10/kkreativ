import React from 'react';

const steps = [
  {
    num: "01",
    title: "BRAND\nSTRATEGY",
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
    title: "MONTHLY\nANALYSIS",
    desc: "Следим растежа и анализираме реакцията и поведението на аудиторията, спрямо които адаптираме концепциите и надграждаме с всеки един месец.",
    image: "/photos-of-owners/services.png"
  }
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="services-process-section">
      <div className="container">
        
        {/* Header Block */}
        <div className="services-header reveal-up">
          <span className="services-tag">[services]</span>
          <h2 className="services-title">
            С ДВЕ ДУМИ, НИЕ ПОЕМАМЕ ВСИЧКО.
          </h2>
        </div>

        {/* Steps Grid & Animated Connection Track */}
        <div className="services-steps-wrapper">
          
          {/* Desktop Curved Connector SVG */}
          <div className="services-connector-desktop" aria-hidden="true">
            <svg
              className="services-curve-svg"
              viewBox="0 0 1000 195"
              preserveAspectRatio="none"
            >
              {/* Guide track line */}
              <path
                d="M 166.7 97.5 C 277.8 155, 388.9 155, 500 97.5 C 611.1 40, 722.2 40, 833.3 97.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Constant flowing gold dash stream */}
              <path
                d="M 166.7 97.5 C 277.8 155, 388.9 155, 500 97.5 C 611.1 40, 722.2 40, 833.3 97.5"
                fill="none"
                stroke="rgba(212, 175, 55, 0.75)"
                strokeWidth="2.5"
                strokeDasharray="8 14"
                className="services-dash-stream"
              />
            </svg>
          </div>

          {/* 3 Step Cards */}
          <div className="services-steps-grid">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="services-step-card reveal-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  
                  {/* Photo Box where the arrow travels */}
                  <div className="services-photo-box">
                    <img 
                      src={step.image} 
                      alt={step.title.replace('\n', ' ')} 
                      className="services-photo-img" 
                      loading="lazy" 
                    />
                    <div className="services-photo-overlay" />
                    <span className="services-photo-badge">{step.num}</span>
                  </div>

                  {/* Step Title in Akira Expanded */}
                  <h3 className="services-step-title">
                    {step.title}
                  </h3>

                  {/* Gold Gradient Divider */}
                  <div className="services-step-divider" />

                  {/* Description Copy */}
                  <p className="services-step-desc">
                    {step.desc}
                  </p>

                </div>

                {/* Mobile-Only Vertical Connector between steps */}
                {idx < steps.length - 1 && (
                  <div className="services-mobile-connector" aria-hidden="true">
                    <svg width="40" height="70" viewBox="0 0 40 70" fill="none">
                      <path
                        d={idx === 0 ? "M 20 0 C 35 22, 8 48, 20 70" : "M 20 0 C 5 22, 32 48, 20 70"}
                        stroke="rgba(255, 255, 255, 0.12)"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d={idx === 0 ? "M 20 0 C 35 22, 8 48, 20 70" : "M 20 0 C 5 22, 32 48, 20 70"}
                        stroke="rgba(212, 175, 55, 0.75)"
                        strokeWidth="2"
                        strokeDasharray="5 9"
                        className="services-dash-stream"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        .services-process-section {
          background-color: transparent;
          color: var(--text-primary, #f4f4f5);
          padding: 7rem 0 8rem 0;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .services-header {
          text-align: center;
          margin-bottom: 4.5rem;
        }

        .services-tag {
          font-family: var(--font-logo), 'Creating Minimalist', sans-serif;
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          letter-spacing: 0.06em;
          text-transform: none;
          color: var(--gold-main, #d4af37);
          display: inline-block;
          margin-bottom: 0.5rem;
        }

        .services-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.1rem, 4.4vw, 3.6rem);
          font-weight: 800;
          line-height: 1.2;
          letter-spacing: -0.02em;
          color: var(--text-primary, #f4f4f5);
          margin: 0 auto;
          max-width: 980px;
          text-transform: uppercase;
        }

        .services-steps-wrapper {
          position: relative;
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-connector-desktop {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 195px;
          pointer-events: none;
          z-index: 1;
        }

        .services-curve-svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        .services-dash-stream {
          animation: flowStream 1.4s linear infinite;
        }

        @keyframes flowStream {
          from {
            stroke-dashoffset: 36;
          }
          to {
            stroke-dashoffset: 0;
          }
        }

        .services-steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
          position: relative;
          z-index: 2;
          width: 100%;
        }

        .services-step-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }

        .services-photo-box {
          width: 100%;
          max-width: 260px;
          aspect-ratio: 4 / 3;
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          z-index: 2;
          background: #141416;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6), 0 0 20px rgba(212, 175, 55, 0.08);
          margin-bottom: 1.8rem;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s ease,
                      box-shadow 0.4s ease;
        }

        .services-step-card:hover .services-photo-box {
          transform: translateY(-6px);
          border-color: rgba(212, 175, 55, 0.55);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.8), 0 0 25px rgba(212, 175, 55, 0.22);
        }

        .services-photo-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .services-step-card:hover .services-photo-img {
          transform: scale(1.07);
        }

        .services-photo-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.5) 100%);
          pointer-events: none;
        }

        .services-photo-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background: rgba(14, 14, 18, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: var(--gold-main, #d4af37);
          font-family: var(--font-display), 'Akira Expanded', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
          padding: 0.25rem 0.6rem;
          border-radius: 8px;
          pointer-events: none;
        }

        .services-step-title {
          font-family: var(--font-display), 'Akira Expanded', sans-serif;
          font-size: clamp(1.2rem, 1.6vw, 1.5rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: 0.02em;
          color: var(--text-primary, #f4f4f5);
          margin: 0;
          white-space: pre-line;
        }

        .services-step-divider {
          width: 36px;
          height: 2px;
          background: var(--gold-gradient, linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%));
          margin: 1.1rem auto;
        }

        .services-step-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.92rem, 1.05vw, 1rem);
          line-height: 1.7;
          color: var(--text-secondary, #a1a1aa);
          margin: 0;
          max-width: 340px;
          font-weight: 400;
        }

        .services-mobile-connector {
          display: none;
        }

        @media (max-width: 899px) {
          .services-connector-desktop {
            display: none;
          }

          .services-steps-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0;
            max-width: 440px;
            margin: 0 auto;
          }

          .services-photo-box {
            max-width: 300px;
          }

          .services-mobile-connector {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0.8rem 0 1.8rem 0;
            width: 100%;
          }

          .services-header {
            margin-bottom: 3.5rem;
          }

          .services-process-section {
            padding: 5.5rem 0 6rem 0;
          }
        }
      `}</style>
    </section>
  );
}
