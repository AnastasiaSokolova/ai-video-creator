import { useEffect, useRef } from 'react';
import { NAME, NAV } from '../data/content.js';
import FormLink from './FormLink.jsx';

export default function Header({ menuOpen, setMenuOpen }) {
  const toggleRef = useRef(null);
  const closeRef = useRef(null);
  const wasOpen = useRef(false);

  // Move focus into the menu when it opens and back to the toggle when it closes
  useEffect(() => {
    if (menuOpen) closeRef.current?.focus();
    else if (wasOpen.current) toggleRef.current?.focus({ preventScroll: true });
    wasOpen.current = menuOpen;
  }, [menuOpen]);

  // Escape closes it; growing to desktop width closes it too
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    const mq = matchMedia('(min-width: 900px)');
    const onMq = (e) => { if (e.matches) setMenuOpen(false); };
    addEventListener('keydown', onKey);
    mq.addEventListener('change', onMq);
    return () => {
      removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onMq);
    };
  }, [menuOpen, setMenuOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#top" className="brand">{NAME}<span className="dot" aria-hidden="true" /></a>
          <nav className="nav-desktop" aria-label="Primary">
            {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
            <FormLink className="btn btn-accent btn-sm">Start a project</FormLink>
          </nav>
          <button
            ref={toggleRef}
            type="button"
            className="btn btn-ghost btn-sm menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            Menu
          </button>
        </div>
      </header>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <div className="mobile-menu-top">
          <span className="brand">{NAME}</span>
          <button ref={closeRef} type="button" className="btn btn-ghost btn-sm" onClick={() => setMenuOpen(false)}>Close</button>
        </div>
        <nav aria-label="Mobile">
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>{n.label}</a>)}
        </nav>
        <FormLink className="btn btn-accent btn-lg btn-block">Start a project</FormLink>
      </div>
    </>
  );
}
