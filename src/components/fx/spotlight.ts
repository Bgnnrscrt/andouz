import type { PointerEvent } from 'react';

/**
 * onPointerMove handler for `.spotlight` cards (see index.css): writes the pointer
 * position into --mx / --my on the card itself, without a React re-render.
 */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}
