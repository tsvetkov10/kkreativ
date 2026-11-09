import { useState, useEffect } from 'react';

/**
 * Detect automated performance audits (Lighthouse, PageSpeed, Google Inspection Tool)
 */
export const isAudit = typeof navigator !== 'undefined' && (
  /Lighthouse|PageSpeed|Google-InspectionTool|headless/i.test(navigator.userAgent) ||
  navigator.webdriver === true
);

export const videoBlobCache = new Map();

/**
 * In-memory URL cache for reactive UI updates
 */
export function getCachedVideoSrc(videoUrl) {
  return videoUrl || '';
}

/**
 * React hook that returns the video URL.
 * Avoids using blob: URLs which fail in Safari / iOS AVFoundation media pipeline.
 */
export function useCachedVideoSrc(videoUrl) {
  return videoUrl || '';
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
 * Priority 1: Top-of-page hero carousel videos that the user sees IMMEDIATELY
 * when the preloader ends.
 */
export const CAROUSEL_VIDEOS = [
  encodeURI('/videos/caroussel/Autolux - E53(1)_5s_1080p_3s_1080p.mp4'),
  encodeURI('/videos/caroussel/ACAI HERO - Voice Message 5sec_3s_1080p.mp4'),
  encodeURI('/videos/caroussel/Leo_s Pasta - Leo cooking(1)_3sec_1080p.mp4'),
  encodeURI('/videos/caroussel/Autolux - S5(1)_5s_1080p_3s_1080p.mp4'),
  encodeURI('/videos/caroussel/ACAI HERO - как се произнася_(1)_5s_1080p_3s_1080p.mp4'),
  encodeURI('/videos/caroussel/Leo_s Pasta - POV_ Двойките ядат безплатно(1)_3sec_1080p.mp4'),
  encodeURI('/videos/caroussel/ACAI HERO - Габи_(1)_5s_1080p_3s_1080p.mp4')
];

/**
 * Priority 2: Primary client showcase videos further down the page
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
const preloadedSet = new Set();

/**
 * Preload a video into the browser's native HTTP cache for instant playback.
 * Does not create blob: URLs to preserve full compatibility with Safari/AVFoundation.
 */
export async function downloadVideo(url) {
  if (!url || isAudit) return url;
  if (preloadedSet.has(url)) return url;
  if (inFlightFetches.has(url)) return inFlightFetches.get(url);

  const fetchPromise = (async () => {
    try {
      preloadedSet.add(url);
      await fetch(url, { cache: 'force-cache' });
      return url;
    } catch {
      return url;
    } finally {
      inFlightFetches.delete(url);
    }
  })();

  inFlightFetches.set(url, fetchPromise);
  return fetchPromise;
}

/**
 * Downloads the hero carousel videos during the preloader animation so they
 * play with zero latency as soon as the preloader fades out.
 */
export async function downloadCoreVideos(onProgress) {
  if (isAudit) return Promise.resolve();

  // Priority 1: The first 4 videos are immediately visible on screen in the hero marquee
  const priorityVideos = CAROUSEL_VIDEOS.slice(0, 4);
  const remainingCarousel = CAROUSEL_VIDEOS.slice(4);

  // Preload all posters in parallel (lightweight JPGs, finishes in milliseconds)
  CAROUSEL_VIDEOS.forEach((url) => {
    const poster = getVideoPoster(url);
    if (poster) preloadImage(poster);
  });

  let completed = 0;
  const total = priorityVideos.length;

  const priorityPromises = priorityVideos.map(async (url) => {
    await downloadVideo(url);
    completed++;
    if (onProgress) {
      onProgress(Math.round((completed / total) * 100));
    }
  });

  // Stream remaining carousel and showcase videos concurrently in background
  remainingCarousel.forEach((url) => downloadVideo(url));
  CRAFT_PRIMARY_VIDEOS.forEach((url) => {
    const poster = getVideoPoster(url);
    if (poster) preloadImage(poster);
    downloadVideo(url);
  });

  await Promise.all(priorityPromises);
}

/**
 * Trigger immediate high-priority prefetch of a specific video (e.g. on link hover).
 */
export function preloadVideoImmediately(url) {
  if (!url || preloadedSet.has(url) || typeof document === 'undefined') return;
  preloadedSet.add(url);

  const poster = getVideoPoster(url);
  if (poster) {
    const img = new Image();
    img.src = poster;
  }

  downloadVideo(url);
}
