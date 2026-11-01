import type { Language } from '../../types';
import type { PhoneId, Step } from './bridgeFlow';

/*
 * All text of the A-B-C bridge sandbox and its page, in 3 languages.
 * Names (owner's choice 2026-11-01): you = Максим / Aziz / Max,
 * friend = Даниль / Sanjar / Alex. Archive cards follow the format of the
 * current AndoGram code (ArchiveNamingHelper); the app itself writes them
 * in Russian only, the demo shows them in the visitor's language.
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
    ask19: string;
    ask20: string;
    myReply: string;
    fromPhone2: string;
    friendReply: string;
  };
  card: {
    header: (name: string, time: string) => string;
    edit: (name: string, was: string, now: string) => string;
  };
  /** Other chats on phone 1 (AndoGram). The first two also get archive topics. */
  chatsA: ChatSeed[];
  /** Other chats on phone 2 (plain Telegram, second account). */
  chatsB: ChatSeed[];
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  start: { title: string; sub: string; cta: string };
  finale: { title: string; text: string; again: string; buy: string };
  restart: string;
  screenLabel: string;
}

export interface BridgePageCopy {
  back: string;
  kicker: string;
  title: string;
  lead: string;
  rolesTitle: string;
  roles: { letter: 'A' | 'B' | 'C'; who: string; what: string }[];
  buy: string;
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
  phones: {
    a: { title: 'Телефон 1 · AndoGram', sub: 'Это ты — Максим' },
    b: { title: 'Телефон 2 · Telegram', sub: 'Твой второй аккаунт' },
    c: { title: 'Телефон Даниля · Telegram', sub: 'Твой собеседник' },
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
    ask19: 'Встречаемся сегодня в 19:00?',
    ask20: 'Встречаемся сегодня в 20:00?',
    myReply: 'Да, буду 👍',
    fromPhone2: 'Ок, тогда в 20:00 👌',
    friendReply: 'Отлично, до встречи!',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    edit: (name, was, now) => `Пользователь ${name} изменил сообщение:\nБыло: ${was}\nСтало: ${now}`,
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
    aReply: 'Ответь Данилю — нажми «Отправить сообщение»',
    aBack: 'Даниль изменил сообщение: было 19:00, стало 20:00. Вернись к списку чатов',
    aOpenArchive: 'AndoGram сам создал «Личный архив». Открой его',
    aOpenTopic: 'Здесь у каждого собеседника своя тема. Открой «Даниль»',
    aTopic: 'Даниль исправил сообщение, а архив помнит, как было',
    bOpenArchive: 'Это второй телефон с обычным Telegram — AndoGram здесь не нужен. Твой второй аккаунт уже в группе. Открой «Личный архив»',
    bOpenTopic: 'Открой тему «Даниль»',
    bReply: 'Здесь вся переписка с Данилем. Ответь ему прямо отсюда',
    bSent: 'Отправлено! Посмотрим, что получил Даниль',
    cIncoming: 'Сообщение пришло от Максима — то есть от тебя. Про второй телефон Даниль не знает',
    cSent: 'Даниль ответил',
    bReceived: 'Ответ Даниля уже здесь, на втором телефоне',
  },
  buttons: {
    aTopic: 'Взять второй телефон',
    bSent: 'Телефон Даниля',
    cIncoming: 'Дальше',
    cSent: 'Вернуться на второй телефон',
    bReceived: 'Дальше',
  },
  start: {
    title: 'Мост A-B-C',
    sub: 'Около минуты. Ничего устанавливать не нужно',
    cta: 'Проверь сам',
  },
  finale: {
    title: 'Это и есть мост A-B-C',
    text: 'Отвечай с любого телефона — собеседник видит сообщения от твоего основного аккаунта. А «Личный архив» хранит всю переписку, даже изменённые сообщения.',
    again: 'Пройти ещё раз',
    buy: 'Купить AndoGram',
  },
  restart: 'Начать заново',
  screenLabel: 'Демо AndoGram: мост A-B-C',
};

