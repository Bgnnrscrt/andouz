/*
 * «Проверь сам» — Andusta's view-once photos (scenario 2026-11-03, №6). One
 * phone, two tries. Try 1, Instagram: Timur's notification → the chat («Смотри
 * быстро, это одноразовое 😂») → the photo opens for 2.5 s and closes; the
 * bubble turns grey «Просмотрено» and doesn't open again. The screen dims:
 * «Один раз — и всё 😅 / Теперь попробуй в / Andusta». Try 2, Andusta: the
 * same, but after the photo the bubble stays a photo and opens once more.
 * Screenshots are not shown (owner's question 5 is open). Shared engine:
 * engine.ts + useSandbox.ts; texts: viewOnceCopy.ts.
 */

import { outroPhases, progressAt, type Flow, type OutroTiming } from './engine';

export const STEPS = [
  'idle',
  // Try 1 — Instagram
  'tHome',
  'tSplash',
  'tFeed',
  'tChat',
  'tPhoto',
  'tChatSeen',
  'tNope',
  'tLine',
  // Try 2 — Andusta
  'aHome',
  'aSplash',
  'aFeed',
  'aChat',
  'aPhoto',
  'aChatAgain',
  'aPhoto2',
  'aKept',
  'outro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

export type TargetKey = 'app-instagram' | 'app-andusta' | 'notif' | 'vo-bubble';

export const HINT_DELAY_MS = 3000;
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  tHome: 2000,
  /** The notification slides in after 0.6 s. */
  tFeed: 2000,
  tChat: 2000,
  tChatSeen: 1500,
  tNope: 300,
  aHome: 1500,
  aFeed: 1500,
  aChat: 1500,
  aChatAgain: 1500,
  aKept: 900,
};

/** The photo stays open this long (the second look in Andusta a bit shorter). */
export const PHOTO_MS = 2500;
export const PHOTO2_MS = 2000;

export const AUTO_MS: Partial<Record<Step, number>> = {
  tSplash: 1300,
  tPhoto: PHOTO_MS,
  aSplash: 1300,
  aPhoto: PHOTO_MS,
  aPhoto2: PHOTO2_MS,
  aKept: 3500,
};

export const TAP: Partial<Record<Step, TargetKey>> = {
  tHome: 'app-instagram',
  tFeed: 'notif',
  tChat: 'vo-bubble',
  tChatSeen: 'vo-bubble',
  aHome: 'app-andusta',
  aFeed: 'notif',
  aChat: 'vo-bubble',
  aChatAgain: 'vo-bubble',
};

export const LOOK: Partial<Record<Step, TargetKey>> = {
  tNope: 'vo-bubble',
  aKept: 'vo-bubble',
};

export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['tNope']);

/** The photo bubble is the newest message: its hint goes into the chat under it (as in the bridge). */
export const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>(['vo-bubble']);

export const VIEW_ONCE_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  look: LOOK,
  nextButton: NEXT_BUTTON,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
  docked: DOCKED,
};

export const LINE: OutroTiming = { calm: 300, dimIn: 1600, type: 1600, hold: 1800, erase: 0, dimOut: 0 };
export const LINE_END = outroPhases(LINE).end;

export const OUTRO: OutroTiming = { calm: 400, dimIn: 3000, type: 2500, hold: 1500, erase: 0, dimOut: 0 };
export const OUTRO_END = outroPhases(OUTRO).end;

export type AppKey = 't' | 'a';
export type ScreenId = 'start' | 'home' | 'splash' | 'feed' | 'chat' | 'photo';

export const appOf = (s: Step): AppKey => (s.startsWith('a') || s === 'outro' || s === 'finale' ? 'a' : 't');

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
    case 'tFeed':
    case 'aFeed':
      return 'feed';
    case 'tPhoto':
    case 'aPhoto':
    case 'aPhoto2':
      return 'photo';
    default:
      return 'chat';
  }
};

export const clockOf = (s: Step): string => (appOf(s) === 'a' ? '18:42' : '18:41');

export const viewOf = (s: Step): string => (s === 'idle' ? 'start' : `${appOf(s)}-${screenOf(s)}`);

/** The bubble: new until the photo was seen; then grey in Instagram, still a photo in Andusta. */
export const bubbleOf = (s: Step): 'new' | 'opened' | 'kept' => {
  if (s === 'tChatSeen' || s === 'tNope' || s === 'tLine') return 'opened';
  if (s === 'aChatAgain' || s === 'aKept' || s === 'outro' || s === 'finale') return 'kept';
  return 'new';
};

export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);
