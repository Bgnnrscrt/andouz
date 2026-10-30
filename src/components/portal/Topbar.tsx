import React from 'react';
import { Menu, Download } from 'lucide-react';
import { Language, AppId } from '../../types';
import { PortalSection } from '../../portalTypes';
import { portalI18n } from '../../portalTranslations';
import './Topbar.css';

interface TopbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  activeSection: PortalSection;
  activeProject?: AppId;
  onToggleSidebar: () => void;
  onOpenDownload: () => void;
}

const LANGUAGES: Language[] = ['uz', 'ru', 'en'];

export const Topbar: React.FC<TopbarProps> = ({
  lang,
  setLang,
  activeSection,
  activeProject,
  onToggleSidebar,
  onOpenDownload,
}) => {
  const t = portalI18n[lang];

  // Breadcrumbs title determination
  let currentTitle = t.sidebar.home;
  if (activeSection === 'projects') {
    currentTitle = activeProject === 'andusta' ? t.sidebar.andusta : t.sidebar.andogram;
  } else if (activeSection === 'stats') {
    currentTitle = t.sidebar.stats;
  } else if (activeSection === 'docs') {
    currentTitle = t.sidebar.docs;
  } else if (activeSection === 'support') {
    currentTitle = t.sidebar.support;
  } else if (activeSection === 'community') {
    currentTitle = t.sidebar.community;
  }

  return (
    <header className="ptl-topbar">
      {/* Left: Hamburger & breadcrumb */}
      <div className="ptl-topbar-left">
        <button
          type="button"
          className="ptl-menu-trigger"
          onClick={onToggleSidebar}
          aria-label="Toggle navigation"
        >
          <Menu size={20} />
        </button>

        <div className="ptl-breadcrumb">
          <span className="ptl-breadcrumb-root">{t.sidebar.brand}</span>
          <span className="ptl-breadcrumb-sep">/</span>
          <span className="ptl-breadcrumb-active">{currentTitle}</span>
        </div>
      </div>

      {/* Right: Status, Languages, Quick CTA */}
      <div className="ptl-topbar-right">
        <div className="ptl-system-badge">
          <span className="ptl-pulse-dot" />
          <span>{t.topbar.systemStatus}</span>
        </div>

        {/* Language switch */}
        <div className="ptl-lang-switcher" role="group" aria-label="Choose language">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              type="button"
              className={`ptl-lang-btn ${lang === l ? 'active' : ''}`}
              onClick={() => setLang(l)}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Download APK CTA */}
        <button
          type="button"
          className="ptl-quick-download-btn"
          onClick={onOpenDownload}
        >
          <Download size={16} />
          <span>{t.topbar.downloadBtn}</span>
        </button>
      </div>
    </header>
  );
};

