import { useEffect, useState } from 'react';

// Desktop media slider for the project popup: one large item at a time (film first, then
// photos), ←/→ buttons, keyboard arrows, a counter and clickable thumbnails.
// Only the current slide is rendered, so leaving a video slide stops it.
// Remount it per project (key={project.id}) to start each project at slide 1.
export default function MediaCarousel({ items, t }) {
  const [i, setI] = useState(0);
  const n = items.length;
  const go = (d) => setI((x) => (x + d + n) % n);
  const cur = items[i];

  // ←/→ keys switch slides (not while the video itself has focus: there they seek)
  useEffect(() => {
    if (n < 2) return;
    const onKey = (e) => {
      if (e.target.tagName === 'VIDEO' || e.target.tagName === 'INPUT') return;
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [n]);

  return (
    <div className="mc" role="region" aria-roledescription="carousel" aria-label={cur.alt}>
      {/* 16:9 films take their own shape instead of the tall stage (no black bars) */}
      <div className={`mc-stage ${cur.type === 'video' && cur.ratio === '16/9' ? 'is-wide' : ''}`}>
        {cur.type === 'video' ? (
          <video key={cur.src} src={cur.src} poster={cur.poster} controls playsInline preload="metadata" aria-label={cur.alt} />
        ) : (
          // Clicking a photo moves on to the next slide
          <img key={cur.src} src={cur.src} alt={cur.alt} onClick={() => n > 1 && go(1)} className={n > 1 ? 'is-clickable' : ''} />
        )}
        {n > 1 && (
          <>
            <button type="button" className="mc-arrow is-prev" aria-label={t.slidePrev} onClick={() => go(-1)}>←</button>
            <button type="button" className="mc-arrow is-next" aria-label={t.slideNext} onClick={() => go(1)}>→</button>
          </>
        )}
      </div>
      <div className="mc-bar">
        <span className="mono muted mc-count" aria-live="polite">{i + 1} / {n}</span>
        <span className="mono muted mc-cap">{cur.cap}</span>
      </div>
      {n > 1 && (
        <div className="mc-thumbs">
          {items.map((it, k) => (
            <button
              key={it.src}
              type="button"
              className="mc-thumb"
              aria-label={`${t.slideGo} ${k + 1}`}
              aria-current={k === i ? 'true' : undefined}
              onClick={() => setI(k)}
            >
              <img src={it.type === 'video' ? it.poster : it.src} alt="" loading="lazy" />
              {it.type === 'video' && <span aria-hidden="true" className="mc-play">▶</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
