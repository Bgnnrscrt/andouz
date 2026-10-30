import React, { useState } from 'react';
import {
  Home,
  Layers,
  BarChart3,
  FileText,
  Headphones,
  Globe,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles
} from 'lucide-react';
import { Language, AppId } from '../../types';
import { PortalSection } from '../../portalTypes';
import { portalI18n } from '../../portalTranslations';
import './Sidebar.css';

interface SidebarProps {
  lang: Language;
  activeSection: PortalSection;
  activeProject?: AppId;
  onNavigate: (section: PortalSection, appId?: AppId) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  lang,
  activeSection,
  activeProject,
  onNavigate,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const t = portalI18n[lang].sidebar;
  const [projectsExpanded, setProjectsExpanded] = useState<boolean>(true);

  const handleItemClick = (section: PortalSection, appId?: AppId) => {
    if (section === 'projects' && !appId) {
      setProjectsExpanded((prev) => !prev);
      onNavigate('projects', activeProject || 'andogram');
    } else {
      onNavigate(section, appId);
    }
    if (window.innerWidth <= 900) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      <div
        className={`ptl-sidebar-backdrop ${mobileOpen ? 'open' : ''}`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside className={`ptl-sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Sidebar Header / Brand */}
        <div className="ptl-sidebar-header">
          <div
            className="ptl-brand"
            onClick={() => handleItemClick('home')}
            style={{ cursor: 'pointer' }}
          >
            <div className="ptl-brand-logo">
              <img src="/logo-96.webp" alt="ANDO" width="24" height="24" />
            </div>
            <div className="ptl-brand-text">
              <span className="ptl-brand-name">{t.brand}</span>
              <span className="ptl-brand-badge">{t.brandTag}</span>
            </div>
          </div>

          <button
            className="ptl-toggle-btn"
            onClick={onToggleCollapse}
            title={collapsed ? t.expand : t.collapse}
            aria-label={collapsed ? t.expand : t.collapse}
          >
            {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </button>
        </div>

        {/* Navigation list */}
        <nav className="ptl-nav">
          {/* Group 1: Main */}
          <div className="ptl-nav-group">
            <span className="ptl-group-label">{t.groupMain}</span>

            {/* Home */}
            <button
              type="button"
              className={`ptl-nav-item ${activeSection === 'home' ? 'active' : ''}`}
              onClick={() => handleItemClick('home')}
              title={t.home}
            >
              <span className="ptl-nav-icon">
                <Home size={19} />
              </span>
              <span className="ptl-nav-text">{t.home}</span>
            </button>

            {/* Projects (Expandable) */}
            <div>
              <button
                type="button"
                className={`ptl-nav-item ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => handleItemClick('projects')}
                title={t.projects}
              >
                <span className="ptl-nav-icon">
                  <Layers size={19} />
                </span>
                <span className="ptl-nav-text">{t.projects}</span>
                <span className="ptl-badge-pill">2 APK</span>
                <ChevronRight
                  size={15}
                  className={`ptl-nav-arrow ${projectsExpanded ? 'expanded' : ''}`}
                />
              </button>

              {/* Sub items: AndoGram & Andusta */}
              {projectsExpanded && !collapsed && (
                <div className="ptl-sub-nav">
                  <button
                    type="button"
                    className={`ptl-sub-item ${activeSection === 'projects' && activeProject === 'andogram' ? 'active' : ''}`}
                    onClick={() => handleItemClick('projects', 'andogram')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="ptl-sub-dot" />
                      <span>{t.andogram}</span>
                    </div>
                    <span className="ptl-badge-pill" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>v10.9</span>
                  </button>

                  <button
                    type="button"
                    className={`ptl-sub-item ${activeSection === 'projects' && activeProject === 'andusta' ? 'active' : ''}`}
                    onClick={() => handleItemClick('projects', 'andusta')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="ptl-sub-dot" />
                      <span>{t.andusta}</span>
                    </div>
                    <span className="ptl-badge-pill" style={{ fontSize: '0.6rem', padding: '1px 5px', color: '#ff007f', borderColor: 'rgba(255,0,127,0.3)', background: 'rgba(255,0,127,0.1)' }}>v1.0</span>
                  </button>

                  <button
                    type="button"
                    className="ptl-sub-item"
                    style={{ opacity: 0.6 }}
                    onClick={() => handleItemClick('home')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span className="ptl-sub-dot" style={{ background: '#f59e0b' }} />
                      <span>{t.inDev}</span>
                    </div>
                    <Sparkles size={12} color="#f59e0b" />
                  </button>
                </div>
              )}
            </div>

            {/* Stats */}
            <button
              type="button"
              className={`ptl-nav-item ${activeSection === 'stats' ? 'active' : ''}`}
              onClick={() => handleItemClick('stats')}
              title={t.stats}
            >
              <span className="ptl-nav-icon">
                <BarChart3 size={19} />
              </span>
              <span className="ptl-nav-text">{t.stats}</span>
            </button>
          </div>

          {/* Group 2: Help & Resources */}
          <div className="ptl-nav-group">
            <span className="ptl-group-label">{t.groupInfo}</span>

            {/* Docs */}
            <button
              type="button"
              className={`ptl-nav-item ${activeSection === 'docs' ? 'active' : ''}`}
              onClick={() => handleItemClick('docs')}
              title={t.docs}
            >
              <span className="ptl-nav-icon">
                <FileText size={19} />
              </span>
              <span className="ptl-nav-text">{t.docs}</span>
            </button>

            {/* Support */}
            <button
              type="button"
              className={`ptl-nav-item ${activeSection === 'support' ? 'active' : ''}`}
              onClick={() => handleItemClick('support')}
              title={t.support}
            >
              <span className="ptl-nav-icon">
                <Headphones size={19} />
              </span>
              <span className="ptl-nav-text">{t.support}</span>
            </button>

            {/* Community */}
            <button
              type="button"
              className={`ptl-nav-item ${activeSection === 'community' ? 'active' : ''}`}
              onClick={() => handleItemClick('community')}
              title={t.community}
            >
              <span className="ptl-nav-icon">
                <Globe size={19} />
              </span>
              <span className="ptl-nav-text">{t.community}</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="ptl-sidebar-footer">
          <div className="ptl-status-card" title={t.statusOnline}>
            <span className="ptl-status-dot" />
            <span>{t.statusOnline}</span>
          </div>
          <div className="ptl-version-tag">
            {t.portalVersion}
          </div>
        </div>
      </aside>
    </>
  );
};

