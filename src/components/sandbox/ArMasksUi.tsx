import { useEffect, useState } from 'react';
import { Pause, SendHorizontal, Square, SwitchCamera, Zap } from 'lucide-react';
import { emojify } from '../../lib/emoji';
import { ArFace, GhoulThumb, PlainThumb } from './ArFace';
import { MASK_IDS, type MaskId } from './arMasksCopy';
import type { Tap } from './TgUi';
import './armasks.css';

/*
 * Screens of the AR masks sandbox that the Telegram kit (TgUi) has no parts
 * for: the video message («кружок») recorder over the chat, as in the
 * official Telegram (dark, the circle, timer, «Отмена», send) and as in
 * AndoGram (the same plus the row of masks under the circle). The controls
 * are pictures, not buttons: a tap there counts as a tap beside the target.
 * Only the masks are buttons; the Ghoul mask is the one the demo can try.
 */

/** Mask icons: the Ghoul mask and «no mask» are drawn; the locked ones show their emoji behind a «?». */
const MASK_EMOJI: Partial<Record<MaskId, string>> = {
  forest: '🌿',
  noir: '🖤',
  beard: '🧔',
  fawkes: '🎭',
  glitter: '✨',
};

/** A mask the demo cannot try: everything but «no mask» and the Ghoul mask. */
const isLocked = (id: MaskId): boolean => id !== 'none' && id !== 'ghoul';

/** Time since the recorder appeared, ms, ticking every 100 ms (the timer and the ring). */
function useElapsed(): number {
  const [t0] = useState(() => performance.now());
  const [now, setNow] = useState(t0);
  useEffect(() => {
    const id = window.setInterval(() => setNow(performance.now()), 100);
    return () => window.clearInterval(id);
  }, []);
  return now - t0;
}

/** 0:05,2 — the timer of a video message. */
const clock = (ms: number, decimal: string): string => {
  const tenths = Math.floor(ms / 100);
  const s = Math.floor(tenths / 10);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}${decimal}${tenths % 10}`;
};

/** The ring around the circle fills over this long (Telegram allows a minute; the demo is short). */
const RING_MS = 30_000;
/** Circumference of the ring (r 48.5 in a 100 × 100 box); pathLength is unreliable on <circle> in older Safari. */
const RING_C = 2 * Math.PI * 48.5;

/** The circle: the camera (ArFace) and the white recording ring around it. */
function RoundVideo({ mask, elapsed }: { mask: boolean; elapsed: number }) {
  const p = Math.min(1, elapsed / RING_MS);
  return (
    <div className="ar-video" data-sbx="video-circle" data-sbx-round="">
      <svg className="ar-video-ring" viewBox="0 0 100 100" aria-hidden="true">
        <circle cx="50" cy="50" r="48.5" strokeDasharray={RING_C} strokeDashoffset={RING_C * (1 - p)} />
      </svg>
      <div className="ar-video-clip">
        <ArFace mask={mask} />
      </div>
    </div>
  );
}

/** The bottom bar: red dot + timer, «Отмена», and the blue send button. */
function RecBar({ elapsed, decimal, cancel, light }: { elapsed: number; decimal: string; cancel: string; light: boolean }) {
  return (
    <>
      <div className={`ar-rec-bar${light ? ' ar-rec-bar--light' : ''}`} aria-hidden="true">
        <span className="ar-rec-time">
          <span className="ar-rec-dot" />
          {clock(elapsed, decimal)}
        </span>
        <span className="ar-rec-cancel">{cancel}</span>
      </div>
      <span className="ar-rec-send" aria-hidden="true">
        <SendHorizontal size={26} />
      </span>
    </>
  );
}

/** The official Telegram: the chat dims, the circle records, nothing more. */
export function TelegramRecorder({ decimal, cancel }: { decimal: string; cancel: string }) {
  const elapsed = useElapsed();
  return (
    <div className="ar-rec ar-rec--t">
      <RoundVideo mask={false} elapsed={elapsed} />
      <div className="ar-rec-side" aria-hidden="true">
        <span className="ar-side-btn ar-side-btn--once">1</span>
        <span className="ar-side-btn">
          <Pause size={20} fill="currentColor" />
        </span>
      </div>
      <div className="ar-rec-tools" aria-hidden="true">
        <SwitchCamera size={22} />
        <Zap size={22} />
      </div>
      <RecBar elapsed={elapsed} decimal={decimal} cancel={cancel} light={false} />
    </div>
  );
}

/**
 * AndoGram: the circle and, under it, the masks. Only the Ghoul mask works
 * (data-sbx="mask-ghoul"); a locked mask calls `onLocked` (a toast: buy
 * AndoGram to try it) and counts as a tap beside the target.
 */
export function AndoGramRecorder({
  masked,
  labels,
  masksLabel,
  locked,
  decimal,
  cancel,
  want,
  tap,
}: {
  masked: boolean;
  labels: Record<MaskId, string>;
  masksLabel: string;
  locked: string;
  decimal: string;
  cancel: string;
  want?: string;
  tap: Tap;
}) {
  const elapsed = useElapsed();
  /** The locked-mask toast: its key restarts its animation on every tap. */
  const [toast, setToast] = useState<number | null>(null);
  useEffect(() => {
    if (toast === null) return undefined;
    const id = window.setTimeout(() => setToast(null), 1900);
    return () => window.clearTimeout(id);
  }, [toast]);

  const selected: MaskId = masked ? 'ghoul' : 'none';
  return (
    <div className="ar-rec ar-rec--a">
      <RoundVideo mask={masked} elapsed={elapsed} />
      <div className="ar-masks" role="group" aria-label={masksLabel}>
        {MASK_IDS.map((id) => {
          const key = id === 'ghoul' ? 'mask-ghoul' : undefined;
          const lock = isLocked(id);
          return (
            <button
              key={id}
              type="button"
              className={`ar-mask${id === selected ? ' is-on' : ''}${lock ? ' is-locked' : ''}`}
              data-sbx={key}
              data-want={key !== undefined && want === key}
              tabIndex={key !== undefined && want === key ? 0 : -1}
              aria-pressed={id === selected}
              aria-label={labels[id]}
              onClick={() => {
                if (lock) setToast(performance.now());
                tap(key);
              }}
            >
              <span className="ar-mask-icon" aria-hidden="true">
                {id === 'none' ? (
                  <PlainThumb />
                ) : id === 'ghoul' ? (
                  <GhoulThumb />
                ) : (
                  <span className="ar-mask-emoji">{emojify(MASK_EMOJI[id] ?? '')}</span>
                )}
                {lock && <span className="ar-mask-q">?</span>}
              </span>
              <span className="ar-mask-name" aria-hidden="true">
                {labels[id]}
              </span>
            </button>
          );
        })}
      </div>
      <span className="ar-rec-flip" aria-hidden="true">
        <SwitchCamera size={24} />
      </span>
      <span className="ar-rec-stop" aria-hidden="true">
        <Square size={16} fill="currentColor" />
      </span>
      <RecBar elapsed={elapsed} decimal={decimal} cancel={cancel} light />
      {toast !== null && (
        <div key={toast} className="ar-toast" aria-hidden="true">
          {locked}
        </div>
      )}
      {/* Always there, so a screen reader hears the toast when its text appears. */}
      <p className="sr-only" role="status">
        {toast !== null ? locked : ''}
      </p>
    </div>
  );
}
