import { useEffect } from 'react';
import { CRAFT_ALL_VIDEOS, getVideoPoster, downloadVideo, videoBlobCache, isAudit } from '../utils/videoUtils';

const backgroundPreloadedSet = new Set();

export default function BackgroundVideoPreloader({ active = false }) {
  useEffect(() => {
    if (!active || isAudit) return;

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

        // Generous delay between downloads so network & main thread remain idle
        await new Promise((resolve) => setTimeout(resolve, 1500));
      }
    };

    // Defer preloading until 3.5s after user enters the page
    preloaderTimeout = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(startPreloading, { timeout: 4000 });
      } else {
        startPreloading();
      }
    }, 3500);

    return () => {
      isCancelled = true;
      clearTimeout(preloaderTimeout);
    };
  }, [active]);

  return null;
}
