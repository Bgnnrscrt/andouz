import type { Language } from '../../types';
import type { Round, Step } from './honeypotFlow';

/*
 * Texts of the Honeypot (duress PIN) sandbox, in 3 languages (its page: demoPages.ts).
 * You = Максим / Aziz / Max, as in the bridge. Each PIN opens its own
 * account(s) and chats: the words are per language (RU / UZ / EN below), the
 * rest of each chat row and account (colour, time, badges, phone number) is
 * defined once in LOOK. The secret account's chats are the owner's choice
 * (2026-11-01); the swearing is censored with asterisks.
 */

export interface Caption {
  title: string;
  sub: string;
}

/** Generic apps on the home screen (brand-named apps keep their names). */
export type HomeAppId = 'gallery' | 'clock' | 'weather' | 'settings' | 'phone' | 'messages' | 'browser' | 'camera';

/** Side menu items under the accounts. */
export type DrawerItem = 'profile' | 'group' | 'contacts' | 'calls' | 'saved' | 'settings';

/** Chats of the four accounts: 1111 safe, 2222 personal, 3333 work, 4444 secret. */
export type ChatId =
  | 'saved1'
  | 'water'
  | 'telegram'
  | 'wife'
  | 'mom'
  | 'family'
  | 'brother'
  | 'saved2'
  | 'sales'
  | 'boss'
  | 'client'
  | 'crm'
  | 'accounting'
  | 'boys'
  | 'lola'
  | 'poker'
  | 'shop'
  | 'hookah';

export interface HoneypotChat {
  id: ChatId;
  name: string;
  preview: string;
  /** The sender, shown before the preview (groups). */
  from?: string;
  time: string;
  color: string;
  unread?: number;
  muted?: boolean;
  /** «Избранное»: bookmark avatar instead of initials. */
  saved?: boolean;
  kind?: 'channel' | 'group';
}

export interface HoneypotAccount {
  name: string;
  phone: string;
  color: string;
  /** Unread messages of an account that is not the active one. */
  unread?: number;
}

export interface HoneypotRound {
  caption: Caption;
  /** The accounts this PIN opens; the first one is active. */
  accounts: HoneypotAccount[];
  chats: HoneypotChat[];
}

export interface LockCopy {
  /** The legend over the lock screen (our layer): the title, then «1111 — legend[1]»… */
  legendTitle: string;
  legend: Record<Round, string>;
  enter: string;
  forgot: string;
  /** aria-label of ⌫. */
  del: string;
}

export interface HoneypotCopy {
  home: {
    caption: Caption;
    /** Under the clock on the home screen. */
    date: string;
    apps: Record<HomeAppId, string>;
  };
  lock: LockCopy;
  rounds: Record<Round, HoneypotRound>;
  ui: {
    /** aria-label of ☰. */
    menu: string;
    addAccount: string;
    drawer: Record<DrawerItem, string>;
  };
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  /** Typed over the dimmed screen in the outro; starts with «AndoGram». */
  tagline: string;
  /** The start screen (its button and the end buttons: commonCopy.ts). */
  start: Caption;
  screenLabel: string;
}

/* ── Language-independent part of the accounts and chats ─────────────────── */

type Day = 'fri' | 'sat';
/** A clock time today, or a weekday for older chats. */
type When = `${number}:${number}` | Day;

interface ChatLook {
  id: ChatId;
  when: When;
  color: string;
  unread?: number;
  muted?: boolean;
  saved?: boolean;
  kind?: 'channel' | 'group';
}

interface AccountLook {
  phone: string;
  color: string;
  unread?: number;
}

/**
 * Phone numbers are masked: a full number in a real format could belong to a
 * real subscriber (the page is public). Chats are in list order (newest first).
 */
