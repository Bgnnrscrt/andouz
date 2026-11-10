import React from 'react';
import type { Language } from '../types';
import { COPY } from './copy';

/*
 * Error boundary for lazily loaded parts (a demo page, the access window). A chunk that
 * can't load (a tab opened before a deploy asks for chunk names the new build no longer
 * has, or the network dropped) throws while rendering; without a boundary React would
 * unmount the whole site. A chunk error reloads the page once (the fresh index.html names
 * the new chunks); if that already happened in the last minute, or it's another error, a
 * short message with «Обновить» shows: in place for a page, over the page for a window.
 */

const RELOADED_AT = 'ando_chunk_reload';
const CHUNK_ERROR = /dynamically imported module|Importing a module script failed|Unable to preload CSS/i;

interface Props {
  lang: Language;
  /** The children are a window: the message comes over the page, with «Закрыть». */
  modal?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
}

export class ChunkBoundary extends React.Component<Props, { failed: boolean }> {
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
      return;
    }
    window.location.reload();
  }

  componentDidUpdate(_: Props, prev: { failed: boolean }) {
    if (this.props.modal && this.state.failed && !prev.failed) this.reloadRef.current?.focus();
  }

  private close = () => {
    this.setState({ failed: false });
    this.props.onClose?.();
  };

  render() {
    if (!this.state.failed) return this.props.children;
    const t = COPY[this.props.lang].errors;
    if (this.props.modal) {
      return (
        <div
          className="load-error-layer"
          role="alertdialog"
          aria-modal="true"
          aria-label={t.window}
          onKeyDown={(e) => {
            if (e.key === 'Escape') this.close();
          }}
        >
          <div className="load-error load-error--window">
            <p>{t.window}</p>
            <div className="load-error-actions">
              <button ref={this.reloadRef} type="button" className="btn btn--primary" onClick={() => window.location.reload()}>
                {t.reload}
              </button>
              <button type="button" className="btn btn--outline" onClick={this.close}>
                {t.close}
              </button>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="load-error" role="alert">
        <p>{t.page}</p>
        <button type="button" className="btn btn--outline" onClick={() => window.location.reload()}>
          {t.reload}
        </button>
      </div>
    );
  }
}
