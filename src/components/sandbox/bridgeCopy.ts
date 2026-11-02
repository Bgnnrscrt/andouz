import type { Language } from '../../types';
import type { PhoneId, Step } from './bridgeFlow';

/*
 * All text of the A-B-C bridge sandbox, in 3 languages (its page: demoPages.ts).
 * Names (owner's choice 2026-11-01): you = Максим / Aziz / Max,
 * friend = Даниль / Sanjar / Alex, ex = Лиза💔 / Sabina💔 / Molly💔.
 * Archive cards follow the format of the current AndoGram code
 * (ArchiveNamingHelper); the app itself writes them in Russian only,
 * the demo shows them in the visitor's language.
 */

export interface ChatSeed {
  id: string;
  name: string;
  preview: string;
  time: string;
  color: string;
  unread?: number;
  muted?: boolean;
  /** «Избранное» — bookmark avatar instead of initials. */
  saved?: boolean;
}

export interface BridgeCopy {
  me: string;
  friend: string;
  /** Her message arrives during the tagline and is deleted a moment later. */
  ex: string;
  phones: Record<PhoneId, { title: string; sub: string }>;
  ui: {
    message: string;
    sendMessage: string;
    edited: string;
    typing: string;
    online: string;
    you: string;
    yesterday: string;
    today: string;
    /** Weekday of yesterday's message in the chat list. */
    yesterdayShort: string;
    members: string;
    messages: (n: number) => string;
    archive: string;
    general: string;
    groupCreated: string;
    back: string;
  };
  msg: {
    old: string;
    /** The friend's long message: he edits only `was` → `now`, in its last line. */
    /**
     * The friend's long message: his edit silently changes `was` → `now` and
     * adds `more.word` on a new line at the end, so the bubble grows by a line
     * (owner, 2026-11-02). The «\n» after the colon in `head` keeps the last
     * line short and alone: the time fits beside it before the edit (so the new
     * line really adds one), and the changed word reflows nothing above it.
     */
    long: { head: string; was: string; now: string; tail: string; more: { sep: string; word: string } };
    /** Sent from phone 2: proves you saw the original. */
    tease: string;
    how: string;
    secret: string;
    ex: string;
  };
  card: {
    header: (name: string, time: string) => string;
    /** «Edited» card: this line, then «was» + old text, then «now» + new text. */
    editTitle: (name: string) => string;
    was: string;
    now: string;
    /** «Deleted» card: this line, then deleteBody. */
    deleteTitle: (name: string) => string;
    deleteBody: (text: string, sent: string, deleted: string) => string;
  };
  /** Other chats on phone 1 (AndoGram). The first two also get archive topics. */
  chatsA: ChatSeed[];
  /** Other chats on phone 2 (plain Telegram, second account). */
  chatsB: ChatSeed[];
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  /** Typed over the dimmed screen in the outro; starts with «AndoGram». */
  tagline: string;
  /** The start screen (its button and the end buttons: commonCopy.ts). */
  start: { title: string; sub: string };
  screenLabel: string;
}

const ruPlural = (n: number, one: string, few: string, many: string): string => {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
};

