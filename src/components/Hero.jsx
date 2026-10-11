import { useEffect, useRef } from 'react';
import { useUI } from '../context.js';
import { SHOWREEL } from '../data/projects.js';
import { prefersReducedMotion, useVideoPreview } from '../hooks/media.js';
import PreviewMedia from './PreviewMedia.jsx';

const pad = (n) => String(n).padStart(2, '0');

// Running 24fps timecode over the showreel, as in the design
function useTimecode(ref) {
  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      if (!ref.current) return;
      const f = Math.floor((performance.now() - start) / (1000 / 24));
      const s = Math.floor(f / 24);
      ref.current.textContent = `00:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f % 24)}`;
    }, prefersReducedMotion() ? 1000 : 1000 / 24);
    return () => clearInterval(id);
  }, [ref]);
}

export default function Hero() {
  const { t, lang } = useUI();
  const tcRef = useRef(null);
  const { playing, videoProps } = useVideoPreview();
  useTimecode(tcRef);

  return (
    <section className={`hero lang-${lang}`} aria-labelledby="hero-title">
      <div className="hero-reel frame">
        <PreviewMedia film={SHOWREEL} playing={playing} videoProps={videoProps} preload="auto" />
        <div className="hero-reel-meta mono" aria-hidden="true">
          <span>{t.reel}</span><span ref={tcRef}>00:00:00:00</span>
        </div>
      </div>

      <h1 id="hero-title" className="hero-title">
        <span className="hero-kicker"><span className="rule" aria-hidden="true" />{t.h1a}</span>
        <span className="hero-line accent-italic">{t.h1b}</span>
        <span className="hero-line hero-indent">{t.h1c}</span>
      </h1>

      <div className="hero-foot">
        <p className="hero-sub">{t.heroSub}</p>
        <p className="mono muted">{t.title}</p>
        <a href="#work" className="arrow-link">{t.heroCta} <span aria-hidden="true">↓</span></a>
      </div>
    </section>
  );
}
