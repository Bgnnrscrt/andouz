import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { AppId, Language } from '../types';
import { getDemoPageCopy } from '../components/sandbox/demoPages';
import { isOverlayEntry } from '../hooks/useBackToClose';
import { APPS, COPY, isOnSale } from './copy';
import { SiteContext, type SiteApi } from './context';
import { ChunkBoundary } from './ChunkBoundary';
import { Footer, MenuSheet, StickyCta, TopBar } from './Chrome';
import { Home } from './Home';
import { AppPage } from './AppPage';
import { pageKey, parseHash, type Route } from './router';

/*
 * The ANDO site (rebuilt from scratch on 2026-11-09, «Старые деньги» style, phone first).
 * One page per route: home (sections), an app page, a demo page (lazy). The access
 * window and the demo pages load on first use.
 */

const DemoPage = lazy(() => import('./DemoPage'));
const AccessSheet = lazy(() => import('./AccessSheet'));

const LANGUAGES: Language[] = ['uz', 'ru', 'en'];

const readSavedLang = (): Language => {
  try {
    const saved = localStorage.getItem('ando_lang') as Language | null;
    return saved && LANGUAGES.includes(saved) ? saved : 'uz';
  } catch {
    return 'uz';
  }
};

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export function Site() {
  const [lang, setLangState] = useState<Language>(readSavedLang);
  const [route, setRoute] = useState<Route>(() => parseHash());
  const [menuOpen, setMenuOpen] = useState(false);
  const [access, setAccess] = useState<{ open: boolean; app: AppId }>({ open: false, app: 'andogram' });
  const [accessLoaded, setAccessLoaded] = useState(false);
  const t = COPY[lang];

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      localStorage.setItem('ando_lang', next);
    } catch {
      // private mode
    }
  }, []);

  const navigate = useCallback((hash: string) => {
    setMenuOpen(false);
    if (isOverlayEntry()) {
      // From the open menu: take the menu's own history entry, so one Back later returns here.
      window.history.replaceState(null, '', hash);
      setRoute(parseHash(hash));
    } else if (window.location.hash === hash || (hash === '#/' && window.location.hash === '')) {
      setRoute(parseHash(hash)); // same address: scroll to it again
    } else {
      window.location.hash = hash;
    }
  }, []);

  const openAccess = useCallback((app: AppId = 'andogram') => {
    setMenuOpen(false);
    setAccess({ open: true, app });
    setAccessLoaded(true);
  }, []);

  const api = useMemo<SiteApi>(() => ({ lang, t, setLang, navigate, openAccess }), [lang, t, setLang, navigate, openAccess]);

  useEffect(() => {
    const onHash = () => {
      setRoute(parseHash());
      setMenuOpen(false);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    document.title =
      route.page === 'home'
        ? t.titles.home
        : route.page === 'app'
          ? t.titles.app(APPS[route.app][lang].name)
          : t.titles.demo(getDemoPageCopy(route.demo, lang).title);
  }, [route, lang, t]);

  // A new page starts at the top; a section address scrolls to its section.
  const key = pageKey(route);
  const lastKey = useRef(key);
  useEffect(() => {
    const section = route.page === 'home' ? route.section : route.page === 'app' && route.features ? 'features' : undefined;
    const pageChanged = lastKey.current !== key;
    lastKey.current = key;
    if (section) {
      const id = window.requestAnimationFrame(() => {
        document.getElementById(section)?.scrollIntoView({ behavior: prefersReducedMotion() || pageChanged ? 'auto' : 'smooth', block: 'start' });
      });
      return () => window.cancelAnimationFrame(id);
    }
    if (pageChanged) window.scrollTo(0, 0);
    return undefined;
  }, [route, key]);

  return (
    <SiteContext.Provider value={api}>
      <a
        href="#main"
        className="skip-link"
        onClick={(e) => {
          e.preventDefault();
          const main = document.getElementById('main');
          if (!main) return;
          main.setAttribute('tabindex', '-1');
          main.addEventListener('blur', () => main.removeAttribute('tabindex'), { once: true });
          main.focus();
          main.scrollIntoView();
        }}
      >
        {t.skip}
      </a>
      <TopBar menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <main id="main" className={`page page--${route.page}`}>
        {route.page === 'home' && <Home />}
        {route.page === 'app' && <AppPage key={route.app} app={route.app} />}
        {route.page === 'demo' && (
          <ChunkBoundary lang={lang} key={route.demo}>
            <Suspense fallback={<div className="page-loading" aria-hidden="true" />}>
              <DemoPage demo={route.demo} />
            </Suspense>
          </ChunkBoundary>
        )}
      </main>
      <Footer />
      {/* not on a demo page, and not on the page of an app that isn't on sale yet (Andeo) */}
      <StickyCta enabled={route.page !== 'demo' && !(route.page === 'app' && !isOnSale(route.app)) && !menuOpen && !access.open} />
      <MenuSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
      {accessLoaded && (
        <ChunkBoundary
          lang={lang}
          modal
          onClose={() => {
            setAccess((s) => ({ ...s, open: false }));
            setAccessLoaded(false);
          }}
        >
          <Suspense fallback={null}>
            <AccessSheet open={access.open} app={access.app} lang={lang} onClose={() => setAccess((s) => ({ ...s, open: false }))} />
          </Suspense>
        </ChunkBoundary>
      )}
    </SiteContext.Provider>
  );
}
