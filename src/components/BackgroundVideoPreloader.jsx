import { useEffect } from 'react';
import { CRAFT_ALL_VIDEOS, getVideoPoster, downloadVideo, videoBlobCache } from '../utils/videoUtils';

const backgroundPreloadedSet = new Set();

export default function BackgroundVideoPreloader() {
  useEffect(() => {
    let isCancelled = false;
    let preloaderTimeout;

    const startPreloading = async () => {
      // 1. Immediately cache all poster images (fast and lightweight)
      CRAFT_ALL_VIDEOS.forEach((url) => {
        const poster = getVideoPoster(url);
        if (poster) {
          const img = new Image();
          img.src = poster;
        }
      });

      // 2. Sequentially download remaining videos one by one into in-memory blob cache
      for (const currentUrl of CRAFT_ALL_VIDEOS) {
        if (isCancelled) break;
        if (backgroundPreloadedSet.has(currentUrl) || videoBlobCache.has(currentUrl)) {
          continue;
        }
        backgroundPreloadedSet.add(currentUrl);

        try {
          await downloadVideo(currentUrl);
        } catch {
          // ignore error and proceed to next
        }

        // Brief delay between downloads so network & main thread remain idle
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
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
