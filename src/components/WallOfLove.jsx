import React, { useRef, useEffect } from 'react';

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
  const trackRef = useRef(null);
  const firstGroupRef = useRef(null);
  const offsetRef = useRef(0);
  const isHoveredRef = useRef(false);
  const currentSpeedRef = useRef(60);

  useEffect(() => {
    let groupWidth = 0;
    
    const updateGroupWidth = () => {
      if (firstGroupRef.current) {
        groupWidth = firstGroupRef.current.offsetWidth;
        if (offsetRef.current === 0 && groupWidth > 0) {
          offsetRef.current = groupWidth;
        }
      }
    };

    updateGroupWidth();

    let ro;
    if (typeof ResizeObserver !== 'undefined' && firstGroupRef.current) {
      ro = new ResizeObserver(() => {
        updateGroupWidth();
      });
      ro.observe(firstGroupRef.current);
    }

    let animationFrameId;
    let lastTime = performance.now();
    const baseSpeed = 60; // smooth px/second

    const tick = (now) => {
      const rawDt = (now - lastTime) / 1000;
      lastTime = now;
      const dt = Math.min(rawDt, 0.1);

      // Smoothly lerp towards target speed: 0 when hovered, baseSpeed when unhovered
      const targetSpeed = isHoveredRef.current ? 0 : baseSpeed;
      currentSpeedRef.current += (targetSpeed - currentSpeedRef.current) * 0.12;

      // Snap to 0 when sufficiently close to avoid micro-drift
      if (Math.abs(currentSpeedRef.current) < 0.1) {
        currentSpeedRef.current = targetSpeed === 0 ? 0 : currentSpeedRef.current;
      }

      if (currentSpeedRef.current > 0 && groupWidth > 0 && trackRef.current) {
        offsetRef.current -= currentSpeedRef.current * dt;
        while (offsetRef.current <= 0) {
          offsetRef.current += groupWidth;
        }
        trackRef.current.style.transform = `translate3d(-${offsetRef.current}px, 0, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (ro) ro.disconnect();
    };
  }, []);

  return (
    <section className="section trusted-by-section" id="brands">

      {/* Infinite Seamless Scrolling Logo Marquee with Smooth JS Hover/De-hover */}
      <div 
        className="trusted-marquee-wrapper"
        onMouseEnter={() => { isHoveredRef.current = true; }}
        onMouseLeave={() => { isHoveredRef.current = false; }}
        onTouchStart={() => { isHoveredRef.current = true; }}
        onTouchEnd={() => { isHoveredRef.current = false; }}
      >
        <div className="trusted-marquee-track" ref={trackRef}>
          {[0, 1, 2, 3].map((groupIndex) => (
            <div 
              key={`grp-${groupIndex}`} 
              ref={groupIndex === 0 ? firstGroupRef : undefined}
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
          padding: 1.5rem 0 3.5rem;
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
          will-change: transform;
        }

        .trusted-marquee-group {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 5.5rem;
          padding-right: 5.5rem;
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
            padding: 1rem 0 2.5rem !important;
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
          }
          .trusted-logo-item {
            height: 75px !important;
          }
        }
      `}</style>
    </section>
  );
}
