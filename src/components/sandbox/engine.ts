/*
 * The «Проверь сам» engine, shared by every sandbox (bridge, honeypot, no-forwards).
 * A scenario is a fixed list of steps (Flow). A step is either timed (`auto`),
 * waits for taps on one element (`tap`, `taps` times), or only spotlights an
 * element (`look`) and waits for the button in its hint (`nextButton`). Every
 * transition goes to the next step in the list. A hint shows `hintDelay` ms
 * after its step starts (`hintDelayAt`: per step); the target can be tapped earlier.
 */

export interface Flow<S extends string> {
  steps: readonly S[];
  /** Timed steps: go to the next step after N ms. */
  auto?: Partial<Record<S, number>>;
  /** Steps that wait for a tap on one element (its data-sbx key). */
  tap?: Partial<Record<S, string>>;
  /** Steps whose target must be tapped N times (a PIN code). Default 1. */
  taps?: Partial<Record<S, number>>;
  /** Steps that only spotlight an element (their hint has a button). */
  look?: Partial<Record<S, string>>;
  /** Steps that wait for the button inside the hint. */
  nextButton?: ReadonlySet<S>;
  /** A hint appears this long after its step starts… */
  hintDelay: number;
  /** …or this long on these steps. */
  hintDelayAt?: Partial<Record<S, number>>;
  /**
   * Targets at the bottom of a chat (send button, newest message): their hint is
   * docked into the chat column between the messages and the input.
   */
  docked?: ReadonlySet<string>;
  /** Docked targets whose hint sits above them (the send button); others: below. */
  dockAbove?: ReadonlySet<string>;
}

export const stepAfter = <S extends string>(steps: readonly S[], s: S): S =>
  steps[Math.min(steps.indexOf(s) + 1, steps.length - 1)];

/** True once the flow has reached (or passed) `s`. */
export const isReached = <S extends string>(steps: readonly S[], current: S, s: S): boolean =>
  steps.indexOf(current) >= steps.indexOf(s);

/** 0…1, for the progress bar. `within` (0…1) moves it inside a long step. */
export const progressAt = <S extends string>(steps: readonly S[], s: S, within = 0): number =>
  (steps.indexOf(s) + within) / (steps.length - 1);

/*
 * Outro: the screen dims, a line types out over it, holds, erases from the end,
 * and the dim fades out. Durations in ms; `erase: 0` = the line stays whole
 * until the dim goes.
 */
export interface OutroTiming {
  /** Before the screen starts to dim. */
  calm: number;
  /** The screen dims (CSS transition of this length). */
  dimIn: number;
  /** The line types out. */
  type: number;
  /** The whole line stays on screen. */
  hold: number;
  /** The line erases letter by letter from the end. */
  erase: number;
  /** The dim fades out (CSS transition of this length). */
  dimOut: number;
}

/** Phase start times of an outro, ms from its start. */
export interface OutroPhases {
  dim: number;
  type: number;
  hold: number;
  erase: number;
  undim: number;
  end: number;
}

export const outroPhases = (o: OutroTiming): OutroPhases => {
  const dim = o.calm;
  const type = dim + o.dimIn;
  const hold = type + o.type;
  const erase = hold + o.hold;
  const undim = erase + o.erase;
  const end = undim + o.dimOut;
  return { dim, type, hold, erase, undim, end };
};

export interface LineState {
  /** The dim is on (it fades in and out by CSS transition). */
  dimmed: boolean;
  /** Characters of the line shown. */
  chars: number;
  /** The caret blinks while the line types, holds and erases. */
  caret: boolean;
}

/**
 * Outro state at `t` ms. `len` = line length in characters; `instant` (reduced
 * motion) shows the whole line at once and removes it at once, on the same timeline.
 */
export const lineAt = (t: number, len: number, instant: boolean, o: OutroTiming): LineState => {
  const at = outroPhases(o);
  let chars = 0;
  if (t >= at.type && t < at.undim) {
    if (instant || (t >= at.hold && t < at.erase)) chars = len;
    else if (t < at.hold) chars = Math.min(len, Math.ceil((len * (t - at.type)) / Math.max(1, o.type)));
    else chars = Math.max(1, len - Math.floor((len * (t - at.erase)) / Math.max(1, o.erase)));
  }
  return {
    dimmed: t >= at.dim && t < at.undim,
    chars,
    caret: t >= at.type && t < at.undim,
  };
};

export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
