import { useEffect, useRef, useState } from 'react';
import { films, HERO } from '../data/films.js';
import { SKILLS } from '../data/content.js';
import { useUI } from '../context.js';
import { prefersReducedMotion, safePlay } from '../hooks/media.js';
import FilmFrame from './FilmFrame.jsx';
import FormLink from './FormLink.jsx';

// `paused` is true while a dialog is open, so the muted hero loop doesn't compete with the viewer.
export default function Hero({ paused }) {
  const { openFilm } = useUI();
  const videoRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [missing, setMissing] = useState(false);
  const main = films[HERO.main];

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    if (visible && !paused && !prefersReducedMotion()) safePlay(v);
    else v.pause();
  }, [visible, paused]);

  return (
    <section className="hero container" aria-label="Introduction">
      <div className="hero-bg" aria-hidden="true"><div className="bg-word" data-parallax="0.25">feel</div></div>
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="eyebrow"><span className="rule" aria-hidden="true" />INDEPENDENT AI VIDEO CREATOR</p>
          <h1>Make them stop. Then make them <em>feel</em><span className="accent">.</span></h1>
          <p className="lede">Concept-led films for products, brands and stories that deserve more than another ordinary video. From the first visual hook to the final edit and sound.</p>
          <div className="actions">
            <a href="#work" className="btn btn-outline">Watch the work</a>
            <FormLink className="btn btn-accent">Start a project</FormLink>
          </div>
          <ul className="skills" aria-label="What I make">
            {SKILLS.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <div className="hero-reel">
          <FilmFrame film={films[HERO.left]} className="hero-side hero-side--left">
            <span className="frame-caption">{films[HERO.left].title}</span>
          </FilmFrame>

          <div className={`film-frame hero-main ${missing ? 'is-missing' : ''}`} data-file={main.file + '.mp4'}>
            <video ref={videoRef} className="hero-video" src={main.src} poster={main.poster} muted playsInline loop preload="metadata" onError={() => setMissing(true)} />
            <div className="hero-main-bar">
              <div className="hero-main-title">
                <span className="serif">{main.title}</span>
                <span className="meta">{main.cat}</span>
              </div>
              <button type="button" className="pill-play" aria-label={main.playLabel} onClick={() => openFilm(main.index)}>
                <span className="tri" aria-hidden="true" />Sound on
              </button>
            </div>
          </div>

          <FilmFrame film={films[HERO.right]} className="hero-side hero-side--right">
            <span className="frame-caption">{films[HERO.right].title}</span>
          </FilmFrame>
        </div>
      </div>
    </section>
  );
}
