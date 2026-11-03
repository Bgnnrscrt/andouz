/*
 * «Проверь сам» — Andusta's ghost mode in stories (scenario 2026-11-03, №1).
 * Two phones: yours and Liza's 💔 (your ex). Try 1, Instagram: from the home
 * screen open Instagram, watch Liza's story; then Liza's phone: she opens her
 * viewers and you are on top. The screen dims: «Лиза всё видит 😳 / Теперь
 * попробуй в / Andusta». Try 2, Andusta: tap ⚡, turn on «Невидимка в Stories…»,
 * «Готово», watch her story again; on Liza's phone you are not on the list.
 * Then the outro: dim, tagline, end buttons. Shared engine: engine.ts +
 * useSandbox.ts; texts: ghostStoriesCopy.ts.
 */

import { outroPhases, progressAt, type Flow, type OutroTiming } from './engine';

export const STEPS = [
  'idle',
  // Try 1 — Instagram, your phone
  'tHome',
  'tSplash',
  'tFeed',
  'tStory',
  'tFeedSeen',
  // Liza's phone
  'lStory',
  'lViewers',
  'tLine',
  // Try 2 — Andusta, your phone
  'aHome',
  'aSplash',
  'aFeed',
  'aMenu',
  'aMenuOn',
  'aFeed2',
  'aStory',
  'aFeedSeen',
  // Liza's phone again
  'lStory2',
  'lViewers2',
  // The screen dims, the tagline types; then the end buttons over the dim
  'outro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

export type TargetKey =
  | 'app-instagram'
  | 'app-andusta'
  | 'story-liza'
  | 'viewers'
  | 'viewer-you'
  | 'viewers-list'
  | 'andusta-fab'
  | 'sw-ghost-story'
  | 'menu-done';

/** As in the AR masks: first steps 2 s, familiar steps and chains 1.5 s, the «wow» 0.9 s. */
export const HINT_DELAY_MS = 3000;
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  tHome: 2000,
  tFeed: 2000,
  lStory: 1500,
  lViewers: 1500,
  aHome: 1500,
  aFeed: 1500,
  aMenu: 1500,
  aMenuOn: 1500,
  aFeed2: 1500,
  lStory2: 1500,
  lViewers2: 900,
};

/** A story plays this long, then closes by itself. */
export const STORY_MS = 3000;

export const AUTO_MS: Partial<Record<Step, number>> = {
  tSplash: 1300,
  tStory: STORY_MS,
  /** The ring has turned grey: a moment to see it, then Liza's phone. */
  tFeedSeen: 1200,
  aSplash: 1300,
  aStory: STORY_MS,
  aFeedSeen: 1200,
  /** «Тебя в списке нет», then the outro. */
  lViewers2: 4500,
};

export const TAP: Partial<Record<Step, TargetKey>> = {
  tHome: 'app-instagram',
  tFeed: 'story-liza',
  lStory: 'viewers',
  aHome: 'app-andusta',
  aFeed: 'andusta-fab',
  aMenu: 'sw-ghost-story',
  aMenuOn: 'menu-done',
  aFeed2: 'story-liza',
  lStory2: 'viewers',
};

export const LOOK: Partial<Record<Step, TargetKey>> = {
  lViewers: 'viewer-you',
  lViewers2: 'viewers-list',
};

export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['lViewers']);

export const GHOST_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  look: LOOK,
  nextButton: NEXT_BUTTON,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
};

/** After try 1 (as in the AR masks): dim, «… / Теперь попробуй в / Andusta», 5.3 s. */
export const LINE: OutroTiming = { calm: 300, dimIn: 1600, type: 1600, hold: 1800, erase: 0, dimOut: 0 };
export const LINE_END = outroPhases(LINE).end;

/** The outro: dim to 85%, the tagline types and stays; the finale raises it over the buttons. */
export const OUTRO: OutroTiming = { calm: 400, dimIn: 3000, type: 2500, hold: 1500, erase: 0, dimOut: 0 };
export const OUTRO_END = outroPhases(OUTRO).end;

/** Whose phone is on screen. */
export type PhoneId = 'you' | 'liza';
/** Which try: t = Instagram, a = Andusta (Liza's phone is always Instagram). */
export type AppKey = 't' | 'a';
export type ScreenId = 'start' | 'home' | 'splash' | 'feed' | 'story' | 'own' | 'viewers';

export const phoneOf = (s: Step): PhoneId =>
  s.startsWith('l') || s === 'tLine' || s === 'outro' || s === 'finale' ? 'liza' : 'you';

export const appOf = (s: Step): AppKey => (s.startsWith('a') ? 'a' : 't');

/** The second visit to Liza's phone (after try 2). */
export const secondVisit = (s: Step): boolean => s === 'lStory2' || s === 'lViewers2' || s === 'outro' || s === 'finale';

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
    case 'tStory':
    case 'aStory':
      return 'story';
    case 'lStory':
    case 'lStory2':
      return 'own';
    case 'lViewers':
    case 'lViewers2':
    case 'tLine':
    case 'outro':
    case 'finale':
      return 'viewers';
    default:
      return 'feed';
  }
};

/** The clock: +1 minute with every try and every change of phone. */
export const clockOf = (s: Step): string => {
  if (phoneOf(s) === 'liza') return secondVisit(s) ? '18:44' : '18:42';
  return appOf(s) === 'a' ? '18:43' : '18:41';
};

/** What is on screen (the spotlight is measured again when it changes). */
export const viewOf = (s: Step): string => (s === 'idle' ? 'start' : `${phoneOf(s)}-${appOf(s)}-${screenOf(s)}`);

/** Liza's ring is grey once you watched her story (until try 2 starts). */
export const storySeen = (s: Step): boolean => s === 'tFeedSeen' || s === 'aFeedSeen';

/** The ghost switch is on from the tap until the end. */
export const ghostOn = (s: Step): boolean =>
  ['aMenuOn', 'aFeed2', 'aStory', 'aFeedSeen', 'lStory2', 'lViewers2', 'outro', 'finale'].includes(s);

export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);
