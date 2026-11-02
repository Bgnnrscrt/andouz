import type { Language } from '../../types';
import type { AppKey, Step } from './noForwardsFlow';

/*
 * Texts of the No-Forwards bypass sandbox, in 3 languages (its page: demoPages.ts).
 * The channel «Уроки харизмы» / «Xarizma darslari» / «Charisma Lessons» forbids
 * saving and forwarding. The AndoGram part never mentions it (owner: saving
 * just works); only Telegram's toast and the tagline do.
 */

/** A chat in the list (AndoGram and Telegram show the same list). */
export interface ListSeed {
  id: string;
  name: string;
  kind: 'channel' | 'group';
  /** Sender of the last message in a group: «Мама: …». */
  from?: string;
  preview: string;
  time: string;
  color: string;
  unread?: number;
  muted?: boolean;
}

/** A channel post: its text (or a media caption), time and views. */
export interface PostCopy {
  text: string;
  time: string;
  views: string;
}

export interface NoForwardsCopy {
  phones: Record<AppKey, { title: string; sub: string }>;
  channel: {
    name: string;
    subs: string;
    /** The channel's bottom bar (a subscriber can't write here). */
    footer: string;
    /** Its last post in the chat list. */
    preview: string;
  };
  posts: {
    text: PostCopy;
    photo: PostCopy;
    /** The newest post: the video lesson the visitor saves. */
    video: PostCopy & { duration: string };
  };
  /** The other chats in the list, under the channel. */
  chats: ListSeed[];
  /** The post's context menu (Telegram keeps only `link` and `report`). */
  menu: { forward: string; gallery: string; saved: string; link: string; report: string };
  toast: { saved: string; restricted: string };
  ui: {
    today: string;
    back: string;
    /** aria-label of the post's menu. */
    menuLabel: string;
    /** aria-label of the free strip beside the video post (it opens the menu). */
    sideLabel: string;
  };
  hints: Partial<Record<Step, string>>;
  /** Typed big over the dimmed screen after try 1; \n breaks the line. */
  shrug: string;
  /** The final tagline over the dimmed screen («AndoGram» is typed in green). */
  tagline: string;
  /** The start screen (its button and the end buttons: commonCopy.ts). */
  start: { title: string; sub: string };
  screenLabel: string;
}

const RU: NoForwardsCopy = {
  phones: {
    a: { title: 'Попытка 1 · AndoGram', sub: 'Твой телефон' },
    t: { title: 'Попытка 2 · Telegram', sub: 'Официальное приложение' },
  },
  channel: {
    name: 'Уроки харизмы',
    subs: '48\u00a0230 подписчиков',
    footer: 'Выключить звук',
    preview: '🎬 Урок 8. Голос: как говорить, чтобы слушали',
  },
  posts: {
    text: {
      text: 'Домашнее задание: 5 минут у зеркала каждый день. Держи взгляд и не спеши 🙂',
      time: '16:40',
      views: '14,9K',
    },
    photo: { text: 'Урок 7. Взгляд, который держит паузу 👁', time: '17:05', views: '12,4K' },
    video: { text: 'Урок 8. Голос: как говорить, чтобы слушали 🎙', time: '18:20', views: '9,8K', duration: '12:48' },
  },
  chats: [
    { id: 'football', name: 'Футбол 24/7 ⚽', kind: 'channel', preview: 'Гол на 90+3! Видео внутри', time: '18:02', color: '#7bc862', unread: 41, muted: true },
    { id: 'jobs', name: 'IT-вакансии Ташкент', kind: 'channel', preview: 'Frontend-разработчик, от 15 млн сум', time: '17:45', color: '#65aadd', unread: 7, muted: true },
    { id: 'cooking', name: 'Кулинария за 15 минут 🍝', kind: 'channel', preview: '📷 Паста с курицей и грибами', time: '16:30', color: '#ee7aae', unread: 1 },
    { id: 'english', name: 'Курс английского B2', kind: 'group', from: 'Учитель', preview: 'Домашка на четверг — эссе', time: '15:10', color: '#6ec9cb' },
    { id: 'family', name: 'Семья 👨‍👩‍👧', kind: 'group', from: 'Мама', preview: 'Не забудьте про субботу ❤️', time: '14:52', color: '#faa774', unread: 3 },
  ],
  menu: {
    forward: 'Переслать',
    gallery: 'Сохранить в галерею',
    saved: 'Сохранить в «Избранное»',
    link: 'Копировать ссылку',
    report: 'Пожаловаться',
  },
  toast: {
    saved: 'Видео сохранено в «Избранное»',
    restricted: 'Копирование и пересылка из этого канала запрещены',
  },
  ui: {
    today: 'Сегодня',
    back: 'Назад',
    menuLabel: 'Действия с постом',
    sideLabel: 'Открыть меню поста',
  },
  hints: {
    aList: 'Открой канал «Уроки харизмы»',
    aChannel: 'Нажми сбоку от видео',
    aMenu: 'Сохрани видео в «Избранное»',
    tList: 'Теперь то же самое в официальном Telegram. Открой «Уроки харизмы»',
    tChannel: 'Нажми сбоку от видео',
  },
  // No-break spaces keep the emoji with its words.
  shrug: 'И что такого?\u00a0😅\nПопробуй заново, смелее',
  // A no-break space keeps the dash off the start of a line.
  // Owner, 2026-11-02: «Другие решили…» in exactly two lines, then «AndoGram» alone, then the
  // rules. «Телефон», not «смартфон»: as people say it («мой дом — мои правила»), and shorter.
  tagline: 'Другие решили за тебя,\nчто можно, а что нельзя.\nAndoGram.\nТвой телефон\u00a0—\nтвои правила.',
  start: {
    title: 'Обход No-Forwards',
    sub: '1 минута. Ничего устанавливать не нужно',
  },
  screenLabel: 'Демо AndoGram: обход No-Forwards',
};

