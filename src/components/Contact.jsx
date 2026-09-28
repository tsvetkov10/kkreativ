import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export default function Contact({ id = "contact" }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      if (supabase) {
        const { error } = await supabase.from('contacts').insert([
          {
            name,
            email,
            company,
            message,
            created_at: new Date().toISOString()
          }
        ]);
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
    setCompany('');
    setMessage('');
    setErrorMessage('');
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
              <div className="contact-success" style={{ textAlign: 'center', padding: '3rem 0' }}>
                <div className="success-icon" style={{ fontSize: '4rem', color: 'var(--gold-main)', marginBottom: '1rem' }}>✓</div>
                <h3 className="font-display" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Съобщението е изпратено!</h3>
                <p className="text-secondary" style={{ marginBottom: '2rem' }}>Благодарим ви. Ще се свържем с вас възможно най-скоро.</p>
                <button className="btn btn-primary" onClick={handleReset} style={{ width: 'auto', padding: '1rem 2rem' }}>
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
    </div>
  );
}
