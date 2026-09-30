import React, { useEffect, useRef, useState } from 'react';

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
    src: encodeURI('/videos/caroussel/Studio 63 - можеш ли да плеснеш_(1)_5sec_1080p.mp4'),
    title: 'STUDIO 63'
  },
  {
    src: '/videos/caroussel/Leos_Pasta_POV_Dvoikite_5sec_1080p.mp4',
    title: "LEO'S PASTA"
  },
  {
    src: encodeURI('/videos/caroussel/Autolux - Брутална доставка(1)_5sec_1080p.mp4'),
    title: 'AUTOLUX'
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

// Persistent in-memory Blob Cache: downloads each of the 10 files exactly ONCE into RAM
// Subsequent loops and other cards reference this same in-memory Blob with 0 network calls.
const videoBlobCache = new Map();
const blobListeners = new Set();

function initVideoBlobPreload() {
  carouselVideos.forEach((vid) => {
    if (videoBlobCache.has(vid.src)) return;

    fetch(vid.src)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        videoBlobCache.set(vid.src, blobUrl);
        blobListeners.forEach((fn) => fn(vid.src, blobUrl));
      })
      .catch((err) => {
        console.warn('Fallback to direct URL for video:', vid.src, err);
      });
  });
}

// Start in-memory preload immediately
initVideoBlobPreload();

function MarqueeCard({ vid }) {
  const videoRef = useRef(null);
  const cardRef = useRef(null);
  const [videoSrc, setVideoSrc] = useState(() => videoBlobCache.get(vid.src) || vid.src);
  const isIntersectingRef = useRef(false);

  useEffect(() => {
    if (!videoBlobCache.has(vid.src)) {
      const listener = (src, blobUrl) => {
        if (src === vid.src) {
          setVideoSrc(blobUrl);
        }
      };
      blobListeners.add(listener);
      return () => {
        blobListeners.delete(listener);
      };
    }
  }, [vid.src]);

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
      <video
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="auto"
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
          borderRadius: '24px'
        }}
      />

      <div className="marquee-card-inner">
        <span className="font-mono marquee-tag">{vid.title}</span>
      </div>
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
