import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { BRIDGE_FLOW, OUTRO, OUTRO_AT, outroAt, phoneOf, progressOf, screenOf, type Step } from './bridgeFlow';
import { getBridgeCopy, type ChatSeed } from './bridgeCopy';
import { getCommonCopy } from './commonCopy';
import { prefersReducedMotion } from './engine';
import { DockedHint, EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import {
  Avatar,
  ChatBar,
  ChatRow,
  Fab,
  InputBar,
  ListBar,
  Messages,
  Splash,
  TopicIcon,
  TopicRow,
  type ChatItem,
  type RowData,
  type TopicRowData,
} from './TgUi';
import { useSandbox, useTimeline } from './useSandbox';

/*
 * «Проверь сам» for the AndoGram A-B-C bridge (Личный архив + мост), v2.
 * Two phones: A = the visitor's AndoGram, B = plain Telegram with the second
 * account. The friend edits a message; the visitor leaves the chat and reads the
 * original in AndoGram's «Личный архив», then on phone 2 (same archive) teases
 * him as A. Then the outro: a tagline over
 * the dimmed screen while the ex's message arrives and is deleted, and the
 * archive still has it. Everything is local mock data: nothing is sent anywhere.
 * Script and timings: bridgeFlow.ts; texts: bridgeCopy.ts; the shared engine
 * (hints, spotlight, phone size): useSandbox.ts + SandboxFrame.tsx.
 */

const FRIEND_COLOR = '#faa774';
const EX_COLOR = '#e17076';
const ME_COLOR = '#a695e7';
const ARCHIVE_COLOR = '#65aadd';
/** Topic colours from AndoGram's ArchiveNamingHelper palette. */
const TOPIC_COLOR = { friend: '#FF885E', ex: '#E56BD6', mom: '#DF74A1', sardor: '#60D49C' } as const;

/** What is on screen at a step: the spotlight is measured again when it changes. */
const viewOf = (s: Step): string => `${phoneOf(s)}|${screenOf(s)}`;

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

interface BridgeSandboxProps {
  lang: Language;
  onBuy: () => void;
}

export function BridgeSandbox({ lang, onBuy }: BridgeSandboxProps) {
  const c = getBridgeCopy(lang);
  const common = getCommonCopy(lang);
  const sb = useSandbox<Step>({ flow: BRIDGE_FLOW, initial: 'idle', hints: c.hints, buttons: c.buttons, viewOf, lang });
  const { step, at, want, tap } = sb;
  const phone = phoneOf(step);
  const screen = screenOf(step);
  /** Time into the outro, ms (bridgeFlow OUTRO); at its end the flow moves on. */
  const outroT = useTimeline(step === 'aOutro', OUTRO_AT.end, sb.next);

  // ── The outro: dim, tagline, the ex's message comes and goes ─────────────
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);
  const outro = step === 'aOutro' ? outroAt(outroT, tagLen, prefersReducedMotion()) : null;
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
      {'\n\n'}
      {c.card.was} {head}
      <mark className="sbx-mark">{was}</mark>
      {tail}
      {'\n\n'}
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
    lifted: outro !== null,
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
      text:
        step === 'aEditing' ? (
          <>
            {head}
            <span className="sbx-swap-old">{was}</span>
            {tail}
          </>
        ) : step === 'aEdited' ? (
          <>
            {head}
            <span className="sbx-swap-new">{now}</span>
            {tail}
          </>
        ) : at('aEdited') ? (
          longEdited
        ) : (
          longOriginal
        ),
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
    { id: 'k1', out: true, text: `${c.card.header(c.friend, '18:41')}\n${longOriginal}`, time: '18:41', wide: true },
    { id: 'k2', out: true, text: editCard, time: '18:41', sbx: 'card-edit', wide: true },
  ];

  // Phone 2: the friend's topic. The cards come in from A (Максим).
  const fromMe = { name: c.me, color: ME_COLOR };
  const topicB: ChatItem[] = [
    { id: 'k1', out: false, from: fromMe, text: `${c.card.header(c.friend, '18:41')}\n${longOriginal}`, time: '18:41', wide: true },
    { id: 'k2', out: false, from: fromMe, text: editCard, time: '18:41', wide: true },
  ];
  if (at('bSent')) topicB.push({ id: 'b1', out: true, text: c.msg.tease, time: '18:43', sbx: 'msg-sent', fresh: step === 'bSent' });

  // Phone 1, the end: the ex's topic still has her deleted message.
  const topicEx: ChatItem[] = [
    { id: 'x1', out: true, text: `${c.card.header(c.ex, '18:45')}\n${c.msg.ex}`, time: '18:45', wide: true },
    { id: 'x2', out: true, text: `${deleteTitle}\n\n${c.card.deleteBody(c.msg.ex, '18:45', '18:45')}`, time: '18:45', wide: true },
  ];

  // ── Screen ───────────────────────────────────────────────────────────────
  let view: React.ReactNode;
  switch (screen) {
    case 'start':
      view = <StartScreen title={c.start.title} sub={c.start.sub} cta={common.cta} onStart={() => sb.start('aSplash')} />;
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
            <DockedHint sb={sb} />
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
            <DockedHint sb={sb} />
            {step === 'finale' ? (
              <EndPanel labels={common.end} onBuy={onBuy} onAgain={() => sb.go('aSplash')} />
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

  return (
    <SandboxFrame
      sb={sb}
      caption={c.phones[phone]}
      phoneKey={phone}
      viewKey={`${phone}-${screen}`}
      screenLabel={c.screenLabel}
      status={screen !== 'start' ? { time: clock } : null}
      overlay={outro && <OutroLayer line={outro} text={c.tagline} dimIn={OUTRO.dimIn} dimOut={OUTRO.dimOut} />}
      progress={progressOf(step, outro ? outroT / OUTRO_AT.end : 0)}
      restartLabel={common.restart}
      onRestart={() => sb.go('aSplash')}
      live={outro && outro.chars > 0 ? c.tagline : ''}
    >
      {view}
    </SandboxFrame>
  );
}

export default BridgeSandbox;
