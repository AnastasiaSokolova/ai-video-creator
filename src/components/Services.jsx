import { useState } from 'react';
import { useUI } from '../context.js';

// Arrow keys / Home / End move between accordion headers (WAI-ARIA accordion pattern)
function onHeaderKey(e) {
  const btns = [...document.querySelectorAll('button[data-acc]')];
  const i = btns.indexOf(e.currentTarget);
  const n = { ArrowDown: (i + 1) % btns.length, ArrowUp: (i - 1 + btns.length) % btns.length, Home: 0, End: btns.length - 1 }[e.key];
  if (n === undefined) return;
  e.preventDefault();
  btns[n].focus();
}

export default function Services() {
  const { t, pickService } = useUI();
  const [open, setOpen] = useState(null);

  return (
    <section id="services" className="services" aria-labelledby="services-t">
      <div className="services-intro" data-reveal>
        <p className="mono muted eyebrow">{t.nav.services}</p>
        <h2 id="services-t" className="serif services-title">{t.sv1}<span className="accent-italic">{t.sv2}</span>{t.sv3}</h2>
        <a href="#contact" className="arrow-link">{t.discuss} <span aria-hidden="true">→</span></a>
      </div>
      <div className="services-list">
        <ul className="acc">
          {t.services.map((s, i) => {
            const isOpen = open === s.k;
            return (
              <li key={s.k} className={isOpen ? 'is-open' : ''} data-reveal>
                <h3>
                  <button
                    type="button"
                    id={'svc-h-' + s.k}
                    data-acc
                    aria-expanded={isOpen}
                    aria-controls={'svc-p-' + s.k}
                    onClick={() => setOpen(isOpen ? null : s.k)}
                    onKeyDown={onHeaderKey}
                    className="acc-head"
                  >
                    <span className="acc-num mono accent">{String(i + 1).padStart(2, '0')}</span>
                    <span className="acc-main">
                      <span className="acc-text">
                        <span className="serif acc-title">{s.t}</span>
                        <span className="acc-desc">{s.d}</span>
                      </span>
                      <span className="acc-price">
                        <span className="mono muted">{s.pl}</span>
                        <span className="serif">{s.pv}</span>
                      </span>
                    </span>
                    <span className="acc-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div id={'svc-p-' + s.k} role="region" aria-labelledby={'svc-h-' + s.k} className="acc-panel" inert={!isOpen}>
                  <div className="acc-clip">
                    <div className="acc-body">
                      <div className="acc-opts">
                        {s.opts.map((o) => (
                          <div key={o.l} className="acc-opt">
                            <span className="mono muted">{o.l}</span>
                            <span className="acc-opt-price"><span className="mono muted">{o.pl}</span><span className="serif">{o.pv}</span></span>
                          </div>
                        ))}
                      </div>
                      <p className="body-copy small">{t.scopeNote}</p>
                      <a href="#contact" className="arrow-link accent" onClick={() => pickService(s.k)}>{t.discussYours} <span aria-hidden="true">→</span></a>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <p className="price-note" data-reveal>{t.priceNote}</p>
      </div>
    </section>
  );
}
