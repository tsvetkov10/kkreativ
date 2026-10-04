import React, { useEffect, useRef, useState } from 'react';
import { getVideoPoster } from '../utils/videoUtils';

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
  },
  {
    src: encodeURI('/videos/caroussel/Leo_s Pasta - искаш да се скараме_(1)_5sec_1080p.mp4'),
    title: "LEO'S PASTA"
  }
];

function MarqueeCard({ vid }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const isIntersectingRef = useRef(false);
  const poster = getVideoPoster(vid.src);

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

    // Only play cards that are visible in the viewport to prevent GPU decoder overload
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
      { rootMargin: '100px 0px', threshold: 0 }
    );

    observer.observe(card);

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
          loading="lazy"
          decoding="async"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '24px',
            zIndex: 0,
            pointerEvents: 'none'
          }}
        />
      )}
      <video
        ref={videoRef}
        src={vid.src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
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
          zIndex: 1
        }}
      />
    </div>
  );
}

export default function VideoResults() {
  return (
    <section id="video-results" className="video-marquee-section">
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[0, 1].map((groupIndex) => (
            <div key={groupIndex} className="marquee-group" aria-hidden={groupIndex > 0 ? 'true' : 'false'}>
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
