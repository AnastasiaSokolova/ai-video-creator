import { useCallback, useEffect, useState } from 'react';
import { EMPTY, STR } from './data/content.js';
import { prefersReducedMotion, useWide } from './hooks/media.js';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Work from './components/Work.jsx';
import Services from './components/Services.jsx';
import About, { Process } from './components/About.jsx';
import Contact from './components/Contact.jsx';
import ProjectModal from './components/ProjectModal.jsx';

// Language: ?lang=ua|en in the URL wins, then the saved choice, then English (as in the design)
function initialLang() {
  try {
    const q = new URLSearchParams(location.search).get('lang');
    const l = q === 'ua' || q === 'en' ? q : localStorage.getItem('as_lang');
    return l === 'ua' ? 'ua' : 'en';
  } catch { return 'en'; }
}

export default function App() {
  const [lang, setLangState] = useState(initialLang);
  const [menu, setMenu] = useState(false);
  const [openId, setOpenId] = useState(null);
  const [form, setForm] = useState({ ...EMPTY });
  const [focusKey, setFocusKey] = useState(0);
  const wide = useWide();
  const t = STR[lang];

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem('as_lang', l);
      const u = new URL(location.href);
      u.searchParams.set('lang', l);
      history.replaceState(null, '', u);
    } catch { /* storage or history blocked */ }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === 'ua' ? 'uk' : 'en';
    document.title = lang === 'ua' ? 'Ана Соколова — AI visual creator і креативна директорка' : 'Ana Sokolova — AI Visual Creator & Creative Director';
  }, [lang]);

  // No page scrolling behind the phone menu or the project popup
  useEffect(() => {
    document.body.classList.toggle('is-locked', menu || !!openId);
  }, [menu, openId]);

  const openProject = (id) => { setMenu(false); setOpenId(id); };

  // Prefill the form (a package, or "something like <project>") and take the visitor there
  const goContact = (service, desc) => {
    setForm((f) => ({ ...f, service: service ?? f.service, desc: desc && !f.desc ? desc : f.desc }));
    setFocusKey((k) => k + 1);
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + scrollY - 64, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    }, 40);
  };

  return (
    <>
      <Header t={t} lang={lang} setLang={setLang} wide={wide} menu={menu} setMenu={setMenu} />
      <main id="top">
        <Hero t={t} modalOpen={!!openId} />
        <Work t={t} lang={lang} onOpen={openProject} />
        <Services t={t} lang={lang} onPick={(id) => goContact(id)} />
        <Process t={t} />
        <About t={t} />
        <Contact t={t} lang={lang} form={form} setForm={setForm} focusKey={focusKey} />
      </main>
      <ProjectModal
        t={t}
        lang={lang}
        openId={openId}
        setOpenId={setOpenId}
        onSimilar={(p) => { setOpenId(null); goContact(null, t.similar(p.title[lang])); }}
      />
    </>
  );
}
