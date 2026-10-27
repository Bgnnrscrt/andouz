import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

/*
 * "Data constellation" behind the hero: brand-coloured particles drift slowly and link up
 * when they come close; on desktop the pointer gently pushes them aside and grabs a few links.
 *
 * Cost control:
 * - particle count scales with the hero's area and is lower on touch / coarse pointers;
 * - devicePixelRatio is capped at 2, touch devices render at 30fps;
 * - the loop only runs while the canvas is on screen and the tab is visible;
 * - it starts after first paint (idle callback), so it never competes with LCP;
 * - prefers-reduced-motion gets one static frame and no loop.
 */

type RGB = readonly [number, number, number];

const COLORS: readonly RGB[] = [
  [0, 245, 155], // ANDO green
  [0, 180, 216], // AndoGram cyan
  [255, 0, 127], // Andusta magenta
  [245, 158, 11], // Telegram Stars amber
];
/** Cumulative pick weights for COLORS: green dominates, amber is a rare accent. */
const WEIGHTS = [0.54, 0.8, 0.93, 1];

const ALPHA_LEVELS = 4;
const LINK_ALPHA = 0.2;
const POINTER_ALPHA = 0.34;
const POINTER_RADIUS = 150;
const POINTER_PUSH = 16;

interface Particle {
  /** Drifting base position (CSS px). */
  x: number;
  y: number;
  /** Velocity in px per second. */
  vx: number;
  vy: number;
  /** Eased pointer displacement. */
  ox: number;
  oy: number;
  r: number;
  c: number;
  /** Twinkle speed and phase. */
  tw: number;
  ph: number;
}

const pickColor = () => {
  const v = Math.random();
  const i = WEIGHTS.findIndex((w) => v <= w);
  return i < 0 ? 0 : i;
};

function makeParticle(w: number, h: number, speed: number): Particle {
  const angle = Math.random() * Math.PI * 2;
  const s = speed * (0.35 + Math.random() * 0.65);
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: Math.cos(angle) * s,
    vy: Math.sin(angle) * s,
    ox: 0,
    oy: 0,
    r: 0.7 + Math.random() * 1.2,
    c: pickColor(),
    tw: 0.35 + Math.random() * 0.8,
    ph: Math.random() * Math.PI * 2,
  };
}

/** Pre-rendered soft glow per colour: one drawImage per particle instead of gradients or shadowBlur. */
function makeSprite([r, g, b]: RGB, dpr: number): HTMLCanvasElement {
  const size = Math.ceil(32 * dpr);
  const sprite = document.createElement('canvas');
  sprite.width = size;
  sprite.height = size;
  const sctx = sprite.getContext('2d');
  if (!sctx) return sprite;
  const half = size / 2;
  const grad = sctx.createRadialGradient(half, half, 0, half, half, half);
  grad.addColorStop(0, `rgba(${r},${g},${b},1)`);
  grad.addColorStop(0.16, `rgba(${r},${g},${b},0.8)`);
  grad.addColorStop(0.4, `rgba(${r},${g},${b},0.16)`);
  grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
  sctx.fillStyle = grad;
  sctx.fillRect(0, 0, size, size);
  return sprite;
}

interface ConstellationProps {
  className?: string;
}