const UZ: BridgeCopy = {
  me: 'Aziz',
  friend: 'Sanjar',
  phones: {
    a: { title: '1-telefon · AndoGram', sub: 'Bu siz — Aziz' },
    b: { title: '2-telefon · Telegram', sub: 'Ikkinchi akkauntingiz' },
    c: { title: 'Sanjarning telefoni · Telegram', sub: 'Suhbatdoshingiz' },
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
    ask19: 'Bugun 19:00 da uchrashamizmi?',
    ask20: 'Bugun 20:00 da uchrashamizmi?',
    myReply: 'Ha, boraman 👍',
    fromPhone2: 'Mayli, unda 20:00 da 👌',
    friendReply: 'Zo‘r, ko‘rishguncha!',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    edit: (name, was, now) => `Foydalanuvchi ${name} xabarni tahrirladi:\nOldin: ${was}\nEndi: ${now}`,
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
    aReply: 'Sanjarga javob bering — «Xabar yuborish»ni bosing',
    aBack: 'Sanjar xabarini tahrirladi: 19:00 edi, 20:00 bo‘ldi. Chatlar ro‘yxatiga qayting',
    aOpenArchive: 'AndoGram «Shaxsiy arxiv»ni o‘zi yaratdi. Uni oching',
    aOpenTopic: 'Bu yerda har bir suhbatdoshning alohida mavzusi bor. «Sanjar»ni oching',
    aTopic: 'Sanjar xabarini o‘zgartirdi, arxiv esa avvalgisini eslab qoldi',
    bOpenArchive: 'Bu oddiy Telegram o‘rnatilgan ikkinchi telefon — AndoGram shart emas. Ikkinchi akkauntingiz guruhda bor. «Shaxsiy arxiv»ni oching',
    bOpenTopic: '«Sanjar» mavzusini oching',
    bReply: 'Sanjar bilan butun yozishma shu yerda. Unga shu yerdan javob bering',
    bSent: 'Yuborildi! Endi Sanjarga nima kelganini ko‘ramiz',
    cIncoming: 'Xabar Azizdan, ya’ni sizdan keldi. Sanjar ikkinchi telefon haqida bilmaydi',
    cSent: 'Sanjar javob berdi',
    bReceived: 'Sanjarning javobi allaqachon shu yerda — ikkinchi telefonda',
  },
  buttons: {
    aTopic: 'Ikkinchi telefonni olish',
    bSent: 'Sanjarning telefoni',
    cIncoming: 'Davom etish',
    cSent: 'Ikkinchi telefonga qaytish',
    bReceived: 'Davom etish',
  },
  start: {
    title: 'A-B-C ko‘prigi',
    sub: 'Bir daqiqacha. Hech narsa o‘rnatish shart emas',
    cta: 'O‘zingiz sinab ko‘ring',
  },
  finale: {
    title: 'Bu — A-B-C ko‘prigi',
    text: 'Istalgan telefondan javob bering — suhbatdosh xabarlarni asosiy akkauntingizdan ko‘radi. «Shaxsiy arxiv» esa butun yozishmani, hatto tahrirlangan xabarlarni ham saqlaydi.',
    again: 'Yana bir bor',
    buy: 'AndoGram sotib olish',
  },
  restart: 'Qaytadan boshlash',
  screenLabel: 'AndoGram demosi: A-B-C ko‘prigi',
};

