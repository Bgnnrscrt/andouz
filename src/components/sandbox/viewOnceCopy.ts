import type { Language } from '../../types';
import type { Caption } from './igCopy';
import type { Step } from './viewOnceFlow';

/*
 * Texts of the «Одноразовые фото» sandbox, 3 languages (its page:
 * demoPages.ts; shared Instagram / Andusta texts: igCopy.ts). Timur is the
 * friend who sends the view-once photo of his new sneakers.
 */

export interface ViewOnceCopy {
  captions: { home: Caption; t: Caption; a: Caption };
  /** Timur's message before the photo. */
  message: string;
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  line: string;
  tagline: string;
  start: Caption;
  screenLabel: string;
}

const RU: ViewOnceCopy = {
  captions: {
    home: { title: 'Твой телефон', sub: 'Instagram и Andusta' },
    t: { title: 'Попытка 1 · Instagram', sub: 'Обычный Instagram' },
    a: { title: 'Попытка 2 · Andusta', sub: 'Одноразовые фото' },
  },
  message: 'Смотри быстро, это одноразовое 😂',
  hints: {
    tHome: 'Открой Instagram',
    tFeed: 'Тимур что-то прислал. Открой',
    tChat: 'Открой фото',
    tChatSeen: 'Хочешь ещё раз? Нажми',
    tNope: 'Одноразовое — больше не открыть',
    aHome: 'Теперь открой Andusta',
    aFeed: 'Тимур прислал фото. Открой',
    aChat: 'Открой фото',
    aChatAgain: 'Открой ещё раз',
    aKept: 'Одноразовое фото открывается снова',
  },
  buttons: { tNope: 'Дальше' },
  line: 'Один раз — и всё 😅\nТеперь попробуй в\nAndusta',
  tagline: 'Andusta\nПосмотрел раз —\nпосмотри ещё',
  start: { title: 'Одноразовые фото', sub: '1 минута. Ничего устанавливать не нужно' },
  screenLabel: 'Демо Andusta: одноразовые фото',
};

const UZ: ViewOnceCopy = {
  captions: {
    home: { title: 'Telefoning', sub: 'Instagram va Andusta' },
    t: { title: '1-urinish · Instagram', sub: 'Oddiy Instagram' },
    a: { title: '2-urinish · Andusta', sub: 'Bir martalik rasmlar' },
  },
  message: 'Tez ko‘r, bu bir martalik 😂',
  hints: {
    tHome: 'Instagram’ni och',
    tFeed: 'Timur nimadir yubordi. Ochib ko‘r',
    tChat: 'Rasmni och',
    tChatSeen: 'Yana ko‘rmoqchimisan? Bosib ko‘r',
    tNope: 'Bir martalik — boshqa ochilmaydi',
    aHome: 'Endi Andusta’ni och',
    aFeed: 'Timur rasm yubordi. Ochib ko‘r',
    aChat: 'Rasmni och',
    aChatAgain: 'Rasmni yana och',
    aKept: 'Bir martalik rasm yana ochiladi',
  },
  buttons: { tNope: 'Davom etish' },
  line: 'Bir marta — tamom 😅\nEndi buni sinab ko‘r\nAndusta’da',
  tagline: 'Andusta\nBir ko‘rdingmi —\nyana ko‘r',
  start: { title: 'Bir martalik rasmlar', sub: '1 daqiqa. Hech narsa o‘rnatish shart emas' },
  screenLabel: 'Andusta demosi: bir martalik rasmlar',
};

const EN: ViewOnceCopy = {
  captions: {
    home: { title: 'Your phone', sub: 'Instagram and Andusta' },
    t: { title: 'Try 1 · Instagram', sub: 'Regular Instagram' },
    a: { title: 'Try 2 · Andusta', sub: 'View-once photos' },
  },
  message: 'Quick, it’s view once 😂',
  hints: {
    tHome: 'Open Instagram',
    tFeed: 'Tim sent something. Open it',
    tChat: 'Open the photo',
    tChatSeen: 'Want another look? Tap it',
    tNope: 'View once — it won’t open again',
    aHome: 'Now open Andusta',
    aFeed: 'Tim sent a photo. Open it',
    aChat: 'Open the photo',
    aChatAgain: 'Open it again',
    aKept: 'The view-once photo opens again',
  },
  buttons: { tNope: 'Next' },
  line: 'Once and it’s gone 😅\nNow try it in\nAndusta',
  tagline: 'Andusta\nSeen it once?\nSee it again',
  start: { title: 'View-once photos', sub: '1 minute. Nothing to install' },
  screenLabel: 'Andusta demo: view-once photos',
};

const COPY: Record<Language, ViewOnceCopy> = { ru: RU, uz: UZ, en: EN };

export const getViewOnceCopy = (lang: Language): ViewOnceCopy => COPY[lang];
