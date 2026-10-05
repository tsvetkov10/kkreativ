import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function CookieBanner() {
  const [bannerVisible, setBannerVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(false);

  useEffect(() => {
    // Check if consent has already been registered
    const storedConsent = localStorage.getItem('kk_cookie_consent');
    const storedAnalytics = localStorage.getItem('kk_analytics_consent');

    if (storedConsent === null) {
      // Delay showing the banner slightly for smoother entrance after preloader
      const timer = setTimeout(() => {
        setBannerVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    } else {
      setAnalyticsConsent(storedAnalytics === 'true');
    }
  }, []);

  // Listen for custom event to reopen preferences modal from Footer or Cookie Policy page
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

  // Sync with Google Consent Mode if available on the page
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
      {/* 1. Cookie Notification Banner */}
      {bannerVisible && !modalOpen && (
        <div 
          className="cookie-banner-container"
          role="region"
          aria-label="Известие за бисквитки"
          style={{
            position: 'fixed',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'calc(100% - 2rem)',
            maxWidth: '920px',
            zIndex: 9995,
            background: 'rgba(10, 10, 14, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 55, 0.25)',
            boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.85), 0 0 30px rgba(212, 175, 55, 0.08)',
            borderRadius: '16px',
            padding: '1.4rem 1.6rem',
            color: '#fff',
            animation: 'cookieBannerFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Top row: Title and Badge */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>🍪</span>
                <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 600, letterSpacing: '0.01em', color: '#fff' }}>
                  Ние използваме бисквитки
                </h4>
              </div>
              <span 
                className="font-mono"
                style={{ 
                  fontSize: '0.72rem', 
                  color: 'var(--gold-main)', 
                  letterSpacing: '0.08em', 
                  textTransform: 'uppercase',
                  background: 'rgba(212, 175, 55, 0.1)',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '20px',
                  border: '1px solid rgba(212, 175, 55, 0.2)'
                }}
              >
                GDPR & ePrivacy
              </span>
            </div>

            {/* Banner description text */}
            <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.78)' }}>
              Използваме необходими бисквитки за работата на сайта и, с Ваше съгласие, аналитични бисквитки, за да го подобряваме. Можете да приемете, откажете или промените избора си по всяко време.
            </p>

            {/* Actions and Links row */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                flexWrap: 'wrap', 
                gap: '1rem',
                paddingTop: '0.35rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {/* Policy links */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.82rem', flexWrap: 'wrap' }}>
                <Link 
                  to="/cookies" 
                  style={{ color: 'var(--gold-main)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Политика за бисквитките
                </Link>
                <span style={{ color: 'rgba(255, 255, 255, 0.3)' }}>·</span>
                <Link 
                  to="/privacy" 
                  style={{ color: 'var(--gold-main)', textDecoration: 'none', transition: 'opacity 0.2s' }}
                  onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
                  onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
                >
                  Политика за поверителност
                </Link>
              </div>

              {/* Action buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.55rem 1.1rem',
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.5)';
                    e.currentTarget.style.color = 'var(--gold-main)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                    e.currentTarget.style.color = '#fff';
                  }}
                >
                  Настройки
                </button>

                <button
                  type="button"
                  onClick={handleRejectAll}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    padding: '0.55rem 1.1rem',
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  Отказвам незадължителните
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #b89728 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.55rem 1.25rem',
                    color: '#08080a',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-1px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.45)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
                  }}
                >
                  Приемам всички
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Cookie Preferences Modal */}
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
            background: 'rgba(4, 4, 6, 0.8)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            animation: 'cookieModalOverlayFade 0.25s ease forwards'
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setModalOpen(false);
          }}
        >
          <div 
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#0c0c10',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              borderRadius: '18px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(212, 175, 55, 0.1)',
              padding: '2rem',
              color: '#fff',
              animation: 'cookieModalCardPop 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1.25rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '1.3rem', lineHeight: 1 }}>⚙️</span>
                  <h3 id="cookie-modal-title" style={{ margin: 0, fontSize: '1.35rem', fontWeight: 600, color: '#fff' }}>
                    Настройки за бисквитки
                  </h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.65)' }}>
                  Управлявайте вашите предпочитания за поверителност. Можете да промените избора си по всяко време.
                </p>
              </div>

              <button 
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Затвори"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  lineHeight: 1,
                  transition: 'all 0.2s ease',
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)';
                }}
              >
                ✕
              </button>
            </div>

            {/* Cookie Categories */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              
              {/* Category 1: Strictly Necessary */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#fff' }}>
                      Строго необходими технологии
                    </h4>
                  </div>
                  <span 
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: 'var(--gold-main)',
                      background: 'rgba(212, 175, 55, 0.12)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '20px',
                      border: '1px solid rgba(212, 175, 55, 0.25)'
                    }}
                  >
                    Винаги активни
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.68)' }}>
                  Тези технологии са необходими за основното функциониране, сигурността или запомнянето на Вашия избор относно поверителността. Те могат да бъдат активни без предварително съгласие съгласно закона.
                </p>
              </div>

              {/* Category 2: Analytics Technologies */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: '#fff' }}>
                    Аналитични технологии (Google Analytics 4)
                  </h4>
                  
                  {/* Custom Toggle Switch */}
                  <label 
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      width: '46px',
                      height: '24px',
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
                        transition: '0.3s ease',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)'
                      }}
                    >
                      <span 
                        style={{
                          position: 'absolute',
                          content: '""',
                          height: '18px',
                          width: '18px',
                          left: analyticsConsent ? '25px' : '3px',
                          bottom: '2px',
                          backgroundColor: analyticsConsent ? '#08080a' : '#fff',
                          transition: '0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          borderRadius: '50%'
                        }}
                      />
                    </span>
                  </label>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.68)' }}>
                  С Ваше предварително съгласие използваме Google Analytics 4, за да получаваме статистическа информация за посещенията и взаимодействието със съдържанието с цел подобряване на сайта. Срок на съхранение: 14 месеца.
                </p>
              </div>

              {/* Category 3: Marketing Technologies */}
              <div 
                style={{
                  background: 'rgba(255, 255, 255, 0.015)',
                  border: '1px solid rgba(255, 255, 255, 0.04)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  opacity: 0.8
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)' }}>
                    Маркетингови технологии (Pixel)
                  </h4>
                  <span 
                    style={{
                      fontSize: '0.74rem',
                      color: 'rgba(255, 255, 255, 0.5)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '20px'
                    }}
                  >
                    Не се използват
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.85rem', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.5)' }}>
                  Към момента не използваме Meta Pixel, TikTok Pixel или други рекламни проследяващи технологии. Връзките към нашите социални мрежи са обикновени линкове.
                </p>
              </div>

            </div>

            {/* Modal Actions */}
            <div 
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={handleRejectAll}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: '8px',
                    padding: '0.6rem 1.1rem',
                    color: '#fff',
                    fontSize: '0.86rem',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                >
                  Отказвам незадължителните
                </button>

                <button
                  type="button"
                  onClick={handleAcceptAll}
                  style={{
                    background: 'rgba(212, 175, 55, 0.15)',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '8px',
                    padding: '0.6rem 1.1rem',
                    color: 'var(--gold-main)',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.25)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)'}
                >
                  Приемам всички
                </button>
              </div>

              <button
                type="button"
                onClick={handleSaveCustom}
                style={{
                  background: 'linear-gradient(135deg, #d4af37 0%, #b89728 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '0.6rem 1.4rem',
                  color: '#08080a',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                  fontFamily: 'inherit'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.3)';
                }}
              >
                Запази настройките
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Embedded Animation Styles */}
      <style>{`
        @keyframes cookieBannerFadeUp {
          from {
            opacity: 0;
            transform: translate(-50%, 25px);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        @keyframes cookieModalOverlayFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cookieModalCardPop {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @media (max-width: 640px) {
          .cookie-banner-container {
            bottom: 0.75rem !important;
            padding: 1.15rem 1rem !important;
            border-radius: 14px !important;
          }
          .cookie-banner-container button {
            flex: 1 1 auto !important;
            text-align: center !important;
            padding: 0.65rem 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
}
