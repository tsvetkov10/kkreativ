import React, { useState } from 'react';

const ugcSlides = [
  {
    image: '/ugc_placeholder.jpg',
    alt: 'UGC Video Review',
    box1: {
      value: '200%',
      label: 'Organic Growth',
      position: { top: '12%', left: '-14%', right: 'auto', bottom: 'auto' }
    },
    box2: {
      value: '5x',
      label: 'Higher Engagement',
      position: { bottom: '14%', right: '-14%', top: 'auto', left: 'auto' }
    }
  },
  {
    image: '/content_creation.jpg',
    alt: 'Content Creation Showcase',
    box1: {
      value: '10M+',
      label: 'Total Impressions',
      position: { top: '22%', right: '-16%', left: 'auto', bottom: 'auto' }
    },
    box2: {
      value: '+340%',
      label: 'Click-Through Rate',
      position: { bottom: '10%', left: '-12%', top: 'auto', right: 'auto' }
    }
  },
  {
    image: '/rapid_growth.jpg',
    alt: 'Rapid Growth Results',
    box1: {
      value: '85%',
      label: 'Retention Rate',
      position: { top: '8%', left: '-10%', right: 'auto', bottom: 'auto' }
    },
    box2: {
      value: '3.8x',
      label: 'ROAS Increase',
      position: { bottom: '24%', right: '-15%', top: 'auto', left: 'auto' }
    }
  },
  {
    image: '/goal_alignment.jpg',
    alt: 'Brand Alignment',
    box1: {
      value: '98%',
      label: 'Client Satisfaction',
      position: { top: '30%', left: '-15%', right: 'auto', bottom: 'auto' }
    },
    box2: {
      value: '4.5x',
      label: 'Conversion Lift',
      position: { bottom: '8%', right: '-10%', top: 'auto', left: 'auto' }
    }
  }
];

export default function PerformanceUgc() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % ugcSlides.length);
  };

  const currentSlide = ugcSlides[currentIndex];

  const sharedBoxStyle = {
    position: 'absolute',
    zIndex: 2,
    background: 'linear-gradient(145deg, rgba(20,20,25,0.85) 0%, rgba(10,10,12,0.95) 100%)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '1.2rem 1.8rem',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
    border: '1px solid rgba(212,175,55,0.3)',
    transition: 'top 0.7s cubic-bezier(0.16, 1, 0.3, 1), left 0.7s cubic-bezier(0.16, 1, 0.3, 1), right 0.7s cubic-bezier(0.16, 1, 0.3, 1), bottom 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
    pointerEvents: 'none',
    minWidth: '160px'
  };

  return (
    <section className="section" style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column - Visual */}
          <div className="reveal-scale" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            
            {/* UGC Image container */}
            <div style={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '100%', 
              maxWidth: '360px', 
              aspectRatio: '9/16', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              {/* Top Right Switch Arrow Button */}
              <button 
                onClick={handleNextImage} 
                aria-label="Switch image" 
                title="Next image"
                className="ugc-arrow-btn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Subtle Indicator Dots */}
              <div className="ugc-dots">
                {ugcSlides.map((_, idx) => (
                  <span 
                    key={idx} 
                    className={`ugc-dot ${currentIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                  />
                ))}
              </div>

              <img 
                key={currentIndex}
                src={currentSlide.image} 
                alt={currentSlide.alt} 
                className="ugc-image-fade"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Dynamic Floating Stats Box 1 */}
            <div 
              className="floating-box-anim ugc-stat-box ugc-box-1" 
              style={{
                ...sharedBoxStyle,
                ...currentSlide.box1.position
              }}
            >
              <h3 key={`box1-val-${currentIndex}`} className="font-display gradient-text stat-value-anim" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
                {currentSlide.box1.value}
              </h3>
              <p key={`box1-lbl-${currentIndex}`} className="font-mono text-gold stat-label-anim" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {currentSlide.box1.label}
              </p>
            </div>

            {/* Dynamic Floating Stats Box 2 */}
            <div 
              className="floating-box-anim ugc-stat-box ugc-box-2" 
              style={{
                ...sharedBoxStyle,
                animationDelay: '1.5s', // Offset floating oscillation
                ...currentSlide.box2.position
              }}
            >
              <h3 key={`box2-val-${currentIndex}`} className="font-display gradient-text stat-value-anim" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
                {currentSlide.box2.value}
              </h3>
              <p key={`box2-lbl-${currentIndex}`} className="font-mono text-gold stat-label-anim" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {currentSlide.box2.label}
              </p>
            </div>

          </div>

          {/* Right Column - Text */}
          <div className="reveal-up" style={{ paddingLeft: '2rem' }}>
            <h2 className="font-display" style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              lineHeight: 1.1, 
              marginBottom: '2rem' 
            }}>
              Performance-driven <span style={{ color: '#ff85e8' }}>UGC</span> that delivers results
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '500px' }}>
              Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure.
            </p>
          </div>

        </div>

      </div>

      {/* Styles for switch arrow, indicators, animations & responsiveness */}
      <style>{`
        .ugc-arrow-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: rgba(10, 10, 12, 0.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #f4f4f5;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        }
        .ugc-arrow-btn:hover {
          background: rgba(212, 175, 55, 0.25);
          border-color: var(--gold-main);
          color: var(--gold-light);
          transform: scale(1.08);
          box-shadow: 0 6px 20px rgba(212, 175, 55, 0.35);
        }
        .ugc-arrow-btn:active {
          transform: scale(0.95);
        }
        .ugc-dots {
          position: absolute;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(10, 10, 12, 0.55);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ugc-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ugc-dot.active {
          width: 18px;
          border-radius: 4px;
          background: var(--gold-main);
        }
        .ugc-image-fade {
          animation: ugc-fade-in 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .stat-value-anim {
          animation: stat-fade 0.4s ease-out;
        }
        .stat-label-anim {
          animation: stat-fade 0.5s ease-out;
        }
        @keyframes ugc-fade-in {
          from {
            opacity: 0.3;
            transform: scale(1.03);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes stat-fade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 900px) {
          .section .container > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .section .container > div > div:last-child {
            padding-left: 0 !important;
          }
          .section .container > div > div:last-child h2 {
            font-size: 2.5rem !important;
          }
          .section .container > div > div:last-child p {
            margin: 0 auto;
          }
          .ugc-box-1 {
            left: 0 !important;
            right: auto !important;
            top: 5% !important;
            bottom: auto !important;
            padding: 1rem 1.5rem !important;
          }
          .ugc-box-2 {
            right: 0 !important;
            left: auto !important;
            bottom: 5% !important;
            top: auto !important;
            padding: 1rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}


