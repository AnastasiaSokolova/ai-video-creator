import { useUI } from '../context.js';

// Link that opens the inquiry dialog; without JS it still jumps to #contact.
export default function FormLink({ className, children }) {
  const { openForm } = useUI();
  return (
    <a href="#contact" className={className} onClick={(e) => { e.preventDefault(); openForm(); }}>
      {children}
    </a>
  );
}
