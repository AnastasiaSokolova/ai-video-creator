import { useUI } from '../context.js';

export default function Footer() {
  const { t } = useUI();
  return (
    <footer className="site-footer mono">
      <span>© {new Date().getFullYear()} {t.name}</span>
      <span>{t.title}</span>
      <a href="#top">{t.top} ↑</a>
    </footer>
  );
}
