import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import CanvasBackground from './components/CanvasBackground';
import EmojiSplash from './components/EmojiSplash';

import Home from './components/Home';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
    
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
        <CanvasBackground />
        <EmojiSplash />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
}
