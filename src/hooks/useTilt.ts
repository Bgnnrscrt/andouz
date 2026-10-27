import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { SPRING } from '../lib/motion';

/**
 * 3D tilt that follows a mouse pointer. Spread the result onto a `motion.*` element:
 *   const tilt = useTilt(); <motion.div {...tilt}>…</motion.div>
 * It owns that element's `transform`, so put reveal/hover transforms on a wrapper instead.
 * Touch pointers and prefers-reduced-motion are ignored (the element stays flat).
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>(maxDeg = 6) {
  const ref = useRef<T>(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, SPRING.soft);
  const sry = useSpring(ry, SPRING.soft);
  const transform = useMotionTemplate`perspective(1000px) rotateX(${srx}deg) rotateY(${sry}deg)`;

  const onPointerMove = (e: PointerEvent<T>) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * maxDeg * 2);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * maxDeg * 2);
  };

  const onPointerLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return { ref, style: { transform }, onPointerMove, onPointerLeave };
}
