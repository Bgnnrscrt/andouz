import React, { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { SPRING } from '../../lib/motion';
import { useCanHover } from '../../hooks/useMediaQuery';

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  /** Share of the pointer offset the element follows (0–1). */
  strength?: number;
  /** Max travel in px on each axis. */
  max?: number;
}

const clamp = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/**
 * Pulls its child a few pixels toward a mouse pointer, springing back on leave.
 * It owns this wrapper's transform (motion values, no re-renders), so the child can keep
 * its own CSS hover / press transforms (.btn). Touch, pen and reduced motion: no pull.
 */
export const Magnetic: React.FC<MagneticProps> = ({ children, className, strength = 0.3, max = 10 }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const canHover = useCanHover();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, SPRING.soft);
  const y = useSpring(my, SPRING.soft);
  const enabled = canHover && !reduce;

  const onPointerMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (!enabled || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(clamp((e.clientX - (r.left + r.width / 2)) * strength, max));
    my.set(clamp((e.clientY - (r.top + r.height / 2)) * strength, max));
  };

  const release = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      style={{ x, y }}
      onPointerMove={onPointerMove}
      onPointerLeave={release}
    >
      {children}
    </motion.span>
  );
};
