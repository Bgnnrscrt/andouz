import React, { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence, motion, animate, useInView, useMotionTemplate, useMotionValue, useReducedMotion,
} from 'motion/react';
import type { LucideIcon } from 'lucide-react';
import { Archive, Lock, FolderDown, Ghost, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';
import { SectionHeader } from './ui/SectionHeader';
import { SegmentedControl } from './ui/SegmentedControl';
import type { SegmentOption } from './ui/SegmentedControl';
import { useTilt } from '../hooks/useTilt';
import { DURATION, EASE_OUT } from '../lib/motion';
import { TAB_ORDER, SCENE_COLOR, underHood, benefits, autoplayLabel, scenes } from './demo/copy';
import type { DemoTab } from './demo/copy';
import { ArchiveScene, HoneypotScene, MediaSortScene, GhostScene, ViewOnceScene } from './demo/Scenes';
import './PhoneMockup.css';

const SCENE_COMPONENTS: Record<DemoTab, React.FC<{ lang: Language }>> = {
  archive: ArchiveScene,
  honeypot: HoneypotScene,
  mediasort: MediaSortScene,
  ghost: GhostScene,
  viewonce: ViewOnceScene,
};

interface PhoneMockupProps {
  lang: Language;
}

const TAB_ICONS: Record<DemoTab, LucideIcon> = {
  archive: Archive,
  honeypot: Lock,
  mediasort: FolderDown,
  ghost: Ghost,
  viewonce: Eye,
};

/** One autoplay cycle, in seconds. */
const CYCLE = 6.5;

const ARIA_TABS: Record<Language, string> = {
  ru: 'Сценарии демонстрации',
  uz: 'Namoyish ssenariylari',
  en: 'Demo scenarios',
};

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ lang }) => {
  const t = translations.mockup;
  const reduce = useReducedMotion();

  const [activeTab, setActiveTab] = useState<DemoTab>('archive');
  const [userInteracted, setUserInteracted] = useState(false);
  const [hidden, setHidden] = useState(() => document.hidden);

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const tilt = useTilt<HTMLDivElement>(5);

  const progress = useMotionValue(0);
  const fillTransform = useMotionTemplate`scaleX(${progress})`;

  // Pause autoplay when the tab is backgrounded.
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, []);

  const autoplay = !userInteracted && inView && !hidden && !reduce;

  // Cycle scenarios while autoplaying; the progress value drives the fill below.
  useEffect(() => {
    if (!autoplay) return;
    progress.set(0);
    const controls = animate(progress, 1, {
      duration: CYCLE,
      ease: 'linear',
      onComplete: () => {
        setActiveTab((prev) => TAB_ORDER[(TAB_ORDER.indexOf(prev) + 1) % TAB_ORDER.length]);
      },
    });
    return () => controls.stop();
  }, [autoplay, activeTab, progress]);

  const onTabChange = (tab: DemoTab) => {
    setUserInteracted(true);
    setActiveTab(tab);
  };

  const options: SegmentOption<DemoTab>[] = TAB_ORDER.map((tab) => {
    const Icon = TAB_ICONS[tab];
    return {
      value: tab,
      label: t.tabs[tab][lang],
      icon: <Icon size={16} color={SCENE_COLOR[tab]} aria-hidden />,
      color: SCENE_COLOR[tab],
    };
  });

  const Scene = SCENE_COMPONENTS[activeTab];
  const accent = SCENE_COLOR[activeTab];
  const showAutoplay = !userInteracted && !reduce;

  return (
    <section id="demo" ref={sectionRef} className="demo-section">
      <div className="container">
        <SectionHeader badge={t.badge[lang]} badgeIcon={<Sparkles size={14} />} title={t.title[lang]} subtitle={t.subtitle[lang]}>
          <div className="demo-controls">
            <SegmentedControl
              options={options}
              value={activeTab}
              onChange={onTabChange}
              layoutId="demo-tabs"
              idPrefix="demo"
              variant="pills"
              ariaLabel={ARIA_TABS[lang]}
            />
            {showAutoplay && (
              <div className="demo-autoplay">
                <span className="demo-autoplay-label">{autoplayLabel[lang]}</span>
                <div className="demo-progress-track" aria-hidden>
                  <motion.div
                    className="demo-progress-fill"
                    style={{ transform: fillTransform, transformOrigin: 'left', background: accent }}
                  />
                </div>
              </div>
            )}
          </div>
        </SectionHeader>

        <div className="demo-stage">
          {/* Phone: tilt wrapper (owns transform) → float wrapper (CSS) → frame */}
          <motion.div
            {...tilt}
            className="phone-tilt"
          >
            <div className="phone-float">
              <div className="phone-glow" aria-hidden style={{ '--phone-accent': accent } as React.CSSProperties} />
              <div className="phone-frame" style={{ '--phone-accent': accent } as React.CSSProperties}>
                <div className="phone-punchhole" aria-hidden />
                <div className="phone-screen">
                  <div
                    role="tabpanel"
                    id={`demo-panel-${activeTab}`}
                    aria-labelledby={`demo-tab-${activeTab}`}
                    tabIndex={0}
                    className="demo-scene-stack"
                  >
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={activeTab}
                        className="demo-scene"
                        initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(12px)', filter: 'blur(6px)' }}
                        animate={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)', filter: 'blur(0px)' }}
                        exit={reduce
                          ? { opacity: 0, transition: { duration: DURATION.ui } }
                          : { opacity: 0, transform: 'translateY(-10px)', filter: 'blur(4px)', transition: { duration: 0.3, ease: EASE_OUT } }}
                        transition={{ duration: DURATION.scene, ease: EASE_OUT }}
                      >
                        <Scene lang={lang} />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                <div className="phone-glare" aria-hidden />
                <div className="phone-bottom-bar" aria-hidden />
              </div>
            </div>
          </motion.div>

          {/* Side explanation — crossfades in sync with the scene */}
          <div className="demo-side">
            <span className="badge-pill badge-ando demo-side-badge">
              <Sparkles size={13} aria-hidden />
              {underHood[lang]}
            </span>

            <div className="demo-side-copy">
              <AnimatePresence initial={false}>
                <motion.div
                  key={activeTab}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, transform: 'translateY(10px)' }}
                  animate={reduce ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }}
                  exit={reduce
                    ? { opacity: 0, transition: { duration: DURATION.ui } }
                    : { opacity: 0, transform: 'translateY(-8px)', transition: { duration: 0.25, ease: EASE_OUT } }}
                  transition={{ duration: DURATION.scene, ease: EASE_OUT }}
                >
                  <h3 className="demo-side-title" style={{ color: accent }}>{scenes[activeTab].title[lang]}</h3>
                  <p className="demo-side-desc">{scenes[activeTab].desc[lang]}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <ul className="demo-benefits">
              {benefits.map((b, i) => (
                <li key={i}>
                  <CheckCircle2 size={18} color="#00f59b" aria-hidden />
                  <span>{b[lang]}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
