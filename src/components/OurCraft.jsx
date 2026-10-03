import React, { useEffect } from 'react';
import PerformanceUgc from './PerformanceUgc';
import { useNavigate, useLocation } from 'react-router-dom';

export default function OurCraft() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash && location.hash !== '#ugc-acai-hero') {
      const id = location.hash.replace('#', '');
      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (el) {
          const navOffset = 90;
          const elementPosition = el.getBoundingClientRect().top + window.scrollY;
          const targetScroll = Math.max(0, elementPosition - navOffset);
          window.scrollTo({ top: targetScroll, behavior: 'smooth' });
        }
      };

      const timer1 = setTimeout(scrollToTarget, 60);
      const timer2 = setTimeout(scrollToTarget, 280);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="page-wrapper our-craft-page" style={{ minHeight: '100vh', paddingTop: '1rem', paddingBottom: '6rem' }}>
      <PerformanceUgc />

      <section className="section cta-banner-section" style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="container reveal-scale">
          <h2 style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: '#fff',
            marginBottom: '1.2rem',
            letterSpacing: '-0.02em',
            lineHeight: 1.2
          }}>
            ИСКАТЕ ПОДОБНИ РЕЗУЛТАТИ ЗА ВАШИЯ БРАНД?
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 2.5rem auto',
            lineHeight: 1.6
          }}>
            Свържете се с нас и нека създадем съдържание, което хората не просто гледат, а споделят.
          </p>
          <button 
            className="btn btn-primary btn-nitro-call" 
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
            }}
            style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
          >
            СВЪРЖИ СЕ С НАС!
          </button>
        </div>
      </section>
    </div>
  );
}
