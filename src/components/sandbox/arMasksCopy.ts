import type { Language } from '../../types';
import type { AppKey, Step } from './arMasksFlow';
import type { HomeAppId } from './HomeUi';

/*
 * Texts of the 3D AR masks sandbox, in 3 languages (its page: demoPages.ts).
 * The friend is Макс / Baxa / Alex (owner, 2026-11-02). Mask names follow
 * the app's own list («Маска Гуля» and the rest); only the Ghoul mask can be
 * tried in the demo.
 */

export interface Caption {
  title: string;
  sub: string;
}

/** The masks under the circle, in the row's order. */
export const MASK_IDS = ['none', 'forest', 'noir', 'ghoul', 'beard', 'fawkes', 'glitter'] as const;
export type MaskId = (typeof MASK_IDS)[number];

/** A chat of the list besides the friend. */
export interface ArSeed {
  id: string;
  name: string;
  preview: string;
  /** The sender, shown before the preview (groups). */
  from?: string;
  time: string;
  color: string;
  unread?: number;
  muted?: boolean;
  saved?: boolean;
  kind?: 'group';
}

export interface ArMasksCopy {
  home: { date: string; apps: Record<HomeAppId, string> };
  captions: { home: Caption } & Record<AppKey, Caption>;
  friend: string;
  /** The friend's message in the chat: he asks for a video message. */
  incoming: string;
  chats: ArSeed[];
  ui: {
    online: string;
    message: string;
    today: string;
    back: string;
    /** aria-label of the camera button (record a video message). */
    record: string;
    cancel: string;
    /** aria-label of the masks row. */
    masks: string;
  };
  masks: Record<MaskId, string>;
  /** A locked mask was tapped. */
  locked: string;
  hints: Partial<Record<Step, string>>;
  /** Over the dimmed screen after try 1; «AndoGram» on a line of its own. */
  line: string;
  /** The outro; starts with «AndoGram» on a line of its own. */
  tagline: string;
  /** Decimal separator of the recording timer (0:05,2 / 0:05.2). */
  decimal: string;
  start: Caption;
  screenLabel: string;
}

