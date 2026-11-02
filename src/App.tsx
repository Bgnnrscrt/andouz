import React, { useState, useEffect, lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import { Language, AppId, AppInfo } from './types';
import { PortalLayout } from './components/portal/PortalLayout';
import { ChunkBoundary } from './components/ui/ChunkBoundary';

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
        <a
          href="#main"
          className="skip-link"
          onClick={(e) => {
            // The portal routes by hash, so «#main» would open Home: focus the content instead.
            e.preventDefault();
            const main = document.getElementById('main');
            if (!main) return;
            // Focusable only for this jump: a permanent tabindex would take focus on every click.
            main.setAttribute('tabindex', '-1');
            main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
            main.focus();
            main.scrollIntoView();
          }}
        >
          {SKIP_LINK[lang]}
        </a>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <PortalLayout
            lang={lang}
            setLang={setLang}
            onOpenDownload={handleOpenDownload}
          />
        </div>

        {/* Lazy-loaded Modals. The boundary catches a modal chunk that fails to
            load (e.g. a tab older than the deploy): no blank page. */}
        {modalsRequested && (
          <ChunkBoundary
            lang={lang}
            modal
            onClose={() => {
              setDownloadModalOpen(false);
              setSelectedAppDetails(null);
              setModalsRequested(false);
            }}
          >
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
          </ChunkBoundary>
        )}
      </div>
    </MotionConfig>
  );
}

export default App;
