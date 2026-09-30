import React from 'react';

const brandLogos = [
  {
    name: 'Acai Hero',
    src: '/brands/Acai_Hero.png',
    height: 64,
    alt: 'Acai Hero'
  },
  {
    name: 'Autolux Import',
    src: '/brands/Autolux_Import.png?v=2',
    height: 62,
    alt: 'Autolux Import'
  },
  {
    name: 'Ice Pro',
    src: '/brands/Ice_Pro.png',
    height: 60,
    alt: 'Ice Pro'
  },
  {
    name: 'Leos Pasta',
    src: '/brands/Leos_Pasta.png',
    height: 105,
    offsetY: -4,
    alt: "Leo's Pasta"
  },
  {
    name: 'Pawmatix',
    src: '/brands/Pawmatix.png',
    height: 64,
    alt: 'Pawmatix'
  },
  {
    name: 'Roche',
    src: '/brands/Roche.png',
    height: 56,
    alt: 'Roche'
  },
  {
    name: 'Studio 63',
    src: '/brands/Studio_63.png',
    height: 98,
    alt: 'Studio 63'
  }
];

export default function WallOfLove() {
  return (
    <section className="section trusted-by-section" id="family">
      {/* Section Header */}
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div className="section-header reveal-up" style={{ marginBottom: '3.5rem', maxWidth: '1000px' }}>
          <span className="section-tag text-gold" style={{ 
            fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
            letterSpacing: '0.06em', 
            textTransform: 'none',
            lineHeight: 1,
            marginBottom: '0.35rem',
            display: 'inline-block'
          }}>
            [family]
          </span>
          <h2 style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', 
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--text-primary)'
          }}>
            БРАНДОВЕТЕ, КОИТО НИ СЕ ДОВЕРИХА
          </h2>
        </div>
      </div>

      {/* Infinite Seamless Scrolling Logo Marquee */}
      <div className="trusted-marquee-wrapper">
        <div className="trusted-marquee-track">
          {[0, 1, 2, 3].map((groupIndex) => (
            <div 
              key={`grp-${groupIndex}`} 
              className="trusted-marquee-group" 
              aria-hidden={groupIndex > 0 ? "true" : undefined}
            >
              {brandLogos.map((logo, idx) => (
                <div key={`logo-${groupIndex}-${idx}`} className="trusted-logo-item">
                  <img 
                    src={logo.src} 
                    alt={logo.alt}
                    style={{ 
                      height: `calc(${logo.height}px * var(--logo-scale, 1))`,
                      transform: logo.offsetY 
                        ? `translateY(calc(${logo.offsetY}px * var(--logo-scale, 1)))` 
                        : undefined
                    }} 
                    loading="eager"
                    decoding="sync"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .trusted-by-section {
          position: relative;
          width: 100%;
          padding: 4rem 0 6rem;
          background: transparent;
          overflow: hidden;
          z-index: 2;
        }

        .trusted-marquee-wrapper {
          --logo-scale: 1;
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 1.5rem 0;
          display: flex;
        }

        /* Gradient fade edge masks */
        .trusted-marquee-wrapper::before,
        .trusted-marquee-wrapper::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 3;
          pointer-events: none;
        }

        .trusted-marquee-wrapper::before {
          left: 0;
          background: linear-gradient(to right, #0a0a0c 0%, transparent 100%);
        }

        .trusted-marquee-wrapper::after {
          right: 0;
          background: linear-gradient(to left, #0a0a0c 0%, transparent 100%);
        }

        .trusted-marquee-track {
          display: flex;
          width: max-content;
          flex-shrink: 0;
        }

        .trusted-marquee-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 5.5rem;
          padding-right: 5.5rem;
          animation: trustedScrollMarquee 26s linear infinite;
        }

        .trusted-marquee-wrapper:hover .trusted-marquee-group {
          animation-play-state: paused;
        }

        @keyframes trustedScrollMarquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        .trusted-logo-item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          height: 120px;
          opacity: 0.85;
          transition: opacity 0.3s ease, transform 0.3s ease;
          user-select: none;
        }

        .trusted-logo-item:hover {
          opacity: 1;
          transform: scale(1.08);
        }

        .trusted-logo-item img {
          display: block;
          width: auto;
          max-width: 320px;
          object-fit: contain;
          filter: drop-shadow(0 2px 10px rgba(0,0,0,0.45));
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .trusted-by-section {
            padding: 2.5rem 0 4rem !important;
          }
          .trusted-marquee-wrapper {
            --logo-scale: 0.65;
            padding: 1rem 0;
          }
          .trusted-marquee-wrapper::before,
          .trusted-marquee-wrapper::after {
            width: 60px !important;
          }
          .trusted-marquee-group {
            gap: 3.5rem !important;
            padding-right: 3.5rem !important;
            animation-duration: 18s !important;
          }
          .trusted-logo-item {
            height: 75px !important;
          }
        }
      `}</style>
    </section>
  );
}
