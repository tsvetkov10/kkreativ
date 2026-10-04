/**
 * In-memory Blob URL cache for instant, zero-latency playback.
 */
export const videoBlobCache = new Map();

/**
 * Returns the in-memory Blob URL if downloaded, otherwise returns the original URL.
 */
export function getCachedVideoSrc(videoUrl) {
  if (!videoUrl) return '';
  return videoBlobCache.get(videoUrl) || videoUrl;
}

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

/**
 * The core client videos that MUST be ready before the preloader completes:
 * (Acai Hero, Autolux, Leo's Pasta - used in both Home showcase and Our Craft)
 */
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

const inFlightFetches = new Map();

/**
 * Fully download a video and convert to a memory blob URL.
 */
export async function downloadVideo(url) {
  if (!url) return null;
  if (videoBlobCache.has(url)) return videoBlobCache.get(url);
  if (inFlightFetches.has(url)) return inFlightFetches.get(url);

  const fetchPromise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const blob = await res.blob();
      const blobUrl = URL.createObjectURL(blob);
      videoBlobCache.set(url, blobUrl);
      return blobUrl;
    } catch (err) {
      // If fetch is blocked or fails, fall back to native video buffering
      return url;
    } finally {
      inFlightFetches.delete(url);
    }
  })();

  inFlightFetches.set(url, fetchPromise);
  return fetchPromise;
}

/**
 * Downloads the core primary videos with progress callback.
 */
export async function downloadCoreVideos(onProgress) {
  let completed = 0;
  const total = CRAFT_PRIMARY_VIDEOS.length;

  const promises = CRAFT_PRIMARY_VIDEOS.map(async (url) => {
    // Also preload poster image in parallel
    const poster = getVideoPoster(url);
    if (poster) {
      preloadImage(poster);
    }

    await downloadVideo(url);
    completed++;
    if (onProgress) {
      onProgress(Math.round((completed / total) * 100));
    }
  });

  await Promise.all(promises);
}

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

  // 2. Fetch full blob into memory cache
  downloadVideo(url);
}