const LOOK: Record<Round, { accounts: AccountLook[]; chats: ChatLook[] }> = {
  1: {
    accounts: [{ phone: '+998 90 ••• •• 67', color: '#7bc862' }],
    chats: [
      { id: 'saved1', when: '17:02', color: '#65aadd', saved: true },
      { id: 'water', when: '13:47', color: '#6ec9cb', unread: 1 },
      { id: 'telegram', when: 'fri', color: '#5aa5e8' },
    ],
  },
  2: {
    accounts: [{ phone: '+998 93 ••• •• 76', color: '#faa774' }],
    chats: [
      { id: 'wife', when: '18:32', color: '#ee7aae', unread: 2 },
      { id: 'mom', when: '17:15', color: '#e17076', unread: 1 },
      { id: 'family', when: '16:40', color: '#7bc862', unread: 4, kind: 'group' },
      { id: 'brother', when: '14:05', color: '#65aadd' },
      { id: 'saved2', when: 'sat', color: '#65aadd', saved: true },
    ],
  },
  3: {
    accounts: [
      { phone: '+998 71 ••• •• 40', color: '#65aadd' },
      { phone: '+998 97 ••• •• 02', color: '#6ec9cb', unread: 3 },
    ],
    chats: [
      { id: 'sales', when: '14:52', color: '#faa774', unread: 3, kind: 'group' },
      { id: 'boss', when: '13:05', color: '#e17076', unread: 1 },
      { id: 'client', when: '12:40', color: '#7bc862' },
      { id: 'crm', when: '11:18', color: '#a695e7', unread: 14, muted: true, kind: 'group' },
      { id: 'accounting', when: 'fri', color: '#6ec9cb' },
    ],
  },
  4: {
    accounts: [{ phone: '+998 99 ••• •• 44', color: '#e56bd6' }],
    chats: [
      { id: 'boys', when: '18:39', color: '#faa774', unread: 7, kind: 'group' },
      { id: 'lola', when: '18:12', color: '#ee7aae', unread: 2 },
      { id: 'poker', when: '16:48', color: '#7bc862', unread: 23, muted: true, kind: 'group' },
      { id: 'shop', when: '15:00', color: '#e17076', unread: 3, muted: true, kind: 'channel' },
      { id: 'hookah', when: '12:20', color: '#a695e7', unread: 1, muted: true, kind: 'channel' },
    ],
  },
};

/* ── Words, per language ─────────────────────────────────────────────────── */

interface Words extends Omit<HoneypotCopy, 'rounds'> {
  rounds: Record<Round, { caption: Caption; accounts: string[] }>;
  chats: Record<ChatId, { name: string; preview: string; from?: string }>;
  /** Short weekdays of older chats. */
  days: Record<Day, string>;
}

