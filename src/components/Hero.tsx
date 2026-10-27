import React, { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import type { MotionProps } from 'motion/react';
import { Download, ShieldCheck, Zap, Lock, Smartphone, Star } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { EASE_OUT } from '../lib/motion';
import { ScrambleText } from './fx/ScrambleText';
import { trackSpotlight } from './fx/spotlight';
import { HeroBackdrop } from './hero/HeroBackdrop';
import { HeroEmblem } from './hero/HeroEmblem';
import { HeroTitle } from './hero/HeroTitle';
import { Magnetic } from './hero/Magnetic';
import { ScrollCue } from './hero/ScrollCue';
import './Hero.css';

interface HeroProps {
  lang: Language;
  onOpenDownload: () => void;
}

const LABELS = {
  statsLabel: { ru: 'Коротко об ANDO', uz: 'ANDO haqida qisqacha', en: 'ANDO at a glance' },
  scroll: { ru: 'Листайте вниз', uz: 'Pastga aylantiring', en: 'Scroll down' },
} as const;

type StatKey = 'stat1' | 'stat2' | 'stat3' | 'stat4';

interface Stat {
  key: StatKey;
  Icon: LucideIcon;
  /** Accent as "r, g, b" for the tinted icon tile and spotlight. */
  rgb: string;
  /** Icon micro-motion on card hover. */
  hover: string;
  sub: Record<Language, string>;
}

const STATS: Stat[] = [
  {
    key: 'stat1',
    Icon: Smartphone,
    rgb: '0, 245, 155',
    hover: 'rotate(-12deg) scale(1.08)',
    sub: { ru: 'Android 8.0 и новее', uz: 'Android 8.0 va yangilari', en: 'Android 8.0 and newer' },
  },
  {
    key: 'stat2',
    Icon: ShieldCheck,
    rgb: '0, 180, 216',
    hover: 'scale(1.14)',
    sub: { ru: '100% безопасно', uz: '100% xavfsiz', en: '100% safe' },
  },
  {
    key: 'stat3',
    Icon: Lock,
    rgb: '255, 0, 127',
    hover: 'translateY(-2px) scale(1.06)',
    sub: { ru: 'Ключи только на устройстве', uz: 'Kalitlar faqat qurilmada', en: 'Keys stay on your device' },
  },
  {
    key: 'stat4',
    Icon: Zap,
    rgb: '245, 158, 11',
    hover: 'rotate(14deg) scale(1.12)',
    sub: { ru: 'Поколение 2026', uz: '2026 avlodi', en: 'Generation 2026' },
  },
];

/** Load choreography in seconds (~1.3s end to end). */
const T = {
  badge: 0.1,
  title: 0.2,
  wordStagger: 0.06,
  subtitle: 0.56,
  cta: 0.66,
  ctaStagger: 0.07,
  stats: 0.78,
  statStagger: 0.05,
  cue: 1.5,
  /** After this, language switches no longer replay the intro. */
  settled: 1.9,
};

type EnterProps = Pick<MotionProps, 'initial' | 'animate' | 'transition'>;

/** Hyphenated words ("Root-прав", "Anti-ban") never split at the hyphen. */
const keepHyphenated = (text: string) =>
  text.split(' ').map((word, i, all) => (
    <React.Fragment key={i}>
      {word.includes('-') ? <span className="nowrap">{word}</span> : word}
      {i < all.length - 1 ? ' ' : null}
    </React.Fragment>
  ));

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDownload }) => {
  const t = translations.hero;
  const reduce = useReducedMotion();
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setIntro(false), T.settled * 1000);
    return () => window.clearTimeout(id);
  }, []);

  /** Entrance props: rise + fade (or opacity only under reduced motion). Mount-only, so re-renders never replay it. */
  const enter = (delay: number, y = 14, duration = 0.55): EnterProps =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3, delay: delay * 0.4, ease: EASE_OUT } }
      : {
          initial: { opacity: 0, transform: `translateY(${y}px)` },
          animate: { opacity: 1, transform: 'translateY(0px)', transitionEnd: { transform: 'none' } },
          transition: { duration, delay, ease: EASE_OUT },
        };

  const emblemEnter: EnterProps = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, ease: EASE_OUT } }
    : {
        initial: { opacity: 0, transform: 'scale(0.92)', filter: 'blur(8px)' },
        animate: { opacity: 1, transform: 'scale(1)', filter: 'blur(0px)', transitionEnd: { transform: 'none', filter: 'none' } },
        transition: { duration: 0.9, ease: EASE_OUT },
      };

  // The ⚡ emoji in the copy duplicates the Zap icon (and renders differently per OS).
  const badge = t.badge[lang].replace(/^\s*⚡\s*/u, '');

  return (
    <section className="hero" aria-labelledby="hero-title">
      <HeroBackdrop />

      <div className="container hero-inner">
        <motion.div className="hero-emblem-slot" {...emblemEnter}>
          <HeroEmblem />
        </motion.div>

        <motion.div className="hero-badge-slot" {...enter(T.badge, 10)}>
          <span className="badge-pill badge-ando hero-badge">
            <Zap size={14} />
            <ScrambleText text={badge} delay={240} duration={700} />
          </span>
        </motion.div>

        <HeroTitle
          id="hero-title"
          start={t.titleStart[lang]}
          gradient={t.titleGradient[lang]}
          delay={T.title}
          stagger={T.wordStagger}
          intro={intro}
        />

        <motion.p className="hero-subtitle" {...enter(T.subtitle, 12, 0.6)}>
          {t.subtitle[lang]}
        </motion.p>

        <div className="hero-ctas">
          <motion.div className="hero-cta-slot" {...enter(T.cta)}>
            <Magnetic className="hero-magnet">
              <button type="button" onClick={onOpenDownload} className="btn btn-primary-ando btn-shine hero-cta hero-cta--primary">
                <span className="hero-cta-ring" aria-hidden="true" />
                <Download size={20} />
                <span>{t.btnDownload[lang]}</span>
              </button>
            </Magnetic>
          </motion.div>

          <motion.div className="hero-cta-slot" {...enter(T.cta + T.ctaStagger)}>
            <a href="#apps" className="btn btn-outline hero-cta">
              <Smartphone size={20} className="hero-cta-icon-ando" />
              <span>{t.btnExplore[lang]}</span>
            </a>
          </motion.div>

          <motion.div className="hero-cta-slot" {...enter(T.cta + T.ctaStagger * 2)}>
            <button type="button" onClick={onOpenDownload} className="btn btn-stars hero-cta hero-cta--stars">
              <Star size={18} fill="#0c0802" />
              <span>{t.btnStars[lang]}</span>
            </button>
          </motion.div>
        </div>

        <ul className="hero-stats" role="list" aria-label={LABELS.statsLabel[lang]}>
          {STATS.map(({ key, Icon, rgb, hover, sub }, i) => (
            <motion.li key={key} className="hero-stat-slot" {...enter(T.stats + i * T.statStagger, 16, 0.5)}>
              <div
                className="glass-panel spotlight hero-stat"
                style={{ '--stat-rgb': rgb, '--stat-hover': hover } as CSSProperties}
                onPointerMove={trackSpotlight}
              >
                <span className="hero-stat-icon">
                  <Icon size={22} />
                </span>
                <span className="hero-stat-text">
                  <span className="hero-stat-title">{keepHyphenated(t[key][lang])}</span>
                  <span className="hero-stat-sub">{sub[lang]}</span>
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>

      <ScrollCue label={LABELS.scroll[lang]} delay={reduce ? 0.3 : T.cue} />
    </section>
  );
};
