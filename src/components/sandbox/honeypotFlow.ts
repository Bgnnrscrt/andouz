/*
 * «Проверь сам» — the Honeypot (duress PIN codes) sandbox script (owner's
 * scenario, 2026-11-01). The visitor opens AndoGram from the phone's home
 * screen and unlocks it four times, with four PIN codes. Each PIN opens only
 * its own account(s), and the side menu lists only those: that is the real
 * feature (every profile PIN unlocks its own set of accounts; the others
 * disappear from the menu and the notifications). No claims beyond that.
 * Then the outro: the screen dims, the tagline types out and stays, and the
 * end buttons come up over the dim.
 * The flow is a fixed list of steps on the shared engine (engine.ts +
 * useSandbox.ts): timed (AUTO_MS), waiting for taps (TAP; the PIN key TAPS
 * times) or spotlighting the accounts and waiting for the hint's button.
 */

import { outroPhases, type Flow, type OutroTiming } from './engine';

export const STEPS = [
  'idle',
  // The phone's home screen: open AndoGram
  'home',
  // Four rounds: the lock screen, unlocking, the chat list, the side menu
  'pin1',
  'open1',
  'list1',
  'drawer1',
  'pin2',
  'open2',
  'list2',
  'drawer2',
  'pin3',
  'open3',
  'list3',
  'drawer3',
  'pin4',
  'open4',
  'list4',
  'drawer4',
  // The screen dims and the tagline types; then the end buttons over the dim
  'outro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

/** A round of the demo = one PIN code: 1111, 2222, 3333, 4444. */
export type Round = 1 | 2 | 3 | 4;
export const ROUNDS: readonly Round[] = [1, 2, 3, 4];

/** The PIN code of a round. */
export const pinOf = (r: Round): string => String(r).repeat(4);

/** Lock screen, unlocking, chat list, side menu. */
export type Stage = 'pin' | 'open' | 'list' | 'drawer';

/** Round and stage of a step inside the four rounds; null outside them. */
export const placeOf = (s: Step): { round: Round; stage: Stage } | null => {
  const m = /^(pin|open|list|drawer)([1-4])$/.exec(s);
  return m ? { stage: m[1] as Stage, round: Number(m[2]) as Round } : null;
};

/** The round on screen (the caption): none before the first PIN; the outro stays on round 4. */
export const roundOf = (s: Step): Round | null => placeOf(s)?.round ?? (s === 'outro' || s === 'finale' ? 4 : null);

/** What is on screen at a step: a change slides the screen in and re-measures the spotlight. */
export const viewOf = (s: Step): string => {
  if (s === 'idle') return 'start';
  if (s === 'home') return 'home';
  const place = placeOf(s);
  if (!place) return 'list-4';
  return `${place.stage === 'pin' || place.stage === 'open' ? 'pin' : 'list'}-${place.round}`;
};

/** Elements a step points at (rendered with a matching data-sbx attribute). */
export type TargetKey = 'app-andogram' | `key-${Round}` | 'menu' | 'drawer-accounts';

/** A hint appears this long after its step starts (as in the bridge: 3 s). */
export const HINT_DELAY_MS = 3000;

/** Steps whose hint comes sooner. */
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  /** Owner: «через 2 секунды фокус на AndoGram». */
  home: 2000,
  pin1: 3000,
  /** The visitor knows the lock screen by now. */
  pin2: 1500,
  pin3: 1500,
  pin4: 1500,
  /** The menu opened on the visitor's own tap: point at the accounts soon. */
  drawer1: 900,
  drawer2: 900,
  drawer3: 900,
  drawer4: 900,
};

/** Timed steps: go to the next step after N ms. */
export const AUTO_MS: Partial<Record<Step, number>> = {
  /** All four boxes filled and a short «unlocked» state, then the chat list. */
  open1: 650,
  open2: 650,
  open3: 650,
  open4: 650,
  /** The last menu: no button, the outro starts on its own. */
  drawer4: 4200,
};

/** Steps that wait for taps on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  home: 'app-andogram',
  pin1: 'key-1',
  pin2: 'key-2',
  pin3: 'key-3',
  pin4: 'key-4',
  list1: 'menu',
  list2: 'menu',
  list3: 'menu',
  list4: 'menu',
};

/** The PIN: its key is tapped 4 times (any other key is a wrong tap; no digit is entered). */
export const TAPS: Partial<Record<Step, number>> = { pin1: 4, pin2: 4, pin3: 4, pin4: 4 };

/** The side menu: the spotlight sits on its accounts block. */
export const LOOK: Partial<Record<Step, TargetKey>> = {
  drawer1: 'drawer-accounts',
  drawer2: 'drawer-accounts',
  drawer3: 'drawer-accounts',
  drawer4: 'drawer-accounts',
};

/**
 * «Начать сначала» in the hint: the app locks again, on to the next PIN (the
 * hint text names it: «Дальше — PIN 2222»).
 */
export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['drawer1', 'drawer2', 'drawer3']);

/**
 * ☰ sits at the top left, right over the first chats, and its hint names them.
 * The hint is docked into the list under the bar (the arrow points up at ☰):
 * it pushes the chats down instead of covering them.
 */
export const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>(['menu']);

/** The Honeypot script for the shared engine. */
export const HONEYPOT_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  taps: TAPS,
  look: LOOK,
  nextButton: NEXT_BUTTON,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
  docked: DOCKED,
};

/**
 * The outro after the last menu, in ms (longer than UI motion on purpose):
 * the side menu slides away, the secret account's list slowly dims to 85% and
 * the tagline types out. It stays whole (no erase): the end buttons come over it.
 */
export const HONEYPOT_OUTRO: OutroTiming = {
  calm: 500,
  dimIn: 3000,
  type: 2500,
  hold: 1500,
  erase: 0,
  dimOut: 0,
};

/** Length of the outro (7.5 s); then the finale. */
export const OUTRO_END = outroPhases(HONEYPOT_OUTRO).end;

/** The side menu slides out during the first moments of the outro. */
export const DRAWER_CLOSE_MS = 300;
