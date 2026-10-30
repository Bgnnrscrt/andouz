import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Language, AppId, AppInfo } from './types';
import { PortalLayout } from './components/portal/PortalLayout';

// Modals (and the QR generator) load on first open, keeping them out of the initial bundle.
const DownloadModal = lazy(() => import('./components/DownloadModal').then((m) => ({ default: m.DownloadModal })));
const AppDetailsModal = lazy(() => import('./components/AppDetailsModal').then((m) => ({ default: m.AppDetailsModal })));

const LANGUAGES: Language[] = ['uz', 'ru', 'en'];

const PAGE_TITLES: Record<Language, string> = {
  uz: 'ANDO — AndoGram va Andusta | Android uchun erkinlik va maxfiylik',
  ru: 'ANDO — AndoGram и Andusta | Свобода и приватность для Android',
  en: 'ANDO — AndoGram & Andusta | Freedom & Privacy for Android'
};

const SKIP_LINK: Record<Language, string> = {
  uz: 'Asosiy kontentga o‘tish',
  ru: 'Перейти к содержимому',
  en: 'Skip to content'
};

const readSavedLang = (): Language => {
  try {
    const saved = localStorage.getItem('ando_lang') as Language;
    return saved && LANGUAGES.includes(saved) ? saved : 'uz';
  } catch {
    return 'uz';
  }
};

export function App() {
  const [lang, setLangState] = useState<Language>(readSavedLang);

  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [downloadAppId, setDownloadAppId] = useState<AppId>('andogram');
  const [selectedAppDetails, setSelectedAppDetails] = useState<AppInfo | null>(null);
  const [modalsRequested, setModalsRequested] = useState<boolean>(false);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = PAGE_TITLES[lang];
  }, [lang]);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('ando_lang', newLang);
    } catch {
      // Storage can be unavailable in private mode
    }
  };

  const handleOpenDownload = (appId: AppId = 'andogram') => {
    setDownloadAppId(appId);
    setDownloadModalOpen(true);
    setModalsRequested(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <a href="#main" className="skip-link">{SKIP_LINK[lang]}</a>

        <div id="main" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <PortalLayout
            lang={lang}
            setLang={setLang}
            onOpenDownload={handleOpenDownload}
          />
        </div>

        {/* Lazy-loaded Modals */}
        {modalsRequested && (
          <Suspense fallback={null}>
            <DownloadModal
              isOpen={downloadModalOpen}
              onClose={() => setDownloadModalOpen(false)}
              lang={lang}
              initialAppId={downloadAppId}
            />

            <AppDetailsModal
              app={selectedAppDetails}
              onClose={() => setSelectedAppDetails(null)}
              lang={lang}
              onOpenDownload={() => {
                if (selectedAppDetails) {
                  handleOpenDownload(selectedAppDetails.id);
                } else {
                  handleOpenDownload('andogram');
                }
              }}
            />
          </Suspense>
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
