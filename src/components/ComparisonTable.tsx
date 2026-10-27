import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';
import { Language } from '../types';
import { TELEGRAM_COMPARISON, INSTAGRAM_COMPARISON } from '../data';
import { Check, X, Sparkles } from 'lucide-react';
import { DURATION, EASE_OUT, VIEWPORT, fade, fadeUp, staggerContainer } from '../lib/motion';
import { SectionHeader } from './ui/SectionHeader';
import { SegmentedControl } from './ui/SegmentedControl';
import './ComparisonTable.css';

interface ComparisonTableProps {
  lang: Language;
}

type Tab = 'telegram' | 'instagram';

const COLORS: Record<Tab, string> = { telegram: '#00b4d8', instagram: '#ff007f' };

const checkPop: Variants = {
  hidden: { opacity: 0, transform: 'scale(0.6)' },
  show: { opacity: 1, transform: 'scale(1)', transition: { type: 'spring', duration: 0.4, bounce: 0.3, delay: 0.12 } },
};

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<Tab>('telegram');
  const reduce = useReducedMotion();

  const rows = activeTab === 'telegram' ? TELEGRAM_COMPARISON : INSTAGRAM_COMPARISON;
  const activeColor = COLORS[activeTab];
  const rowVariants = reduce ? fade : fadeUp;
  const group = {
    initial: 'hidden',
    whileInView: 'show',
    viewport: VIEWPORT,
    exit: { opacity: 0, transition: { duration: DURATION.fast, ease: EASE_OUT } },
    variants: staggerContainer(reduce ? 0 : 0.05),
  } as const;

  const getLabels = () => {
    switch (lang) {
      case 'uz':
        return {
          badge: "To'g'ridan-to'g'ri taqqoslash",
          title: "Rasmiy Ilovalar Bilan Taqqoslash",
          subtitle: "Nega ilg'or foydalanuvchilar cheklangan rasmiy ilovalar o'rniga ANDO ekotizimini tanlashadi",
          tabsLabel: "Taqqoslanadigan ilovalar",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Imkoniyat / Funksiya",
          thOfficial: "Rasmiy Ilova",
          thAndo: "ANDO Versiyasi"
        };
      case 'en':
        return {
          badge: "Direct Comparison",
          title: "Comparison with Official Apps",
          subtitle: "Why power users choose ANDO ecosystem over restricted official clients",
          tabsLabel: "Apps to compare",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Feature / Capability",
          thOfficial: "Official App",
          thAndo: "ANDO Version"
        };
      default:
        return {
          badge: "Прямое сравнение",
          title: "Сравнение с Официальными Клиентами",
          subtitle: "Почему продвинутые пользователи выбирают экосистему ANDO вместо ограниченных стандартных приложений",
          tabsLabel: "Сравниваемые приложения",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Возможность / Функция",
          thOfficial: "Официальное приложение",
          thAndo: "Версия ANDO"
        };
    }
  };

  const l = getLabels();

  return (
    <section id="compare" className="cmp-section" style={{ '--cmp-color': activeColor } as React.CSSProperties}>
      <div className="container">
        <SectionHeader badge={l.badge} title={l.title} subtitle={l.subtitle}>
          <SegmentedControl
            ariaLabel={l.tabsLabel}
            layoutId="compare-tabs"
            idPrefix="cmp"
            value={activeTab}
            onChange={setActiveTab}
            options={[
              { value: 'telegram', label: l.tabGram, color: COLORS.telegram },
              { value: 'instagram', label: l.tabUsta, color: COLORS.instagram }
            ]}
          />
        </SectionHeader>

        <div className="glass-panel cmp-panel" role="tabpanel" id={`cmp-panel-${activeTab}`} aria-labelledby={`cmp-tab-${activeTab}`}>
          {/* Desktop / tablet: real table */}
          <table className="cmp-table">
            <thead>
              <tr>
                <th scope="col" className="cmp-th-feature">{l.thFeature}</th>
                <th scope="col" className="cmp-th-official">{l.thOfficial}</th>
                <th scope="col" className="cmp-th-ando">
                  <span className="cmp-th-ando-inner">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>{l.thAndo}</span>
                  </span>
                </th>
              </tr>
            </thead>
            <AnimatePresence mode="wait">
              <motion.tbody key={activeTab} {...group}>
                {rows.map((row, idx) => (
                  <motion.tr key={idx} variants={rowVariants}>
                    <th scope="row" className="cmp-feature">{row.feature[lang]}</th>
                    <td className="cmp-official">
                      <span className="cmp-cell">
                        <span className="cmp-icon cmp-icon--no" aria-hidden="true"><X size={12} /></span>
                        <span>{row.official[lang]}</span>
                      </span>
                    </td>
                    <td className="cmp-ando">
                      <span className="cmp-cell">
                        <motion.span className="cmp-icon cmp-icon--yes" variants={reduce ? fade : checkPop} aria-hidden="true">
                          <Check size={14} />
                        </motion.span>
                        <span>{row.ando[lang]}</span>
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </AnimatePresence>
          </table>

          {/* Phones: stacked cards */}
          <AnimatePresence mode="wait">
            <motion.ul key={activeTab} className="cmp-cards" {...group}>
              {rows.map((row, idx) => (
                <motion.li key={idx} className="cmp-card" variants={rowVariants}>
                  <div className="cmp-card-title">{row.feature[lang]}</div>
                  <div className="cmp-card-line cmp-official">
                    <span className="cmp-icon cmp-icon--no" aria-hidden="true"><X size={12} /></span>
                    <span><span className="cmp-card-label">{l.thOfficial}:</span> {row.official[lang]}</span>
                  </div>
                  <div className="cmp-card-line cmp-card-ando">
                    <motion.span className="cmp-icon cmp-icon--yes" variants={reduce ? fade : checkPop} aria-hidden="true">
                      <Check size={14} />
                    </motion.span>
                    <span><span className="cmp-card-label">{l.thAndo}:</span> {row.ando[lang]}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