const RU: BridgeCopy = {
  me: 'Максим',
  friend: 'Даниль',
  ex: 'Лиза💔',
  phones: {
    a: { title: 'Телефон 1 · AndoGram', sub: 'Это ты — Максим' },
    b: { title: 'Телефон 2 · Telegram', sub: 'Твой второй аккаунт' },
  },
  ui: {
    message: 'Сообщение',
    sendMessage: 'Отправить сообщение',
    edited: 'изменено',
    typing: 'печатает',
    online: 'в сети',
    you: 'Вы',
    yesterday: 'Вчера',
    today: 'Сегодня',
    yesterdayShort: 'сб',
    members: '2 участника',
    messages: (n) => `${n} ${ruPlural(n, 'сообщение', 'сообщения', 'сообщений')}`,
    archive: 'Личный архив',
    general: 'General',
    groupCreated: 'Группа создана',
    back: 'Назад',
  },
  msg: {
    old: 'Окей, договорились 👍',
    long: {
      head: 'Слушай, спасибо тебе большое, что дал свои наушники в поездку на отпуск! С ними поездка на поезде была шикарной, и звук у твоих наушников просто огонь.\nТолько есть небольшая проблемка:\nя их ',
      was: 'утопил',
      now: 'потерял',
      tail: ', прости',
      more: { sep: '\n', word: 'пожалуйста' },
    },
    tease: 'Утопил, говоришь?😏',
    how: 'Как?! Я же сразу исправил 😳 Как ты успел прочитать??',
    secret: 'Я пользуюсь AndoGram 😎',
    ex: 'Я скучаю по тебе, прости меня',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    editTitle: (name) => `Пользователь ${name} изменил сообщение:`,
    was: 'Было:',
    now: 'Стало:',
    // Only Лиза deletes here, so «удалила». The app itself writes «удалил … Статус: удален» for everyone.
    deleteTitle: (name) => `Пользователь ${name} удалила сообщение:`,
    deleteBody: (text, sent, deleted) =>
      `Сообщение: ${text} • время отправки ${sent}\n\nСтатус: удалено, время удаления — ${deleted}`,
  },
  chatsA: [
    { id: 'mom', name: 'Мама', preview: 'Не забудь позвонить бабушке ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'sardor', name: 'Сардор', preview: 'Скинул фотки с поездки', time: '16:05', color: '#7bc862', unread: 2 },
    { id: 'work', name: 'Работа 💼', preview: 'Анна: Созвон завтра в 10:00', time: '15:47', color: '#e17076', unread: 12, muted: true },
    { id: 'saved', name: 'Избранное', preview: '📎 Документы.pdf', time: 'пт', color: '#65aadd', saved: true },
  ],
  chatsB: [
    { id: 'dilnoza', name: 'Дилноза', preview: 'Документы получила, спасибо', time: '17:58', color: '#6ec9cb' },
    { id: 'saved', name: 'Избранное', preview: '📎 Договор.pdf', time: 'чт', color: '#65aadd', saved: true },
  ],
  hints: {
    aOpenChat: 'Тебе пишет Даниль. Открой чат',
    aEdited: 'Даниль что-то исправил. Выйди из чата — посмотрим, что было',
    aArchiveIn: 'Появился «Личный архив». Открой его',
    aFriendTopic: 'Открой тему «Даниль»',
    aEditCard: 'AndoGram сохранил и оригинал, и правку. Этот архив видно и со второго телефона',
    bOpenArchive: 'Это второй телефон с обычным Telegram — AndoGram здесь не нужен. Твой второй аккаунт уже в группе. Открой «Личный архив»',
    bOpenTopic: 'Открой тему «Даниль»',
    bReply: 'Вот что он написал на самом деле. Подколи его',
    bSent: 'Ушло Данилю от твоего основного аккаунта',
    aBack: 'Твой ответ уже в чате с Данилем. Открой его',
    aSecret: 'Раскрой секрет',
    aSecretSent: 'Выйди из чата',
    aOpenArchive: 'Лиза💔 удалила сообщение. Хочешь прочитать, что там было? Открой «Личный архив»',
    aOpenTopic: 'Открой тему «Лиза💔»',
  },
  buttons: {
    aEditCard: 'Взять второй телефон',
    bSent: 'Вернуться на первый телефон',
  },
  // «AndoGram» on a line of its own (owner, 2026-11-02); the other breaks keep words from hanging alone.
  tagline: 'AndoGram.\nТебе говорили,\nчто это невозможно.\nМы покажем обратное.',
  start: {
    title: 'Мост A-B-C',
    sub: '1–2 минуты. Ничего устанавливать не нужно',
  },
  screenLabel: 'Демо AndoGram: мост A-B-C',
};

const UZ: BridgeCopy = {
  me: 'Aziz',
  friend: 'Sanjar',
  ex: 'Sabina💔',
  phones: {
    a: { title: '1-telefon · AndoGram', sub: 'Bu siz — Aziz' },
    b: { title: '2-telefon · Telegram', sub: 'Ikkinchi akkauntingiz' },
  },
  ui: {
    message: 'Xabar',
    sendMessage: 'Xabar yuborish',
    edited: 'tahrirlangan',
    typing: 'yozmoqda',
    online: 'onlayn',
    you: 'Siz',
    yesterday: 'Kecha',
    today: 'Bugun',
    yesterdayShort: 'Sh',
    members: '2 a’zo',
    messages: (n) => `${n} ta xabar`,
    archive: 'Shaxsiy arxiv',
    general: 'General',
    groupCreated: 'Guruh yaratildi',
    back: 'Orqaga',
  },
  msg: {
    old: 'Bo‘pti, kelishdik 👍',
    long: {
      head: 'Qara, ta’tilga quloqchinlaringni berib turganing uchun katta rahmat! Ular bilan poyezdda yo‘l zo‘r o‘tdi, ovozi esa bomba.\nFaqat bitta kichkina muammo bor:\nularni ',
      was: 'cho‘ktirdim',
      now: 'yo‘qotdim',
      tail: ', kechir',
      more: { sep: '\n', word: 'iltimos' },
    },
    tease: 'Cho‘ktirdim, deysanmi?😏',
    how: 'Qanaqasiga?! Darrov tuzatgandim-ku 😳 Qanday qilib o‘qib ulgurding??',
    secret: 'Men AndoGram ishlataman 😎',
    ex: 'Seni sog‘indim, meni kechir',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    editTitle: (name) => `Foydalanuvchi ${name} xabarni tahrirladi:`,
    was: 'Oldin:',
    now: 'Endi:',
    deleteTitle: (name) => `Foydalanuvchi ${name} xabarni o‘chirdi:`,
    deleteBody: (text, sent, deleted) =>
      `Xabar: ${text} • yuborilgan vaqti ${sent}\n\nHolati: o‘chirilgan, o‘chirilgan vaqti — ${deleted}`,
  },
  chatsA: [
    { id: 'mom', name: 'Onam', preview: 'Buvingga qo‘ng‘iroq qilishni unutma ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'sardor', name: 'Sardor', preview: 'Sayohat rasmlarini tashladim', time: '16:05', color: '#7bc862', unread: 2 },
    { id: 'work', name: 'Ish 💼', preview: 'Anna: Ertaga 10:00 da qo‘ng‘iroq', time: '15:47', color: '#e17076', unread: 12, muted: true },
    { id: 'saved', name: 'Saqlangan xabarlar', preview: '📎 Hujjatlar.pdf', time: 'Ju', color: '#65aadd', saved: true },
  ],
  chatsB: [
    { id: 'dilnoza', name: 'Dilnoza', preview: 'Hujjatlarni oldim, rahmat', time: '17:58', color: '#6ec9cb' },
    { id: 'saved', name: 'Saqlangan xabarlar', preview: '📎 Shartnoma.pdf', time: 'Pa', color: '#65aadd', saved: true },
  ],
  hints: {
    aOpenChat: 'Sizga Sanjar yozyapti. Chatni oching',
    aEdited: 'Sanjar nimanidir tuzatdi. Chatdan chiqing — avval nima yozganini ko‘ramiz',
    aArchiveIn: '«Shaxsiy arxiv» paydo bo‘ldi. Uni oching',
    aFriendTopic: '«Sanjar» mavzusini oching',
    aEditCard: 'AndoGram asl xabarni ham, tuzatishni ham saqladi. Bu arxiv ikkinchi telefonda ham ko‘rinadi',
    bOpenArchive: 'Bu oddiy Telegram o‘rnatilgan ikkinchi telefon — AndoGram shart emas. Ikkinchi akkauntingiz guruhda bor. «Shaxsiy arxiv»ni oching',
    bOpenTopic: '«Sanjar» mavzusini oching',
    bReply: 'Mana u aslida nima yozgan. Unga bir tegishib qo‘ying',
    bSent: 'Sanjarga asosiy akkauntingizdan ketdi',
    aBack: 'Javobingiz Sanjar bilan chatda turibdi. Chatni oching',
    aSecret: 'Sirni oshkor qiling',
    aSecretSent: 'Chatdan chiqing',
    aOpenArchive: 'Sabina💔 xabarini o‘chirib yubordi. Nima yozganini o‘qishni xohlaysizmi? «Shaxsiy arxiv»ni oching',
    aOpenTopic: '«Sabina💔» mavzusini oching',
  },
  buttons: {
    aEditCard: 'Ikkinchi telefonni olish',
    bSent: 'Birinchi telefonga qaytish',
  },
  tagline: 'AndoGram.\nSizga bu imkonsiz deyishgan.\nBiz esa aksini ko‘rsatamiz.',
  start: {
    title: 'A-B-C ko‘prigi',
    sub: '1–2 daqiqa. Hech narsa o‘rnatish shart emas',
  },
  screenLabel: 'AndoGram demosi: A-B-C ko‘prigi',
};

const EN: BridgeCopy = {
  me: 'Max',
  friend: 'Alex',
  ex: 'Molly💔',
  phones: {
    a: { title: 'Phone 1 · AndoGram', sub: 'This is you — Max' },
    b: { title: 'Phone 2 · Telegram', sub: 'Your second account' },
  },
  ui: {
    message: 'Message',
    sendMessage: 'Send message',
    edited: 'edited',
    typing: 'typing',
    online: 'online',
    you: 'You',
    yesterday: 'Yesterday',
    today: 'Today',
    yesterdayShort: 'Sat',
    members: '2 members',
    messages: (n) => `${n} message${n === 1 ? '' : 's'}`,
    archive: 'Personal archive',
    general: 'General',
    groupCreated: 'Group created',
    back: 'Back',
  },
  msg: {
    old: 'OK, deal 👍',
    long: {
      head: 'Hey, thanks so much for lending me your headphones for the vacation! The train ride was amazing with them, and the sound is pure fire.\nJust one small problem:\nI ',
      was: 'drowned',
      now: 'lost',
      tail: ' them, sorry',
      more: { sep: '\n', word: 'my bad' },
    },
    tease: 'Drowned them, huh?😏',
    how: 'What?! I fixed it right away 😳 How did you even read it??',
    secret: 'I use AndoGram 😎',
    ex: 'I miss you, please forgive me',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    editTitle: (name) => `User ${name} edited a message:`,
    was: 'Was:',
    now: 'Now:',
    deleteTitle: (name) => `User ${name} deleted a message:`,
    deleteBody: (text, sent, deleted) => `Message: ${text} • sent at ${sent}\n\nStatus: deleted, deleted at ${deleted}`,
  },
  chatsA: [
    { id: 'mom', name: 'Mom', preview: 'Don’t forget to call grandma ❤️', time: '17:20', color: '#ee7aae' },
    { id: 'sardor', name: 'Sardor', preview: 'Sent the trip photos', time: '16:05', color: '#7bc862', unread: 2 },
    { id: 'work', name: 'Work 💼', preview: 'Anna: Call tomorrow at 10:00', time: '15:47', color: '#e17076', unread: 12, muted: true },
    { id: 'saved', name: 'Saved Messages', preview: '📎 Documents.pdf', time: 'Fri', color: '#65aadd', saved: true },
  ],
  chatsB: [
    { id: 'dilnoza', name: 'Dilnoza', preview: 'Got the documents, thanks', time: '17:58', color: '#6ec9cb' },
    { id: 'saved', name: 'Saved Messages', preview: '📎 Contract.pdf', time: 'Thu', color: '#65aadd', saved: true },
  ],
  hints: {
    aOpenChat: 'Alex is texting you. Open the chat',
    aEdited: 'Alex fixed something. Leave the chat to see what it said before',
    aArchiveIn: '“Personal archive” just appeared. Open it',
    aFriendTopic: 'Open the “Alex” topic',
    aEditCard: 'AndoGram kept both the original and the edit. Your second phone sees this archive too',
    bOpenArchive: 'This is a second phone with regular Telegram — no AndoGram needed. Your second account is already in the group. Open “Personal archive”',
    bOpenTopic: 'Open the “Alex” topic',
    bReply: 'Here’s what he really wrote. Tease him',
    bSent: 'Sent to Alex from your main account',
    aBack: 'Your reply is already in the chat with Alex. Open it',
    aSecret: 'Reveal the secret',
    aSecretSent: 'Leave the chat',
    aOpenArchive: 'Molly💔 deleted her message. Want to read what it said? Open “Personal archive”',
    aOpenTopic: 'Open the “Molly💔” topic',
  },
  buttons: {
    aEditCard: 'Take the second phone',
    bSent: 'Back to the first phone',
  },
  tagline: 'AndoGram.\nThey told you\nit was impossible.\nWe’ll show you otherwise.',
  start: {
    title: 'The A-B-C bridge',
    sub: '1–2 minutes. Nothing to install',
  },
  screenLabel: 'AndoGram demo: the A-B-C bridge',
};

const COPY: Record<Language, BridgeCopy> = { ru: RU, uz: UZ, en: EN };

export const getBridgeCopy = (lang: Language): BridgeCopy => COPY[lang];
