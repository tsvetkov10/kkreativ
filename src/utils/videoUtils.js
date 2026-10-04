/**
 * Maps a video URL to its corresponding pre-generated poster thumbnail.
 */
export function getVideoPoster(videoUrl) {
  if (!videoUrl) return '';
  try {
    const decoded = decodeURI(videoUrl);
    const parts = decoded.split('/');
    const filename = parts.pop() || '';
    const folder = parts.pop() || '';
    const baseName = filename.replace(/\.[^/.]+$/, "");
    return encodeURI(`/posters/${folder}_${baseName}.jpg`);
  } catch {
    return '';
  }
}

/**
 * Preload an image URL into browser cache.
 */
export function preloadImage(url) {
  if (!url || typeof window === 'undefined') return Promise.resolve();
  return new Promise((resolve) => {
    const img = new Image();
    img.src = url;
    img.onload = resolve;
    img.onerror = resolve;
  });
}

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
  try {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.as = 'video';
    link.href = url;
    document.head.appendChild(link);
  } catch {
    // ignore
  }
}
