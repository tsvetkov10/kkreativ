export default function Hero() {
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content container">
        <div className="hero-title-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
          <div className="hero-emoji hero-emoji-left">🎬</div>
          <div className="hero-emoji hero-emoji-right">🔥</div>

          <h1 
            className="hero-title delay-1"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
              margin: 0
            }}
          >
            <span className="hero-title-line">GEN Z MARKETING,</span>
            <span className="hero-title-line gradient-text">КОЙТО РАБОТИ.</span>
          </h1>
        </div>
      </div>
    </section>
  );
}