const UZ: NoForwardsCopy = {
  phones: {
    a: { title: '1-urinish · AndoGram', sub: 'Telefoningiz' },
    t: { title: '2-urinish · Telegram', sub: 'Rasmiy ilova' },
  },
  channel: {
    name: 'Xarizma darslari',
    subs: '48\u00a0230 obunachi',
    footer: 'Ovozsiz',
    preview: '🎬 8-dars. Ovoz: tinglashlari uchun qanday gapirish kerak',
  },
  posts: {
    text: {
      text: 'Uy vazifasi: har kuni oyna oldida 5 daqiqa. Nigohingizni ushlab turing, shoshilmang 🙂',
      time: '16:40',
      views: '14,9K',
    },
    photo: { text: '7-dars. Pauzani ushlab turadigan nigoh 👁', time: '17:05', views: '12,4K' },
    video: { text: '8-dars. Ovoz: tinglashlari uchun qanday gapirish kerak 🎙', time: '18:20', views: '9,8K', duration: '12:48' },
  },
  chats: [
    { id: 'football', name: 'Futbol 24/7 ⚽', kind: 'channel', preview: '90+3-daqiqada gol! Video ichkarida', time: '18:02', color: '#7bc862', unread: 41, muted: true },
    { id: 'jobs', name: 'IT-vakansiyalar Toshkent', kind: 'channel', preview: 'Frontend-dasturchi, 15 mln so‘mdan', time: '17:45', color: '#65aadd', unread: 7, muted: true },
    { id: 'cooking', name: '15 daqiqada oshxona 🍝', kind: 'channel', preview: '📷 Tovuq va qo‘ziqorinli pasta', time: '16:30', color: '#ee7aae', unread: 1 },
    { id: 'english', name: 'Ingliz tili B2 kursi', kind: 'group', from: 'O‘qituvchi', preview: 'Payshanbaga uy vazifasi — insho', time: '15:10', color: '#6ec9cb' },
    { id: 'family', name: 'Oila 👨‍👩‍👧', kind: 'group', from: 'Onam', preview: 'Shanbani unutmanglar ❤️', time: '14:52', color: '#faa774', unread: 3 },
  ],
  menu: {
    forward: 'Uzatish',
    gallery: 'Galereyaga saqlash',
    // Short, like the app's «В Избранное»: «… saqlash» didn't fit a 360px phone.
    saved: 'Saqlangan xabarlarga',
    link: 'Havolani nusxalash',
    report: 'Shikoyat qilish',
  },
  toast: {
    saved: 'Video «Saqlangan xabarlar»ga saqlandi',
    restricted: 'Bu kanaldan nusxalash va uzatish taqiqlangan',
  },
  ui: {
    today: 'Bugun',
    back: 'Orqaga',
    menuLabel: 'Post amallari',
    sideLabel: 'Post menyusini ochish',
  },
  hints: {
    aList: '«Xarizma darslari» kanalini oching',
    aChannel: 'Video yonidagi bo‘sh joyga bosing',
    aMenu: 'Videoni «Saqlangan xabarlar»ga saqlang',
    tList: 'Endi xuddi shuni rasmiy Telegram’da qiling. «Xarizma darslari»ni oching',
    tChannel: 'Video yonidagi bo‘sh joyga bosing',
  },
  shrug: 'Xo‘sh, nima bo‘pti?\u00a0😅\nQaytadan urinib ko‘ring, dadilroq',
  tagline: 'Nima mumkinligini\nboshqalar hal qilgan.\nAndoGram.\nTelefon sizniki\u00a0—\nqoidalar ham sizniki.',
  start: {
    title: 'No-Forwards’ni chetlab o‘tish',
    sub: '1 daqiqa. Hech narsa o‘rnatish shart emas',
  },
  screenLabel: 'AndoGram demosi: No-Forwards’ni chetlab o‘tish',
};