const RU: ArMasksCopy = {
  home: {
    date: 'Воскресенье, 1 ноября',
    apps: {
      gallery: 'Галерея',
      clock: 'Часы',
      weather: 'Погода',
      settings: 'Настройки',
      phone: 'Телефон',
      messages: 'Сообщения',
      browser: 'Браузер',
      camera: 'Камера',
    },
  },
  captions: {
    home: { title: 'Твой телефон', sub: 'Telegram и AndoGram' },
    t: { title: 'Попытка 1 · Telegram', sub: 'Обычный кружок' },
    a: { title: 'Попытка 2 · AndoGram', sub: 'Кружок с AR-маской' },
  },
  friend: 'Макс',
  incoming: 'Как ты там? Запиши кружок 😄',
  chats: [
    { id: 'mom', name: 'Мама', preview: 'Позвони, как освободишься ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'football', name: 'Футбол ⚽', from: 'Тимур', preview: 'Завтра в 8, не опаздываем', time: '16:05', color: '#65aadd', unread: 4, muted: true, kind: 'group' },
    { id: 'saved', name: 'Избранное', preview: '📎 Резюме.pdf', time: 'пт', color: '#65aadd', saved: true },
  ],
  ui: {
    online: 'в сети',
    message: 'Сообщение',
    today: 'Сегодня',
    back: 'Назад',
    record: 'Записать видеосообщение',
    cancel: 'ОТМЕНА',
    masks: 'Маски',
  },
  masks: {
    none: 'Без маски',
    forest: 'Forest',
    noir: 'Нуар',
    ghoul: 'Маска Гуля',
    beard: 'Борода и усы',
    fawkes: 'Маска Гая Фокса',
    glitter: 'Блеск',
  },
  locked: 'Чтобы примерить эту маску, купи AndoGram',
  hints: {
    tHome: 'Открой Telegram',
    tList: 'Открой чат с Максом',
    tChat: 'Запиши кружок: нажми на камеру',
    aHome: 'Теперь открой AndoGram',
    aList: 'Снова чат с Максом',
    aChat: 'Запиши кружок',
    aRec: 'Выбери «Маску Гуля»',
    aMask: 'Маска сидит как настоящая и двигается вместе с лицом. Остальные — в полной версии',
  },
  line: 'Теперь попробуй в\nAndoGram',
  tagline: 'AndoGram\nОбычное приложение,\nнеобычные возможности',
  decimal: ',',
  start: { title: '3D AR-маски', sub: '1 минута. Ничего устанавливать не нужно' },
  screenLabel: 'Демо AndoGram: 3D AR-маски в кружках',
};

const UZ: ArMasksCopy = {
  home: {
    date: 'Yakshanba, 1-noyabr',
    apps: {
      gallery: 'Galereya',
      clock: 'Soat',
      weather: 'Ob-havo',
      settings: 'Sozlamalar',
      phone: 'Telefon',
      messages: 'Xabarlar',
      browser: 'Brauzer',
      camera: 'Kamera',
    },
  },
  captions: {
    home: { title: 'Telefoningiz', sub: 'Telegram va AndoGram' },
    t: { title: '1-urinish · Telegram', sub: 'Oddiy dumaloq video' },
    a: { title: '2-urinish · AndoGram', sub: 'AR-niqobli dumaloq video' },
  },
  friend: 'Baxa',
  incoming: 'Qalaysan? Dumaloq video yubor 😄',
  chats: [
    { id: 'mom', name: 'Onam', preview: 'Bo‘shaganingda qo‘ng‘iroq qil ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'football', name: 'Futbol ⚽', from: 'Temur', preview: 'Ertaga soat 8 da, kechikmaymiz', time: '16:05', color: '#65aadd', unread: 4, muted: true, kind: 'group' },
    { id: 'saved', name: 'Saqlangan xabarlar', preview: '📎 Rezyume.pdf', time: 'Ju', color: '#65aadd', saved: true },
  ],
  ui: {
    online: 'tarmoqda',
    message: 'Xabar',
    today: 'Bugun',
    back: 'Orqaga',
    record: 'Video xabar yozish',
    cancel: 'BEKOR QILISH',
    masks: 'Niqoblar',
  },
  masks: {
    none: 'Niqobsiz',
    forest: 'Forest',
    noir: 'Nuar',
    ghoul: 'Ghoul niqobi',
    beard: 'Soqol va mo‘ylov',
    fawkes: 'Gay Foks niqobi',
    glitter: 'Yaltiroq',
  },
  locked: 'Bu niqobni sinab ko‘rish uchun AndoGram’ni sotib oling',
  hints: {
    tHome: 'Telegram’ni oching',
    tList: 'Baxa bilan chatni oching',
    tChat: 'Dumaloq video yozing: kamerani bosing',
    aHome: 'Endi AndoGram’ni oching',
    aList: 'Yana Baxa bilan chat',
    aChat: 'Dumaloq video yozing',
    aRec: '«Ghoul niqobi»ni tanlang',
    aMask: 'Niqob haqiqiydek turibdi va yuz bilan birga harakatlanadi. Qolganlari — to‘liq versiyada',
  },
  line: 'Endi buni sinab ko‘ring\nAndoGram’da',
  tagline: 'AndoGram\nOddiy ilova,\nnoodatiy imkoniyatlar',
  decimal: ',',
  start: { title: '3D AR-niqoblar', sub: '1 daqiqa. Hech narsa o‘rnatish shart emas' },
  screenLabel: 'AndoGram demosi: dumaloq videolarda 3D AR-niqoblar',
};

const EN: ArMasksCopy = {
  home: {
    date: 'Sunday, November 1',
    apps: {
      gallery: 'Gallery',
      clock: 'Clock',
      weather: 'Weather',
      settings: 'Settings',
      phone: 'Phone',
      messages: 'Messages',
      browser: 'Browser',
      camera: 'Camera',
    },
  },
  captions: {
    home: { title: 'Your phone', sub: 'Telegram and AndoGram' },
    t: { title: 'Try 1 · Telegram', sub: 'A plain video message' },
    a: { title: 'Try 2 · AndoGram', sub: 'A video message with an AR mask' },
  },
  friend: 'Alex',
  incoming: 'How are you? Send me a video message 😄',
  chats: [
    { id: 'mom', name: 'Mom', preview: 'Call me when you’re free ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'football', name: 'Football ⚽', from: 'Tim', preview: 'Tomorrow at 8, don’t be late', time: '16:05', color: '#65aadd', unread: 4, muted: true, kind: 'group' },
    { id: 'saved', name: 'Saved Messages', preview: '📎 Resume.pdf', time: 'Fri', color: '#65aadd', saved: true },
  ],
  ui: {
    online: 'online',
    message: 'Message',
    today: 'Today',
    back: 'Back',
    record: 'Record a video message',
    cancel: 'CANCEL',
    masks: 'Masks',
  },
  masks: {
    none: 'No mask',
    forest: 'Forest',
    noir: 'Noir',
    ghoul: 'Ghoul Mask',
    beard: 'Beard & Mustache',
    fawkes: 'Guy Fawkes Mask',
    glitter: 'Glitter',
  },
  locked: 'Buy AndoGram to try this mask on',
  hints: {
    tHome: 'Open Telegram',
    tList: 'Open the chat with Alex',
    tChat: 'Record a video message: tap the camera',
    aHome: 'Now open AndoGram',
    aList: 'The chat with Alex again',
    aChat: 'Record a video message',
    aRec: 'Pick the “Ghoul Mask”',
    aMask: 'The mask sits like a real one and moves with the face. The rest come with the full version',
  },
  line: 'Now try it in\nAndoGram',
  tagline: 'AndoGram\nAn ordinary app,\nextraordinary features',
  decimal: '.',
  start: { title: '3D AR masks', sub: '1 minute. Nothing to install' },
  screenLabel: 'AndoGram demo: 3D AR masks in video messages',
};

const COPY: Record<Language, ArMasksCopy> = { ru: RU, uz: UZ, en: EN };

export const getArMasksCopy = (lang: Language): ArMasksCopy => COPY[lang];
