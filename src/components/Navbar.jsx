import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { preloadVideoImmediately } from '../utils/videoUtils';

export default function Navbar() {
  const [mobileActive, setMobileActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (id) => {
    if (id === 'hero' || id === 'home' || id === 'ugc-acai-hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(id);
    if (!element) return;

    if (id === 'projects') {
      const titleEl = element.querySelector('.section-tag') || element;
      const navEl = document.querySelector('.navbar');
      const navBottom = (navEl && navEl.offsetHeight < 120) ? navEl.getBoundingClientRect().bottom : 80;
      const titleRect = titleEl.getBoundingClientRect();
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      const titleAbsoluteTop = titleRect.top + currentScrollY;
      const targetScroll = Math.max(0, titleAbsoluteTop - (navBottom + 25));
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
      return;
    }

    const offset = 80;
    const targetScroll = Math.max(0, element.getBoundingClientRect().top + window.scrollY - offset);
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // When location hash changes, scroll to it (handles cross-page hash links)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      if (id === 'ugc-acai-hero') {
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }
      const timer = setTimeout(() => {
        scrollToSection(id);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setMobileActive(false);

    if (target === '/contact') {
      navigate('/contact');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === '/our-craft' || target === '/craft') {
      navigate('/our-craft');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      return;
    }

    if (target === '/' || target === '#hero' || target === '#home') {
      if (location.pathname !== '/') {
        navigate('/');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    if (target.startsWith('#')) {
      const id = target.substring(1);
      if (location.pathname !== '/') {
        navigate(`/${target}`);
      } else {
        scrollToSection(id);
      }
    }
  };

  return (
    <header className="nav-container">
      <nav className={`navbar ${mobileActive ? 'mobile-active' : ''}`} id="navbar">
        <div className="nav-logo">
          <a href="/" onClick={(e) => handleLinkClick(e, '/')} className="logo">[kk]</a>
        </div>
        <div className="nav-links">
          <a 
            href="/#hero" 
            onClick={(e) => handleLinkClick(e, '#hero')} 
            className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
          >
            our home
          </a>
          <a 
            href="/our-craft" 
            onClick={(e) => handleLinkClick(e, '/our-craft')} 
            onMouseEnter={() => preloadVideoImmediately(encodeURI('/videos/acai-hero/Acai bowl или 100 евро__5s_1080p.mp4'))}
            className={`nav-item ${location.pathname === '/our-craft' || location.pathname === '/craft' ? 'active' : ''}`}
          >
            our craft
          </a>
          {/* Mobile Only CTA */}
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="mobile-cta-only btn-nav-cta"
            style={{ display: 'none' }}
          >
            START A CONVERSATION
          </a>
        </div>
        <div className="nav-cta">
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="btn-nav-cta"
          >
            START A CONVERSATION
          </a>
        </div>
        
        {/* Mobile Toggle Menu button */}
        <button 
          className="mobile-toggle" 
          aria-label="Преключване на менюто"
          onClick={() => setMobileActive(!mobileActive)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </nav>
    </header>
  );
}
