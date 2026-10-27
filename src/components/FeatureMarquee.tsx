import React from 'react';
import { Archive, Lock, Ghost, Shield, Eye, Sparkles, Smartphone, FolderDown, Zap, Download } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Language } from '../types';
import './FeatureMarquee.css';

interface FeatureMarqueeProps {
  lang: Language;
}

interface Chip {
  Icon: LucideIcon;
  color: string;
  label: Record<Language, string>;
}

const ROW_A: Chip[] = [
  { Icon: Archive, color: '#00b4d8', label: { ru: 'Мост архива A-B-C', uz: 'A-B-C arxiv ko‘prigi', en: 'A-B-C archive bridge' } },
  { Icon: Lock, color: '#00f59b', label: { ru: 'Honeypot-пароли', uz: 'Honeypot parollari', en: 'Duress passcodes' } },
  { Icon: Download, color: '#00b4d8', label: { ru: 'Обход No-Forwards', uz: 'Saqlash taqiqini chetlash', en: 'No-Forwards bypass' } },
  { Icon: FolderDown, color: '#00b4d8', label: { ru: 'Сортировка медиа по размеру', uz: 'Mediani hajm bo‘yicha saralash', en: 'Media size sorter' } },
  { Icon: Sparkles, color: '#00f59b', label: { ru: '3D AR-маски', uz: '3D AR-niqoblar', en: '3D AR masks' } },
  { Icon: Smartphone, color: '#00f59b', label: { ru: 'Без Root-прав', uz: 'Root talab qilinmaydi', en: 'No root required' } },
];

const ROW_B: Chip[] = [
  { Icon: Ghost, color: '#ff007f', label: { ru: 'Ghost Mode', uz: 'Arvoh rejimi', en: 'Ghost Mode' } },
  { Icon: Shield, color: '#ff007f', label: { ru: 'Анти-удаление в Direct', uz: 'Directda o‘chirishga qarshi', en: 'Direct anti-unsend' } },
  { Icon: Eye, color: '#ff007f', label: { ru: 'Бесконечный View-Once', uz: 'Cheksiz View-Once', en: 'Unlimited view-once' } },
  { Icon: Download, color: '#f59e0b', label: { ru: 'Загрузчик Reels и Stories', uz: 'Reels va Stories yuklovchi', en: 'Reels & Stories downloader' } },
  { Icon: Zap, color: '#f59e0b', label: { ru: 'Без рекламы', uz: 'Reklamasiz', en: 'Zero ads' } },
  { Icon: Lock, color: '#00f59b', label: { ru: 'Данные остаются на телефоне', uz: 'Ma’lumotlar telefonda qoladi', en: 'Data stays on your phone' } },
];

const Track: React.FC<{ chips: Chip[]; lang: Language; hidden?: boolean }> = ({ chips, lang, hidden }) => (
  <ul className="marquee-track" aria-hidden={hidden || undefined}>
    {chips.map(({ Icon, color, label }) => (
      <li key={label.en} className="marquee-chip" style={{ '--chip-color': color } as React.CSSProperties}>
        <Icon size={15} aria-hidden="true" />
        <span>{label[lang]}</span>
      </li>
    ))}
  </ul>
);

/** Two counter-scrolling rows of feature chips between the hero and the apps. Pure CSS loop. */
export const FeatureMarquee: React.FC<FeatureMarqueeProps> = ({ lang }) => (
  <div className="marquee" role="region" aria-label={{ ru: 'Возможности', uz: 'Imkoniyatlar', en: 'Features' }[lang]}>
    {[ROW_A, ROW_B].map((row, i) => (
      <div key={i} className={`marquee-row${i === 1 ? ' marquee-row--reverse' : ''}`}>
        <div className="marquee-inner">
          <Track chips={row} lang={lang} />
          <Track chips={row} lang={lang} hidden />
        </div>
      </div>
    ))}
  </div>
);
