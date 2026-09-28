import { useEffect, useState, useRef } from 'react';

// Custom hook to animate numbers smoothly
const useCountUp = (end, duration, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo curve for dramatic slow-down at the end
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, startCounting]);

  return count;
};

export default function VideoStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const views = useCountUp(10, 5000, isVisible);
  const likes = useCountUp(1000, 5000, isVisible);
  const growth = useCountUp(150, 5000, isVisible);

  const stats = [
    {
      num: `${views}M+`,
      label: 'ГЕНЕРИРАНИ ГЛЕДАНИЯ'
    },
    {
      num: likes === 1000 ? '1M+' : `${likes}K+`,
      label: 'ГЕНЕРИРАНИ ХАРЕСВАНИЯ'
    },
    {
      num: `+${growth}%`,
      label: 'РАСТЕЖ НА ПОСЛЕДОВАТЕЛИ'
    }
  ];

  return (
    <section ref={sectionRef} className="section video-stats-section" id="video-stats" style={{ paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div className="section-header reveal-up">
          <span className="section-tag text-gold" style={{ 
            fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
            letterSpacing: '0.06em', 
            textTransform: 'none',
            lineHeight: 1,
            marginBottom: '0.35rem',
            display: 'inline-block'
          }}>
            [results]
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
            ЧИСЛАТА НИКОГА НЕ ЛЪЖАТ
          </h2>
        </div>

        {/* 3 Separate Stats Boxes side by side */}
        <div className="stats-cards-grid reveal-scale" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2rem'
        }}>
          {stats.map((stat, idx) => (
            <div 
              key={idx} 
              className="stat-box-card"
              style={{
                background: 'linear-gradient(145deg, rgba(20,20,26,0.7) 0%, rgba(10,10,14,0.85) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '220px',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease'
              }}
            >
              <div 
                className="font-display gradient-text" 
                style={{ 
                  fontSize: 'clamp(2.8rem, 4vw, 3.8rem)', 
                  lineHeight: 1, 
                  marginBottom: '2rem' 
                }}
              >
                {stat.num}
              </div>
              <div>
                <div 
                  className="font-mono" 
                  style={{ 
                    fontSize: '0.85rem', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.08em',
                    fontWeight: 600,
                    color: '#ffffff'
                  }}
                >
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .stat-box-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6), 0 0 30px rgba(212, 175, 55, 0.15) !important;
        }
        @media (max-width: 900px) {
          .stats-cards-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .stat-box-card {
            min-height: auto !important;
            padding: 2rem 1.8rem !important;
          }
        }
      `}</style>
    </section>
  );
}
