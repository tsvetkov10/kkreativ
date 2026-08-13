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
      <div className="hero-content container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', justifyContent: 'center', width: '100%' }}>
        <div className="hero-emoji hero-emoji-left">✨</div>
        <div className="hero-emoji hero-emoji-right">🔥</div>

        <h1 className="hero-title delay-1">
          ОФОРМЯМЕ<br />
          <span className="gradient-text">ДРЪЗКИ ИДЕИ</span><br />
          В РЕАЛНОСТ.
        </h1>
      </div>
    </section>
  );
}
