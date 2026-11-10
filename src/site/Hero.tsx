import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type RefObject } from 'react';
import { Pause, Play } from 'lucide-react';
import type { Language } from '../types';
import { Link, useSite } from './context';
import { heroFrames } from './heroFrames';
import { MemberCard } from './parts';
import { sectionHref } from './router';

/*
 * The home hero — a «curtain», as in the owner's reference video (10.11).
 *
 * First screen: a dark «leather» curtain with the phone pictures on top and the headline at the bottom.
 * Scrolling: the headline goes up together with the curtain until it is in the middle of the screen and
 * stops there; the curtain goes on up, and its bottom edge repaints the letters on its way (light on the
 * curtain, dark on the paper); when the curtain is gone the headline holds a moment and then the page
 * scrolls on — the text and the buttons come up under it.
 *
 * The stage is pinned for the spacer's height; useCurtain turns the scroll position into transforms:
 * --m moves the curtain (1:1 with the scroll), --y the headline (1:1 until the middle, then 0). The headline
 * exists twice with the same markup — the real one on paper and a light copy (aria-hidden) inside the
 * curtain — so the curtain's edge cuts the letters exactly and both copies line up to the pixel.
 */

/** Title font size as a share of the title column width, per language: the longest line fills ~92 %. */
const FIT: Record<Language, number> = { ru: 0.158, uz: 0.133, en: 0.151 };
const BRANDS = /(Google|Meta|Telegram)/;
const OPENING_QUOTE = /^[«“"„']/;
const FRAME_MS = 1100;

const reducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
const saveData = () => (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;

/** The phone on the curtain: stacked screens shown one after another (hard cuts, like a flipbook), with a
 *  pause button next to it (moving content must be stoppable). */
function HeroPhone() {
  const { lang, t } = useSite();
  const box = useRef<HTMLDivElement>(null);
  const anims = useRef<Animation[]>([]);
  const userPaused = useRef(false);
  const [running, setRunning] = useState<boolean | null>(null); // null = not flipping (a still picture)
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
    // Flip only while the phone is on screen (the curtain gone or scrolled past = paused).
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
    <div className="hero-phone" ref={box}>
      <div className="hero-screen">
        {frames.map((f, i) => (
          <img
            key={f.id}
            className="hero-shot"
            src={f.src}
            srcSet={f.srcSet}
            sizes="(min-width: 960px) 320px, 56vw"
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
  );
}

/** The three club cards as a fanned stack — after the curtain, on wide screens only. */
function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-card hero-card--back">
        <MemberCard app="andeo" num={3} />
      </div>
      <div className="hero-card hero-card--mid">
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

/** Kicker + the 4-line title. `copy` = the light copy inside the curtain (aria-hidden, no h1). */
function HeroHead({ copy }: { copy?: boolean }) {
  const { t } = useSite();
  const h = t.hero;
  const [l1, l2, l3, l4] = h.title;
  const title = (
    <>
      <span className="hero-line">{line(l1)}</span> <span className="hero-line">{line(l2)}</span>{' '}
      <span className="hero-line">{line(l3)}</span> <em className="hero-line">{line(l4)}</em>
    </>
  );
  return (
    <div className="wrap hero-head" aria-hidden={copy ? true : undefined}>
      <p className="kicker hero-kicker">{h.kicker}</p>
      <div className="hero-title-box">
        {copy ? (
          <div className="hero-title">{title}</div>
        ) : (
          <h1 className="hero-title" id="hero-title">
            {title}
          </h1>
        )}
      </div>
    </div>
  );
}

/**
 * Scroll → the stage's custom properties: --m (curtain offset, px), --y (headline offset, px), --hem (edge
 * opacity); `is-lifted` on the section once the curtain is gone.
 */
function useCurtain(section: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = section.current;
    const pin = el?.querySelector<HTMLElement>('.hero-pin');
    const stage = el?.querySelector<HTMLElement>('.hero-stage');
    const spacer = el?.querySelector<HTMLElement>('.hero-spacer');
    const head = el?.querySelector<HTMLElement>('.hero-paper .hero-head');
    if (!el || !pin || !stage || !spacer || !head) return undefined;
    let docTop = 0;
    let stick = 0;
    let H = 1; // stage height = how far the curtain travels
    let L = 1; // pinned scroll length (curtain + a short hold)
    let rise = 0; // how far the headline travels before it stops in the middle
    let lastS = -1;
    let raf = 0;
    const measure = () => {
      docTop = pin.getBoundingClientRect().top + window.scrollY;
      stick = parseFloat(getComputedStyle(stage).top) || 0;
      H = Math.max(1, stage.offsetHeight);
      L = Math.max(H, spacer.offsetHeight);
      // the headline's place at the start (bottom of the screen) → its place in the middle
      rise = Math.max(0, head.offsetTop - (H - head.offsetHeight) / 2);
    };
    const update = () => {
      raf = 0;
      const s = Math.min(L, Math.max(0, window.scrollY + stick - docTop));
      if (s === lastS) return;
      lastS = s;
      const m = -Math.min(s, H);
      const y = -Math.min(s, rise);
      stage.style.setProperty('--m', `${m}px`);
      stage.style.setProperty('--y', `${y}px`);
      stage.style.setProperty('--hem', String(Math.min(1, Math.max(0, (H + m) / (0.08 * H)))));
      el.classList.toggle('is-lifted', s >= H);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      lastS = -1;
      onScroll();
    };
    measure();
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    const ro = new ResizeObserver(onResize);
    ro.observe(stage);
    ro.observe(head);
    let alive = true;
    document.fonts?.ready.then(() => alive && onResize());
    return () => {
      alive = false;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [section]);
}

export function Hero() {
  const { t, lang, openAccess } = useSite();
  const h = t.hero;
  const ref = useRef<HTMLElement>(null);
  useCurtain(ref);
  return (
    <section ref={ref} className="hero" aria-labelledby="hero-title" style={{ '--fit': FIT[lang] } as CSSProperties}>
      <div className="hero-pin">
        <div className="hero-stage">
          <div className="hero-layer hero-paper">
            <div className="hero-room" />
            <HeroHead />
          </div>
          <div className="hero-layer hero-media">
            <div className="hero-room">
              <HeroPhone key={lang} />
            </div>
            <HeroHead copy />
          </div>
          <div className="hero-hem" aria-hidden="true" />
        </div>
        <div className="hero-spacer" aria-hidden="true" />
      </div>
      <div className="wrap hero-after">
        <div className="hero-rest">
          <p className="hero-lead">{h.lead.split(BRANDS).map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : part))}</p>
          <div className="hero-actions">
            <button type="button" className="btn btn--primary btn--lg" onClick={() => openAccess()}>
              {h.cta}
            </button>
            <Link to={sectionHref('demos')} className="btn btn--outline btn--lg">
              {h.ctaDemo}
            </Link>
          </div>
          <ul className="trust">
            {h.trust.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <HeroArt />
      </div>
    </section>
  );
}
