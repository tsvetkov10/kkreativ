import { useState } from 'react';

const missionImages = [
  {
    src: '/mission_team_v1.jpg',
    alt: 'Creative Agency Team in Studio'
  },
  {
    src: '/mission_team_v2.jpg',
    alt: 'Creative Agency Founders Collaborating'
  },
  {
    src: '/mission_team_v3.jpg',
    alt: 'Behind the Scenes Video Production'
  }
];

export default function Mission() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % missionImages.length);
  };

  return (
    <section id="mission" className="section mission-section" style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div className="mission-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4.5rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column: Tilted 9:16 Photo Card with Arrow */}
          <div className="reveal-scale mission-visual-col" style={{ display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <div className="mission-card-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '360px' }}>
              
              {/* 9:16 Vertical Card with subtle tilt & crisp white border */}
              <div 
                className="mission-image-card"
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '9/16',
                  borderRadius: '24px',
                  border: '3px solid rgba(255, 255, 255, 0.95)',
                  boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), 0 0 25px rgba(255, 255, 255, 0.05)',
                  overflow: 'hidden',
                  transform: 'rotate(-2deg)',
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  background: '#1a1a20'
                }}
              >
                {/* Arrow Switch Button on Top Right */}
                <button 
                  onClick={handleNext}
                  className="mission-arrow-btn"
                  aria-label="Switch image"
                  title="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                {/* Subtle Indicator Dots */}
                <div className="mission-dots">
                  {missionImages.map((_, idx) => (
                    <span 
                      key={idx} 
                      className={`mission-dot ${currentIdx === idx ? 'active' : ''}`}
                      onClick={() => setCurrentIdx(idx)}
                    />
                  ))}
                </div>

                {/* Active Photo */}
                <img 
                  key={currentIdx}
                  src={missionImages[currentIdx].src} 
                  alt={missionImages[currentIdx].alt}
                  className="mission-img-fade"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block'
                  }} 
                />
              </div>

            </div>
          </div>

          {/* Right Column: Mission Copy */}
          <div className="reveal-up mission-text-col" style={{ paddingLeft: '1rem' }}>
            
            <span className="font-mono text-gold mission-tag" style={{
              fontSize: '0.95rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              OUR MISSION
            </span>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '1.8rem'
            }}>
              Our mission is to help businesses grow by creating meaningful digital experiences that combine strategy, creativity, and functionality. We aim to go beyond visuals and build solutions that are thoughtful, user-focused, and result-driven.
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(1.05rem, 1.25vw, 1.2rem)',
              lineHeight: 1.8,
              color: 'rgba(255, 255, 255, 0.75)'
            }}>
              Through branding, design, and development, we work closely with our clients to turn ideas into clear, impactful, and scalable digital products.
            </p>

          </div>

        </div>

      </div>

      <style>{`
        .mission-card-wrapper:hover .mission-image-card {
          transform: rotate(0deg) scale(1.02) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.7), 0 0 35px rgba(212, 175, 55, 0.15) !important;
        }
        .mission-arrow-btn {
          position: absolute;
          top: 18px;
          right: 18px;
          z-index: 10;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(10, 10, 15, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.25);
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 18px rgba(0, 0, 0, 0.4);
        }
        .mission-arrow-btn:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--gold-main);
          color: var(--gold-light);
          transform: scale(1.1);
          box-shadow: 0 6px 22px rgba(212, 175, 55, 0.35);
        }
        .mission-arrow-btn:active {
          transform: scale(0.95);
        }
        .mission-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(10, 10, 12, 0.6);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .mission-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .mission-dot.active {
          width: 18px;
          border-radius: 4px;
          background: var(--gold-main);
        }
        .mission-img-fade {
          animation: mission-fade 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes mission-fade {
          from {
            opacity: 0.4;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @media (max-width: 900px) {
          .mission-section {
            padding: 5rem 1.5rem !important;
          }
          .mission-grid {
            grid-template-columns: 1fr !important;
            gap: 3.5rem !important;
            text-align: center;
          }
          .mission-text-col {
            padding-left: 0 !important;
          }
          .mission-image-card {
            transform: rotate(0deg) !important;
          }
        }
      `}</style>
    </section>
  );
}
