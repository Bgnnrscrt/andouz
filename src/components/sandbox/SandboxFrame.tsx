import React, { useId, useMemo } from 'react';
import { ArrowRight, LayoutGrid, Play, RotateCcw, RotateCw } from 'lucide-react';
import type { AppId } from '../../types';
import type { LineState } from './engine';
import { featuresHref } from './demos';
import { StatusBar, type StatusTone } from './TgUi';
import { emojify } from '../../lib/emoji';
import { PHONE_W, type HintSide, type Sandbox } from './useSandbox';
import './sandbox.css';

/*
 * The parts every «Проверь сам» sandbox shares: the phone frame (caption, fit,
 * spotlight, floating hint, the restart ring in the status bar), the docked
 * hint, the outro layer (dim + typed line), the start screen and the end buttons.
 */

/**
 * Lines are typed with the brand in its colour, wherever it stands: AndoGram in
 * the ANDO green, Andusta in its pink (owner, 2026-11-03).
 */
const BRAND: Record<AppId, string> = { andogram: 'AndoGram', andusta: 'Andusta' };

/** The green hint: text, optional «next» button, an arrow towards the target. */
export function HintBox({
  text,
  button,
  onNext,
  side,
  arrowX,
  shaking,
}: {
  text: string;
  button?: string;
  onNext: () => void;
  /** Where the hint sits relative to its target (the arrow is on the opposite edge). */
  side: HintSide;
  arrowX: string;
  shaking: boolean;
}) {
  return (
    <div
      className={`sbx-hint-box${shaking ? ' sbx-hint-box--shake' : ''}`}
      data-side={side}
      style={{ '--arrow-x': arrowX } as React.CSSProperties}
    >
      <p className="sbx-hint-text">{emojify(text)}</p>
      {button && (
        <button type="button" className="sbx-hint-btn" onClick={onNext}>
          {button}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/**
 * The hint of a target at the bottom of a chat (flow.docked): it goes into the
 * chat column between the messages and the input and pushes the conversation
 * up. It takes its place at once and fades in once the spotlight is measured.
 */
export function DockedHint<S extends string>({ sb }: { sb: Sandbox<S> }) {
  if (!sb.docked || !sb.hint) return null;
  const { spot } = sb;
  return (
    <div key={`dock-${sb.step}`} className={`sbx-dock sbx-dock--${sb.dockSide}${sb.spotReady ? ' is-ready' : ''}`}>
      <HintBox
        text={sb.hint}
        button={sb.hintButton}
        onNext={sb.next}
        side={sb.dockSide}
        arrowX={spot ? `${Math.max(18, Math.min(spot.x + spot.w / 2 - 12, spot.sw - 24 - 18))}px` : '50%'}
        shaking={sb.shaking}
      />
    </div>
  );
}

/** Marks the characters of every `brand` occurrence in `chars`. */
const brandMask = (chars: string[], brand: string[]): boolean[] => {
  const mask = chars.map(() => false);
  for (let i = 0; i + brand.length <= chars.length; i++) {
    if (brand.every((c, j) => chars[i + j] === c)) for (let j = 0; j < brand.length; j++) mask[i + j] = true;
  }
  return mask;
};

/**
 * A line typed `shown` characters far. The untyped rest keeps its place
 * (invisible), so the centred lines don't jump while typing.
 */
export function Tagline({
  text,
  shown,
  caret,
  app = 'andogram',
}: {
  text: string;
  shown: number;
  caret: boolean;
  app?: AppId;
}) {
  const chars = useMemo(() => Array.from(text), [text]);
  const mask = useMemo(() => brandMask(chars, Array.from(BRAND[app])), [chars, app]);
  const runs: { brand: boolean; text: string }[] = [];
  for (let i = 0; i < Math.min(shown, chars.length); i++) {
    const last = runs[runs.length - 1];
    if (last && last.brand === mask[i]) last.text += chars[i];
    else runs.push({ brand: mask[i], text: chars[i] });
  }
  return (
    <p className="sbx-tagline-text">
      {runs.map((run, i) =>
        run.brand ? (
          <span key={i} className={`sbx-tagline-brand sbx-tagline-brand--${app}`}>
            {run.text}
          </span>
        ) : (
          <React.Fragment key={i}>{emojify(run.text)}</React.Fragment>
        ),
      )}
      {caret && <span className="sbx-tagline-caret" />}
      <span className="sbx-tagline-rest">{emojify(chars.slice(shown).join(''))}</span>
    </p>
  );
}

/**
 * The outro over the screen: the dim (fades in over `dimIn` ms, out over
 * `dimOut` ms) and the typed line. `raised`: the line moves up to make room
 * for the end buttons below it.
 */
export function OutroLayer({
  line,
  text,
  dimIn,
  dimOut,
  raised = false,
  app = 'andogram',
}: {
  line: LineState;
  text: string;
  dimIn: number;
  dimOut: number;
  raised?: boolean;
  /** Whose brand is coloured in the line. */
  app?: AppId;
}) {
  return (
    <>
      <div
        className={`sbx-dim${line.dimmed ? ' is-on' : ''}`}
        style={{ '--dim-in': `${dimIn}ms`, '--dim-out': `${dimOut}ms` } as React.CSSProperties}
        aria-hidden="true"
      />
      <div className={`sbx-tagline${raised ? ' sbx-tagline--raised' : ''}`} aria-hidden="true">
        <Tagline text={text} shown={line.chars} caret={line.caret} app={app} />
      </div>
    </>
  );
}

/** The first screen of every sandbox: logo, title, length, «Проверь сам». */
export function StartScreen({
  title,
  sub,
  cta,
  onStart,
}: {
  title: string;
  sub: string;
  cta: string;
  onStart: () => void;
}) {
  return (
    <div className="sbx-start">
      <span className="sbx-start-logo" aria-hidden="true">
        <img src="/logo-192.png" alt="" width={72} height={72} />
      </span>
      <span className="sbx-start-title">{title}</span>
      <span className="sbx-start-sub">{sub}</span>
      <button type="button" className="sbx-cta" onClick={onStart}>
        <Play size={18} aria-hidden="true" />
        {cta}
      </button>
    </div>
  );
}

export interface EndLabels {
  buy: string;
  more: string;
  again: string;
}

/**
 * The end buttons: «Купить AndoGram» / «Купить Andusta» (DownloadModal), «Другие
 * сценарии» (the app's feature list), «Пройти ещё раз». In the chat column in
 * place of the input, or `over` the dimmed screen at its bottom.
 */
export function EndPanel({
  labels,
  onBuy,
  onAgain,
  over = false,
  app = 'andogram',
}: {
  labels: EndLabels;
  onBuy: () => void;
  onAgain: () => void;
  over?: boolean;
  app?: AppId;
}) {
  return (
    <div className={`sbx-end${over ? ' sbx-end--over' : ''}`}>
      <button type="button" className="sbx-cta" onClick={onBuy}>
        {labels.buy}
      </button>
      <a className="sbx-more" href={featuresHref(app)}>
        <LayoutGrid size={16} aria-hidden="true" />
        {labels.more}
      </a>
      <button type="button" className="sbx-again" onClick={onAgain}>
        <RotateCcw size={15} aria-hidden="true" />
        {labels.again}
      </button>
    </div>
  );
}

/** Radius of the restart ring in its 40 × 40 box (3px stroke). */
const RING_R = 17;
const RING_C = 2 * Math.PI * RING_R;

/**
 * «Начать заново» as a small round button in the right end of the phone's
 * status bar (owner, 2026-11-02: inside the phone, in place of the signal /
 * Wi-Fi / battery icons): a reload arrow, as in a browser, inside a ring that
 * draws itself as the scenario goes on (the progress). Above the outro dim,
 * so it works during the outro too; not on the start screen.
 */
function RestartRing({
  progress,
  label,
  onRestart,
}: {
  progress: number;
  label: string;
  onRestart: () => void;
}) {
  // useId() ids contain colons or guillemets: keep plain characters for url(#…).
  const gradientId = `sbx-ring-${useId().replace(/[^\w-]/g, '')}`;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <button type="button" className="sbx-restart" onClick={onRestart} aria-label={label} title={label}>
      <svg className="sbx-ring" viewBox="0 0 40 40" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            {/* var() works in style, not in SVG presentation attributes. */}
            <stop offset="0" style={{ stopColor: 'var(--accent-ando)' }} />
            <stop offset="1" style={{ stopColor: '#00b4d8' }} />
          </linearGradient>
        </defs>
        <circle className="sbx-ring-track" cx="20" cy="20" r={RING_R} />
        <circle
          className={`sbx-ring-bar${p > 0 ? '' : ' is-empty'}`}
          cx="20"
          cy="20"
          r={RING_R}
          stroke={`url(#${gradientId})`}
          strokeDasharray={RING_C}
          strokeDashoffset={RING_C * (1 - p)}
        />
      </svg>
      <RotateCw size={11} strokeWidth={2.6} className="sbx-ring-icon" aria-hidden="true" />
    </button>
  );
}

interface SandboxFrameProps<S extends string> {
  sb: Sandbox<S>;
  caption: { title: string; sub: string };
  /** The phone slides in again when this changes (another phone or app). */
  phoneKey: string;
  /** The caption animates when this changes (default: `phoneKey`). */
  captionKey?: string;
  /** The screen slides in when this changes. */
  viewKey: string;
  /** aria-label of the phone. */
  screenLabel: string;
  /** The status bar (null: none, the start screen). */
  status: { time: string; tone?: StatusTone } | null;
  /** Layers over the screen, under the spotlight (the outro). */
  overlay?: React.ReactNode;
  /** 0…1. */
  progress: number;
  restartLabel: string;
  onRestart: () => void;
  /** Read out when no hint is showing (the outro line). */
  live?: string;
  /** Extra class on the screen (a wallpaper, a black lock screen). */
  screenClassName?: string;
  /** The current screen. */
  children: React.ReactNode;
}

export function SandboxFrame<S extends string>({
  sb,
  caption,
  phoneKey,
  captionKey,
  viewKey,
  screenLabel,
  status,
  overlay,
  progress,
  restartLabel,
  onRestart,
  live = '',
  screenClassName,
  children,
}: SandboxFrameProps<S>) {
  const {
    step,
    initial,
    run,
    fit,
    spot,
    spotReady,
    hintPos,
    hint,
    hintButton,
    docked,
    shaking,
    next,
    rootRef,
    screenRef,
    onScreenClick,
    onKeyDown,
    onPointerDown,
  } = sb;
  return (
    <div
      className={`sbx${fit ? ' sbx--fit' : ''}${fit?.rail ? ' sbx--rail' : ''}`}
      ref={rootRef}
      style={fit ? ({ '--fit-w': `${Math.round(PHONE_W * fit.k)}px` } as React.CSSProperties) : undefined}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
    >
      <div key={`caption-${captionKey ?? phoneKey}`} className="sbx-caption sbx-caption--enter">
        <span className="sbx-caption-title">
          {caption.title.split(' · ').map((part, i) => (
            <span key={part} className="sbx-caption-part">
              {i > 0 && <span className="sbx-caption-sep"> · </span>}
              {part}
            </span>
          ))}
        </span>
        <span className="sbx-caption-sub">{caption.sub}</span>
      </div>

      <div
        className="sbx-fit"
        style={fit ? { width: Math.round(PHONE_W * fit.k), height: Math.round(fit.h * fit.k) } : undefined}
      >
        <div
          key={phoneKey}
          className="sbx-phone sbx-phone--enter"
          role="group"
          aria-label={screenLabel}
          style={fit ? ({ '--fit-k': fit.k, height: fit.h } as React.CSSProperties) : undefined}
        >
          <div
            className={`sbx-screen${screenClassName ? ` ${screenClassName}` : ''}`}
            ref={screenRef}
            onClick={onScreenClick}
          >
            <span className="sbx-camera" aria-hidden="true" />
            {status && <StatusBar time={status.time} tone={status.tone} />}
            {status && step !== initial && (
              <RestartRing progress={progress} label={restartLabel} onRestart={onRestart} />
            )}
            {/* Keys are prefixed: they share one sibling list with the hint. */}
            <div key={`view-${viewKey}-${run}`} className="sbx-view sbx-view--enter">
              {children}
            </div>

            {overlay}

            {spot && (
              <div
                className={`sbx-spot${spotReady ? ' is-ready' : ''}${spot.round ? ' sbx-spot--round' : ''}`}
                style={{
                  width: spot.w + 8,
                  height: spot.h + 8,
                  transform: `translate(${spot.x - 4}px, ${spot.y - 4}px)`,
                }}
                aria-hidden="true"
              />
            )}

            {hint && !docked && hintPos && spotReady && (
              <div
                key={`hint-${step}`}
                className="sbx-hint"
                style={{ width: hintPos.width, left: hintPos.left, top: hintPos.top, bottom: hintPos.bottom }}
              >
                <HintBox
                  text={hint}
                  button={hintButton}
                  onNext={next}
                  side={hintPos.side}
                  arrowX={`${hintPos.arrowX}px`}
                  shaking={shaking}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {spotReady && hint ? hint : live}
      </p>

    </div>
  );
}
