export default function VideoResults() {
  const videos = [
    { bg: 'linear-gradient(180deg, #1f1235 0%, #10081e 100%)', title: 'Beauty' },
    { bg: 'linear-gradient(180deg, #2b1d1d 0%, #150d0d 100%)', title: 'Skincare' },
    { bg: 'linear-gradient(180deg, #132535 0%, #09121b 100%)', title: 'Fashion' },
    { bg: 'linear-gradient(180deg, #3a2e1d 0%, #1a150d 100%)', title: 'Product' },
    { bg: 'linear-gradient(180deg, #1d3a2e 0%, #0d1a15 100%)', title: 'Vlog' },
    { bg: 'linear-gradient(180deg, #351325 0%, #1b0912 100%)', title: 'Lifestyle' }
  ];

  return (
    <section id="video-results" className="video-marquee-section">
      <div className="marquee-wrapper">
        
        {/* The infinite scrolling track */}
        <div className="marquee-track">
          {[0, 1, 2, 3].map(groupIndex => (
            <div key={groupIndex} className="marquee-group" aria-hidden={groupIndex > 0 ? "true" : "false"}>
              {videos.map((vid, idx) => (
                <div key={`${groupIndex}-${idx}`} className="marquee-card" style={{ background: vid.bg }}>
                  <div className="marquee-card-inner">
                    <span className="font-mono marquee-tag">{vid.title}</span>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Center static iPhone Mockup Overlay */}
        <div className="iphone-overlay">
          <div className="iphone-frame">
            <div className="iphone-notch">
              <div className="iphone-camera"></div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
