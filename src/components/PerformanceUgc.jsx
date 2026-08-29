import React from 'react';

export default function PerformanceUgc() {
  return (
    <section className="section" style={{ padding: '8rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center'
        }}>
          
          {/* Left Column - Visual */}
          <div className="reveal-scale" style={{ position: 'relative', display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            
            {/* UGC Image container */}
            <div style={{ 
              position: 'relative', 
              zIndex: 1, 
              width: '100%', 
              maxWidth: '360px', 
              aspectRatio: '9/16', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}>
              <img 
                src="/ugc_placeholder.jpg" 
                alt="UGC Video Thumbnail" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>

            {/* Top Left Floating Stats Box */}
            <div className="floating-box-anim top-left-box" style={{
              position: 'absolute',
              top: '15%',
              left: '-15%',
              zIndex: 2,
              background: 'linear-gradient(145deg, rgba(20,20,25,0.85) 0%, rgba(10,10,12,0.95) 100%)',
              backdropFilter: 'blur(15px)',
              padding: '1.2rem 1.8rem',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)'
            }}>
              <h3 className="font-display gradient-text" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
                200%
              </h3>
              <p className="font-mono text-gold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Organic Growth
              </p>
            </div>

            {/* Bottom Right Floating Stats Box */}
            <div className="floating-box-anim bottom-right-box" style={{
              position: 'absolute',
              bottom: '15%',
              right: '-15%',
              zIndex: 2,
              animationDelay: '1.5s', // Offset animation
              background: 'linear-gradient(145deg, rgba(20,20,25,0.85) 0%, rgba(10,10,12,0.95) 100%)',
              backdropFilter: 'blur(15px)',
              padding: '1.2rem 1.8rem',
              borderRadius: '16px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 20px rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)'
            }}>
              <h3 className="font-display gradient-text" style={{ fontSize: '2rem', marginBottom: '0.2rem' }}>
                5x
              </h3>
              <p className="font-mono text-gold" style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Higher Engagement
              </p>
            </div>

          </div>

          {/* Right Column - Text */}
          <div className="reveal-up" style={{ paddingLeft: '2rem' }}>
            <h2 className="font-display" style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              lineHeight: 1.1, 
              marginBottom: '2rem' 
            }}>
              Performance-driven <span style={{ color: '#ff85e8' }}>UGC</span> that delivers results
            </h2>
            <p className="text-secondary" style={{ fontSize: '1.2rem', lineHeight: 1.8, maxWidth: '500px' }}>
              Our UGC strategy is grounded in real performance data. We design, test, and refine creative so every piece contributes to growth you can actually measure.
            </p>
          </div>

        </div>

      </div>

      {/* Mobile Styles override inline grid */}
      <style>{`
        @media (max-width: 900px) {
          .section .container > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .section .container > div > div:last-child {
            padding-left: 0 !important;
          }
          .section .container > div > div:last-child h2 {
            font-size: 2.5rem !important;
          }
          .section .container > div > div:last-child p {
            margin: 0 auto;
          }
          .top-left-box {
            left: 0 !important;
            top: 5% !important;
            padding: 1rem 1.5rem !important;
          }
          .bottom-right-box {
            right: 0 !important;
            bottom: 5% !important;
            padding: 1rem 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
