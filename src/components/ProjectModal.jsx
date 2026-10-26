import { useEffect, useRef } from 'react';
import { PROJECTS } from '../data/content.js';
import { useWide } from '../hooks/media.js';
import MediaCarousel from './MediaCarousel.jsx';
import Modal from './Modal.jsx';

// Project popup: info column (sticky on desktop) + media column, with previous/next project.
// Media: a slider on desktop (MediaCarousel), the design's stacked list on phones.
export default function ProjectModal({ t, lang, openId, setOpenId, onSimilar }) {
  const scrollRef = useRef(null);
  const wide = useWide();
  const i = PROJECTS.findIndex((p) => p.id === openId);
  const p = i >= 0 ? PROJECTS[i] : null;
  const prev = p && PROJECTS[(i - 1 + PROJECTS.length) % PROJECTS.length];
  const next = p && PROJECTS[(i + 1) % PROJECTS.length];

  // Back to the top of the popup when switching project
  useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = 0; }, [openId]);

  const close = () => setOpenId(null);

  return (
    <Modal open={!!p} onClose={close} className="project-dialog" labelledBy="m-title" initialFocus=".m-close">
      {p && (
        <div className="m-scroll" ref={scrollRef} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
          <div className="m-panel">
            <div className="m-top">
              <span className="mono muted">{t.counter(i + 1, PROJECTS.length)}</span>
              <button type="button" className="m-close" onClick={close}>{t.close} <span aria-hidden="true">✕</span></button>
            </div>
            <div className="m-body">
              <div className="m-info">
                <p className="mono muted m-type">{p.type[lang]}</p>
                <h2 id="m-title" className="serif">{p.title[lang]}</h2>
                {p.note && <span className="m-note">{p.note[lang]}</span>}
                <p className="m-desc">{p.desc[lang]}</p>
                <div>
                  <h3 className="m-deliv-title">{t.deliverables}</h3>
                  <ul className="m-deliv">
                    {p.deliv[lang].map((d) => <li key={d}><span aria-hidden="true" />{d}</li>)}
                  </ul>
                </div>
                <button type="button" className="btn btn-solid m-similar" onClick={() => onSimilar(p)}>{t.startSimilar} →</button>
                {p.sources.length > 0 && (
                  <details className="m-sources">
                    <summary>{t.sourcesToggle}</summary>
                    <div>
                      <p>{p.sourceNote[lang]}</p>
                      <div className="m-sources-imgs">
                        {p.sources.map((s) => <img key={s.src} src={s.src} alt={p.title[lang] + ' — original'} width={s.w} height={s.h} loading="lazy" />)}
                      </div>
                    </div>
                  </details>
                )}
              </div>
              {wide ? (
                <div className="m-media-slider">
                  <MediaCarousel
                    key={p.id}
                    t={t}
                    items={[
                      ...p.videos.map((v) => ({ type: 'video', ...v, alt: p.title[lang] + ' — ' + t.badgeVideo, cap: `${p.title[lang]} · ${v.dur} · ${v.ratio.replace('/', ':')}` })),
                      ...p.photos.map((x, k) => ({ type: 'photo', ...x, alt: `${p.title[lang]} — ${p.type[lang]} ${k + 1}`, cap: `${p.title[lang]} · ${k + 1}/${p.photos.length}` }))
                    ]}
                  />
                </div>
              ) : (
                <div className={`m-media ${p.videos.some((v) => v.ratio === '16/9') ? 'is-wide' : ''}`}>
                  {p.videos.map((v) => (
                    <figure key={v.src}>
                      <video src={v.src} poster={v.poster} controls playsInline preload="none" aria-label={p.title[lang] + ' — ' + t.badgeVideo} style={{ aspectRatio: v.ratio.replace('/', ' / ') }} />
                      <figcaption className="mono muted">{p.title[lang]} · {v.dur} · {v.ratio.replace('/', ':')}</figcaption>
                    </figure>
                  ))}
                  {p.photos.map((x, k) => (
                    <img key={x.src} src={x.src} alt={`${p.title[lang]} — ${p.type[lang]} ${k + 1}`} width={x.w} height={x.h} loading="lazy" decoding="async" />
                  ))}
                </div>
              )}
            </div>
            <div className="m-nav">
              <button type="button" onClick={() => setOpenId(prev.id)}>
                <span>← {t.prevProject}</span><strong>{prev.title[lang]}</strong>
              </button>
              <button type="button" onClick={() => setOpenId(next.id)}>
                <span>{t.nextProject} →</span><strong>{next.title[lang]}</strong>
              </button>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}
