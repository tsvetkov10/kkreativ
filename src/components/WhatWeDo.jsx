import { useEffect, useRef, useState } from 'react';

const steps = [
  {
    title: "GOAL\nALIGNMENT",
    desc: "Разучаваме всичко за бизнеса и нишата ти, след което изграждаме печеливша креативна концепция с ясни цели и цялостна естетика на профила.",
    image: "/photos-of-owners/concept.png"
  },
  {
    title: "CONTENT\nCREATION",
    desc: "Идваме, снимаме, обработваме и публикуваме цялото съдържание - вие единствено се наслаждавате на резултатите :)",
    image: "/photos-of-owners/production.png"
  },
  {
    title: "RAPID\nGROWTH",
    desc: "Следим растежа и анализираме реакцията и поведението на аудиторията, спрямо които адаптираме концепциите и надграждаме с всеки един месец.",
    image: "/photos-of-owners/services.png"
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
      
      const maxScroll = rect.height - windowHeight;
      if (maxScroll <= 0) return;
      let progress = -rect.top / maxScroll;
      
      // Clamp between 0 and 1
      progress = Math.max(0, Math.min(1, progress));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll(); // init
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Reveal animation observer
    const el = containerRef.current?.querySelector('.what-we-do-grid');
    if (!el || el.classList.contains('visible')) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -20px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const rawIndex = scrollProgress * (steps.length - 1);
  const activeIndex = Math.min(steps.length - 1, Math.max(0, Math.round(rawIndex)));

  return (
    <section id="what-we-do" ref={containerRef} style={{ height: '300vh', position: 'relative' }}>
      <div 
        className="what-we-do-sticky"
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100%', 
          overflow: 'hidden', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-dark)'
        }}
      >
        
        <div className="container what-we-do-grid reveal-up" style={{
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
          <div className="what-we-do-title-col" style={{ position: 'relative', height: '200px', zIndex: 10 }}>
            {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              const nudge = isActive ? 0 : (idx < activeIndex ? -20 : 20);
              return (
                <h2 
                  key={`title-${idx}`} 
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%) translateY(${nudge}px)`,
                    '--nudge': `${nudge}px`,
                    left: 0,
                    fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
                    fontWeight: 'normal',
                    fontSize: 'clamp(1.8rem, 2.7vw, 2.8rem)',
                    lineHeight: 1.2,
                    letterSpacing: '0.02em',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
                    whiteSpace: 'pre-line',
                    pointerEvents: 'none',
                    color: 'var(--text-primary)'
                  }}
                >
                  {step.title}
                </h2>
              );
            })}
          </div>

          {/* Middle: Interactive Cards */}
          <div 
            className="what-we-do-cards-col" 
            style={{ 
              position: 'relative', 
              height: '100%', 
              width: '100%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              overflow: 'hidden',
              zIndex: 1
            }}
          >
            {steps.map((step, idx) => {
              const dist = rawIndex - idx;
              // dist = 0 -> center
              // dist = -1 -> below
              // dist = 1 -> above
              
              const yOffset = dist * -40; // vh
              const scale = Math.max(0.6, 1 - Math.abs(dist) * 0.3);
              const opacity = Math.max(0, 1 - Math.abs(dist));
              
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
                    boxShadow: Math.abs(dist) < 0.5 ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
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
          <div className="what-we-do-desc-col" style={{ position: 'relative', height: '160px', display: 'flex', justifyContent: 'flex-end', zIndex: 10 }}>
             {steps.map((step, idx) => {
              const isActive = activeIndex === idx;
              const nudge = isActive ? 0 : (idx < activeIndex ? -15 : 15);
              return (
                <p 
                  key={`desc-${idx}`} 
                  className="text-secondary"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    transform: `translateY(-50%) translateY(${nudge}px)`,
                    '--nudge': `${nudge}px`,
                    right: 0,
                    fontSize: 'clamp(0.95rem, 1.15vw, 1.15rem)',
                    lineHeight: 1.65,
                    maxWidth: '380px',
                    textAlign: 'right',
                    opacity: isActive ? 1 : 0,
                    transition: 'opacity 0.4s ease, transform 0.4s ease',
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
        .what-we-do-sticky {
          position: -webkit-sticky !important;
          position: sticky !important;
          top: 0 !important;
          height: 100vh !important;
          height: 100dvh !important;
          width: 100% !important;
          overflow: hidden !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
          background: var(--bg-dark) !important;
        }
        @media (max-width: 900px) {
          .what-we-do-grid {
            grid-template-columns: 1fr !important;
            grid-template-rows: 75px 1fr 105px !important;
            padding: 5.5rem 1.25rem 1.5rem !important;
            gap: 0.75rem !important;
            height: 100% !important;
            max-height: 100vh !important;
            max-height: 100dvh !important;
          }
          .what-we-do-title-col {
            height: 75px !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
          }
          .what-we-do-title-col h2 {
            left: 50% !important;
            transform: translate(-50%, calc(-50% + var(--nudge, 0px))) !important;
            text-align: center !important;
            width: 100% !important;
            font-size: clamp(1.2rem, 4.4vw, 1.55rem) !important;
            line-height: 1.25 !important;
            letter-spacing: 0.02em !important;
          }
          .what-we-do-cards-col {
            overflow: hidden !important;
            min-height: 200px !important;
            max-height: 52vh !important;
          }
          .what-we-do-cards-col > div {
            max-width: min(290px, 80vw) !important;
          }
          .what-we-do-desc-col {
            justify-content: center !important;
            height: 105px !important;
          }
          .what-we-do-desc-col p {
            left: 50% !important;
            right: auto !important;
            transform: translate(-50%, calc(-50% + var(--nudge, 0px))) !important;
            text-align: center !important;
            width: 100% !important;
            max-width: 330px !important;
            font-size: 0.92rem !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </section>
  );
}