const EN: NoForwardsCopy = {
  phones: {
    a: { title: 'Try 1 · AndoGram', sub: 'Your phone' },
    t: { title: 'Try 2 · Telegram', sub: 'The official app' },
  },
  channel: {
    name: 'Charisma Lessons',
    subs: '48,230 subscribers',
    footer: 'Mute',
    preview: '🎬 Lesson 8. Voice: how to speak so people listen',
  },
  posts: {
    text: {
      text: 'Homework: 5 minutes at the mirror every day. Hold your gaze and don’t rush 🙂',
      time: '16:40',
      views: '14.9K',
    },
    photo: { text: 'Lesson 7. A gaze that holds the pause 👁', time: '17:05', views: '12.4K' },
    video: { text: 'Lesson 8. Voice: how to speak so people listen 🎙', time: '18:20', views: '9.8K', duration: '12:48' },
  },
  chats: [
    { id: 'football', name: 'Football 24/7 ⚽', kind: 'channel', preview: 'Goal at 90+3! Video inside', time: '18:02', color: '#7bc862', unread: 41, muted: true },
    { id: 'jobs', name: 'Tashkent IT Jobs', kind: 'channel', preview: 'Frontend developer, from 15M sum', time: '17:45', color: '#65aadd', unread: 7, muted: true },
    { id: 'cooking', name: '15-Minute Kitchen 🍝', kind: 'channel', preview: '📷 Chicken and mushroom pasta', time: '16:30', color: '#ee7aae', unread: 1 },
    { id: 'english', name: 'English B2 Course', kind: 'group', from: 'Teacher', preview: 'Thursday homework — an essay', time: '15:10', color: '#6ec9cb' },
    { id: 'family', name: 'Family 👨‍👩‍👧', kind: 'group', from: 'Mom', preview: 'Don’t forget about Saturday ❤️', time: '14:52', color: '#faa774', unread: 3 },
  ],
  menu: {
    forward: 'Forward',
    gallery: 'Save to Gallery',
    saved: 'Save to Saved Messages',
    link: 'Copy Link',
    report: 'Report',
  },
  toast: {
    saved: 'Video saved to Saved Messages',
    restricted: 'Copying and forwarding from this channel is restricted',
  },
  ui: {
    today: 'Today',
    back: 'Back',
    menuLabel: 'Post actions',
    sideLabel: 'Open the post menu',
  },
  hints: {
    aList: 'Open the “Charisma Lessons” channel',
    aChannel: 'Tap next to the video',
    aMenu: 'Save the video to Saved Messages',
    tList: 'Now the same in the official Telegram. Open “Charisma Lessons”',
    tChannel: 'Tap next to the video',
  },
  shrug: 'So what’s the big deal?\u00a0😅\nTry it again, go on',
  tagline: 'Others decided for you\nwhat you can and can’t do.\nAndoGram.\nYour phone, your rules.',
  start: {
    title: 'No-Forwards bypass',
    sub: '1 minute. Nothing to install',
  },
  screenLabel: 'AndoGram demo: No-Forwards bypass',
};

const COPY: Record<Language, NoForwardsCopy> = { ru: RU, uz: UZ, en: EN };

export const getNoForwardsCopy = (lang: Language): NoForwardsCopy => COPY[lang];
