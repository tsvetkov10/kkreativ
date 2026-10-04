import { useState } from 'react';

const missionImages = [
  {
    src: '/our-mission/44.webp',
    alt: 'Калоян и Георги - kkreativ'
  },
  {
    src: '/our-mission/17.webp',
    alt: 'Георги - kkreativ'
  },
  {
    src: encodeURI('/our-mission/ChatGPT Image Sep 20, 2026, 03_43_37 PM(1).webp'),
    alt: 'Калоян и Георги - kkreativ'
  },
  {
    src: '/our-mission/20.webp',
    alt: 'Калоян - kkreativ'
  },
  {
    src: encodeURI('/our-mission/ChatGPT Image Sep 20, 2026, 01_31_05 PM(1).webp'),
    alt: 'Калоян и Георги - kkreativ'
  },
  {
    src: encodeURI('/our-mission/zoom out.webp'),
    alt: 'Георги - kkreativ'
  },
  {
    src: '/our-mission/13.webp',
    alt: 'Калоян - kkreativ'
  },
  {
    src: encodeURI('/our-mission/ChatGPT Image Sep 20, 2026, 04_01_57 PM(1).webp'),
    alt: 'Георги - kkreativ'
  },
  {
    src: '/our-mission/15.webp',
    alt: 'Калоян - kkreativ'
  }
];

export default function Mission() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const isFirst = currentIdx === 0;
  const isLast = currentIdx === missionImages.length - 1;

  const handlePrev = () => {
    if (!isFirst) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (!isLast) {
      setCurrentIdx((prev) => prev + 1);
    }
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
          
          {/* Left Column: Tilted 9:16 Photo Card with Arrows */}
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
                {/* Previous Arrow Button on Top Left */}
                <button 
                  onClick={handlePrev}
                  disabled={isFirst}
                  className={`mission-arrow-btn mission-arrow-prev ${isFirst ? 'disabled' : ''}`}
                  aria-label="Previous image"
                  title={isFirst ? undefined : "Previous image"}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                {/* Next Arrow Button on Top Right */}
                <button 
                  onClick={handleNext}
                  disabled={isLast}
                  className={`mission-arrow-btn mission-arrow-next ${isLast ? 'disabled' : ''}`}
                  aria-label="Next image"
                  title={isLast ? undefined : "Next image"}
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
                      title={`Снимка ${idx + 1}`}
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

                {/* Snappy Preload of Next & Prev Images */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  {currentIdx < missionImages.length - 1 && (
                    <img src={missionImages[currentIdx + 1].src} alt="" />
                  )}
                  {currentIdx > 0 && (
                    <img src={missionImages[currentIdx - 1].src} alt="" />
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Mission Copy */}
          <div className="reveal-up mission-text-col" style={{ paddingLeft: '1rem' }}>
            
            <h2 style={{
              fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
              fontSize: 'clamp(1.8rem, 3.2vw, 2.8rem)',
              lineHeight: 1.15,
              letterSpacing: '0.02em',
              color: 'var(--gold-main, #ffd700)',
              marginBottom: '2rem'
            }}>
              OUR MISSION
            </h2>

            <div 
              className="text-secondary mission-copy" 
              style={{
                fontSize: '1.15rem',
                lineHeight: 1.75,
                maxWidth: '680px',
                margin: 0,
                whiteSpace: 'pre-line'
              }}
            >
              {`Мисията ни е проста - да вкараме Gen Z енергията си във всеки бранд, с който работим.

Израснали сме с телефон в ръка и разбираме езика на социалните мрежи, трендовете и съдържанието. Не искаме да работим със 100 бизнеса - искаме малък брой внимателно подбрани брандове, с които да изградим истинско партньорство, базирано на доверие, откритост и здрава работа.

Двамата сме рамо до рамо още от училище - от влогове в YouTube на 12 до собствен бизнес днес. Затова държим целият процес да минава през нас - от комуникацията и снимките до обработката и последния детайл.`}
            </div>

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
        .mission-arrow-prev {
          left: 18px;
        }
        .mission-arrow-next {
          right: 18px;
        }
        .mission-arrow-btn:not(:disabled):hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--gold-main);
          color: var(--gold-light);
          transform: scale(1.1);
          box-shadow: 0 6px 22px rgba(212, 175, 55, 0.35);
        }
        .mission-arrow-btn:not(:disabled):active {
          transform: scale(0.95);
        }
        .mission-arrow-btn:disabled,
        .mission-arrow-btn.disabled {
          opacity: 0.2;
          cursor: not-allowed;
          pointer-events: none;
          box-shadow: none;
          border-color: rgba(255, 255, 255, 0.08);
          background: rgba(10, 10, 15, 0.4);
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
            padding: 3.5rem 1rem !important;
          }
          .mission-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center;
          }
          .mission-card-wrapper {
            max-width: 280px !important;
          }
          .mission-text-col {
            padding-left: 0 !important;
            text-align: left !important;
          }
          .mission-copy {
            font-size: 1rem !important;
            line-height: 1.6 !important;
            text-align: left !important;
            max-width: 100% !important;
          }
          .mission-image-card {
            transform: rotate(0deg) !important;
          }
        }
      `}</style>
    </section>
  );
}
