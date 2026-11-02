/*
 * «Проверь сам» — the 3D AR masks sandbox script (owner, 2026-11-02). One
 * phone, two tries. Try 1, the official Telegram: from the home screen open
 * Telegram, the chat with the friend, record a video message (a «кружок») —
 * the circle shows just the camera: a young man turning his head a little,
 * nothing unusual. The screen dims: «Теперь попробуй в / AndoGram». Try 2,
 * AndoGram: the same steps, but under the circle there is a row of masks. Only
 * one can be tried in the demo, the Ghoul mask: it sits on his face as a real
 * one would and follows his head; the others show a «?» (to see them, buy
 * AndoGram). Then the outro: dim, tagline, end buttons.
 * The flow is a fixed list of steps on the shared engine (engine.ts +
 * useSandbox.ts): timed steps (AUTO_MS), taps (TAP), a spotlight with no tap
 * (LOOK), hints HINT_DELAY_MS after their step starts (HINT_DELAY_AT: sooner).
 * Two steps run on their own timeline: the line after try 1 (LINE) and the
 * outro (AR_OUTRO).
 */

import { outroPhases, progressAt, type Flow, type OutroTiming } from './engine';

/** The app on the phone: t = the official Telegram (try 1), a = AndoGram (try 2). */
export type AppKey = 't' | 'a';
export type ScreenId = 'start' | 'home' | 'splash' | 'list' | 'chat' | 'rec';

export const STEPS = [
  'idle',
  // Try 1 — the official Telegram
  'tHome',
  'tSplash',
  'tList',
  'tChat',
  'tRec',
  'tLine',
  // Try 2 — AndoGram
  'aHome',
  'aSplash',
  'aList',
  'aChat',
  'aRec',
  'aMask',
  // The screen dims, the tagline types; then the end buttons over the dim
  'outro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

/** Elements a step waits for or points at (rendered with a matching data-sbx attribute). */
export type TargetKey = 'app-telegram' | 'app-andogram' | 'row-friend' | 'record' | 'mask-ghoul' | 'video-circle';

/** A hint appears this long after its step starts (as in the other sandboxes: 3 s). */
export const HINT_DELAY_MS = 3000;

/** Steps whose hint comes sooner: the home screen as in Honeypot, try 2 is familiar by then. */
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  tHome: 2000,
  tList: 2000,
  tChat: 2000,
  aHome: 1500,
  aList: 1500,
  aChat: 1500,
  aRec: 2000,
  /** The mask is on: say so soon, while the head keeps turning. */
  aMask: 900,
};

/** Timed steps: go to the next step after N ms. */
export const AUTO_MS: Partial<Record<Step, number>> = {
  tSplash: 1300,
  /** The plain video message records a bit longer than one head-turn loop (5 s). */
  tRec: 5600,
  aSplash: 1300,
  /** The mask on: one more head-turn loop, then the outro. */
  aMask: 5600,
};

/** Steps that wait for a tap on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  tHome: 'app-telegram',
  tList: 'row-friend',
  tChat: 'record',
  aHome: 'app-andogram',
  aList: 'row-friend',
  aChat: 'record',
  aRec: 'mask-ghoul',
};

/** The mask is on: the spotlight sits on the circle (no tap). */
export const LOOK: Partial<Record<Step, TargetKey>> = { aMask: 'video-circle' };

/** The camera button is at the bottom of the chat: its hint goes into the chat column, above the input. */
export const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>(['record']);

/** The AR masks script for the shared engine. */
export const AR_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  look: LOOK,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
  docked: DOCKED,
  dockAbove: DOCKED,
};

/** After try 1, ms: the screen dims and «Теперь попробуй в / AndoGram» types out and stays. */
export const LINE: OutroTiming = { calm: 300, dimIn: 1600, type: 1600, hold: 1800, erase: 0, dimOut: 0 };
export const LINE_END = outroPhases(LINE).end;

/**
 * The outro after try 2, ms (as in Honeypot): the screen slowly dims to 85%,
 * the tagline types out and stays; the finale raises it over the end buttons.
 */
export const AR_OUTRO: OutroTiming = { calm: 400, dimIn: 3000, type: 2500, hold: 1500, erase: 0, dimOut: 0 };
export const AR_OUTRO_END = outroPhases(AR_OUTRO).end;

export const appOf = (s: Step): AppKey => (s === 'idle' || s.startsWith('t') ? 't' : 'a');

export const screenOf = (s: Step): ScreenId => {
  switch (s) {
    case 'idle':
      return 'start';
    case 'tHome':
    case 'aHome':
      return 'home';
    case 'tSplash':
    case 'aSplash':
      return 'splash';
    case 'tList':
    case 'aList':
      return 'list';
    case 'tChat':
    case 'aChat':
      return 'chat';
    default:
      return 'rec';
  }
};

/** What is on screen at a step (the spotlight is measured again when it changes). */
export const viewOf = (s: Step): string => (s === 'idle' ? 'start' : `${appOf(s)}-${screenOf(s)}`);

/** The mask is on from the tap until the end. */
export const maskOn = (s: Step): boolean => s === 'aMask' || s === 'outro' || s === 'finale';

/** 0…1, for the restart ring. `within` (0…1) moves it inside a timeline step. */
export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);
