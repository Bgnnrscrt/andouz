import type { Variants } from 'motion/react';

/*
 * ANDO motion tokens. Mirrors the CSS custom properties in index.css
 * (--ease-out, --ease-in-out, --ease-drawer) so JS and CSS motion feel identical.
 */

type Bezier = [number, number, number, number];

/** Strong ease-out: entrances, exits, reveals. */
export const EASE_OUT: Bezier = [0.23, 1, 0.32, 1];
/** Strong ease-in-out: things moving or morphing on screen. */
export const EASE_IN_OUT: Bezier = [0.77, 0, 0.175, 1];
/** iOS-like drawer/sheet curve. */
export const EASE_DRAWER: Bezier = [0.32, 0.72, 0, 1];

/** Durations in seconds. UI stays under 0.3s; reveals/scenes are marketing motion. */
export const DURATION = {
  press: 0.16,
  fast: 0.2,
  ui: 0.25,
  scene: 0.45,
  reveal: 0.6,
} as const;

export const SPRING = {
  /** Indicators, layout moves, anything the user can interrupt. */
  snappy: { type: 'spring', duration: 0.45, bounce: 0.15 },
  /** Pointer tracking (tilt, magnetic pull) — pass to useSpring(). */
  soft: { stiffness: 150, damping: 18, mass: 0.6 },
} as const;

/** whileInView viewport for scroll reveals: fire once, slightly before the fold. */
export const VIEWPORT = { once: true, margin: '0px 0px -80px 0px' } as const;

/** Child variant for staggered groups (pair with staggerContainer). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, transform: 'translateY(14px)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px)',
    transition: { duration: DURATION.reveal, ease: EASE_OUT },
  },
};

/** Opacity-only twin of fadeUp for prefers-reduced-motion. */
export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

export const staggerContainer = (stagger = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
});
