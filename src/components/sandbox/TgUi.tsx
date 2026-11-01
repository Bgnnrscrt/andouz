import React, { useEffect, useLayoutEffect, useRef } from 'react';
import {
  ArrowLeft,
  BatteryMedium,
  BellOff,
  Bookmark,
  Check,
  CheckCheck,
  EllipsisVertical,
  Hash,
  Menu,
  MessageCircle,
  Mic,
  Paperclip,
  Pencil,
  Search,
  SendHorizontal,
  Signal,
  Smile,
  Wifi,
} from 'lucide-react';
import type { TargetKey } from './bridgeFlow';

/*
 * A small Telegram-like UI kit for the «Проверь сам» sandboxes: the generic
 * Android Telegram layout in a dark theme, not a copy of a specific client.
 * Elements a step can point at carry data-sbx={key}; only the element the
 * current step expects is focusable (tabIndex 0) and shows a pointer.
 */

export type Tap = (key?: TargetKey) => void;

interface TapProps {
  /** Element the current step waits for, if any. */
  want?: TargetKey;
  tap: Tap;
}

const tabFor = (want: TargetKey | undefined, key: TargetKey | undefined): number =>
  key !== undefined && want === key ? 0 : -1;

const initials = (name: string): string => {
  const words = name
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  return ((words[0]?.[0] ?? '') + (words[1]?.[0] ?? '')).toUpperCase();
};

export function Avatar({
  name,
  color,
  size = 50,
  saved = false,
}: {
  name: string;
  color: string;
  size?: number;
  saved?: boolean;
}) {
  return (
    <span
      className="sbx-avatar"
      style={{ width: size, height: size, backgroundColor: color, fontSize: Math.round(size * 0.36) }}
      aria-hidden="true"
    >
      {saved ? <Bookmark size={Math.round(size * 0.42)} fill="currentColor" /> : initials(name)}
    </span>
  );
}

/** Forum topic icon: a coloured bubble with the first letter; no colour = «General» (#). */
export function TopicIcon({ name, color, size = 30 }: { name: string; color?: string; size?: number }) {
  if (!color) {
    return (
      <span className="sbx-topic-icon sbx-topic-icon--general" style={{ width: size, height: size }} aria-hidden="true">
        <Hash size={Math.round(size * 0.7)} />
      </span>
    );
  }
  return (
    <span className="sbx-topic-icon" style={{ width: size, height: size }} aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path
          fill={color}
          d="M12 2.6c5.3 0 9.6 3.8 9.6 8.6s-4.3 8.6-9.6 8.6c-1.2 0-2.3-.2-3.4-.5L4 21l1.3-3.9a8.2 8.2 0 0 1-2.9-5.9C2.4 6.4 6.7 2.6 12 2.6Z"
        />
      </svg>
      <span style={{ fontSize: Math.round(size * 0.42) }}>{initials(name).slice(0, 1)}</span>
    </span>
  );
}

export function StatusBar({ time }: { time: string }) {
  return (
    <div className="sbx-status" aria-hidden="true">
      <span>{time}</span>
      <span className="sbx-status-icons">
        <Signal size={13} />
        <Wifi size={13} />
        <BatteryMedium size={16} />
      </span>
    </div>
  );
}

/** Top bar of the chat list: ☰, app name, search. */
export function ListBar({ title }: { title: string }) {
  return (
    <div className="sbx-bar">
      <Menu size={21} aria-hidden="true" />
      <span className="sbx-bar-title">{title}</span>
      <Search size={20} aria-hidden="true" />
    </div>
  );
}

const Dots = () => (
  <span className="sbx-dots" aria-hidden="true">
    <i />
    <i />
    <i />
  </span>
);

/** Header of a chat, a forum or a topic: back, avatar, title, subtitle, ⋮. */
export function ChatBar({
  title,
  subtitle,
  accent = false,
  muted = false,
  typing = false,
  avatar,
  backLabel,
  want,
  tap,
}: {
  title: string;
  subtitle: string;
  accent?: boolean;
  muted?: boolean;
  /** The contact is typing: animated dots before the subtitle. */
  typing?: boolean;
  avatar: React.ReactNode;
  backLabel: string;
} & TapProps) {
  return (
    <div className="sbx-bar sbx-bar--chat">
      <button
        type="button"
        className="sbx-back"
        data-sbx="back"
        data-want={want === 'back'}
        tabIndex={tabFor(want, 'back')}
        onClick={() => tap('back')}
        aria-label={backLabel}
      >
        <ArrowLeft size={21} aria-hidden="true" />
      </button>
      {avatar}
      <span className="sbx-bar-head">
        <span className="sbx-bar-name">
          <span className="sbx-ellipsis">{title}</span>
          {muted && <BellOff size={14} className="sbx-dim-icon" aria-hidden="true" />}
        </span>
        <span className={`sbx-bar-sub${accent ? ' sbx-accent' : ''}`}>
          {typing && <Dots />}
          {subtitle}
        </span>
      </span>
      <EllipsisVertical size={20} aria-hidden="true" />
    </div>
  );
}

