import React, { useState } from 'react';
import {
  Send,
  Camera,
  Download,
  Shield,
  Archive,
  Layers,
  EyeOff,
  Trash2,
  Zap,
  Sparkles,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { Language, AppId } from '../../../types';
import { APPS_DATA } from '../../../data';
import { portalI18n } from '../../../portalTranslations';
import { ComparisonTable } from '../../ComparisonTable';
import './ProjectView.css';

interface ProjectViewProps {
  lang: Language;
  initialAppId?: AppId;
  onOpenDownload: (appId: AppId) => void;
  onSelectApp?: (appId: AppId) => void;
}

export const ProjectView: React.FC<ProjectViewProps> = ({
  lang,
  initialAppId = 'andogram',
  onOpenDownload,
  onSelectApp,
}) => {
  const [localAppId, setLocalAppId] = useState<AppId>(initialAppId);
  const selectedAppId = initialAppId || localAppId;

  const handleSwitchTab = (appId: AppId) => {
    setLocalAppId(appId);
    if (onSelectApp) {
      onSelectApp(appId);
    }
  };

  const t = portalI18n[lang];
  const app = APPS_DATA.find((a) => a.id === selectedAppId) || APPS_DATA[0];

  const renderIcon = (name: string) => {
    switch (name) {
      case 'Archive': return <Archive size={22} />;
      case 'Download': return <Download size={22} />;
      case 'Shield': return <Shield size={22} />;
      case 'Layers': return <Layers size={22} />;
      case 'Sparkles': return <Sparkles size={22} />;
      case 'EyeOff': return <EyeOff size={22} />;
      case 'Trash2': return <Trash2 size={22} />;
      case 'Camera': return <Camera size={22} />;
      case 'Zap': return <Zap size={22} />;
      default: return <Flame size={22} />;
    }
  };

  return (
    <div className="ptl-project-view">
      {/* 1. App Switcher Tabs */}
      <div className="ptl-project-tabs">
        <button
          type="button"
          className={`ptl-project-tab-btn gram ${selectedAppId === 'andogram' ? 'active' : ''}`}
          onClick={() => handleSwitchTab('andogram')}
        >
          <Send size={16} />
          <span>AndoGram (Telegram)</span>
        </button>

        <button
          type="button"
          className={`ptl-project-tab-btn usta ${selectedAppId === 'andusta' ? 'active' : ''}`}
          onClick={() => handleSwitchTab('andusta')}
        >
          <Camera size={16} />
          <span>Andusta (Instagram)</span>
        </button>
      </div>

      {/* 2. Main App Banner */}
      <div className={`ptl-app-banner ${selectedAppId === 'andusta' ? 'usta' : 'gram'}`}>
        <div className="ptl-app-banner-top">
          <div className="ptl-app-header-left">
            <div className={`ptl-app-main-icon ${selectedAppId === 'andusta' ? 'usta' : 'gram'}`}>
              {selectedAppId === 'andusta' ? <Camera size={38} /> : <Send size={38} />}
            </div>
            <div className="ptl-app-title-group">
              <h1 className="ptl-app-name">{app.name}</h1>
              <span className="ptl-app-tagline">{app.tagline[lang]}</span>
            </div>
          </div>

          <div className="ptl-app-actions">
            <button
              type="button"
              className="ptl-btn-primary"
              onClick={() => onOpenDownload(app.id)}
            >
              <Download size={18} />
              <span>{t.projects.downloadApk}</span>
            </button>
          </div>
        </div>

        <p className="ptl-app-desc">
          {app.description[lang]}
        </p>

        {/* Technical specs pills */}
        <div className="ptl-specs-grid">
          <div className="ptl-spec-item">
            <span className="ptl-spec-label">{t.projects.version}</span>
            <span className="ptl-spec-val">{app.version}</span>
          </div>

          <div className="ptl-spec-item">
            <span className="ptl-spec-label">{t.projects.size}</span>
            <span className="ptl-spec-val">{app.size}</span>
          </div>

          <div className="ptl-spec-item">
            <span className="ptl-spec-label">{t.projects.requirements}</span>
            <span className="ptl-spec-val">{app.minAndroid}</span>
          </div>

          <div className="ptl-spec-item">
            <span className="ptl-spec-label">{t.projects.updated}</span>
            <span className="ptl-spec-val">{app.updatedAt}</span>
          </div>
        </div>
      </div>

      {/* 3. Features Grid */}
      <section>
        <div className="ptl-section-header">
          <h2 className="ptl-section-title">{t.projects.allFeatures}</h2>
          <p className="ptl-section-subtitle">
            {lang === 'uz'
              ? `${app.name} ilovasida mavjud bo‘lgan barcha imkoniyatlar va eksklyuziv sozlamalar`
              : lang === 'en'
              ? `All exclusive features and settings available in ${app.name}`
              : `Эксклюзивный функционал и настройки, доступные в ${app.name}`}
          </p>
        </div>

        <div className="ptl-features-grid">
          {app.features.map((feat) => (
            <div
              key={feat.id}
              className={`ptl-feature-card ${selectedAppId === 'andusta' ? 'usta' : 'gram'}`}
            >
              <div className="ptl-feature-header">
                <div className="ptl-feature-icon">
                  {renderIcon(feat.iconName)}
                </div>
                {feat.tag && (
                  <span className="ptl-feature-tag">{feat.tag[lang]}</span>
                )}
              </div>

              <h3 className="ptl-feature-title">{feat.title[lang]}</h3>
              <p className="ptl-feature-desc">{feat.description[lang]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Comparison with official app */}
      <section>
        <ComparisonTable lang={lang} />
      </section>

      {/* 5. Changelog / Patch notes */}
      {app.changelog && app.changelog.length > 0 && (
        <section>
          <div className="ptl-section-header">
            <h2 className="ptl-section-title">{t.projects.changelogHeading}</h2>
            <p className="ptl-section-subtitle">v{app.changelog[0].version} ({app.changelog[0].date})</p>
          </div>

          <div className="ptl-changelog-card">
            <ul className="ptl-changelog-list">
              {app.changelog[0].items[lang].map((item, idx) => (
                <li key={idx} className="ptl-changelog-item">
                  <CheckCircle2 size={16} color={selectedAppId === 'andusta' ? '#ff007f' : '#00f59b'} style={{ marginTop: '2px', flexShrink: 0 }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};

