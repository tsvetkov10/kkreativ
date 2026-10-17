import React, { useEffect, useRef, useState } from 'react';
import { getVideoPoster, useCachedVideoSrc } from '../utils/videoUtils';

const carouselVideos = [
  {
    src: encodeURI('/videos/caroussel/Autolux - E53(1)_5s_1080p.mp4'),
    title: 'AUTOLUX'
  },
  {
    src: encodeURI('/videos/caroussel/ACAI HERO - Voice Message 5sec.mp4'),
    title: 'ACAI HERO'
  },
  {
    src: encodeURI('/videos/caroussel/Leo_s Pasta - Leo cooking(1)_5sec_1080p.mp4'),
    title: "LEO'S PASTA"
  },
  {
    src: encodeURI('/videos/caroussel/Autolux - S5(1)_5s_1080p.mp4'),
    title: 'AUTOLUX'
  },
  {
    src: encodeURI('/videos/caroussel/ACAI HERO - как се произнася_(1)_5s_1080p.mp4'),
    title: 'ACAI HERO'
  },
  {
    src: '/videos/caroussel/Leos_Pasta_POV_Dvoikite_5sec_1080p.mp4',
    title: "LEO'S PASTA"
  },
  {
    src: encodeURI('/videos/caroussel/ACAI HERO - Габи_(1)_5s_1080p.mp4'),
    title: 'ACAI HERO'
  }
];

function MarqueeCard({ vid }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const isIntersectingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const poster = getVideoPoster(vid.src);
  const videoSrc = useCachedVideoSrc(vid.src);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const playSafe = () => {
      const v = videoRef.current;
      if (v && v.paused) {
        v.play().catch(() => {});
      }
    };

    const pauseSafe = () => {
      const v = videoRef.current;
      if (v && !v.paused) {
        v.pause();
      }
    };

    // Pre-activate videos that are within 250px of the viewport for seamless playback
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        isIntersectingRef.current = inView;

        if (inView) {
          if (!document.hidden) {
            playSafe();
          }
        } else {
          pauseSafe();
        }
      },
      { rootMargin: '250px 0px', threshold: 0 }
    );

    observer.observe(card);

    // Initial check on mount
    const rect = card.getBoundingClientRect();
    if (rect.right > -100 && rect.left < window.innerWidth + 250) {
      isIntersectingRef.current = true;
      if (!document.hidden) {
        playSafe();
      }
    }

    const handleVisibility = () => {
      if (document.hidden) {
        pauseSafe();
      } else {
        if (isIntersectingRef.current) {
          playSafe();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleVisibility);
    };
  }, []);

  return (
    <div ref={cardRef} className="marquee-card">
      {poster && (
        <img
          src={poster}
          alt={vid.title}
          loading="eager"
          decoding="async"
          draggable="false"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '24px',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            opacity: isPlaying ? 0 : 1,
            transition: 'opacity 0.25s ease'
          }}
        />
      )}
      <video
        ref={videoRef}
        src={videoSrc}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        disablePictureInPicture
        disableRemotePlayback
        draggable="false"
        onPlaying={() => setIsPlaying(true)}
        onCanPlay={() => {
          if (isIntersectingRef.current && !document.hidden && videoRef.current?.paused) {
            videoRef.current.play().catch(() => {});
          }
        }}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '24px',
          zIndex: 1,
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserDrag: 'none'
        }}
      />
    </div>
  );
}

