import React, { useEffect } from 'react';
import PerformanceUgc from './PerformanceUgc';
import { useNavigate, useLocation } from 'react-router-dom';
import ourCraftCtaImg from '../assets/our-craft-call-to-action.webp';

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
    }
  }, [location.hash, location.pathname]);

  return (
    <div className="page-wrapper our-craft-page" style={{ minHeight: '100vh', paddingTop: '1rem', paddingBottom: '6rem' }}>
      <PerformanceUgc />

      <section className="section cta-banner-section" style={{ textAlign: 'center', paddingTop: '3rem', paddingBottom: '6rem' }}>
        <div className="container reveal-scale">
          <img 
            src={ourCraftCtaImg} 
            alt="И ТВОЯ БРАНД МОЖЕ ДА СЕ ХВАЛИ С ПОДОБНИ РЕЗУЛТАТИ..." 
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            style={{ 
              width: '100%', 
              maxWidth: '820px', 
              height: 'auto', 
              display: 'block', 
              margin: '0 auto 2.5rem auto',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))',
              cursor: 'pointer'
            }} 
          />
          <button 
            className="btn btn-primary btn-nitro-call" 
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }}
            style={{ fontSize: '1.2rem', padding: '1.2rem 3rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}
          >
            СВЪРЖИ СЕ С НАС!
          </button>
        </div>
      </section>
    </div>
  );
}
