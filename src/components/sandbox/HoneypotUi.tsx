import React from 'react';
import {
  Bookmark,
  BriefcaseBusiness,
  Check,
  ChevronUp,
  CircleUserRound,
  Delete,
  House,
  Lock,
  LockOpen,
  Moon,
  Phone,
  Plus,
  Settings,
  ShieldCheck,
  UserRound,
  Users,
  VenetianMask,
  type LucideIcon,
} from 'lucide-react';
import { ROUNDS, pinOf, type Round } from './honeypotFlow';
import type { AccountId, DrawerItem, HoneypotAccount, LockCopy } from './honeypotCopy';
import { Avatar, type Tap } from './TgUi';
import './honeypot.css';

/*
 * Screens of the Honeypot sandbox that the Telegram kit (TgUi) has no parts
 * for: AndoGram's PIN lock screen with its digits keypad and the PIN legend
 * (our layer), and the side menu with the accounts (the home screen: HomeUi.tsx).
 * As in TgUi, elements a step can point at carry data-sbx={key}; only the one
 * the step expects is focusable. Every button reports its tap to the engine.
 */

const tabFor = (want: string | undefined, key: string): number => (want === key ? 0 : -1);

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

/** The accounts' pictures: what each one is for, the same in every language. */
const ACCOUNT_ICON: Record<AccountId, LucideIcon> = {
  safe: ShieldCheck,
  personal: House,
  work1: BriefcaseBusiness,
  work2: BriefcaseBusiness,
  secret: VenetianMask,
};

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
  active: activeIndex,
  addLabel,
  items,
  closing,
  tap,
}: {
  accounts: HoneypotAccount[];
  /** Index of the active account in `accounts`. */
  active: number;
  addLabel: string;
  items: Record<DrawerItem, string>;
  closing: boolean;
  tap: Tap;
}) {
  const active = accounts[activeIndex] ?? accounts[0];
  return (
    <div className={`hp-drawer-layer${closing ? ' is-closing' : ''}`}>
      <div className="hp-scrim" aria-hidden="true" />
      <div className="hp-drawer">
        <div className="hp-drawer-head">
          <Avatar name={active.name} color={active.color} icon={ACCOUNT_ICON[active.id]} size={62} />
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
          {accounts.map((a) => (
            <button key={a.id} type="button" className="hp-acc" tabIndex={-1} onClick={() => tap()}>
              <span className="hp-acc-avatar">
                <Avatar name={a.name} color={a.color} icon={ACCOUNT_ICON[a.id]} size={34} />
                {a === active && (
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
