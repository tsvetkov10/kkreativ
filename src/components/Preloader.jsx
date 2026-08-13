import { useEffect, useRef } from 'react';
import logoVideoAsset from '../assets/Comp 9_1.webm';
import logoVideoAssetHevc from '../assets/Comp 9_1.mov';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const screenRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId;
    let completed = false;
    const startTime = Date.now();
    const targetDuration = 3500; // Target smooth load duration in ms

    // Safety fallback: if video is blocked/fails, release anyway after 3.8s
    const fallbackTimeout = setTimeout(() => {
      handleCompletion();
    }, 3800);

    const handleCompletion = () => {
      if (completed) return;
      completed = true;
      clearTimeout(fallbackTimeout);
      cancelAnimationFrame(animationFrameId);

      // Snap transition out
      setTimeout(() => {
        if (screenRef.current) {
          screenRef.current.classList.add('fade-out');
        }
        setTimeout(() => {
          onComplete();
        }, 800);
      }, 150); 
    };

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      let timeProgress = elapsed / targetDuration;
      if (timeProgress > 1) timeProgress = 1;

      // Cubic Ease-Out curve for an organic, believable deceleration
      const easedProgress = 1 - Math.pow(1 - timeProgress, 3.8);

      // Blend with video playback rate (if metadata has loaded)
      let videoProgress = 0;
      if (video.duration) {
        const videoTarget = Math.max(1, video.duration - 1.0);
        videoProgress = video.currentTime / videoTarget;
        if (videoProgress > 1) videoProgress = 1;
      }

      const finalProgress = Math.max(easedProgress, videoProgress);

      // Check if finished
      if (finalProgress >= 1 || (video.duration && video.currentTime >= video.duration - 1.0)) {
        handleCompletion();
        return;
      }

      animationFrameId = requestAnimationFrame(updateProgress);
    };

    // Attempt video playback programmatically
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked by browser policy
      });
    }

    animationFrameId = requestAnimationFrame(updateProgress);

    return () => {
      clearTimeout(fallbackTimeout);
      cancelAnimationFrame(animationFrameId);
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
            playsInline 
            className="preloader-logo-video"
          >
            <source src={logoVideoAssetHevc} type='video/quicktime; codecs="hvc1"' />
            <source src={logoVideoAsset} type='video/webm; codecs="vp9"' />
          </video>
        </div>
      </div>
    </div>
  );
}
