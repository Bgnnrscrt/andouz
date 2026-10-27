import React, { useId } from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';
import type { MotionStyle, Variants } from 'motion/react';
import { Archive, ArrowRight, Camera, Download, Eye, FolderDown, Ghost, Lock, Shield, Smartphone, Sparkles, Zap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Language, AppId, AppInfo } from '../types';
import { APPS_DATA } from '../data';
import { DURATION, EASE_IN_OUT, EASE_OUT, SPRING, VIEWPORT } from '../lib/motion';
import { useTilt } from '../hooks/useTilt';
import { useCanHover } from '../hooks/useMediaQuery';
import { trackSpotlight } from './fx/spotlight';
import { SectionHeader } from './ui/SectionHeader';
import './AppsShowcase.css';

interface AppsShowcaseProps {
  lang: Language;
  onSelectApp: (app: AppInfo) => void;
  onOpenDownload: (appId?: AppId) => void;
}

interface ShowcaseCopy {
  badge: string;
  title: string;
  subtitle: string;
  download: string;
  more: string;
  features: string;
}

const COPY: Record<Language, ShowcaseCopy> = {
  ru: {
    badge: 'Флагманы ANDO',
    title: 'Флагманские приложения',
    subtitle: 'Автономные, свободные и расширенные клиенты специально для Android',
    download: 'Скачать APK',
    more: 'Все возможности',
    features: 'Ключевые возможности',
  },
  uz: {
    badge: 'ANDO flagmanlari',
    title: 'Asosiy ilovalar',
    subtitle: 'Android qurilmalari uchun mustaqil, erkin va kengaytirilgan mijozlar',
    download: 'APK yuklab olish',
    more: 'Batafsil',
    features: 'Asosiy imkoniyatlar',
  },
  en: {
    badge: 'ANDO Flagships',
    title: 'Flagship Applications',
    subtitle: 'Independent, liberated power-user clients built exclusively for Android',
    download: 'Download APK',
    more: 'All specs',
    features: 'Key features',
  },
};

/* ---------- Shared pieces (also used by AppDetailsModal) ---------- */

const FEATURE_ICONS: Record<string, LucideIcon> = { Archive, Camera, Download, Eye, FolderDown, Ghost, Lock, Shield, Sparkles, Zap };

/** Lucide icon for a feature's `iconName` in data.ts; unknown names fall back to Sparkles. */
export const FeatureIcon: React.FC<{ name: string; size?: number }> = ({ name, size = 18 }) => {
  const Icon = FEATURE_ICONS[name] ?? Sparkles;
  return <Icon size={size} aria-hidden="true" />;
};

const MONOGRAM: Record<AppId, string> = { andogram: 'AG', andusta: 'AU' };

interface AppIconProps {
  app: AppInfo;
  size?: 'md' | 'lg';
  /** Seconds before the first idle glint, so neighbouring tiles never flash in sync. */
  glintDelay?: number;
}

/** Gradient monogram tile with a slow idle glint. Decorative: the app name is always in a heading next to it. */
export const AppIcon: React.FC<AppIconProps> = ({ app, size = 'md', glintDelay = 0 }) => (
  <span
    className={`app-tile app-tile-${size}`}
    aria-hidden="true"
    style={{ '--app-color': app.color, '--app-gradient': app.gradient, '--glint-delay': `${glintDelay}s` } as React.CSSProperties}
  >
    {MONOGRAM[app.id]}
  </span>
);

/* ---------- Reveal choreography ---------- */

const CARD_STAGGER = 0.08;
const ROW_STAGGER = 0.05;

/*
 * Each card reveals itself when it scrolls in (side by side on desktop, one by one on phones);
 * the card index offsets the second card by 80ms. Its variant children (the top edge line,
 * then the feature rows) follow 50ms apart once the card is mostly in place.
 */
const CARD_VARIANTS: Variants = {
  hidden: { opacity: 0, transform: 'translateY(28px)' },
  show: (i: number) => ({
    opacity: 1,
    transform: 'translateY(0px)',
    transitionEnd: { transform: 'none' },
    transition: {
      duration: DURATION.reveal,
      ease: EASE_OUT,
      delay: i * CARD_STAGGER,
      delayChildren: i * CARD_STAGGER + 0.2,
      staggerChildren: ROW_STAGGER,
    },
  }),
};

const ROW_VARIANTS: Variants = {
  hidden: { opacity: 0, transform: 'translateY(10px)' },
  show: {
    opacity: 1,
    transform: 'translateY(0px)',
    transitionEnd: { transform: 'none' },
    transition: { duration: DURATION.scene, ease: EASE_OUT },
  },
};

/** The neon top edge draws outward from the centre as the card powers on. */
const EDGE_VARIANTS: Variants = {
  hidden: { clipPath: 'inset(0px 50% 0px 50%)' },
  show: {
    clipPath: 'inset(0px 0% 0px 0%)',
    transitionEnd: { clipPath: 'none' },
    transition: { duration: 0.7, ease: EASE_IN_OUT },
  },
};

/* Reduced motion: the same sequence as plain fades, all at once. */
const FADE_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION.fast, ease: EASE_OUT } },
};

/* ---------- Card ---------- */

