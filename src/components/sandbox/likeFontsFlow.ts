/*
 * «Проверь сам» — Andusta's lime-green like and fonts (scenario 2026-11-03,
 * №13). One phone, two tries. Try 1, Instagram: like Katya's cake with a
 * double tap — a red heart; heart colour and font can't change there. The
 * screen dims: «Как у всех ❤️ / Теперь попробуй в / Andusta». Try 2, Andusta:
 * the same double tap gives a lime heart 💚; then ⚡ → «Менеджер кастомных
 * шрифтов» → «С засечками», or your own file → MyFont.ttf → «ГОТОВО»: the feed
 * is in the new font. Shared engine: engine.ts + useSandbox.ts; texts:
 * likeFontsCopy.ts.
 */

import { outroPhases, progressAt, type Flow, type OutroTiming } from './engine';

export const STEPS = [
  'idle',
  // Try 1 — Instagram
  'tHome',
  'tSplash',
  'tFeed',
  'tLiked',
  'tLine',
  // Try 2 — Andusta
  'aHome',
  'aSplash',
  'aFeed',
  'aLiked',
  'aFab',
  'aMenu',
  'aFonts',
  'aFontPicked',
  'aFiles',
  'aFontLoaded',
  'aFeedFont',
  'outro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

export type TargetKey =
  | 'app-instagram'
  | 'app-andusta'
  | 'post-photo'
  | 'like-btn'
  | 'post'
  | 'andusta-fab'
  | 'btn-fonts'
  | 'font-serif'
  | 'pick-file'
  | 'file-myfont'
  | 'fonts-done';

export const HINT_DELAY_MS = 3000;
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  tHome: 2000,
  tFeed: 2000,
  tLiked: 1500,
  aHome: 1500,
  aFeed: 1500,
  aLiked: 900,
  aFab: 900,
  aMenu: 1500,
  aFonts: 1500,
  aFontPicked: 1500,
  aFiles: 1500,
  aFontLoaded: 1500,
  aFeedFont: 900,
};

export const AUTO_MS: Partial<Record<Step, number>> = {
  tSplash: 1300,
  aSplash: 1300,
  /** The lime heart, a moment to look at it. */
  aLiked: 2600,
  /** The feed in the new font, then the outro. */
  aFeedFont: 3200,
};

export const TAP: Partial<Record<Step, TargetKey>> = {
  tHome: 'app-instagram',
  tFeed: 'post-photo',
  aHome: 'app-andusta',
  aFeed: 'post-photo',
  aFab: 'andusta-fab',
  aMenu: 'btn-fonts',
  aFonts: 'font-serif',
  aFontPicked: 'pick-file',
  aFiles: 'file-myfont',
  aFontLoaded: 'fonts-done',
};

/** A like is a double tap: two taps on the photo. */
export const TAPS: Partial<Record<Step, number>> = { tFeed: 2, aFeed: 2 };

export const LOOK: Partial<Record<Step, TargetKey>> = {
  tLiked: 'like-btn',
  aLiked: 'like-btn',
  aFeedFont: 'post',
};

export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['tLiked']);

export const LIKE_FONTS_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  taps: TAPS,
  look: LOOK,
  nextButton: NEXT_BUTTON,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
};

export const LINE: OutroTiming = { calm: 300, dimIn: 1600, type: 1600, hold: 1800, erase: 0, dimOut: 0 };
export const LINE_END = outroPhases(LINE).end;

export const OUTRO: OutroTiming = { calm: 400, dimIn: 3000, type: 2500, hold: 1500, erase: 0, dimOut: 0 };
export const OUTRO_END = outroPhases(OUTRO).end;

export type AppKey = 't' | 'a';
export type ScreenId = 'start' | 'home' | 'splash' | 'feed';
/** What lies over the feed: Andusta's menu, the fonts window, the file picker. */
export type LayerId = 'none' | 'menu' | 'fonts' | 'files';

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
    default:
      return 'feed';
  }
};

export const layerOf = (s: Step): LayerId => {
  switch (s) {
    case 'aMenu':
      return 'menu';
    case 'aFonts':
    case 'aFontPicked':
    case 'aFontLoaded':
      return 'fonts';
    case 'aFiles':
      return 'files';
    default:
      return 'none';
  }
};

export const clockOf = (s: Step): string => (appOf(s) === 'a' ? '18:42' : '18:41');

/** The feed stays the same screen under the windows: only the layer changes the view key. */
export const viewOf = (s: Step): string => (s === 'idle' ? 'start' : `${appOf(s)}-${screenOf(s)}-${layerOf(s)}`);

/** The post is liked from the double tap on. */
export const likedAt = (s: Step): boolean =>
  !['tFeed', 'aFeed', 'idle', 'tHome', 'tSplash', 'aHome', 'aSplash'].includes(s);

/** The big heart pops right after the double tap. */
export const bigHeartAt = (s: Step): boolean => s === 'tLiked' || s === 'aLiked';

/** Your own font is applied from «Шрифт загружен и применён» on. */
export const customFontAt = (s: Step): boolean =>
  s === 'aFontLoaded' || s === 'aFeedFont' || s === 'outro' || s === 'finale';

export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);
