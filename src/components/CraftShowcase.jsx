import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCachedVideoSrc, getVideoPoster, preloadVideoImmediately } from '../utils/videoUtils';

const showcaseClients = [
  {
    num: '01',
    name: 'Acai Hero',
    targetId: 'ugc-acai-hero',
    subtitle: 'Вайръл скечове, интервюта и образователни видеа',
    video: encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4')
  },
  {
    num: '02',
    name: 'Autolux Import',
    targetId: 'ugc-autolux',
    subtitle: 'Доставки на коли и много смях.',
    video: encodeURI('/videos/autolux/S63 AMG_5s_1080p.mp4')
  },
  {
    num: '03',
    name: 'Leo\'s Pasta',
    targetId: 'ugc-leos-pasta',
    subtitle: 'Storytelling, вкусна паста и много характер.',
    video: encodeURI('/videos/leo/How to kidnap me_5s_1080p.mp4')
  }
];

function ShowcaseCard({ client }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    const card = cardRef.current;
    if (!video || !card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.paused && !document.hidden) {
            video.play().catch(() => {});
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(card);

    return () => observer.disconnect();
  }, []);

  const handleClick = () => {
    if (client.targetId === 'ugc-acai-hero' || client.name === 'Acai Hero') {
      navigate('/our-craft');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      navigate(`/our-craft#${client.targetId}`);
    }
  };

  return (
    <div 
      ref={cardRef}
      className="craft-showcase-card"
      onClick={handleClick}
      onMouseEnter={() => preloadVideoImmediately(client.video)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
    >
      {/* Background Video & Poster */}
      <div className="craft-card-media">
        {getVideoPoster(client.video) && (
          <img
            src={getVideoPoster(client.video)}
            alt={client.name}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              pointerEvents: 'none'
            }}
          />
        )}
        <video 
          ref={videoRef}
          src={getCachedVideoSrc(client.video)}
          poster={getVideoPoster(client.video)}
          muted
          loop
          playsInline
          preload="auto"
          style={{ position: 'relative', zIndex: 1 }}
        />
        <div className="craft-card-overlay" style={{ zIndex: 2 }} />
      </div>

      {/* Top Floating Badges */}
      {client.badges && client.badges.length > 0 && (
        <div className="craft-card-badges">
          {client.badges.map((b, idx) => (
            <span key={idx} className="craft-badge-pill">
              <span className="craft-badge-text">{typeof b === 'string' ? b : b.label}</span>
            </span>
          ))}
        </div>
      )}

      {/* Bottom Content Area */}
      <div className="craft-card-content">
        <span className="craft-card-num">{client.num}</span>
        <h3 className="craft-card-title">{client.name}</h3>
        <div className="craft-card-footer-row">
          <p className="craft-card-subtitle">{client.subtitle}</p>
          <div className="craft-card-action-btn" aria-label="Виж казуса">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CraftShowcase() {
  const navigate = useNavigate();

  return (
    <section id="our-craft" className="section craft-showcase-section">
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 2rem' }}>
        
        {/* Section Header */}
        <div className="section-header reveal-up" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag text-gold" style={{ 
            fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
            letterSpacing: '0.06em', 
            textTransform: 'none',
            lineHeight: 1,
            marginBottom: '0.35rem',
            display: 'inline-block'
          }}>
            [our craft]
          </span>
          <h2 style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.2rem, 4.6vw, 3.8rem)', 
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--text-primary)',
            textTransform: 'uppercase'
          }}>
            НА ДУМИ ВСИЧКИ СМЕ СИЛНИ...
          </h2>
        </div>

        {/* 3 Showcase Cards Grid */}
        <div className="craft-showcase-grid reveal-scale">
          {showcaseClients.map((client) => (
            <ShowcaseCard key={client.num} client={client} />
          ))}
        </div>

        {/* Call-to-Action Button */}
        <div className="craft-showcase-cta reveal-up" style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            className="btn-craft-showcase"
            onMouseEnter={() => preloadVideoImmediately(encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4'))}
            onClick={() => {
              navigate('/our-craft');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
          >
            <span>ВИЖ РАБОТАТА НИ</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>

      </div>

      <style>{`
        .craft-showcase-section {
          position: relative;
          width: 100%;
          padding: 5rem 0 6rem;
          background: transparent;
          z-index: 2;
        }

        .craft-showcase-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.8rem;
          width: 100%;
        }

        .craft-showcase-card {
          position: relative;
          height: 540px;
          border-radius: 26px;
          overflow: hidden;
          background: #0e0e13;
          border: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 1.25rem;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.4s ease, 
                      box-shadow 0.4s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
        }

        .craft-showcase-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(212, 175, 55, 0.15);
        }

        .craft-card-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
        }

        .craft-card-media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .craft-showcase-card:hover .craft-card-media video {
          transform: scale(1.05);
        }

        .craft-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(10, 10, 14, 0.6) 0%, 
            rgba(10, 10, 14, 0.15) 25%, 
            rgba(10, 10, 14, 0.25) 50%, 
            rgba(10, 10, 14, 0.88) 80%, 
            rgba(10, 10, 14, 0.98) 100%
          );
          pointer-events: none;
        }

        .craft-card-badges {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          gap: 0.45rem;
          align-items: center;
        }

        .craft-badge-pill {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(14, 16, 22, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 100px;
          padding: 0.38rem 0.82rem;
          color: #ffffff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
        }

        .craft-badge-text {
          font-family: 'Montserrat', sans-serif;
          font-weight: 700;
          font-size: 0.76rem;
          letter-spacing: 0.02em;
        }

        .craft-card-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          margin-top: auto;
        }

        .craft-card-num {
          font-family: 'Montserrat', sans-serif;
          font-weight: 800;
          font-size: 0.78rem;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.06em;
          margin-bottom: 0.25rem;
        }

        .craft-card-title {
          font-family: var(--font-display), 'Akira Expanded', sans-serif;
          font-weight: 800;
          font-size: clamp(1.15rem, 1.45vw, 1.45rem);
          color: var(--gold-main, #d4af37);
          line-height: 1.25;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          margin: 0 0 0.45rem 0;
        }

        .craft-card-footer-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 0.75rem;
        }

        .craft-card-subtitle {
          font-family: 'Montserrat', sans-serif;
          font-weight: 400;
          font-size: 0.88rem;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
          flex: 1;
          min-height: 2.9em;
        }

        .craft-card-action-btn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          flex-shrink: 0;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .craft-showcase-card:hover .craft-card-action-btn {
          background: var(--gold-gradient, linear-gradient(135deg, #ffd700, #d4af37));
          color: #0a0a0c;
          border-color: transparent;
          transform: scale(1.08);
        }

        .btn-craft-showcase {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.85rem;
          background: var(--gold-gradient, linear-gradient(135deg, #d4af37 0%, #f3e5ab 100%));
          color: #0a0a0c;
          font-family: 'Montserrat', sans-serif;
          font-size: clamp(1rem, 1.3vw, 1.15rem);
          font-weight: 700;
          padding: 1.15rem 3rem;
          border-radius: 100px;
          border: none;
          cursor: pointer;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          box-shadow: 0 10px 25px -4px rgba(212, 175, 55, 0.4), 0 0 20px rgba(212, 175, 55, 0.15);
          transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.35s ease;
        }

        .btn-craft-showcase:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 18px 40px -6px rgba(212, 175, 55, 0.6), 0 0 30px rgba(212, 175, 55, 0.25);
        }

        .btn-craft-showcase:hover svg {
          transform: translateX(4px);
        }

        .btn-craft-showcase svg {
          transition: transform 0.3s ease;
        }

        .btn-craft-showcase:active {
          transform: translateY(1px) scale(0.98);
        }

        @media (max-width: 992px) {
          .craft-showcase-grid {
            grid-template-columns: 1fr;
            max-width: 460px;
            margin: 0 auto;
            gap: 2rem;
          }
          .craft-showcase-card {
            height: 500px;
          }
        }

        @media (max-width: 480px) {
          .craft-showcase-section {
            padding: 3.5rem 0 4.5rem;
          }
          .craft-showcase-card {
            height: 460px;
            padding: 1.1rem;
            border-radius: 22px;
          }
          .craft-badge-text {
            font-size: 0.7rem;
          }
          .craft-card-title {
            font-size: 1.18rem;
          }
        }
      `}</style>
    </section>
  );
}
