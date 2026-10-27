import React, { useEffect, useRef } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, animate, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import {
  Lock, LockOpen, ShieldCheck, Check, Send, EyeOff, Eye, Ghost, AlertTriangle, Save,
  Film, Mic, FileArchive, Image as ImageIcon,
} from 'lucide-react';
import { DURATION, EASE_OUT, SPRING } from '../../lib/motion';
import type { Language } from '../../types';
import { scenes } from './copy';
import { useSceneSteps } from './useSceneSteps';

/* Each scene plays a short, one-shot explanatory micro-story when shown, then holds a readable
 * final state. Timers live in useSceneSteps and are cleaned up on tab change / unmount. Under
 * reduced motion every story jumps straight to its final state. */

interface SceneProps {
  lang: Language;
}

/** Small appear helper: fade + short rise, driven by a boolean (no mount animation). */
const Appear: React.FC<{ show: boolean; y?: number; delay?: number; className?: string; style?: CSSProperties; children: ReactNode }> = ({
  show, y = 8, delay = 0, className, style, children,
}) => (
  <motion.div
    className={className}
    style={style}
    initial={false}
    animate={show ? { opacity: 1, transform: 'translateY(0px)' } : { opacity: 0, transform: `translateY(${y}px)` }}
    transition={{ duration: DURATION.scene, ease: EASE_OUT, delay }}
  >
    {children}
  </motion.div>
);

/** Count up to a target the first time it becomes active, without a per-frame React render. */
const CountUp: React.FC<{ to: number; from?: number; duration?: number; active: boolean; className?: string; style?: CSSProperties }> = ({
  to, from = 0, duration = 0.9, active, className, style,
}) => {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(from);
  useMotionValueEvent(mv, 'change', (v) => {
    if (ref.current) ref.current.textContent = String(Math.round(v));
  });
  useEffect(() => {
    if (reduce) { mv.set(to); return; }
    if (!active) { mv.set(from); return; }
    const controls = animate(mv, to, { duration, ease: EASE_OUT });
    return () => controls.stop();
  }, [active, to, from, duration, reduce, mv]);
  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: 'tabular-nums', fontFamily: 'var(--font-mono)', ...style }}>
      {reduce ? to : from}
    </span>
  );
};

/* ---------------------------------------------------------------- Archive */

const ARCHIVE_STEPS = [500, 700, 900, 800, 700] as const;

