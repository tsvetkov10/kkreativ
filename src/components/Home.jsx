import { useState, useEffect } from 'react';
import Hero from './Hero';
import VideoResults from './VideoResults';
import VideoStats from './VideoStats';
import WallOfLove from './WallOfLove';
import CraftShowcase from './CraftShowcase';
import WhatWeDo from './WhatWeDo';
import WhoWeAre from './WhoWeAre';
import Mission from './Mission';
import { useNavigate } from 'react-router-dom';
import novataEraImg from '../assets/kkreativ-novata-era-text-v2.png';

export default function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    let timer;
    const checkReady = () => {
      const loader = document.getElementById('loading-screen');
      if (loader) {
        timer = setTimeout(checkReady, 80);
      } else {
        timer = setTimeout(() => {
          setAnimate(true);
        }, 40);
      }
    };

    checkReady();

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`home-page-container ${animate ? 'is-animated' : ''}`}>
      <Hero />
      <VideoResults />
      <WallOfLove />
      <VideoStats />
      <CraftShowcase />
      <WhatWeDo />
      <WhoWeAre />
      <Mission />

      <section className="section cta-banner-section" style={{ paddingBottom: '8rem', paddingTop: '4rem', textAlign: 'center' }}>
        <div className="container reveal-scale">
          <img 
            src={novataEraImg} 
            alt="НОВАТА ЕРА НА МАРКЕТИНГА Е ВЕЧЕ ТУК - НЕ ИЗОСТАВАЙ." 
            style={{ 
              width: '100%', 
              maxWidth: '820px', 
              height: 'auto', 
              display: 'block', 
              margin: '0 auto 2.5rem auto',
              filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.5))'
            }} 
          />
          <button 
            className="btn btn-primary btn-nitro-call" 
            onClick={() => {
              navigate('/contact');
              window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
              document.documentElement.scrollTop = 0;
            }}
            style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
          >
            СВЪРЖИ СЕ!
          </button>
        </div>
      </section>
    </div>
  );
}
