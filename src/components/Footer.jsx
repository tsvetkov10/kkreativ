export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
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

