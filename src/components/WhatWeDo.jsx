import React from 'react';

const steps = [
  {
    title: 'Strategy First',
    desc: 'We align on goals, audience, and content direction before anything goes live.',
    icon: (
      /* 4 Diamonds Cluster */
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Top diamond */}
        <path d="M14 2L18.5 6.5L14 11L9.5 6.5Z" fill="#111111" />
        {/* Right diamond */}
        <path d="M21.5 9.5L26 14L21.5 18.5L17 14Z" fill="#111111" />
        {/* Bottom diamond */}
        <path d="M14 17L18.5 21.5L14 26L9.5 21.5Z" fill="#111111" />
        {/* Left diamond */}
        <path d="M6.5 9.5L11 14L6.5 18.5L2 14Z" fill="#111111" />
      </svg>
    )
  },
  {
    title: 'Create & Manage',
    desc: 'We handle the production, scheduling, and posting across all key platforms.',
    icon: (
      /* Smartphone Icon */
      <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="1" width="18" height="30" rx="4.5" fill="#111111" />
        <circle cx="12" cy="26.5" r="1.4" fill="#F7F2EA" />
        <rect x="9.5" y="4.5" width="5" height="1.2" rx="0.6" fill="#3D3D40" />
      </svg>
    )
  },
  {
    title: 'Review & Refine',
    desc: 'We track performance, learn what’s working, and adjust as needed.',
    icon: (
      /* Review & Refine Card */
      <svg width="32" height="30" viewBox="0 0 32 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="26" height="24" rx="5" fill="#111111" />
        <rect x="7.5" y="8" width="17" height="2.4" rx="1.2" fill="#F7F2EA" />
        <rect x="7.5" y="13.8" width="17" height="2.4" rx="1.2" fill="#F7F2EA" />
        <rect x="7.5" y="19.5" width="11" height="2.4" rx="1.2" fill="#F7F2EA" />
      </svg>
    )
  }
];

export default function WhatWeDo() {
  return (
    <section id="what-we-do" className="services-process-section">
      <div className="container">
        
        {/* Section Header */}
        <div className="services-header reveal-up">
          <span className="services-tag">[services]</span>
          <h2 className="services-title">
            We like to keep<br />
            things <span className="services-title-italic">nice</span> and simple
          </h2>
        </div>

        {/* Steps Grid & Animated Connection Track */}
        <div className="services-steps-wrapper">
          
          {/* Desktop Curved Connector SVG */}
          <div className="services-connector-desktop" aria-hidden="true">
            <svg
              className="services-curve-svg"
              viewBox="0 0 1000 96"
              preserveAspectRatio="none"
            >
              {/* Subtle guide track */}
              <path
                d="M 166.7 48 C 277.8 82, 388.9 82, 500 48 C 611.1 14, 722.2 14, 833.3 48"
                fill="none"
                stroke="#DDD9D3"
                strokeWidth="2.5"
                strokeLinecap="round"
              />

              {/* Constant flowing dash stream */}
              <path
                d="M 166.7 48 C 277.8 82, 388.9 82, 500 48 C 611.1 14, 722.2 14, 833.3 48"
                fill="none"
                stroke="#A8A297"
                strokeWidth="2"
                strokeDasharray="6 12"
                className="services-dash-stream"
              />

              {/* Traveling Arrow 1 */}
              <g className="services-arrow-runner">
                <path
                  d="M -8 -5 L 4 0 L -8 5 L -5 0 Z"
                  fill="#111111"
                />
                <circle cx="-11" cy="0" r="1.8" fill="#111111" opacity="0.6" />
                <circle cx="-17" cy="0" r="1.1" fill="#111111" opacity="0.3" />
                <animateMotion
                  path="M 166.7 48 C 277.8 82, 388.9 82, 500 48 C 611.1 14, 722.2 14, 833.3 48"
                  dur="3.2s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </g>

              {/* Traveling Arrow 2 (offset by 1.6s so both segments always show motion) */}
              <g className="services-arrow-runner">
                <path
                  d="M -8 -5 L 4 0 L -8 5 L -5 0 Z"
                  fill="#111111"
                />
                <circle cx="-11" cy="0" r="1.8" fill="#111111" opacity="0.6" />
                <circle cx="-17" cy="0" r="1.1" fill="#111111" opacity="0.3" />
                <animateMotion
                  path="M 166.7 48 C 277.8 82, 388.9 82, 500 48 C 611.1 14, 722.2 14, 833.3 48"
                  dur="3.2s"
                  begin="1.6s"
                  repeatCount="indefinite"
                  rotate="auto"
                />
              </g>
            </svg>
          </div>

          {/* 3 Step Cards */}
          <div className="services-steps-grid">
            {steps.map((step, idx) => (
              <React.Fragment key={idx}>
                <div className="services-step-card reveal-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                  
                  {/* Pebble / Squircle Icon Box */}
                  <div className="services-icon-box">
                    {step.icon}
                  </div>

                  {/* Step Title */}
                  <h3 className="services-step-title">
                    {step.title}
                  </h3>

                  {/* Step Description */}
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
                        stroke="#DDD9D3"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      <path
                        d={idx === 0 ? "M 20 0 C 35 22, 8 48, 20 70" : "M 20 0 C 5 22, 32 48, 20 70"}
                        stroke="#A8A297"
                        strokeWidth="2"
                        strokeDasharray="5 9"
                        className="services-dash-stream"
                      />
                      <g>
                        <path
                          d="M -7 -4.5 L 4 0 L -7 4.5 L -4 0 Z"
                          fill="#111111"
                        />
                        <animateMotion
                          path={idx === 0 ? "M 20 0 C 35 22, 8 48, 20 70" : "M 20 0 C 5 22, 32 48, 20 70"}
                          dur="1.8s"
                          repeatCount="indefinite"
                          rotate="auto"
                        />
                      </g>
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
          background-color: #F0EBE5;
          color: #111113;
          padding: 8rem 0 9rem 0;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .services-header {
          text-align: center;
          margin-bottom: 4.8rem;
        }

        .services-tag {
          font-family: var(--font-logo), 'Creating Minimalist', sans-serif;
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          letter-spacing: 0.06em;
          text-transform: none;
          color: #B38A2A;
          display: inline-block;
          margin-bottom: 0.6rem;
        }

        .services-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(2.4rem, 5.2vw, 4.2rem);
          font-weight: 700;
          line-height: 1.15;
          letter-spacing: -0.025em;
          color: #0E0E10;
          margin: 0 auto;
          max-width: 960px;
        }

        .services-title-italic {
          font-family: 'Lora', 'Instrument Serif', Georgia, serif;
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.01em;
          padding: 0 0.06em;
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
          height: 96px;
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

        .services-icon-box {
          width: 96px;
          height: 96px;
          border-radius: 26px;
          background: #F7F2EA;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.035), 0 1px 3px rgba(0, 0, 0, 0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 2.2rem;
          position: relative;
          z-index: 3;
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.35s ease,
                      border-color 0.35s ease;
        }

        .services-step-card:hover .services-icon-box {
          transform: translateY(-5px);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.05);
          border-color: rgba(179, 138, 42, 0.35);
        }

        .services-step-title {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1.3rem, 1.8vw, 1.6rem);
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: #111113;
          margin: 0 0 0.85rem 0;
        }

        .services-step-desc {
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(0.95rem, 1.05vw, 1.05rem);
          line-height: 1.65;
          color: #686259;
          margin: 0;
          max-width: 320px;
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
            padding: 6rem 0 6.5rem 0;
          }
        }
      `}</style>
    </section>
  );
}
