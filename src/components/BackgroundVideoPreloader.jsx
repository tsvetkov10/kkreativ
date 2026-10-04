import { useEffect } from 'react';
import { CRAFT_ALL_VIDEOS, getVideoPoster } from '../utils/videoUtils';

const backgroundPreloadedSet = new Set();

export default function BackgroundVideoPreloader() {
  useEffect(() => {
    let isCancelled = false;
    let preloaderTimeout;

    const startPreloading = () => {
      // 1. Immediately cache all poster images (fast and lightweight)
      CRAFT_ALL_VIDEOS.forEach((url) => {
        const poster = getVideoPoster(url);
        if (poster) {
          const img = new Image();
          img.src = poster;
        }
      });

      // 2. Sequentially preload videos one by one so bandwidth is focused
      let idx = 0;
      const loadNext = () => {
        if (isCancelled || idx >= CRAFT_ALL_VIDEOS.length) return;
        const currentUrl = CRAFT_ALL_VIDEOS[idx];
        idx++;

        if (backgroundPreloadedSet.has(currentUrl)) {
          loadNext();
          return;
        }
        backgroundPreloadedSet.add(currentUrl);

        try {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'video';
          link.href = currentUrl;
          document.head.appendChild(link);
        } catch {
          // ignore
        }

        const v = document.createElement('video');
        v.preload = 'auto';
        v.muted = true;
        v.playsInline = true;
        v.src = currentUrl;

        let advanced = false;
        const advance = () => {
          if (!advanced) {
            advanced = true;
            setTimeout(loadNext, 400);
          }
        };

        v.oncanplay = advance;
        v.onloadeddata = advance;
        v.onerror = advance;

        setTimeout(advance, 3500);
        v.load();
      };

      loadNext();
    };

    if ('requestIdleCallback' in window) {
      preloaderTimeout = window.requestIdleCallback(startPreloading, { timeout: 1500 });
    } else {
      preloaderTimeout = setTimeout(startPreloading, 1000);
    }

    return () => {
      isCancelled = true;
      if (typeof window !== 'undefined' && 'cancelIdleCallback' in window && typeof preloaderTimeout === 'number') {
        window.cancelIdleCallback(preloaderTimeout);
      } else {
        clearTimeout(preloaderTimeout);
      }
    };
  }, []);

  return null;
}
