import React from 'react';
import type { Language } from '../../types';

/*
 * Error boundary for lazily loaded pages. A chunk that can't load (a tab
 * opened before a deploy asks for chunk names the new build no longer has, or
 * the network dropped) throws while rendering, and without a boundary React
 * unmounts the whole app: a blank page. Here a chunk error reloads the page
 * once (the fresh index.html names the new chunks); if that already happened
 * in the last minute, or the error is something else, a short message with a
 * reload button shows inside the layout (sidebar and topbar keep working).
 */

const TEXT: Record<Language, { failed: string; reload: string }> = {
  ru: { failed: 'Не удалось загрузить страницу. Проверьте интернет и обновите её.', reload: 'Обновить' },
  uz: { failed: 'Sahifani yuklab bo‘lmadi. Internetni tekshirib, sahifani yangilang.', reload: 'Yangilash' },
  en: { failed: 'This page didn’t load. Check your connection and reload it.', reload: 'Reload' },
};

/** sessionStorage: when the last automatic reload happened (loop guard). */
const RELOADED_AT = 'ando_chunk_reload';

/** Chrome / Firefox / Safari messages for a failed dynamic import, and Vite's for its CSS. */
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

interface ChunkBoundaryProps {
  lang: Language;
  children: React.ReactNode;
}

export class ChunkBoundary extends React.Component<ChunkBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: unknown) {
    if (!CHUNK_ERROR.test(error instanceof Error ? error.message : String(error))) return;
    try {
      if (Date.now() - Number(sessionStorage.getItem(RELOADED_AT)) < 60_000) return;
      sessionStorage.setItem(RELOADED_AT, String(Date.now()));
    } catch {
      return; // no storage, so no loop guard: keep the message
    }
    window.location.reload();
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const t = TEXT[this.props.lang];
    return (
      <div className="ptl-load-error" role="alert">
        <p>{t.failed}</p>
        <button type="button" className="ptl-btn-secondary" onClick={() => window.location.reload()}>
          {t.reload}
        </button>
      </div>
    );
  }
}

export default ChunkBoundary;
