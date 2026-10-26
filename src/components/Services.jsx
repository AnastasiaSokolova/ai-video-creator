import { PKG } from '../data/content.js';

// Clicking a package preselects it in the contact form and scrolls there.
export default function Services({ t, lang, onPick }) {
  const ua = lang === 'ua';
  const groupMeta = { photo: [t.gPhoto, t.gPhotoD], video: [t.gVideo, t.gVideoD], campaign: [t.gCampaign, t.gCampaignD] };

  return (
    <section id="services" className="services band" aria-labelledby="services-title">
      <div className="wrap">
        <div className="services-head">
          <h2 id="services-title" className="serif display">{t.servicesT1} <em>{t.servicesT2}</em></h2>
          <p>{t.servicesIntro}</p>
        </div>
        <div className="packages">
          {PKG.map((g) => (
            <div key={g.g} className={`package ${g.g === 'campaign' ? 'is-dark' : ''}`}>
              <h3>{groupMeta[g.g][0]}</h3>
              <p className="package-desc">{groupMeta[g.g][1]}</p>
              {g.g === 'photo' && <p className="package-min">{t.gPhotoMin}</p>}
              {g.items.map(([id, price, en, uk]) => {
                const label = ua ? uk : en;
                return (
                  <button key={id} type="button" className="package-row" aria-label={`${label}, ${t.from} ${price}`} onClick={() => onPick(id)}>
                    <span className="package-label">{label}</span>
                    <span className="package-price">
                      <span className="package-from">{t.from}</span><span className="package-amount">{price}</span>
                      <span aria-hidden="true" className="package-arrow">→</span>
                    </span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="includes">
          <p className="mono includes-title">{t.includesTitle}</p>
          {t.inc.map(([title, desc]) => (
            <div key={title}>
              <span className="includes-item">{title}</span>
              <span className="includes-desc">{desc}</span>
            </div>
          ))}
        </div>
        <p className="fine">{t.fine}</p>
      </div>
    </section>
  );
}
