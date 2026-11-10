import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Language } from '../types';
import { Link, useSite } from './context';
import { heroFrames } from './heroFrames';
import { MemberCard } from './parts';
import { sectionHref } from './router';

/*
 * The home hero — a «curtain» (owner, 10.11, after a screen recording of an agency site).
 *
 * A pinned stage holds the same content twice: the real one on paper (h1, buttons — what screen
 * readers, taps and Tab get) and a light copy (aria-hidden) on a dark «leather» panel with a phone that
 * flips through sandbox screens. Scrolling lifts the panel from the bottom: --p goes 0 → 1 over the
 * spacer's height, so every letter changes colour exactly at the panel's edge. The panel is cut by
 * moving it up while its content moves down by the same amount — transforms only, no repaint.
 * Both copies have the same markup and styles, so they line up to the pixel.
 */

/** Title font size as a share of the title column width, per language: the longest line fills ~92 %. */
const FIT: Record<Language, number> = { ru: 0.158, uz: 0.133, en: 0.151 };
const BRANDS = /(Google|Meta|Telegram)/;
const OPENING_QUOTE = /^[«“"„']/;
const FRAME_MS = 1100;

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const saveData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/** The phone on the panel: stacked screens shown one after another (hard cuts, like a flipbook), with a
 *  pause button next to it (moving content must be stoppable). */
function HeroPhone() {
  const { lang, t } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const userPaused = useRef(false);
  const [running, setRunning] = useState<boolean | null>(null); // null = not flipping (still picture)
  const all = heroFrames(lang);
  const frames = all.length > 1 && saveData() ? all.slice(0, 1) : all;

  useEffect(() => {
    const el = box.current;
    if (!el) return undefined;
    const imgs = [...el.querySelectorAll<HTMLImageElement>('.hero-shot')];
    const n = imgs.length;
    if (n < 2 || reducedMotion() || typeof imgs[0].animate !== 'function') return undefined;
    let alive = true;
    let visible = true;
    const sync = () => {
      const play = visible && !userPaused.current;
      for (const a of anims.current) {
        if (play) a.play();
        else a.pause();
      }
    };
    // Flip only while the phone is on screen (the panel lifted away or scrolled past = paused).
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    // Start once every picture is decoded, so a frame never flashes empty.
    Promise.all(imgs.map((img) => img.decode().catch(() => undefined))).then(() => {
      if (!alive) return;
      anims.current = imgs.map((img, i) =>
        img.animate(
          [
            { opacity: 1, easing: 'step-end' },
            { opacity: 0, offset: 1 / n, easing: 'step-end' },
            { opacity: 0 },
          ],
          { duration: n * FRAME_MS, delay: (i - n) * FRAME_MS, iterations: Infinity },
        ),
      );
      sync();
      setRunning(!userPaused.current);
      io.observe(el);
    });
    return () => {
      alive = false;
      io.disconnect();
      for (const a of anims.current) a.cancel();
      anims.current = [];
    };
  }, []);

  const toggle = () => {
    userPaused.current = !userPaused.current;
    for (const a of anims.current) {
      if (userPaused.current) a.pause();
      else a.play();
    }
    setRunning(!userPaused.current);
  };

  return (
    <div className="hero-phone-slot">
      <div className="hero-phone" ref={box}>
        <div className="hero-screen">
          {frames.map((f, i) => (
            <img
              key={f.id}
              className="hero-shot"
              src={f.src}
              srcSet={f.srcSet}
              sizes="(min-width: 960px) 320px, 64vw"
              alt=""
              decoding="async"
              fetchPriority={i === 0 ? 'high' : 'low'}
              draggable={false}
            />
          ))}
        </div>
        {running !== null && (
          <button type="button" className="hero-pause" onClick={toggle} aria-label={running ? t.hero.pause : t.hero.play}>
            {running ? <Pause size={15} strokeWidth={2} aria-hidden="true" /> : <Play size={15} strokeWidth={2} aria-hidden="true" />}
          </button>
        )}
      </div>
    </div>
  );
}

/** The two club cards — on paper, on wide screens only (where the phone stood on the panel). */
function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-card hero-card--back">
        <MemberCard app="andusta" num={2} />
      </div>
      <div className="hero-card hero-card--front">
        <MemberCard app="andogram" num={1} />
      </div>
    </div>
  );
}

