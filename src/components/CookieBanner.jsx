import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('kk_cookie_consent');
    const storedAnalytics = localStorage.getItem('kk_analytics_consent');

    if (storedConsent === null) {
      const timer = setTimeout(() => {
        setBannerVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(storedAnalytics === 'true');
    }
  }, []);

  useEffect(() => {
    const handleOpenModal = () => {
      const storedAnalytics = localStorage.getItem('kk_analytics_consent');
      setAnalyticsConsent(storedAnalytics === 'true');
      setModalOpen(true);
    };

    window.addEventListener('openCookieSettings', handleOpenModal);
    return () => window.removeEventListener('openCookieSettings', handleOpenModal);
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  const updateGoogleConsent = (granted) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('consent', 'update', {
        analytics_storage: granted ? 'granted' : 'denied'
      });
    }
  };

  const handleAcceptAll = () => {
    localStorage.setItem('kk_cookie_consent', 'all');
    localStorage.setItem('kk_analytics_consent', 'true');
    setAnalyticsConsent(true);
    updateGoogleConsent(true);
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('kk_cookie_consent', 'essential_only');
    localStorage.setItem('kk_analytics_consent', 'false');
    setAnalyticsConsent(false);
    updateGoogleConsent(false);
    setBannerVisible(false);
    setModalOpen(false);
  };

  const handleSaveCustom = () => {
    localStorage.setItem('kk_cookie_consent', 'custom');
    localStorage.setItem('kk_analytics_consent', analyticsConsent ? 'true' : 'false');
    updateGoogleConsent(analyticsConsent);
    setBannerVisible(false);
    setModalOpen(false);
  };

  return (
    <>
      {/* Cookie Notification Banner */}
      {bannerVisible && !modalOpen && (
        <div 
          className="cookie-banner-container"
          role="region"
          aria-label="Известие за бисквитки"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 2rem)',
            maxWidth: '820px',
            zIndex: 9995,
            background: 'rgba(12, 12, 15, 0.96)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
            borderRadius: '12px',
            padding: '1.25rem 1.5rem',
            color: '#fff',
            animation: 'cookieBannerFadeUp 0.35s ease forwards'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontSize: '1.15rem', lineHeight: 1 }}>🍪</span>
              <span style={{ fontSize: '0.98rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                Ние използваме бисквитки
              </span>
            </div>

            <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.72)' }}>
              Използваме необходими бисквитки за работата на сайта и, с Ваше съгласие, аналитични бисквитки, за да го подобряваме. Можете да приемете, откажете или промените избора си по всяко време.
            </p>

            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                flexWrap: 'wrap', 
                gap: '0.75rem',
                paddingTop: '0.5rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  style={{
                    background: 'var(--gold-main)',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '0.45rem 1.15rem',
                    color: '#08080a',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Приемам всички
                </button>

                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '6px',
                    padding: '0.45rem 0.9rem',
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                    e.currentTarget.style.color = 'rgba(255, 255, 255, 0.8)';
                  }}
                >
                  Настройки
                </button>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.78rem' }}>
                <Link 
                  to="/cookies" 
                  style={{ color: 'rgba(255, 255, 255, 0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--gold-main)'; e.target.style.textDecoration = 'underline'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'rgba(255, 255, 255, 0.55)'; e.target.style.textDecoration = 'none'; }}
                >
                  Политика за бисквитките
                </Link>
                <Link 
                  to="/privacy" 
                  style={{ color: 'rgba(255, 255, 255, 0.55)', textDecoration: 'none', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--gold-main)'; e.target.style.textDecoration = 'underline'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'rgba(255, 255, 255, 0.55)'; e.target.style.textDecoration = 'none'; }}
                >
                  Политика за поверителност
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Preferences Dialog */}
      {modalOpen && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem',
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '560px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0d0d10',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '14px',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              padding: '2rem',
              color: '#fff'
            }}
          >
            {/* Header */}
            <div style={{ marginBottom: '1.75rem' }}>
              <h3 id="cookie-modal-title" style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600, color: '#fff', letterSpacing: '-0.01em' }}>
                Настройки за бисквитки
              </h3>
            </div>

            {/* Category: Only Analytics */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                  Аналитични технологии (Google Analytics 4)
                </span>
                
                {/* Clean switch toggle */}
                <label 
                  style={{
                    position: 'relative',
                    display: 'inline-block',
                    width: '42px',
                    height: '22px',
                    cursor: 'pointer',
                    flexShrink: 0
                  }}
                >
                  <input 
                    type="checkbox"
                    checked={analyticsConsent}
                    onChange={(e) => setAnalyticsConsent(e.target.checked)}
                    style={{ opacity: 0, width: 0, height: 0 }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      cursor: 'pointer',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: analyticsConsent ? 'var(--gold-main)' : 'rgba(255, 255, 255, 0.15)',
                      transition: '0.25s ease',
                      borderRadius: '22px'
                    }}
                  >
                    <span 
                      style={{
                        position: 'absolute',
                        content: '""',
                        height: '16px',
                        width: '16px',
                        left: analyticsConsent ? '23px' : '3px',
                        bottom: '3px',
                        backgroundColor: analyticsConsent ? '#08080a' : '#fff',
                        transition: '0.25s ease',
                        borderRadius: '50%'
                      }}
                    />
                  </span>
                </label>
              </div>
              <p style={{ margin: 0, fontSize: '0.83rem', lineHeight: '1.6', color: 'rgba(255, 255, 255, 0.62)' }}>
                С Ваше съгласие използваме Google Analytics 4, за да разбираме как посетителите взаимодействат със съдържанието и да подобряваме сайта. Данните се съхраняват до 14 месеца.
              </p>
            </div>

            {/* Actions */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1.5rem'
              }}
            >
              <button
                type="button"
                onClick={handleAcceptAll}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  borderRadius: '6px',
                  padding: '0.5rem 0.95rem',
                  color: 'rgba(255, 255, 255, 0.75)',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)'}
              >
                Приемам всички
              </button>

              <button
                type="button"
                onClick={handleSaveCustom}
                style={{
                  background: 'var(--gold-main)',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '0.5rem 1.25rem',
                  color: '#08080a',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'opacity 0.2s ease',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Запази избора
              </button>
            </div>

          </div>
        </div>
      )}

      <style>{`
        @keyframes cookieBannerFadeUp {
          from {
            opacity: 0;
            transform: translate(-50%, 15px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @media (max-width: 640px) {
          .cookie-banner-container {
            bottom: 0.75rem !important;
            padding: 1.15rem 1rem !important;
          }
          .cookie-banner-container button {
            flex: 1 1 auto !important;
            text-align: center !important;
          }
        }
      `}</style>
    </>
  );
}
