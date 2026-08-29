import logoVideoAsset from '../assets/Comp 9_1.webm';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="logo" aria-label="kkreativ Home">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="logo-video"
            >
              <source src={logoVideoAsset} type="video/webm" />
            </video>
          </a>
          <p>creativity is limitless.</p>
        </div>
        <div className="footer-links">
          <span className="footer-title font-mono">социални мрежи</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin</a>
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

