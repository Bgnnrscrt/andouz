import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { ChannelLogo, ChannelScreen, type MenuKey, type PostData } from './ChannelUi';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, type LineState } from './engine';
import { getNoForwardsCopy, type ListSeed } from './noForwardsCopy';
import {
  NOFORWARDS_FLOW,
  SHRUG,
  SHRUG_END,
  T_OUTRO,
  T_OUTRO_END,
  appOf,
  menuAt,
  progressOf,
  screenOf,
  toastAt,
  viewOf,
  type AppKey,
  type Step,
} from './noForwardsFlow';
import { EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { ChatRow, Fab, ListBar, Splash, type RowData } from './TgUi';
import { useSandbox, useTimeline } from './useSandbox';
import './noforwards.css';

/*
 * «Проверь сам» for AndoGram's No-Forwards bypass. The channel «Уроки харизмы»
 * forbids saving and forwarding. Try 1, AndoGram: open the channel, tap beside
 * the video lesson, «Сохранить в «Избранное»» — saved, so what? (the restriction
 * is never mentioned). Try 2, the official Telegram: the same steps, but the menu
 * has no Save and no Forward, and a toast says copying is restricted. Then the
 * tagline over the dimmed screen and the end buttons. Mock data only: nothing
 * is sent anywhere. Script and timings: noForwardsFlow.ts; texts:
 * noForwardsCopy.ts; channel UI: ChannelUi.tsx; the shared engine:
 * useSandbox.ts + SandboxFrame.tsx.
 */

/** AndoGram keeps every item; the official Telegram drops Forward and both Saves. */
const MENU_KEYS: Record<AppKey, readonly MenuKey[]> = {
  a: ['forward', 'gallery', 'saved', 'link', 'report'],
  t: ['link', 'report'],
};

const CLOCK: Record<AppKey, string> = { a: '18:41', t: '18:42' };

/** The channel's row: its newest post (the video) came at 18:20. */
const CHANNEL_ROW = { time: '18:20', unread: 2 };

const seedRow = (s: ListSeed): RowData => ({
  id: s.id,
  name: s.name,
  color: s.color,
  time: s.time,
  unread: s.unread,
  muted: s.muted,
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

interface NoForwardsSandboxProps {
  lang: Language;
  onBuy: () => void;
}

export function NoForwardsSandbox({ lang, onBuy }: NoForwardsSandboxProps) {
  const c = getNoForwardsCopy(lang);
  const common = getCommonCopy(lang);
  const sb = useSandbox<Step>({ flow: NOFORWARDS_FLOW, initial: 'idle', hints: c.hints, viewOf, lang });
  const { step, want, tap } = sb;
  const app = appOf(step);
  const screen = screenOf(step);

  // Two timelines: the line after try 1 (SHRUG) and the outro after try 2 (T_OUTRO).
  const shrugT = useTimeline(step === 'aShrug', SHRUG_END, sb.next);
  const outroT = useTimeline(step === 'tOutro', T_OUTRO_END, sb.next);
  const shrugLen = useMemo(() => Array.from(c.shrug).length, [c]);
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);

  // ── Over the screen: the dim and a typed line, then the end buttons ──────
  let overlay: React.ReactNode = null;
  // Read out by the shared live region: a toast while it shows, then the typed lines.
  const toast = toastAt(step);
  let live = toast && !toast.closing ? c.toast[toast.kind] : '';
  if (step === 'aShrug') {
    const line = lineAt(shrugT, shrugLen, prefersReducedMotion(), SHRUG);
    overlay = (
      <div className="nf-outro nf-outro--shrug">
        <OutroLayer line={line} text={c.shrug} dimIn={SHRUG.dimIn} dimOut={SHRUG.dimOut} />
      </div>
    );
    if (line.chars > 0) live = c.shrug;
  } else if (step === 'tOutro' || step === 'finale') {
    // The finale keeps the whole tagline on the dimmed screen, raised over the buttons.
    const line: LineState =
      step === 'finale'
        ? { dimmed: true, chars: tagLen, caret: false }
        : lineAt(outroT, tagLen, prefersReducedMotion(), T_OUTRO);
    overlay = (
      <div className="nf-outro">
        <OutroLayer line={line} text={c.tagline} dimIn={T_OUTRO.dimIn} dimOut={T_OUTRO.dimOut} raised={step === 'finale'} />
        {step === 'finale' && <EndPanel labels={common.end} onBuy={onBuy} onAgain={() => sb.go('aList')} over />}
      </div>
    );
    if (line.chars > 0) live = c.tagline;
  }
  const within = step === 'aShrug' ? shrugT / SHRUG_END : step === 'tOutro' ? outroT / T_OUTRO_END : 0;

  // «Начать заново» goes back to the list (also from the list itself: go()
  // restarts the step's timers and re-enters the screen).
  const restart = () => sb.go('aList');

  // The channel's row: its logo instead of initials (they'd read «УХ» / «XD»).
  const channelRow: RowData = {
    id: 'channel',
    name: c.channel.name,
    color: '#e0559c',
    time: CHANNEL_ROW.time,
    unread: CHANNEL_ROW.unread,
    kind: 'channel',
    sbx: 'row-channel',
    preview: c.channel.preview,
    previewText: c.channel.preview,
    avatar: <ChannelLogo />,
  };

  const posts: PostData[] = [
    { id: 'text', kind: 'text', ...c.posts.text },
    { id: 'photo', kind: 'photo', ...c.posts.photo },
    { id: 'video', kind: 'video', ...c.posts.video, side: 'post-side' },
  ];

  // ── Screen ───────────────────────────────────────────────────────────────
  let view: React.ReactNode;
  switch (screen) {
    case 'start':
      view = <StartScreen title={c.start.title} sub={c.start.sub} cta={common.cta} onStart={() => sb.start('aList')} />;
      break;
    case 'splash':
      view = <Splash kind="telegram" />;
      break;
    case 'list':
      view = (
        <>
          <ListBar title={app === 'a' ? 'AndoGram' : 'Telegram'} />
          <div className="sbx-list">
            <ChatRow row={channelRow} want={want} tap={tap} />
            {c.chats.map((s) => (
              <ChatRow key={s.id} row={seedRow(s)} want={want} tap={tap} />
            ))}
            <Fab />
          </div>
        </>
      );
      break;
    default: {
      const menu = menuAt(step);
      view = (
        <ChannelScreen
          title={c.channel.name}
          subtitle={c.channel.subs}
          logo={<ChannelLogo size={40} />}
          backLabel={c.ui.back}
          today={c.ui.today}
          posts={posts}
          sideLabel={c.ui.sideLabel}
          footer={c.channel.footer}
          menu={menu && { keys: MENU_KEYS[app], labels: c.menu, label: c.ui.menuLabel, closing: menu === 'closing' }}
          toast={toast && { kind: toast.kind, text: c.toast[toast.kind], closing: toast.closing }}
          want={want}
          tap={tap}
        />
      );
    }
  }

  return (
    <SandboxFrame
      sb={sb}
      caption={c.phones[app]}
      phoneKey={app}
      viewKey={viewOf(step)}
      screenLabel={c.screenLabel}
      status={screen === 'start' ? null : { time: CLOCK[app] }}
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

export default NoForwardsSandbox;
