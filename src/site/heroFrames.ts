import type { Language } from '../types';

/*
 * Pictures for the phone on the hero curtain (Hero.tsx): still screens of our «Проверь сам»
 * sandboxes, one set per language — `src/assets/hero/<lang>/<id>-<width>.webp`, widths 360 / 540 / 720.
 * Temporary: the owner has not chosen the final pictures yet (10.11). Remake them with the capture
 * script in /root/Apps/andouz-e2e/hero-frames/ (see its README).
 */

const FILES = import.meta.glob<string>('../assets/hero/*/*.webp', {
  eager: true,
  import: 'default',
  query: '?no-inline',
});

/** The order the phone flips through; the first one is also the still picture (reduced motion, data saver). */
export const HERO_FRAME_ORDER = ['ar-mask', 'nf-blocked', 'nf-menu', 'bridge-deleted', 'hp-pin', 'hp-accounts'] as const;
const WIDTHS = [360, 540, 720];

export interface HeroFrame {
  id: string;
  src: string;
  srcSet: string;
}

const cache = new Map<Language, HeroFrame[]>();

const pick = (lang: Language): HeroFrame[] =>
  HERO_FRAME_ORDER.flatMap((id) => {
    const urls = WIDTHS.map((w) => [w, FILES[`../assets/hero/${lang}/${id}-${w}.webp`]] as const).filter(([, url]) => url);
    if (!urls.length) return [];
    return [{ id, src: urls[Math.min(1, urls.length - 1)][1], srcSet: urls.map(([w, url]) => `${url} ${w}w`).join(', ') }];
  });

/** Frames for a language (falls back to the Russian set if a language has none). */
export function heroFrames(lang: Language): HeroFrame[] {
  let frames = cache.get(lang);
  if (!frames) {
    frames = pick(lang);
    if (!frames.length && lang !== 'ru') frames = pick('ru');
    cache.set(lang, frames);
  }
  return frames;
}
