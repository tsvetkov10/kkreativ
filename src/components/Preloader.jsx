import { useEffect, useRef } from 'react';
import logoAnimationWebp from '../assets/Comp 9_1.webp';

export default function Preloader({ onComplete }) {
  const screenRef = useRef(null);

  useEffect(() => {
    let completed = false;

    const handleCompletion = () => {
      if (completed) return;
      completed = true;

      if (screenRef.current) {
        screenRef.current.classList.add('fade-out');
      }
      setTimeout(() => {
        onComplete();
      }, 700);
    };

    // The animation plays for ~4 seconds before unveiling the site
    const timer = setTimeout(() => {
      handleCompletion();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div id="loading-screen" ref={screenRef} className="loading-screen">
      <div className="loading-wrap">
        <div className="video-crop-container">
          <img 
            src={logoAnimationWebp} 
            alt="kkreativ Loading"
            className="preloader-logo-video"
          />
        </div>
      </div>
    </div>
  );
}

