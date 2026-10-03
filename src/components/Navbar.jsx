import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileActive, setMobileActive] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Scroll reveal only matters on the home page where sections exist
    if (location.pathname !== '/') return;

    const handleScrollReveal = () => {
      const sections = document.querySelectorAll('section');
      const scrollPos = window.scrollY + 200; // Offset

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScrollReveal);
    return () => window.removeEventListener('scroll', handleScrollReveal);
  }, [location]);

  const scrollToSection = (id) => {
    if (id === 'hero' || id === 'home') {
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
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  // When location hash changes, scroll to it (handles cross-page hash links)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
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
      document.documentElement.scrollTop = 0;
      return;
    }

    if (target === '/our-craft' || target === '/craft') {
      navigate('/our-craft');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      return;
    }

    if (target === '/' || target === '#hero' || target === '#home') {
      if (location.pathname !== '/') {
        navigate('/');
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
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
