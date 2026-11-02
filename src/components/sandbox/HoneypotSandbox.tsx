import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, progressAt, type LineState } from './engine';
import { getHoneypotCopy, type HoneypotChat } from './honeypotCopy';
import {
  DRAWER_CLOSE_MS,
  HONEYPOT_FLOW,
  HONEYPOT_OUTRO,
  OUTRO_END,
  STEPS,
  placeOf,
  roundOf,
  viewOf,
  type Step,
} from './honeypotFlow';
import { HomeScreen } from './HomeUi';
import { AccountDrawer, LockScreen } from './HoneypotUi';
import { DockedHint, EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { ChatRow, Fab, ListBar, type RowData, type StatusTone } from './TgUi';
import { useSandbox, useTimeline } from './useSandbox';

/*
 * «Проверь сам» for AndoGram's Honeypot (duress PIN codes). One phone: its
 * home screen, then AndoGram's lock screen five times — 1111, 2222, 3333,
 * 4444 and the main 7777. Each of the first four opens its own account(s)
 * and chats, and the side menu lists only those; 7777 lists them all. Then
 * the outro: the screen dims, the tagline types out and stays, and the end
 * buttons come up over the dim.
 * Everything is local mock data: nothing is sent anywhere.
 * Script and timings: honeypotFlow.ts; texts and chats: honeypotCopy.ts;
 * screens: HoneypotUi.tsx; the shared engine: useSandbox.ts + SandboxFrame.tsx.
 */

/** The phone's clock: the status bar and the home screen. */
const TIME = '18:41';

const rowOf = (chat: HoneypotChat): RowData => ({
  id: chat.id,
  name: chat.name,
  color: chat.color,
  time: chat.time,
  preview: chat.from ? (
    <>
      <span className="sbx-from">{chat.from}: </span>
      {chat.preview}
    </>
  ) : (
    chat.preview
  ),
  previewText: chat.from ? `${chat.from}: ${chat.preview}` : chat.preview,
  unread: chat.unread,
  muted: chat.muted,
  saved: chat.saved,
  kind: chat.kind,
});

interface HoneypotSandboxProps {
  lang: Language;
  onBuy: () => void;
}

export function HoneypotSandbox({ lang, onBuy }: HoneypotSandboxProps) {
  const c = getHoneypotCopy(lang);
  const common = getCommonCopy(lang);
  const sb = useSandbox<Step>({ flow: HONEYPOT_FLOW, initial: 'idle', hints: c.hints, buttons: c.buttons, viewOf, lang });
  const { step, want, tap, go } = sb;
  const place = placeOf(step);
  const round = roundOf(step);
  const locked = place?.stage === 'pin' || place?.stage === 'open';
  /** Time into the outro, ms (honeypotFlow HONEYPOT_OUTRO); at its end the finale. */
  const outroT = useTimeline(step === 'outro', OUTRO_END, sb.next);

  // «Начать заново» / «Пройти ещё раз» go back to the home screen (also from
  // the home screen itself: go() bumps sb.run, which restarts the step's timers
  // and re-enters the screen).
  const restart = () => go('home');

  // The outro: dim + tagline. In the finale the tagline stays whole, raised
  // over the end buttons.
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);
  const line: LineState | null =
    step === 'outro'
      ? lineAt(outroT, tagLen, prefersReducedMotion(), HONEYPOT_OUTRO)
      : step === 'finale'
        ? { dimmed: true, chars: tagLen, caret: false }
        : null;

  // ── Screen ───────────────────────────────────────────────────────────────
  let view: React.ReactNode;
  if (step === 'idle') {
    view = <StartScreen title={c.start.title} sub={c.start.sub} cta={common.cta} onStart={() => sb.start('home')} />;
  } else if (step === 'home') {
    view = <HomeScreen time={TIME} date={c.home.date} labels={c.home.apps} want={want} tap={tap} />;
  } else if (place && locked) {
    const open = place.stage === 'open';
    view = (
      <LockScreen
        copy={c.lock}
        round={place.round}
        filled={open ? 4 : sb.count}
        ok={open}
        launch={place.round === 1}
        want={want}
        tap={tap}
      />
    );
  } else {
    // The chat list of this round's account; the side menu over it. In the
    // outro the menu slides away first. The ☰ hint is docked on top of the
    // list (honeypotFlow DOCKED): it pushes the chats down, never covers them.
    const r = round ?? 5;
    const drawer = place?.stage === 'drawer' || (step === 'outro' && outroT < DRAWER_CLOSE_MS);
    view = (
      <>
        <ListBar title="AndoGram" menu={{ label: c.ui.menu, want, tap }} />
        <div className="sbx-list">
          <DockedHint sb={sb} />
          {c.rounds[r].chats.map((chat) => (
            <ChatRow key={chat.id} row={rowOf(chat)} want={want} tap={tap} />
          ))}
          {/* In the finale the end buttons come over it: it fades away. */}
          <span className={step === 'finale' ? 'hp-fab-out' : undefined}>
            <Fab />
          </span>
        </div>
        {drawer && (
          <AccountDrawer
            accounts={c.rounds[r].accounts}
            active={c.rounds[r].active}
            addLabel={c.ui.addAccount}
            items={c.ui.drawer}
            closing={step === 'outro'}
            tap={tap}
          />
        )}
      </>
    );
  }

  const tone: StatusTone = step === 'home' ? 'clear' : locked ? 'dark' : 'bar';
  const screenClassName = step === 'home' ? 'hp-screen--home' : locked ? 'hp-screen--lock' : undefined;

  return (
    <SandboxFrame
      sb={sb}
      caption={round === null ? c.home.caption : c.rounds[round].caption}
      phoneKey="phone"
      captionKey={round === null ? 'home' : String(round)}
      viewKey={viewOf(step)}
      screenLabel={c.screenLabel}
      status={step !== 'idle' ? { time: TIME, tone } : null}
      screenClassName={screenClassName}
      overlay={
        line && (
          <>
            <OutroLayer
              line={line}
              text={c.tagline}
              dimIn={HONEYPOT_OUTRO.dimIn}
              dimOut={HONEYPOT_OUTRO.dimOut}
              raised={step === 'finale'}
            />
            {step === 'finale' && <EndPanel labels={common.end} onBuy={onBuy} onAgain={restart} over />}
          </>
        )
      }
      progress={progressAt(STEPS, step, step === 'outro' ? outroT / OUTRO_END : 0)}
      restartLabel={common.restart}
      onRestart={restart}
      live={line && line.chars > 0 ? c.tagline : ''}
    >
      {view}
    </SandboxFrame>
  );
}

export default HoneypotSandbox;
