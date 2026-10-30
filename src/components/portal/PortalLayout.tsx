import React, { useState, useEffect } from 'react';
import { Language, AppId } from '../../types';
import { PortalSection } from '../../portalTypes';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { HomeView } from './views/HomeView';
import { ProjectView } from './views/ProjectView';
import { StatsView } from './views/StatsView';
import { DocsView } from './views/DocsView';
import { SupportView } from './views/SupportView';
import { CommunityView } from './views/CommunityView';
import { Footer } from '../Footer';
import { BackToTop } from '../BackToTop';
import './PortalLayout.css';

interface PortalLayoutProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenDownload: (appId?: AppId) => void;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  lang,
  setLang,
  onOpenDownload,
}) => {
  // Read hash on load
  const parseHash = (): { section: PortalSection; project?: AppId } => {
    const hash = window.location.hash.replace(/^#\/?/, '');
    if (hash.startsWith('projects/andusta')) {
      return { section: 'projects', project: 'andusta' };
    }
    if (hash.startsWith('projects')) {
      return { section: 'projects', project: 'andogram' };
    }
    if (hash.startsWith('stats')) {
      return { section: 'stats' };
    }
    if (hash.startsWith('docs')) {
      return { section: 'docs' };
    }
    if (hash.startsWith('support')) {
      return { section: 'support' };
    }
    if (hash.startsWith('community')) {
      return { section: 'community' };
    }
    return { section: 'home' };
  };

  const initialRoute = parseHash();
  const [activeSection, setActiveSection] = useState<PortalSection>(initialRoute.section);
  const [activeProject, setActiveProject] = useState<AppId | undefined>(initialRoute.project || 'andogram');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  // Sync hash changes (e.g. browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const route = parseHash();
      setActiveSection(route.section);
      if (route.project) {
        setActiveProject(route.project);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (section: PortalSection, appId?: AppId) => {
    setActiveSection(section);
    if (appId) {
      setActiveProject(appId);
    }

    // Update URL hash
    let newHash = '#/';
    if (section === 'projects') {
      newHash = `#/projects/${appId || activeProject || 'andogram'}`;
    } else if (section !== 'home') {
      newHash = `#/${section}`;
    }
    window.location.hash = newHash;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed((prev) => !prev);
  };

  const toggleMobileSidebar = () => {
    if (window.innerWidth <= 900) {
      setMobileSidebarOpen((prev) => !prev);
    } else {
      toggleSidebarCollapse();
    }
  };

  return (
    <div className={`ptl-layout ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* 1. Collapsible & Responsive Sidebar */}
      <Sidebar
        lang={lang}
        activeSection={activeSection}
        activeProject={activeProject}
        onNavigate={handleNavigate}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebarCollapse}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* 2. Main Area */}
      <div className="ptl-main-wrapper">
        <Topbar
          lang={lang}
          setLang={setLang}
          activeSection={activeSection}
          activeProject={activeProject}
          onToggleSidebar={toggleMobileSidebar}
          onOpenDownload={() => onOpenDownload(activeProject || 'andogram')}
        />

        <main className="ptl-content-container">
          {activeSection === 'home' && (
            <HomeView
              lang={lang}
              onNavigate={handleNavigate}
              onOpenDownload={(appId) => onOpenDownload(appId)}
            />
          )}

          {activeSection === 'projects' && (
            <ProjectView
              key={activeProject}
              lang={lang}
              initialAppId={activeProject || 'andogram'}
              onOpenDownload={(appId) => onOpenDownload(appId)}
              onSelectApp={(appId) => handleNavigate('projects', appId)}
            />
          )}

          {activeSection === 'stats' && <StatsView lang={lang} />}

          {activeSection === 'docs' && <DocsView lang={lang} />}

          {activeSection === 'support' && <SupportView lang={lang} />}

          {activeSection === 'community' && <CommunityView lang={lang} />}
        </main>

        <Footer lang={lang} />
        <BackToTop lang={lang} />
      </div>
    </div>
  );
};

