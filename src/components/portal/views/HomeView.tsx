import React from 'react';
import {
  ShieldCheck,
  Zap,
  Lock,
  ArrowRight,
  Download,
  Send,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { Language, AppId } from '../../../types';
import { PortalSection } from '../../../portalTypes';
import { portalI18n } from '../../../portalTranslations';
import { PhoneMockup } from '../../PhoneMockup';
import { FeatureMarquee } from '../../FeatureMarquee';
import './HomeView.css';

interface HomeViewProps {
  lang: Language;
  onNavigate: (section: PortalSection, appId?: AppId) => void;
  onOpenDownload: (appId: AppId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  lang,
  onNavigate,
  onOpenDownload,
}) => {
  const t = portalI18n[lang];

  return (
    <div className="ptl-home">
      {/* 1. Hero Portal Banner */}
      <section className="ptl-hero-banner">
        <div className="ptl-hero-badge">
          <Sparkles size={14} />
          <span>{t.home.heroBadge}</span>
        </div>

        <h1 className="ptl-hero-title">
          <span>{t.home.heroTitle}</span>
        </h1>

        <p className="ptl-hero-subtitle">
          {t.home.heroSubtitle}
        </p>

        <div className="ptl-hero-actions">
          <button
            type="button"
            className="ptl-btn-primary"
            onClick={() => onOpenDownload('andogram')}
          >
            <Download size={18} />
            <span>{t.home.btnDownload}</span>
          </button>

          <button
            type="button"
            className="ptl-btn-secondary"
            onClick={() => onNavigate('projects', 'andogram')}
          >
            <Layers size={18} />
            <span>{t.home.btnProjects}</span>
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Quick Highlights Stats */}
        <div className="ptl-hero-stats">
          <div className="ptl-hero-stat-card">
            <div className="ptl-stat-icon-wrapper">
              <Zap size={20} />
            </div>
            <div className="ptl-hero-stat-info">
              <span className="ptl-hero-stat-title">{t.home.statMods}</span>
              <span className="ptl-hero-stat-desc">{t.home.statModsDesc}</span>
            </div>
          </div>

          <div className="ptl-hero-stat-card">
            <div className="ptl-stat-icon-wrapper" style={{ color: '#00b4d8', background: 'rgba(0,180,216,0.1)' }}>
              <ShieldCheck size={20} />
            </div>
            <div className="ptl-hero-stat-info">
              <span className="ptl-hero-stat-title">{t.home.statSafe}</span>
              <span className="ptl-hero-stat-desc">{t.home.statSafeDesc}</span>
            </div>
          </div>

          <div className="ptl-hero-stat-card">
            <div className="ptl-stat-icon-wrapper" style={{ color: '#ff007f', background: 'rgba(255,0,127,0.1)' }}>
              <Lock size={20} />
            </div>
            <div className="ptl-hero-stat-info">
              <span className="ptl-hero-stat-title">{t.home.statPrivacy}</span>
              <span className="ptl-hero-stat-desc">{t.home.statPrivacyDesc}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Feature Marquee */}
      <FeatureMarquee lang={lang} />

      {/* 3. Flagship Products Grid */}
      <section>
        <div className="ptl-section-header">
          <h2 className="ptl-section-title">{t.home.flagshipHeading}</h2>
          <p className="ptl-section-subtitle">{t.home.flagshipSubheading}</p>
        </div>

        <div className="ptl-products-grid">
          {/* AndoGram Card */}
          <div className="ptl-product-card">
            <div className="ptl-prod-top">
              <div className="ptl-prod-icon gram">
                <Send size={26} />
              </div>
              <div className="ptl-prod-meta">
                <span className="ptl-prod-badge">v10.9.2</span>
                <span className="ptl-prod-badge">96.5 MB</span>
              </div>
            </div>

            <h3 className="ptl-prod-name">AndoGram</h3>
            <div className="ptl-prod-tagline">
              {lang === 'uz' ? 'Telegram ustidan 100% nazorat' : 'Автономный клиент Telegram на базе AyuGram'}
            </div>
            <p className="ptl-prod-desc">
              {lang === 'uz'
                ? 'Shaxsiy Arxiv ko‘prigi (A-B-C), No-Forwards cheklovini aylanib o‘tish, favqulodda PIN-kod (Honeypot) va og‘ir mediani saralash.'
                : 'Двустороннее дублирование диалогов в приватный форум 24/7, обход запрета на пересылку, скрытие чатов под принуждением.'}
            </p>

            <div className="ptl-prod-features-mini">
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? 'Shaxsiy Arxiv Ko‘prigi (A-B-C)' : 'Личный Архив & Мост 24/7'}</span>
              </div>
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? 'No-Forwards va FLAG_SECURE cheklovini yechish' : 'Обход No-Forwards и FLAG_SECURE'}</span>
              </div>
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? 'Honeypot: majburiy vaziyatlarda maxfiy chatlar' : 'Honeypot аварийный пин-код'}</span>
              </div>
            </div>

            <div className="ptl-prod-actions">
              <button
                type="button"
                className="ptl-card-btn-view"
                onClick={() => onNavigate('projects', 'andogram')}
              >
                <span>{lang === 'uz' ? 'Batafsil ko‘rish' : 'Подробнее о фичах'}</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="ptl-card-btn-dl"
                onClick={() => onOpenDownload('andogram')}
                title="Скачать APK"
              >
                <Download size={16} />
                <span>APK</span>
              </button>
            </div>
          </div>

          {/* Andusta Card */}
          <div className="ptl-product-card usta">
            <div className="ptl-prod-top">
              <div className="ptl-prod-icon usta">
                <Camera size={26} />
              </div>
              <div className="ptl-prod-meta">
                <span className="ptl-prod-badge">v1.0.0</span>
                <span className="ptl-prod-badge">Clone App</span>
              </div>
            </div>

            <h3 className="ptl-prod-name">Andusta</h3>
            <div className="ptl-prod-tagline">
              {lang === 'uz' ? 'Cheklovlarsiz va reklamasiz Instagram' : 'Автономный клон Instagram без Root-доступа'}
            </div>
            <p className="ptl-prod-desc">
              {lang === 'uz'
                ? 'Arvoh rejimi (Ghost Mode), o‘chirilgan xabarlarni saqlab qolish, o‘chuvchi fotosuratlarni cheksiz ko‘rish va Reels yuklash.'
                : 'Анонимный просмотр Stories и эфиров, сохранение удалённых сообщений в Direct, бесконечный просмотр View-Once фото/видео.'}
            </p>

            <div className="ptl-prod-features-mini">
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? 'Ghost Mode: anonim Stories va efirlar' : 'Ghost Mode: анонимные Stories'}</span>
              </div>
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? 'Anti-Unsend: o‘chirilgan xabarlar saqlanadi' : 'Anti-Unsend: сохранение удалённых Direct'}</span>
              </div>
              <div className="ptl-feature-row">
                <span className="ptl-feature-dot" />
                <span>{lang === 'uz' ? '1-klikda Reels va postlarni asl sifatda yuklash' : 'Скачивание Reels и Stories в 1 клик'}</span>
              </div>
            </div>

            <div className="ptl-prod-actions">
              <button
                type="button"
                className="ptl-card-btn-view"
                onClick={() => onNavigate('projects', 'andusta')}
              >
                <span>{lang === 'uz' ? 'Batafsil ko‘rish' : 'Подробнее о фичах'}</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                className="ptl-card-btn-dl"
                onClick={() => onOpenDownload('andusta')}
                title="Скачать APK"
              >
                <Download size={16} />
                <span>APK</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Interactive Phone Simulator */}
      <section style={{ marginTop: '20px' }}>
        <PhoneMockup lang={lang} />
      </section>
    </div>
  );
};

