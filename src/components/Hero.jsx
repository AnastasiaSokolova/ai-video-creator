import { useEffect, useRef, useState } from 'react';
import { A, HERO, HERO_VIDEO } from '../data/content.js';
import { prefersReducedMotion, safePlay } from '../hooks/media.js';

// Showreel: starts muted (browsers only autoplay silently), and a tap/click anywhere on the
// video turns the music on (and off again) — that tap is the permission browsers need,
// on desktop and on phones. Pauses while a project is open or when scrolled out of view,
// and resumes afterwards. With reduced motion it waits for that tap before playing.
export default function Hero({ t, modalOpen }) {
  const ref = useRef(null);
  const userPaused = useRef(false);
  const visible = useRef(true);
  const [soundOn, setSoundOn] = useState(false);
  const [file, poster] = HERO[HERO_VIDEO] || HERO.bags;

  const shouldPlay = () => !userPaused.current && visible.current && !modalOpen;

  useEffect(() => {
    const v = ref.current;
    v.muted = true;
    if (prefersReducedMotion()) userPaused.current = true;
  }, []);

  // Play when on screen and no popup is open; pause otherwise (keeps the music from
  // playing on while the visitor reads further down the page)
  useEffect(() => {
    const v = ref.current;
    const sync = () => (shouldPlay() ? safePlay(v) : v.pause());
    sync();
    if (!('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; sync(); }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [modalOpen]);

  const toggleSound = () => {
    const v = ref.current;
    const next = !soundOn;
    v.muted = !next;
    setSoundOn(next);
    if (next && v.paused) { userPaused.current = false; safePlay(v); }
  };

  return (
    <section className="hero wrap" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow"><span aria-hidden="true" />{t.heroEyebrow}</p>
        <h1 id="hero-title" className="serif">{t.heroTitle1}<br />{t.heroT2a}<em>{t.heroT2b}</em>.</h1>
        <p className="hero-sub">{t.heroSub}</p>
        <div className="hero-ctas">
          <a href="#work" className="btn btn-solid">{t.ctaWork}<span aria-hidden="true">↓</span></a>
          <a href="#contact" className="btn btn-outline">{t.ctaStart}<span aria-hidden="true">→</span></a>
        </div>
        <a href="#services" className="hero-prices">{t.heroPrices}</a>
      </div>
      <div className="hero-media">
        <div className="hero-frame">
          <img src={A + 'poster-' + poster + '.jpg'} alt="" aria-hidden="true" />
          <video
            ref={ref}
            src={A + 'video/' + file + '.mp4'}
            poster={A + 'poster-' + poster + '.jpg'}
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={t.showreel}
          />
          {/* The whole video is a sound switch: "Tap for sound" while muted, moving bars while music plays */}
          <button type="button" className="hero-tap" onClick={toggleSound} aria-label={soundOn ? t.soundOff : t.soundOn} aria-pressed={soundOn}>
            <span className={`hero-tap-hint ${soundOn ? 'is-on' : ''}`}>
              <span aria-hidden="true" className={`sound-icon ${soundOn ? 'is-on' : ''}`}><i /><i /><i /></span>
              {!soundOn && t.tapSound}
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
