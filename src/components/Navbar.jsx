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

  // When location hash changes, scroll to it (handles cross-page hash links)
  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          const offset = 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  const handleLinkClick = (e, target) => {
    e.preventDefault();
    setMobileActive(false);

    if (target === '/contact') {
      navigate('/contact');
      window.scrollTo(0, 0);
      return;
    }

    if (target === '/') {
      navigate('/');
      window.scrollTo(0, 0);
      return;
    }

    if (target.startsWith('#')) {
      const id = target.substring(1);
      if (location.pathname !== '/') {
        navigate(`/${target}`);
      } else {
        const element = document.getElementById(id);
        if (element) {
          const offset = id === 'what-we-do' ? 0 : 80;
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
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
            href="/#what-we-do" 
            onClick={(e) => handleLinkClick(e, '#what-we-do')} 
            className={`nav-item ${activeSection === 'what-we-do' && location.pathname === '/' ? 'active' : ''}`}
          >
            our craft
          </a>
          <a 
            href="/#about-us" 
            onClick={(e) => handleLinkClick(e, '#about-us')} 
            className={`nav-item ${activeSection === 'about-us' && location.pathname === '/' ? 'active' : ''}`}
          >
            our story
          </a>
          {/* Mobile Only CTA */}
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="mobile-cta-only btn-nav-cta"
            style={{ display: 'none' }}
          >
            start conversation
          </a>
        </div>
        <div className="nav-cta">
          <a 
            href="/contact" 
            onClick={(e) => handleLinkClick(e, '/contact')} 
            className="btn-nav-cta"
          >
            start conversation
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
