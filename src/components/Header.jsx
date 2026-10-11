import { useEffect, useRef } from 'react';
import { useUI } from '../context.js';
import { useMediaQuery, useNavScroll } from '../hooks/useScrollEffects.js';

const LINKS = ['work', 'services', 'about', 'contact'];

export default function Header({ setLang, menuOpen, setMenuOpen }) {
  const { t, lang } = useUI();
  const narrow = useMediaQuery('(max-width: 760px)');
  const { scrolled, hidden } = useNavScroll(menuOpen);
  const toggleRef = useRef(null);
  const wasOpen = useRef(false);

  // Close the menu on Escape or when the window grows past the mobile breakpoint
  useEffect(() => { if (!narrow) setMenuOpen(false); }, [narrow, setMenuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, [menuOpen, setMenuOpen]);
  useEffect(() => {
    if (!menuOpen && wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  const cls = ['site-header', scrolled && !menuOpen && 'is-scrolled', hidden && 'is-hidden'].filter(Boolean).join(' ');

  return (
    <>
      <header className={cls}>
        <a href="#top" className="brand" aria-label={t.homeLabel}>ANA SOKOLOVA</a>
        <div className="header-right">
          {!narrow && (
            <>
              <nav className="nav" aria-label={t.navLabel}>
                {LINKS.map((k) => (
                  <a key={k} href={'#' + k} className={k === 'contact' ? 'is-accent' : ''}>{t.nav[k]}</a>
                ))}
              </nav>
              <span className="divider" aria-hidden="true" />
            </>
          )}
          <div className="lang" role="group" aria-label={t.langLabel}>
            <button type="button" lang="en" aria-pressed={lang === 'en'} aria-label="English" onClick={() => setLang('en')}>EN</button>
            <span aria-hidden="true">/</span>
            <button type="button" lang="uk" aria-pressed={lang === 'uk'} aria-label="Українська" onClick={() => setLang('uk')}>UA</button>
          </div>
          {narrow && (
            <button ref={toggleRef} type="button" className="menu-toggle" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? t.close : t.menu}
            </button>
          )}
        </div>
      </header>

      {narrow && menuOpen && (
        <nav id="mobile-menu" className="mobile-menu" aria-label={t.navLabel}>
          {LINKS.map((k) => (
            <a key={k} href={'#' + k} className={k === 'contact' ? 'is-accent' : ''} onClick={() => setMenuOpen(false)}>{t.nav[k]}</a>
          ))}
          <p className="mobile-menu-title mono">{t.title}</p>
        </nav>
      )}
    </>
  );
}