export const ArchiveScene: React.FC<SceneProps> = ({ lang }) => {
  const reduce = useReducedMotion() ?? false;
  const step = useSceneSteps(ARCHIVE_STEPS, reduce);
  const p = scenes.archive.phone;
  const tx = (k: keyof typeof p) => p[k][lang];
  const cyan = '#00b4d8';
  const green = '#00f59b';

  const Node = (label: string, letter: string, lit: boolean, color: string) => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, position: 'relative', zIndex: 1 }}>
      <motion.div
        aria-hidden
        initial={false}
        animate={{ backgroundColor: lit ? color : '#232a38', boxShadow: lit ? `0 0 14px ${color}` : '0 0 0 transparent' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.72rem', fontWeight: 800, color: '#05140d' }}
      >
        {letter}
      </motion.div>
      <span style={{ fontSize: '0.56rem', color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>{label}</span>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
          <div style={{ width: 28, height: 28, borderRadius: '50%', background: cyan, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, color: '#032530', flexShrink: 0 }}>A</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '0.74rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{tx('header')}</div>
            <div style={{ fontSize: '0.6rem', color: green, display: 'flex', alignItems: 'center', gap: 4 }}>
              <span className="demo-live-dot" aria-hidden />
              {tx('status')}
            </div>
          </div>
        </div>
        <span className="badge-pill badge-gram" style={{ fontSize: '0.58rem', padding: '2px 7px', flexShrink: 0 }}>{tx('topic')}</span>
      </div>

      {/* Bridge A — B — C */}
      <div style={{ position: 'relative', padding: '2px 11px 0' }}>
        <div aria-hidden style={{ position: 'absolute', left: 22, right: 22, top: 13, height: 2, background: 'rgba(255,255,255,0.12)', borderRadius: 2 }}>
          <motion.div
            initial={false}
            animate={{ transform: step >= 2 ? 'scaleX(1)' : 'scaleX(0)' }}
            transition={{ duration: reduce ? 0 : 0.85, ease: 'linear' }}
            style={{ position: 'absolute', inset: 0, transformOrigin: 'left', background: `linear-gradient(90deg, ${cyan}, ${green})`, borderRadius: 2 }}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {Node(tx('nodeA'), 'A', step >= 2, green)}
          {Node(tx('nodeB'), 'B', step >= 2, cyan)}
          {Node(tx('nodeC'), 'C', step >= 1, cyan)}
        </div>
      </div>

      {/* Conversation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'flex-end' }}>
        <Appear show={step >= 1} className="demo-bubble demo-bubble-in">
          <div style={{ fontSize: '0.56rem', color: cyan, fontWeight: 700, marginBottom: 2 }}>{tx('inSender')}</div>
          {tx('inText')}
        </Appear>

        <div style={{ position: 'relative', minHeight: 34, alignSelf: 'flex-end', width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
          {/* Typing indicator → reply crossfade */}
          <Appear show={step === 3} style={{ position: 'absolute', right: 0, bottom: 0 }}>
            <div className="demo-bubble demo-bubble-out" style={{ display: 'inline-flex', gap: 4, padding: '10px 12px' }} aria-label="…">
              <span className="demo-typing-dot" /><span className="demo-typing-dot" /><span className="demo-typing-dot" />
            </div>
          </Appear>
          <Appear show={step >= 4} style={{ position: 'relative' }}>
            <div className="demo-bubble demo-bubble-out">
              <div style={{ fontSize: '0.56rem', color: green, fontWeight: 700, marginBottom: 2 }}>{tx('replySender')}</div>
              {tx('replyText')}
            </div>
          </Appear>
        </div>

        <Appear show={step >= 5} className="demo-chip" style={{ borderColor: 'rgba(0,245,155,0.3)', color: green, background: 'rgba(0,245,155,0.08)' }}>
          <Send size={11} aria-hidden /> {tx('confirm')}
        </Appear>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- Honeypot */

const HONEYPOT_STEPS = [360, 360, 360, 360, 460, 520] as const;
const PIN = ['9', '9', '4', '1'];

export const HoneypotScene: React.FC<SceneProps> = ({ lang }) => {
  const reduce = useReducedMotion() ?? false;
  const step = useSceneSteps(HONEYPOT_STEPS, reduce);
  const p = scenes.honeypot.phone;
  const tx = (k: keyof typeof p) => p[k][lang];
  const green = '#00f59b';
  const unlocked = step >= 5;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 14, position: 'relative' }}>
      {/* Unlock flash (one-shot CSS) */}
      {unlocked && <div className="demo-flash" aria-hidden style={{ background: green }} />}

      <motion.div
        aria-hidden
        initial={false}
        animate={{
          backgroundColor: unlocked ? 'rgba(0,245,155,0.16)' : 'rgba(255,255,255,0.05)',
          color: unlocked ? green : 'var(--text-muted)',
          transform: unlocked ? 'scale(1)' : 'scale(0.96)',
        }}
        transition={{ duration: 0.4, ease: EASE_OUT }}
        style={{ width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {unlocked ? <LockOpen size={26} /> : <Lock size={26} />}
      </motion.div>

      <div>
        <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 3 }}>{tx('title')}</div>
        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{tx('sub')}</div>
      </div>

      {/* PIN dots */}
      <div style={{ display: 'flex', gap: 12 }} aria-hidden>
        {PIN.map((d, i) => {
          const filled = step >= i + 1;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{
                borderColor: filled ? green : 'rgba(255,255,255,0.2)',
                backgroundColor: filled ? 'rgba(0,245,155,0.12)' : 'transparent',
                color: filled ? green : 'transparent',
                transform: filled ? 'scale(1)' : 'scale(0.82)',
              }}
              transition={{ duration: 0.22, ease: EASE_OUT }}
              style={{ width: 30, height: 34, borderRadius: 9, border: '1.5px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.95rem' }}
            >
              {d}
            </motion.div>
          );
        })}
      </div>

      {/* Decoy profile panel */}
      <Appear show={step >= 6} style={{ width: '100%' }}>
        <div style={{ background: '#101a17', border: '1px solid rgba(0,245,155,0.25)', padding: '11px 13px', borderRadius: 12, textAlign: 'left', fontSize: '0.68rem' }}>
          <div style={{ color: green, fontWeight: 700, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <ShieldCheck size={14} aria-hidden /> {tx('unlocked')}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--text-muted)', marginBottom: 3 }}>
            <span>{tx('line1')}</span>
            <b style={{ color: green }}><CountUp to={14} active={step >= 6} duration={0.8} /></b>
          </div>
          <div style={{ color: 'var(--text-muted)', marginBottom: 3 }}>{tx('line2')}</div>
          <div style={{ color: 'var(--text-muted)' }}>{tx('line3')}</div>
        </div>
      </Appear>
    </div>
  );
};

