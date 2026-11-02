import type React from 'react';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import type { Language } from '../../types';
import { isReached, prefersReducedMotion, stepAfter, type Flow } from './engine';

/*
 * State of one «Проверь сам» sandbox: the current step, its timers, the hint
 * (delay, wrong taps, shake), the spotlight measurement and the phone size.
 * The scenario renders its screens from `step`; SandboxFrame renders the rest.
 */

/*
 * Phone size. The phone always has a phone's shape: 360 × 760 logical px
 * (≈ 9 : 19, a modern Android), scaled as a whole to fit the window, on
 * every screen. It never turns squat on low windows (owner, 2026-11-02, the
 * third time: «выглядит нелепо»): it gets smaller instead. Where there is
 * room, the caption goes to a rail on the phone's left («rail»); otherwise it
 * is a row above the phone. The restart ring is inside the phone (status bar).
 */
export const PHONE_W = 360;
const PHONE_H = 760;
/**
 * Smallest scale for the window height; on even lower windows the page
 * scrolls instead. 0.64: a window from ~600px tall (a 1366 × 768 laptop with
 * the browser's bars: ~625px) still shows the whole phone.
 */
const FIT_MIN = 0.64;
/** Largest scale, on tall windows. */
const FIT_MAX = 1.1;
/** Room above (the page padding) and below the phone. */
const FIT_AIR = 40;
/** The rail (caption) and its gap; must match sandbox.css. */
const RAIL_W = 132;
const GAP = 20;
/** Without the rail: the caption above the phone and its gap. */
const STACK_CHROME = 46 + 14;
/** The spotlight is shown after the longest enter animation (phone 0.32 s, new message 0.36 s). */
const SETTLE_MS = 400;

export interface Fit {
  /** Scale of the whole phone. */
  k: number;
  /** Logical phone height before scaling, px (always PHONE_H). */
  h: number;
  /** The caption in a rail beside the phone. */
  rail: boolean;
}

/** Scale for a height: the phone's shape stays, only its size changes. */
const scaleFor = (availH: number): number => Math.min(FIT_MAX, Math.max(FIT_MIN, availH / PHONE_H));

/**
 * The window height without the browser's bars (100svh), else innerHeight.
 * On phones innerHeight changes while the address bar slides away; this one
 * doesn't, so the phone doesn't jump while the visitor scrolls.
 */
const viewportHeight = (): number => {
  const probe = document.createElement('div');
  probe.style.cssText = 'position:fixed;top:0;left:0;width:0;height:100svh;visibility:hidden;pointer-events:none';
  document.body.appendChild(probe);
  const svh = probe.offsetHeight;
  probe.remove();
  return svh > 0 ? Math.min(svh, window.innerHeight) : window.innerHeight;
};

/** Spotlighted element, in the phone screen's own (unscaled) px. */
export interface Spot {
  x: number;
  y: number;
  w: number;
  h: number;
  /** The target is round (data-sbx-round): a round spotlight. */
  round?: boolean;
  sw: number;
  sh: number;
  /** Which target/screen this measurement belongs to. */
  key: string;
  /** Measured after the screen's enter animation: safe to show. */
  ready: boolean;
}

export type HintSide = 'above' | 'below';

/** A floating hint next to its target. */
export interface HintPos {
  side: HintSide;
  width: number;
  left: number;
  top?: number;
  bottom?: number;
  arrowX: number;
}

export interface SandboxSetup<S extends string> {
  flow: Flow<S>;
  /** The start-screen step. */
  initial: S;
  hints: Partial<Record<S, string>>;
  /** Labels of the buttons in hints (steps in `flow.nextButton`). */
  buttons?: Partial<Record<S, string>>;
  /** What is on screen at a step (phone + screen): a change re-measures the spotlight. */
  viewOf: (s: S) => string;
  lang: Language;
}

export interface Sandbox<S extends string> {
  step: S;
  initial: S;
  /**
   * Bumped by every go(): a restart on the step already on screen still
   * restarts its timers and re-enters the screen (SandboxFrame keys on it).
   */
  run: number;
  /** Start (over) at a step: a new run, so no hint counts as already shown. */
  go: (s: S) => void;
  /** go(), then bring the sandbox into view (the start button). */
  start: (s: S) => void;
  next: () => void;
  /** True once the flow has reached (or passed) `s`. */
  at: (s: S) => boolean;
  /**
   * Every button inside the phone calls this with its data-sbx key (or nothing).
   * The expected key moves the flow on; anything else shows the hint at once,
   * and shakes it when it is already showing.
   */
  tap: (key?: string) => void;
  /** Taps already made on a multi-tap target (PIN digits entered). */
  count: number;
  want?: string;
  focusKey?: string;
  hint?: string;
  hintOn: boolean;
  hintButton?: string;
  shaking: boolean;
  fit: Fit | null;
  rootRef: React.RefObject<HTMLDivElement | null>;
  screenRef: React.RefObject<HTMLDivElement | null>;
  spot: Spot | null;
  spotReady: boolean;
  hintPos: HintPos | null;
  /** The hint is docked into the chat column (rendered by the scenario via DockedHint). */
  docked: boolean;
  dockSide: HintSide;
  /** A tap on the screen outside any button counts as a wrong tap. */
  onScreenClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyDown: () => void;
  onPointerDown: () => void;
}

