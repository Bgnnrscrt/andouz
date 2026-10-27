import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from 'motion/react';
import type { Variants } from 'motion/react';
import { ChevronRight, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { DURATION, EASE_OUT, SPRING } from '../lib/motion';
import { SegmentedControl } from './ui/SegmentedControl';
import type { SegmentOption } from './ui/SegmentedControl';
import { ScrambleText } from './fx/ScrambleText';
import { SECTION_IDS, useActiveSection } from './header/useActiveSection';
import type { SectionId } from './header/useActiveSection';
import './Header.css';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenDownload: () => void;
}

/** Below this width the nav collapses into the menu panel (keep in sync with Header.css). */
const DESKTOP_QUERY = '(min-width: 960px)';
/** Scroll distance after which the bar turns into solid glass. */
const SOLID_AFTER = 12;
const MENU_ID = 'hdr-menu';

const LABELS: Record<
  Language,
  {
    nav: string;
    demo: string;
    tagline: string;
    openMenu: string;
    closeMenu: string;
    language: string;
    languageAria: string;
    ctaShort: string;
  }
> = {
  ru: {
    nav: 'Основная навигация',
    demo: 'Демо',
    tagline: 'Экосистема',
    openMenu: 'Открыть меню',
    closeMenu: 'Закрыть меню',
    language: 'Язык',
    languageAria: 'Язык сайта',
    ctaShort: 'Скачать',
  },
  uz: {
    nav: 'Asosiy navigatsiya',
    demo: 'Demo',
    tagline: 'Ekotizim',
    openMenu: 'Menyuni ochish',
    closeMenu: 'Menyuni yopish',
    language: 'Til',
    languageAria: 'Sayt tili',
    ctaShort: 'Yuklab olish',
  },
  en: {
    nav: 'Main navigation',
    demo: 'Demo',
    tagline: 'Ecosystem',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    languageAria: 'Site language',
    ctaShort: 'Get Access',
  },
};

/** Language names are written in their own language, so each reads correctly to its speakers. */
const LANG_NAMES: Record<Language, string> = { ru: 'Русский', uz: 'O‘zbekcha', en: 'English' };
const LANGS: Language[] = ['ru', 'uz', 'en'];

/** Compact codes for the bar; screen readers get the full name. */
const LANG_CODES: SegmentOption<Language>[] = LANGS.map((l) => ({
  value: l,
  label: (
    <>
      <span aria-hidden="true">{l.toUpperCase()}</span>
      <span className="sr-only" lang={l}>
        {LANG_NAMES[l]}
      </span>
    </>
  ),
}));

/** Full names in the phone menu, where there is room for them. */
const LANG_FULL: SegmentOption<Language>[] = LANGS.map((l) => ({
  value: l,
  label: <span lang={l}>{LANG_NAMES[l]}</span>,
}));

const navLabel = (id: SectionId, lang: Language): string => {
  const t = translations.nav;
  switch (id) {
    case 'apps':
      return `${t.andogram[lang]} & ${t.andusta[lang]}`;
    case 'demo':
      return LABELS[lang].demo;
    case 'compare':
      return t.compare[lang];
    case 'install':
      return t.install[lang];
    case 'roadmap':
      return t.roadmap[lang];
  }
};

/*
 * Menu panel: drops from under the toggle (origin top right) and its rows follow 40ms apart.
 * It closes as one quick fade; rows reset only once the panel is invisible, so nothing jumps.
 */
const panelVariants = (reduce: boolean): Variants => ({
  closed: {
    opacity: 0,
    visibility: 'hidden',
    ...(reduce ? {} : { transform: 'translateY(-8px) scale(0.97)' }),
    transition: { duration: DURATION.press, ease: EASE_OUT },
  },
  open: {
    opacity: 1,
    visibility: 'visible',
    ...(reduce ? {} : { transform: 'translateY(0px) scale(1)' }),
    transition: {
      duration: DURATION.ui,
      ease: EASE_OUT,
      staggerChildren: reduce ? 0 : 0.04,
      delayChildren: reduce ? 0 : 0.04,
    },
  },
});

