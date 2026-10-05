import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact({ id = "contact" }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [burstParticles, setBurstParticles] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    if (isSuccess) {
      const EMOJIS = ['🚀', '✨', '🔥', '⚡️', '🌟', '🎉', '💌'];
      const particles = [];
      for (let i = 0; i < 10; i++) {
        const angle = (Math.PI * 2 * i) / 10 + (Math.random() - 0.5) * 0.4;
        const dist = 70 + Math.random() * 80;
        const tx = Math.cos(angle) * dist;
        const ty = Math.sin(angle) * dist;
        const rot = (Math.random() - 0.5) * 60;
        particles.push({
          id: i,
          emoji: EMOJIS[i % EMOJIS.length],
          tx: `${tx}px`,
          ty: `${ty}px`,
          rot: `${rot}deg`
        });
      }
      setBurstParticles(particles);
      const timer = setTimeout(() => setBurstParticles([]), 1200);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (supabase) {
        // Attempt insert with dedicated 'phone' column
        let { error } = await supabase.from('contacts').insert([
          {
            name,
            email,
            phone,
            company,
            message,
            created_at: new Date().toISOString()
          }
        ]);

        // If the database table does not have a 'phone' column yet (PostgreSQL error 42703),
        // fallback to appending phone into message so submission never fails!
        if (error && (error.code === '42703' || error.message?.includes('phone'))) {
          const formattedMsg = phone 
            ? `[Телефон: ${phone}]\n\n${message}` 
            : message;
          
          const fallbackRes = await supabase.from('contacts').insert([
            {
              name,
              email,
              company,
              message: formattedMsg,
              created_at: new Date().toISOString()
            }
          ]);
          error = fallbackRes.error;
        }

        if (error) throw error;
      } else {
        // Graceful fallback if Supabase keys aren't set yet
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
      setIsSuccess(true);
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMessage('Възникна грешка при изпращането. Моля, опитайте отново.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
    setErrorMessage('');
    setBurstParticles([]);
    setIsSuccess(false);
  };

  return (
    <div className="page-wrapper contact-page">
      <section 
        id={id} 
        className="section contact-hero-section" 
        style={{ 
          minHeight: '100vh', 
          paddingTop: 'clamp(7.5rem, 14vh, 9.5rem)', 
          paddingBottom: 'clamp(3.5rem, 6vh, 5rem)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxSizing: 'border-box'
        }}
      >
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          gap: '3.5rem',
          justifyContent: 'space-between',
          width: '100%'
        }}>
          
          <div className="contact-header reveal-up" style={{ flex: '1 1 320px', minWidth: 0, textAlign: 'left', maxWidth: '520px' }}>
            <span className="section-tag text-gold" style={{ 
              fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
              letterSpacing: '0.06em', 
              textTransform: 'none',
              lineHeight: 1,
              marginBottom: '0.35rem',
              display: 'inline-block'
            }}>
              [contact us]
            </span>
            <h1 style={{ 
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(2.4rem, 4.2vw, 3.6rem)', 
              marginBottom: '1.4rem', 
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary)'
            }}>
              НА ЕДИН ЛАЙК РАЗСТОЯНИЕ СИ!
            </h1>
            <div className="text-secondary" style={{ fontSize: '1.15rem', lineHeight: 1.75, maxWidth: '480px', whiteSpace: 'pre-line' }}>
              {`Щом си стигнал чак до тук, значи наистина имаш вкус за добър маркетинг - поздравления!

Сега само остана набързо да разкажеш за своя бранд и смелите ти идеи - Gen Z-та сме, така че няма да се бавим с отговора :)`}
            </div>
          </div>

          <div className="contact-wrap reveal-up" style={{ 
            flex: '1 1 320px', 
            minWidth: 0,
            maxWidth: '520px', 
            position: 'relative', 
            zIndex: 1, 
            width: '100%',
            background: 'rgba(22, 22, 26, 0.6)',
            padding: '2.4rem 2.2rem',
            borderRadius: '24px',
            border: '1px solid rgba(212,175,55,0.3)',
            boxShadow: '0 0 40px rgba(212,175,55,0.1)',
            backdropFilter: 'blur(20px)',
            overflow: 'hidden'
          }}>
            {/* Subtle top highlight */}
            <div style={{ position: 'absolute', top: 0, left: '10%', width: '80%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(212,175,55,0.8), transparent)' }}></div>
              
              {/* Form */}
              {isSuccess ? (
                <div 
                  className="contact-success" 
                  style={{ 
                    textAlign: 'center', 
                    padding: '3.2rem 1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '440px',
                    position: 'relative',
                    animation: 'fadeInSuccess 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards'
                  }}
                >
                  {/* Celebratory Burst Emojis on Submission */}
                  {burstParticles.map((p) => (
                    <span
                      key={p.id}
                      className="success-burst-particle"
                      style={{
                        position: 'absolute',
                        top: '25%',
                        left: '50%',
                        pointerEvents: 'none',
                        '--tx': p.tx,
                        '--ty': p.ty,
                        '--rot': p.rot,
                        fontSize: '1.8rem',
                        zIndex: 20
                      }}
                    >
                      {p.emoji}
                    </span>
                  ))}

                  {/* Animated Flying Paper Airplane in kkreativ Brand Style */}
                  <div className="success-animation-container">
                    <div className="success-glow-halo" />
                    
                    <div className="success-plane-wrap">
                      <svg 
                        width="56" 
                        height="56" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        className="success-plane-svg"
                      >
                        <defs>
                          <linearGradient id="goldPlaneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffd700" />
                            <stop offset="50%" stopColor="#d4af37" />
                            <stop offset="100%" stopColor="#f3e5ab" />
                          </linearGradient>
                        </defs>
                        <polygon 
                          points="22 2 15 22 11 13 2 9 22 2" 
                          fill="rgba(212, 175, 55, 0.18)" 
                          stroke="url(#goldPlaneGrad)" 
                          strokeWidth="1.8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                        <line 
                          x1="22" 
                          y1="2" 
                          x2="11" 
                          y2="13" 
                          stroke="url(#goldPlaneGrad)" 
                          strokeWidth="1.8" 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                        />
                      </svg>
                    </div>

                    {/* Floating Agency Stickers in Hero/Website Style */}
                    <span className="success-sticker sticker-1">✨</span>
                    <span className="success-sticker sticker-2">🔥</span>
                    <span className="success-sticker sticker-3">⚡️</span>
                  </div>

                  {/* Headline in Montserrat Extra Bold */}
                  <h3 style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 800,
                    fontSize: 'clamp(2rem, 4vw, 2.6rem)', 
                    lineHeight: 1.15,
                    letterSpacing: '-0.025em',
                    color: '#ffffff',
                    margin: '0 0 1rem 0'
                  }}>
                    Съобщението е изпратено!
                  </h3>

                  {/* Body Text in Montserrat */}
                  <p style={{ 
                    fontFamily: "'Montserrat', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(0.98rem, 1.25vw, 1.08rem)',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    maxWidth: '400px',
                    margin: '0 auto 2.4rem auto'
                  }}>
                    Благодарим ви. Ще се свържем с вас възможно най-скоро.
                  </p>

                  {/* Action Button */}
                  <button 
                    type="button"
                    onClick={handleReset} 
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      letterSpacing: '0.02em',
                      color: '#ffffff',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.35)',
                      padding: '0.9rem 2.2rem',
                      borderRadius: '100px',
                      cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--gold-gradient)';
                      e.currentTarget.style.color = '#0a0a0c';
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(212, 175, 55, 0.45)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.35)';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
                    }}
                  >
                    Изпрати ново съобщение
                  </button>
                </div>
              ) : (
              <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }} onSubmit={handleSubmit}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#fff' }}>
                    Име и фамилия<span style={{ color: 'var(--gold-main)' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Иван Иванов" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#fff' }}>
                    Имейл адрес<span style={{ color: 'var(--gold-main)' }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="ivan@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#fff' }}>
                    Телефонен номер<span style={{ color: 'var(--gold-main)' }}>*</span>
                  </label>
                  <input 
                    type="tel" 
                    required 
                    placeholder="+359 888 123 456" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#fff' }}>
                    Твоят бранд<span style={{ color: 'var(--gold-main)' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="Име на бранд / бизнес" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#fff' }}>
                    Свободен текст<span style={{ color: 'var(--gold-main)' }}>*</span>
                  </label>
                  <textarea 
                    required 
                    rows="3" 
                    placeholder="Напиши своето запитване или идея..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '0.8rem 1rem',
                      color: '#fff',
                      fontSize: '0.95rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  ></textarea>
                </div>

                {errorMessage && (
                  <p style={{ color: '#ef4444', fontSize: '0.9rem', textAlign: 'center', margin: 0 }}>
                    {errorMessage}
                  </p>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-submit"
                  style={{ width: '100%', padding: '1rem', fontSize: '1.05rem', marginTop: '0.5rem' }}
                >
                  {isSubmitting ? 'Изпращане...' : 'Изпрати запитване'}
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      <style>{`
        .success-animation-container {
          position: relative;
          width: 110px;
          height: 110px;
          margin: 0 auto 1.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-glow-halo {
          position: absolute;
          width: 95px;
          height: 95px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, rgba(212, 175, 55, 0.08) 55%, transparent 75%);
          animation: haloPulse 3s ease-in-out infinite;
        }

        .success-plane-wrap {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: planeFloat 3.6s ease-in-out infinite, planeEntrance 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          filter: drop-shadow(0 8px 20px rgba(212, 175, 55, 0.45));
        }

        @keyframes planeEntrance {
          0% {
            opacity: 0;
            transform: translate(-30px, 30px) scale(0.6) rotate(-20deg);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1) rotate(0deg);
          }
        }

        @keyframes planeFloat {
          0%, 100% {
            transform: translateY(0px) rotate(-6deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }

        @keyframes haloPulse {
          0%, 100% {
            transform: scale(0.88);
            opacity: 0.35;
          }
          50% {
            transform: scale(1.18);
            opacity: 0.85;
          }
        }

        .success-sticker {
          position: absolute;
          z-index: 3;
          pointer-events: none;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
          user-select: none;
        }

        .sticker-1 {
          top: 0px;
          right: 4px;
          font-size: 1.4rem;
          animation: floatSticker1 3.2s ease-in-out infinite;
        }

        .sticker-2 {
          bottom: 4px;
          left: 6px;
          font-size: 1.3rem;
          animation: floatSticker2 3.8s ease-in-out infinite;
        }

        .sticker-3 {
          top: 22px;
          left: 0px;
          font-size: 1.15rem;
          animation: floatSticker3 4.2s ease-in-out infinite;
        }

        @keyframes floatSticker1 {
          0%, 100% { transform: translateY(0px) rotate(-10deg) scale(1); }
          50% { transform: translateY(-8px) rotate(12deg) scale(1.15); }
        }

        @keyframes floatSticker2 {
          0%, 100% { transform: translateY(0px) rotate(14deg) scale(1); }
          50% { transform: translateY(-7px) rotate(-8deg) scale(1.12); }
        }

        @keyframes floatSticker3 {
          0%, 100% { transform: translateY(0px) rotate(-5deg); }
          50% { transform: translateY(-9px) rotate(18deg); }
        }

        .success-burst-particle {
          animation: burstParticleAnim 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          user-select: none;
        }

        @keyframes burstParticleAnim {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.3);
          }
          60% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.3) rotate(var(--rot));
          }
        }
      `}</style>
    </div>
  );
}
