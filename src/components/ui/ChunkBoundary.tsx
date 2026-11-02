import React from 'react';
import type { Language } from '../../types';

/*
 * Error boundary for lazily loaded pages and modals. A chunk that can't load
 * (a tab opened before a deploy asks for chunk names the new build no longer
 * has, or the network dropped) throws while rendering, and without a boundary
 * React unmounts the whole app: a blank page. Here a chunk error reloads the
 * page once (the fresh index.html names the new chunks); if that already
 * happened in the last minute, or the error is something else, a short
 * message with a reload button shows: inside the layout for a page (sidebar
 * and topbar keep working), over the page for a modal (`modal`, with «Закрыть»).
 */

const TEXT: Record<Language, { failed: string; failedModal: string; reload: string; close: string }> = {
  ru: {
    failed: 'Не удалось загрузить страницу. Проверьте интернет и обновите её.',
    failedModal: 'Не удалось загрузить окно. Проверьте интернет и обновите страницу.',
    reload: 'Обновить',
    close: 'Закрыть',
  },
  uz: {
    failed: 'Sahifani yuklab bo‘lmadi. Internetni tekshirib, sahifani yangilang.',
    failedModal: 'Oynani yuklab bo‘lmadi. Internetni tekshirib, sahifani yangilang.',
    reload: 'Yangilash',
    close: 'Yopish',
  },
  en: {
    failed: 'This page didn’t load. Check your connection and reload it.',
    failedModal: 'This window didn’t load. Check your connection and reload the page.',
    reload: 'Reload',
    close: 'Close',
  },
};

/** sessionStorage: when the last automatic reload happened (loop guard). */
const RELOADED_AT = 'ando_chunk_reload';

/** Chrome / Firefox / Safari messages for a failed dynamic import, and Vite's for its CSS. */
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

interface ChunkBoundaryProps {
  lang: Language;
  /** The children are modals: the message comes over the page, with «Закрыть». */
  modal?: boolean;
  /** «Закрыть» (modal): unmount the failed children. */
  onClose?: () => void;
  children: React.ReactNode;
}

export class ChunkBoundary extends React.Component<ChunkBoundaryProps, { failed: boolean }> {
  state = { failed: false };

  private reloadRef = React.createRef<HTMLButtonElement>();

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

  componentDidUpdate(_: ChunkBoundaryProps, prev: { failed: boolean }) {
    // The modal message takes the focus, as the modal itself would have.
    if (this.props.modal && this.state.failed && !prev.failed) this.reloadRef.current?.focus();
  }

  private close = () => {
    this.setState({ failed: false });
    this.props.onClose?.();
  };

  render() {
    if (!this.state.failed) return this.props.children;
    const t = TEXT[this.props.lang];
    if (this.props.modal) {
      return (
        <div
          className="ptl-load-error-modal"
          role="alertdialog"
          aria-modal="true"
          aria-label={t.failedModal}
          onKeyDown={(e) => {
            if (e.key === 'Escape') this.close();
          }}
        >
          <div className="ptl-load-error ptl-load-error--modal">
            <p>{t.failedModal}</p>
            <div className="ptl-load-error-actions">
              <button
                ref={this.reloadRef}
                type="button"
                className="ptl-btn-secondary"
                onClick={() => window.location.reload()}
              >
                {t.reload}
              </button>
              <button type="button" className="ptl-btn-secondary" onClick={this.close}>
                {t.close}
              </button>
            </div>
          </div>
        </div>
      );
    }
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
