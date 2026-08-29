import { useState, useEffect } from 'react';

export default function Footer() {
  const [localTime, setLocalTime] = useState('00:00:00 GMT');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZoneName: 'short'
      };
      setLocalTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="logo">[kk]</a>
          <p>creativity is limitless.</p>
        </div>
        <div className="footer-links">
          <span className="footer-title font-mono">социални мрежи</span>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">instagram</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">linkedin</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">x / twitter</a>
        </div>
        <div className="footer-meta">
          <span className="footer-title font-mono">местно време</span>
          <div className="footer-time font-mono">{localTime}</div>
          <p className="copyright">&copy; {currentYear} kkreativ. Всички права запазени.</p>
          <p className="copyright" style={{ marginTop: '0.5rem', opacity: 0.6, fontSize: '0.8rem' }}>
            Created and maintained by <span style={{ color: 'var(--gold-main)' }}>thereal4avo</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
