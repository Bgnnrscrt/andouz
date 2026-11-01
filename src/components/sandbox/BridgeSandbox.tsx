import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, Play, RotateCcw } from 'lucide-react';
import type { Language } from '../../types';
import {
  AUTO_MS,
  LOOK,
  NEXT_BUTTON,
  TAP,
  nextStep,
  phoneOf,
  progressOf,
  reached,
  screenOf,
  type Step,
  type TargetKey,
} from './bridgeFlow';
import { getBridgeCopy, type ChatSeed } from './bridgeCopy';
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
 * «Проверь сам» for the AndoGram A-B-C bridge (Личный архив + мост).
 * Three phones: A = the visitor's AndoGram, B = plain Telegram with the
 * second account, C = the friend. Everything is local mock data: nothing is
 * sent anywhere. Script and timings: bridgeFlow.ts; texts: bridgeCopy.ts.
 */

const FRIEND_COLOR = '#faa774';
const ME_COLOR = '#a695e7';
const ARCHIVE_COLOR = '#65aadd';
/** Topic colours from AndoGram's ArchiveNamingHelper palette. */
const TOPIC_COLOR = { friend: '#FF885E', mom: '#DF74A1', sardor: '#60D49C' } as const;

/**
 * Targets at the bottom of a chat (the send button, the newest messages).
 * Their hint is docked into the chat between the messages and the input, so it
 * pushes the conversation up instead of covering it.
 */
const DOCKED: ReadonlySet<TargetKey> = new Set<TargetKey>([
  'send',
  'card-edit',
  'msg-sent',
  'msg-new',
  'msg-reply',
  'card-reply',
]);

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

