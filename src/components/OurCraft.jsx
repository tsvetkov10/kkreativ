import React, { useEffect } from 'react';
import PerformanceUgc from './PerformanceUgc';
import { useNavigate } from 'react-router-dom';

export default function OurCraft() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

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
