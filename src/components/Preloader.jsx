import { useEffect, useRef, useState } from 'react';
import logoAnimationWebp from '../assets/Comp 9_1.webp';

export default function Preloader({ onComplete }) {
  const screenRef = useRef(null);
  // Timestamp query param ensures the animated WebP restarts from frame 0 on every reload
  const [animSrc] = useState(() => `${logoAnimationWebp}?v=${Date.now()}`);

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

    // Play full animation sequence then fade out
    const timer = setTimeout(() => {
      handleCompletion();
    }, 3400);

    return () => {
      isMounted = false;
      clearTimeout(timer);
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
            className="preloader-logo-video"
          />
        </div>
      </div>
    </div>
  );
}


