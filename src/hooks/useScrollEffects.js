import { useEffect } from 'react';
import { prefersReducedMotion } from './media.js';

// Fades [data-reveal] elements in as they scroll into view.
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) el.classList.add('is-visible');
      else io.observe(el);
    });
    document.documentElement.classList.add('js-reveal');
    return () => {
      io.disconnect();
      document.documentElement.classList.remove('js-reveal');
    };
  }, []);
}

// Drifts [data-parallax="<speed>"] elements relative to their parent while scrolling.
export function useParallax() {
  useEffect(() => {
    const els = [...document.querySelectorAll('[data-parallax]')];
    if (prefersReducedMotion() || !els.length) return;
    let raf = null;
    const update = () => {
      raf = null;
      const h = innerHeight;
      els.forEach((el) => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -200 || r.top > h + 200) return;
        const off = (r.top + r.height / 2 - h / 2) * parseFloat(el.dataset.parallax);
        el.style.transform = `translate3d(0, ${off.toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
