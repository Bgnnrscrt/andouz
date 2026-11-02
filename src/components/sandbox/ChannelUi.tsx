import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Ban,
  Bookmark,
  ChevronDown,
  Eye,
  Flag,
  Forward,
  ImageDown,
  Link,
  Mic,
  Play,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { emojify } from '../../lib/emoji';
import { ChatBar, type Tap } from './TgUi';

/*
 * The No-Forwards sandbox's part of the Telegram-like UI (on top of TgUi): a
 * channel with media posts (drawn with CSS gradients, no images), the post's
 * context menu (reactions + items), toasts, and the channel's logo. As in TgUi,
 * an element a step can wait for carries data-sbx={key}, and only the one the
 * step wants is focusable. Styles: noforwards.css (prefix nf-).
 */

interface TapProps {
  /** Element the current step waits for, if any. */
  want?: string;
  tap: Tap;
}

const tabFor = (want: string | undefined, key: string | undefined): number =>
  key !== undefined && want === key ? 0 : -1;

/** The channel's own picture: real channels have a logo, not initials. */
export function ChannelLogo({ size = 50 }: { size?: number }) {
  return (
    <span className="nf-logo" style={{ width: size, height: size }} aria-hidden="true">
      <Sparkles size={Math.round(size * 0.46)} />
    </span>
  );
}

export interface PostData {
  id: string;
  kind: 'text' | 'photo' | 'video';
  /** The post's text, or the caption under its media. */
  text: string;
  time: string;
  views: string;
  /** Length of a video («12:48»). */
  duration?: string;
  /** The free strip beside the post is a button with this data-sbx key (it opens the menu). */
  side?: string;
}

const PostMeta = ({ views, time }: { views: string; time: string }) => (
  <>
    <Eye size={13} aria-hidden="true" />
    <span>{views}</span>
    <span className="nf-time">{time}</span>
  </>
);

/** A photo or a video thumbnail: a lit backdrop and a speaker's silhouette. */
function Media({ kind, duration }: { kind: 'photo' | 'video'; duration?: string }) {
  return (
    <span className={`nf-media nf-media--${kind}`} aria-hidden="true">
      <span className="nf-person" />
      {kind === 'video' && (
        <>
          <Mic className="nf-mic" size={30} />
          <span className="nf-play">
            <Play size={20} fill="currentColor" />
          </span>
          {duration && <span className="nf-duration">{duration}</span>}
        </>
      )}
    </span>
  );
}

function PostRow({
  post,
  lifted,
  rowRef,
  sideLabel,
  want,
  tap,
}: {
  post: PostData;
  /** Above the menu's scrim: the post the menu belongs to stays bright. */
  lifted: boolean;
  rowRef?: React.RefObject<HTMLDivElement | null>;
  sideLabel: string;
} & TapProps) {
  const meta = <PostMeta views={post.views} time={post.time} />;
  return (
    <div ref={rowRef} className={`sbx-msg-row nf-post-row${lifted ? ' nf-post-row--lifted' : ''}`}>
      <div className={`sbx-msg sbx-msg--in nf-post nf-post--${post.kind}`}>
        {post.kind !== 'text' && <Media kind={post.kind} duration={post.duration} />}
        <span className="nf-caption">
          <span className="sbx-msg-text">{emojify(post.text)}</span>
          <span className="sbx-msg-ghost" aria-hidden="true">
            {meta}
          </span>
        </span>
        <span className="sbx-msg-meta">{meta}</span>
      </div>
      {post.side && (
        <button
          type="button"
          className="nf-post-side"
          data-sbx={post.side}
          data-want={want === post.side}
          tabIndex={tabFor(want, post.side)}
          onClick={() => tap(post.side)}
          aria-label={sideLabel}
        />
      )}
    </div>
  );
}

/**
 * The channel's posts, oldest first. Like TgUi's Messages it scrolls and stays
 * on the newest post unless the visitor scrolls up, so the newest post (the
 * video) is in view on any phone height.
 */
function ChannelFeed({
  posts,
  today,
  sideLabel,
  lifted,
  anchorRef,
  want,
  tap,
}: {
  posts: PostData[];
  today: string;
  sideLabel: string;
  /** The menu is open: lift the post with the side strip above its scrim. */
  lifted: boolean;
  /** The post with the side strip (the menu opens next to it). */
  anchorRef: React.RefObject<HTMLDivElement | null>;
} & TapProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (el && stickRef.current) el.scrollTop = el.scrollHeight;
  });

  useEffect(() => {
    const el = listRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return undefined;
    const onScroll = () => {
      stickRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 8;
    };
    // The feed or its posts change size (window, fonts): keep the newest post in view.
    const observer = new ResizeObserver(() => {
      if (stickRef.current) el.scrollTop = el.scrollHeight;
    });
    observer.observe(el);
    observer.observe(inner);
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="sbx-msgs" ref={listRef}>
      <div className="nf-feed" ref={innerRef}>
        <div className="sbx-date">
          <span>{today}</span>
        </div>
        {posts.map((post) => (
          <PostRow
            key={post.id}
            post={post}
            lifted={lifted && post.side !== undefined}
            rowRef={post.side ? anchorRef : undefined}
            sideLabel={sideLabel}
            want={want}
            tap={tap}
          />
        ))}
      </div>
    </div>
  );
}

export type MenuKey = 'forward' | 'gallery' | 'saved' | 'link' | 'report';

const MENU_ICON: Record<MenuKey, LucideIcon> = {
  forward: Forward,
  gallery: ImageDown,
  saved: Bookmark,
  link: Link,
  report: Flag,
};

/** Quick reactions over the menu, as in Telegram. */
const REACTIONS = ['❤️', '👍', '🔥', '😂', '😮'] as const;

