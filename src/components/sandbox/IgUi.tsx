import React from 'react';
import {
  Aperture,
  ArrowLeft,
  Bookmark,
  Camera,
  Clapperboard,
  Eye,
  Heart,
  Home,
  Image as ImageIcon,
  MessageCircle,
  Mic,
  MoreHorizontal,
  PlusSquare,
  Search,
  Send,
  X,
} from 'lucide-react';
import { emojify } from '../../lib/emoji';
import type { IgCopy, IgPerson } from './igCopy';
import { fill } from './igCopy';
import type { Tap } from './TgUi';
import './ig.css';

/*
 * A small «like Instagram» kit for Andusta's «Проверь сам» sandboxes (dark
 * theme, the name as text, no logo): the feed (top bar, stories, a post, the
 * bottom bar), a story full screen and its viewers, the Direct notification,
 * a Direct chat with a view-once photo and the photo full screen. Andusta looks
 * the same — it is a clone — plus its own layer (AndustaUi.tsx). Buttons a step
 * waits for carry data-sbx keys; only the expected one is focusable.
 */

interface TapProps {
  want?: string;
  tap: Tap;
}

/** A button of the phone UI: a target when its key is the one the step wants. */
function Btn({
  sbx,
  want,
  tap,
  className,
  label,
  round,
  children,
}: TapProps & {
  sbx: string;
  className?: string;
  label?: string;
  round?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      data-sbx={sbx}
      data-sbx-round={round ? '' : undefined}
      data-want={want === sbx}
      tabIndex={want === sbx ? 0 : -1}
      aria-label={label}
      onClick={() => tap(sbx)}
    >
      {children}
    </button>
  );
}

/** A coloured circle with the person's initial. */
export function IgAvatar({ person, size = 32 }: { person: IgPerson; size?: number }) {
  return (
    <span
      className="ig-avatar"
      style={{ width: size, height: size, background: person.color, fontSize: Math.round(size * 0.42) }}
      aria-hidden="true"
    >
      {Array.from(person.name)[0]}
    </span>
  );
}

/** Instagram's splash (Andusta keeps it: the clone shows the same one). */
export function IgSplash() {
  return (
    <div className="ig-splash">
      <span className="ig-splash-logo" aria-hidden="true">
        <Aperture size={44} strokeWidth={1.8} />
      </span>
    </div>
  );
}

/** The feed's top bar: the name as text, ♡ and ➤ with a counter. */
export function IgTopBar({ unread = 0 }: { unread?: number }) {
  return (
    <div className="ig-top">
      <span className="ig-top-name">Instagram</span>
      <span className="ig-top-icons" aria-hidden="true">
        <Heart size={24} strokeWidth={2} />
        <span className="ig-top-dm">
          <Send size={23} strokeWidth={2} />
          {unread > 0 && <span className="ig-badge">{unread}</span>}
        </span>
      </span>
    </div>
  );
}

export interface StoryItem {
  id: string;
  person: IgPerson;
  /** Watched: a grey ring instead of the gradient. */
  seen: boolean;
  /** The own «Ваша история» (with +). */
  self?: boolean;
}

/** The stories row; a story a step waits for is data-sbx="story-<id>". */
export function IgStories({ items, yourStory, ...tp }: { items: StoryItem[]; yourStory: string } & TapProps) {
  return (
    <div className="ig-stories">
      {items.map((s) => {
        const label = s.self ? yourStory : s.person.nick;
        const ring = s.self ? 'ig-ring--none' : s.seen ? 'ig-ring--seen' : 'ig-ring--new';
        return (
          <Btn key={s.id} sbx={`story-${s.id}`} className="ig-story" label={label} round {...tp}>
            <span className={`ig-ring ${ring}`}>
              <IgAvatar person={s.person} size={58} />
              {s.self && <span className="ig-story-plus" aria-hidden="true">+</span>}
            </span>
            <span className="ig-story-name">{label}</span>
          </Btn>
        );
      })}
    </div>
  );
}

export interface PostProps extends TapProps {
  author: IgPerson;
  art: React.ReactNode;
  caption: string;
  likes: number;
  liked: boolean;
  /** Andusta's lime-green like instead of Instagram's red. */
  lime: boolean;
  /** The big heart over the photo (a double tap just happened). */
  bigHeart: boolean;
  labels: IgCopy['ig'];
}