export function useSandbox<S extends string>({
  flow,
  initial,
  hints,
  buttons,
  viewOf,
  lang,
}: SandboxSetup<S>): Sandbox<S> {
  const [step, setStep] = useState<S>(initial);
  /** The step whose hint is showing: hints wait, a wrong tap shows them at once. */
  const [hintStep, setHintStep] = useState<S | null>(null);
  const [shaking, setShaking] = useState(false);
  const [measured, setMeasured] = useState<Spot | null>(null);
  const [fit, setFit] = useState<Fit | null>(null);
  /** Taps on a multi-tap target, for the step they were made on. */
  const [tapped, setTapped] = useState<{ step: S; n: number } | null>(null);
  const [run, setRun] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const stepStartRef = useRef(0);
  /** The visitor drives the demo with the keyboard: keep focus on the next target. */
  const keyboardRef = useRef(false);

  const want = flow.tap?.[step];
  const focusKey = want ?? flow.look?.[step];
  const hint = hints[step];
  const hasHint = hint !== undefined;
  const hintOn = hasHint && hintStep === step;
  const hintButton = flow.nextButton?.has(step) ? buttons?.[step] : undefined;
  const count = tapped !== null && tapped.step === step ? tapped.n : 0;
  const view = viewOf(step);

  const go = (s: S) => {
    setHintStep(null);
    setShaking(false);
    setTapped(null);
    setRun((r) => r + 1);
    setStep(s);
  };
  const next = () => {
    setTapped(null);
    setStep(stepAfter(flow.steps, step));
  };
  const at = (s: S) => isReached(flow.steps, step, s);

  const tap = (key?: string) => {
    // The second click of a double click must not hit the next screen's target.
    if (performance.now() - stepStartRef.current < 300) return;
    if (key !== undefined && key === want) {
      const need = flow.taps?.[step] ?? 1;
      if (count + 1 >= need) next();
      else setTapped({ step, n: count + 1 });
    } else if (hasHint) {
      if (hintOn) setShaking(true);
      else setHintStep(step);
    }
  };

  const onScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Buttons and hints handle their own clicks.
    if ((e.target as Element).closest('button, a, .sbx-hint, .sbx-dock')) return;
    tap();
  };

  const start = (s: S) => {
    go(s);
    rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  };

  // When the step started; runs before the measuring layout effect below.
  useLayoutEffect(() => {
    stepStartRef.current = performance.now();
  }, [step, run]);

  // Timed steps.
  useEffect(() => {
    const ms = flow.auto?.[step];
    if (ms === undefined) return undefined;
    const id = window.setTimeout(() => {
      setTapped(null);
      setStep(stepAfter(flow.steps, step));
    }, ms);
    return () => window.clearTimeout(id);
  }, [step, flow, run]);

  // A hint waits so the visitor can read the screen first.
  useEffect(() => {
    if (!hasHint) return undefined;
    const id = window.setTimeout(() => setHintStep(step), flow.hintDelayAt?.[step] ?? flow.hintDelay);
    return () => window.clearTimeout(id);
  }, [step, hasHint, flow, run]);

  // A wrong tap shakes the hint once.
  useEffect(() => {
    if (!shaking) return undefined;
    const id = window.setTimeout(() => setShaking(false), 450);
    return () => window.clearTimeout(id);
  }, [shaking]);

  // Keep the phone's shape and scale it to the window: height first, width a hard limit.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const update = () => {
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 74;
      const availH = viewportHeight() - header - FIT_AIR;
      const width = root.clientWidth;
      // Rail beside the phone vs caption above it: take whichever gives the
      // bigger phone.
      const railK = Math.min(scaleFor(availH), (width - RAIL_W - GAP) / PHONE_W);
      const stackK = Math.min(scaleFor(availH - STACK_CHROME), width / PHONE_W);
      const rail = railK >= stackK;
      const k = Math.round((rail ? railK : stackK) * 1000) / 1000;
      setFit((prev) => (prev && prev.k === k && prev.rail === rail ? prev : { k, h: PHONE_H, rail }));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Measure the spotlighted element once its hint shows. Screens slide in, so a
  // hint shown early is measured again after the enter animation and only then
  // revealed. A measurement made for another target/screen is ignored.
  const spotOn = hintOn && focusKey !== undefined;
  // Step and run are in the key: after a restart the old run's measurement is stale.
  const spotKey = `${run}|${String(step)}|${focusKey ?? ''}|${view}|${lang}|${spotOn ? 'on' : ''}|${fit?.h ?? ''}`;
  useLayoutEffect(() => {
    const scr = screenRef.current;
    if (!scr || !focusKey || !spotOn) return undefined;
    let ready = false;
    const measure = () => {
      const el = scr.querySelector<HTMLElement>(`[data-sbx="${focusKey}"]`);
      if (!el) return;
      const s = scr.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // The phone may be scaled: convert to the screen's own px.
      const k = s.width / scr.offsetWidth || 1;
      setMeasured({
        x: (r.left - s.left) / k,
        y: (r.top - s.top) / k,
        w: r.width / k,
        h: r.height / k,
        round: el.dataset.sbxRound !== undefined,
        sw: scr.offsetWidth,
        sh: scr.offsetHeight,
        key: spotKey,
        ready,
      });
    };
    measure();
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(scr);
    // Lists and conversations scroll; the spotlight follows them.
    scr.addEventListener('scroll', schedule, true);
    const wait = Math.max(0, SETTLE_MS - (performance.now() - stepStartRef.current));
    const timer = window.setTimeout(() => {
      ready = true;
      measure();
    }, wait);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      observer.disconnect();
      scr.removeEventListener('scroll', schedule, true);
    };
  }, [focusKey, spotKey, spotOn]);

  const spot = spotOn && measured && measured.key === spotKey ? measured : null;
  const spotReady = spot?.ready ?? false;

  // Keyboard users: move focus to whatever the step expects (the end buttons last).
  useEffect(() => {
    if (!keyboardRef.current) return undefined;
    const root = rootRef.current;
    const id = window.setTimeout(() => {
      if (!root) return;
      const selector = hintButton ? (hintOn ? '.sbx-hint-btn' : '') : want ? `[data-sbx="${want}"]` : '.sbx-end .sbx-cta';
      if (!selector) return;
      // Don't pull focus back from elsewhere (other parts of the page, «Начать заново»).
      const active = document.activeElement;
      if (active && active !== document.body && !screenRef.current?.contains(active)) return;
      root.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
    }, 380);
    return () => window.clearTimeout(id);
  }, [step, want, hintButton, hintOn]);

  const docked = hintOn && focusKey !== undefined && (flow.docked?.has(focusKey) ?? false);
  const dockSide: HintSide = focusKey !== undefined && flow.dockAbove?.has(focusKey) ? 'above' : 'below';

  // Floating hint next to its target.
  const hintPos = useMemo<HintPos | null>(() => {
    if (!spot) return null;
    const width = Math.min(spot.sw - 24, 262);
    const cx = spot.x + spot.w / 2;
    const left = Math.max(12, Math.min(cx - width / 2, spot.sw - width - 12));
    const arrowX = Math.max(18, Math.min(cx - left, width - 18));
    const below = spot.y + spot.h / 2 < spot.sh * 0.5;
    return below
      ? { side: 'below', width, left, top: spot.y + spot.h + 14, arrowX }
      : { side: 'above', width, left, bottom: spot.sh - spot.y + 14, arrowX };
  }, [spot]);

  return {
    step,
    initial,
    run,
    go,
    start,
    next,
    at,
    tap,
    count,
    want,
    focusKey,
    hint,
    hintOn,
    hintButton,
    shaking,
    fit,
    rootRef,
    screenRef,
    spot,
    spotReady,
    hintPos,
    docked,
    dockSide,
    onScreenClick,
    onKeyDown: () => {
      keyboardRef.current = true;
    },
    onPointerDown: () => {
      keyboardRef.current = false;
    },
  };
}

/**
 * Time into a timeline (an outro), ms, while `active`; calls `onEnd` once it
 * reaches `endMs`. Back to 0 when inactive.
 */
export function useTimeline(active: boolean, endMs: number, onEnd: () => void): number {
  const [t, setT] = useState(0);
  const endRef = useRef(onEnd);
  useEffect(() => {
    endRef.current = onEnd;
  });
  useEffect(() => {
    if (!active) return undefined;
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now() - t0;
      if (now >= endMs) {
        window.clearInterval(id);
        endRef.current();
      } else setT(now);
    }, 40);
    return () => {
      window.clearInterval(id);
      setT(0);
    };
  }, [active, endMs]);
  return t;
}
