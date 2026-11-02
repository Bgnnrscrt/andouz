import React, { useEffect, useMemo } from 'react';
import type { Language } from '../../types';
import { loadCamera } from './arCameraClip';
import { AndoGramRecorder, TelegramRecorder } from './ArMasksUi';
import {
  AR_FLOW,
  AR_OUTRO,
  AR_OUTRO_END,
  LINE,
  LINE_END,
  appOf,
  maskOn,
  progressOf,
  screenOf,
  viewOf,
  type AppKey,
  type Step,
} from './arMasksFlow';
import { getArMasksCopy, type ArSeed } from './arMasksCopy';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, type LineState } from './engine';
import { HomeScreen, type LauncherApp } from './HomeUi';
import { DockedHint, EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { Avatar, ChatBar, ChatRow, Fab, InputBar, ListBar, Messages, Splash, type ChatItem, type RowData, type StatusTone } from './TgUi';
import { useSandbox, useTimeline } from './useSandbox';

/*
 * «Проверь сам» for AndoGram's 3D AR masks in video messages. One phone, two
 * tries: the official Telegram, then AndoGram. From the home screen open the
 * app, the chat with the friend, tap the camera and record a «кружок». In
 * Telegram it is just the camera; the screen dims: «Теперь попробуй в
 * AndoGram». In AndoGram the masks are under the circle: the Ghoul mask sits
 * on the face and follows it, the others are locked («?»). Then the tagline
 * and the end buttons. The face is a generated photo animated into a 5 s clip
 * (ArCamera.tsx); nothing is recorded or sent. Script and timings: arMasksFlow.ts; texts: arMasksCopy.ts;
 * the recorders: ArMasksUi.tsx; the home screen: HomeUi.tsx; the shared
 * engine: useSandbox.ts + SandboxFrame.tsx.
 */

/** Telegram comes first on the home screen, AndoGram right after it (owner). */
const GRID: readonly LauncherApp[] = ['telegram', 'andogram', 'instagram', 'tiktok', 'youtube', 'gallery', 'clock', 'weather'];

const CLOCK: Record<AppKey, string> = { t: '18:41', a: '18:42' };
const FRIEND_COLOR = '#7bc862';

const seedRow = (s: ArSeed): RowData => ({
  id: s.id,
  name: s.name,
  color: s.color,
  time: s.time,
  unread: s.unread,
  muted: s.muted,
  saved: s.saved,
  kind: s.kind,
  preview: s.from ? (
    <>
      <span className="sbx-from">{s.from}: </span>
      {s.preview}
    </>
  ) : (
    s.preview
  ),
  previewText: s.from ? `${s.from}: ${s.preview}` : s.preview,
});

interface ArMasksSandboxProps {
  lang: Language;
  onBuy: () => void;
}

export function ArMasksSandbox({ lang, onBuy }: ArMasksSandboxProps) {
  const c = getArMasksCopy(lang);
  const common = getCommonCopy(lang);
  const sb = useSandbox<Step>({ flow: AR_FLOW, initial: 'idle', hints: c.hints, viewOf, lang });
  const { step, want, tap } = sb;
  const app = appOf(step);
  const screen = screenOf(step);
  const started = step !== 'idle';

  // The camera clip loads as soon as the try starts: it is there by the recording.
  useEffect(() => {
    if (started && !prefersReducedMotion()) void loadCamera();
  }, [started]);

  // Two timelines: the line after try 1 (LINE) and the outro after try 2 (AR_OUTRO).
  const lineT = useTimeline(step === 'tLine', LINE_END, sb.next);
  const outroT = useTimeline(step === 'outro', AR_OUTRO_END, sb.next);
  const lineLen = useMemo(() => Array.from(c.line).length, [c]);
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);

  // «Начать заново» / «Пройти ещё раз»: back to the home screen of try 1.
  const restart = () => sb.go('tHome');

  // ── Over the screen: the dim and a typed line, then the end buttons ──────
  let overlay: React.ReactNode = null;
  let live = '';
  if (step === 'tLine') {
    const line = lineAt(lineT, lineLen, prefersReducedMotion(), LINE);
    overlay = <OutroLayer line={line} text={c.line} dimIn={LINE.dimIn} dimOut={LINE.dimOut} />;
    if (line.chars > 0) live = c.line;
  } else if (step === 'outro' || step === 'finale') {
    const line: LineState =
      step === 'finale' ? { dimmed: true, chars: tagLen, caret: false } : lineAt(outroT, tagLen, prefersReducedMotion(), AR_OUTRO);
    overlay = (
      <>
        <OutroLayer line={line} text={c.tagline} dimIn={AR_OUTRO.dimIn} dimOut={AR_OUTRO.dimOut} raised={step === 'finale'} />
        {step === 'finale' && <EndPanel labels={common.end} onBuy={onBuy} onAgain={restart} over />}
      </>
    );
    if (line.chars > 0) live = c.tagline;
  }
  const within = step === 'tLine' ? lineT / LINE_END : step === 'outro' ? outroT / AR_OUTRO_END : 0;

  // The friend's chat: his row on top of the list, his message in the chat.
  const friendRow: RowData = {
    id: 'friend',
    name: c.friend,
    color: FRIEND_COLOR,
    time: '18:37',
    unread: screen === 'list' ? 1 : undefined,
    sbx: 'row-friend',
    preview: c.incoming,
    previewText: c.incoming,
  };
  const chat: ChatItem[] = [
    { id: 'd', date: c.ui.today },
    { id: 'm1', out: false, text: c.incoming, time: '18:37' },
  ];

  // ── Screen ───────────────────────────────────────────────────────────────
  let view: React.ReactNode;
  switch (screen) {
    case 'start':
      view = <StartScreen title={c.start.title} sub={c.start.sub} cta={common.cta} onStart={() => sb.start('tHome')} />;
      break;
    case 'home':
      view = <HomeScreen time={CLOCK[app]} date={c.home.date} labels={c.home.apps} grid={GRID} want={want} tap={tap} />;
      break;
    case 'splash':
      view = <Splash kind={app === 'a' ? 'andogram' : 'telegram'} />;
      break;
    case 'list':
      view = (
        <>
          <ListBar title={app === 'a' ? 'AndoGram' : 'Telegram'} />
          <div className="sbx-list">
            <ChatRow row={friendRow} want={want} tap={tap} />
            {c.chats.map((s) => (
              <ChatRow key={s.id} row={seedRow(s)} want={want} tap={tap} />
            ))}
            <Fab />
          </div>
        </>
      );
      break;
    default:
      // The chat, and over it (from the camera tap on) the recorder.
      view = (
        <>
          <ChatBar
            title={c.friend}
            subtitle={c.ui.online}
            avatar={<Avatar name={c.friend} color={FRIEND_COLOR} size={40} />}
            backLabel={c.ui.back}
            want={want}
            tap={tap}
          />
          <div className="sbx-chat">
            <Messages items={chat} editedLabel="" />
            <DockedHint sb={sb} />
            <InputBar mode="idle" placeholder={c.ui.message} sendLabel="" camera={c.ui.record} want={want} tap={tap} />
          </div>
          {screen === 'rec' &&
            (app === 't' ? (
              <TelegramRecorder decimal={c.decimal} cancel={c.ui.cancel} />
            ) : (
              <AndoGramRecorder
                masked={maskOn(step)}
                labels={c.masks}
                masksLabel={c.ui.masks}
                locked={c.locked}
                decimal={c.decimal}
                cancel={c.ui.cancel}
                want={want}
                tap={tap}
              />
            ))}
        </>
      );
  }

  const tone: StatusTone | undefined = screen === 'home' ? 'clear' : undefined;
  /** Before try 1 the caption is about the phone, not a try. */
  const onHome = step === 'idle' || step === 'tHome';
  return (
    <SandboxFrame
      sb={sb}
      caption={onHome ? c.captions.home : c.captions[app]}
      phoneKey="phone"
      captionKey={onHome ? 'home' : app}
      viewKey={viewOf(step)}
      screenLabel={c.screenLabel}
      status={screen === 'start' ? null : { time: CLOCK[app], tone }}
      screenClassName={screen === 'home' ? 'hp-screen--home' : undefined}
      overlay={overlay}
      progress={progressOf(step, within)}
      restartLabel={common.restart}
      onRestart={restart}
      live={live}
    >
      {view}
    </SandboxFrame>
  );
}

export default ArMasksSandbox;
