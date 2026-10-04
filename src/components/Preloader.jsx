import { useEffect, useRef, useState } from 'react';
import { downloadCoreVideos } from '../utils/videoUtils';

export default function Preloader({ onComplete }) {
  const screenRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
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
          onComplete();
        }
      }, 600);
    };

    // 1. Minimum logo animation sequence duration (~3.2s) so the animation is fully enjoyed
    const minAnimPromise = new Promise((resolve) => setTimeout(resolve, 3200));

    // 2. Maximum safety timeout (8.5s) so slow connections never trap the user
    const maxSafetyTimeout = setTimeout(() => {
      handleCompletion();
    }, 8500);

    // 3. Immediately start downloading core videos in parallel
    const downloadPromise = downloadCoreVideos((pct) => {
      if (isMounted) {
        setProgress(pct);
      }
    }).catch(() => {});

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
            src="/Comp 9_1.webp" 
            alt="kkreativ Loading"
            fetchpriority="high"
            loading="eager"
            decoding="async"
            className="preloader-logo-video"
          />
        </div>
        <div 
          className="loading-bar-wrap" 
          style={{ 
            marginTop: '-1.5rem', 
            opacity: progress > 0 ? 0.85 : 0, 
            transition: 'opacity 0.4s ease',
            height: '2px',
            width: '140px',
            background: 'rgba(255, 255, 255, 0.08)'
          }}
        >
          <div 
            className="loading-bar" 
            style={{ 
              width: `${Math.max(progress, 5)}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #d4af37, #f3e5ab)',
              transition: 'width 0.25s ease'
            }} 
          />
        </div>
      </div>
    </div>
  );
}
