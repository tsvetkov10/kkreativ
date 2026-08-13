import { useEffect, useState, useRef } from 'react';

// Custom hook to animate numbers smoothly
const useCountUp = (end, duration, startCounting) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startCounting) return;
    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // easeOutExpo curve for dramatic slow-down at the end
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      }
    };
    
    animationFrameId = window.requestAnimationFrame(step);

    return () => window.cancelAnimationFrame(animationFrameId);
  }, [end, duration, startCounting]);

  return count;
};

export default function VideoStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  const views = useCountUp(10, 5000, isVisible);
  const likes = useCountUp(1000, 5000, isVisible);
  const growth = useCountUp(200, 5000, isVisible);

  return (
    <section ref={sectionRef} className="section video-stats-section" id="video-stats" style={{ paddingTop: '2rem' }}>
      <div className="container">
        <div className="section-header reveal-up" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <span className="section-tag font-mono text-gold">/ РЕЗУЛТАТИ ОТ ВИДЕА</span>
          <h2>резултати от видеа.</h2>
        </div>

        <div className="stats-capsule reveal-scale" style={{ marginTop: '3rem' }}>
          <div className="stat-capsule-item">
            <div className="stat-capsule-num gradient-text">{views}M+</div>
            <div className="stat-capsule-lbl">Генерирани гледания</div>
          </div>
          <div className="stat-capsule-item">
            <div className="stat-capsule-num gradient-text">
              {likes === 1000 ? '1M+' : `${likes}K+`}
            </div>
            <div className="stat-capsule-lbl">Генерирани харесвания</div>
          </div>
          <div className="stat-capsule-item">
            <div className="stat-capsule-num gradient-text">+{growth}%</div>
            <div className="stat-capsule-lbl">Ръст на трафика</div>
          </div>
        </div>
      </div>
    </section>
  );
}
