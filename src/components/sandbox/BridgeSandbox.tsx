import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, LayoutGrid, Play, RotateCcw } from 'lucide-react';
import type { Language } from '../../types';
import {
  AUTO_MS,
  HINT_DELAY_MS,
  LOOK,
  NEXT_BUTTON,
  OUTRO_AT,
  TAP,
  nextStep,
  outroAt,
  phoneOf,
  progressOf,
  reached,
  screenOf,
  type Step,
  type TargetKey,
} from './bridgeFlow';
import { getBridgeCopy, type ChatSeed } from './bridgeCopy';
import { featuresHref } from './demos';
import {
  Avatar,
  ChatBar,
  ChatRow,
  Fab,
  InputBar,
  ListBar,
  Messages,
  Splash,
  StatusBar,
  TopicIcon,
  TopicRow,
  type ChatItem,
  type RowData,
  type TopicRowData,
} from './TgUi';
import './sandbox.css';

/*
 * «Проверь сам» for the AndoGram A-B-C bridge (Личный архив + мост), v2.
 * Two phones: A = the visitor's AndoGram, B = plain Telegram with the second
 * account. The friend edits a message; the visitor leaves the chat and reads the
 * original in AndoGram's «Личный архив», then on phone 2 (same archive) teases
 * him as A. Then the outro: a tagline over
 * the dimmed screen while the ex's message arrives and is deleted, and the
 * archive still has it. Everything is local mock data: nothing is sent anywhere.
 * Script and timings: bridgeFlow.ts; texts: bridgeCopy.ts.
 */

const FRIEND_COLOR = '#faa774';
const EX_COLOR = '#e17076';
const ME_COLOR = '#a695e7';
const ARCHIVE_COLOR = '#65aadd';
/** Topic colours from AndoGram's ArchiveNamingHelper palette. */
const TOPIC_COLOR = { friend: '#FF885E', ex: '#E56BD6', mom: '#DF74A1', sardor: '#60D49C' } as const;

/** The tagline starts with the brand; it is typed in the ANDO green. */
const BRAND = 'AndoGram';

/**
 * Targets at the bottom of a chat (the send button, the newest message).
 * Their hint is docked into the chat between the messages and the input, so it
 * pushes the conversation up instead of covering it.
 */
const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>(['send', 'msg-edited', 'card-edit', 'msg-sent']);

/*
 * Phone size. Narrow screens: the phone fills the width (fluid, CSS only).
 * Wider screens: it keeps a phone shape, 360 × 648…740 logical px, and the
 * whole phone is scaled down to fit the window height instead of getting squat.
 */
const PHONE_W = 360;
const PHONE_H = 740;
/** Shortest logical height (ratio 1.8); on lower windows the phone is scaled. */
const PHONE_H_MIN = 648;
/** Smallest scale; on even lower windows the page scrolls instead. */
const FIT_MIN = 0.62;
const FLUID_MAX_W = 560;
/** Gaps of .sbx (caption ↔ phone ↔ controls) and room above/below. */
const FIT_GAPS = 2 * 14;
const FIT_AIR = 24;

interface Fit {
  /** Scale of the whole phone. */
  k: number;
  /** Logical phone height before scaling, px. */
  h: number;
}

type HintSide = 'above' | 'below';

