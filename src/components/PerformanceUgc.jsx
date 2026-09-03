import React from 'react';

const ugcSections = [
  {
    id: 'ugc-performance',
    reversed: false,
    image: '/ugc_placeholder.jpg',
    alt: 'Beauty & Skincare UGC Video Review',
    title: (
      <>
        Performance-driven <span style={{ color: '#ff85e8' }}>UGC</span> that delivers results
      </>
    ),
    description:
      'Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure.',
    box1: {
      value: '200%',
      label: 'Organic Growth',
      position: { top: '12%', left: '-12%', right: 'auto', bottom: 'auto' },
      className: 'ugc-box-left'
    },
    box2: {
      value: '5x',
      label: 'Higher Engagement',
      position: { bottom: '14%', right: '-12%', top: 'auto', left: 'auto' },
      className: 'ugc-box-right'
    }
  },
  {
    id: 'ugc-viral-hooks',
    reversed: true,
    image: '/ugc_tech.jpg',
    alt: 'Consumer Tech UGC Video Review',
    title: (
      <>
        Scroll-stopping hooks that spark <span style={{ color: '#ffd700' }}>virality</span>
      </>
    ),
    description:
      'We craft high-impact hooks and native pacing that halt the scroll within the first 2 seconds, turning passive social feeds into an influx of qualified, high-intent traffic.',
    box1: {
      value: '10M+',
      label: 'Total Impressions',
      position: { top: '14%', right: '-12%', left: 'auto', bottom: 'auto' },
      className: 'ugc-box-right'
    },
    box2: {
      value: '+340%',
      label: 'Click-Through Rate',
      position: { bottom: '12%', left: '-12%', top: 'auto', right: 'auto' },
      className: 'ugc-box-left'
    }
  },
  {
    id: 'ugc-conversion',
    reversed: false,
    image: '/ugc_fitness.jpg',
    alt: 'Fitness & Health UGC Video Review',
    title: (
      <>
        Direct-response creative built to <span style={{ color: '#00f2fe' }}>convert</span>
      </>
    ),
    description:
      'Every angle, benefit demonstration, and call-to-action is engineered for direct conversion. We systematically test and scale winning variations to maximize your return on ad spend.',
    box1: {
      value: '3.8x',
      label: 'ROAS Increase',
      position: { top: '10%', left: '-12%', right: 'auto', bottom: 'auto' },
      className: 'ugc-box-left'
    },
    box2: {
      value: '85%',
      label: 'Retention Rate',
      position: { bottom: '16%', right: '-12%', top: 'auto', left: 'auto' },
      className: 'ugc-box-right'
    }
  },
  {
    id: 'ugc-trust-community',
    reversed: true,
    image: '/ugc_lifestyle.jpg',
    alt: 'Lifestyle & Fragrance UGC Video Review',
    title: (
      <>
        Authentic creator stories that build <span style={{ color: '#ff85e8' }}>trust</span>
      </>
    ),
    description:
      "Audiences don't buy corporate pitches—they buy recommendations from people they relate to. We match your brand with vetted creators who highlight your value proposition authentically.",
    box1: {
      value: '98%',
      label: 'Client Satisfaction',
      position: { top: '18%', right: '-12%', left: 'auto', bottom: 'auto' },
      className: 'ugc-box-right'
    },
    box2: {
      value: '4.5x',
      label: 'Conversion Lift',
      position: { bottom: '10%', left: '-12%', top: 'auto', right: 'auto' },
      className: 'ugc-box-left'
    }
  }
];