export default function VideoResults() {
  const containerRef = useRef(null);
  const firstGroupRef = useRef(null);
  const groupWidthRef = useRef(0);
  const subpixelScrollRef = useRef(0);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const lastPointerXRef = useRef(0);
  const resumeTimeoutRef = useRef(null);
  const hasInitializedRef = useRef(false);

  // Seamless wrap function to keep scroll position within infinite middle buffer
  const checkWrap = () => {
    const container = containerRef.current;
    const gw = groupWidthRef.current;
    if (!container || !gw || gw <= 0) return;

    while (container.scrollLeft >= gw * 3) {
      container.scrollLeft -= gw;
      subpixelScrollRef.current -= gw;
    }
    while (container.scrollLeft <= gw * 1) {
      container.scrollLeft += gw;
      subpixelScrollRef.current += gw;
    }
  };

  const scheduleResume = (delay = 1200) => {
    clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, delay);
  };

  useEffect(() => {
    const container = containerRef.current;
    const firstGroup = firstGroupRef.current;
    if (!container || !firstGroup) return;

    const updateGroupWidth = () => {
      const width = firstGroup.offsetWidth;
      if (width > 0) {
        const prevWidth = groupWidthRef.current;
        groupWidthRef.current = width;
        if (!hasInitializedRef.current) {
          container.scrollLeft = width * 2;
          subpixelScrollRef.current = width * 2;
          hasInitializedRef.current = true;
        } else if (prevWidth > 0 && prevWidth !== width) {
          const ratio = width / prevWidth;
          container.scrollLeft *= ratio;
          subpixelScrollRef.current *= ratio;
        }
      }
    };

    updateGroupWidth();

    const ro = new ResizeObserver(() => {
      updateGroupWidth();
      checkWrap();
    });
    ro.observe(firstGroup);

    // Auto-scroll loop using requestAnimationFrame
    let lastTimestamp = null;
    let rafId = null;
    const scrollSpeed = 45; // pixels per second

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      if (
        !isInteractingRef.current &&
        !isDraggingRef.current &&
        !isHoveredRef.current &&
        !document.hidden
      ) {
        subpixelScrollRef.current += scrollSpeed * deltaTime;
        container.scrollLeft = subpixelScrollRef.current;
        checkWrap();
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);

    // Global pointermove and pointerup so dragging continues even when cursor moves outside container
    const handleWindowPointerMove = (e) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastPointerXRef.current;
      lastPointerXRef.current = e.clientX;
      container.scrollLeft -= dx;
      subpixelScrollRef.current = container.scrollLeft;
      checkWrap();
    };

    const handleWindowPointerUp = () => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      container.classList.remove('is-dragging');
      scheduleResume(1200);
    };

    window.addEventListener('pointermove', handleWindowPointerMove);
    window.addEventListener('pointerup', handleWindowPointerUp);
    window.addEventListener('pointercancel', handleWindowPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      clearTimeout(resumeTimeoutRef.current);
      window.removeEventListener('pointermove', handleWindowPointerMove);
      window.removeEventListener('pointerup', handleWindowPointerUp);
      window.removeEventListener('pointercancel', handleWindowPointerUp);
    };
  }, []);

  const handlePointerDown = (e) => {
    // Only drag with primary mouse button
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    e.preventDefault();

    isDraggingRef.current = true;
    isInteractingRef.current = true;
    lastPointerXRef.current = e.clientX;
    clearTimeout(resumeTimeoutRef.current);

    if (containerRef.current) {
      containerRef.current.classList.add('is-dragging');
    }
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
  };

  const handleWheel = (e) => {
    // Trackpad horizontal swipe or shift+wheel
    if (Math.abs(e.deltaX) > 0 || (e.shiftKey && Math.abs(e.deltaY) > 0)) {
      isInteractingRef.current = true;
      scheduleResume(1200);
    }
  };

  const handleTouchStart = () => {
    isInteractingRef.current = true;
    clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    scheduleResume(1200);
  };

  const handleScroll = () => {
    checkWrap();
    if (containerRef.current) {
      subpixelScrollRef.current = containerRef.current.scrollLeft;
    }
    if (isInteractingRef.current) {
      scheduleResume(1200);
    }
  };

  return (
    <section id="video-results" className="video-marquee-section">
      <div
        ref={containerRef}
        className="marquee-wrapper"
        onPointerDown={handlePointerDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onScroll={handleScroll}
      >
        <div className="marquee-track">
          {[0, 1, 2, 3, 4].map((groupIndex) => (
            <div
              key={groupIndex}
              ref={groupIndex === 0 ? firstGroupRef : null}
              className="marquee-group"
              aria-hidden={groupIndex > 0 ? 'true' : 'false'}
            >
              {carouselVideos.map((vid, idx) => (
                <MarqueeCard key={`${groupIndex}-${idx}`} vid={vid} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
