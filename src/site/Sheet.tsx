import { useEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useBackToClose } from '../hooks/useBackToClose';

/*
 * Overlay shell for the access window (`sheet`: slides up from the bottom on a phone,
 * a centred card on a wide screen) and the phone menu (`menu`: slides in from the
 * right). Portal, backdrop tap / Esc / the system Back button close it (useBackToClose),
 * focus is trapped inside and given back on close, the page doesn't scroll behind it.
 * Children stay mounted through the closing transition.
 */

interface SheetProps {
  open: boolean;
  onClose: () => void;
  closeLabel: string;
  labelledBy?: string;
  ariaLabel?: string;
  variant?: 'sheet' | 'menu';
  className?: string;
  children: ReactNode;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
const EXIT_MS = 280;

export function Sheet({ open, onClose, closeLabel, labelledBy, ariaLabel, variant = 'sheet', className = '', children }: SheetProps) {
  const [mounted, setMounted] = useState(open);
  const [shown, setShown] = useState(false);
  // Opening mounts right away (a render-time update, no extra effect pass).
  if (open && !mounted) setMounted(true);
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // Enter: mount, then switch the class on the next frames so the transition runs.
  // Exit: switch the class off, unmount after the transition.
  useEffect(() => {
    if (open) {
      let second = 0;
      const first = requestAnimationFrame(() => {
        second = requestAnimationFrame(() => setShown(true));
      });
      return () => {
        cancelAnimationFrame(first);
        cancelAnimationFrame(second);
      };
    }
    setShown(false);
    const t = window.setTimeout(() => setMounted(false), EXIT_MS);
    return () => window.clearTimeout(t);
  }, [open]);

  useBackToClose(open, onClose);

  useEffect(() => {
    if (!open) return;
    const restore = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const html = document.documentElement;
    const prevOverflow = html.style.overflow;
    html.style.overflow = 'hidden';
    const focusTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      (panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel)?.focus({ preventScroll: true });
    }, 40);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseRef.current();
        return;
      }
      const panel = panelRef.current;
      if (e.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.getClientRects().length > 0);
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === panel)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (active === last || !panel.contains(active))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', onKey);
      html.style.overflow = prevOverflow;
      restore?.focus({ preventScroll: true });
    };
  }, [open]);

  if (!mounted) return null;
  return createPortal(
    <div className={`sheet sheet--${variant}${shown ? ' is-shown' : ''}`}>
      <div className="sheet-backdrop" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className={`sheet-panel ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={ariaLabel}
        tabIndex={-1}
      >
        {variant === 'sheet' && <span className="sheet-grip" aria-hidden="true" />}
        <button type="button" className="sheet-close" onClick={onClose} aria-label={closeLabel}>
          <X size={20} strokeWidth={1.7} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