/* -------------------------------------------------------------- Mediasort */

const MEDIA_STEPS = [420, 1100] as const;
const FILES = [
  { id: 'video', name: 'Video_Archive_4K.mp4', size: 96.5, Icon: Film, descKey: 'file1' as const },
  { id: 'voice', name: 'Voice_Podcast_HQ.ogg', size: 34.2, Icon: Mic, descKey: 'file2' as const },
  { id: 'zip', name: 'Project_Backup.zip', size: 18.1, Icon: FileArchive, descKey: 'file3' as const },
  { id: 'photo', name: 'Photo_2026_RAW.dng', size: 8.4, Icon: ImageIcon, descKey: 'file4' as const },
];
const UNSORTED = ['voice', 'video', 'photo', 'zip'];
const SORTED = ['video', 'voice', 'zip', 'photo'];
const MAX_SIZE = 96.5;

export const MediaSortScene: React.FC<SceneProps> = ({ lang }) => {
  const reduce = useReducedMotion() ?? false;
  const step = useSceneSteps(MEDIA_STEPS, reduce);
  const p = scenes.mediasort.phone;
  const tx = (k: keyof typeof p) => p[k][lang];
  const cyan = '#00b4d8';
  const sorted = step >= 2;
  const order = sorted ? SORTED : UNSORTED;
  const rows = order.map((id) => FILES.find((f) => f.id === id)!);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{tx('header')}</span>
        <motion.span
          key={sorted ? 'sorted' : 'sorting'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: DURATION.ui, ease: EASE_OUT }}
          style={{ fontSize: '0.64rem', color: cyan, fontWeight: 700 }}
        >
          {sorted ? tx('sorted') : tx('sorting')}
        </motion.span>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((f) => {
          const pct = Math.max(0.08, f.size / MAX_SIZE);
          return (
            <motion.div
              key={f.id}
              layout
              transition={SPRING.snappy}
              style={{ background: '#161c28', padding: '8px 10px', borderRadius: 10 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 0 }}>
                  <f.Icon size={15} color={cyan} aria-hidden style={{ flexShrink: 0 }} />
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                    <div style={{ fontSize: '0.6rem', color: 'var(--text-dim)' }}>{p[f.descKey][lang]}</div>
                  </div>
                </div>
                <span className="badge-pill badge-gram" style={{ fontSize: '0.62rem', padding: '2px 7px', flexShrink: 0 }}>{f.size.toFixed(1)} {lang === 'en' ? 'MB' : 'МБ'}</span>
              </div>
              <div aria-hidden style={{ marginTop: 6, height: 3, borderRadius: 3, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <motion.div
                  initial={false}
                  animate={{ transform: step >= 1 ? `scaleX(${pct})` : 'scaleX(0)' }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE_OUT }}
                  style={{ height: '100%', transformOrigin: 'left', borderRadius: 3, background: `linear-gradient(90deg, ${cyan}, #00f59b)` }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ Ghost */

const GHOST_STEPS = [600, 750, 650] as const;

export const GhostScene: React.FC<SceneProps> = ({ lang }) => {
  const reduce = useReducedMotion() ?? false;
  const step = useSceneSteps(GHOST_STEPS, reduce);
  const p = scenes.ghost.phone;
  const tx = (k: keyof typeof p) => p[k][lang];
  const magenta = '#ff007f';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 12, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontWeight: 700, fontSize: '0.78rem', color: magenta }}>{tx('header')}</span>
        <div className="animate-float" aria-hidden style={{ color: magenta }}>
          <Ghost size={22} />
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
        {/* Seen receipt struck through */}
        <div className="demo-bubble demo-bubble-in" style={{ alignSelf: 'flex-start' }}>
          <div style={{ fontSize: '0.74rem' }}>Story · Reels</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4, fontSize: '0.6rem' }}>
            <span style={{ color: 'var(--text-dim)', textDecoration: step >= 1 ? 'line-through' : 'none', transition: 'color 0.3s ease' }}>{tx('seenBefore')}</span>
            <Appear show={step >= 1} y={4} style={{ display: 'inline-flex' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: magenta, fontWeight: 700 }}>
                <EyeOff size={11} aria-hidden /> {tx('seenAfter')}
              </span>
            </Appear>
          </div>
        </div>

        {/* Deleted message preserved */}
        <Appear show={step >= 2} y={10} style={{ position: 'relative' }}>
          <div style={{ background: '#251728', border: '1px solid rgba(255,0,127,0.3)', padding: 11, borderRadius: 12, position: 'relative', overflow: 'hidden' }}>
            {step === 2 && <div className="demo-flash" aria-hidden style={{ background: magenta, borderRadius: 12 }} />}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.62rem', color: '#ff5c8a', fontWeight: 700, marginBottom: 4 }}>
              <AlertTriangle size={12} aria-hidden /> {tx('deletedTag')}
            </div>
            <div style={{ fontSize: '0.74rem' }}>{tx('deletedText')}</div>
            <Appear show={step >= 3} y={4} style={{ marginTop: 6 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.58rem', color: magenta, fontWeight: 700 }}>
                <ShieldCheck size={11} aria-hidden /> {tx('preserved')}
              </span>
            </Appear>
          </div>
        </Appear>

        <Appear show={step >= 3} className="demo-chip" style={{ borderColor: 'rgba(255,0,127,0.3)', color: magenta, background: 'rgba(255,0,127,0.08)' }}>
          <Ghost size={12} aria-hidden /> {tx('ghost')}
        </Appear>
      </div>
    </div>
  );
};

/* --------------------------------------------------------------- ViewOnce */

const VIEWONCE_STEPS = [320, 900, 620] as const;

export const ViewOnceScene: React.FC<SceneProps> = ({ lang }) => {
  const reduce = useReducedMotion() ?? false;
  const step = useSceneSteps(VIEWONCE_STEPS, reduce);
  const p = scenes.viewonce.phone;
  const tx = (k: keyof typeof p) => p[k][lang];
  const magenta = '#ff007f';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 14 }}>
      <div aria-hidden style={{ width: '100%', height: 128, borderRadius: 14, background: 'linear-gradient(135deg, #2a0f20 0%, #1a1326 100%)', border: '1px solid rgba(255,0,127,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,0,127,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: magenta }}>
          <Eye size={24} />
        </div>
        <div style={{ position: 'absolute', bottom: 8, right: 10, fontSize: '0.58rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-mono)' }}>1×</div>
      </div>

      <div>
        <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: 4 }}>{tx('title')}</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {tx('views')}: <b style={{ color: magenta }}><CountUp to={24} from={1} active={step >= 1} duration={1} /></b>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 9, width: '100%' }}>
        <Appear show={step >= 2} y={6}>
          <div style={{ padding: '7px 12px', background: '#1f1322', borderRadius: 9, fontSize: '0.66rem', color: magenta, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, border: '1px solid rgba(255,0,127,0.25)' }}>
            <ShieldCheck size={13} aria-hidden /> {tx('flag')}
          </div>
        </Appear>
        <div aria-hidden className={step >= 3 ? 'demo-save-pulse' : undefined} style={{ padding: '9px 14px', background: 'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)', borderRadius: 9, color: '#fff', fontSize: '0.72rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}>
          <Save size={14} /> {tx('save')}
        </div>
        <div style={{ fontSize: '0.58rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5 }}>
          <Check size={11} aria-hidden color={magenta} /> {tx('note')}
        </div>
      </div>
    </div>
  );
};
