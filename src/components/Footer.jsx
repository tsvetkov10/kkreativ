import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openCookieSettings = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a 
            href="/" 
            onClick={handleLogoClick} 
            className="logo"
            style={{ 
              fontSize: 'clamp(2.4rem, 3.8vw, 3rem)', 
              marginBottom: '0.85rem',
              display: 'inline-block' 
            }}
          >
            [kk]
          </a>
          <p style={{ 
            fontSize: 'clamp(1.2rem, 2vw, 1.4rem)', 
            color: 'var(--text-secondary)',
            letterSpacing: '0.01em',
            margin: 0
          }}>
            creativity is limitless.
          </p>
        </div>

        <div className="footer-links" style={{ gap: '0.5rem' }}>
          <span className="footer-title font-mono" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>социални мрежи</span>
          <a href="https://www.instagram.com/kkreativagency?igsh=MWd0ZHBpZWlsZ3pocw%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.05rem' }}>instagram</a>
          <a href="https://www.tiktok.com/@kkreativagency?is_from_webapp=1&sender_device=pc" target="_blank" rel="noopener noreferrer" style={{ fontSize: '1.05rem' }}>tiktok</a>
        </div>

        <div className="footer-links" style={{ gap: '0.5rem' }}>
          <span className="footer-title font-mono" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>правна информация</span>
          <Link to="/cookies" style={{ fontSize: '1.05rem' }}>политика за бисквитките</Link>
          <Link to="/privacy" style={{ fontSize: '1.05rem' }}>политика за поверителност</Link>
          <button 
            type="button"
            onClick={openCookieSettings}
            style={{ 
              background: 'none', 
              border: 'none', 
              padding: 0, 
              color: 'var(--text-secondary)', 
              fontSize: '1.05rem', 
              textAlign: 'left', 
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'color 0.2s ease, padding 0.2s ease'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.paddingLeft = '0.2rem'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.paddingLeft = '0'; }}
          >
            настройки за бисквитки
          </button>
        </div>

        <div className="footer-meta">
          <p className="copyright">&copy; {currentYear} kkreativ. Всички права запазени.</p>
          <p className="copyright" style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.8rem' }}>
            Created and maintained by <span style={{ color: 'var(--gold-main)' }}>thereal4avo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
