import React from 'react';

export default function Mission() {
  return (
    <section 
      style={{
        backgroundColor: '#f4f4f4',
        padding: '10rem 2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <div 
        style={{
          backgroundColor: '#ffb3d9', // Pink pill
          color: '#111',
          padding: '0.4rem 1.2rem',
          borderRadius: '9999px',
          fontSize: '0.8rem',
          fontWeight: '700',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '2.5rem',
          fontFamily: 'var(--font-sans)',
        }}
      >
        OUR MISSION
      </div>
      
      <h2 
        style={{
          color: '#111',
          fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
          fontWeight: '700',
          lineHeight: '1.1',
          letterSpacing: '-0.03em',
          maxWidth: '1100px',
          margin: 0,
          fontFamily: 'var(--font-sans)' // Using the sans font to match the clean look in screenshot
        }}
      >
        We made social media into a consistent, high-performing growth channel.
      </h2>
    </section>
  );
}
