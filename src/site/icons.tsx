import {
  Archive, ArrowDownWideNarrow, Download, Eye, Ghost, History, Image as ImageIcon, KeyRound, LayoutGrid,
  MapPin, Mic, Music, Camera, ScanFace, ShieldCheck, Sparkles, StickyNote, Trash2, Type, UserMinus, Send,
  LockKeyhole, RotateCcw, Hand, FastForward, Maximize2, FileAudio, Scissors, ListMusic, FolderInput, Play,
  type LucideIcon,
} from 'lucide-react';
import type { SiteAppId } from '../types';
import type { IconName } from './copy';

export const ICONS: Record<IconName, LucideIcon> = {
  key: KeyRound,
  download: Download,
  archive: Archive,
  ghost: Ghost,
  eye: Eye,
  sparkles: Sparkles,
  mic: Mic,
  pin: MapPin,
  note: StickyNote,
  sort: ArrowDownWideNarrow,
  history: History,
  music: Music,
  camera: Camera,
  type: Type,
  image: ImageIcon,
  layout: LayoutGrid,
  shield: ShieldCheck,
  'user-minus': UserMinus,
  trash: Trash2,
  scan: ScanFace,
  lock: LockKeyhole,
  restore: RotateCcw,
  hand: Hand,
  fast: FastForward,
  expand: Maximize2,
  audio: FileAudio,
  scissors: Scissors,
  playlist: ListMusic,
  folder: FolderInput,
};

/** The app's emblem icon (paper plane / camera / play — the triangle of Andeo's launcher icon). */
export const APP_ICON: Record<SiteAppId, LucideIcon> = { andogram: Send, andusta: Camera, andeo: Play };

export const Icon: React.FC<{ name: IconName; size?: number }> = ({ name, size = 20 }) => {
  const C = ICONS[name];
  return <C size={size} strokeWidth={1.6} aria-hidden="true" />;
};

export const AppEmblem: React.FC<{ app: SiteAppId; size?: 'sm' | 'md' | 'lg' }> = ({ app, size = 'md' }) => {
  const C = APP_ICON[app];
  const px = size === 'lg' ? 30 : size === 'sm' ? 18 : 24;
  return (
    <span className={`emblem emblem--${app} emblem--${size}`} aria-hidden="true">
      <C size={px} strokeWidth={1.7} />
    </span>
  );
};

/* The ANDO logo (owner 12.11, the last frame of the logo clip): lowercase «ando», n = robot (antennae, both eyes
   equally open and cut out — since the clip ends after the wink; the first version squinted the right eye),
   o = a switch turned ON (the knob is cut out). Letters take currentColor, the switch takes
   --brand-accent (`.brand-logo-switch` in site.css). Box 2413.32 × 704 → width = height × 3.428. */
const LOGO = {
  a: 'M524 -500L524 0L384 0L384 -18.14A262 262 0 1 1 384 -481.86L384 -500ZM278.2 -384A124.2 134 0 0 0 278.2 -116A105.8 85.76 0 0 0 384 -201.76L384 -298.24A105.8 85.76 0 0 0 278.2 -384Z',
  antennae: 'M689.19 -411.03L632.85 -516.98A30 30 0 0 1 685.83 -545.15L742.16 -439.2ZM921.84 -439.2L978.17 -545.15A30 30 0 0 1 1031.15 -516.98L974.81 -411.03Z',
  n: 'M582 0L582 -262A250 250 0 0 1 1082 -262L1082 0L942 0L942 -204A110 96 0 0 0 722 -204L722 0ZM686.58 -414L769.42 -414A50 50 0 1 1 686.58 -414ZM894.58 -414L977.42 -414A50 50 0 1 1 894.58 -414Z',
  d: 'M1648 -680L1648 0L1508 0L1508 -18.14A262 262 0 1 1 1508 -481.86L1508 -680ZM1402.2 -384A124.2 134 0 0 0 1402.2 -116A105.8 85.76 0 0 0 1508 -201.76L1508 -298.24A105.8 85.76 0 0 0 1402.2 -384Z',
  o: 'M1949 -507L2144.32 -507A257 257 0 0 1 2144.32 7L1949 7A257 257 0 0 1 1949 -507ZM1992.32 -250A143 143 0 0 0 2278.32 -250A143 143 0 0 0 1992.32 -250Z',
};

export const AndoLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="-6 -686 2413.32 704" aria-hidden="true" focusable="false">
    <path fill="currentColor" fillRule="evenodd" d={LOGO.a} />
    <path fill="currentColor" d={LOGO.antennae} />
    <path fill="currentColor" fillRule="evenodd" d={LOGO.n} />
    <path fill="currentColor" fillRule="evenodd" d={LOGO.d} />
    <path className="brand-logo-switch" fillRule="evenodd" d={LOGO.o} />
  </svg>
);
