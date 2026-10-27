import React, { useRef } from 'react';
import { useInView } from 'motion/react';
import { Language } from '../types';
import { translations } from '../translations';
import { Download, Settings, ShieldCheck, HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Reveal } from './fx/Reveal';
import { trackSpotlight } from './fx/spotlight';
import { SectionHeader } from './ui/SectionHeader';
import './InstallGuide.css';

interface InstallGuideProps {
  lang: Language;
}

interface Step {
  Icon: LucideIcon;
  /** Accent as "r, g, b". */
  rgb: string;
  title: Record<Language, string>;
  desc: Record<Language, string>;
}

/** Strips the "1. " prefix from the translation titles — the number now lives in the timeline bubble. */
const stripNumber = (s: string) => s.replace(/^\d+\.\s*/, '');

export const InstallGuide: React.FC<InstallGuideProps> = ({ lang }) => {
  const t = translations.install;
  const stepsRef = useRef<HTMLOListElement>(null);
  const inView = useInView(stepsRef, { once: true, margin: '0px 0px -120px 0px' });

  const steps: Step[] = [
    { Icon: Download, rgb: '0, 245, 155', title: t.steps.s1Title, desc: t.steps.s1Desc },
    { Icon: Settings, rgb: '0, 180, 216', title: t.steps.s2Title, desc: t.steps.s2Desc },
    { Icon: ShieldCheck, rgb: '255, 0, 127', title: t.steps.s3Title, desc: t.steps.s3Desc }
  ];

  const getNotice = () => {
    switch (lang) {
      case 'uz':
        return {
          title: "Android noma'lum manba haqida ogohlantirishi mumkin",
          desc: "Bu Google Play Store'dan tashqari yuklab olingan har qanday mustaqil APK uchun standart himoya xabari. Ilovalarimizda zararli kod yo'q. 'Baribir o'rnatish' (Install anyway) tugmasini bosing.",
          step: 'Qadam'
        };
      case 'en':
        return {
          title: "Android system notice for Unknown Sources",
          desc: "This is a standard Android prompt shown for any APK installed outside the Play Store. ANDO builds contain zero telemetry or adware. Simply tap 'Install anyway'.",
          step: 'Step'
        };
      default:
        return {
          title: "Предупреждение Android о неизвестных источниках",
          desc: "Это стандартное уведомление системы безопасности для любого APK-файла, скачанного вне Google Play. В приложениях ANDO нет вредоносного кода и рекламы. Нажмите «Все равно установить» (Install anyway).",
          step: 'Шаг'
        };
    }
  };

  const n = getNotice();

  return (
    <section id="install" className="install-section">
      <div className="container">
        <SectionHeader badge={t.badge[lang]} title={t.title[lang]} subtitle={t.subtitle[lang]} />

        <ol ref={stepsRef} className={`install-steps${inView ? ' is-visible' : ''}`}>
          {steps.map(({ Icon, rgb, title, desc }, i) => (
            <li key={i} className="install-step" style={{ '--i': i, '--step-rgb': rgb } as React.CSSProperties}>
              <span className="install-num" aria-hidden="true">{i + 1}</span>
              {i < steps.length - 1 && <span className="install-link" aria-hidden="true" />}
              <Reveal delay={i * 0.12} className="install-card-slot">
                <div className="glass-panel spotlight install-card" onPointerMove={trackSpotlight}>
                  <div className="install-icon">
                    <Icon size={24} />
                  </div>
                  <h3>
                    <span className="sr-only">{n.step} {i + 1}. </span>
                    {stripNumber(title[lang])}
                  </h3>
                  <p>{desc[lang]}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Play Protect Notice Banner */}
        <Reveal>
          <div className={`install-notice${inView ? ' is-visible' : ''}`} role="note">
            <div className="install-notice-icon">
              <HelpCircle size={22} />
            </div>
            <div>
              <div className="install-notice-title">{n.title}</div>
              <div className="install-notice-desc">{n.desc}</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
