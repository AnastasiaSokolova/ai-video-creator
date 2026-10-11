import { useRef, useState } from 'react';
import { useUI } from '../context.js';
import { HERO_VIDEO } from '../data/projects.js';
import { safePlay, useVideoPreview } from '../hooks/media.js';
import PreviewMedia from './PreviewMedia.jsx';

export default function Hero() {
  const { t, lang } = useUI();
  // Browsers only allow autoplay when muted, so the video starts silent and
  // the visitor turns sound on with the button (a tap counts as permission).
  const [soundOn, setSoundOn] = useState(false);
  const soundRef = useRef(false);
  const { videoRef, playing, videoProps } = useVideoPreview({ soundRef });

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    const next = !soundOn;
    soundRef.current = next;
    setSoundOn(next);
    v.muted = !next;
    if (next && v.paused) safePlay(v); // also starts it when autoplay was off (reduced motion, data saver)
  };

  return (
    <section className={`hero lang-${lang}`} aria-labelledby="hero-title">
      <div className="hero-reel frame">
        <PreviewMedia film={HERO_VIDEO} playing={playing} videoProps={videoProps} preload="auto" />
        <button type="button" className="sound-toggle mono" aria-pressed={soundOn} onClick={toggleSound}>
          <span className={`sound-icon ${soundOn ? 'is-on' : ''}`} aria-hidden="true"><i /><i /><i /></span>
          {soundOn ? t.soundOff : t.soundOn}
        </button>
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