const rowVariants = (reduce: boolean): Variants => ({
  closed: {
    opacity: 0,
    ...(reduce ? {} : { transform: 'translateY(-6px)' }),
    transition: { duration: 0, delay: DURATION.fast },
  },
  open: {
    opacity: 1,
    ...(reduce ? {} : { transform: 'translateY(0px)' }),
    transition: { duration: reduce ? DURATION.fast : 0.3, ease: EASE_OUT },
  },
});

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenDownload }) => {
  const t = translations.nav;
  const L = LABELS[lang];
  const reduce = useReducedMotion() ?? false;

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(() => window.scrollY > SOLID_AFTER);
  const scrolledRef = useRef(scrolled);
  const burgerRef = useRef<HTMLButtonElement>(null);

  const { scrollY, scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, SPRING.soft);
  const { active, pin } = useActiveSection(scrollY, scrollYProgress);

  // Flip the glass state only when crossing the threshold, never per scroll frame.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const next = y > SOLID_AFTER;
    if (next === scrolledRef.current) return;
    scrolledRef.current = next;
    setScrolled(next);
  });

  // Escape closes the menu and hands focus back to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      burgerRef.current?.focus();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  // The panel only exists below the desktop breakpoint, so growing past it closes the menu.
  useEffect(() => {
    const mql = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Tabbing past the last menu item closes the menu instead of leaving it open over the page.
  const onBlur = (e: React.FocusEvent<HTMLElement>) => {
    const next = e.relatedTarget;
    if (open && next instanceof Node && !e.currentTarget.contains(next)) setOpen(false);
  };

  const goTo = (id: SectionId) => {
    pin(id);
    setOpen(false);
  };

  const openDownload = () => {
    setOpen(false);
    onOpenDownload();
  };

  const rows = rowVariants(reduce);

  return (
    <header className="hdr" data-solid={scrolled || open} data-open={open} onBlur={onBlur}>
      <div className="hdr-bg" aria-hidden="true" />
      <div className="hdr-scrim" aria-hidden="true" onClick={() => setOpen(false)} />

      <div className="container hdr-inner">
        <a href="#" className="hdr-brand" onClick={() => setOpen(false)}>
          <span className="hdr-logo">
            <img src="/logo-96.webp" width={42} height={42} alt="" className="hdr-logo-img" decoding="async" />
          </span>
          <span className="hdr-wordmark">
            <span className="hdr-wordmark-row">
              <span className="hdr-name">ANDO</span>
              <span className="hdr-tld">.UZ</span>
            </span>
            <span aria-hidden="true">
              <ScrambleText text={L.tagline} className="hdr-tagline" delay={260} duration={520} />
            </span>
          </span>
          <span className="sr-only"> — {t.home[lang]}</span>
        </a>

        <nav className="hdr-nav" aria-label={L.nav}>
          <ul className="hdr-nav-list">
            {SECTION_IDS.map((id, i) => {
              const isActive = active === id;
              return (
                <li key={id} style={{ '--i': i } as React.CSSProperties}>
                  <a
                    href={`#${id}`}
                    className={`hdr-link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => goTo(id)}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          layoutId="hdr-nav-active"
                          className="hdr-link-pill"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ layout: SPRING.snappy, opacity: { duration: DURATION.fast, ease: EASE_OUT } }}
                        />
                      )}
                    </AnimatePresence>
                    <span className="hdr-link-label">{navLabel(id, lang)}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="hdr-actions">
          <SegmentedControl
            className="hdr-lang"
            options={LANG_CODES}
            value={lang}
            onChange={setLang}
            layoutId="lang-switch"
            ariaLabel={L.languageAria}
            size="sm"
          />

          <span className="hdr-cta-wrap">
            <button type="button" className="btn btn-primary-ando btn-shine hdr-cta" onClick={openDownload}>
              <Sparkles size={16} aria-hidden="true" className="hdr-cta-icon" />
              <span className="hdr-cta-full">{t.getAccess[lang]}</span>
              <span className="hdr-cta-short">{L.ctaShort}</span>
            </button>
          </span>

          <button
            ref={burgerRef}
            type="button"
            className="hdr-burger"
            aria-expanded={open}
            aria-controls={MENU_ID}
            aria-label={open ? L.closeMenu : L.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="hdr-burger-line" />
            <span className="hdr-burger-line" />
          </button>
        </div>
      </div>

      <motion.div
        id={MENU_ID}
        className="hdr-panel"
        initial={false}
        animate={open ? 'open' : 'closed'}
        variants={panelVariants(reduce)}
        inert={!open}
      >
        <nav aria-label={L.nav}>
          <ul className="hdr-panel-list">
            {SECTION_IDS.map((id, i) => {
              const isActive = active === id;
              return (
                <motion.li key={id} variants={rows}>
                  <a
                    href={`#${id}`}
                    className={`hdr-panel-link${isActive ? ' is-active' : ''}`}
                    aria-current={isActive ? 'location' : undefined}
                    onClick={() => goTo(id)}
                  >
                    <span className="hdr-panel-index" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="hdr-panel-label">{navLabel(id, lang)}</span>
                    <ChevronRight size={18} aria-hidden="true" className="hdr-panel-arrow" />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <motion.div className="hdr-panel-lang" variants={rows}>
          <span className="hdr-panel-caption" aria-hidden="true">
            {L.language}
          </span>
          <SegmentedControl
            options={LANG_FULL}
            value={lang}
            onChange={setLang}
            layoutId="lang-switch-menu"
            ariaLabel={L.languageAria}
            fullWidth
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="hdr-progress"
        style={{ scaleX: reduce ? scrollYProgress : smoothProgress }}
        aria-hidden="true"
      />
    </header>
  );
};
