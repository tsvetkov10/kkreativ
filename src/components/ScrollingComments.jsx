import { useEffect, useRef, useState } from 'react';

const positivePoints = [
  { text: "Influencer collaborations that drive real sales and ROI" },
  { text: "Consistent posting with high engagement and growth" },
  { text: "Strategic trends tailored perfectly to your brand" },
  { text: "High traffic that turns into loyal customers" }
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

  // To ensure the last card finishes before 1.0 scroll progress:
  // We have 4 items. Last item is index 3.
  // We want startProgress(3) + duration(0.4) <= 1.0
  // So startProgress(3) = 0.6.
  // This means the interval between spawns is 0.6 / 3 = 0.2.
  const interval = 0.2;
  let activeIndex = Math.floor(scrollProgress / interval);
  if (activeIndex >= positivePoints.length) activeIndex = positivePoints.length - 1;
  
  // Revert to black at the end of the scroll (e.g., > 0.85) so it transitions smoothly to the next section
  const isWhiteBg = (activeIndex % 2 !== 0) && (scrollProgress < 0.85);

  return (
    <section 
      ref={containerRef} 
      style={{ height: '350vh', position: 'relative' }} 
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
            const startProgress = index * interval;
            const endProgress = startProgress + 0.4;
            
            let localProgress = (scrollProgress - startProgress) / (endProgress - startProgress);
            if (localProgress < 0) localProgress = 0;
            if (localProgress > 1) localProgress = 1;
            
            // True Ladder Layout: Far left and far right alternating, never in the middle
            const isLeft = index % 2 === 0;
            const currentX = isLeft ? -32 : 32;
            
            // FYP Continuous Scroll logic: Spawn from bottom (100vh), exit through top (-100vh)
            const startY = 100;
            const targetY = -100;
            
            // Linear progression for a true scrolling feel
            const currentY = startY + (targetY - startY) * localProgress;
            
            // Fade in at the bottom (0-0.15), stay visible, fade out at the top (0.85-1.0)
            let opacity = 0;
            if (localProgress > 0 && localProgress < 1) {
              if (localProgress < 0.15) opacity = localProgress / 0.15;
              else if (localProgress > 0.85) opacity = (1 - localProgress) / 0.15;
              else opacity = 1;
            }
            
            const scale = 0.9 + (localProgress * 0.1);

            return (
              <div 
                key={index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(280px, 30vw, 380px)',
                  transform: `translate(calc(-50% + ${currentX}vw), calc(-50% + ${currentY}vh)) scale(${scale})`,
                  opacity: opacity,
                  background: '#3a3a3a',
                  padding: '1.5rem',
                  borderRadius: '16px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transition: 'opacity 0.1s linear',
                  willChange: 'transform, opacity',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.8rem'
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
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                
                <p style={{ 
                  margin: 0,
                  fontSize: '1.2rem', 
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
