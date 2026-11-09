import { useEffect, useRef } from 'react';

/** Key in history.state that marks the extra entry pushed by an open overlay. */
const KEY = 'andoOverlay';

/** True when the current history entry is one pushed by an open drawer or dialog. */
export const isOverlayEntry = (): boolean => {
  const st = window.history.state as Record<string, unknown> | null;
  return !!st && typeof st === 'object' && KEY in st;
};

/**
 * Phones: the system Back button closes an open drawer or dialog instead of leaving
 * the page (on Android it would otherwise go to the previous section, or out of the
 * site if ando.uz was the first page).
 *
 * While `open` is true, one extra history entry with the same URL is pushed; Back pops
 * it and calls onClose. Closing another way (×, Esc, a tap outside) takes that entry
 * back off with history.back(). The push waits one tick, so React StrictMode's instant
 * mount/unmount in dev leaves no stray entries. A popstate that lands on our own entry
 * (an overlay opened on top of this one was closed) does not close this overlay.
 */
export function useBackToClose(open: boolean, onClose: () => void): void {
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!open) return;
    const id = Math.random().toString(36).slice(2);
    let pushed = false;
    let popped = false;
    const timer = window.setTimeout(() => {
      const prev = window.history.state as Record<string, unknown> | null;
      window.history.pushState({ ...(prev && typeof prev === 'object' ? prev : {}), [KEY]: id }, '', window.location.href);
      pushed = true;
    }, 0);
    const onPop = (e: PopStateEvent) => {
      const st = e.state as Record<string, unknown> | null;
      if (st && st[KEY] === id) return;
      popped = true;
      onCloseRef.current();
    };
    window.addEventListener('popstate', onPop);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('popstate', onPop);
      const st = window.history.state as Record<string, unknown> | null;
      if (pushed && !popped && st && st[KEY] === id) window.history.back();
    };
  }, [open]);
}
