/*
 * «Проверь сам» — the A-B-C bridge sandbox script, v2 (owner-approved 2026-11-01).
 * The flow is a fixed list of steps. A step is either timed (AUTO_MS), waits
 * for a tap on one element (TAP), or waits for the button in the hint
 * (NEXT_BUTTON). Every transition goes to the next step in STEPS.
 * A hint shows HINT_DELAY_MS after its step starts, so the visitor can read the
 * screen first; the target can be tapped earlier. The outro (dim, tagline, the
 * ex's message that gets deleted) runs on its own timeline (OUTRO).
 */

export type PhoneId = 'a' | 'b';
export type ScreenId = 'start' | 'splash' | 'list' | 'chat' | 'topics' | 'topic';

export const STEPS = [
  'idle',
  // Phone 1 — the visitor's AndoGram (account A)
  'aSplash',
  'aList',
  'aTyping',
  'aOpenChat',
  'aRead',
  'aEdited',
  // Phone 2 — plain Telegram with the second account (B)
  'bSplash',
  'bOpenArchive',
  'bOpenTopic',
  'bReply',
  'bSent',
  // Back on phone 1
  'aBack',
  'aFriendTyping',
  'aSecret',
  'aSecretSent',
  'aOutro',
  'aOpenArchive',
  'aOpenTopic',
  'aDeleted',
  'finale',
] as const;

export type Step = (typeof STEPS)[number];

/** Elements a step points at (rendered with a matching data-sbx attribute). */
export type TargetKey =
  | 'row-friend'
  | 'row-archive'
  | 'topic-friend'
  | 'topic-ex'
  | 'send'
  | 'back'
  | 'msg-edited'
  | 'msg-sent';

export const nextStep = (s: Step): Step =>
  STEPS[Math.min(STEPS.indexOf(s) + 1, STEPS.length - 1)];

/** True once the flow has reached (or passed) `s`. */
export const reached = (current: Step, s: Step): boolean =>
  STEPS.indexOf(current) >= STEPS.indexOf(s);

/** 0…1, for the progress bar. `within` (0…1) moves it inside a long step. */
export const progressOf = (s: Step, within = 0): number =>
  (STEPS.indexOf(s) + within) / (STEPS.length - 1);

/** A hint appears this long after its step starts (owner's spec: 3 s). */
export const HINT_DELAY_MS = 3000;

/** Timed steps: go to the next step after N ms (delays from the owner's spec). */
export const AUTO_MS: Partial<Record<Step, number>> = {
  aSplash: 1300,
  aList: 2000,
  aTyping: 2000,
  /** «утопил» becomes «потерял» 1 s after the chat opens. */
  aRead: 1000,
  bSplash: 1300,
  aBack: 1200,
  aFriendTyping: 2000,
  /** The final buttons come 4 s after the deleted message is on screen. */
  aDeleted: 4000,
};

/** Steps that wait for a tap on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  aOpenChat: 'row-friend',
  bOpenArchive: 'row-archive',
  bOpenTopic: 'topic-friend',
  bReply: 'send',
  aSecret: 'send',
  aSecretSent: 'back',
  aOpenArchive: 'row-archive',
  aOpenTopic: 'topic-ex',
};

/** Steps that only spotlight an element (their hint has a button). */
export const LOOK: Partial<Record<Step, TargetKey>> = {
  aEdited: 'msg-edited',
  bSent: 'msg-sent',
};

/** Steps that wait for the button inside the hint. */
export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['aEdited', 'bSent']);

export const phoneOf = (s: Step): PhoneId => (s.startsWith('b') ? 'b' : 'a');

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
    case 'bOpenArchive':
    case 'aOutro':
    case 'aOpenArchive':
      return 'list';
    case 'aRead':
    case 'aEdited':
    case 'aBack':
    case 'aFriendTyping':
    case 'aSecret':
    case 'aSecretSent':
      return 'chat';
    case 'bOpenTopic':
    case 'aOpenTopic':
      return 'topics';
    default:
      return 'topic';
  }
};

/** The outro after the visitor leaves the chat, in ms (owner's spec). */
export const OUTRO = {
  /** The chat list with the new «Личный архив» row, before the screen dims. */
  calm: 1000,
  /** The chat list slowly dims to ~70%. */
  dimIn: 3000,
  /** The tagline types out. */
  type: 2500,
  /** The whole tagline stays on screen. */
  hold: 1200,
  /** The tagline erases letter by letter from the end; its first letter goes last. */
  erase: 2500,
  /**
   * The tagline is gone: at that moment the ex's chat vanishes. The dim stays,
   * empty, and the screen comes back about 4 s later (+ dimOut).
   */
  rest: 3500,
  /** The dim fades out. */
  dimOut: 1000,
  /** The ex's message arrives this long after the tagline starts typing. */
  exArrives: 800,
  /** Fade-out of the ex's row before it leaves the list. */
  exLeave: 280,
} as const;

/** Phase start times of the outro, in ms from its start. */
export const OUTRO_AT = (() => {
  const dim = OUTRO.calm;
  const type = dim + OUTRO.dimIn;
  const hold = type + OUTRO.type;
  const erase = hold + OUTRO.hold;
  const rest = erase + OUTRO.erase;
  const undim = rest + OUTRO.rest;
  const end = undim + OUTRO.dimOut;
  return { dim, type, hold, erase, rest, undim, end, exIn: type + OUTRO.exArrives };
})();

export interface OutroState {
  /** The dim is on (it fades in and out by CSS transition). */
  dimmed: boolean;
  /** Tagline characters shown. */
  chars: number;
  /** The caret blinks while the tagline types, holds and erases. */
  caret: boolean;
  /** The ex's message has arrived. */
  exIn: boolean;
  /** The ex's row is fading out. */
  exLeaving: boolean;
  /** The ex's chat is gone from the list. */
  exGone: boolean;
}

/**
 * Outro state at `t` ms. `len` = tagline length in characters; `instant` (reduced
 * motion) shows the whole tagline at once and removes it at once, on the same timeline.
 */
export const outroAt = (t: number, len: number, instant: boolean): OutroState => {
  const at = OUTRO_AT;
  let chars = 0;
  if (t >= at.type && t < at.rest) {
    if (instant || (t >= at.hold && t < at.erase)) chars = len;
    else if (t < at.hold) chars = Math.min(len, Math.ceil((len * (t - at.type)) / OUTRO.type));
    else chars = Math.max(1, len - Math.floor((len * (t - at.erase)) / OUTRO.erase));
  }
  // Owner: the ex's chat goes «сразу как только слоган исчез» — when its first letter is erased.
  const exOut = at.rest;
  return {
    dimmed: t >= at.dim && t < at.undim,
    chars,
    caret: t >= at.type && t < at.rest,
    exIn: t >= at.exIn,
    exLeaving: t >= exOut && t < exOut + OUTRO.exLeave,
    exGone: t >= exOut + OUTRO.exLeave,
  };
};
