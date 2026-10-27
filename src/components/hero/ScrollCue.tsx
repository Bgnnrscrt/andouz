import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { EASE_OUT } from '../../lib/motion';

interface ScrollCueProps {
  label: string;
  /** Seconds: appears after the hero choreography has settled. */
  delay: number;
}

/**
 * "There is more below" hint pinned to the bottom of the hero. It fades out over the first
 * ~140px of scroll (a motion value bound to scrollY, so no re-renders). Decorative only.
 */
export const ScrollCue: React.FC<ScrollCueProps> = ({ label, delay }) => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 140], [1, 0]);

  return (
    <motion.div className="hero-scroll-cue" style={{ opacity }} aria-hidden="true">
      <motion.span
        className="hero-scroll-cue-inner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.6, ease: EASE_OUT }}
      >
        <span className="hero-scroll-cue-label">{label}</span>
        <span className="hero-scroll-cue-track">
          <span className="hero-scroll-cue-dot" />
        </span>
      </motion.span>
    </motion.div>
  );
};
