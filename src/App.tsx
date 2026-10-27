import React, { useState, useEffect } from 'react';
import { Language, AppId, AppInfo } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AppsShowcase } from './components/AppsShowcase';
import { PhoneMockup } from './components/PhoneMockup';
import { ComparisonTable } from './components/ComparisonTable';
import { InstallGuide } from './components/InstallGuide';
import { Roadmap } from './components/Roadmap';
import { DownloadModal } from './components/DownloadModal';
import { AppDetailsModal } from './components/AppDetailsModal';
import { Footer } from './components/Footer';

export function App() {
  const [lang, setLangState] = useState<Language>(() => {
    const saved = localStorage.getItem('ando_lang') as Language;
    return saved && ['ru', 'uz', 'en'].includes(saved) ? saved : 'ru';
  });

  const [downloadModalOpen, setDownloadModalOpen] = useState<boolean>(false);
  const [downloadAppId, setDownloadAppId] = useState<AppId>('andogram');
  const [selectedAppDetails, setSelectedAppDetails] = useState<AppInfo | null>(null);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ando_lang', newLang);
  };

  const handleOpenDownload = (appId: AppId = 'andogram') => {
    setDownloadAppId(appId);
    setDownloadModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        lang={lang}
        setLang={setLang}
        onOpenDownload={() => handleOpenDownload('andogram')}
      />

      <main style={{ flex: 1 }}>
        <Hero
          lang={lang}
          onOpenDownload={() => handleOpenDownload('andogram')}
        />

        <AppsShowcase
          lang={lang}
          onSelectApp={(app) => setSelectedAppDetails(app)}
          onOpenDownload={handleOpenDownload}
        />

        <PhoneMockup lang={lang} />

        <ComparisonTable lang={lang} />

        <InstallGuide lang={lang} />

        <Roadmap lang={lang} />
      </main>

      <Footer lang={lang} />

      {/* Modals */}
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
    </div>
  );
}

export default App;
