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
