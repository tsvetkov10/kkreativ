import Hero from './Hero';
import VideoResults from './VideoResults';
import VideoStats from './VideoStats';
import PerformanceUgc from './PerformanceUgc';
import WallOfLove from './WallOfLove';
import WhatWeDo from './WhatWeDo';
import ScrollingComments from './ScrollingComments';
import WhoWeAre from './WhoWeAre';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Hero />
      <VideoResults />
      <VideoStats />
      <PerformanceUgc />
      <WhatWeDo />
      <ScrollingComments />
      <WallOfLove />
      <WhoWeAre />

      <section className="section" style={{ paddingBottom: '8rem', paddingTop: '4rem', textAlign: 'center' }}>
        <div className="container reveal-scale">
          <h2 className="font-display" style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2rem' }}>
            Ready to bring your bold ideas <br />to life?
          </h2>
          <button 
            className="btn btn-primary btn-nitro-call" 
            onClick={() => {
              navigate('/contact');
              window.scrollTo(0, 0);
            }}
            style={{ fontSize: '1.2rem', padding: '1.2rem 3rem' }}
          >
            СВЪРЖИ СЕ
          </button>
        </div>
      </section>
    </>
  );
}
