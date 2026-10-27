import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';
import { DURATION, EASE_OUT } from '../lib/motion';
import './BackToTop.css';

interface BackToTopProps {
  lang: Language;
}

const LABEL: Record<Language, string> = {
  ru: 'Наверх',
  uz: 'Yuqoriga',
  en: 'Back to top'
};

/** Floating "back to top" button with a ring that fills as the page is read. */
export const BackToTop: React.FC<BackToTopProps> = ({ lang }) => {
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);

  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > window.innerHeight * 0.9;
    if (next !== visibleRef.current) {
      visibleRef.current = next;
      setVisible(next);
    }
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="to-top"
          type="button"
          className="to-top"
          aria-label={LABEL[lang]}
          title={LABEL[lang]}
          onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
          initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(12px) scale(0.96)' }}
          animate={{ opacity: 1, transform: reduce ? 'none' : 'translateY(0px) scale(1)' }}
          exit={{ opacity: 0, transform: reduce ? 'none' : 'translateY(12px) scale(0.96)' }}
          transition={{ duration: DURATION.ui, ease: EASE_OUT }}
        >
          <svg className="to-top-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle cx="24" cy="24" r="21" className="to-top-track" />
            <motion.circle cx="24" cy="24" r="21" className="to-top-progress" style={{ pathLength: scrollYProgress }} />
          </svg>
          <span className="to-top-icon">
            <ArrowUp size={18} />
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
