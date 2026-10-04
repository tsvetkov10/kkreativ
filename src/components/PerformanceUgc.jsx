import React from 'react';
import { getVideoPoster, getCachedVideoSrc, downloadVideo } from '../utils/videoUtils';

const ugcSections = [
  {
    id: 'ugc-acai-hero-card',
    reversed: false,
    videos: [
      encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4'),
      encodeURI('/videos/acai-hero/МОРСКИ ШАХ_5s_1080p.mp4'),
      encodeURI('/videos/acai-hero/Образователно_5s_1080p.mp4')
    ],
    image: '/ugc_placeholder.jpg',
    alt: 'ACAI HERO UGC Video Case Study',
    title: (
      <>
        <span
          style={{
            fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
            color: 'var(--gold-main, #ffd700)',
            display: 'block',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
            letterSpacing: '0.04em',
            marginBottom: '0.65rem',
            lineHeight: 1.15
          }}
        >
          ACAI HERO
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.15rem, 1.65vw, 1.45rem)',
            lineHeight: 1.35,
            color: 'var(--text-primary)'
          }}
        >
          бразилският плод, за който милиони научиха през последните месеци.
        </span>
      </>
    ),
    description:
      'Микс от забавни скечове, публични интервюта и образователни видеа за продукта докараха милиони до профилите на бранда и го изградиха като безспорен лидер в нишата си.',
    box1: {
      value: '+5000',
      label: 'последователя',
      position: { top: '12%', left: '-12%', right: 'auto', bottom: 'auto' },
      className: 'ugc-box-left'
    },
    box2: {
      value: '3 000 000+',
      label: 'гледания',
      position: { bottom: '14%', right: '-12%', top: 'auto', left: 'auto' },
      className: 'ugc-box-right'
    }
  },
  {
    id: 'ugc-autolux',
    reversed: true,
    videos: [
      encodeURI('/videos/autolux/S63 AMG_5s_1080p.mp4'),
      encodeURI('/videos/autolux/Какво искаш__5s_1080p.mp4'),
      encodeURI('/videos/autolux/Най-евтината Х7_5s_1080p.mp4')
    ],
    image: '/ugc_tech.jpg',
    alt: 'AUTOLUX IMPORT UGC Video Case Study',
    title: (
      <>
        <span
          style={{
            fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
            color: 'var(--gold-main, #ffd700)',
            display: 'block',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
            letterSpacing: '0.04em',
            marginBottom: '0.65rem',
            lineHeight: 1.15
          }}
        >
          AUTOLUX IMPORT
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.15rem, 1.65vw, 1.45rem)',
            lineHeight: 1.35,
            color: 'var(--text-primary)'
          }}
        >
          най-интересните вносители на коли в България.
        </span>
      </>
    ),
    description: `Започвайки работата целта ни беше ясна - 10,000 човека във вайбър групата. 6 месеца по-късно целта беше постигната.

Миксът от реални доставки, много смях и едно силно партньорство не спират да носят резултати - все повече поръчки и чисто нов showroom на autolux import.`,
    box1: {
      value: '+4000',
      label: 'последователя',
      position: { top: '12%', left: '-12%', right: 'auto', bottom: 'auto' },
      className: 'ugc-box-left'
    },
    box2: {
      value: '+7000',
      label: 'члена във Viber групата',
      position: { bottom: '14%', right: '-12%', top: 'auto', left: 'auto' },
      className: 'ugc-box-right'
    }
  },
  {
    id: 'ugc-leos-pasta',
    reversed: false,
    videos: [
      encodeURI('/videos/leo/How to kidnap me_5s_1080p.mp4'),
      encodeURI('/videos/leo/Паста за 1 евро__5s_1080p.mp4'),
      encodeURI('/videos/leo/Хората ми казаха, че съм луд_5s_1080p.mp4')
    ],
    image: '/ugc_fitness.jpg',
    alt: "Leo's Pasta UGC Video Case Study",
    title: (
      <>
        <span
          style={{
            fontFamily: "var(--font-display), 'Akira Expanded', sans-serif",
            color: 'var(--gold-main, #ffd700)',
            display: 'block',
            fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)',
            letterSpacing: '0.04em',
            marginBottom: '0.65rem',
            lineHeight: 1.15
          }}
        >
          LEO’S PASTA
        </span>
        <span
          style={{
            display: 'block',
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.15rem, 1.65vw, 1.45rem)',
            lineHeight: 1.35,
            color: 'var(--text-primary)'
          }}
        >
          паста в кутия?
        </span>
      </>
    ),
    description:
      'Точно така, това е концепцията на любимият ни италиански готвач Лео Бианки. За месеци изградихме чисто ново и модерно усещане около бранда с много характер, както и доказан растеж в продажбите.',
    box1: {
      value: '+2000',
      label: 'последователя',
      position: { top: '10%', left: '-12%', right: 'auto', bottom: 'auto' },
      className: 'ugc-box-left'
    },
    box2: {
      value: '2 000 000+',
      label: 'гледания',
      position: { bottom: '16%', right: '-12%', top: 'auto', left: 'auto' },
      className: 'ugc-box-right'
    }
  }
];