/** A post: header, photo (data-sbx="post-photo"), actions (♥ is data-sbx="like-btn"), likes, caption. */
export function IgPost({ author, art, caption, likes, liked, lime, bigHeart, labels, want, tap }: PostProps) {
  const heartClass = liked ? (lime ? 'ig-liked ig-liked--lime' : 'ig-liked') : '';
  return (
    <article className="ig-post" data-sbx="post">
      <header className="ig-post-head">
        <span className="ig-ring ig-ring--seen ig-ring--small">
          <IgAvatar person={author} size={30} />
        </span>
        <span className="ig-post-nick">{author.nick}</span>
        <MoreHorizontal size={20} className="ig-post-more" aria-label={labels.actions.more} />
      </header>
      <Btn sbx="post-photo" className="ig-post-photo" label={labels.actions.like} want={want} tap={tap}>
        {art}
        {bigHeart && (
          <span className={`ig-big-heart${lime ? ' ig-big-heart--lime' : ''}`} aria-hidden="true">
            <Heart size={96} fill="currentColor" strokeWidth={0} />
          </span>
        )}
      </Btn>
      <div className="ig-post-actions">
        <span className={`ig-act ${heartClass}`} data-sbx="like-btn" aria-label={labels.actions.like}>
          <Heart size={25} strokeWidth={2} fill={liked ? 'currentColor' : 'none'} />
        </span>
        <span className="ig-act" aria-label={labels.actions.comment}>
          <MessageCircle size={24} strokeWidth={2} />
        </span>
        <span className="ig-act" aria-label={labels.actions.share}>
          <Send size={23} strokeWidth={2} />
        </span>
        <span className="ig-act ig-act--save" aria-label={labels.actions.save}>
          <Bookmark size={24} strokeWidth={2} />
        </span>
      </div>
      <p className="ig-post-likes">{fill(labels.likes, { n: likes })}</p>
      <p className="ig-post-caption">
        <b>{author.nick}</b> {emojify(caption)}
      </p>
    </article>
  );
}

/** The bottom bar: home, search, create, reels, profile. */
export function IgNav({ you, labels }: { you: IgPerson; labels: IgCopy['ig'] }) {
  return (
    <nav className="ig-nav" aria-hidden="true">
      <Home size={25} strokeWidth={2.2} aria-label={labels.nav.home} />
      <Search size={24} strokeWidth={2} />
      <PlusSquare size={24} strokeWidth={2} />
      <Clapperboard size={24} strokeWidth={2} />
      <IgAvatar person={you} size={26} />
    </nav>
  );
}

/**
 * A story full screen: progress bar (runs `ms` while `playing`), author, the
 * picture, and at the bottom either the reply field or, on the author's own
 * phone, «👁 N» (data-sbx="viewers").
 */
export function IgStory({
  author,
  art,
  text,
  ago,
  playing,
  ms,
  own,
  viewersCount = 0,
  labels,
  want,
  tap,
}: TapProps & {
  author: IgPerson;
  art: React.ReactNode;
  text: string;
  ago: string;
  playing: boolean;
  ms: number;
  own: boolean;
  viewersCount?: number;
  labels: IgCopy['ig'];
}) {
  return (
    <div className="ig-storyview">
      <div className="ig-storyview-art">{art}</div>
      <div className="ig-storyview-bar" aria-hidden="true">
        <span
          className={`ig-storyview-fill${playing ? ' is-playing' : ' is-full'}`}
          style={{ '--story-ms': `${ms}ms` } as React.CSSProperties}
        />
      </div>
      <div className="ig-storyview-head">
        <IgAvatar person={author} size={32} />
        <span className="ig-storyview-nick">{author.nick}</span>
        <span className="ig-storyview-ago">{ago}</span>
        <X size={24} className="ig-storyview-x" aria-hidden="true" />
      </div>
      <p className="ig-storyview-text">{emojify(text)}</p>
      <div className="ig-storyview-foot">
        {own ? (
          <Btn sbx="viewers" className="ig-viewers-btn" label={`${labels.viewers}: ${viewersCount}`} want={want} tap={tap}>
            <Eye size={20} strokeWidth={2.2} aria-hidden="true" />
            <span>{viewersCount}</span>
          </Btn>
        ) : (
          <>
            <span className="ig-storyview-reply">{labels.reply}</span>
            <Heart size={26} strokeWidth={2} aria-hidden="true" />
            <Send size={24} strokeWidth={2} aria-hidden="true" />
          </>
        )}
      </div>
    </div>
  );
}

