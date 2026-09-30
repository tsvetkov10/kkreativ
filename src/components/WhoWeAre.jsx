import React, { useState } from 'react';

const team = [
  {
    name: "Kaloyan Bachev",
    role: "Co-Founder",
    image: "/photos-of-owners/32.jpg",
    bio: `Калоян - оперативният мозък зад ккриейтив. Калоян е този, който ще измисли точно от кой ъгъл, с кой обектив и на каква светлина да се снима вашият кадър. При обработката вероятно ще отдели часове само за да измисли как видеото ви да бъде изпипано докрай.

Само не го питайте въпроси, че ще почне да отговаря със сложни думи и термини…`
  },
  {
    name: "Georgi Kozarev",
    role: "Co-Founder",
    image: "/photos-of-owners/38.jpg",
    bio: `Георги - стратегът зад kkreativ. Той е човекът зад концепциите, стратегиите и анализите, които движат проектите ни. Не разбира от камери, не работи с After Effects, но разбира от нещо по-важно - какво кара хората да спрат, да гледат, да харесат и да споделят.

През повечето време изглежда, сякаш не прави нищо. Но може би точно това е идеята - докато другите правят, той мисли.`
  }
];

export default function WhoWeAre() {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleFlip = (idx) => {
    setFlippedCards((prev) => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <section id="about-us" className="section" style={{ padding: '8rem 2rem', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Section Header */}
        <div className="section-header reveal-up">
          <span className="section-tag text-gold" style={{ 
            fontFamily: "var(--font-logo), 'Creating Minimalist', sans-serif",
            fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', 
            letterSpacing: '0.06em', 
            textTransform: 'none',
            lineHeight: 1,
            marginBottom: '0.35rem',
            display: 'inline-block'
          }}>
            [our story]
          </span>
          <h2 style={{ 
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)', 
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            margin: 0,
            color: 'var(--text-primary)'
          }}>
            ИМАЛО ЕДНО ВРЕМЕ…
          </h2>
        </div>

        <div className="team-cards-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '2.5rem',
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
              onClick={() => toggleFlip(idx)}
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
                  transform: flippedCards[idx] ? 'rotateY(180deg)' : 'rotateY(0deg)',
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
                      
                      {/* Flip Arrow Icon in Top Right Corner */}
                      <div 
                        className="card-flip-btn"
                        style={{
                          position: 'absolute',
                          top: '14px',
                          right: '14px',
                          width: '42px',
                          height: '42px',
                          borderRadius: '50%',
                          background: 'rgba(10, 10, 15, 0.75)',
                          backdropFilter: 'blur(12px)',
                          WebkitBackdropFilter: 'blur(12px)',
                          border: '1px solid rgba(212, 175, 55, 0.45)',
                          color: 'var(--gold-main, #ffd700)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
                          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                          pointerEvents: 'none'
                        }}
                      >
                        <svg 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                          <path d="M21 3v5h-5" />
                        </svg>
                      </div>
                    </div>
                    <h3 style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.9rem', 
                      marginBottom: '0.5rem', 
                      textAlign: 'center',
                      letterSpacing: '-0.01em',
                      color: 'var(--text-primary)'
                    }}>
                      {member.name}
                    </h3>
                    <p className="font-mono text-gold" style={{ fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                      {member.role}
                    </p>
                  </div>

                  {/* BACK FACE */}
                  <div 
                    className="team-card-back"
                    style={{
                      backfaceVisibility: 'hidden',
                      position: 'absolute',
                      top: 0, 
                      left: 0, 
                      width: '100%', 
                      height: '100%',
                      transform: 'rotateY(180deg)',
                      background: 'linear-gradient(145deg, rgba(20,20,25,0.95) 0%, rgba(10,10,12,0.98) 100%)',
                      border: '1px solid rgba(212,175,55,0.4)',
                      borderRadius: '24px',
                      padding: '2.4rem 1.6rem 1.8rem',
                      backdropFilter: 'blur(20px)',
                      WebkitBackdropFilter: 'blur(20px)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      boxSizing: 'border-box',
                      overflowY: 'auto'
                    }}
                  >
                    {/* Flip Back Arrow Icon in Top Right Corner */}
                    <div 
                      className="card-flip-btn"
                      style={{
                        position: 'absolute',
                        top: '14px',
                        right: '14px',
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: 'rgba(10, 10, 15, 0.75)',
                        backdropFilter: 'blur(12px)',
                        WebkitBackdropFilter: 'blur(12px)',
                        border: '1px solid rgba(212, 175, 55, 0.45)',
                        color: 'var(--gold-main, #ffd700)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 18px rgba(0, 0, 0, 0.5)',
                        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                        pointerEvents: 'none',
                        zIndex: 2
                      }}
                    >
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2.5" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                        <path d="M21 3v5h-5" />
                      </svg>
                    </div>

                    <h3 style={{ 
                      fontFamily: "'Montserrat', sans-serif",
                      fontWeight: 800,
                      fontSize: '1.55rem', 
                      marginBottom: '0.45rem',
                      color: 'var(--gold-main, #ffd700)',
                      letterSpacing: '-0.01em',
                      width: '100%',
                      padding: '0 1.2rem',
                      boxSizing: 'border-box'
                    }}>
                      {member.name}
                    </h3>
                    <div style={{ width: '36px', height: '2px', background: 'var(--gold-gradient)', marginBottom: '0.85rem' }}></div>
                    <p 
                      style={{ 
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: '0.88rem', 
                        fontWeight: 700,
                        lineHeight: 1.55, 
                        color: 'var(--text-primary)',
                        whiteSpace: 'pre-line', 
                        maxWidth: '340px',
                        margin: 0
                      }}
                    >
                      {member.bio}
                    </p>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .team-card-back {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .team-card-back::-webkit-scrollbar {
          display: none;
        }
        .team-card:hover .card-flip-btn {
          background: rgba(212, 175, 55, 0.3) !important;
          border-color: var(--gold-main, #ffd700) !important;
          box-shadow: 0 0 22px rgba(212, 175, 55, 0.45) !important;
          transform: scale(1.1) rotate(15deg);
        }
        @media (max-width: 768px) {
          #about-us {
            padding: 4.5rem 1rem !important;
          }
          .team-cards-grid {
            gap: 2rem !important;
          }
          .team-card {
            max-width: 340px;
            margin: 0 auto;
            width: 100%;
          }
          .team-card-back {
            padding: 2.2rem 1.4rem 1.8rem !important;
          }
          .team-card-back h3 {
            font-size: 1.4rem !important;
            margin-bottom: 0.35rem !important;
          }
          .team-card-back p {
            font-size: 0.84rem !important;
            line-height: 1.5 !important;
          }
        }
      `}</style>
    </section>
  );
}
