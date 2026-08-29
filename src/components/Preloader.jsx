import { useEffect, useRef } from 'react';
import logoVideoMp4 from '../assets/Comp 9_1.mp4';
import logoVideoWebm from '../assets/Comp 9_1.webm';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

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

    // Safety fallback: if video is blocked or finishes, release after 4.5s max
    const fallbackTimeout = setTimeout(() => {
      handleCompletion();
    }, 4500);

    // Force strict mute & playsinline properties on DOM element for Safari/Chrome autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', 'true');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('autoplay', 'true');

    const startPlayback = () => {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    };

    video.load();
    startPlayback();

    video.addEventListener('canplay', startPlayback, { once: true });
    video.addEventListener('loadeddata', startPlayback, { once: true });

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, [onComplete]);

  return (
    <div id="loading-screen" ref={screenRef} className="loading-screen">
      <div className="loading-wrap">
        <div className="video-crop-container">
          <video 
            ref={videoRef}
            autoPlay 
            muted 
            defaultMuted
            playsInline 
            webkit-playsinline="true"
            controls={false}
            disablePictureInPicture
            className="preloader-logo-video"
            onEnded={() => {
              if (screenRef.current) {
                screenRef.current.classList.add('fade-out');
              }
              setTimeout(() => onComplete(), 700);
            }}
          >
            <source src={logoVideoMp4} type="video/mp4" />
            <source src={logoVideoWebm} type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}

