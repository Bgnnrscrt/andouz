import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Language, AppId, AppInfo } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureMarquee } from './components/FeatureMarquee';
import { AppsShowcase } from './components/AppsShowcase';
import { PhoneMockup } from './components/PhoneMockup';
import { ComparisonTable } from './components/ComparisonTable';
import { InstallGuide } from './components/InstallGuide';
import { Roadmap } from './components/Roadmap';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

// Modals (and the QR generator) load on first open, keeping them out of the initial bundle.
const DownloadModal = lazy(() => import('./components/DownloadModal').then((m) => ({ default: m.DownloadModal })));
const AppDetailsModal = lazy(() => import('./components/AppDetailsModal').then((m) => ({ default: m.AppDetailsModal })));

const LANGUAGES: Language[] = ['ru', 'uz', 'en'];

const PAGE_TITLES: Record<Language, string> = {
  ru: 'ANDO — AndoGram и Andusta | Свобода и приватность для Android',
  uz: 'ANDO — AndoGram va Andusta | Android uchun erkinlik va maxfiylik',
  en: 'ANDO — AndoGram & Andusta | Freedom & Privacy for Android'
};

const SKIP_LINK: Record<Language, string> = {
  ru: 'Перейти к содержимому',
  uz: 'Asosiy kontentga o‘tish',
  en: 'Skip to content'
};

const readSavedLang = (): Language => {
  try {
    const saved = localStorage.getItem('ando_lang') as Language;
    return saved && LANGUAGES.includes(saved) ? saved : 'ru';
  } catch {
    return 'ru';
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
      // Storage can be unavailable (private mode); the choice still applies for this visit.
    }
  };

  const handleOpenDownload = (appId: AppId = 'andogram') => {
    setDownloadAppId(appId);
    setDownloadModalOpen(true);
    setModalsRequested(true);
  };

  const handleSelectApp = (app: AppInfo) => {
    setSelectedAppDetails(app);
    setModalsRequested(true);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <a href="#main" className="skip-link">{SKIP_LINK[lang]}</a>

        <Header
          lang={lang}
          setLang={setLang}
          onOpenDownload={() => handleOpenDownload('andogram')}
        />

        <main id="main" style={{ flex: 1 }}>
          <Hero
            lang={lang}
            onOpenDownload={() => handleOpenDownload('andogram')}
          />

          <FeatureMarquee lang={lang} />

          <AppsShowcase
            lang={lang}
            onSelectApp={handleSelectApp}
            onOpenDownload={handleOpenDownload}
          />

          <PhoneMockup lang={lang} />

          <ComparisonTable lang={lang} />

          <InstallGuide lang={lang} />

          <Roadmap lang={lang} />
        </main>

        <Footer lang={lang} />

        <BackToTop lang={lang} />

        {/* Modals */}
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
