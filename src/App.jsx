import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import EmojiSplash from './components/EmojiSplash';
import Footer from './components/Footer';
import BackgroundVideoPreloader from './components/BackgroundVideoPreloader';
import CookieBanner from './components/CookieBanner';

import Home from './components/Home';

// Code-split secondary routes to eliminate 90+ KiB unused JavaScript on initial load
const OurCraft = lazy(() => import('./components/OurCraft'));
const Contact = lazy(() => import('./components/Contact'));
const LegalPolicy = lazy(() => import('./components/LegalPolicy'));

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();
  const isFirstMount = useRef(true);

  // Send page_view to Google Analytics on client-side route transitions
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', 'G-Y4YGG5TG73', {
          page_path: location.pathname + location.search,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [location.pathname, location.search]);

  useEffect(() => {
    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
    } catch (e) {}
    // Scroll to top on route change without forced layout reflow
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    
    if (!loaded) return;

    let observer;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
      );

      const elements = document.querySelectorAll('.reveal-up, .reveal-scale');
      elements.forEach((el) => observer.observe(el));
    }, 150);

    return () => {
      clearTimeout(timer);
      if (observer) {
        const elements = document.querySelectorAll('.reveal-up, .reveal-scale');
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [loaded, location.pathname]);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      
      {/* Main App Layout */}
      <div style={{ position: 'relative', opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease' }}>
        <Navbar />
        <CanvasBackground active={loaded} />
        <EmojiSplash />
        <BackgroundVideoPreloader active={loaded} />
        <CookieBanner />

        <main style={{ position: 'relative', zIndex: 1 }}>
          <Suspense fallback={null}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/our-craft" element={<OurCraft />} />
              <Route path="/craft" element={<OurCraft />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cookies" element={<LegalPolicy initialTab="cookies" />} />
              <Route path="/cookie-policy" element={<LegalPolicy initialTab="cookies" />} />
              <Route path="/privacy" element={<LegalPolicy initialTab="privacy" />} />
              <Route path="/privacy-policy" element={<LegalPolicy initialTab="privacy" />} />
            </Routes>
          </Suspense>
        </main>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Footer />
        </div>
      </div>
    </>
  );
}
