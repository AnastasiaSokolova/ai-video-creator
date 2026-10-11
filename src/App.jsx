import { useCallback, useEffect, useMemo, useState } from 'react';
import { UIContext } from './context.js';
import { I18N } from './data/i18n.js';
import { useReveal } from './hooks/useScrollEffects.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FilmViewer from './components/FilmViewer.jsx';

const LANG_KEY = 'anasokolova.lang';
const savedLang = () => { try { const l = localStorage.getItem(LANG_KEY); return l === 'uk' ? 'uk' : 'en'; } catch { return 'en'; } };

export default function App() {
  const [lang, setLangState] = useState(savedLang);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmIndex, setFilmIndex] = useState(null);
  const [picked, setPicked] = useState(null);
  const t = I18N[lang];
  const viewerOpen = filmIndex !== null;

  useReveal();

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(LANG_KEY, l); } catch { /* storage blocked */ }
  }, []);

  // Keep <html lang>, the tab title and meta description in the current language
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.metaTitle;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.metaDesc);
  }, [lang, t]);

  // Follow a language change made in another tab
  useEffect(() => {
    const onStorage = (e) => { if (e.key === LANG_KEY && (e.newValue === 'en' || e.newValue === 'uk')) setLangState(e.newValue); };
    addEventListener('storage', onStorage);
    return () => removeEventListener('storage', onStorage);
  }, []);

  // Stop the page scrolling behind the mobile menu and the viewer
  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen || viewerOpen);
  }, [menuOpen, viewerOpen]);

  const ui = useMemo(() => ({
    t, lang,
    overlayOpen: viewerOpen,
    openFilm: (i) => { setMenuOpen(false); setFilmIndex(i); },
    pickService: (key) => setPicked({ key })
  }), [t, lang, viewerOpen]);

  return (
    <UIContext.Provider value={ui}>
      <div className="grain" aria-hidden="true" />
      <Header setLang={setLang} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="top">
        <Hero />
        <Work />
        <Services />
        <About />
        <Contact picked={picked} />
      </main>
      <Footer />
      <FilmViewer index={filmIndex} onChange={setFilmIndex} onClose={() => setFilmIndex(null)} />
    </UIContext.Provider>
  );
}
