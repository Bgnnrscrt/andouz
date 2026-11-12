import {
  Aperture,
  Camera,
  CirclePlay,
  Clock,
  CloudSun,
  Globe,
  Images,
  MessageSquareText,
  Music2,
  Phone,
  Send,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import type { Tap } from './TgUi';
import './home.css';

/*
 * The phone's home screen of the «Проверь сам» sandboxes (Android launcher):
 * clock widget, app grid, dock. The grid is the scenario's: Honeypot starts
 * with AndoGram, the AR masks with Telegram and then AndoGram, Andusta's with
 * Instagram and then Andusta. Apps a step waits for carry data-sbx="app-<id>";
 * only the expected one is focusable. Andusta's tile is Instagram's (the clone
 * keeps its icon; only the label differs — owner, 2026-11-03).
 */

/** Generic apps (their labels are translated); brand-named apps keep their names. */
export type HomeAppId = 'gallery' | 'clock' | 'weather' | 'settings' | 'phone' | 'messages' | 'browser' | 'camera';

type BrandId = 'andogram' | 'andusta' | 'telegram' | 'instagram' | 'tiktok' | 'youtube';

export type LauncherApp = BrandId | HomeAppId;

const BRAND: Record<BrandId, string> = {
  andogram: 'AndoGram',
  andusta: 'Andusta',
  telegram: 'Telegram',
  instagram: 'Instagram',
  tiktok: 'TikTok',
  youtube: 'YouTube',
};

const isBrand = (id: LauncherApp): id is BrandId => id in BRAND;

/** The default launcher grid (with labels) and the dock (without, as on Android). */
const HOME_GRID: readonly LauncherApp[] = [
  'andogram',
  'instagram',
  'tiktok',
  'youtube',
  'gallery',
  'clock',
  'weather',
  'settings',
];
const DOCK: readonly LauncherApp[] = ['phone', 'messages', 'browser', 'camera'];

/** Generic glyphs, no brand logos; brand-named apps only keep their names. */
const GLYPH: Record<Exclude<LauncherApp, 'andogram'>, LucideIcon> = {
  telegram: Send,
  instagram: Aperture,
  andusta: Aperture,
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
  id: LauncherApp;
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
      tabIndex={want === key ? 0 : -1}
      onClick={() => tap(key)}
      aria-label={label}
    >
      <span className={`hp-tile hp-tile--${id}`} aria-hidden="true">
        {Glyph ? <Glyph size={27} strokeWidth={1.9} /> : <img src="/andogram-icon.svg" alt="" width={54} height={54} />}
      </span>
      {!dock && (
        <span className="hp-app-label" aria-hidden="true">
          {label}
        </span>
      )}
    </button>
  );
}

/** Android home screen: clock widget, app grid (`grid`), dock. */
export function HomeScreen({
  time,
  date,
  labels,
  grid = HOME_GRID,
  want,
  tap,
}: {
  time: string;
  date: string;
  labels: Record<HomeAppId, string>;
  grid?: readonly LauncherApp[];
  want?: string;
  tap: Tap;
}) {
  const labelOf = (id: LauncherApp): string => (isBrand(id) ? BRAND[id] : labels[id]);
  return (
    <div className="hp-home">
      <div className="hp-clock" aria-hidden="true">
        <span className="hp-clock-time">{time}</span>
        <span className="hp-clock-date">{date}</span>
      </div>
      <div className="hp-apps">
        {grid.map((id) => (
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
