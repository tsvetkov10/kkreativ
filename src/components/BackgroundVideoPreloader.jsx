import React, { useEffect, useRef } from 'react';
import { getVideoPoster } from '../utils/videoUtils';

export const CRAFT_PRIMARY_VIDEOS = [
  encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4'),
  encodeURI('/videos/autolux/S63 AMG_5s_1080p.mp4'),
  encodeURI('/videos/leo/How to kidnap me_5s_1080p.mp4')
];

export const CRAFT_ALL_VIDEOS = [
  encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4'),
  encodeURI('/videos/autolux/S63 AMG_5s_1080p.mp4'),
  encodeURI('/videos/leo/How to kidnap me_5s_1080p.mp4'),
  encodeURI('/videos/acai-hero/МОРСКИ ШАХ_5s_1080p.mp4'),
  encodeURI('/videos/autolux/Какво искаш__5s_1080p.mp4'),
  encodeURI('/videos/leo/Паста за 1 евро__5s_1080p.mp4'),
  encodeURI('/videos/acai-hero/Образователно_5s_1080p.mp4'),
  encodeURI('/videos/autolux/Най-евтината Х7_5s_1080p.mp4'),
  encodeURI('/videos/leo/Хората ми казаха, че съм луд_5s_1080p.mp4')
];

const preloadedSet = new Set();

/**
 * Trigger immediate high-priority prefetch of a specific video (e.g. on link hover).
 */
export function preloadVideoImmediately(url) {
  if (!url || preloadedSet.has(url) || typeof document === 'undefined') return;
  preloadedSet.add(url);

  // 1. Preload poster first
  const poster = getVideoPoster(url);
  if (poster) {
    const img = new Image();
    img.src = poster;
  }

  // 2. Preload video using hidden video element
  const video = document.createElement('video');
  video.preload = 'auto';
  video.muted = true;
  video.playsInline = true;
  video.src = url;
  video.load();

  // 3. Add prefetch link for Chromium / Firefox disk cache
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.as = 'video';
  link.href = url;
  document.head.appendChild(link);
}

export default function BackgroundVideoPreloader() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Wait until initial page rendering is idle so we don't compete with main page load
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

        if (preloadedSet.has(currentUrl)) {
          loadNext();
          return;
        }
        preloadedSet.add(currentUrl);

        // Append hidden link prefetch
        try {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'video';
          link.href = currentUrl;
          document.head.appendChild(link);
        } catch {
          // ignore
        }

        // Create background video element to warm up media cache
        const v = document.createElement('video');
        v.preload = 'auto';
        v.muted = true;
        v.playsInline = true;
        v.src = currentUrl;

        let advanced = false;
        const advance = () => {
          if (!advanced) {
            advanced = true;
            // Delay next video by 400ms to allow smooth network spacing
            setTimeout(loadNext, 400);
          }
        };

        v.oncanplay = advance;
        v.onloadeddata = advance;
        v.onerror = advance;

        // Fallback timeout to ensure queue never hangs
        setTimeout(advance, 3500);

        v.load();
      };

      loadNext();
    };

    // Delay start by 800ms so the active page finishes its critical paint
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
