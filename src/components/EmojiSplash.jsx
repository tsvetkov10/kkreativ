import React, { useState, useEffect } from 'react';

const EMOJIS = ['✨', '🚀', '🔥', '💡', '💻', '📈', '⚡️', '🌟', '🎨'];

export default function EmojiSplash() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleClick = (e) => {
      // Don't trigger if they clicked on a link or button
      if (e.target.closest('a') || e.target.closest('button')) {
        return;
      }

      const newParticles = [];
      const numParticles = Math.floor(Math.random() * 4) + 4; // 4 to 7 particles

      for (let i = 0; i < numParticles; i++) {
        // Randomize angle and distance for explosion effect
        const angle = Math.random() * Math.PI * 2;
        const velocity = 50 + Math.random() * 80;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rot = (Math.random() - 0.5) * 360; // Random rotation

        newParticles.push({
          id: Date.now() + i,
          x: e.clientX,
          y: e.clientY,
          emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
          tx: `${tx}px`,
          ty: `${ty}px`,
          rot: `${rot}deg`
        });
      }

      setParticles((prev) => [...prev, ...newParticles]);

      // Remove these particles after animation completes (800ms)
      setTimeout(() => {
        setParticles((prev) => prev.filter(p => !newParticles.find(np => np.id === p.id)));
      }, 800);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 99999 }}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="emoji-particle"
          style={{
            left: p.x,
            top: p.y,
            '--tx': p.tx,
            '--ty': p.ty,
            '--rot': p.rot
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
