import React from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { MotionProps } from 'motion/react';
import { DURATION, EASE_OUT } from '../../lib/motion';

interface HeroTitleProps {
  id: string;
  start: string;
  gradient: string;
  /** Seconds before the first word rises. */
  delay: number;
  /** Seconds between words. */
  stagger: number;
  /** True only for the first-load choreography; later language switches just cross-fade. */
  intro: boolean;
}

const GREEN = [0, 245, 155];
const CYAN = [0, 180, 216];
/** Point t (0–1) on the ANDO green → AndoGram cyan gradient. */
const mix = (t: number) => `rgb(${GREEN.map((g, i) => Math.round(g + (CYAN[i] - g) * t)).join(' ')})`;

const words = (text: string) => text.split(/\s+/).filter(Boolean);

/**
 * Hero headline split into words that rise out of a blur one after another.
 * Gradient words each carry their slice of one continuous green→cyan gradient (so wrapping
 * never breaks it) and a periodic light glint that sweeps across them in sequence.
 */
export const HeroTitle: React.FC<HeroTitleProps> = ({ id, start, gradient, delay, stagger, intro }) => {
  const reduce = useReducedMotion();
  const startWords = words(start);
  const gradWords = words(gradient);

  const wordMotion = (index: number): Pick<MotionProps, 'initial' | 'animate' | 'transition'> => {
    if (!intro) {
      // Language switch: a quick cross-fade, no travel.
      return { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: DURATION.ui, ease: EASE_OUT } };
    }
    if (reduce) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.3, delay: delay * 0.4 + index * 0.02, ease: EASE_OUT },
      };
    }
    return {
      initial: { opacity: 0, transform: 'translateY(20px)', filter: 'blur(8px)' },
      animate: {
        opacity: 1,
        transform: 'translateY(0px)',
        filter: 'blur(0px)',
        transitionEnd: { transform: 'none', filter: 'none' },
      },
      transition: { duration: 0.7, delay: delay + index * stagger, ease: EASE_OUT },
    };
  };

  return (
    <h1 id={id} className="hero-title">
      {startWords.map((word, i) => (
        <React.Fragment key={`s${i}-${word}`}>
          <motion.span className="hero-word" {...wordMotion(i)}>
            {word}
          </motion.span>{' '}
        </React.Fragment>
      ))}
      <br className="hero-title-break" />
      {gradWords.map((word, i) => {
        const n = gradWords.length;
        const style = {
          '--g1': mix(i / n),
          '--g2': mix((i + 1) / n),
          '--sheen-delay': `${2.4 + i * 0.3}s`,
        } as CSSProperties;
        return (
          <React.Fragment key={`g${i}-${word}`}>
            <motion.span className="hero-word hero-word--grad" style={style} {...wordMotion(startWords.length + i)}>
              {word}
              <span className="hero-sheen" aria-hidden="true">
                <span className="hero-sheen-band" data-text={word} />
              </span>
            </motion.span>
            {i < n - 1 ? ' ' : null}
          </React.Fragment>
        );
      })}
    </h1>
  );
};