export const Constellation: React.FC<ConstellationProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const lowPower = !finePointer;
    const frameGap = lowPower ? 1000 / 30 - 2 : 0;
    const linkDist = lowPower ? 104 : 132;
    const speed = lowPower ? 9 : 12;

    let w = 0;
    let h = 0;
    let dpr = 0;
    let sprites: HTMLCanvasElement[] = [];
    const particles: Particle[] = [];
    // Line segments grouped by colour x alpha level, so each group is stroked once per frame.
    const buckets: number[][] = Array.from({ length: COLORS.length * ALPHA_LEVELS }, () => []);
    const pointerBucket: number[][] = Array.from({ length: ALPHA_LEVELS }, () => []);
    const pointer = { cx: 0, cy: 0, x: 0, y: 0, active: false, strength: 0 };

    let raf = 0;
    let last = 0;
    let lastDraw = 0;
    let elapsed = 0;
    let inView = true;
    let started = false;
    let running = false;

    const targetCount = () => {
      const density = lowPower ? 17000 : 10500;
      const [min, max] = lowPower ? [16, 40] : [34, 96];
      return Math.round(Math.min(max, Math.max(min, (w * h) / density)));
    };

    const resize = () => {
      const nw = host.clientWidth;
      const nh = host.clientHeight;
      const ndpr = Math.min(window.devicePixelRatio || 1, 2);
      if (nw === 0 || nh === 0) return;
      if (ndpr !== dpr) {
        dpr = ndpr;
        sprites = COLORS.map((c) => makeSprite(c, dpr));
      }
      w = nw;
      h = nh;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = targetCount();
      while (particles.length < target) particles.push(makeParticle(w, h, speed));
      if (particles.length > target) particles.length = target;
      for (const p of particles) {
        if (p.x > w) p.x = Math.random() * w;
        if (p.y > h) p.y = Math.random() * h;
      }
      // Resizing clears the bitmap: repaint right away so a paused or static canvas never sits empty.
      if (started) draw(0);
    };

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, w, h);
      const margin = 24;

      // Pointer: eased position and an eased strength so links fade in and out instead of popping.
      if (dt > 0) {
        const want = pointer.active ? 1 : 0;
        pointer.strength += (want - pointer.strength) * Math.min(1, dt * 4);
        pointer.x += (pointer.cx - pointer.x) * Math.min(1, dt * 12);
        pointer.y += (pointer.cy - pointer.y) * Math.min(1, dt * 12);
      }
      const pStrength = pointer.strength;
      const ease = Math.min(1, dt * 5);

      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.x < -margin) p.x = w + margin;
        else if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        else if (p.y > h + margin) p.y = -margin;

        let tx = 0;
        let ty = 0;
        if (pStrength > 0.01) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const d = Math.hypot(dx, dy);
          if (d < POINTER_RADIUS && d > 0.001) {
            const f = (1 - d / POINTER_RADIUS) ** 2 * POINTER_PUSH * pStrength;
            tx = (dx / d) * f;
            ty = (dy / d) * f;
          }
        }
        p.ox += (tx - p.ox) * ease;
        p.oy += (ty - p.oy) * ease;
      }

      for (const b of buckets) b.length = 0;
      for (const b of pointerBucket) b.length = 0;

      const linkSq = linkDist * linkDist;
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        const ax = a.x + a.ox;
        const ay = a.y + a.oy;
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const bx = b.x + b.ox;
          const by = b.y + b.oy;
          const dx = ax - bx;
          const dy = ay - by;
          const dSq = dx * dx + dy * dy;
          if (dSq > linkSq) continue;
          const k = 1 - Math.sqrt(dSq) / linkDist;
          const level = Math.min(ALPHA_LEVELS - 1, Math.floor(k * ALPHA_LEVELS));
          buckets[Math.min(a.c, b.c) * ALPHA_LEVELS + level].push(ax, ay, bx, by);
        }
        if (pStrength > 0.01) {
          const d = Math.hypot(ax - pointer.x, ay - pointer.y);
          if (d < POINTER_RADIUS) {
            const level = Math.min(ALPHA_LEVELS - 1, Math.floor((1 - d / POINTER_RADIUS) * ALPHA_LEVELS));
            pointerBucket[level].push(pointer.x, pointer.y, ax, ay);
          }
        }
      }

      ctx.lineWidth = 1;
      ctx.globalCompositeOperation = 'source-over';
      const strokeBucket = (seg: number[], [r, g, b]: RGB, alpha: number) => {
        if (seg.length === 0) return;
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.beginPath();
        for (let s = 0; s < seg.length; s += 4) {
          ctx.moveTo(seg[s], seg[s + 1]);
          ctx.lineTo(seg[s + 2], seg[s + 3]);
        }
        ctx.stroke();
      };
      buckets.forEach((seg, idx) => {
        const level = idx % ALPHA_LEVELS;
        strokeBucket(seg, COLORS[(idx / ALPHA_LEVELS) | 0], ((level + 1) / ALPHA_LEVELS) * LINK_ALPHA);
      });
      pointerBucket.forEach((seg, level) => {
        strokeBucket(seg, COLORS[0], ((level + 1) / ALPHA_LEVELS) * POINTER_ALPHA * pStrength);
      });

      // Additive glow sprites read as light, not paint.
      ctx.globalCompositeOperation = 'lighter';
      for (const p of particles) {
        const twinkle = 0.62 + 0.38 * Math.sin(elapsed * p.tw + p.ph);
        const size = p.r * 5;
        ctx.globalAlpha = twinkle * 0.9;
        ctx.drawImage(sprites[p.c], p.x + p.ox - size, p.y + p.oy - size, size * 2, size * 2);
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    };

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (lastDraw && now - lastDraw < frameGap) return;
      lastDraw = now;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      elapsed += dt;
      draw(dt);
    };

    const sync = () => {
      const shouldRun = started && !reduce && inView && !document.hidden;
      if (shouldRun && !running) {
        running = true;
        last = 0;
        lastDraw = 0;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (inside && !pointer.active && pointer.strength < 0.01) {
        // Re-entering: start the eased pointer where the cursor is, not where it left.
        pointer.x = x;
        pointer.y = y;
      }
      pointer.cx = x;
      pointer.cy = y;
      pointer.active = inside;
    };
    const onPointerOut = (e: PointerEvent) => {
      if (!e.relatedTarget) pointer.active = false;
    };
    const onBlur = () => {
      pointer.active = false;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);
    document.addEventListener('visibilitychange', sync);
    if (finePointer && !reduce) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerout', onPointerOut);
      window.addEventListener('blur', onBlur);
    }

    // Start after first paint so the hero text and LCP never wait on the canvas.
    const begin = () => {
      started = true;
      resize();
      canvas.dataset.ready = 'true';
      sync();
    };
    let idleId = 0;
    let timeoutId = 0;
    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(begin, { timeout: 1200 });
    } else {
      timeoutId = window.setTimeout(begin, 350);
    }

    return () => {
      if (idleId) window.cancelIdleCallback(idleId);
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(raf);
      running = false;
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerout', onPointerOut);
      window.removeEventListener('blur', onBlur);
    };
  }, [reduce]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
};