export default function PerformanceUgc() {
  const sharedBoxStyle = {
    position: 'absolute',
    zIndex: 2,
    background: 'linear-gradient(145deg, rgba(20,20,25,0.85) 0%, rgba(10,10,12,0.95) 100%)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    padding: '1.2rem 1.8rem',
    borderRadius: '16px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
    border: '1px solid rgba(212,175,55,0.3)',
    pointerEvents: 'none',
    minWidth: '160px'
  };

  return (
    <div className="ugc-showcase-wrapper">
      {ugcSections.map((section, index) => (
        <section
          key={section.id}
          id={section.id}
          className="section ugc-section"
          style={{
            padding: index === 0 ? '7rem 2rem 5rem' : '5rem 2rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div
              className={`ugc-grid ${section.reversed ? 'reversed' : ''}`}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4rem',
                alignItems: 'center'
              }}
            >
              {/* Visual Column */}
              <div
                className="reveal-scale ugc-visual-col"
                style={{
                  position: 'relative',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '2rem',
                  order: section.reversed ? 2 : 1
                }}
              >
                {/* UGC Image container */}
                <div
                  className="ugc-card-frame"
                  style={{
                    position: 'relative',
                    zIndex: 1,
                    width: '100%',
                    maxWidth: '360px',
                    aspectRatio: '9/16',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  <img
                    src={section.image}
                    alt={section.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>

                {/* Floating Stats Box 1 */}
                <div
                  className={`floating-box-anim ugc-stat-box ${section.box1.className}`}
                  style={{
                    ...sharedBoxStyle,
                    ...section.box1.position
                  }}
                >
                  <h3
                    className="font-display gradient-text"
                    style={{ fontSize: '2rem', marginBottom: '0.2rem' }}
                  >
                    {section.box1.value}
                  </h3>
                  <p
                    className="font-mono text-gold"
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {section.box1.label}
                  </p>
                </div>

                {/* Floating Stats Box 2 */}
                <div
                  className={`floating-box-anim ugc-stat-box ${section.box2.className}`}
                  style={{
                    ...sharedBoxStyle,
                    animationDelay: '2.5s',
                    ...section.box2.position
                  }}
                >
                  <h3
                    className="font-display gradient-text"
                    style={{ fontSize: '2rem', marginBottom: '0.2rem' }}
                  >
                    {section.box2.value}
                  </h3>
                  <p
                    className="font-mono text-gold"
                    style={{
                      fontSize: '0.8rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em'
                    }}
                  >
                    {section.box2.label}
                  </p>
                </div>
              </div>

              {/* Text Column */}
              <div
                className="reveal-up ugc-text-col"
                style={{
                  paddingLeft: section.reversed ? '0' : '2rem',
                  paddingRight: section.reversed ? '2rem' : '0',
                  order: section.reversed ? 1 : 2
                }}
              >
                <h2
                  className="font-display"
                  style={{
                    fontSize: 'clamp(2.6rem, 4.5vw, 4.2rem)',
                    lineHeight: 1.15,
                    marginBottom: '1.8rem'
                  }}
                >
                  {section.title}
                </h2>
                <p
                  className="text-secondary"
                  style={{
                    fontSize: '1.2rem',
                    lineHeight: 1.8,
                    maxWidth: '500px'
                  }}
                >
                  {section.description}
                </p>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Embedded styles for responsive scaling, hover interactions, and mobile stacking */}
      <style>{`
        .ugc-card-frame:hover {
          transform: translateY(-6px);
          box-shadow: 0 40px 80px rgba(0,0,0,0.6), 0 0 25px rgba(212,175,55,0.15) !important;
        }
        .ugc-card-frame:hover img {
          transform: scale(1.04);
        }
        @media (max-width: 900px) {
          .ugc-section {
            padding: 4rem 1.5rem !important;
          }
          .ugc-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            text-align: center;
          }
          .ugc-visual-col {
            order: 1 !important;
            padding: 1.5rem 0.5rem !important;
          }
          .ugc-text-col {
            order: 2 !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
          .ugc-text-col h2 {
            font-size: 2.3rem !important;
          }
          .ugc-text-col p {
            margin: 0 auto !important;
          }
          .ugc-box-left {
            left: 0 !important;
            right: auto !important;
            top: 5% !important;
            bottom: auto !important;
            padding: 0.9rem 1.4rem !important;
            min-width: 140px !important;
          }
          .ugc-box-right {
            right: 0 !important;
            left: auto !important;
            bottom: 5% !important;
            top: auto !important;
            padding: 0.9rem 1.4rem !important;
            min-width: 140px !important;
          }
        }
      `}</style>
    </div>
  );
}