const RU: Words = {
  home: {
    // A non-breaking hyphen: the narrow rail must not split «PIN-кодом».
    caption: { title: 'Твой телефон', sub: 'AndoGram под PIN\u2011кодом' },
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
  lock: {
    legendTitle: 'Введи PIN-код:',
    legend: { 1: 'безопасный аккаунт', 2: 'личный аккаунт', 3: 'рабочие аккаунты', 4: 'секретный аккаунт' },
    enter: 'Введите PIN',
    forgot: 'Забыли PIN?',
    del: 'Стереть',
  },
  rounds: {
    1: { caption: { title: 'PIN 1111 · Безопасный', sub: 'Для чужих глаз' }, accounts: ['Максим'] },
    2: { caption: { title: 'PIN 2222 · Личный', sub: 'Жена и семья' }, accounts: ['Максим'] },
    3: { caption: { title: 'PIN 3333 · Рабочий', sub: 'Коллеги и клиенты' }, accounts: ['Максим | Офис', 'Максим | Продажи'] },
    // \uFE0F (VS16) after 🕶 and 🃏: both default to a monochrome text glyph
    // (Windows, Linux); VS16 asks for the colour emoji, like the others.
    4: { caption: { title: 'PIN 4444 · Секретный', sub: 'Только для тебя' }, accounts: ['Тень 🕶\uFE0F'] },
  },
  chats: {
    saved1: { name: 'Избранное', preview: 'Список покупок 🛒' },
    water: { name: 'Доставка воды 💧', preview: 'Ваш заказ доставлен' },
    telegram: { name: 'Telegram', preview: 'Добро пожаловать в Telegram!' },
    wife: { name: 'Любимая ❤️', preview: 'Купи хлеба по дороге домой 🥖' },
    mom: { name: 'Мама', preview: 'Ты поел? Позвони вечером 🙂' },
    family: { name: 'Семья 👨‍👩‍👧', from: 'Папа', preview: 'Фото с дачи 📷' },
    brother: { name: 'Брат', preview: 'Футбол в субботу в силе?' },
    saved2: { name: 'Избранное', preview: '📷 Фото детей' },
    sales: { name: 'Отдел продаж', from: 'Анна', preview: 'Задача — отчёт до 18:00 📊' },
    boss: { name: 'Шеф', preview: 'Зайди ко мне в 15:00' },
    client: { name: 'Клиент · Silk Road', preview: 'Счёт получили, оплатим завтра' },
    crm: { name: 'Проект CRM', from: 'Тимур', preview: 'Задачи на неделю уже в трекере' },
    accounting: { name: 'Бухгалтерия', preview: 'Нужен акт сверки за октябрь' },
    boys: { name: 'Кенты 🍻', from: 'Серёга', preview: 'Бл*ть, ты где? Мы уже на месте 😂' },
    lola: { name: 'Лола 💋', preview: 'Скучаю… Сегодня увидимся? 😘' },
    poker: { name: 'Покер по пятницам 🃏\uFE0F', from: 'Рустам', preview: 'Ставки удваиваем, с*ки 😂' },
    shop: { name: 'Секс-шоп «Пульс» 18+', preview: '🔥 −30% на всё до воскресенья' },
    hookah: { name: 'Кальяны «Облако»', preview: 'Новые вкусы табака уже в наличии 💨' },
  },
  days: { fri: 'пт', sat: 'сб' },
  ui: {
    menu: 'Меню',
    addAccount: 'Добавить аккаунт',
    drawer: {
      profile: 'Мой профиль',
      group: 'Создать группу',
      contacts: 'Контакты',
      calls: 'Звонки',
      saved: 'Избранное',
      settings: 'Настройки',
    },
  },
  hints: {
    home: 'Открой AndoGram',
    pin1: 'Введи 1111 — безопасный PIN',
    list1: 'Почти пустой аккаунт — ничего лишнего. Открой меню',
    // drawer1–3 name the next PIN: their button «Начать сначала» (the owner's
    // words) goes on to it, unlike «Начать заново» under the phone. No-break
    // spaces keep «— PIN 2222» together on one line.
    drawer1: 'Здесь только один аккаунт. Остальных будто нет. Дальше\u00a0— PIN\u00a02222',
    pin2: 'Теперь введи 2222 — личный PIN',
    list2: 'Жена, мама, семья. Открой меню',
    drawer2: 'Снова один аккаунт — личный. Ни рабочих, ни секретного. Дальше\u00a0— PIN\u00a03333',
    pin3: 'Введи 3333 — рабочий PIN',
    list3: 'Коллеги, клиенты и рабочие группы. Открой меню',
    drawer3: 'Два рабочих аккаунта — и больше ничего. Дальше\u00a0— PIN\u00a04444',
    pin4: 'А теперь 4444 — секретный PIN',
    list4: 'Кенты, Лола 💋 и каналы, о которых никому знать не нужно. Открой меню',
    // Only what the visitor saw: in the app the main passcode opens every account too.
    drawer4: 'Под 1111, 2222 и 3333 этого аккаунта в меню не было',
  },
  buttons: { drawer1: 'Начать сначала', drawer2: 'Начать сначала', drawer3: 'Начать сначала' },
  // A no-break space keeps the dash on the line of the word before it.
  tagline: 'AndoGram. Один телефон\u00a0— четыре жизни. Кто что увидит, решаешь ты.',
  start: { title: 'Honeypot-пароли', sub: '1 минута. Ничего устанавливать не нужно' },
  screenLabel: 'Демо AndoGram: Honeypot-пароли',
};

const UZ: Words = {
  home: {
    caption: { title: 'Telefoningiz', sub: 'AndoGram PIN\u2011kod ostida' },
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
  lock: {
    // Not «PIN-kodni kiriting:» — the app's own title right below says exactly that.
    legendTitle: 'Qaysi PIN nimani ochadi:',
    legend: { 1: 'xavfsiz akkaunt', 2: 'shaxsiy akkaunt', 3: 'ish akkauntlari', 4: 'maxfiy akkaunt' },
    enter: 'PIN-kodni kiriting',
    forgot: 'PIN-kodni unutdingizmi?',
    del: 'O‘chirish',
  },
  rounds: {
    1: { caption: { title: 'PIN 1111 · Xavfsiz', sub: 'Begona ko‘zlar uchun' }, accounts: ['Aziz'] },
    2: { caption: { title: 'PIN 2222 · Shaxsiy', sub: 'Xotin va oila' }, accounts: ['Aziz'] },
    3: { caption: { title: 'PIN 3333 · Ish', sub: 'Hamkasblar va mijozlar' }, accounts: ['Aziz | Ofis', 'Aziz | Savdo'] },
    4: { caption: { title: 'PIN 4444 · Maxfiy', sub: 'Faqat siz uchun' }, accounts: ['Soya 🕶\uFE0F'] },
  },
  chats: {
    saved1: { name: 'Saqlangan xabarlar', preview: 'Xaridlar ro‘yxati 🛒' },
    water: { name: 'Suv yetkazib berish 💧', preview: 'Buyurtmangiz yetkazildi' },
    telegram: { name: 'Telegram', preview: 'Telegram’ga xush kelibsiz!' },
    wife: { name: 'Jonim ❤️', preview: 'Uyga kelayotib non olib kel 🥖' },
    mom: { name: 'Onam', preview: 'Ovqatlandingmi? Kechqurun qo‘ng‘iroq qil 🙂' },
    family: { name: 'Oila 👨‍👩‍👧', from: 'Dadam', preview: 'Dala hovlidan rasmlar 📷' },
    brother: { name: 'Akam', preview: 'Shanba kuni futbol bo‘ladimi?' },
    saved2: { name: 'Saqlangan xabarlar', preview: '📷 Bolalarning rasmlari' },
    sales: { name: 'Savdo bo‘limi', from: 'Anna', preview: 'Vazifa — hisobot soat 18:00 gacha 📊' },
    boss: { name: 'Boshliq', preview: 'Soat 15:00 da oldimga kir' },
    client: { name: 'Mijoz · Silk Road', preview: 'Hisobni oldik, ertaga to‘laymiz' },
    crm: { name: 'CRM loyihasi', from: 'Temur', preview: 'Haftalik vazifalar trekerda' },
    accounting: { name: 'Buxgalteriya', preview: 'Oktyabr uchun solishtirma dalolatnoma kerak' },
    boys: { name: 'Oshnalar 🍻', from: 'Sardor', preview: 'Qayerdasan, b*lat? Biz allaqachon yetib keldik 😂' },
    lola: { name: 'Lola 💋', preview: 'Sog‘indim… Bugun ko‘rishamizmi? 😘' },
    poker: { name: 'Juma pokeri 🃏\uFE0F', from: 'Rustam', preview: 'Stavkalarni ikki baravar oshiramiz 😂' },
    shop: { name: '«Puls» seks-shop 18+', preview: '🔥 Yakshanbagacha hammasiga −30%' },
    hookah: { name: '«Bulut» kalyanlari', preview: 'Tamakining yangi ta’mlari keldi 💨' },
  },
  days: { fri: 'Ju', sat: 'Sh' },
  ui: {
    menu: 'Menyu',
    addAccount: 'Akkaunt qo‘shish',
    drawer: {
      profile: 'Mening profilim',
      group: 'Guruh yaratish',
      contacts: 'Kontaktlar',
      calls: 'Qo‘ng‘iroqlar',
      saved: 'Saqlangan xabarlar',
      settings: 'Sozlamalar',
    },
  },
  hints: {
    home: 'AndoGram’ni oching',
    pin1: '1111 ni kiriting — xavfsiz PIN',
    list1: 'Deyarli bo‘sh akkaunt — ortiqcha hech narsa yo‘q. Menyuni oching',
    drawer1: 'Bu yerda bitta akkaunt bor, xolos. Qolganlari go‘yo yo‘q. Keyingisi\u00a0— PIN\u00a02222',
    pin2: 'Endi 2222 ni kiriting — shaxsiy PIN',
    list2: 'Xotiningiz, onangiz, oilangiz. Menyuni oching',
    drawer2: 'Yana bitta akkaunt — shaxsiy. Na ish, na maxfiy akkaunt bor. Keyingisi\u00a0— PIN\u00a03333',
    pin3: '3333 ni kiriting — ish PIN-kodi',
    list3: 'Hamkasblar, mijozlar va ish guruhlari. Menyuni oching',
    drawer3: 'Ikkita ish akkaunti — boshqa hech narsa yo‘q. Keyingisi\u00a0— PIN\u00a04444',
    pin4: 'Endi esa 4444 — maxfiy PIN',
    list4: 'Oshnalar, Lola 💋 va hech kim bilmasligi kerak bo‘lgan kanallar. Menyuni oching',
    drawer4: '1111, 2222 va 3333 bilan ochganda bu akkaunt menyuda ko‘rinmadi',
  },
  buttons: { drawer1: 'Boshidan boshlash', drawer2: 'Boshidan boshlash', drawer3: 'Boshidan boshlash' },
  tagline: 'AndoGram. Bitta telefon\u00a0— to‘rtta hayot. Kim nimani ko‘rishini o‘zingiz hal qilasiz.',
  start: { title: 'Honeypot parollari', sub: '1 daqiqa. Hech narsa o‘rnatish shart emas' },
  screenLabel: 'AndoGram demosi: Honeypot parollari',
};

const EN: Words = {
  home: {
    caption: { title: 'Your phone', sub: 'AndoGram behind a PIN' },
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
  lock: {
    // Not «Enter a PIN:» — the app's own «Enter PIN» is right below.
    legendTitle: 'Which PIN opens what:',
    legend: { 1: 'safe account', 2: 'personal account', 3: 'work accounts', 4: 'secret account' },
    enter: 'Enter PIN',
    forgot: 'Forgot PIN?',
    del: 'Delete',
  },
  rounds: {
    1: { caption: { title: 'PIN 1111 · Safe', sub: 'For prying eyes' }, accounts: ['Max'] },
    2: { caption: { title: 'PIN 2222 · Personal', sub: 'Wife and family' }, accounts: ['Max'] },
    3: { caption: { title: 'PIN 3333 · Work', sub: 'Colleagues and clients' }, accounts: ['Max | Office', 'Max | Sales'] },
    4: { caption: { title: 'PIN 4444 · Secret', sub: 'Just for you' }, accounts: ['Shadow 🕶\uFE0F'] },
  },
  chats: {
    saved1: { name: 'Saved Messages', preview: 'Shopping list 🛒' },
    water: { name: 'Water Delivery 💧', preview: 'Your order has been delivered' },
    telegram: { name: 'Telegram', preview: 'Welcome to Telegram!' },
    wife: { name: 'Honey ❤️', preview: 'Grab some bread on the way home 🥖' },
    mom: { name: 'Mom', preview: 'Did you eat? Call me tonight 🙂' },
    family: { name: 'Family 👨‍👩‍👧', from: 'Dad', preview: 'Photos from the country house 📷' },
    brother: { name: 'Brother', preview: 'Football on Saturday still on?' },
    saved2: { name: 'Saved Messages', preview: '📷 Kids’ photos' },
    sales: { name: 'Sales Team', from: 'Anna', preview: 'Task — report by 6 PM 📊' },
    boss: { name: 'Boss', preview: 'Come see me at 3 PM' },
    client: { name: 'Client · Silk Road', preview: 'Got the invoice, we’ll pay tomorrow' },
    crm: { name: 'CRM Project', from: 'Timur', preview: 'This week’s tasks are in the tracker' },
    accounting: { name: 'Accounting', preview: 'Need the October reconciliation' },
    boys: { name: 'The Boys 🍻', from: 'Mike', preview: 'Where the f*ck are you? We’re already here 😂' },
    lola: { name: 'Lola 💋', preview: 'Miss you… See you tonight? 😘' },
    poker: { name: 'Friday Poker 🃏\uFE0F', from: 'Rus', preview: 'Doubling the stakes, b*tches 😂' },
    shop: { name: 'Pulse Sex Shop 18+', preview: '🔥 30% off everything till Sunday' },
    hookah: { name: 'Cloud Hookah Shop', preview: 'New tobacco flavors in stock 💨' },
  },
  days: { fri: 'Fri', sat: 'Sat' },
  ui: {
    menu: 'Menu',
    addAccount: 'Add Account',
    drawer: {
      profile: 'My Profile',
      group: 'New Group',
      contacts: 'Contacts',
      calls: 'Calls',
      saved: 'Saved Messages',
      settings: 'Settings',
    },
  },
  hints: {
    home: 'Open AndoGram',
    pin1: 'Enter 1111, the safe PIN',
    list1: 'A nearly empty account, nothing to see. Open the menu',
    drawer1: 'Just one account here. The others don’t seem to exist. Next: PIN\u00a02222',
    pin2: 'Now enter 2222, the personal PIN',
    list2: 'Wife, mom, family. Open the menu',
    drawer2: 'Just one account again, the personal one. No work or secret accounts. Next: PIN\u00a03333',
    pin3: 'Enter 3333, the work PIN',
    list3: 'Colleagues, clients and work groups. Open the menu',
    drawer3: 'Two work accounts and nothing else. Next: PIN\u00a04444',
    pin4: 'And now 4444, the secret PIN',
    list4: 'The boys, Lola 💋 and channels nobody needs to know about. Open the menu',
    drawer4: 'With PIN 1111, 2222 or 3333, this account wasn’t in the menu',
  },
  buttons: { drawer1: 'Start again', drawer2: 'Start again', drawer3: 'Start again' },
  tagline: 'AndoGram. One phone, four lives. You decide who sees what.',
  start: { title: 'Duress passcodes', sub: '1 minute. Nothing to install' },
  screenLabel: 'AndoGram demo: duress passcodes',
};

/** Words + LOOK → the rows of one round. */
const roundFrom = (w: Words, r: Round): HoneypotRound => ({
  caption: w.rounds[r].caption,
  accounts: LOOK[r].accounts.map((a, i) => ({ ...a, name: w.rounds[r].accounts[i] ?? '' })),
  chats: LOOK[r].chats.map(({ when, ...look }) => ({
    ...look,
    ...w.chats[look.id],
    time: when === 'fri' || when === 'sat' ? w.days[when] : when,
  })),
});

const build = (w: Words): HoneypotCopy => ({
  home: w.home,
  lock: w.lock,
  rounds: { 1: roundFrom(w, 1), 2: roundFrom(w, 2), 3: roundFrom(w, 3), 4: roundFrom(w, 4) },
  ui: w.ui,
  hints: w.hints,
  buttons: w.buttons,
  tagline: w.tagline,
  start: w.start,
  screenLabel: w.screenLabel,
});

const COPY: Record<Language, HoneypotCopy> = { ru: build(RU), uz: build(UZ), en: build(EN) };

export const getHoneypotCopy = (lang: Language): HoneypotCopy => COPY[lang];
