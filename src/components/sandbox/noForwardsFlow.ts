/*
 * «Проверь сам» — the No-Forwards bypass sandbox script (owner, 2026-11-01).
 * The channel «Уроки харизмы» forbids saving and forwarding its posts. Try 1:
 * in AndoGram the visitor saves its video lesson to Saved Messages and nothing
 * stops them («И что такого?» — the restriction is never mentioned). Try 2: the
 * same steps in the official Telegram, whose menu has no «Save» and no «Forward»
 * and a toast says why; then the tagline over the dimmed screen.
 * The flow is a fixed list of steps on the shared engine (engine.ts): timed steps
 * (AUTO_MS), taps (TAP), hints HINT_DELAY_MS after their step starts
 * (HINT_DELAY_AT: sooner). Two steps run on their own timeline: the line after
 * try 1 (SHRUG) and the outro (T_OUTRO).
 */

import { outroPhases, progressAt, type Flow, type OutroTiming } from './engine';

/** The app on the phone: a = AndoGram (try 1), t = the official Telegram (try 2). */
export type AppKey = 'a' | 't';
export type ScreenId = 'start' | 'splash' | 'list' | 'channel';

export const STEPS = [
  'idle',
  // Try 1 — AndoGram, already open on the chat list
  'aList',
  'aChannel',
  'aMenu',
  'aSaved',
  'aShrug',
  // Try 2 — the official Telegram
  'tSplash',
  'tList',
  'tChannel',
  'tMenu',
  'tOutro',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

/** Elements a step waits for (rendered with a matching data-sbx attribute). */
export type TargetKey = 'row-channel' | 'post-side' | 'menu-saved';

/** A hint appears this long after its step starts (as in the bridge: 3 s). */
export const HINT_DELAY_MS = 3000;

/** Owner: the focus on the channel comes «через 2 секунды»; the menu is quick to read. */
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  aList: 2000,
  aMenu: 2000,
  tList: 2000,
};

/** Timed steps: go to the next step after N ms. */
export const AUTO_MS: Partial<Record<Step, number>> = {
  /** The «saved» toast, then the line. */
  aSaved: 1600,
  tSplash: 1300,
  /** Telegram's menu without Save/Forward and the restriction toast: 3 s (owner). */
  tMenu: 3000,
};

/** Steps that wait for a tap on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  aList: 'row-channel',
  /** Owner: «тап сбоку возле видео» — the free strip beside the video post. */
  aChannel: 'post-side',
  aMenu: 'menu-saved',
  tList: 'row-channel',
  tChannel: 'post-side',
};

/** The No-Forwards script for the shared engine. */
export const NOFORWARDS_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
};

/**
 * After try 1, ms: the screen slowly dims and the big line types out
 * («И что такого? 😅 …»); it stays whole until Telegram takes the phone.
 */
export const SHRUG: OutroTiming = { calm: 400, dimIn: 2000, type: 1800, hold: 2400, erase: 0, dimOut: 0 };
export const SHRUG_END = outroPhases(SHRUG).end;

/**
 * The outro after try 2, ms: Telegram's menu and toast close in the first
 * ~300 ms, the screen slowly dims to 85%, the tagline types out and stays
 * (the finale keeps it, raised over the end buttons).
 */
export const T_OUTRO: OutroTiming = { calm: 400, dimIn: 3000, type: 3000, hold: 1500, erase: 0, dimOut: 0 };
export const T_OUTRO_END = outroPhases(T_OUTRO).end;

export const appOf = (s: Step): AppKey => (s.startsWith('t') || s === 'finale' ? 't' : 'a');

export const screenOf = (s: Step): ScreenId => {
  switch (s) {
    case 'idle':
      return 'start';
    case 'tSplash':
      return 'splash';
    case 'aList':
    case 'tList':
      return 'list';
    default:
      return 'channel';
  }
};

/** What is on screen at a step (the spotlight is measured again when it changes). */
export const viewOf = (s: Step): string => (s === 'idle' ? 'start' : `${appOf(s)}-${screenOf(s)}`);

/** The post's context menu: open, closing (fades out), or not there. */
export const menuAt = (s: Step): 'open' | 'closing' | null =>
  s === 'aMenu' || s === 'tMenu' ? 'open' : s === 'aSaved' || s === 'tOutro' ? 'closing' : null;

/** The toast: «saved» after try 1, «restricted» in Telegram; it fades out on the next step. */
export const toastAt = (s: Step): { kind: 'saved' | 'restricted'; closing: boolean } | null => {
  switch (s) {
    case 'aSaved':
      return { kind: 'saved', closing: false };
    case 'aShrug':
      return { kind: 'saved', closing: true };
    case 'tMenu':
      return { kind: 'restricted', closing: false };
    case 'tOutro':
      return { kind: 'restricted', closing: true };
    default:
      return null;
  }
};

/** 0…1, for the progress bar. `within` (0…1) moves it inside a timeline step. */
export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);