const EN: BridgeCopy = {
  me: 'Max',
  friend: 'Alex',
  phones: {
    a: { title: 'Phone 1 · AndoGram', sub: 'This is you — Max' },
    b: { title: 'Phone 2 · Telegram', sub: 'Your second account' },
    c: { title: 'Alex’s phone · Telegram', sub: 'Your contact' },
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
    ask19: 'Are we meeting today at 19:00?',
    ask20: 'Are we meeting today at 20:00?',
    myReply: 'Yes, I’ll be there 👍',
    fromPhone2: 'OK, 20:00 then 👌',
    friendReply: 'Great, see you!',
  },
  card: {
    header: (name, time) => `${name}, ${time}`,
    edit: (name, was, now) => `User ${name} edited a message:\nWas: ${was}\nNow: ${now}`,
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
    aReply: 'Reply to Alex — tap “Send message”',
    aBack: 'Alex edited the message: 19:00 became 20:00. Go back to your chats',
    aOpenArchive: 'AndoGram created a “Personal archive” by itself. Open it',
    aOpenTopic: 'Every contact gets their own topic here. Open “Alex”',
    aTopic: 'Alex edited the message, but the archive remembers the original',
    bOpenArchive: 'This is a second phone with regular Telegram — no AndoGram needed. Your second account is already in the group. Open “Personal archive”',
    bOpenTopic: 'Open the “Alex” topic',
    bReply: 'Your whole chat with Alex is here. Reply right from here',
    bSent: 'Sent! Let’s see what Alex got',
    cIncoming: 'The message came from Max — that is, from you. Alex has no idea about the second phone',
    cSent: 'Alex replied',
    bReceived: 'Alex’s reply is already here, on your second phone',
  },
  buttons: {
    aTopic: 'Take the second phone',
    bSent: 'Alex’s phone',
    cIncoming: 'Next',
    cSent: 'Back to the second phone',
    bReceived: 'Next',
  },
  start: {
    title: 'The A-B-C bridge',
    sub: 'About a minute. Nothing to install',
    cta: 'Try it yourself',
  },
  finale: {
    title: 'That’s the A-B-C bridge',
    text: 'Reply from any phone — your contact sees messages from your main account. And the “Personal archive” keeps the whole conversation, even edited messages.',
    again: 'Try again',
    buy: 'Buy AndoGram',
  },
  restart: 'Start over',
  screenLabel: 'AndoGram demo: the A-B-C bridge',
};

const COPY: Record<Language, BridgeCopy> = { ru: RU, uz: UZ, en: EN };

export const getBridgeCopy = (lang: Language): BridgeCopy => COPY[lang];

const PAGE: Record<Language, BridgePageCopy> = {
  ru: {
    back: 'AndoGram',
    kicker: 'Как работает',
    title: 'Личный архив и мост A-B-C',
    lead: 'AndoGram сам копирует личные переписки в закрытую группу «Личный архив» — по отдельной теме на каждого собеседника. Там остаётся даже то, что потом изменили. А из архива можно отвечать со второго телефона от имени основного аккаунта.',
    rolesTitle: 'Кто есть кто',
    roles: [
      { letter: 'A', who: 'Ты — Максим.', what: 'Телефон с AndoGram' },
      { letter: 'B', who: 'Твой второй аккаунт.', what: 'Любой Telegram, даже официальный' },
      { letter: 'C', who: 'Даниль.', what: 'Обычный собеседник' },
    ],
    buy: 'Купить AndoGram',
  },
  uz: {
    back: 'AndoGram',
    kicker: 'Qanday ishlaydi',
    title: 'Shaxsiy arxiv va A-B-C ko‘prigi',
    lead: 'AndoGram shaxsiy yozishmalarni «Shaxsiy arxiv» yopiq guruhiga o‘zi nusxalaydi — har bir suhbatdosh uchun alohida mavzu bilan. Keyin tahrirlangan xabarlar ham saqlanib qoladi. Arxivdan esa ikkinchi telefondan asosiy akkaunt nomidan javob berish mumkin.',
    rolesTitle: 'Kim kim',
    roles: [
      { letter: 'A', who: 'Siz — Aziz.', what: 'AndoGram o‘rnatilgan telefon' },
      { letter: 'B', who: 'Ikkinchi akkauntingiz.', what: 'Istalgan Telegram, hatto rasmiysi ham' },
      { letter: 'C', who: 'Sanjar.', what: 'Oddiy suhbatdosh' },
    ],
    buy: 'AndoGram sotib olish',
  },
  en: {
    back: 'AndoGram',
    kicker: 'How it works',
    title: 'Personal archive & the A-B-C bridge',
    lead: 'AndoGram copies your private chats into a closed “Personal archive” group by itself — one topic per contact. Even messages edited later stay there. And from the archive you can reply from a second phone as your main account.',
    rolesTitle: 'Who is who',
    roles: [
      { letter: 'A', who: 'You — Max.', what: 'The phone with AndoGram' },
      { letter: 'B', who: 'Your second account.', what: 'Any Telegram, even the official one' },
      { letter: 'C', who: 'Alex.', what: 'A regular contact' },
    ],
    buy: 'Buy AndoGram',
  },
};

export const getBridgePageCopy = (lang: Language): BridgePageCopy => PAGE[lang];