/** The viewers of one's own story, a sheet over it. Your row is data-sbx="viewer-you". */
export function IgViewers({
  viewers,
  youId,
  labels,
}: {
  viewers: { id: string; person: IgPerson }[];
  youId: string;
  labels: IgCopy['ig'];
}) {
  return (
    <div className="ig-sheet-wrap">
      <div className="ig-sheet" data-sbx="viewers-list">
        <span className="ig-sheet-grip" aria-hidden="true" />
        <div className="ig-sheet-head">
          <Eye size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>
            {viewers.length} · {labels.viewers}
          </span>
        </div>
        <ul className="ig-sheet-list">
          {viewers.map((v) => (
            <li key={v.id} className="ig-viewer" data-sbx={v.id === youId ? 'viewer-you' : undefined}>
              <IgAvatar person={v.person} size={44} />
              <span className="ig-viewer-text">
                <b>{v.person.nick}</b>
                <span>{v.person.name}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** A Direct notification over the top of the screen (data-sbx="notif"). */
export function IgNotification({ from, text, now, ...tp }: { from: IgPerson; text: string; now: string } & TapProps) {
  return (
    <Btn sbx="notif" className="ig-notif" label={text} {...tp}>
      <span className="ig-notif-app" aria-hidden="true">
        <Aperture size={14} strokeWidth={2.4} />
      </span>
      <span className="ig-notif-body">
        <span className="ig-notif-top">
          Instagram · {now}
        </span>
        <span className="ig-notif-text">{text}</span>
      </span>
      <IgAvatar person={from} size={34} />
    </Btn>
  );
}

export type ViewOnceState = 'new' | 'opened' | 'kept';

/**
 * A Direct chat: header, the friend's messages and a view-once photo bubble
 * (data-sbx="vo-bubble"): new (gradient), opened (grey «Просмотрено», Instagram)
 * or kept (Andusta: still a photo to open).
 */
export function IgDirect({
  peer,
  messages,
  photo,
  shake,
  dock,
  labels,
  want,
  tap,
}: TapProps & {
  peer: IgPerson;
  messages: string[];
  photo: ViewOnceState;
  /** The opened bubble was tapped and doesn't open: it wiggles. */
  shake: boolean;
  /** The docked hint (DockedHint): between the messages and the input, it pushes them up. */
  dock?: React.ReactNode;
  labels: IgCopy['ig'];
}) {
  const opened = photo === 'opened';
  return (
    <div className="ig-direct">
      <div className="ig-direct-head">
        <ArrowLeft size={24} aria-label={labels.back} />
        <IgAvatar person={peer} size={30} />
        <span className="ig-direct-who">
          <b>{peer.name}</b>
          <span>{peer.nick}</span>
        </span>
      </div>
      <div className="ig-direct-msgs">
        {messages.map((m) => (
          <div key={m} className="ig-msg">
            <IgAvatar person={peer} size={26} />
            <span className="ig-bubble">{emojify(m)}</span>
          </div>
        ))}
        <div className="ig-msg">
          <IgAvatar person={peer} size={26} />
          <Btn
            sbx="vo-bubble"
            className={`ig-vo${opened ? ' ig-vo--opened' : ''}${shake ? ' ig-vo--shake' : ''}`}
            label={opened ? labels.opened : `${labels.photo} · ${labels.viewOnce}`}
            want={want}
            tap={tap}
          >
            <span className="ig-vo-icon" aria-hidden="true">
              <ImageIcon size={18} strokeWidth={2.2} />
            </span>
            <span className="ig-vo-text">
              <b>{opened ? labels.opened : labels.photo}</b>
              <span>{opened ? labels.viewOnce : labels.tapToView}</span>
            </span>
            <span className="ig-vo-once" aria-hidden="true">1</span>
          </Btn>
        </div>
      </div>
      {dock}
      <div className="ig-direct-input" aria-hidden="true">
        <span className="ig-direct-cam">
          <Camera size={18} strokeWidth={2.4} />
        </span>
        <span className="ig-direct-field">{labels.message}</span>
        <Mic size={22} strokeWidth={2} />
        <ImageIcon size={22} strokeWidth={2} />
      </div>
    </div>
  );
}

/** A view-once photo full screen (it closes by itself after its time). */
export function IgPhoto({ from, art, ms, labels }: { from: IgPerson; art: React.ReactNode; ms: number; labels: IgCopy['ig'] }) {
  return (
    <div className="ig-photo">
      <div className="ig-photo-art">{art}</div>
      <div className="ig-storyview-bar" aria-hidden="true">
        <span className="ig-storyview-fill is-playing" style={{ '--story-ms': `${ms}ms` } as React.CSSProperties} />
      </div>
      <div className="ig-storyview-head">
        <IgAvatar person={from} size={30} />
        <span className="ig-storyview-nick">{from.nick}</span>
        <span className="ig-vo-once ig-vo-once--light" aria-hidden="true">1</span>
        <X size={24} className="ig-storyview-x" aria-hidden="true" />
      </div>
      <div className="ig-storyview-foot">
        <span className="ig-storyview-reply">{labels.reply}</span>
      </div>
    </div>
  );
}

/** An Android toast at the bottom of the screen. */
export function IgToast({ text }: { text: string }) {
  return (
    <div className="ig-toast" role="status">
      {emojify(text)}
    </div>
  );
}
