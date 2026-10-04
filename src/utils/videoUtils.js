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
