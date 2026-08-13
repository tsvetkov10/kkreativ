import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    title: "Goal\nAlignment",
    desc: "We understand your business, audience, and goals.",
    image: "/goal_alignment.jpg"
  },
  {
    title: "Content\nCreation",
    desc: "High-quality, engaging videos that capture attention.",
    image: "/content_creation.jpg"
  },
  {
    title: "Rapid\nGrowth",
    desc: "Data-driven distribution that turns views into loyal customers.",
    image: "/rapid_growth.jpg"
  }
];

export default function WhatWeDo() {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The container is sticky at top: 0. 
      // The animation should only start when the container hits the top of the viewport (rect.top <= 0).
      // It finishes when the bottom of the container hits the bottom of the viewport (rect.bottom <= windowHeight).
      const maxScroll = rect.height - windowHeight;
      let progress = -rect.top / maxScroll;
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rawIndex = scrollProgress * (steps.length - 1);
  const activeIndex = Math.min(steps.length - 1, Math.max(0, Math.round(rawIndex)));

  return (
    <section id="what-we-do" ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div style={{ 
        position: 'sticky', 
        top: 0, 
        height: '100vh', 
        width: '100%', 
        overflow: 'hidden', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-dark)'
      }}>
        
        <div className="container what-we-do-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          alignItems: 'center',
          gap: '2rem',
          height: '100%',
          width: '100%',
          maxWidth: '1400px',
          padding: '0 2rem'
        }}>
          
          {/* Left: Title */}
          <div className="what-we-do-title-col" style={{ position: 'relative', height: '200px' }}>
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              return (
                <h2 
                  key={`title-${idx}`} 
                  className="font-display"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%) translateY(${isActive ? '0' : (idx < activeIndex ? '-20px' : '20px')})`,
                    left: 0,
                    fontSize: 'clamp(3rem, 5vw, 5rem)',
                    lineHeight: 1.1,
                    opacity: isActive ? 1 : 0,
                    transition: 'all 0.5s ease',
                    whiteSpace: 'pre-line',
                    pointerEvents: 'none'
                  }}
                >
                  {step.title}
                </h2>
              );
            })}
          </div>

          {/* Middle: Interactive Cards */}
          <div style={{ position: 'relative', height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {steps.map((step, idx) => {
              const dist = rawIndex - idx;
              // dist = 0 -> center
              // dist = -1 -> below
              // dist = 1 -> above
              
              const yOffset = dist * -40; // vh
              const scale = Math.max(0.6, 1 - Math.abs(dist) * 0.3);
              const opacity = Math.max(0, 1 - Math.abs(dist) * 0.7);
              
              let rotate = 0;
              if (Math.abs(dist) < 1) {
                rotate = -3 * (1 - Math.abs(dist));
              }

              return (
                <div 
                  key={`card-${idx}`}
                  style={{
                    position: 'absolute',
                    width: '100%',
                    maxWidth: '350px',
                    aspectRatio: '4/3',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    top: `calc(50% + ${yOffset}vh)`,
                    left: '50%',
                    transform: `translate(-50%, -50%) scale(${scale}) rotate(${rotate}deg)`,
                    opacity: opacity,
                    zIndex: steps.length - Math.abs(idx - activeIndex), // active is highest
                    boxShadow: Math.abs(dist) < 0.2 ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                    transition: 'box-shadow 0.3s ease'
                  }}
                >
                  {/* Image Background */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${step.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: Math.abs(dist) > 0.5 ? 'grayscale(80%) brightness(0.4)' : 'none',
                    transition: 'filter 0.3s ease'
                  }} />
                  
                  {/* Large Overlay Number */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '6rem',
                    fontWeight: '900',
                    fontFamily: 'var(--font-sans)',
                    color: '#fff',
                    textShadow: '0 4px 20px rgba(0,0,0,0.5)',
                  }}>
                    0{idx + 1}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Description */}
          <div className="what-we-do-desc-col" style={{ position: 'relative', height: '100px', display: 'flex', justifyContent: 'flex-end' }}>
             {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              return (
                <p 
                  key={`desc-${idx}`} 
                  className="text-secondary"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%) translateY(${isActive ? '0' : (idx < activeIndex ? '-20px' : '20px')})`,
                    right: 0,
                    fontSize: '1.2rem',
                    maxWidth: '280px',
                    textAlign: 'right',
                    opacity: isActive ? 1 : 0,
                    transition: 'all 0.5s ease',
                    pointerEvents: 'none'
                  }}
                >
                  {step.desc}
                </p>
              );
            })}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .what-we-do-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 150px 1fr 150px !important;
            padding: 2rem 1rem !important;
          }
          .what-we-do-title-col h2 {
            left: 50% !important;
            transform: translate(-50%, -50%) !important;
            text-align: center !important;
            width: 100% !important;
          }
          .what-we-do-desc-col {
            justify-content: center !important;
          }
          .what-we-do-desc-col p {
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, -50%) !important;
            text-align: center !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </section>
  );
}
