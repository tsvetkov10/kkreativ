import { useState, useEffect, useRef } from 'react';

export default function CountUp({ end, duration = 1800, suffix = '', decimals = 0 }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeProgress * end;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    const handleIntersection = (entries) => {
      if (entries[0].isIntersecting) {
        animationFrameId = requestAnimationFrame(step);
        if (observerRef.current && countRef.current) {
          observerRef.current.unobserve(countRef.current);
        }
      }
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    observerRef.current = observer;

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [end, duration]);

  const formatNumber = (num) => {
    if (decimals > 0) {
      return num.toFixed(decimals);
    }
    return Math.floor(num).toLocaleString('en-US');
  };

  return <span ref={countRef}>{formatNumber(count)}{suffix}</span>;
}
