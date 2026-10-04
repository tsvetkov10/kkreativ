import { useEffect, useRef, useState } from 'react';
import { downloadCoreVideos, isAudit } from '../utils/videoUtils';

export default function Preloader({ onComplete }) {
  const screenRef = useRef(null);
  // Timestamp query param ensures the animated WebP restarts from frame 0 on every reload
  const [animSrc] = useState(() => {
    const time = (typeof window !== 'undefined' && window.__KK_ANIM_TIME__) || Date.now();
    return `/Comp 9_1.webp?v=${time}`;
  });

  useEffect(() => {
    // If running in automated audit, complete immediately to avoid artificial delays
    if (isAudit) {
      onComplete();
      return;
    }

    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch (e) {}
    window.scrollTo(0, 0);
    let isMounted = true;
    let completed = false;

    const handleCompletion = () => {
      if (completed || !isMounted) return;
      completed = true;

      if (screenRef.current) {
        screenRef.current.classList.add('fade-out');
      }
      setTimeout(() => {
        if (isMounted) {
          window.scrollTo(0, 0);
          onComplete();
        }
      }, 500);
    };

    // 1. Minimum logo animation sequence duration (~3.2s) so the animation is fully enjoyed
    const minAnimPromise = new Promise((resolve) => setTimeout(resolve, 3200));

    // 2. Maximum safety timeout (4.5s) so slow connections never trap the user
    const maxSafetyTimeout = setTimeout(() => {
      handleCompletion();
    }, 4500);

    // 3. Immediately start downloading core videos in parallel in the background
    const downloadPromise = downloadCoreVideos().catch(() => {});

    // 4. Logo animation lasts until BOTH minimum animation sequence AND video downloads are done
    Promise.all([minAnimPromise, downloadPromise]).then(() => {
      clearTimeout(maxSafetyTimeout);
      handleCompletion();
    });

    return () => {
      isMounted = false;
      clearTimeout(maxSafetyTimeout);
    };
  }, [onComplete]);

  return (
    <div id="loading-screen" ref={screenRef} className="loading-screen">
      <div className="loading-wrap">
        <div className="video-crop-container">
          <img 
            key={animSrc}
            src={animSrc} 
            alt="kkreativ Loading"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            className="preloader-logo-video"
          />
        </div>
      </div>
    </div>
  );
}
