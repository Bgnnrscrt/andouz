import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { DURATION, EASE_OUT, VIEWPORT, fade, fadeUp, staggerContainer } from '../../lib/motion';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  /** Seconds before the reveal starts. */
  delay?: number;
  /** Pixels the element rises from. */
  y?: number;
  /** Blur-to-sharp on entry. Headings only — it costs more than a fade. */
  blur?: boolean;
}

/**
 * Scroll reveal: fades and rises once when the element enters the viewport.
 * It owns its own transform — wrap elements that have CSS hover transforms instead of revealing them directly.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, style, id, delay = 0, y = 16, blur = false }) => {
  const reduce = useReducedMotion();
  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, transform: `translateY(${y}px)`, ...(blur ? { filter: 'blur(8px)' } : {}) };
  const shown = reduce
    ? { opacity: 1 }
    : {
        opacity: 1,
        transform: 'translateY(0px)',
        ...(blur ? { filter: 'blur(0px)' } : {}),
        transitionEnd: { transform: 'none', ...(blur ? { filter: 'none' } : {}) },
      };

  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={hidden}
      whileInView={shown}
      viewport={VIEWPORT}
      transition={{ duration: reduce ? DURATION.fast : DURATION.reveal, ease: EASE_OUT, delay: reduce ? 0 : delay }}
    >
      {children}
    </motion.div>
  );
};

interface StaggerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Seconds between children (30–80ms reads as one gesture). */
  stagger?: number;
  delay?: number;
  as?: 'div' | 'ul';
}

/** Reveals its <StaggerItem> children one after another when the group scrolls into view. */
export const Stagger: React.FC<StaggerProps> = ({ children, className, style, stagger = 0.06, delay = 0, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Comp = as === 'ul' ? motion.ul : motion.div;
  return (
    <Comp
      className={className}
      style={style}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={staggerContainer(reduce ? 0 : stagger, reduce ? 0 : delay)}
    >
      {children}
    </Comp>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: 'div' | 'li';
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className, style, as = 'div' }) => {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp className={className} style={style} variants={reduce ? fade : fadeUp}>
      {children}
    </Comp>
  );
};