/** Spotlighted element, in px relative to the phone screen. */
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
  const [typed, setTyped] = useState(0);
  const [shaking, setShaking] = useState(false);
  const [measured, setMeasured] = useState<Spot | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  /** The visitor drives the demo with the keyboard: keep focus on the next target. */
  const keyboardRef = useRef(false);

  const phone = phoneOf(step);
  const screen = screenOf(step);
  const want = TAP[step];
  const focusKey: TargetKey | undefined = want ?? LOOK[step];
  const hint = c.hints[step];
  const hintButton = NEXT_BUTTON.has(step) ? c.buttons[step] : undefined;
  const at = (s: Step) => reached(step, s);

  const go = (s: Step) => {
    setTyped(0);
    setStep(s);
  };

  const tap = (key?: TargetKey) => {
    if (key !== undefined && key === want) {
      setStep(nextStep(step));
    } else if (hint) {
      setShaking(true);
    }
  };

  const start = () => {
    go('aSplash');
    rootRef.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'nearest' });
  };

  // Timed steps (splashes, «печатает…», the archive appearing…).
  useEffect(() => {
    const ms = AUTO_MS[step];
    if (ms === undefined) return undefined;
    const id = window.setTimeout(() => setStep(nextStep(step)), ms);
    return () => window.clearTimeout(id);
  }, [step]);

  // The friend types his reply on his own phone, then sends it.
  const replyChars = useMemo(() => Array.from(c.msg.friendReply), [c]);
  useEffect(() => {
    if (step !== 'cTyping') return undefined;
    if (typed >= replyChars.length) {
      const id = window.setTimeout(() => setStep('cSent'), 450);
      return () => window.clearTimeout(id);
    }
    const id = window.setTimeout(() => setTyped((n) => n + 1), typed === 0 ? 600 : 70);
    return () => window.clearTimeout(id);
  }, [step, typed, replyChars.length]);

  // A wrong tap shakes the hint once.
  useEffect(() => {
    if (!shaking) return undefined;
    const id = window.setTimeout(() => setShaking(false), 450);
    return () => window.clearTimeout(id);
  }, [shaking]);

  // Measure the spotlighted element. Screens slide in, so it is measured again
  // after the enter animation and only then shown. A measurement made for
  // another target/screen is ignored, so nothing stale flashes.
  const spotKey = `${focusKey ?? ''}|${phone}|${screen}|${lang}`;
  useLayoutEffect(() => {
    const scr = screenRef.current;
    if (!scr || !focusKey) return undefined;
    let ready = false;
    const measure = () => {
      const el = scr.querySelector<HTMLElement>(`[data-sbx="${focusKey}"]`);
      if (!el) return;
      const s = scr.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setMeasured({
        x: r.left - s.left,
        y: r.top - s.top,
        w: r.width,
        h: r.height,
        sw: s.width,
        sh: s.height,
        key: spotKey,
        ready,
      });
    };
    // ResizeObserver also reports once right after observe(): the first measure.
    let raf = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    });
    observer.observe(scr);
    // After the longest enter animation (phone 0.32 s, new message 0.36 s).
    const timer = window.setTimeout(() => {
      ready = true;
      measure();
    }, 400);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [focusKey, spotKey]);

  const spot = measured && measured.key === spotKey ? measured : null;
  const spotReady = spot?.ready ?? false;

  // Keyboard users: move focus to whatever the new step expects.
  useEffect(() => {
    if (!keyboardRef.current) return undefined;
    const root = rootRef.current;
    const id = window.setTimeout(() => {
      if (!root) return;
      const selector = hintButton ? '.sbx-hint-btn' : want ? `[data-sbx="${want}"]` : step === 'finale' ? '.sbx-finale .sbx-cta' : '';
      if (selector) root.querySelector<HTMLElement>(selector)?.focus({ preventScroll: true });
    }, 380);
    return () => window.clearTimeout(id);
  }, [step, want, hintButton]);

  const docked = hint !== undefined && focusKey !== undefined && DOCKED.has(focusKey);
  const next = () => setStep(nextStep(step));

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

  // Docked hint: rendered from the first frame of the step (invisible until the
  // spotlight is ready) so the layout, and the measured target, never jump.
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

  // ── Conversation state derived from the step ─────────────────────────────
  const clock = at('cSent') ? '18:45' : at('bSent') ? '18:44' : at('aBack') ? '18:43' : at('aEditWait') ? '18:42' : '18:41';
  const editCard = c.card.edit(c.friend, c.msg.ask19, c.msg.ask20);
  const editFirstLine = editCard.split('\n')[0];
  const fromPrefix = (who: string) => <span className="sbx-from">{who}: </span>;

  const friendRow: RowData = {
    id: 'friend',
    name: c.friend,
    color: FRIEND_COLOR,
    sbx: 'row-friend',
    ...(!at('aOpenChat')
      ? { preview: c.msg.old, previewText: c.msg.old, time: c.ui.yesterdayShort }
      : !at('aEditWait')
        ? { preview: c.msg.ask19, previewText: c.msg.ask19, time: '18:41', unread: 1 }
        : { preview: c.msg.myReply, previewText: c.msg.myReply, time: '18:42', read: true }),
    typing: step === 'aTyping' ? c.ui.typing : undefined,
  };

  const archiveRow = (who: string): RowData => ({
    id: 'archive',
    name: c.ui.archive,
    color: ARCHIVE_COLOR,
    muted: true,
    time: '18:43',
    preview: (
      <>
        {fromPrefix(who)}
        {editFirstLine}
      </>
    ),
    previewText: `${who}: ${editFirstLine}`,
    sbx: 'row-archive',
    fresh: step === 'aArchiveIn',
  });

  const listRows: RowData[] =
    phone === 'a'
      ? [...(at('aArchiveIn') ? [archiveRow(c.ui.you)] : []), friendRow, ...c.chatsA.map(seedRow)]
      : [archiveRow(c.me), ...c.chatsB.map(seedRow)];

  const topicPrefix = phone === 'a' ? c.ui.you : c.me;
  const [mom, sardor] = c.chatsA;
  const topicRows: TopicRowData[] = [
    {
      id: 'friend',
      name: c.friend,
      color: TOPIC_COLOR.friend,
      time: '18:43',
      preview: (
        <>
          {fromPrefix(topicPrefix)}
          {editFirstLine}
        </>
      ),
      previewText: editFirstLine,
      sbx: 'topic-friend',
    },
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

  // Phone 1: the private chat with the friend.
  const chatA: ChatItem[] = [
    { id: 'd1', date: c.ui.yesterday },
    { id: 'old', out: false, text: c.msg.old, time: '21:14' },
    { id: 'd2', date: c.ui.today },
    {
      id: 'ask',
      out: false,
      text: at('aBack') ? c.msg.ask20 : c.msg.ask19,
      time: '18:41',
      edited: at('aBack'),
      flash: step === 'aBack',
    },
    ...(at('aEditWait')
      ? [{ id: 'mine', out: true, text: c.msg.myReply, time: '18:42', read: true, fresh: step === 'aEditWait' }]
      : []),
  ];

  // The archive topic. On phone 1 the cards are A's own messages; on phone 2
  // they come in from A (Максим), and B's reply is the outgoing one.
  const cardTexts = [
    { id: 'k1', text: `${c.card.header(c.friend, '18:41')}\n${c.msg.ask19}`, time: '18:41' },
    { id: 'k2', text: `${c.card.header(c.me, '18:42')}\n${c.msg.myReply}`, time: '18:42' },
    { id: 'k3', text: editCard, time: '18:43', sbx: 'card-edit' as const },
  ];
  const fromMe = { name: c.me, color: ME_COLOR };
  const topicA: ChatItem[] = cardTexts.map((k) => ({ ...k, out: true }));
  const topicB: ChatItem[] = [
    ...cardTexts.map((k) => ({ id: k.id, text: k.text, time: k.time, out: false, from: fromMe })),
    ...(at('bSent')
      ? [{ id: 'b1', out: true, text: c.msg.fromPhone2, time: '18:44', read: at('bReceived'), sbx: 'msg-sent' as const, fresh: step === 'bSent' }]
      : []),
    ...(at('bReceived')
      ? [
          {
            id: 'k4',
            out: false,
            from: fromMe,
            text: `${c.card.header(c.friend, '18:45')}\n${c.msg.friendReply}`,
            time: '18:45',
            sbx: 'card-reply' as const,
            fresh: step === 'bReceived',
          },
        ]
      : []),
  ];

  // The friend's phone: his chat with A.
  const chatC: ChatItem[] = [
    { id: 'd1', date: c.ui.yesterday },
    { id: 'old', out: true, text: c.msg.old, time: '21:14', read: true },
    { id: 'd2', date: c.ui.today },
    { id: 'ask', out: true, text: c.msg.ask20, time: '18:41', edited: true, read: true },
    { id: 'mine', out: false, text: c.msg.myReply, time: '18:42' },
    { id: 'b1', out: false, text: c.msg.fromPhone2, time: '18:44', sbx: 'msg-new', fresh: step === 'cIncoming' },
    ...(at('cSent')
      ? [{ id: 'r', out: true, text: c.msg.friendReply, time: '18:45', read: true, sbx: 'msg-reply' as const, fresh: step === 'cSent' }]
      : []),
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
      const onA = phone === 'a';
      view = (
        <>
          <ChatBar
            title={onA ? c.friend : c.me}
            subtitle={c.ui.online}
            accent
            avatar={<Avatar name={onA ? c.friend : c.me} color={onA ? FRIEND_COLOR : ME_COLOR} size={40} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-chat">
            <Messages items={onA ? chatA : chatC} editedLabel={c.ui.edited} />
            {dockedHint}
            <InputBar
              mode={onA ? (step === 'aReply' ? 'button' : 'idle') : step === 'cTyping' ? 'typing' : 'idle'}
              text={replyChars.slice(0, typed).join('')}
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
      const items = phone === 'a' ? topicA : topicB;
      const count = items.filter((item) => !('date' in item)).length;
      view = (
        <>
          <ChatBar
            title={c.friend}
            subtitle={c.ui.messages(count)}
            avatar={<TopicIcon name={c.friend} color={TOPIC_COLOR.friend} size={36} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-chat">
            <Messages items={items} editedLabel={c.ui.edited} />
            {dockedHint}
            <InputBar
              mode={step === 'bReply' ? 'button' : 'idle'}
              placeholder={c.ui.message}
              sendLabel={c.ui.sendMessage}
              want={want}
              tap={tap}
            />
          </div>
        </>
      );
    }
  }

  const caption = c.phones[phone];

  return (
    <div
      className="sbx"
      ref={rootRef}
      onKeyDown={() => {
        keyboardRef.current = true;
      }}
      onPointerDown={() => {
        keyboardRef.current = false;
      }}
    >
      <div className="sbx-caption">
        <span className="sbx-caption-title">{caption.title}</span>
        <span className="sbx-caption-sub">{caption.sub}</span>
      </div>

      <div key={phone} className="sbx-phone sbx-phone--enter" role="group" aria-label={c.screenLabel}>
        <div className="sbx-screen" ref={screenRef}>
          <span className="sbx-camera" aria-hidden="true" />
          {screen !== 'start' && <StatusBar time={clock} />}
          <div key={`${phone}-${screen}`} className="sbx-view sbx-view--enter">
            {view}
          </div>

          {spot && step !== 'finale' && (
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

          {step === 'finale' && (
            <div className="sbx-finale">
              <div className="sbx-finale-card">
                <p className="sbx-finale-title">{c.finale.title}</p>
                <p className="sbx-finale-text">{c.finale.text}</p>
                <div className="sbx-finale-actions">
                  <button type="button" className="sbx-cta" onClick={onBuy}>
                    {c.finale.buy}
                  </button>
                  <button type="button" className="sbx-again" onClick={() => go('aSplash')}>
                    <RotateCcw size={15} aria-hidden="true" />
                    {c.finale.again}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {spotReady && hint ? hint : ''}
      </p>

      <div className="sbx-controls">
        <span className="sbx-progress" aria-hidden="true">
          <span style={{ '--p': progressOf(step) } as React.CSSProperties} />
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