export interface MenuData {
  /** Items in order; each is a button with data-sbx `menu-<key>`. */
  keys: readonly MenuKey[];
  labels: Record<MenuKey, string>;
  /** aria-label of the menu. */
  label: string;
  /** Fading out: the step after the menu closed it. */
  closing: boolean;
}

function PostMenu({
  menu,
  top,
  menuRef,
  want,
  tap,
}: {
  menu: MenuData;
  /** Measured position; hidden until then (the first layout pass). */
  top: number | null;
  menuRef: React.RefObject<HTMLDivElement | null>;
} & TapProps) {
  // Fading out: inert, so it leaves the accessibility tree and a focused item
  // (pressed from the keyboard) lets go of the focus.
  return (
    <div
      ref={menuRef}
      className={`nf-menu${menu.closing ? ' is-closing' : ''}`}
      style={top === null ? { visibility: 'hidden' } : { top }}
      role="group"
      aria-label={menu.label}
      inert={menu.closing || undefined}
    >
      {/* Not buttons: a tap here counts as a tap beside the target. */}
      <div className="nf-reactions" aria-hidden="true">
        {REACTIONS.map((r) => (
          <span key={r} className="nf-reaction">
            {emojify(r)}
          </span>
        ))}
        <span className="nf-reactions-more">
          <ChevronDown size={16} />
        </span>
      </div>
      <div className="nf-menu-card">
        {menu.keys.map((key) => {
          const Icon = MENU_ICON[key];
          const sbx = `menu-${key}`;
          return (
            <button
              key={key}
              type="button"
              className="nf-menu-item"
              data-sbx={sbx}
              data-want={want === sbx}
              tabIndex={tabFor(want, sbx)}
              onClick={() => tap(sbx)}
            >
              <Icon size={21} aria-hidden="true" />
              <span className="sbx-ellipsis">{menu.labels[key]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export type ToastKind = 'saved' | 'restricted';

export interface ToastData {
  kind: ToastKind;
  text: string;
  /** Fading out: the next step took it away. */
  closing: boolean;
}

/** Screen readers get the text from the sandbox's live region (NoForwardsSandbox `live`). */
function Toast({ toast }: { toast: ToastData }) {
  return (
    <div
      className={`nf-toast nf-toast--${toast.kind}${toast.closing ? ' is-closing' : ''}`}
      aria-hidden={toast.closing || undefined}
    >
      {toast.kind === 'saved' ? (
        <Bookmark size={20} fill="currentColor" aria-hidden="true" />
      ) : (
        <Ban size={20} aria-hidden="true" />
      )}
      <span>{emojify(toast.text)}</span>
    </div>
  );
}

/** Room between the menu and its post, and the menu's closest approach to the top, px. */
const MENU_GAP = 8;

export interface ChannelScreenProps extends TapProps {
  title: string;
  subtitle: string;
  logo: React.ReactNode;
  backLabel: string;
  today: string;
  posts: PostData[];
  /** aria-label of the strip beside the post (it opens the menu). */
  sideLabel: string;
  /** The bottom bar of a channel («Выключить звук»); a tap on it is a wrong tap. */
  footer: string;
  /** The post's context menu over a scrim; null: closed. */
  menu: MenuData | null;
  toast: ToastData | null;
}

/**
 * A channel as a subscriber sees it: header, posts, the bottom bar, and on top
 * the post's context menu (over a light scrim, the post itself kept bright) and
 * a toast above the bottom bar. Layers stay under the spotlight (20).
 */
export function ChannelScreen({
  title,
  subtitle,
  logo,
  backLabel,
  today,
  posts,
  sideLabel,
  footer,
  menu,
  toast,
  want,
  tap,
}: ChannelScreenProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuTop, setMenuTop] = useState<number | null>(null);
  const menuOn = menu !== null;

  // Telegram pops the menu up at the tapped post: here right above it, or over
  // its top when the screen is too low for both. Measured before paint.
  useLayoutEffect(() => {
    const box = boxRef.current;
    if (!menuOn || !box) return undefined;
    const place = () => {
      const row = anchorRef.current;
      const card = menuRef.current;
      if (!row || !card) return;
      // The phone may be scaled as a whole: back to its own px.
      const b = box.getBoundingClientRect();
      const k = b.height / box.offsetHeight || 1;
      const rowTop = (row.getBoundingClientRect().top - b.top) / k;
      const top = Math.max(MENU_GAP, Math.round(rowTop - MENU_GAP - card.offsetHeight));
      setMenuTop((prev) => (prev === top ? prev : top));
    };
    place();
    const observer = new ResizeObserver(place);
    observer.observe(box);
    box.addEventListener('scroll', place, true);
    return () => {
      observer.disconnect();
      box.removeEventListener('scroll', place, true);
    };
  }, [menuOn]);

  return (
    <div className="nf-screen" ref={boxRef}>
      <ChatBar title={title} subtitle={subtitle} avatar={logo} backLabel={backLabel} want={want} tap={tap} />
      <div className="sbx-chat">
        <ChannelFeed
          posts={posts}
          today={today}
          sideLabel={sideLabel}
          lifted={menuOn}
          anchorRef={anchorRef}
          want={want}
          tap={tap}
        />
        <button type="button" className="nf-footer" tabIndex={-1} onClick={() => tap()}>
          {footer}
        </button>
      </div>
      {menu && (
        <>
          {/* A tap on the scrim lands on the screen: a wrong tap. */}
          <div className={`nf-scrim${menu.closing ? ' is-closing' : ''}`} aria-hidden="true" />
          <PostMenu menu={menu} top={menuTop} menuRef={menuRef} want={want} tap={tap} />
        </>
      )}
      {toast && <Toast toast={toast} />}
    </div>
  );
}
