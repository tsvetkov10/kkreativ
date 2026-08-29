import { useEffect, useRef, useState } from 'react';

const positivePoints = [
  { text: "Strategic trends tailored perfectly to your brand" },
  { text: "Influencer collaborations that drive real sales and ROI" },
  { text: "Consistent posting with high engagement and organic growth" },
  { text: "High-converting UGC videos that turn views into customers" },
  { text: "Data-driven audience targeting with maximized return on ad spend" },
  { text: "Bespoke creative direction that commands attention on feeds" }
];

export default function ScrollingComments() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          
          const totalScrollable = rect.height - windowHeight;
          const scrolled = -rect.top;
          
          let progress = scrolled / totalScrollable;
          if (progress < 0) progress = 0;
          if (progress > 1) progress = 1;
          
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Background color changes every 2 comments:
  // Comments 1-2 (s: 0 to 0.35): Dark
  // Comments 3-4 (s: 0.35 to 0.70): White
  // Comments 5-6 (s: 0.70 to 1.0): Dark
  const isWhiteBg = scrollProgress >= 0.35 && scrollProgress <= 0.70;

  return (
    <section 
      ref={containerRef} 
      style={{ height: '400vh', position: 'relative' }} 
      className="scrolling-comments-section"
    >
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: isWhiteBg ? '#ffffff' : 'var(--bg-dark)',
        color: isWhiteBg ? 'var(--bg-dark)' : '#ffffff',
        transition: 'background-color 0.8s ease, color 0.8s ease'
      }}>
        
        {/* Central Heading - zIndex 1 */}
        <h2 className="font-display" style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', 
          textAlign: 'center', 
          zIndex: 1, 
          width: '90%',
          lineHeight: '1.2',
          letterSpacing: '-0.02em',
          transition: 'color 0.8s ease',
          color: isWhiteBg ? '#111111' : '#ffffff'
        }}>
          Social media growth <br/>
          made simple <br/>
          and effective
        </h2>

        {/* Floating Cards Container - zIndex 2 */}
        <div style={{ width: '100%', maxWidth: '1400px', position: 'relative', height: '100vh', zIndex: 2 }}>
          {positivePoints.map((point, index) => {
            // Starts below screen (currentY = 85vh at scrollProgress = 0)
            // and travels upwards as user scrolls, maintaining ~2 visible cards concurrently
            const currentY = 85 + (index * 40) - (scrollProgress * 370);
            
            // True Ladder Layout: alternating left (-30vw) and right (+30vw)
            const isLeft = index % 2 === 0;
            const currentX = isLeft ? -30 : 30;
            
            // Smooth fade at the top/bottom edges of the screen
            const absY = Math.abs(currentY);
            let opacity = 0;
            if (absY <= 45) {
              opacity = 1;
            } else if (absY < 75) {
              opacity = (75 - absY) / 30;
            } else {
              opacity = 0;
            }
            
            const scale = Math.max(0.85, Math.min(1.02, 1 - absY * 0.002));

            // Skip rendering when card is completely off-screen
            if (opacity <= 0) return null;

            return (
              <div 
                key={index}
                className="scrolling-comment-card"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(280px, 28vw, 380px)',
                  transform: `translate(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh)) scale(${scale})`,
                  opacity: opacity,
                  background: isWhiteBg ? '#262626' : '#3a3a3a',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.25)',
                  transition: 'background 0.6s ease',
                  willChange: 'transform, opacity',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem',
                  zIndex: 3
                }}
              >
                {/* Green Circle 'Tick' Icon */}
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  background: '#22c55e', // Success Green
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                
                <p style={{ 
                  margin: 0,
                  fontSize: '1.15rem', 
                  lineHeight: 1.4, 
                  color: '#ffffff',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: '500'
                }}>
                  {point.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


