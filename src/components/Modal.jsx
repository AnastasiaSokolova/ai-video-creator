import { useEffect, useRef } from 'react';

// Native <dialog> driven by the `open` prop: showModal() gives focus trapping,
// Escape-to-close and a ::backdrop for free.
export default function Modal({ open, onClose, className, labelledBy, initialFocus, preventClose = false, onKeyDown, children, ...rest }) {
  const ref = useRef(null);
  const lastFocus = useRef(null);
  // Latest props for the native listeners below, which are attached once
  const latest = useRef({});
  latest.current = { open, onClose, preventClose };

  useEffect(() => {
    const d = ref.current;
    if (open && !d.open) {
      lastFocus.current = document.activeElement;
      d.showModal();
      if (initialFocus) d.querySelector(initialFocus)?.focus();
    } else if (!open && d.open) {
      d.close();
    }
  }, [open, initialFocus]);

  // Native listeners so a close by the browser (Escape) always reaches React state
  useEffect(() => {
    const d = ref.current;
    const onNativeClose = () => {
      if (latest.current.open) latest.current.onClose();
      lastFocus.current?.focus?.({ preventScroll: true });
    };
    const onCancel = (e) => { if (latest.current.preventClose) e.preventDefault(); };
    d.addEventListener('close', onNativeClose);
    d.addEventListener('cancel', onCancel);
    return () => {
      d.removeEventListener('close', onNativeClose);
      d.removeEventListener('cancel', onCancel);
    };
  }, []);

  return (
    <dialog
      ref={ref}
      className={className}
      aria-labelledby={labelledBy}
      // A click on the dialog element itself (not its content) is a backdrop click
      onClick={(e) => { if (e.target === e.currentTarget && !preventClose) onClose(); }}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {children}
    </dialog>
  );
}