/** The green hint: text, optional «next» button, an arrow towards the target. */
function HintBox({
  text,
  button,
  onNext,
  side,
  arrowX,
  shaking,
}: {
  text: string;
  button?: string;
  onNext: () => void;
  /** Where the hint sits relative to its target (the arrow is on the opposite edge). */
  side: HintSide;
  arrowX: string;
  shaking: boolean;
}) {
  return (
    <div
      className={`sbx-hint-box${shaking ? ' sbx-hint-box--shake' : ''}`}
      data-side={side}
      style={{ '--arrow-x': arrowX } as React.CSSProperties}
    >
      <p className="sbx-hint-text">{text}</p>
      {button && (
        <button type="button" className="sbx-hint-btn" onClick={onNext}>
          {button}
          <ArrowRight size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

/**
 * The outro tagline, typed `shown` characters far. The untyped rest keeps its
 * place (invisible), so the centred lines don't jump while typing.
 */
function Tagline({ chars, shown, caret }: { chars: string[]; shown: number; caret: boolean }) {
  const brandLen = chars.join('').startsWith(BRAND) ? Array.from(BRAND).length : 0;
  const brand = chars.slice(0, Math.min(shown, brandLen)).join('');
  const text = chars.slice(brandLen, Math.max(shown, brandLen)).join('');
  return (
    <p className="sbx-tagline-text">
      {brand && <span className="sbx-tagline-brand">{brand}</span>}
      {text}
      {caret && <span className="sbx-tagline-caret" />}
      <span className="sbx-tagline-rest">{chars.slice(shown).join('')}</span>
    </p>
  );
}

/** Spotlighted element, in the phone screen's own (unscaled) px. */
interface Spot {
  x: number;
  y: number;
  w: number;
  h: number;
  sw: number;
  sh: number;
  /** Which target/screen this measurement belongs to. */
  key: string;
  /** Measured after the screen's enter animation: safe to show. */
  ready: boolean;
}

const seedRow = (s: ChatSeed): RowData => ({
  id: s.id,
  name: s.name,
  color: s.color,
  time: s.time,
  preview: s.preview,
  previewText: s.preview,
  unread: s.unread,
  muted: s.muted,
  saved: s.saved,
});

const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface BridgeSandboxProps {
  lang: Language;
  onBuy: () => void;
}

export function BridgeSandbox({ lang, onBuy }: BridgeSandboxProps) {
  const c = getBridgeCopy(lang);
  const [step, setStep] = useState<Step>('idle');
  /** The step whose hint is showing: hints wait HINT_DELAY_MS, a wrong tap shows them at once. */
  const [hintStep, setHintStep] = useState<Step | null>(null);
  const [shaking, setShaking] = useState(false);
  const [measured, setMeasured] = useState<Spot | null>(null);
  /** Time into the outro, ms. */
  const [outroT, setOutroT] = useState(0);
  const [fit, setFit] = useState<Fit | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const stepStartRef = useRef(0);
  /** The visitor drives the demo with the keyboard: keep focus on the next target. */
  const keyboardRef = useRef(false);

  const phone = phoneOf(step);
  const screen = screenOf(step);
  const want = TAP[step];
  const focusKey: TargetKey | undefined = want ?? LOOK[step];
  const hint = c.hints[step];
  const hasHint = hint !== undefined;
  const hintOn = hasHint && hintStep === step;
  const hintButton = NEXT_BUTTON.has(step) ? c.buttons[step] : undefined;
  const at = (s: Step) => reached(step, s);

  /** Start (over): a new run, so no hint counts as already shown. */
  const go = (s: Step) => {
    setHintStep(null);
    setShaking(false);
    setStep(s);
  };
  const next = () => setStep(nextStep(step));

  const tap = (key?: TargetKey) => {
    // The second click of a double click must not hit the next screen's target.
    if (performance.now() - stepStartRef.current < 300) return;
    if (key !== undefined && key === want) {
      next();
    } else if (hasHint) {
      if (hintOn) setShaking(true);
      else setHintStep(step);
    }
  };

  // A tap anywhere else on the screen (a message, the background) counts as a
  // wrong tap: it shows the hint at once. Buttons and hints handle their own clicks.
  const onScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as Element).closest('button, a, .sbx-hint, .sbx-dock')) return;
    tap();
  };

  const start = () => {
    go('aSplash');
    rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  };

  // When the step started; runs before the measuring layout effect below.
  useLayoutEffect(() => {
    stepStartRef.current = performance.now();
  }, [step]);

  // Timed steps (splashes, «печатает…», the edit, the final pause…).
  useEffect(() => {
    const ms = AUTO_MS[step];
    if (ms === undefined) return undefined;
    const id = window.setTimeout(() => setStep(nextStep(step)), ms);
    return () => window.clearTimeout(id);
  }, [step]);

  // A hint waits so the visitor can read the screen first.
  useEffect(() => {
    if (!hasHint) return undefined;
    const id = window.setTimeout(() => setHintStep(step), HINT_DELAY_MS);
    return () => window.clearTimeout(id);
  }, [step, hasHint]);

  // The outro runs on its own timeline (bridgeFlow OUTRO).
  useEffect(() => {
    if (step !== 'aOutro') return undefined;
    const t0 = performance.now();
    const id = window.setInterval(() => {
      const t = performance.now() - t0;
      if (t >= OUTRO_AT.end) setStep(nextStep('aOutro'));
      else setOutroT(t);
    }, 40);
    return () => {
      window.clearInterval(id);
      setOutroT(0);
    };
  }, [step]);

  // A wrong tap shakes the hint once.
  useEffect(() => {
    if (!shaking) return undefined;
    const id = window.setTimeout(() => setShaking(false), 450);
    return () => window.clearTimeout(id);
  }, [shaking]);

  // Wider screens: keep the phone's shape and scale it to the window height.
  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    const update = () => {
      if (window.innerWidth <= FLUID_MAX_W) {
        setFit(null);
        return;
      }
      const header = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 74;
      const chrome = (captionRef.current?.offsetHeight ?? 46) + (controlsRef.current?.offsetHeight ?? 36) + FIT_GAPS;
      const avail = Math.max(window.innerHeight - header - chrome - FIT_AIR, PHONE_H_MIN * FIT_MIN);
      const byHeight = Math.min(1, avail / PHONE_H_MIN);
      const h = Math.round(Math.min(PHONE_H, avail / byHeight));
      const k = Math.round(Math.min(byHeight, root.clientWidth / PHONE_W) * 1000) / 1000;
      setFit((prev) => (prev && prev.k === k && prev.h === h ? prev : { k, h }));
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    window.addEventListener('resize', update);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  // Measure the spotlighted element once its hint shows. Screens slide in, so a
  // hint shown early is measured again after the enter animation and only then
  // revealed. A measurement made for another target/screen is ignored.
  const spotOn = hintOn && focusKey !== undefined;
  const spotKey = `${focusKey ?? ''}|${phone}|${screen}|${lang}|${spotOn ? 'on' : ''}|${fit?.h ?? ''}`;
  useLayoutEffect(() => {
    const scr = screenRef.current;
    if (!scr || !focusKey || !spotOn) return undefined;
    let ready = false;
    const measure = () => {
      const el = scr.querySelector<HTMLElement>(`[data-sbx="${focusKey}"]`);
      if (!el) return;
      const s = scr.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      // The phone may be scaled: convert to the screen's own px.
      const k = s.width / scr.offsetWidth || 1;
      setMeasured({
        x: (r.left - s.left) / k,
        y: (r.top - s.top) / k,
        w: r.width / k,
        h: r.height / k,
        sw: scr.offsetWidth,
        sh: scr.offsetHeight,
        key: spotKey,
        ready,
      });
    };
    measure();
    let raf = 0;
    const schedule = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(scr);
    // The message list scrolls; the spotlight follows it.
    scr.addEventListener('scroll', schedule, true);
    // After the longest enter animation (phone 0.32 s, new message 0.36 s).
    const wait = Math.max(0, 400 - (performance.now() - stepStartRef.current));
    const timer = window.setTimeout(() => {
      ready = true;
      measure();
    }, wait);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      observer.disconnect();
      scr.removeEventListener('scroll', schedule, true);
    };
  }, [focusKey, spotKey, spotOn]);

  const spot = spotOn && measured && measured.key === spotKey ? measured : null;
  const spotReady = spot?.ready ?? false;

  // Keyboard users: move focus to whatever the step expects.
  useEffect(() => {
    if (!keyboardRef.current) return undefined;
    const root = rootRef.current;
    const id = window.setTimeout(() => {
      if (!root) return;
      const selector = hintButton
        ? hintOn
          ? '.sbx-hint-btn'
          : ''
        : want
          ? `[data-sbx="${want}"]`
          : step === 'finale'
            ? '.sbx-end .sbx-cta'
            : '';
      if (!selector) return;
      // Don't pull focus back from elsewhere (other parts of the page, «Начать заново»).
      const active = document.activeElement;
      if (active && active !== document.body && !screenRef.current?.contains(active)) return;
      root.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
    }, 380);
    return () => window.clearTimeout(id);
  }, [step, want, hintButton, hintOn]);

  const docked = hintOn && focusKey !== undefined && DOCKED.has(focusKey);

  // Floating hint next to its target (list rows, the back arrow).
  const hintPos = useMemo(() => {
    if (!spot) return null;
    const width = Math.min(spot.sw - 24, 262);
    const cx = spot.x + spot.w / 2;
    const left = Math.max(12, Math.min(cx - width / 2, spot.sw - width - 12));
    const arrowX = Math.max(18, Math.min(cx - left, width - 18));
    const below = spot.y + spot.h / 2 < spot.sh * 0.5;
    return below
      ? { side: 'below' as const, width, left, top: spot.y + spot.h + 14, arrowX }
      : { side: 'above' as const, width, left, bottom: spot.sh - spot.y + 14, arrowX };
  }, [spot]);

  // Docked hint: in the chat column (it takes its place when the hint shows and
  // fades in once the spotlight is measured).
  const dockSide: HintSide = focusKey === 'send' ? 'above' : 'below';
  const dockedHint =
    docked && hint ? (
      <div key={step} className={`sbx-dock sbx-dock--${dockSide}${spotReady ? ' is-ready' : ''}`}>
        <HintBox
          text={hint}
          button={hintButton}
          onNext={next}
          side={dockSide}
          arrowX={spot ? `${Math.max(18, Math.min(spot.x + spot.w / 2 - 12, spot.sw - 24 - 18))}px` : '50%'}
          shaking={shaking}
        />
      </div>
    ) : null;

  // ── The outro: dim, tagline, the ex's message comes and goes ─────────────
  const tagChars = useMemo(() => Array.from(c.tagline), [c]);
  const outro = step === 'aOutro' ? outroAt(outroT, tagChars.length, prefersReducedMotion()) : null;
  const afterOutro = at('aOpenArchive');
  const exArrived = afterOutro || (outro?.exIn ?? false);
  const exGone = afterOutro || (outro?.exGone ?? false);
  /** Rows slide down when the ex's chat arrives on top and up when it is gone. */
  const listAnim: RowData['anim'] = outro?.exGone ? 'shift' : outro?.exIn ? 'push' : undefined;

  // ── Conversation state derived from the step ─────────────────────────────
  const clock = exArrived
    ? '18:45'
    : at('aSecretSent')
      ? '18:44'
      : at('bSent')
        ? '18:43'
        : at('bSplash')
          ? '18:42'
          : '18:41';
  const { head, was, now, tail } = c.msg.long;
  const longOriginal = head + was + tail;
  const longEdited = head + now + tail;
  const editTitle = c.card.editTitle(c.friend);
  // The changed word is marked (our demo highlight; the app's card is plain text).
  const editCard = (
    <>
      {editTitle}
      {'\n'}
      {c.card.was} {head}
      <mark className="sbx-mark">{was}</mark>
      {tail}
      {'\n'}
      {c.card.now} {head}
      <mark className="sbx-mark">{now}</mark>
      {tail}
    </>
  );
  const deleteTitle = c.card.deleteTitle(c.ex);
  const secretCard = `${c.card.header(c.me, '18:44')} ${c.msg.secret}`;
  const exCard = `${c.card.header(c.ex, '18:45')} ${c.msg.ex}`;
  const fromPrefix = (who: string) => <span className="sbx-from">{who}: </span>;

  // Phone 1: chat list.
  const friendRow: RowData = {
    id: 'friend',
    name: c.friend,
    color: FRIEND_COLOR,
    sbx: 'row-friend',
    ...(!at('aOpenChat')
      ? { preview: c.msg.old, previewText: c.msg.old, time: c.ui.yesterdayShort }
      : !at('aArchiveIn')
        ? { preview: longOriginal, previewText: longOriginal, time: '18:41', unread: 1 }
        : !at('aOutro')
          ? { preview: longEdited, previewText: longEdited, time: '18:41' }
          : { preview: c.msg.secret, previewText: c.msg.secret, time: '18:44', read: true }),
    typing: step === 'aTyping' ? c.ui.typing : undefined,
  };

  const archiveRow = (who: string, text: string, time: string, fresh = false): RowData => ({
    id: 'archive',
    name: c.ui.archive,
    color: ARCHIVE_COLOR,
    muted: true,
    time,
    preview: (
      <>
        {fromPrefix(who)}
        {text}
      </>
    ),
    previewText: `${who}: ${text}`,
    sbx: 'row-archive',
    fresh,
  });

  const exRow: RowData = {
    id: 'ex',
    name: c.ex,
    color: EX_COLOR,
    time: '18:45',
    preview: c.msg.ex,
    previewText: c.msg.ex,
    unread: 1,
    fresh: true,
    anim: outro?.exLeaving ? 'gone' : undefined,
  };

  const listRows: RowData[] =
    phone === 'a'
      ? [
          ...(exArrived && !exGone ? [exRow] : []),
          // «Личный архив» appears once the visitor leaves the chat after the edit.
          ...(at('aOutro')
            ? [archiveRow(c.ui.you, exGone ? deleteTitle : exArrived ? exCard : secretCard, exArrived ? '18:45' : '18:44')]
            : at('aArchiveIn')
              ? [archiveRow(c.ui.you, editTitle, '18:41', step === 'aArchiveIn')]
              : []),
          friendRow,
          ...c.chatsA.map(seedRow),
        ].map((row) => (row.id === 'ex' || !listAnim ? row : { ...row, anim: listAnim }))
      : [archiveRow(c.me, editTitle, '18:41'), ...c.chatsB.map(seedRow)];

  // Archive topics: phone 1 sees its own cards («Вы»), phone 2 sees them from Максим.
  const topicPrefix = phone === 'a' ? c.ui.you : c.me;
  const [mom, sardor] = c.chatsA;
  const friendTopic = (text: string, time: string): TopicRowData => ({
    id: 'friend',
    name: c.friend,
    color: TOPIC_COLOR.friend,
    time,
    preview: (
      <>
        {fromPrefix(topicPrefix)}
        {text}
      </>
    ),
    previewText: text,
    sbx: 'topic-friend',
  });
  const otherTopics: TopicRowData[] = [
    ...[
      { seed: mom, color: TOPIC_COLOR.mom },
      { seed: sardor, color: TOPIC_COLOR.sardor },
    ].map(({ seed, color }) => {
      const text = `${c.card.header(seed.name, seed.time)} ${seed.preview}`;
      return {
        id: seed.id,
        name: seed.name,
        color,
        time: seed.time,
        preview: (
          <>
            {fromPrefix(topicPrefix)}
            {text}
          </>
        ),
        previewText: text,
      };
    }),
    { id: 'general', name: c.ui.general, time: '16:00', preview: c.ui.groupCreated, previewText: c.ui.groupCreated },
  ];
  const topicRows: TopicRowData[] =
    phone === 'a' && at('aOutro')
      ? [
          {
            id: 'ex',
            name: c.ex,
            color: TOPIC_COLOR.ex,
            time: '18:45',
            preview: (
              <>
                {fromPrefix(topicPrefix)}
                {deleteTitle}
              </>
            ),
            previewText: deleteTitle,
            sbx: 'topic-ex',
          },
          friendTopic(secretCard, '18:44'),
          ...otherTopics,
        ]
      : [friendTopic(editTitle, '18:41'), ...otherTopics];

  // Phone 1: the private chat with the friend.
  const chatA: ChatItem[] = [
    { id: 'd1', date: c.ui.yesterday },
    { id: 'old', out: false, text: c.msg.old, time: '21:14' },
    { id: 'd2', date: c.ui.today },
    {
      id: 'long',
      out: false,
      text: at('aEdited') ? longEdited : longOriginal,
      time: '18:41',
      edited: at('aEdited'),
      flash: step === 'aEdited',
      sbx: 'msg-edited',
    },
  ];
  // Sent from phone 2 through the bridge: here it is simply your message.
  if (at('aBack')) chatA.push({ id: 'tease', out: true, text: c.msg.tease, time: '18:43', read: true });
  if (at('aSecret')) chatA.push({ id: 'how', out: false, text: c.msg.how, time: '18:43', fresh: step === 'aSecret' });
  if (at('aSecretSent')) {
    chatA.push({ id: 'secret', out: true, text: c.msg.secret, time: '18:44', read: true, fresh: step === 'aSecretSent' });
  }

  // Phone 1, right after the edit: AndoGram's own cards in the friend's topic.
  const topicFriendA: ChatItem[] = [
    { id: 'k1', out: true, text: `${c.card.header(c.friend, '18:41')}\n${longOriginal}`, time: '18:41' },
    { id: 'k2', out: true, text: editCard, time: '18:41', sbx: 'card-edit' },
  ];

  // Phone 2: the friend's topic. The cards come in from A (Максим).
  const fromMe = { name: c.me, color: ME_COLOR };
  const topicB: ChatItem[] = [
    { id: 'k1', out: false, from: fromMe, text: `${c.card.header(c.friend, '18:41')}\n${longOriginal}`, time: '18:41' },
    { id: 'k2', out: false, from: fromMe, text: editCard, time: '18:41' },
  ];
  if (at('bSent')) topicB.push({ id: 'b1', out: true, text: c.msg.tease, time: '18:43', sbx: 'msg-sent', fresh: step === 'bSent' });

  // Phone 1, the end: the ex's topic still has her deleted message.
  const topicEx: ChatItem[] = [
    { id: 'x1', out: true, text: `${c.card.header(c.ex, '18:45')}\n${c.msg.ex}`, time: '18:45' },
    { id: 'x2', out: true, text: `${deleteTitle}\n${c.card.deleteBody(c.msg.ex, '18:45', '18:45')}`, time: '18:45' },
  ];

  // ── Screen ───────────────────────────────────────────────────────────────
  let view: React.ReactNode;
  switch (screen) {
    case 'start':
      view = (
        <div className="sbx-start">
          <span className="sbx-start-logo" aria-hidden="true">
            <img src="/logo-96.webp" alt="" width={72} height={72} />
          </span>
          <span className="sbx-start-title">{c.start.title}</span>
          <span className="sbx-start-sub">{c.start.sub}</span>
          <button type="button" className="sbx-cta" onClick={start}>
            <Play size={18} aria-hidden="true" />
            {c.start.cta}
          </button>
        </div>
      );
      break;
    case 'splash':
      view = <Splash kind={phone === 'a' ? 'andogram' : 'telegram'} />;
      break;
    case 'list':
      view = (
        <>
          <ListBar title={phone === 'a' ? 'AndoGram' : 'Telegram'} />
          <div className="sbx-list">
            {listRows.map((row) => (
              <ChatRow key={row.id} row={row} want={want} tap={tap} />
            ))}
            <Fab />
          </div>
        </>
      );
      break;
    case 'chat': {
      const friendTyping = step === 'aFriendTyping';
      view = (
        <>
          <ChatBar
            title={c.friend}
            subtitle={friendTyping ? c.ui.typing : c.ui.online}
            typing={friendTyping}
            accent
            avatar={<Avatar name={c.friend} color={FRIEND_COLOR} size={40} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-chat">
            <Messages items={chatA} editedLabel={c.ui.edited} />
            {dockedHint}
            <InputBar
              mode={step === 'aSecret' ? 'button' : 'idle'}
              placeholder={c.ui.message}
              sendLabel={c.ui.sendMessage}
              want={want}
              tap={tap}
            />
          </div>
        </>
      );
      break;
    }
    case 'topics':
      view = (
        <>
          <ChatBar
            title={c.ui.archive}
            subtitle={c.ui.members}
            muted
            avatar={<Avatar name={c.ui.archive} color={ARCHIVE_COLOR} size={40} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-list">
            {topicRows.map((row) => (
              <TopicRow key={row.id} row={row} want={want} tap={tap} />
            ))}
          </div>
        </>
      );
      break;
    default: {
      const onEx = phone === 'a' && at('aOutro');
      const items = onEx ? topicEx : phone === 'a' ? topicFriendA : topicB;
      const title = onEx ? c.ex : c.friend;
      const count = items.filter((item) => !('date' in item)).length;
      view = (
        <>
          <ChatBar
            title={title}
            subtitle={c.ui.messages(count)}
            avatar={<TopicIcon name={title} color={onEx ? TOPIC_COLOR.ex : TOPIC_COLOR.friend} size={36} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-chat">
            <Messages items={items} editedLabel={c.ui.edited} />
            {dockedHint}
            {step === 'finale' ? (
              <div className="sbx-end">
                <button type="button" className="sbx-cta" onClick={onBuy}>
                  {c.end.buy}
                </button>
                <a className="sbx-more" href={featuresHref('andogram')}>
                  <LayoutGrid size={16} aria-hidden="true" />
                  {c.end.more}
                </a>
                <button type="button" className="sbx-again" onClick={() => go('aSplash')}>
                  <RotateCcw size={15} aria-hidden="true" />
                  {c.end.again}
                </button>
              </div>
            ) : (
              <InputBar
                mode={step === 'bReply' ? 'button' : 'idle'}
                placeholder={c.ui.message}
                sendLabel={c.ui.sendMessage}
                want={want}
                tap={tap}
              />
            )}
          </div>
        </>
      );
    }
  }

  const caption = c.phones[phone];

  return (
    <div
      className={`sbx${fit ? ' sbx--fit' : ''}`}
      ref={rootRef}
      style={fit ? ({ '--fit-w': `${Math.round(PHONE_W * fit.k)}px` } as React.CSSProperties) : undefined}
      onKeyDown={() => {
        keyboardRef.current = true;
      }}
      onPointerDown={() => {
        keyboardRef.current = false;
      }}
    >
      <div className="sbx-caption" ref={captionRef}>
        <span className="sbx-caption-title">{caption.title}</span>
        <span className="sbx-caption-sub">{caption.sub}</span>
      </div>

      <div
        className="sbx-fit"
        style={fit ? { width: Math.round(PHONE_W * fit.k), height: Math.round(fit.h * fit.k) } : undefined}
      >
        <div
          key={phone}
          className="sbx-phone sbx-phone--enter"
          role="group"
          aria-label={c.screenLabel}
          style={fit ? ({ '--fit-k': fit.k, height: fit.h } as React.CSSProperties) : undefined}
        >
          <div className="sbx-screen" ref={screenRef} onClick={onScreenClick}>
            <span className="sbx-camera" aria-hidden="true" />
            {screen !== 'start' && <StatusBar time={clock} />}
            <div key={`${phone}-${screen}`} className="sbx-view sbx-view--enter">
              {view}
            </div>

            {outro && (
              <>
                <div className={`sbx-dim${outro.dimmed ? ' is-on' : ''}`} aria-hidden="true" />
                <div className="sbx-tagline" aria-hidden="true">
                  <Tagline chars={tagChars} shown={outro.chars} caret={outro.caret} />
                </div>
              </>
            )}

            {spot && (
              <div
                className={`sbx-spot${spotReady ? ' is-ready' : ''}`}
                style={{
                  width: spot.w + 8,
                  height: spot.h + 8,
                  transform: `translate(${spot.x - 4}px, ${spot.y - 4}px)`,
                }}
                aria-hidden="true"
              />
            )}

            {hint && !docked && hintPos && spotReady && (
              <div
                key={step}
                className="sbx-hint"
                style={{ width: hintPos.width, left: hintPos.left, top: hintPos.top, bottom: hintPos.bottom }}
              >
                <HintBox
                  text={hint}
                  button={hintButton}
                  onNext={next}
                  side={hintPos.side}
                  arrowX={`${hintPos.arrowX}px`}
                  shaking={shaking}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {spotReady && hint ? hint : outro && outro.chars > 0 ? c.tagline : ''}
      </p>

      <div className="sbx-controls" ref={controlsRef}>
        <span className="sbx-progress" aria-hidden="true">
          <span style={{ '--p': progressOf(step, outro ? outroT / OUTRO_AT.end : 0) } as React.CSSProperties} />
        </span>
        {step !== 'idle' && (
          <button type="button" className="sbx-restart" onClick={() => go('aSplash')}>
            <RotateCcw size={14} aria-hidden="true" />
            {c.restart}
          </button>
        )}
      </div>
    </div>
  );
}

export default BridgeSandbox;
