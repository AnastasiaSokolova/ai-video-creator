import { useEffect } from 'react';
import { EMAIL } from '../data/content.js';

const NAV = ['#work', '#services', '#about', '#contact'];

export default function Header({ t, lang, setLang, wide, menu, setMenu }) {
  // Escape closes the phone menu; it also closes when the window grows to desktop width
  useEffect(() => { if (wide) setMenu(false); }, [wide, setMenu]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenu(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu, setMenu]);

  const close = () => setMenu(false);

  return (
    <>
      <a className="skip-link" href="#work">{t.skip}</a>
      <header className="site-header">
        <div className="wrap header-row">
          <a href="#top" className="logo" onClick={close}>Ana <span>Sokolova</span></a>
          <div className="header-right">
            {wide && (
              <nav aria-label="Main" className="nav">
                {NAV.map((href, i) => <a key={href} href={href}>{t.nav[i]}</a>)}
              </nav>
            )}
            <div role="group" aria-label={t.langLabel} className="lang-switch">
              <button type="button" lang="en" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>EN</button>
              <button type="button" lang="uk" aria-pressed={lang === 'ua'} onClick={() => setLang('ua')}>UA</button>
            </div>
            {!wide && (
              <button type="button" className="menu-btn" aria-expanded={menu} aria-controls="mobile-menu" onClick={() => setMenu(!menu)}>
                {menu ? t.close : t.menu}
              </button>
            )}
          </div>
        </div>
        {menu && !wide && (
          <nav id="mobile-menu" aria-label="Main" className="mobile-menu">
            {NAV.map((href, i) => (
              <a key={href} href={href} onClick={close}>{t.nav[i]}<span aria-hidden="true">→</span></a>
            ))}
            <a className="mobile-menu-email" href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </nav>
        )}
      </header>
    </>
  );
}
