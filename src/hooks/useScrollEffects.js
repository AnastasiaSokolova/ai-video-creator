import { useEffect, useState } from 'react';
import { prefersReducedMotion } from './media.js';

// Fades [data-reveal] elements in as they scroll into view.
export function useReveal() {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.dataset.revealed = ''; io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px' });
    document.querySelectorAll('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight) el.dataset.revealed = '';
      else io.observe(el);
    });
    document.documentElement.classList.add('js-reveal');
    return () => {
      io.disconnect();
      document.documentElement.classList.remove('js-reveal');
    };
  }, []);
}

// Header state: `scrolled` past the top, `hidden` while scrolling down (auto-hide nav).
export function useNavScroll(keepVisible) {
  const [state, setState] = useState({ scrolled: false, hidden: false });
  useEffect(() => {
    let lastY = scrollY;
    const onScroll = () => {
      const y = scrollY;
      const next = { scrolled: y > 40, hidden: !keepVisible && y > 160 && y > lastY };
      setState((s) => (s.scrolled === next.scrolled && s.hidden === next.hidden ? s : next));
      lastY = y;
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [keepVisible]);
  return state;
}

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => matchMedia(query).matches);
  useEffect(() => {
    const mq = matchMedia(query);
    const on = () => setMatches(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return matches;
}