function UgcVideoPlayer({ videos, videoSrc, alt }) {
  const containerRef = React.useRef(null);
  const videoRef = React.useRef(null);
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const isIntersectingRef = React.useRef(false);

  const videoList = Array.isArray(videos) && videos.length > 0 ? videos : (videoSrc ? [videoSrc] : []);
  const currentVideoSrc = videoList[currentIdx];
  const currentPoster = getVideoPoster(currentVideoSrc);

  React.useEffect(() => {
    // Proactively download videos of this client into blob cache
    videoList.forEach((src) => {
      downloadVideo(src);
    });
  }, [videoList]);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersectingRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (videoRef.current && videoRef.current.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
            setIsPlaying(false);
          }
        }
      },
      { rootMargin: '300px 0px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = isMuted;
    if (isIntersectingRef.current) {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [currentIdx, isMuted]);

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIdx((idx) => (idx + 1) % videoList.length);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'pointer', background: '#0a0a0f', overflow: 'hidden' }}
      onClick={togglePlay}
    >
      {/* Instant High-Res Poster Image Behind Video: Zero Black Screen */}
      {currentPoster && (
        <img
          src={currentPoster}
          alt={alt || "Video preview"}
          loading="eager"
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

      {/* Single Arrow Button on Top Right - cycles continuously through videos */}
      {videoList.length > 1 && (
        <button 
          onClick={handleNext}
          className="ugc-arrow-btn"
          aria-label="Следващо видео"
          title="Следващо видео"
          type="button"
          style={{ zIndex: 12 }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      <video
        ref={videoRef}
        key={currentVideoSrc}
        src={getCachedVideoSrc(currentVideoSrc)}
        poster={currentPoster}
        loop
        muted={isMuted}
        playsInline
        preload="auto"
        onCanPlay={() => {
          if (isIntersectingRef.current && videoRef.current?.paused) {
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      >
        Your browser does not support video playback.
      </video>

      {/* Sound toggle button */}
      <button
        onClick={toggleSound}
        type="button"
        aria-label={isMuted ? "Включи звука" : "Заглуши звука"}
        style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 10,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          borderRadius: '50%',
          width: '42px',
          height: '42px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          cursor: 'pointer',
          boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
          transition: 'all 0.25s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(212, 175, 55, 0.9)';
          e.currentTarget.style.color = '#000';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
          e.currentTarget.style.color = '#fff';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {isMuted ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line>
            <line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>

      {/* Play/Pause overlay indicator when paused */}
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          pointerEvents: 'none'
        }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(212, 175, 55, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#000',
            boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
          }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '4px' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </div>
        </div>
      )}

      {/* Preload other brand videos */}
      <div style={{ display: 'none' }} aria-hidden="true">
        {videoList.map((src, i) => (
          i !== currentIdx ? <video key={src} src={getCachedVideoSrc(src)} poster={getVideoPoster(src)} preload="auto" muted playsInline /> : null
        ))}
      </div>
    </div>
  );
}

export default function PerformanceUgc() {
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
    pointerEvents: 'none',
    minWidth: '160px'
  };

  return (
    <section className="ugc-showcase-wrapper" id="projects" style={{ position: 'relative' }}>
      <div id="ugc-acai-hero" style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', scrollMarginTop: '120px' }} />
      {/* Header Block: [projects] */}
      <div 
        className="section-header reveal-up" 
        style={{ 
          paddingTop: '8rem',
          paddingBottom: '2.5rem',
          maxWidth: '1000px', 
          margin: '0 auto', 
          paddingLeft: '1.5rem',
          paddingRight: '1.5rem'
        }}
      >
        <h2 
          style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', 
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--text-primary)'
          }}
        >
          ЗАЕДНО В ГЛЕДАНИЯ И ПОСЛЕДОВАТЕЛИ
        </h2>
      </div>

      {ugcSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="section ugc-section"
          style={{
            padding: index === 0 ? '3.5rem 2rem 5rem' : '5rem 2rem',
            position: 'relative',
            overflow: 'hidden',
            scrollMarginTop: '90px'
          }}
        >
          <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem' }}>
            <div
              className={`ugc-grid ${section.reversed ? 'reversed' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: section.reversed ? '1fr 420px' : '420px 1fr',
                gap: '4.5rem',
                alignItems: 'center'
              }}
            >
              {/* Visual Column */}
              <div
                className="reveal-scale ugc-visual-col"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '1.5rem 1rem',
                  order: section.reversed ? 2 : 1
                }}
              >
                {/* UGC Media container */}
                <div
                  className="ugc-card-frame"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '360px',
                    aspectRatio: '9/16',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    background: '#000',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {section.videos && section.videos.length > 0 ? (
                    <UgcVideoPlayer
                      videos={section.videos}
                      alt={section.alt}
                    />
                  ) : section.video ? (
                    <UgcVideoPlayer
                      videoSrc={section.video}
                      videoFallback={section.videoFallback}
                      alt={section.alt}
                    />
                  ) : (
                    <img
                      src={section.image}
                      alt={section.alt}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    />
                  )}
                </div>

                {/* Floating Stats Box 1 */}
                <div
                  className={`floating-box-anim ugc-stat-box ${section.box1.className}`}
                  style={{
                    ...sharedBoxStyle,
                    ...section.box1.position
                  }}
                >
                  <h3
                    className="gradient-text"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(1.5rem, 2.2vw, 1.95rem)', 
                      marginBottom: '0.2rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {section.box1.value}
                  </h3>
                  <p
                    className="font-mono text-gold"
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {section.box1.label}
                  </p>
                </div>

                {/* Floating Stats Box 2 */}
                <div
                  className={`floating-box-anim ugc-stat-box ${section.box2.className}`}
                  style={{
                    ...sharedBoxStyle,
                    animationDelay: '2.5s',
                    ...section.box2.position
                  }}
                >
                  <h3
                    className="gradient-text"
                    style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(1.4rem, 2vw, 1.85rem)', 
                      marginBottom: '0.2rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {section.box2.value}
                  </h3>
                  <p
                    className="font-mono text-gold"
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {section.box2.label}
                  </p>
                </div>
              </div>

              {/* Text Column */}
              <div
                className="reveal-up ugc-text-col"
                style={{
                  paddingLeft: section.reversed ? '0' : '2rem',
                  paddingRight: section.reversed ? '2rem' : '0',
                  order: section.reversed ? 1 : 2,
                  maxWidth: '740px'
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(1.8rem, 2.7vw, 2.75rem)',
                    lineHeight: 1.25,
                    marginBottom: '1.6rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)'
                  }}
                >
                  {section.title}
                </h2>
                <div
                  className="text-secondary"
                  style={{
                    fontSize: '1.15rem',
                    lineHeight: 1.75,
                    maxWidth: '680px',
                    margin: 0,
                    whiteSpace: 'pre-line'
                  }}
                >
                  {section.description}
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Embedded styles for responsive scaling, hover interactions, and mobile stacking */}
      <style>{`
        .ugc-card-frame:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.15) !important;
        }
        .ugc-card-frame:hover img {
          transform: scale(1.04);
        }
        .ugc-arrow-btn {
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
        .ugc-arrow-btn:hover {
          background: rgba(212, 175, 55, 0.3);
          border-color: var(--gold-main, #ffd700);
          color: var(--gold-light, #fff2a3);
          transform: scale(1.1);
          box-shadow: 0 6px 22px rgba(212, 175, 55, 0.35);
        }
        .ugc-arrow-btn:active {
          transform: scale(0.95);
        }
        @media (max-width: 900px) {
          .ugc-section {
            padding: 3.5rem 1rem !important;
          }
          .ugc-section .container {
            padding: 0 0.5rem !important;
          }
          .ugc-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: left;
          }
          .ugc-visual-col {
            order: 1 !important;
            padding: 1rem 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
          .ugc-card-frame {
            max-width: 285px !important;
            border-radius: 20px !important;
          }
          .ugc-stat-box {
            padding: 0.65rem 0.95rem !important;
            min-width: 115px !important;
            border-radius: 14px !important;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7) !important;
          }
          .ugc-stat-box h3 {
            font-size: 1.25rem !important;
            margin-bottom: 0.15rem !important;
          }
          .ugc-stat-box p {
            font-size: 0.68rem !important;
            letter-spacing: 0.03em !important;
          }
          .ugc-box-left {
            left: max(4px, calc(50% - 150px)) !important;
            right: auto !important;
            top: 4% !important;
            bottom: auto !important;
          }
          .ugc-box-right {
            right: max(4px, calc(50% - 150px)) !important;
            left: auto !important;
            bottom: 4% !important;
            top: auto !important;
          }
          .ugc-text-col {
            order: 2 !important;
            padding-left: 0.5rem !important;
            padding-right: 0.5rem !important;
            text-align: left !important;
            max-width: 100% !important;
          }
          .ugc-text-col h2 {
            font-size: clamp(1.4rem, 5vw, 1.85rem) !important;
            line-height: 1.25 !important;
            text-align: left !important;
            margin-bottom: 1rem !important;
          }
          .ugc-text-col p,
          .ugc-text-col .text-secondary {
            font-size: 1rem !important;
            line-height: 1.6 !important;
            margin: 0 !important;
            text-align: left !important;
            max-width: 100% !important;
          }
        }
        @media (max-width: 480px) {
          .ugc-card-frame {
            max-width: 255px !important;
          }
          .ugc-box-left {
            left: 4px !important;
            top: 3% !important;
          }
          .ugc-box-right {
            right: 4px !important;
            bottom: 3% !important;
          }
        }
      `}</style>
    </section>
  );
}
