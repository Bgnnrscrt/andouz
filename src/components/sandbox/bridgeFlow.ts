/*
 * «Проверь сам» — the A-B-C bridge sandbox script, v2 (owner-approved 2026-11-01).
 * After the edit the visitor leaves the chat on phone 1 and sees the original in
 * AndoGram's own «Личный архив» first (owner, 2026-11-01), then takes phone 2.
 * Back on phone 1 the chat list comes first (owner, 2026-11-02): the reply sent
 * from phone 2 is the friend's last message there; the visitor opens the chat.
 * The flow is a fixed list of steps. A step is either timed (AUTO_MS), waits
 * for a tap on one element (TAP), or waits for the button in the hint
 * (NEXT_BUTTON). Every transition goes to the next step in STEPS.
 * A hint shows HINT_DELAY_MS after its step starts, so the visitor can read the
 * screen first (HINT_DELAY_AT: sooner on some steps); the target can be tapped
 * earlier. The outro (dim, tagline, the ex's message that gets deleted) runs on
 * its own timeline (OUTRO). The engine (steps, hints, spotlight) is shared by all
 * sandboxes: engine.ts + useSandbox.ts; BRIDGE_FLOW plugs this script into it.
 */

import { isReached, lineAt, outroPhases, progressAt, stepAfter, type Flow, type LineState } from './engine';

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
  // Still phone 1: back to the list, the new «Личный архив», the friend's topic
  'aArchiveIn',
  'aFriendTopic',
  'aEditCard',
  // Phone 2 — plain Telegram with the second account (B)
  'bSplash',
  'bOpenArchive',
  'bOpenTopic',
  'bReply',
  'bSent',
  // Back on phone 1: the chat list, then the chat with the friend
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
  | 'card-edit'
  | 'msg-sent';

export const nextStep = (s: Step): Step => stepAfter(STEPS, s);

/** True once the flow has reached (or passed) `s`. */
export const reached = (current: Step, s: Step): boolean => isReached(STEPS, current, s);

/** 0…1, for the progress bar. `within` (0…1) moves it inside a long step. */
export const progressOf = (s: Step, within = 0): number => progressAt(STEPS, s, within);

/** A hint appears this long after its step starts (owner's spec: 3 s). */
export const HINT_DELAY_MS = 3000;

/** Steps whose hint comes sooner. After the outro: at once (owner, 2026-11-01). */
export const HINT_DELAY_AT: Partial<Record<Step, number>> = {
  /** Back from phone 2: the visitor knows the list by now. */
  aBack: 1500,
  aOpenArchive: 0,
};

/** Timed steps: go to the next step after N ms (delays from the owner's spec). */
export const AUTO_MS: Partial<Record<Step, number>> = {
  aSplash: 1300,
  aList: 2000,
  aTyping: 2000,
  /**
   * The friend edits his message 1 s after the chat opens: «утопил» silently
   * becomes «потерял» and «пожалуйста» is added at its end, so the bubble grows
   * by a line and «изменено» lights up. Which word changed is not shown (owner,
   * 2026-11-02: the visitor should wonder «а что изменилось?»).
   */
  aRead: 1000,
  bSplash: 1300,
  aFriendTyping: 2000,
  /** The final buttons come 4 s after the deleted message is on screen. */
  aDeleted: 4000,
};

/** Steps that wait for a tap on one element. */
export const TAP: Partial<Record<Step, TargetKey>> = {
  aOpenChat: 'row-friend',
  aEdited: 'back',
  aArchiveIn: 'row-archive',
  aFriendTopic: 'topic-friend',
  bOpenArchive: 'row-archive',
  bOpenTopic: 'topic-friend',
  bReply: 'send',
  aBack: 'row-friend',
  aSecret: 'send',
  aSecretSent: 'back',
  aOpenArchive: 'row-archive',
  aOpenTopic: 'topic-ex',
};

/** Steps that only spotlight an element (their hint has a button). */
export const LOOK: Partial<Record<Step, TargetKey>> = {
  aEditCard: 'card-edit',
  bSent: 'msg-sent',
};

/** Steps that wait for the button inside the hint. */
export const NEXT_BUTTON: ReadonlySet<Step> = new Set<Step>(['aEditCard', 'bSent']);

/**
 * Targets at the bottom of a chat (the send button, the newest message).
 * Their hint is docked into the chat between the messages and the input, so it
 * pushes the conversation up instead of covering it.
 */
export const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>(['send', 'msg-edited', 'card-edit', 'msg-sent']);

/** The bridge script for the shared engine. */
export const BRIDGE_FLOW: Flow<Step> = {
  steps: STEPS,
  auto: AUTO_MS,
  tap: TAP,
  look: LOOK,
  nextButton: NEXT_BUTTON,
  hintDelay: HINT_DELAY_MS,
  hintDelayAt: HINT_DELAY_AT,
  docked: DOCKED,
  dockAbove: new Set<TargetKey>(['send']),
};

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
    case 'aArchiveIn':
    case 'bOpenArchive':
    case 'aBack':
    case 'aOutro':
    case 'aOpenArchive':
      return 'list';
    case 'aRead':
    case 'aEdited':
    case 'aFriendTyping':
    case 'aSecret':
    case 'aSecretSent':
      return 'chat';
    case 'aFriendTopic':
    case 'bOpenTopic':
    case 'aOpenTopic':
      return 'topics';
    default:
      return 'topic';
  }
};

/**
 * The outro after the visitor leaves the chat, in ms (owner's spec, 2026-11-01):
 * the list dims to 85%, the tagline types; once it is fully on screen the ex's
 * message arrives and 0.5 s later her chat is gone. Then the tagline slowly
 * erases, and within 1 s after it the screen is back and the hint shows at once.
 */
export const OUTRO = {
  /** The chat list («Личный архив» on top with the latest card), before the screen dims. */
  calm: 1000,
  /** The chat list slowly dims to 85%. */
  dimIn: 3000,
  /** The tagline types out. */
  type: 2500,
  /** The whole tagline stays on screen: the ex's message comes and goes meanwhile. */
  hold: 1200,
  /** The tagline erases letter by letter from the end; its first letter goes last. */
  erase: 2500,
  /** The dim fades out right after the tagline is gone. */
  dimOut: 1000,
  /** The ex's chat stays this long after it arrives (with the full tagline). */
  exStay: 500,
  /** Fade-out of the ex's row before it leaves the list. */
  exLeave: 280,
} as const;

/** Phase start times of the outro, in ms from its start. */
export const OUTRO_AT = (() => {
  const at = outroPhases(OUTRO);
  return { ...at, exIn: at.hold, exOut: at.hold + OUTRO.exStay };
})();

export interface OutroState extends LineState {
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
  const { exIn, exOut } = OUTRO_AT;
  return {
    ...lineAt(t, len, instant, OUTRO),
    exIn: t >= exIn,
    exLeaving: t >= exOut && t < exOut + OUTRO.exLeave,
    exGone: t >= exOut + OUTRO.exLeave,
  };
};
