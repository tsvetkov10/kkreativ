import React, { useState } from 'react';

const team = [
  {
    name: "Kaloyan Bachev",
    role: "Co-Founder",
    image: "/kaloyan.jpg",
    bio: "As a creative visionary, Kaloyan leads our design and branding initiatives, turning bold concepts into stunning visual realities that captivate audiences."
  },
  {
    name: "Georgi Kozarev",
    role: "Co-Founder",
    image: "/georgi.jpg",
    bio: "With a sharp focus on data-driven growth, Georgi engineers the strategies that transform attention into measurable business results and loyal customers."
  }
];

export default function WhoWeAre() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  return (
    <section className="section" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div id="about-us" className="reveal-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-tag font-mono text-gold" style={{ justifyContent: 'center' }}>/ THE TEAM</span>
          <h2 className="font-display" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', marginTop: '1rem' }}>
            WHO WE <span className="gradient-text">ARE.</span>
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          maxWidth: '900px',
          margin: '0 auto'
        }}>
          {team.map((member, idx) => (
            <div 
              key={idx} 
              className="team-card reveal-up"
              style={{
                perspective: '1000px',
                transitionDelay: `${idx * 150}ms`,
                cursor: 'pointer'
              }}
              onClick={() => setFlippedIndex(flippedIndex === idx ? null : idx)}
            >
              <div 
                style={{
                  transition: 'transform 0.4s ease',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                  transformStyle: 'preserve-3d',
                  transform: flippedIndex === idx ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}>
                  
                  {/* FRONT FACE */}
                  <div style={{
                    backfaceVisibility: 'hidden',
                    background: 'linear-gradient(145deg, rgba(20,20,25,0.4) 0%, rgba(10,10,12,0.6) 100%)',
                    border: '1px solid rgba(212,175,55,0.15)',
                    borderRadius: '24px',
                    padding: '1.5rem',
                    backdropFilter: 'blur(10px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: '100%'
                  }}>
                    <div style={{
                      width: '100%',
                      aspectRatio: '3/4',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      marginBottom: '1.5rem',
                      position: 'relative'
                    }}>
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.6s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                    <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>
                      {member.name}
                    </h3>
                    <p className="font-mono text-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {member.role}
                    </p>
                  </div>

                  {/* BACK FACE */}
                  <div style={{
                    backfaceVisibility: 'hidden',
                    position: 'absolute',
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%',
                    transform: 'rotateY(180deg)',
                    background: 'linear-gradient(145deg, rgba(20,20,25,0.9) 0%, rgba(10,10,12,0.95) 100%)',
                    border: '1px solid rgba(212,175,55,0.4)',
                    borderRadius: '24px',
                    padding: '2rem',
                    backdropFilter: 'blur(20px)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                  }}>
                    <h3 className="font-display text-gold" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
                      {member.name}
                    </h3>
                    <div style={{ width: '40px', height: '2px', background: 'var(--gold-gradient)', marginBottom: '1.5rem' }}></div>
                    <p className="text-secondary" style={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                      {member.bio}
                    </p>
                    <p className="font-mono text-gold" style={{ fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginTop: '2rem', opacity: 0.6 }}>
                      Click to flip back
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