interface AppCardProps {
  app: AppInfo;
  index: number;
  lang: Language;
  copy: ShowcaseCopy;
  onSelectApp: (app: AppInfo) => void;
  onOpenDownload: (appId?: AppId) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, index, lang, copy, onSelectApp, onOpenDownload }) => {
  const reduce = useReducedMotion() ?? false;
  const canHover = useCanHover();
  const moving = canHover && !reduce;
  const titleId = useId();
  const { ref: tiltRef, style: tiltStyle, onPointerMove: tiltMove, onPointerLeave: tiltLeave } = useTilt<HTMLElement>(5);

  // Pointer position over the card (-0.5…0.5), smoothed. The icon and badge sit "above" the
  // card surface, so they drift toward the pointer a little more than the tilted plane does.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, SPRING.soft);
  const spy = useSpring(py, SPRING.soft);
  const iconX = useTransform(spx, (v) => v * 12);
  const iconY = useTransform(spy, (v) => v * 12);
  const badgeX = useTransform(spx, (v) => v * 7);
  const badgeY = useTransform(spy, (v) => v * 7);
  const iconTransform = useMotionTemplate`translate3d(${iconX}px, ${iconY}px, 0px)`;
  const badgeTransform = useMotionTemplate`translate3d(${badgeX}px, ${badgeY}px, 0px)`;

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    if (e.pointerType !== 'mouse') return;
    if (!reduce) {
      tiltMove(e);
      const r = e.currentTarget.getBoundingClientRect();
      px.set((e.clientX - r.left) / r.width - 0.5);
      py.set((e.clientY - r.top) / r.height - 0.5);
    }
    // Reads above, the one style write last: no forced layout between them.
    trackSpotlight(e);
  };

  const onPointerLeave = () => {
    tiltLeave();
    px.set(0);
    py.set(0);
  };

  const vars = { '--app-color': app.color, '--app-gradient': app.gradient } as MotionStyle;

  return (
    <motion.div
      id={`app-${app.id}`}
      className="apps-card-shell"
      style={vars}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={reduce ? FADE_VARIANTS : CARD_VARIANTS}
    >
      <motion.article
        ref={tiltRef}
        className="apps-card spotlight"
        aria-labelledby={titleId}
        style={moving ? tiltStyle : undefined}
        onPointerMove={canHover ? onPointerMove : undefined}
        onPointerLeave={canHover ? onPointerLeave : undefined}
      >
        <span className="apps-card-halo" aria-hidden="true" />
        <span className="apps-card-deco" aria-hidden="true" />
        <motion.span className="apps-card-edge" aria-hidden="true" variants={reduce ? FADE_VARIANTS : EDGE_VARIANTS} />

        <header className="apps-card-head">
          <div className="apps-card-id">
            <motion.span className="apps-depth" style={moving ? { transform: iconTransform } : undefined}>
              <AppIcon app={app} glintDelay={1.2 + index * 3.2} />
            </motion.span>
            <div className="apps-card-name">
              <h3 id={titleId}>{app.name}</h3>
              <span className="apps-card-version">{app.version}</span>
            </div>
          </div>
          <motion.span className="apps-depth" style={moving ? { transform: badgeTransform } : undefined}>
            <span className={`badge-pill apps-card-badge ${app.id === 'andogram' ? 'badge-gram' : 'badge-usta'}`}>
              {app.badge[lang]}
            </span>
          </motion.span>
        </header>

        <p className="apps-card-tagline">{app.tagline[lang]}</p>
        <p className="apps-card-desc">{app.description[lang]}</p>

        <ul className="apps-features" aria-label={copy.features}>
          {app.features.slice(0, 4).map((feat) => (
            <motion.li key={feat.id} className="apps-feature" variants={reduce ? FADE_VARIANTS : ROW_VARIANTS}>
              <span className="apps-feature-icon">
                <FeatureIcon name={feat.iconName} size={17} />
              </span>
              <span className="apps-feature-body">
                <span className="apps-feature-title">{feat.title[lang]}</span>
                {feat.tag && <span className="app-tag">{feat.tag[lang]}</span>}
              </span>
            </motion.li>
          ))}
        </ul>

        <div className="apps-card-actions">
          <button type="button" className="btn btn-shine apps-dl" onClick={() => onOpenDownload(app.id)}>
            <Download size={18} aria-hidden="true" />
            <span>{copy.download}</span>
            <span className="sr-only">{` ${app.name},`}</span>
            <span className="apps-dl-size">{app.size}</span>
          </button>
          <button type="button" className="btn btn-outline apps-more" onClick={() => onSelectApp(app)}>
            <span>{copy.more}</span>
            <span className="sr-only">{` ${app.name}`}</span>
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* ---------- Section ---------- */

export const AppsShowcase: React.FC<AppsShowcaseProps> = ({ lang, onSelectApp, onOpenDownload }) => {
  const copy = COPY[lang];

  return (
    <section id="apps" className="apps-section">
      <div className="apps-backdrop" aria-hidden="true" />
      <div className="container">
        <SectionHeader
          badge={copy.badge}
          badgeIcon={<Smartphone size={14} aria-hidden="true" />}
          title={copy.title}
          subtitle={copy.subtitle}
        />

        <div className="apps-grid">
          {APPS_DATA.map((app, i) => (
            <AppCard
              key={app.id}
              app={app}
              index={i}
              lang={lang}
              copy={copy}
              onSelectApp={onSelectApp}
              onOpenDownload={onOpenDownload}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