export interface RowData {
  id: string;
  name: string;
  color: string;
  time: string;
  preview: React.ReactNode;
  /** Plain text of the preview, for the accessible name. */
  previewText: string;
  unread?: number;
  muted?: boolean;
  saved?: boolean;
  /** The last message is ours and read: ✓✓ before the time. */
  read?: boolean;
  /** Label shown instead of the preview while the contact is typing. */
  typing?: string;
  sbx?: TargetKey;
  /** Slides in (the row just appeared). */
  fresh?: boolean;
  /**
   * One-off list motion: `push` — a row was added above (slide down from where
   * it was), `shift` — a row above was removed (slide up), `gone` — fade out
   * before this row is removed.
   */
  anim?: 'push' | 'shift' | 'gone';
}

export function ChatRow({ row, want, tap }: { row: RowData } & TapProps) {
  return (
    <button
      type="button"
      className={`sbx-row${row.fresh ? ' sbx-row--new' : ''}${row.anim ? ` sbx-row--${row.anim}` : ''}`}
      data-sbx={row.sbx}
      data-want={row.sbx !== undefined && want === row.sbx}
      tabIndex={tabFor(want, row.sbx)}
      onClick={() => tap(row.sbx)}
      aria-label={`${row.name}: ${row.typing ?? row.previewText}`}
    >
      <Avatar name={row.name} color={row.color} saved={row.saved} />
      <span className="sbx-row-main">
        <span className="sbx-row-line">
          <span className="sbx-row-name">
            <span className="sbx-ellipsis">{row.name}</span>
            {row.muted && <BellOff size={13} className="sbx-dim-icon" aria-hidden="true" />}
          </span>
          <span className="sbx-row-time">
            {row.read && <CheckCheck size={15} className="sbx-check" aria-hidden="true" />}
            {row.time}
          </span>
        </span>
        <span className="sbx-row-line">
          {row.typing ? (
            <span className="sbx-typing">
              <Dots />
              {row.typing}
            </span>
          ) : (
            <span className="sbx-row-preview">{row.preview}</span>
          )}
          {row.unread ? (
            <span className={`sbx-badge${row.muted ? ' sbx-badge--muted' : ''}`}>{row.unread}</span>
          ) : null}
        </span>
      </span>
    </button>
  );
}

export interface TopicRowData {
  id: string;
  name: string;
  /** No colour = the «General» topic. */
  color?: string;
  time: string;
  preview: React.ReactNode;
  previewText: string;
  sbx?: TargetKey;
}

export function TopicRow({ row, want, tap }: { row: TopicRowData } & TapProps) {
  return (
    <button
      type="button"
      className="sbx-row sbx-row--topic"
      data-sbx={row.sbx}
      data-want={row.sbx !== undefined && want === row.sbx}
      tabIndex={tabFor(want, row.sbx)}
      onClick={() => tap(row.sbx)}
      aria-label={`${row.name}: ${row.previewText}`}
    >
      <TopicIcon name={row.name} color={row.color} />
      <span className="sbx-row-main">
        <span className="sbx-row-line">
          <span className="sbx-row-name">
            <span className="sbx-ellipsis">{row.name}</span>
          </span>
          <span className="sbx-row-time">{row.time}</span>
        </span>
        <span className="sbx-row-line">
          <span className="sbx-row-preview">{row.preview}</span>
        </span>
      </span>
    </button>
  );
}

export interface MsgData {
  id: string;
  out: boolean;
  /** Plain text, or text with marks (archive cards). Line breaks: \n. */
  text: React.ReactNode;
  time: string;
  edited?: boolean;
  /** Sender name in a group (incoming only); private chats leave it empty. */
  from?: { name: string; color: string };
  /** Outgoing: true = ✓✓, otherwise ✓. */
  read?: boolean;
  sbx?: TargetKey;
  /** Pops in (the message just arrived). */
  fresh?: boolean;
  /** Short highlight (the message was just edited). */
  flash?: boolean;
}

export interface DateData {
  id: string;
  date: string;
}

export type ChatItem = MsgData | DateData;

const isDate = (item: ChatItem | undefined): item is DateData => item !== undefined && 'date' in item;

