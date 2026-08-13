import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIsSuccess(false);
  };

  return (
    <div className="page-wrapper contact-page">
      <section className="section contact-hero-section" style={{ paddingTop: '8rem', paddingBottom: '4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          display: 'flex', 
          flexWrap: 'wrap', 
          alignItems: 'center', 
          gap: '4rem',
          justifyContent: 'space-between'
        }}>
          
          <div className="contact-header reveal-up" style={{ flex: '1 1 400px', textAlign: 'left', maxWidth: '500px' }}>
            <span className="section-tag font-mono text-gold" style={{ justifyContent: 'flex-start' }}>/ СТАРТИРАЙ ПРОЕКТ</span>
            <h1 className="font-display" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              НЕКА ИЗГРАДИМ НЕЩО <br />
              <span className="gradient-text">НЕВЕРОЯТНО.</span>
            </h1>
            <p className="text-secondary" style={{ fontSize: '1.2rem', lineHeight: 1.6 }}>
              Разкажете ни за вашите смели идеи и нека ги превърнем в значимо дигитално изживяване, което носи реални резултати.
            </p>
          </div>

          <div className="contact-wrap reveal-up" style={{ 
            flex: '1 1 100%', 
            maxWidth: '500px',
            position: 'relative', 
            zIndex: 1, 
            width: '100%',
            background: 'transparent',
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
              <form className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} onSubmit={handleSubmit}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Full name<span style={{ color: '#ff4d4d' }}>*</span>
                  </label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Jane Smith" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Email Address<span style={{ color: '#ff4d4d' }}>*</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    placeholder="jane@framer.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Company Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Seturn Studio" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'inherit'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem', color: '#fff' }}>
                    Message
                  </label>
                  <textarea 
                    required 
                    rows="4" 
                    placeholder="Massage or Inquiry" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
                      padding: '1rem',
                      color: '#fff',
                      fontSize: '1rem',
                      outline: 'none',
                      fontFamily: 'inherit',
                      resize: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.05)'}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn btn-submit"
                  style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem', marginTop: '1rem' }}
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
