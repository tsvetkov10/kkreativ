import { useState } from 'react';

export default function WallOfLove() {
  const [expandedId, setExpandedId] = useState('AA');

  const testimonials = [
    {
      id: 'AA',
      initials: 'AA',
      label: 'AD STUDIO',
      quote: '"Professional, creative, and reliable. Setrun delivered a user-friendly design that improved our customer experience significantly."',
      authorName: 'Michael Carter',
      authorRole: 'Product Manager, TechNova'
    },
    {
      id: 'KS',
      initials: 'KS',
      label: 'KREATIVE',
      quote: '"The attention to detail and innovative approach exceeded our expectations. Truly a boutique experience."',
      authorName: 'Sarah Jenkins',
      authorRole: 'CEO, Kreative Studio'
    },
    {
      id: 'TN',
      initials: 'TN',
      label: 'TECHNOVA',
      quote: '"Fast, responsive, and visually stunning. The team transformed our brand identity completely."',
      authorName: 'David Chen',
      authorRole: 'Marketing Director'
    }
  ];

  return (
    <section className="section wall-love-section" id="wall-of-love">
      <div className="container">
        
        {/* Header Block */}
        <div className="testimonial-header reveal-up">
          <span className="testimonial-tag font-mono">TESTIMONIAL</span>
          <h2 className="testimonial-title">
            Бизнеси, които ни се довериха
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="testimonial-grid">
          
          {/* Card 1: Main Graphic Panel */}
          <div className="testimonial-card portrait-card reveal-scale graphic-card">
            <div className="card-editorial-bg">
              <div className="editorial-circle"></div>
              <div className="editorial-title font-display">TRUST</div>
              <div className="editorial-subtitle font-mono">:: CREATED WITH PASSION</div>
            </div>
          </div>

          {/* Card 2 & 3: The expandable accordion */}
          <div className="narrow-portraits-wrap reveal-scale" style={{ gridColumn: 'span 2', width: '100%', display: 'flex', gap: '1.5rem' }}>
            {testimonials.map((testi) => {
              const isExpanded = expandedId === testi.id;
              return (
                <div 
                  key={testi.id}
                  className={`narrow-portrait initial-badge-card accordion-card ${isExpanded ? 'expanded' : ''}`}
                  onClick={() => setExpandedId(testi.id)}
                >
                  {isExpanded ? (
                    <div className="testimonial-card quote-card accordion-quote-card" style={{ height: '100%', width: '100%' }}>
                      <div className="quote-logo font-mono">:: ghost</div>
                      <p className="quote-text">{testi.quote}</p>
                      <div className="quote-author">
                        <span className="author-name">{testi.authorName}</span>
                        <span className="author-role">{testi.authorRole}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="collapsed-view">
                      <div className="initial-avatar">{testi.initials}</div>
                      <span className="initial-label font-mono">{testi.label}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
