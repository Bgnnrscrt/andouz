import React from 'react';
import {
  Aperture,
  Bookmark,
  Camera,
  Check,
  ChevronUp,
  CirclePlay,
  CircleUserRound,
  Clock,
  CloudSun,
  Delete,
  Globe,
  Images,
  Lock,
  LockOpen,
  MessageSquareText,
  Moon,
  Music2,
  Phone,
  Plus,
  Settings,
  UserRound,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { ROUNDS, pinOf, type Round } from './honeypotFlow';
import type { DrawerItem, HoneypotAccount, HomeAppId, LockCopy } from './honeypotCopy';
import { Avatar, type Tap } from './TgUi';
import './honeypot.css';

/*
 * Screens of the Honeypot sandbox that the Telegram kit (TgUi) has no parts
 * for: the phone's home screen, AndoGram's PIN lock screen with its digits
 * keypad and the PIN legend (our layer), and the side menu with the accounts.
 * As in TgUi, elements a step can point at carry data-sbx={key}; only the one
 * the step expects is focusable. Every button reports its tap to the engine.
 */

const tabFor = (want: string | undefined, key: string): number => (want === key ? 0 : -1);

/* ── Home screen ─────────────────────────────────────────────────────────── */

/** Apps whose name is a brand: the label stays the same in every language. */
type BrandId = 'andogram' | 'instagram' | 'tiktok' | 'youtube';
type AppId = BrandId | HomeAppId;

const BRAND: Record<BrandId, string> = {
  andogram: 'AndoGram',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

const isBrand = (id: AppId): id is BrandId => id in BRAND;

/** The launcher grid (with labels) and the dock (without, as on Android). */
const GRID: readonly AppId[] = ['andogram', 'instagram', 'tiktok', 'youtube', 'gallery', 'clock', 'weather', 'settings'];
const DOCK: readonly AppId[] = ['phone', 'messages', 'browser', 'camera'];

/** Generic glyphs, no brand logos; brand-named apps only keep their names. */
const GLYPH: Record<Exclude<AppId, 'andogram'>, LucideIcon> = {
  instagram: Aperture,
  tiktok: Music2,
  youtube: CirclePlay,
  gallery: Images,
  clock: Clock,
  weather: CloudSun,
  settings: Settings,
  phone: Phone,
  messages: MessageSquareText,
  browser: Globe,
  camera: Camera,
};

function AppIcon({
  id,
  label,
  dock,
  want,
  tap,
}: {
  id: AppId;
  label: string;
  dock: boolean;
  want?: string;
  tap: Tap;
}) {
  const key = `app-${id}`;
  const Glyph = id === 'andogram' ? null : GLYPH[id];
  return (
    <button
      type="button"
      className="hp-app"
      data-sbx={key}
      data-want={want === key}
      tabIndex={tabFor(want, key)}
      onClick={() => tap(key)}
      aria-label={label}
    >
      <span className={`hp-tile hp-tile--${id}`} aria-hidden="true">
        {Glyph ? <Glyph size={27} strokeWidth={1.9} /> : <img src="/logo-96.webp" alt="" width={54} height={54} />}
      </span>
      {!dock && (
        <span className="hp-app-label" aria-hidden="true">
          {label}
        </span>
      )}
    </button>
  );
}

/** Android home screen: clock widget, app grid, dock. AndoGram is the first app. */
export function HomeScreen({
  time,
  date,
  labels,
  want,
  tap,
}: {
  time: string;
  date: string;
  labels: Record<HomeAppId, string>;
  want?: string;
  tap: Tap;
}) {
  const labelOf = (id: AppId): string => (isBrand(id) ? BRAND[id] : labels[id]);
  return (
    <div className="hp-home">
      <div className="hp-clock" aria-hidden="true">
        <span className="hp-clock-time">{time}</span>
        <span className="hp-clock-date">{date}</span>
      </div>
      <div className="hp-apps">
        {GRID.map((id) => (
          <AppIcon key={id} id={id} label={labelOf(id)} dock={false} want={want} tap={tap} />
        ))}
      </div>
      <div className="hp-dock">
        {DOCK.map((id) => (
          <AppIcon key={id} id={id} label={labelOf(id)} dock want={want} tap={tap} />
        ))}
      </div>
      <span className="hp-handle" aria-hidden="true" />
    </div>
  );
}

/* ── Lock screen ─────────────────────────────────────────────────────────── */

/**
 * Which PIN opens what (the demo's instruction, so in our green). The current
 * round's row is highlighted; from round 2 on, the highlight slides down from
 * the previous row as the screen comes in.
 */
function PinLegend({ title, rows, round }: { title: string; rows: Record<Round, string>; round: Round }) {
  const rowClass = (r: Round): string =>
    `hp-legend-row${r === round ? ' is-current' : ''}${r === round - 1 ? ' was-current' : ''}`;
  return (
    <div className={`hp-legend${round > 1 ? ' hp-legend--move' : ''}`}>
      <span className="hp-legend-title">{title}</span>
      <div className="hp-legend-rows">
        <span className="hp-legend-pick" style={{ '--row': round - 1 } as React.CSSProperties} aria-hidden="true" />
        <ul>
          {ROUNDS.map((r) => (
            <li key={r} className={rowClass(r)} aria-current={r === round ? 'true' : undefined}>
              <span className={`hp-legend-pin hp-legend-pin--${r}`}>{pinOf(r)}</span> — {rows[r]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Digits only: 1–9, a gap, 0, ⌫ (as the keyboard of a number field). */
const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'del'] as const;

function Keypad({ delLabel, want, tap }: { delLabel: string; want?: string; tap: Tap }) {
  return (
    <div className="hp-keypad">
      {KEYS.map((k) => {
        if (k === '') return <span key="gap" className="hp-key-gap" aria-hidden="true" />;
        const key = `key-${k}`;
        return (
          <button
            key={k}
            type="button"
            className={`hp-key${k === 'del' ? ' hp-key--del' : ''}`}
            data-sbx={key}
            data-want={want === key}
            tabIndex={tabFor(want, key)}
            onClick={() => tap(key)}
            aria-label={k === 'del' ? delLabel : undefined}
          >
            {k === 'del' ? <Delete size={23} strokeWidth={1.9} aria-hidden="true" /> : k}
          </button>
        );
      })}
    </div>
  );
}

/**
 * AndoGram's PIN lock screen: the legend on top, «Введите PIN», four boxes
 * (`filled` of them show a dot), «Забыли PIN?», the keypad. `ok`: the PIN is
 * right, a short «unlocked» state. `launch`: the app opens from the home screen.
 */
export function LockScreen({
  copy,
  round,
  filled,
  ok,
  launch,
  want,
  tap,
}: {
  copy: LockCopy;
  round: Round;
  filled: number;
  ok: boolean;
  launch: boolean;
  want?: string;
  tap: Tap;
}) {
  return (
    <div className={`hp-lock${launch ? ' hp-lock--launch' : ''}${ok ? ' hp-lock--ok' : ''}`}>
      <PinLegend title={copy.legendTitle} rows={copy.legend} round={round} />
      <div className="hp-lock-main">
        <span className="hp-lock-logo" aria-hidden="true">
          <span className="hp-lock-mark">
            <img src="/logo-96.webp" alt="" width={46} height={46} />
          </span>
          <span key={ok ? 'open' : 'shut'} className="hp-lock-badge">
            {ok ? <LockOpen size={12} strokeWidth={2.4} /> : <Lock size={12} strokeWidth={2.4} />}
          </span>
        </span>
        <span className="hp-lock-title">{copy.enter}</span>
        <span className="hp-boxes" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`hp-box${i < filled ? ' is-filled' : ''}`}>
              {i < filled && <span className="hp-box-dot" />}
            </span>
          ))}
        </span>
        <button type="button" className="hp-forgot" tabIndex={-1} onClick={() => tap()}>
          {copy.forgot}
        </button>
      </div>
      <Keypad delLabel={copy.del} want={want} tap={tap} />
    </div>
  );
}

/* ── Side menu ───────────────────────────────────────────────────────────── */

const ITEMS: readonly { id: DrawerItem; Icon: LucideIcon }[] = [
  { id: 'profile', Icon: CircleUserRound },
  { id: 'group', Icon: Users },
  { id: 'contacts', Icon: UserRound },
  { id: 'calls', Icon: Phone },
  { id: 'saved', Icon: Bookmark },
  { id: 'settings', Icon: Settings },
];

/**
 * The side menu over the chat list, with a scrim: the active account on top,
 * then the accounts block (data-sbx="drawer-accounts": only the accounts this
 * PIN opens, the active one checked, and «Добавить аккаунт»), then the menu.
 * Nothing here moves the demo on: every tap is a wrong tap. `closing` slides it out.
 */
export function AccountDrawer({
  accounts,
  addLabel,
  items,
  closing,
  tap,
}: {
  accounts: HoneypotAccount[];
  addLabel: string;
  items: Record<DrawerItem, string>;
  closing: boolean;
  tap: Tap;
}) {
  const [active] = accounts;
  return (
    <div className={`hp-drawer-layer${closing ? ' is-closing' : ''}`}>
      <div className="hp-scrim" aria-hidden="true" />
      <div className="hp-drawer">
        <div className="hp-drawer-head">
          <Avatar name={active.name} color={active.color} size={62} />
          <Moon size={22} className="hp-drawer-theme" aria-hidden="true" />
          <span className="hp-drawer-who">
            <span className="hp-drawer-id">
              <span className="hp-drawer-name">{active.name}</span>
              <span className="hp-drawer-phone">{active.phone}</span>
            </span>
            <ChevronUp size={20} aria-hidden="true" />
          </span>
        </div>
        <div className="hp-accs" data-sbx="drawer-accounts">
          {accounts.map((a, i) => (
            <button key={a.phone} type="button" className="hp-acc" tabIndex={-1} onClick={() => tap()}>
              <span className="hp-acc-avatar">
                <Avatar name={a.name} color={a.color} size={34} />
                {i === 0 && (
                  <span className="hp-acc-check" aria-hidden="true">
                    <Check size={10} strokeWidth={4} />
                  </span>
                )}
              </span>
              <span className="hp-acc-name">{a.name}</span>
              {a.unread ? <span className="sbx-badge">{a.unread}</span> : null}
            </button>
          ))}
          <button type="button" className="hp-acc-add" tabIndex={-1} onClick={() => tap()}>
            <span className="hp-acc-plus" aria-hidden="true">
              <Plus size={22} />
            </span>
            {addLabel}
          </button>
        </div>
        <span className="hp-drawer-divider" aria-hidden="true" />
        {ITEMS.map(({ id, Icon }) => (
          <button key={id} type="button" className="hp-drawer-item" tabIndex={-1} onClick={() => tap()}>
            <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
            {items[id]}
          </button>
        ))}
      </div>
    </div>
  );
}
