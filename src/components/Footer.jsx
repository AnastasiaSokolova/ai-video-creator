import { NAME, ROLE } from '../data/content.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>© {new Date().getFullYear()} {NAME} — {ROLE}</span>
        <span>All films shown are independent concepts and personal projects.</span>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}