/** A title line; an opening quote hangs in the margin. */
const line = (text: string): ReactNode =>
  OPENING_QUOTE.test(text) ? (
    <>
      <span className="hero-hang">{text[0]}</span>
      {text.slice(1)}
    </>
  ) : (
    text
  );

/** One copy of the hero content. `panel` = the light copy (text aria-hidden, nothing to tap) + the phone. */
function HeroCopy({ panel }: { panel?: boolean }) {
  const { t, lang, openAccess } = useSite();
  const h = t.hero;
  const [l1, l2, l3, l4] = h.title;
  const title = (
    <>
      <span className="hero-line">{line(l1)}</span> <span className="hero-line">{line(l2)}</span>{' '}
      <span className="hero-line">{line(l3)}</span> <em className="hero-line">{line(l4)}</em>
    </>
  );
  const hidden = panel ? true : undefined;
  return (
    <div className="wrap hero-in">
      <p className="kicker hero-kicker" aria-hidden={hidden}>
        {h.kicker}
      </p>
      <div className="hero-title-box" aria-hidden={hidden}>
        {panel ? (
          <div className="hero-title">{title}</div>
        ) : (
          <h1 className="hero-title" id="hero-title">
            {title}
          </h1>
        )}
      </div>
      <div className="hero-rest" aria-hidden={hidden}>
        <p className="hero-lead">{h.lead.split(BRANDS).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</p>
        <div className="hero-actions">
          {panel ? (
            <>
              <span className="btn btn--primary btn--lg">{h.cta}</span>
              <span className="btn btn--outline btn--lg">{h.ctaDemo}</span>
            </>
          ) : (
            <>
              <button type="button" className="btn btn--primary btn--lg" onClick={() => openAccess()}>
                {h.cta}
              </button>
              <Link to={sectionHref('demos')} className="btn btn--outline btn--lg">
                {h.ctaDemo}
              </Link>
            </>
          )}
        </div>
        <ul className="trust">
          {h.trust.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      {panel ? <HeroPhone key={lang} /> : <HeroArt />}
    </div>
  );
}

/** Scroll → --p on the stage (0 = curtain down, 1 = lifted) and `is-lifted` on the section. */
function useCurtain(section: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = section.current;
    const stage = el?.querySelector<HTMLElement>('.hero-stage');
    const spacer = el?.querySelector<HTMLElement>('.hero-spacer');
    if (!el || !stage || !spacer) return undefined;
    let docTop = 0;
    let stick = 0;
    let lift = 1;
    let last = -1;
    let raf = 0;
    const measure = () => {
      docTop = el.getBoundingClientRect().top + window.scrollY;
      stick = parseFloat(getComputedStyle(stage).top) || 0;
      lift = Math.max(1, spacer.offsetHeight);
    };
    const update = () => {
      raf = 0;
      const p = Math.round(Math.min(1, Math.max(0, (window.scrollY + stick - docTop) / lift)) * 10000) / 10000;
      if (p === last) return;
      last = p;
      stage.style.setProperty('--p', String(p));
      el.classList.toggle('is-lifted', p >= 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      last = -1;
      onScroll();
    };
    // Tab to a button that sits below the screen while the stage is pinned (low window, 200 % zoom):
    // the browser's own scroll doesn't move a pinned stage, so go to the end of the lift and on.
    const onFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !stage.contains(target)) return;
      requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        const limit = window.innerHeight - 12;
        const pinEnd = docTop - stick + lift;
        if (r.bottom <= limit || window.scrollY >= pinEnd) return;
        window.scrollTo(0, pinEnd + (r.bottom - limit));
      });
    };
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    stage.addEventListener('focusin', onFocusIn);
    const ro = new ResizeObserver(onResize);
    ro.observe(el);
    let alive = true;
    document.fonts?.ready.then(() => alive && onResize());
    return () => {
      alive = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      stage.removeEventListener('focusin', onFocusIn);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [section]);
}

export function Hero() {
  const { lang } = useSite();
  const ref = useRef<HTMLElement>(null);
  useCurtain(ref);
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title" style={{ '--fit': FIT[lang] } as CSSProperties}>
      <div className="hero-stage">
        <div className="hero-paper">
          <HeroCopy />
        </div>
        <div className="hero-panel">
          <div className="hero-panel-in">
            <HeroCopy panel />
          </div>
        </div>
        <div className="hero-hem" aria-hidden="true" />
      </div>
      <div className="hero-spacer" aria-hidden="true" />
    </section>
  );
}
