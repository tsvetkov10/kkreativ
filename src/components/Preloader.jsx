import { useEffect, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const screenRef = useRef(null);

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
            src="/Comp 9_1.webp" 
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