/** Same incoming group sender as `other` (Telegram groups consecutive messages). */
const sameSender = (m: MsgData, other: ChatItem | undefined): boolean =>
  other !== undefined && !isDate(other) && !other.out && !m.out && other.from?.name === m.from?.name;

function Meta({ m, editedLabel }: { m: MsgData; editedLabel: string }) {
  return (
    <>
      {m.edited && <span>{editedLabel}</span>}
      <span>{m.time}</span>
      {m.out && (m.read ? <CheckCheck size={15} /> : <Check size={15} />)}
    </>
  );
}

/**
 * The conversation. It scrolls (long archive cards) and, like Telegram, stays
 * on the newest message unless the visitor has scrolled up.
 */
export function Messages({ items, editedLabel }: { items: ChatItem[]; editedLabel: string }) {
  const listRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    const el = listRef.current;
    if (!el) return undefined;
    const onScroll = () => {
      stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
    };
    // The list gets shorter when a hint docks under it: keep the newest message in view.
    const observer = new ResizeObserver(() => {
      if (stickRef.current) el.scrollTop = el.scrollHeight;
    });
    observer.observe(el);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="sbx-msgs" ref={listRef}>
      {items.map((item, i) => {
        if (isDate(item)) {
          return (
            <div key={item.id} className="sbx-date">
              <span>{item.date}</span>
            </div>
          );
        }
        const from = item.out ? undefined : item.from;
        const firstOfRun = !sameSender(item, items[i - 1]);
        const lastOfRun = !sameSender(item, items[i + 1]);
        return (
          <div key={item.id} className={`sbx-msg-row${item.out ? ' sbx-msg-row--out' : ''}`}>
            {from &&
              (lastOfRun ? (
                <Avatar name={from.name} color={from.color} size={32} />
              ) : (
                <span className="sbx-msg-avatar-gap" aria-hidden="true" />
              ))}
            <div
              className={`sbx-msg ${item.out ? 'sbx-msg--out' : 'sbx-msg--in'}${item.fresh ? ' sbx-msg--fresh' : ''}${
                item.flash ? ' sbx-msg--flash' : ''
              }`}
              data-sbx={item.sbx}
            >
              {from && firstOfRun && (
                <span className="sbx-msg-name" style={{ color: from.color }}>
                  {from.name}
                </span>
              )}
              <span className="sbx-msg-text">{item.text}</span>
              <span className="sbx-msg-ghost" aria-hidden="true">
                <Meta m={item} editedLabel={editedLabel} />
              </span>
              <span className="sbx-msg-meta">
                <Meta m={item} editedLabel={editedLabel} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * The message input. `button` mode replaces the field with the blue
 * «Отправить сообщение» button (owner's spec); emoji, clip and mic stay.
 */
export function InputBar({
  mode,
  text = '',
  placeholder,
  sendLabel,
  want,
  tap,
}: {
  mode: 'idle' | 'button' | 'typing';
  text?: string;
  placeholder: string;
  sendLabel: string;
} & TapProps) {
  const hasText = mode === 'typing' && text.length > 0;
  return (
    <div className="sbx-input">
      <Smile size={23} aria-hidden="true" />
      {mode === 'button' ? (
        <button
          type="button"
          className="sbx-send-btn"
          data-sbx="send"
          data-want={want === 'send'}
          tabIndex={tabFor(want, 'send')}
          onClick={() => tap('send')}
        >
          {sendLabel}
        </button>
      ) : (
        <span className={`sbx-input-field${hasText ? ' has-text' : ''}`} aria-hidden="true">
          {hasText ? text : placeholder}
          {mode === 'typing' && <span className="sbx-caret" />}
        </span>
      )}
      <Paperclip size={22} aria-hidden="true" />
      {hasText ? (
        <SendHorizontal size={22} className="sbx-accent" aria-hidden="true" />
      ) : (
        <Mic size={22} aria-hidden="true" />
      )}
    </div>
  );
}

/** App launch screen: AndoGram (our logo) or Telegram (text + a generic chat icon). */
export function Splash({ kind }: { kind: 'andogram' | 'telegram' }) {
  return (
    <div className="sbx-splash">
      <span className={`sbx-splash-logo sbx-splash-logo--${kind}`} aria-hidden="true">
        {kind === 'andogram' ? (
          <img src="/logo-96.webp" alt="" width={64} height={64} />
        ) : (
          <MessageCircle size={42} />
        )}
      </span>
      <span className="sbx-splash-name">{kind === 'andogram' ? 'AndoGram' : 'Telegram'}</span>
    </div>
  );
}

export const Fab = () => (
  <span className="sbx-fab" aria-hidden="true">
    <Pencil size={22} />
  </span>
);
