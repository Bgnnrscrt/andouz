/*
 * «Проверь сам» — the A-B-C bridge sandbox script (owner-approved 2026-11-01).
 * The flow is a fixed list of steps. A step is either timed (AUTO_MS),
 * waits for a tap on one element (TAP), or waits for the button in the hint
 * (NEXT_BUTTON). Every transition goes to the next step in STEPS.
 */

export type PhoneId = 'a' | 'b' | 'c';
export type ScreenId = 'start' | 'splash' | 'list' | 'chat' | 'topics' | 'topic';

export const STEPS = [
  'idle',
  // Phone 1 — the visitor's AndoGram (account A)
  'aSplash',
  'aList',
  'aTyping',
  'aOpenChat',
  'aReply',
  'aEditWait',
  'aBack',
  'aArchiveIn',
  'aOpenArchive',
  'aTopicsWait',
  'aOpenTopic',
  'aTopic',
  // Phone 2 — plain Telegram with the second account (B)
  'bSplash',
  'bOpenArchive',
  'bTopicsWait',
  'bOpenTopic',
  'bReply',
  'bSent',
  // The friend's phone (C)
  'cIncoming',
  'cTyping',
  'cSent',
  // Back on phone 2
  'bReceived',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

/** Elements a step points at (rendered with a matching data-sbx attribute). */
export type TargetKey =
  | 'row-friend'
  | 'row-archive'
  | 'topic-friend'
  | 'send'
  | 'back'
  | 'card-edit'
  | 'msg-sent'
  | 'msg-new'
  | 'msg-reply'
  | 'card-reply';

export const nextStep = (s: Step): Step =>
  STEPS[Math.min(STEPS.indexOf(s) + 1, STEPS.length - 1)];

/** True once the flow has reached (or passed) `s`. */
export const reached = (current: Step, s: Step): boolean =>
  STEPS.indexOf(current) >= STEPS.indexOf(s);

/** 0…1, for the progress bar. */
export const progressOf = (s: Step): number => STEPS.indexOf(s) / (STEPS.length - 1);

/** Timed steps: go to the next step after N ms (delays from the owner's spec). */
export const AUTO_MS: Partial<Record<Step, number>> = {
  aSplash: 1300,
  aList: 2000,
  aTyping: 2000,
  aEditWait: 1700,
  aArchiveIn: 1000,
  aTopicsWait: 1000,
  bSplash: 1300,
  bTopicsWait: 1000,
};

/** Steps that wait for a tap on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  aOpenChat: 'row-friend',
  aReply: 'send',
  aBack: 'back',
  aOpenArchive: 'row-archive',
  aOpenTopic: 'topic-friend',
  bOpenArchive: 'row-archive',
  bOpenTopic: 'topic-friend',
  bReply: 'send',
};

/** Steps that only spotlight an element (the hint has a button, or no hint at all). */
export const LOOK: Partial<Record<Step, TargetKey>> = {
  aTyping: 'row-friend',
  aTopic: 'card-edit',
  bSent: 'msg-sent',
  cIncoming: 'msg-new',
  cSent: 'msg-reply',
  bReceived: 'card-reply',
};

/** Steps that wait for the button inside the hint. */
export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>([
  'aTopic',
  'bSent',
  'cIncoming',
  'cSent',
  'bReceived',
]);

export const phoneOf = (s: Step): PhoneId => {
  if (s === 'finale' || s.startsWith('b')) return 'b';
  if (s.startsWith('c')) return 'c';
  return 'a';
};

export const screenOf = (s: Step): ScreenId => {
  switch (s) {
    case 'idle':
      return 'start';
    case 'aSplash':
    case 'bSplash':
      return 'splash';
    case 'aList':
    case 'aTyping':
    case 'aOpenChat':
    case 'aArchiveIn':
    case 'aOpenArchive':
    case 'bOpenArchive':
      return 'list';
    case 'aReply':
    case 'aEditWait':
    case 'aBack':
    case 'cIncoming':
    case 'cTyping':
    case 'cSent':
      return 'chat';
    case 'aTopicsWait':
    case 'aOpenTopic':
    case 'bTopicsWait':
    case 'bOpenTopic':
      return 'topics';
    default:
      return 'topic';
  }
};
