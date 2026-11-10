import type { Language } from '../../types';
import type { Step } from './ghostStoriesFlow';
import type { Caption } from './igCopy';

/*
 * Texts of the «Невидимка в историях» sandbox, 3 languages (its page:
 * demoPages.ts; the shared Instagram / Andusta texts: igCopy.ts). Liza 💔 is
 * the ex from AndoGram's bridge (owner, 2026-11-03).
 */

export interface GhostStoriesCopy {
  captions: { home: Caption; t: Caption; a: Caption; liza: Caption };
  /** Liza's story. */
  story: string;
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  /** Over the dimmed screen after try 1; «Andusta» on a line of its own. */
  line: string;
  /** The outro; starts with «Andusta» on a line of its own. No full stops (owner). */
  tagline: string;
  start: Caption;
  screenLabel: string;
}

const RU: GhostStoriesCopy = {
  captions: {
    home: { title: 'Твой телефон', sub: 'Instagram и Andusta' },
    t: { title: 'Попытка 1 · Instagram', sub: 'Обычный Instagram' },
    a: { title: 'Попытка 2 · Andusta', sub: 'Режим невидимки' },
    liza: { title: 'Телефон Лизы · Instagram', sub: 'Что видит она' },
  },
  story: 'Новая жизнь ✨',
  hints: {
    tHome: 'Открой Instagram',
    tFeed: 'Лиза выложила историю. Посмотри',
    lStory: 'Посмотрим, кто смотрел',
    lViewers: 'Лиза видит, что ты смотрел',
    aHome: 'Теперь открой Andusta',
    aFeed: 'Сначала включи невидимку: нажми ⚡',
    aMenu: 'Включи «Невидимку в Stories и Моментальных снимках»',
    aMenuOn: 'Нажми «Готово»',
    aFeed2: 'Теперь смотри историю Лизы',
    lStory2: 'Посмотрим, кто смотрел',
    lViewers2: 'Тебя в списке нет',
  },
  buttons: { lViewers: 'Дальше' },
  line: 'Лиза всё видит 😳\nТеперь попробуй в\nAndusta',
  tagline: 'Andusta\nТы смотришь,\nа в списке тебя нет',
  start: { title: 'Невидимка в историях', sub: '1 минута. Ничего устанавливать не нужно' },
  screenLabel: 'Демо Andusta: невидимка в историях',
};

const UZ: GhostStoriesCopy = {
  captions: {
    home: { title: 'Telefoning', sub: 'Instagram va Andusta' },
    t: { title: '1-urinish · Instagram', sub: 'Oddiy Instagram' },
    a: { title: '2-urinish · Andusta', sub: 'Arvoh rejimi' },
    liza: { title: 'Sabinaning telefoni · Instagram', sub: 'U nimani ko‘radi' },
  },
  story: 'Yangi hayot ✨',
  hints: {
    tHome: 'Instagram’ni och',
    tFeed: 'Sabina hikoya joyladi. Ochib ko‘r',
    lStory: 'Kim ko‘rganini ko‘ramiz',
    lViewers: 'Sabina ko‘rganingni biladi',
    aHome: 'Endi Andusta’ni och',
    aFeed: 'Avval ko‘rinmaslikni yoq: ⚡ ni bos',
    aMenu: '«Stories va tezkor suratlarda ko‘rinmaslik»ni yoq',
    aMenuOn: '«Tayyor»ni bos',
    aFeed2: 'Endi Sabinaning hikoyasini ko‘r',
    lStory2: 'Kim ko‘rganini ko‘ramiz',
    lViewers2: 'Ro‘yxatda sen yo‘qsan',
  },
  buttons: { lViewers: 'Davom etish' },
  line: 'U hammasini ko‘radi 😳\nEndi buni sinab ko‘r\nAndusta’da',
  tagline: 'Andusta\nSen ko‘rasan,\nro‘yxatda esa yo‘qsan',
  start: { title: 'Hikoyalarda ko‘rinmaslik', sub: '1 daqiqa. Hech narsa o‘rnatish shart emas' },
  screenLabel: 'Andusta demosi: hikoyalarda ko‘rinmaslik',
};

const EN: GhostStoriesCopy = {
  captions: {
    home: { title: 'Your phone', sub: 'Instagram and Andusta' },
    t: { title: 'Try 1 · Instagram', sub: 'Regular Instagram' },
    a: { title: 'Try 2 · Andusta', sub: 'Ghost mode' },
    liza: { title: 'Molly’s phone · Instagram', sub: 'What she sees' },
  },
  story: 'New life ✨',
  hints: {
    tHome: 'Open Instagram',
    tFeed: 'Molly posted a story. Watch it',
    lStory: 'Let’s see who watched',
    lViewers: 'Molly sees that you watched',
    aHome: 'Now open Andusta',
    aFeed: 'First turn on ghost mode: tap ⚡',
    aMenu: 'Turn on “Ghost mode in Stories and Quick Snaps”',
    aMenuOn: 'Tap “Done”',
    aFeed2: 'Now watch Molly’s story',
    lStory2: 'Let’s see who watched',
    lViewers2: 'You’re not on the list',
  },
  buttons: { lViewers: 'Next' },
  line: 'Molly sees it all 😳\nNow try it in\nAndusta',
  tagline: 'Andusta\nYou watch,\nyou’re not on the list',
  start: { title: 'Ghost mode in stories', sub: '1 minute. Nothing to install' },
  screenLabel: 'Andusta demo: ghost mode in stories',
};

const COPY: Record<Language, GhostStoriesCopy> = { ru: RU, uz: UZ, en: EN };

export const getGhostStoriesCopy = (lang: Language): GhostStoriesCopy => COPY[lang];
