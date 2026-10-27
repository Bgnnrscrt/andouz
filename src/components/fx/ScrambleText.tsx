import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*+=<>/';

interface ScrambleTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** Milliseconds to decode the full string. */
  duration?: number;
  /** Milliseconds of pure noise before decoding starts. */
  delay?: number;
}

/**
 * Cyber "decode" effect for short single-line labels: random glyphs resolve left-to-right
 * the first time the label scrolls into view, and again whenever `text` changes (language switch).
 * The final text reserves the width, so the decoding never shifts layout.
 */
export const ScrambleText: React.FC<ScrambleTextProps> = ({ text, className, style, duration = 650, delay = 120 }) => {
  const wrapRef = useRef<HTMLSpanElement>(null);
  const liveRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(wrapRef, { once: true });
  const reduce = useReducedMotion();

  // Paint the real text before the browser paints; the effect below takes over when it animates.
  useLayoutEffect(() => {
    if (liveRef.current) liveRef.current.textContent = text;
  }, [text]);

  useEffect(() => {
    const el = liveRef.current;
    if (!el) return;
    if (!inView || reduce) {
      el.textContent = text;
      return;
    }
    const chars = [...text];
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const progress = Math.min(1, Math.max(0, (now - start - delay) / duration));
      const revealed = Math.floor(progress * chars.length);
      let out = '';
      for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        out += i < revealed || c.trim() === '' ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, inView, reduce, duration, delay]);

  return (
    <span ref={wrapRef} className={className} style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap', ...style }}>
      <span aria-hidden="true" style={{ visibility: 'hidden' }}>{text}</span>
      <span ref={liveRef} style={{ position: 'absolute', inset: 0, overflow: 'hidden' }} />
    </span>
  );
};
