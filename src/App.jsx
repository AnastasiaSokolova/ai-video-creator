import { useEffect, useMemo, useState } from 'react';
import { UIContext } from './context.js';
import { useParallax, useReveal } from './hooks/useScrollEffects.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import FeaturedFilms from './components/FeaturedFilms.jsx';
import MoreFilms from './components/MoreFilms.jsx';
import Services from './components/Services.jsx';
import Process from './components/Process.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import FilmViewer from './components/FilmViewer.jsx';
import InquiryForm from './components/InquiryForm.jsx';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmIndex, setFilmIndex] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const dialogOpen = filmIndex !== null || formOpen;

  useReveal();
  useParallax();

  // Stop the page scrolling behind the menu and dialogs
  useEffect(() => {
    document.body.classList.toggle('is-locked', menuOpen || dialogOpen);
  }, [menuOpen, dialogOpen]);

  const ui = useMemo(() => ({
    overlayOpen: dialogOpen,
    openFilm: (i) => { setMenuOpen(false); setFilmIndex(i); },
    openForm: () => { setMenuOpen(false); setFormOpen(true); }
  }), [dialogOpen]);

  return (
    <UIContext.Provider value={ui}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <main id="main">
        <span id="top" />
        <Hero paused={dialogOpen} />
        <FeaturedFilms />
        <MoreFilms />
        <Services />
        <Process />
        <About />
        <Contact />
      </main>
      <Footer />
      <FilmViewer index={filmIndex} onChange={setFilmIndex} onClose={() => setFilmIndex(null)} />
      <InquiryForm open={formOpen} onClose={() => setFormOpen(false)} />
    </UIContext.Provider>
  );
}
