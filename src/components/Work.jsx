import { useEffect, useRef, useState } from 'react';
import { A, PROJECTS } from '../data/content.js';
import { prefersReducedMotion } from '../hooks/media.js';

const FILTERS = [['all', 'fAll'], ['campaign', 'fCampaign'], ['photo', 'fPhoto'], ['video', 'fVideo'], ['ugc', 'fUgc']];

const counts = { all: PROJECTS.length, campaign: 0, photo: 0, video: 0, ugc: 0 };
PROJECTS.forEach((p) => p.tags.forEach((tag) => { counts[tag]++; }));

// "Haircare campaign · 3 photos + film" or "Fragrance film · 0:21"
export function cardMeta(p, t, lang) {
  const n = p.photos.length, v = p.videos.length;
  const parts = [p.type[lang]];
  if (n) parts.push(t.photos(n) + (v ? ' + ' + t.film : ''));
  else if (v) parts.push(p.videos[0].dur);
  return parts.join(' · ');
}

// Opens on a single tap on phones. iPhone Safari can swallow the first tap on a card in a
// scroll-snapping carousel (it's spent stopping the snap/momentum), so a finger lifted without
// moving opens the project straight away; a swipe still just scrolls. Mouse and keyboard use onClick.
function useTap(action) {
  const start = useRef(null);
  return {
    onTouchStart: (e) => { const p = e.touches[0]; start.current = { x: p.clientX, y: p.clientY, at: Date.now() }; },
    onTouchMove: (e) => {
      const s = start.current, p = e.touches[0];
      if (s && (Math.abs(p.clientX - s.x) > 10 || Math.abs(p.clientY - s.y) > 10)) start.current = null;
    },
    onTouchEnd: (e) => {
      const s = start.current;
      start.current = null;
      if (!s || Date.now() - s.at > 700) return;
      e.preventDefault(); // stops the follow-up click, so it doesn't open twice
      action();
    },
    onClick: action
  };
}

function Card({ p, i, t, lang, onOpen, eager }) {
  const tap = useTap(() => onOpen(p.id));
  const meta = cardMeta(p, t, lang);
  const badge = p.kind === 'campaign' ? t.badgeCampaign : p.kind === 'photo' ? t.badgePhoto : '▶ ' + t.badgeVideo;
  return (
    <button type="button" className="card" {...tap} aria-label={`${t.open}: ${p.title[lang]}, ${meta}`}>
      <span className="card-cover">
        <img src={A + p.cover + '.jpg'} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" style={{ objectPosition: p.pos }} />
        <span className="badge mono">{badge}</span>
      </span>
      <span className="card-caption">
        <span className="card-num serif">{String(i + 1).padStart(2, '0')}</span>
        <span className="card-text">
          <span className="card-title serif">{p.title[lang]}</span>
          <span className="card-meta">{meta}</span>
        </span>
      </span>
    </button>
  );
}

export default function Work({ t, lang, onOpen }) {
  const [filter, setFilter] = useState('all');
  const [idx, setIdx] = useState(0);
  const [edges, setEdges] = useState({ start: true, end: false });
  const scRef = useRef(null);

  // All projects, always (the selected ones come first — see FEATURED in content.js)
  const items = filter === 'all' ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(filter));
  const n = items.length;
  const ci = Math.min(idx, Math.max(0, n - 1));

  const resetCarousel = () => { setIdx(0); if (scRef.current) scRef.current.scrollLeft = 0; requestAnimationFrame(onScroll); };
  const pickFilter = (f) => { setFilter(f); resetCarousel(); };

  // Slider (all screen sizes): track the first card in view, whether we're at either end,
  // and step one card at a time with the arrow buttons
  const onScroll = () => {
    const el = scRef.current;
    if (!el || !el.children[0]) return;
    const step = el.children[1] ? el.children[1].offsetLeft - el.children[0].offsetLeft : el.children[0].offsetWidth;
    const max = el.children.length - 1;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    let i = Math.round(el.scrollLeft / step);
    if (atEnd) i = max;
    setIdx(Math.min(max, Math.max(0, i)));
    setEdges({ start: el.scrollLeft <= 4, end: atEnd });
  };
  useEffect(() => {
    onScroll();
    addEventListener('resize', onScroll);
    return () => removeEventListener('resize', onScroll);
  }, [filter]);
  const go = (d) => {
    const el = scRef.current;
    if (!el || !el.children[0]) return;
    // Step from the card actually at the left edge (at the very end the counter shows the
    // last card, but several cards are in view, so stepping from the counter would go nowhere)
    const step = el.children[1] ? el.children[1].offsetLeft - el.children[0].offsetLeft : el.children[0].offsetWidth;
    const first = Math.round(el.scrollLeft / step);
    const i = Math.min(el.children.length - 1, Math.max(0, first + d));
    el.scrollTo({ left: el.children[i].offsetLeft - el.children[0].offsetLeft, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  };

  return (
    <section id="work" className="work wrap" aria-labelledby="work-title">
      <div className="work-head">
        <div className="work-intro">
          <h2 id="work-title" className="serif display">{t.workT1}{t.workT2 && <> <em>{t.workT2}</em></>}</h2>
          <p>{t.workIntro}</p>
        </div>
        <div role="group" aria-label={t.filterLabel} className="filters">
          {FILTERS.filter(([k]) => counts[k] > 0).map(([k, label]) => (
            <button key={k} type="button" className="filter" aria-pressed={filter === k} onClick={() => pickFilter(k)}>
              <span aria-hidden="true" className="filter-dot" />{t[label]}<span className="mono filter-count">{counts[k]}</span>
            </button>
          ))}
        </div>
      </div>

      <div ref={scRef} onScroll={onScroll} className="carousel" role="region" aria-roledescription="carousel" aria-label={t.workTitle}>
        {items.map((p, i) => <Card key={p.id} p={p} i={i} t={t} lang={lang} onOpen={onOpen} eager={i < 3} />)}
      </div>
      <div className="carousel-nav">
        <span aria-live="polite" className="mono carousel-pos">{String(ci + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</span>
        <span aria-hidden="true" className="carousel-track"><span style={{ width: n ? ((ci + 1) / n * 100) + '%' : 0 }} /></span>
        <button type="button" className="round-btn" aria-label={t.prev} onClick={() => go(-1)} disabled={edges.start}>←</button>
        <button type="button" className="round-btn is-dark" aria-label={t.next} onClick={() => go(1)} disabled={edges.end}>→</button>
      </div>
    </section>
  );
}
