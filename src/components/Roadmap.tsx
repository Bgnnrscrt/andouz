import React, { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';
import { Check, CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';
import { EASE_OUT } from '../lib/motion';
import { Stagger, StaggerItem, Reveal } from './fx/Reveal';
import { trackSpotlight } from './fx/spotlight';
import { SectionHeader } from './ui/SectionHeader';
import './Roadmap.css';

interface RoadmapProps {
  lang: Language;
}

type Status = 'done' | 'progress' | 'idea';

/** Illustrative build progress of the in-development milestone. */
const PROGRESS = 60;

/** Percentage that counts up the first time it scrolls into view. */
const CountUp: React.FC<{ to: number }> = ({ to }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (v) => {
        el.textContent = `${Math.round(v)}%`;
      }
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref} className="rm-percent">{to}%</span>;
};

export const Roadmap: React.FC<RoadmapProps> = ({ lang }) => {
  const t = translations.roadmap;
  const railRef = useRef<HTMLOListElement>(null);
  const inView = useInView(railRef, { once: true, margin: '0px 0px -120px 0px' });

  const getCards = (): { status: string; title: string; desc: string; color: string; kind: Status }[] => {
    switch (lang) {
      case 'uz':
        return [
          { status: "Chiqarildi", title: "AndoGram v10.9.2", desc: "A-B-C Arxiv ko'prigi, MTProto fayllarni hajm bo'yicha saralash, Honeypot parollari, 3D AR-niqoblar.", color: "#00b4d8", kind: 'done' },
          { status: "Chiqarildi", title: "Andusta v1.0.0", desc: "Avtonom com.andusta.android paketi, Arvoh rejimi, Directda o'chirishga qarshi himoya, View-Once cheksiz ko'rish.", color: "#ff007f", kind: 'done' },
          { status: "Ishlab chiqilmoqda", title: "AndoTube", desc: "YouTube uchun erkin mijoz: orqa fonda ijro, reklama bloklash, 4K yuklash va SponsorBlock integratsiyasi.", color: "#00f59b", kind: 'progress' },
          { status: "Rejada", title: "AndoVPN", desc: "VLESS/XTLS protokollari asosidagi xavfsiz va tezkor shaxsiy tunnel xizmati.", color: "#f59e0b", kind: 'idea' }
        ];
      case 'en':
        return [
          { status: "Released", title: "AndoGram v10.9.2", desc: "A-B-C Archive bridge, MTProto size sorter, Duress Honeypot passcodes, 3D AR masks.", color: "#00b4d8", kind: 'done' },
          { status: "Released", title: "Andusta v1.0.0", desc: "Autonomous com.andusta.android clone, Ghost Mode, Direct anti-unsend, Unlimited view-once media.", color: "#ff007f", kind: 'done' },
          { status: "In Development", title: "AndoTube", desc: "Libre YouTube client: background playback, ad blocking, 4K video downloader, and SponsorBlock.", color: "#00f59b", kind: 'progress' },
          { status: "Planned", title: "AndoVPN", desc: "High-speed encrypted tunnel built on modern VLESS/XTLS protocols for complete internet freedom.", color: "#f59e0b", kind: 'idea' }
        ];
      default:
        return [
          { status: "Выпущено", title: "AndoGram v10.9.2", desc: "Мост Архива A-B-C, умная сортировка медиа по размеру, Honeypot-пароли, аппаратные 3D AR-маски.", color: "#00b4d8", kind: 'done' },
          { status: "Выпущено", title: "Andusta v1.0.0", desc: "Автономный клон com.andusta.android, Режим невидимки, Анти-удаление в Direct, обход одноразовых медиа.", color: "#ff007f", kind: 'done' },
          { status: "В разработке", title: "AndoTube", desc: "Свободный клиент YouTube: фоновое воспроизведение, пропуск спонсорских вставок, скачивание 4K и ноль рекламы.", color: "#00f59b", kind: 'progress' },
          { status: "В планах", title: "AndoVPN", desc: "Высокоскоростной защищённый туннель на протоколах VLESS/XTLS для полной свободы в сети.", color: "#f59e0b", kind: 'idea' }
        ];
    }
  };

  const progressLabel = { ru: 'Готовность', uz: 'Tayyorlik', en: 'Progress' }[lang];
  const cards = getCards();

  return (
    <section id="roadmap" className="rm-section">
      <div className="container">
        <SectionHeader badge={t.badge[lang]} title={t.title[lang]} subtitle={t.subtitle[lang]} />

        <ol ref={railRef} className={`rm-rail${inView ? ' is-visible' : ''}`} aria-hidden="true">
          {cards.map((card, idx) => (
            <li
              key={idx}
              className={`rm-node rm-node--${card.kind}${idx < cards.length - 1 ? ` rm-node--to-${cards[idx + 1].kind}` : ''}`}
              style={{ '--i': idx, '--node-color': card.color } as React.CSSProperties}
            >
              <span className="rm-dot">{card.kind === 'done' && <Check size={14} strokeWidth={3} />}</span>
              {idx < cards.length - 1 && <span className="rm-link" />}
            </li>
          ))}
        </ol>

        <Stagger className="rm-grid" stagger={0.08}>
          {cards.map((card, idx) => (
            <StaggerItem key={idx} className="rm-card-slot">
              <div
                className={`glass-panel spotlight rm-card rm-card--${card.kind}`}
                style={{ '--card-color': card.color } as React.CSSProperties}
                onPointerMove={trackSpotlight}
              >
                <div className="rm-status">
                  {card.kind === 'done' && <CheckCircle2 size={18} />}
                  {card.kind === 'progress' && (
                    <span className="rm-live" aria-hidden="true">
                      <Clock size={18} />
                    </span>
                  )}
                  {card.kind === 'idea' && <Sparkles size={18} />}
                  <span>{card.status}</span>
                </div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                {card.kind === 'progress' && (
                  <div className="rm-progress">
                    <div className="rm-progress-head">
                      <span>{progressLabel}</span>
                      <CountUp to={PROGRESS} />
                    </div>
                    <div className="rm-progress-track" role="progressbar" aria-valuenow={PROGRESS} aria-valuemin={0} aria-valuemax={100} aria-label={progressLabel}>
                      <span className="rm-progress-fill" style={{ '--p': PROGRESS / 100 } as React.CSSProperties} />
                    </div>
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Suggest Feature Callout */}
        <Reveal>
          <div className="rm-callout">
            <span className="rm-callout-border" aria-hidden="true" />
            <div>
              <h4>{t.suggestTitle[lang]}</h4>
              <p>{t.suggestDesc[lang]}</p>
            </div>

            <a
              href="https://t.me/ando_stars_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-shine rm-callout-btn"
            >
              <Send size={18} color="#00f59b" />
              <span>{t.btnSuggest[lang]}</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
