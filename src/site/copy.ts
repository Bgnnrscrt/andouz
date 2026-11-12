import type { AppId, Language, SiteAppId } from '../types';
import type { DemoId } from '../components/sandbox/demos';

/*
 * Every text of the site in uz / ru / en (uz is the default; uz and en are drafts the owner
 * may rewrite). Claims are kept honest: only what the apps really do, tests marked as tests
 * (see CLAUDE.md §6 and the Andusta scenario's table «Честно о функциях»).
 */

export type IconName =
  | 'key' | 'download' | 'archive' | 'ghost' | 'eye' | 'sparkles' | 'mic' | 'pin' | 'note' | 'sort'
  | 'history' | 'music' | 'camera' | 'type' | 'image' | 'layout' | 'shield' | 'user-minus' | 'trash' | 'scan'
  | 'lock' | 'restore' | 'hand' | 'fast' | 'expand' | 'audio' | 'scissors' | 'playlist' | 'folder';

export interface Feature {
  id: string;
  icon: IconName;
  title: string;
  text: string;
  /** Interactive «Проверь сам» page for this feature. */
  demo?: DemoId;
  /** Still a test in the app. */
  test?: boolean;
}

export interface CompareRow {
  topic: string;
  official: string;
  ours: string;
  test?: boolean;
}

export interface AppCopy {
  name: string;
  /** «для Telegram» */
  platform: string;
  /** Who the app is compared with (the column name). Default: Telegram for AndoGram, Instagram for Andusta. */
  rival?: string;
  /** Title of the comparison on the app page. Default: `appPage.compare` («with the official app»). */
  compareTitle?: string;
  /** Price of an app that is not on sale yet, shown next to «Скоро» (apps on sale: 1000 ★ in the buttons). */
  price?: string;
  tagline: string;
  lead: string;
  version: string;
  size: string;
  android: string;
  updated: string;
  /** Short points for the home card. */
  points: string[];
  top: Feature[];
  more: Feature[];
  compare: CompareRow[];
  changelog: { version: string; date: string; items: string[] };
}

export interface SiteCopy {
  titles: { home: string; app: (name: string) => string; demo: (title: string) => string };
  skip: string;
  nav: {
    home: string; apps: string; demos: string; install: string; faq: string; support: string;
    menu: string; close: string; language: string; getAccess: string; buyShort: string;
  };
  /** The curtain hero (Hero.tsx): `title` is drawn in 4 lines, the last one in italics; in `lead` the words
   *  Google / Meta / Telegram are set in bold. */
  hero: {
    kicker: string; title: [string, string, string, string]; lead: string; cta: string; ctaDemo: string; trust: string[];
    /** the button next to the phone that stops / starts the pictures */
    pause: string; play: string;
  };
  highlights: { kicker: string; title: string; items: { icon: IconName; title: string; text: string; app: AppId; demo?: DemoId }[]; open: string; try: string };
  demos: { kicker: string; title: string; lead: string; start: string; items: { id: DemoId; title: string; text: string; time: string }[] };
  /** `soon` / `soonShort` (+ the app's `price`) — instead of the buy button of an app that is not on sale yet (not in APP_IDS). */
  apps: { kicker: string; title: string; details: string; buy: string; soon: string; soonShort: string; tests: string };
  compare: { kicker: string; title: string; official: string; ours: string; test: string };
  install: { kicker: string; title: string; steps: { title: string; text: string }[]; note: string; cta: string };
  faq: { kicker: string; title: string; items: { q: string; a: string }[] };
  footer: { about: string; sections: string; contact: string; bot: string; disclaimer: string; rights: string };
  appPage: { back: string; kicker: string; facts: { version: string; size: string; android: string; updated: string }; top: string; more: string; compare: string; whatsNew: string; tryDemo: string; buy: string; test: string };
  demoPage: { kicker: string; back: (name: string) => string; roles: string };
  sticky: { text: string; price: string };
  access: {
    title: string; whichApp: string; price: string; priceNote: string; pay: string; payHint: string;
    promo: string; qrHint: string; close: string;
  };
  errors: { page: string; window: string; reload: string; close: string };
}

const BOT = '@Andouzbot';

/* ------------------------------------------------------------------ ru */
const RU: SiteCopy = {
  titles: {
    home: 'ANDO — AndoGram и Andusta: Telegram и Instagram по твоим правилам',
    app: (name) => `${name} — ANDO`,
    demo: (title) => `${title} — попробуй сам | ANDO`,
  },
  skip: 'Перейти к содержимому',
  nav: {
    home: 'Главная', apps: 'Приложения', demos: 'Попробовать', install: 'Как получить', faq: 'Вопросы',
    support: 'Поддержка', menu: 'Меню', close: 'Закрыть', language: 'Язык', getAccess: 'Получить доступ', buyShort: 'Купить',
  },
  hero: {
    kicker: 'AndoGram · Andusta · Andeo',
    title: ['Тебе сказали,', 'что так нельзя,', 'мы покажем,', 'что можно'],
    lead: 'Тебе всё ещё кажется, что ты управляешь своим телефоном? Google решает, что ты увидишь. Meta решает, что ты купишь. Telegram решает, что ты читаешь. С нами возьми свою жизнь в свои руки.',
    cta: 'Получить доступ',
    ctaDemo: 'Попробовать в браузере',
    trust: ['Без Root', 'Android 8+', 'Оплата Telegram Stars'],
    pause: 'Остановить смену кадров',
    play: 'Запустить смену кадров',
  },
  highlights: {
    kicker: 'Возможности',
    title: 'То, чего не умеют обычные приложения',
    open: 'Подробнее',
    try: 'Попробовать',
    items: [
      { icon: 'key', app: 'andogram', demo: 'honeypot', title: 'Скрытые аккаунты', text: 'У каждого PIN-кода свои аккаунты. Введёшь «безопасный» — остальные исчезнут из меню и уведомлений.' },
      { icon: 'download', app: 'andogram', demo: 'no_forwards_bypass', title: 'Сохранить запрещённое', text: 'Фото и видео из каналов, где сохранение отключено, — в галерею или в «Избранное».' },
      { icon: 'archive', app: 'andogram', demo: 'archive_bridge', title: 'Ничего не пропадёт', text: 'Личные переписки копируются в твой закрытый архив — вместе с изменёнными и удалёнными сообщениями.' },
      { icon: 'ghost', app: 'andusta', title: 'Невидимка', text: 'Смотри истории в Instagram без следа в списке зрителей и читай Direct без «просмотрено».' },
      { icon: 'eye', app: 'andusta', title: 'Одноразовое — ещё раз', text: 'Одноразовое фото в Direct не сгорает: его можно открыть повторно.' },
      { icon: 'sparkles', app: 'andogram', demo: 'ar_masks', title: 'Маски и другой голос', text: 'AR-маски в видеокружках и смена голоса в голосовых сообщениях.' },
    ],
  },
  demos: {
    kicker: 'Попробуй сам',
    title: 'Сначала проверь — потом покупай',
    lead: 'Живые демо прямо в браузере: на экране телефон, ты нажимаешь — и видишь, как это работает. Ничего не нужно устанавливать.',
    start: 'Начать',
    items: [
      { id: 'honeypot', title: 'Скрытые аккаунты', text: 'Пять PIN-кодов — пять разных телефонов в одном.', time: '≈ 1 мин' },
      { id: 'archive_bridge', title: 'Архив и второй телефон', text: 'Друг исправил сообщение, бывшая удалила — а у тебя всё осталось.', time: '≈ 2 мин' },
      { id: 'no_forwards_bypass', title: 'Сохранить запрещённое', text: 'Видео из закрытого канала: в Telegram нельзя, в AndoGram — можно.', time: '≈ 40 с' },
      { id: 'ar_masks', title: 'Маски в кружках', text: 'Маска садится на лицо и двигается вместе с ним.', time: '≈ 50 с' },
    ],
  },
  apps: { kicker: 'Приложения', title: 'Выбери своё', details: 'Подробнее', buy: 'Купить', soon: 'Скоро в продаже', soonShort: 'Скоро', tests: 'В тесте' },
  compare: { kicker: 'Сравнение', title: 'Обычное приложение и наше', official: 'Обычное', ours: 'Наше', test: 'тест' },
  install: {
    kicker: 'Как получить',
    title: 'Три шага — и готово',
    steps: [
      { title: 'Оплати доступ', text: `1000 ★ Telegram Stars в нашем боте ${BOT}. Бот выдаст купон: нажми «Получить приложение сейчас» — и он пришлёт код активации и сам файл. Уже есть купон? Отправь его боту.` },
      { title: 'Установи файл', text: 'Открой APK, который прислал бот, и разреши установку из этого источника — Android спросит один раз. Так он предупреждает о любом приложении не из Google Play.' },
      { title: 'Введи код', text: 'При первом запуске введи код активации — приложение привяжется к твоему телефону.' },
    ],
    note: 'Root-права не нужны. Работает на Android 8.0 и новее.',
    cta: 'Получить доступ',
  },
  faq: {
    kicker: 'Вопросы',
    title: 'Частые вопросы',
    items: [
      { q: 'Это безопасно для моего аккаунта?', a: 'Приложения общаются с Telegram и Instagram так же, как официальные. Риск блокировки небольшой, но честно: ни одно неофициальное приложение не даёт стопроцентных гарантий.' },
      { q: 'Нужен ли Root?', a: 'Нет. Приложение ставится как обычное, из APK-файла.' },
      { q: 'Мой обычный Telegram или Instagram удалится?', a: 'Нет. Andusta ставится рядом с Instagram отдельным приложением. AndoGram — тоже отдельное приложение: официальный Telegram остаётся на месте.' },
      { q: 'Как оплатить?', a: `Через Telegram Stars в боте ${BOT}: 1000 ★ за приложение. После оплаты бот выдаст купон и по нему пришлёт файл и код активации. Если у тебя есть купон или промокод на скидку — просто отправь его боту.` },
      { q: 'Что такое код активации?', a: 'Одноразовый код, который бот присылает вместе с файлом приложения. Его вводят при первом запуске — так приложение привязывается к твоему телефону.' },
      { q: 'Почему Android предупреждает при установке?', a: 'Так Android реагирует на любое приложение не из Google Play. В наших приложениях нет вредоносного кода — нажми «Всё равно установить».' },
      { q: 'Работает на iPhone?', a: 'Нет, только на Android 8.0 и новее.' },
      { q: 'Где брать обновления?', a: `В боте ${BOT}: в разделе «Мой доступ» всегда лежит самая свежая версия.` },
    ],
  },
  footer: {
    about: 'Улучшенные Telegram и Instagram и плеер Andeo для Android.',
    sections: 'Разделы',
    contact: 'Оплата и поддержка',
    bot: `Бот ${BOT}`,
    disclaimer: 'AndoGram и Andusta — независимые проекты, не связанные с Telegram FZ-LLC и Meta Platforms, Inc.',
    rights: '© 2026 ANDO',
  },
  appPage: {
    back: 'На главную',
    kicker: 'Приложение',
    facts: { version: 'Версия', size: 'Размер', android: 'Android', updated: 'Обновлено' },
    top: 'Главное',
    more: 'И ещё',
    compare: 'Сравнение с официальным',
    whatsNew: 'Что нового',
    tryDemo: 'Попробовать',
    buy: 'Купить · 1000 ★',
    test: 'тест',
  },
  demoPage: { kicker: 'Попробуй сам', back: (name) => name, roles: 'Кто есть кто' },
  sticky: { text: 'Получить доступ', price: '1000 ★' },
  access: {
    title: 'Получить доступ',
    whichApp: 'Приложение',
    price: '1000 ★',
    priceNote: 'Разовая оплата Telegram Stars · обновления включены',
    pay: 'Оплатить в боте',
    payHint: `Откроется ${BOT}. После оплаты он выдаст купон и по нему сразу пришлёт код активации и сам файл приложения.`,
    promo: 'Есть купон или промокод? Введи в боте',
    qrHint: 'С компьютера? Наведи камеру телефона на код — бот откроется прямо на телефоне, туда же придёт файл.',
    close: 'Закрыть',
  },
  errors: {
    page: 'Страница не загрузилась. Проверь интернет и обнови её.',
    window: 'Окно не загрузилось. Проверь интернет и обнови страницу.',
    reload: 'Обновить',
    close: 'Закрыть',
  },
};

/* ------------------------------------------------------------------ uz */
const UZ: SiteCopy = {
  titles: {
    home: 'ANDO — AndoGram va Andusta: Telegram va Instagram sening qoidalaring bo‘yicha',
    app: (name) => `${name} — ANDO`,
    demo: (title) => `${title} — o‘zing sinab ko‘r | ANDO`,
  },
  skip: 'Asosiy qismga o‘tish',
  nav: {
    home: 'Bosh sahifa', apps: 'Ilovalar', demos: 'Sinab ko‘rish', install: 'Qanday olish', faq: 'Savollar',
    support: 'Yordam', menu: 'Menyu', close: 'Yopish', language: 'Til', getAccess: 'Kirish huquqini olish', buyShort: 'Sotib olish',
  },
  hero: {
    kicker: 'AndoGram · Andusta · Andeo',
    title: ['«Buning iloji yo‘q»', 'deyishdi,', 'biz iloji borligini', 'isbotlaymiz'],
    lead: 'Hali ham telefoningni o‘zing boshqaryapsan deb o‘ylaysanmi? Google nimani ko‘rishingni hal qiladi. Meta nima sotib olishingni hal qiladi. Telegram nimani o‘qishingni hal qiladi. Biz bilan hayotingni o‘z qo‘lingga ol.',
    cta: 'Kirish huquqini olish',
    ctaDemo: 'Brauzerda sinab ko‘rish',
    trust: ['Root kerak emas', 'Android 8+', 'Telegram Stars bilan to‘lov'],
    pause: 'Kadrlar almashinuvini to‘xtatish',
    play: 'Kadrlar almashinuvini yoqish',
  },
  highlights: {
    kicker: 'Imkoniyatlar',
    title: 'Oddiy ilovalar qila olmaydigan narsalar',
    open: 'Batafsil',
    try: 'Sinab ko‘rish',
    items: [
      { icon: 'key', app: 'andogram', demo: 'honeypot', title: 'Yashirin akkauntlar', text: 'Har bir PIN-kodning o‘z akkauntlari bor. «Xavfsiz» PIN kiritilsa, qolganlari menyu va bildirishnomalardan yo‘qoladi.' },
      { icon: 'download', app: 'andogram', demo: 'no_forwards_bypass', title: 'Taqiqlanganni saqlash', text: 'Saqlash o‘chirilgan kanallardagi rasm va videolar — galereyaga yoki «Saqlanganlar»ga.' },
      { icon: 'archive', app: 'andogram', demo: 'archive_bridge', title: 'Hech narsa yo‘qolmaydi', text: 'Shaxsiy yozishmalar yopiq arxivingga ko‘chiriladi — tahrirlangan va o‘chirilgan xabarlar bilan birga.' },
      { icon: 'ghost', app: 'andusta', title: 'Ko‘rinmas rejim', text: 'Instagramda hikoyalarni ko‘ruvchilar ro‘yxatida iz qoldirmay ko‘r, Directni «ko‘rildi»siz o‘qi.' },
      { icon: 'eye', app: 'andusta', title: 'Bir martalik — yana bir bor', text: 'Directdagi bir martalik rasm yo‘qolmaydi: uni qayta ochish mumkin.' },
      { icon: 'sparkles', app: 'andogram', demo: 'ar_masks', title: 'Niqoblar va boshqa ovoz', text: 'Video-doirachalarda AR-niqoblar va ovozli xabarlarda ovozni o‘zgartirish.' },
    ],
  },
  demos: {
    kicker: 'O‘zing sinab ko‘r',
    title: 'Avval sinab ko‘r — keyin sotib ol',
    lead: 'Brauzerning o‘zida jonli namoyishlar: ekranda telefon, sen bosasan — va qanday ishlashini ko‘rasan. Hech narsa o‘rnatish shart emas.',
    start: 'Boshlash',
    items: [
      { id: 'honeypot', title: 'Yashirin akkauntlar', text: 'Beshta PIN-kod — bitta telefonda beshta turli telefon.', time: '≈ 1 daq' },
      { id: 'archive_bridge', title: 'Arxiv va ikkinchi telefon', text: 'Do‘st xabarni tahrirladi, sobiq o‘chirdi — senda esa hammasi qoldi.', time: '≈ 2 daq' },
      { id: 'no_forwards_bypass', title: 'Taqiqlanganni saqlash', text: 'Yopiq kanaldagi video: Telegramda mumkin emas, AndoGramda — mumkin.', time: '≈ 40 s' },
      { id: 'ar_masks', title: 'Doirachalarda niqoblar', text: 'Niqob yuzga o‘tiradi va u bilan birga harakatlanadi.', time: '≈ 50 s' },
    ],
  },
  apps: { kicker: 'Ilovalar', title: 'O‘zingnikini tanla', details: 'Batafsil', buy: 'Sotib olish', soon: 'Tez orada sotuvda', soonShort: 'Tez orada', tests: 'Sinovda' },
  compare: { kicker: 'Taqqoslash', title: 'Oddiy ilova va bizniki', official: 'Oddiy', ours: 'Bizniki', test: 'sinov' },
  install: {
    kicker: 'Qanday olish',
    title: 'Uch qadam — tayyor',
    steps: [
      { title: 'Kirish huquqi uchun to‘la', text: `${BOT} botimizda 1000 ★ Telegram Stars. Bot kupon beradi: «Ilovani hozir olish» tugmasini bos — u faollashtirish kodini va faylning o‘zini yuboradi. Kuponing bormi? Uni botga yubor.` },
      { title: 'Faylni o‘rnat', text: 'Bot yuborgan APK faylni och va shu manbadan o‘rnatishga ruxsat ber — Android bir marta so‘raydi. U Google Playdan bo‘lmagan har qanday ilova haqida shunday ogohlantiradi.' },
      { title: 'Kodni kirit', text: 'Birinchi ishga tushirishda faollashtirish kodini kirit — ilova telefoningga bog‘lanadi.' },
    ],
    note: 'Root-huquqlar kerak emas. Android 8.0 va undan yangi versiyalarda ishlaydi.',
    cta: 'Kirish huquqini olish',
  },
  faq: {
    kicker: 'Savollar',
    title: 'Ko‘p beriladigan savollar',
    items: [
      { q: 'Akkauntim uchun xavfsizmi?', a: 'Ilovalar Telegram va Instagram bilan rasmiylari kabi muloqot qiladi. Bloklanish xavfi kichik, lekin rostini aytsak: hech bir norasmiy ilova yuz foiz kafolat bermaydi.' },
      { q: 'Root kerakmi?', a: 'Yo‘q. Ilova oddiy ilova kabi, APK fayldan o‘rnatiladi.' },
      { q: 'Oddiy Telegram yoki Instagramim o‘chib ketadimi?', a: 'Yo‘q. Andusta Instagram yonida alohida ilova bo‘lib o‘rnatiladi. AndoGram ham alohida ilova: rasmiy Telegram joyida qoladi.' },
      { q: 'Qanday to‘lash mumkin?', a: `${BOT} botida Telegram Stars orqali: bitta ilova uchun 1000 ★. To‘lovdan keyin bot kupon beradi va u bo‘yicha fayl hamda faollashtirish kodini yuboradi. Kupon yoki chegirma promokoding bo‘lsa — uni shunchaki botga yubor.` },
      { q: 'Faollashtirish kodi nima?', a: 'Bot ilova fayli bilan birga yuboradigan bir martalik kod. U birinchi ishga tushirishda kiritiladi — shu bilan ilova telefoningga bog‘lanadi.' },
      { q: 'Nega Android o‘rnatishda ogohlantiradi?', a: 'Android Google Playdan bo‘lmagan har qanday ilovaga shunday munosabatda bo‘ladi. Ilovalarimizda zararli kod yo‘q — «Baribir o‘rnatish»ni bos.' },
      { q: 'iPhone’da ishlaydimi?', a: 'Yo‘q, faqat Android 8.0 va undan yangi versiyalarda.' },
      { q: 'Yangilanishlarni qayerdan olaman?', a: `${BOT} botida: «Mening kirishim» bo‘limida doim eng yangi versiya turadi.` },
    ],
  },
  footer: {
    about: 'Android uchun kuchaytirilgan Telegram va Instagram hamda Andeo pleyeri.',
    sections: 'Bo‘limlar',
    contact: 'To‘lov va yordam',
    bot: `${BOT} boti`,
    disclaimer: 'AndoGram va Andusta — Telegram FZ-LLC va Meta Platforms, Inc. bilan bog‘liq bo‘lmagan mustaqil loyihalar.',
    rights: '© 2026 ANDO',
  },
  appPage: {
    back: 'Bosh sahifa',
    kicker: 'Ilova',
    facts: { version: 'Versiya', size: 'Hajmi', android: 'Android', updated: 'Yangilangan' },
    top: 'Asosiysi',
    more: 'Yana',
    compare: 'Rasmiy ilova bilan taqqoslash',
    whatsNew: 'Yangiliklar',
    tryDemo: 'Sinab ko‘rish',
    buy: 'Sotib olish · 1000 ★',
    test: 'sinov',
  },
  demoPage: { kicker: 'O‘zing sinab ko‘r', back: (name) => name, roles: 'Kim kim' },
  sticky: { text: 'Kirish huquqini olish', price: '1000 ★' },
  access: {
    title: 'Kirish huquqini olish',
    whichApp: 'Ilova',
    price: '1000 ★',
    priceNote: 'Telegram Stars bilan bir martalik to‘lov · yangilanishlar kiradi',
    pay: 'Botda to‘lash',
    payHint: `${BOT} ochiladi. To‘lovdan keyin u kupon beradi va u bo‘yicha darhol faollashtirish kodini va ilova faylining o‘zini yuboradi.`,
    promo: 'Kupon yoki promokod bormi? Botda kirit',
    qrHint: 'Kompyuterdanmisan? Telefon kamerasini kodga qarat — bot telefoningda ochiladi, fayl ham o‘sha yerga keladi.',
    close: 'Yopish',
  },
  errors: {
    page: 'Sahifa yuklanmadi. Internetni tekshirib, sahifani yangila.',
    window: 'Oyna yuklanmadi. Internetni tekshirib, sahifani yangila.',
    reload: 'Yangilash',
    close: 'Yopish',
  },
};

/* ------------------------------------------------------------------ en */
const EN: SiteCopy = {
  titles: {
    home: 'ANDO — AndoGram & Andusta: Telegram and Instagram on your terms',
    app: (name) => `${name} — ANDO`,
    demo: (title) => `${title} — try it yourself | ANDO`,
  },
  skip: 'Skip to content',
  nav: {
    home: 'Home', apps: 'Apps', demos: 'Try it', install: 'How to get it', faq: 'Questions',
    support: 'Support', menu: 'Menu', close: 'Close', language: 'Language', getAccess: 'Get access', buyShort: 'Buy',
  },
  hero: {
    kicker: 'AndoGram · Andusta · Andeo',
    title: ['They told you', 'it can’t be done,', 'we’ll show you', 'it can'],
    lead: 'Still think you’re the one in control of your phone? Google decides what you see. Meta decides what you buy. Telegram decides what you read. With us, take your life back into your own hands.',
    cta: 'Get access',
    ctaDemo: 'Try it in your browser',
    trust: ['No root', 'Android 8+', 'Pay with Telegram Stars'],
    pause: 'Pause the slideshow',
    play: 'Play the slideshow',
  },
  highlights: {
    kicker: 'Features',
    title: 'What the regular apps won’t let you do',
    open: 'Details',
    try: 'Try it',
    items: [
      { icon: 'key', app: 'andogram', demo: 'honeypot', title: 'Hidden accounts', text: 'Every PIN opens its own accounts. Enter the “safe” one and the rest vanish from the menu and notifications.' },
      { icon: 'download', app: 'andogram', demo: 'no_forwards_bypass', title: 'Save what’s locked', text: 'Photos and videos from channels that block saving — to your gallery or Saved Messages.' },
      { icon: 'archive', app: 'andogram', demo: 'archive_bridge', title: 'Nothing gets lost', text: 'Your private chats are copied to your own closed archive — edited and deleted messages included.' },
      { icon: 'ghost', app: 'andusta', title: 'Ghost mode', text: 'Watch Instagram stories without showing up in the viewers list, and read Direct without “seen”.' },
      { icon: 'eye', app: 'andusta', title: 'View-once, again', text: 'A view-once photo in Direct doesn’t burn: you can open it again.' },
      { icon: 'sparkles', app: 'andogram', demo: 'ar_masks', title: 'Masks and a new voice', text: 'AR masks in video messages and a voice changer for voice notes.' },
    ],
  },
  demos: {
    kicker: 'Try it yourself',
    title: 'Try first, buy later',
    lead: 'Live demos right in your browser: a phone on the screen, you tap — and see how it works. Nothing to install.',
    start: 'Start',
    items: [
      { id: 'honeypot', title: 'Hidden accounts', text: 'Five PINs — five different phones in one.', time: '≈ 1 min' },
      { id: 'archive_bridge', title: 'Archive and a second phone', text: 'A friend edited a message, your ex deleted one — you still have it all.', time: '≈ 2 min' },
      { id: 'no_forwards_bypass', title: 'Save what’s locked', text: 'A video from a closed channel: not in Telegram, yes in AndoGram.', time: '≈ 40 s' },
      { id: 'ar_masks', title: 'Masks in video messages', text: 'The mask sits on the face and moves with it.', time: '≈ 50 s' },
    ],
  },
  apps: { kicker: 'Apps', title: 'Pick yours', details: 'Details', buy: 'Buy', soon: 'Coming soon', soonShort: 'Soon', tests: 'In testing' },
  compare: { kicker: 'Comparison', title: 'The regular app and ours', official: 'Regular', ours: 'Ours', test: 'beta' },
  install: {
    kicker: 'How to get it',
    title: 'Three steps and you’re done',
    steps: [
      { title: 'Pay for access', text: `1000 ★ Telegram Stars in our bot ${BOT}. The bot gives you a coupon: tap “Get the app now” and it sends your activation code and the file itself. Already have a coupon? Send it to the bot.` },
      { title: 'Install the file', text: 'Open the APK the bot sent and allow installs from this source — Android asks once. It warns like this about any app that isn’t from Google Play.' },
      { title: 'Enter the code', text: 'On first launch, enter the activation code — the app gets tied to your phone.' },
    ],
    note: 'No root needed. Works on Android 8.0 and newer.',
    cta: 'Get access',
  },
  faq: {
    kicker: 'Questions',
    title: 'Frequently asked',
    items: [
      { q: 'Is it safe for my account?', a: 'The apps talk to Telegram and Instagram the same way the official ones do. The risk of a ban is small, but honestly: no unofficial app can give a hundred percent guarantee.' },
      { q: 'Do I need root?', a: 'No. It installs like any app, from an APK file.' },
      { q: 'Will my regular Telegram or Instagram be removed?', a: 'No. Andusta installs next to Instagram as a separate app. AndoGram is a separate app too: the official Telegram stays where it is.' },
      { q: 'How do I pay?', a: `With Telegram Stars in the bot ${BOT}: 1000 ★ per app. After payment the bot gives you a coupon and sends the file and the activation code for it. If you have a coupon or a promo code for a discount, just send it to the bot.` },
      { q: 'What is the activation code?', a: 'A one-time code the bot sends together with the app file. You enter it on first launch — that ties the app to your phone.' },
      { q: 'Why does Android warn me when installing?', a: 'Android does that for any app that isn’t from Google Play. There’s no malicious code in our apps — tap “Install anyway”.' },
      { q: 'Does it work on iPhone?', a: 'No, only on Android 8.0 and newer.' },
      { q: 'Where do I get updates?', a: `In the bot ${BOT}: the “My access” section always has the newest version.` },
    ],
  },
  footer: {
    about: 'Enhanced Telegram and Instagram, plus the Andeo player, for Android.',
    sections: 'Sections',
    contact: 'Payment & support',
    bot: `Bot ${BOT}`,
    disclaimer: 'AndoGram and Andusta are independent projects, not affiliated with Telegram FZ-LLC or Meta Platforms, Inc.',
    rights: '© 2026 ANDO',
  },
  appPage: {
    back: 'Home',
    kicker: 'App',
    facts: { version: 'Version', size: 'Size', android: 'Android', updated: 'Updated' },
    top: 'Highlights',
    more: 'And more',
    compare: 'Compared with the official app',
    whatsNew: 'What’s new',
    tryDemo: 'Try it',
    buy: 'Buy · 1000 ★',
    test: 'beta',
  },
  demoPage: { kicker: 'Try it yourself', back: (name) => name, roles: 'Who is who' },
  sticky: { text: 'Get access', price: '1000 ★' },
  access: {
    title: 'Get access',
    whichApp: 'App',
    price: '1000 ★',
    priceNote: 'One-time payment in Telegram Stars · updates included',
    pay: 'Pay in the bot',
    payHint: `${BOT} opens. After payment it gives you a coupon and at once sends your activation code and the app file itself for it.`,
    promo: 'Have a coupon or a promo code? Enter it in the bot',
    qrHint: 'On a computer? Point your phone’s camera at the code — the bot opens right on your phone, and the file arrives there.',
    close: 'Close',
  },
  errors: {
    page: 'This page didn’t load. Check your connection and reload it.',
    window: 'This window didn’t load. Check your connection and reload the page.',
    reload: 'Reload',
    close: 'Close',
  },
};

export const COPY: Record<Language, SiteCopy> = { ru: RU, uz: UZ, en: EN };

/* ------------------------------------------------------------------ apps */

const ANDOGRAM: Record<Language, AppCopy> = {
  ru: {
    name: 'AndoGram',
    platform: 'для Telegram',
    tagline: 'Telegram, в котором всё под твоим контролем',
    lead: 'Клиент Telegram на основе AyuGram. Скрывает аккаунты под разными PIN-кодами, сохраняет то, что запрещено сохранять, хранит архив всех личных переписок и умеет многое, чего нет в официальном приложении.',
    version: '10.9.2', size: '96,5 МБ', android: '8.0+', updated: '27.10.2026',
    points: ['Скрытые аккаунты по PIN-коду', 'Сохранение из закрытых каналов', 'Архив переписок и второй телефон', 'Без «прочитано» и «в сети»', 'AR-маски и смена голоса'],
    top: [
      { id: 'honeypot', icon: 'key', demo: 'honeypot', title: 'Скрытые аккаунты', text: 'Поставь разные PIN-коды на разные аккаунты. Под «безопасным» PIN остальные аккаунты исчезают из меню и уведомлений, будто их нет. Главный PIN открывает всё.' },
      { id: 'no_forwards_bypass', icon: 'download', demo: 'no_forwards_bypass', title: 'Сохранение запрещённого', text: 'Фото, видео и файлы из каналов и чатов, где отключены пересылка и сохранение, — в галерею или в «Избранное». Скриншоты в таких чатах тоже работают.' },
      { id: 'archive_bridge', icon: 'archive', demo: 'archive_bridge', title: 'Личный архив и второй телефон', text: 'Все личные переписки копируются в твой закрытый архив — по теме на каждого собеседника, с изменёнными и удалёнными сообщениями. Со второго телефона из архива можно отвечать от имени основного аккаунта.' },
      { id: 'ar_masks', icon: 'scan', demo: 'ar_masks', title: 'AR-маски в видеокружках', text: 'Маска садится на лицо, двигается вместе с ним и не слетает при поворотах головы.' },
      { id: 'voice_changer', icon: 'mic', title: 'Смена голоса', text: 'Запиши голосовое — и отправь его другим голосом: низким, роботом, женским и другими.' },
    ],
    more: [
      { id: 'deleted', icon: 'trash', title: 'Удалённое остаётся', text: 'Удалённые и изменённые сообщения не пропадают из чата.' },
      { id: 'ghost', icon: 'ghost', title: 'Невидимка', text: 'Читай без отметки «прочитано» и не показывайся «в сети».' },
      { id: 'sort', icon: 'sort', title: 'Медиа по размеру', text: 'Файлы в чатах и каналах — от самых больших к маленьким.' },
      { id: 'location', icon: 'pin', title: 'Своя геопозиция', text: 'Отправляй любую точку и маршрут, в том числе Live Location.' },
      { id: 'notes', icon: 'note', title: 'Заметки к контактам', text: 'Личная заметка в шапке чата — видна только тебе.' },
      { id: 'home', icon: 'layout', title: 'Удобный главный экран', text: 'Истории сверху, поиск под рукой, папки со счётчиками.' },
    ],
    compare: [
      { topic: 'Скрытые аккаунты по PIN', official: 'Один PIN на всё', ours: 'У каждого PIN свои аккаунты' },
      { topic: 'Сохранить из закрытого канала', official: 'Запрещено', ours: 'В галерею и «Избранное»' },
      { topic: 'Удалённые и изменённые сообщения', official: 'Пропадают', ours: 'Остаются' },
      { topic: 'Читать без «прочитано»', official: 'Нельзя', ours: 'Можно' },
      { topic: 'Медиа в чате', official: 'Только по дате', ours: 'Ещё и по размеру' },
      { topic: 'Смена голоса', official: 'Нет', ours: 'Низкий, робот, женский…' },
      { topic: 'Геопозиция', official: 'Только настоящая', ours: 'Любая точка, без Root' },
      { topic: 'Заметки к контактам', official: 'Нет', ours: 'Видны только тебе' },
    ],
    changelog: {
      version: '10.9.2', date: '27.10.2026',
      items: ['Сортировка медиа по размеру в профилях и каналах', 'Скрытые аккаунты по PIN-коду (Honeypot)', 'Заметки к контактам', 'Быстрее работают AR-маски', 'Обновлён архив переписок'],
    },
  },
  uz: {
    name: 'AndoGram',
    platform: 'Telegram uchun',
    tagline: 'Hammasi sening nazoratingdagi Telegram',
    lead: 'AyuGram asosidagi Telegram mijozi. Akkauntlarni turli PIN-kodlar ortiga yashiradi, saqlash taqiqlangan narsalarni saqlaydi, barcha shaxsiy yozishmalar arxivini yuritadi va rasmiy ilovada yo‘q ko‘p narsani qila oladi.',
    version: '10.9.2', size: '96,5 MB', android: '8.0+', updated: '27.10.2026',
    points: ['PIN-kod bilan yashirin akkauntlar', 'Yopiq kanallardan saqlash', 'Yozishmalar arxivi va ikkinchi telefon', '«O‘qildi» va «onlayn»siz', 'AR-niqoblar va ovozni o‘zgartirish'],
    top: [
      { id: 'honeypot', icon: 'key', demo: 'honeypot', title: 'Yashirin akkauntlar', text: 'Turli akkauntlarga turli PIN-kod qo‘y. «Xavfsiz» PIN ostida qolgan akkauntlar menyu va bildirishnomalardan yo‘qoladi, go‘yo ular yo‘qdek. Asosiy PIN hammasini ochadi.' },
      { id: 'no_forwards_bypass', icon: 'download', demo: 'no_forwards_bypass', title: 'Taqiqlanganni saqlash', text: 'Uzatish va saqlash o‘chirilgan kanal va chatlardagi rasm, video va fayllar — galereyaga yoki «Saqlanganlar»ga. Bunday chatlarda skrinshot ham ishlaydi.' },
      { id: 'archive_bridge', icon: 'archive', demo: 'archive_bridge', title: 'Shaxsiy arxiv va ikkinchi telefon', text: 'Barcha shaxsiy yozishmalar yopiq arxivingga ko‘chiriladi — har bir suhbatdosh uchun alohida mavzu, tahrirlangan va o‘chirilgan xabarlar bilan. Ikkinchi telefondan arxiv orqali asosiy akkaunt nomidan javob berish mumkin.' },
      { id: 'ar_masks', icon: 'scan', demo: 'ar_masks', title: 'Video-doirachalarda AR-niqoblar', text: 'Niqob yuzga o‘tiradi, u bilan birga harakatlanadi va bosh burilganda tushib ketmaydi.' },
      { id: 'voice_changer', icon: 'mic', title: 'Ovozni o‘zgartirish', text: 'Ovozli xabar yoz — va uni boshqa ovozda yubor: past, robot, ayol ovozi va boshqalar.' },
    ],
    more: [
      { id: 'deleted', icon: 'trash', title: 'O‘chirilgani qoladi', text: 'O‘chirilgan va tahrirlangan xabarlar chatdan yo‘qolmaydi.' },
      { id: 'ghost', icon: 'ghost', title: 'Ko‘rinmas rejim', text: '«O‘qildi» belgisisiz o‘qi va «onlayn» ko‘rinma.' },
      { id: 'sort', icon: 'sort', title: 'Media hajm bo‘yicha', text: 'Chat va kanallardagi fayllar — eng kattasidan kichigiga.' },
      { id: 'location', icon: 'pin', title: 'O‘z geolokatsiyang', text: 'Istalgan nuqta va marshrutni, jumladan Live Locationni yubor.' },
      { id: 'notes', icon: 'note', title: 'Kontaktlarga eslatmalar', text: 'Chat sarlavhasidagi shaxsiy eslatma — faqat senga ko‘rinadi.' },
      { id: 'home', icon: 'layout', title: 'Qulay bosh ekran', text: 'Hikoyalar tepada, qidiruv qo‘l ostida, hisoblagichli jildlar.' },
    ],
    compare: [
      { topic: 'PIN bilan yashirin akkauntlar', official: 'Hammasiga bitta PIN', ours: 'Har bir PINning o‘z akkauntlari' },
      { topic: 'Yopiq kanaldan saqlash', official: 'Taqiqlangan', ours: 'Galereya va «Saqlanganlar»ga' },
      { topic: 'O‘chirilgan va tahrirlangan xabarlar', official: 'Yo‘qoladi', ours: 'Qoladi' },
      { topic: '«O‘qildi»siz o‘qish', official: 'Mumkin emas', ours: 'Mumkin' },
      { topic: 'Chatdagi media', official: 'Faqat sana bo‘yicha', ours: 'Hajm bo‘yicha ham' },
      { topic: 'Ovozni o‘zgartirish', official: 'Yo‘q', ours: 'Past, robot, ayol…' },
      { topic: 'Geolokatsiya', official: 'Faqat haqiqiysi', ours: 'Istalgan nuqta, Rootsiz' },
      { topic: 'Kontaktlarga eslatmalar', official: 'Yo‘q', ours: 'Faqat senga ko‘rinadi' },
    ],
    changelog: {
      version: '10.9.2', date: '27.10.2026',
      items: ['Profil va kanallarda mediani hajm bo‘yicha saralash', 'PIN-kod bilan yashirin akkauntlar (Honeypot)', 'Kontaktlarga eslatmalar', 'AR-niqoblar tezroq ishlaydi', 'Yozishmalar arxivi yangilandi'],
    },
  },
  en: {
    name: 'AndoGram',
    platform: 'for Telegram',
    tagline: 'Telegram where you are in control',
    lead: 'A Telegram client built on AyuGram. It hides accounts behind different PINs, saves what you’re not allowed to save, keeps an archive of all your private chats and does plenty the official app can’t.',
    version: '10.9.2', size: '96.5 MB', android: '8.0+', updated: '27.10.2026',
    points: ['Hidden accounts by PIN', 'Saving from closed channels', 'Chat archive and a second phone', 'No “read” and no “online”', 'AR masks and a voice changer'],
    top: [
      { id: 'honeypot', icon: 'key', demo: 'honeypot', title: 'Hidden accounts', text: 'Put different PINs on different accounts. Under the “safe” PIN the other accounts vanish from the menu and notifications as if they didn’t exist. Your main PIN opens everything.' },
      { id: 'no_forwards_bypass', icon: 'download', demo: 'no_forwards_bypass', title: 'Save what’s locked', text: 'Photos, videos and files from channels and chats where forwarding and saving are off — to your gallery or Saved Messages. Screenshots work in those chats too.' },
      { id: 'archive_bridge', icon: 'archive', demo: 'archive_bridge', title: 'Private archive and a second phone', text: 'All your private chats are copied to your own closed archive — a topic per person, with edited and deleted messages. From a second phone you can reply from the archive as your main account.' },
      { id: 'ar_masks', icon: 'scan', demo: 'ar_masks', title: 'AR masks in video messages', text: 'The mask sits on the face, moves with it and stays on when you turn your head.' },
      { id: 'voice_changer', icon: 'mic', title: 'Voice changer', text: 'Record a voice message and send it in another voice: deep, robot, female and more.' },
    ],
    more: [
      { id: 'deleted', icon: 'trash', title: 'Deleted stays', text: 'Deleted and edited messages don’t disappear from the chat.' },
      { id: 'ghost', icon: 'ghost', title: 'Ghost mode', text: 'Read without the “read” mark and don’t show up “online”.' },
      { id: 'sort', icon: 'sort', title: 'Media by size', text: 'Files in chats and channels — from the biggest to the smallest.' },
      { id: 'location', icon: 'pin', title: 'Your own location', text: 'Send any point and route, Live Location included.' },
      { id: 'notes', icon: 'note', title: 'Contact notes', text: 'A private note in the chat header — only you see it.' },
      { id: 'home', icon: 'layout', title: 'A handier home screen', text: 'Stories on top, search at hand, folders with counters.' },
    ],
    compare: [
      { topic: 'Hidden accounts by PIN', official: 'One PIN for all', ours: 'Each PIN has its own accounts' },
      { topic: 'Save from a closed channel', official: 'Not allowed', ours: 'To gallery and Saved Messages' },
      { topic: 'Deleted and edited messages', official: 'Gone', ours: 'Stay' },
      { topic: 'Read without “read”', official: 'Can’t', ours: 'Can' },
      { topic: 'Media in a chat', official: 'Only by date', ours: 'By size too' },
      { topic: 'Voice changer', official: 'No', ours: 'Deep, robot, female…' },
      { topic: 'Location', official: 'Only the real one', ours: 'Any point, no root' },
      { topic: 'Contact notes', official: 'No', ours: 'Only you see them' },
    ],
    changelog: {
      version: '10.9.2', date: '27.10.2026',
      items: ['Media sorting by size in profiles and channels', 'Hidden accounts by PIN (Honeypot)', 'Contact notes', 'Faster AR masks', 'Chat archive updated'],
    },
  },
};

const ANDUSTA: Record<Language, AppCopy> = {
  ru: {
    name: 'Andusta',
    platform: 'для Instagram',
    tagline: 'Второй Instagram — со своими возможностями',
    lead: 'Отдельное приложение Instagram, которое ставится рядом с обычным. Истории без отметки «просмотрено», одноразовые фото ещё раз, своя музыка, свои шрифты и другие мелочи, которых нет в оригинале.',
    version: '1.0.0', size: '370 МБ', android: '8.0+', updated: '27.10.2026',
    points: ['Истории без «просмотрено»', 'Одноразовые фото — ещё раз', 'Своя музыка в историях', 'Сохранение фото с экрана', 'Ставится рядом с Instagram'],
    top: [
      { id: 'ghost_mode', icon: 'ghost', title: 'Истории невидимкой', text: 'Смотри истории без отметки «просмотрено» — тебя не будет в списке зрителей.' },
      { id: 'view_once', icon: 'eye', title: 'Одноразовые фото — ещё раз', text: 'Одноразовое фото в Direct не сгорает после первого просмотра: его можно открыть повторно.' },
      { id: 'music_unlocker', icon: 'music', title: 'Своя музыка в историях', text: 'Выбери трек с телефона — при съёмке истории он заменит звук или смешается с голосом.' },
      { id: 'save_photo', icon: 'image', title: 'Фото с экрана — в галерею', text: 'Сохраняй фото, которое видишь на экране, прямо в галерею. Скриншоты не запрещены.' },
      { id: 'fonts', icon: 'type', title: 'Свои шрифты и крупные аватарки', text: 'Набор шрифтов или свой .ttf; аватарка крупно по долгому нажатию.' },
    ],
    more: [
      { id: 'twin', icon: 'layout', title: 'Рядом с Instagram', text: 'Отдельное приложение: обычный Instagram остаётся на месте.' },
      { id: 'voice', icon: 'mic', title: 'Смена голоса в Direct', text: 'Отправляй голосовые другим голосом.' },
      { id: 'ads', icon: 'shield', title: 'Меньше слежки', text: 'Часть рекламных трекеров отключена.' },
      { id: 'unfollowers', icon: 'user-minus', title: 'Кто отписался', text: 'Сверка подписчиков на телефоне. Пока тест: в этой версии ещё не срабатывает.', test: true },
      { id: 'anti_unsend', icon: 'trash', title: 'Анти-удаление', text: 'Пробует сохранить сообщение, которое собеседник удалил. Пока тест.', test: true },
    ],
    compare: [
      { topic: 'Смотреть истории тайно', official: 'Автор видит тебя', ours: 'Без «просмотрено»' },
      { topic: 'Одноразовое фото', official: 'Сгорает', ours: 'Можно открыть ещё раз' },
      { topic: 'Скриншоты', official: 'Бывают запрещены', ours: 'Разрешены' },
      { topic: 'Второй Instagram', official: 'Только одно приложение', ours: 'Ставится рядом' },
      { topic: 'Музыка в историях', official: 'Только из каталога', ours: 'Свой трек с телефона' },
      { topic: 'Шрифты', official: 'Системный', ours: 'Набор + свой .ttf' },
      { topic: 'Кто отписался', official: 'Нет', ours: 'Тест', test: true },
    ],
    changelog: {
      version: '1.0.0', date: '27.10.2026',
      items: ['Первый выпуск: отдельное приложение рядом с Instagram', 'Истории и Direct без «просмотрено», скрытие «печатает…»', 'Одноразовые фото — ещё раз', 'Скриншоты разрешены', 'Сохранение фото с экрана в галерею'],
    },
  },
  uz: {
    name: 'Andusta',
    platform: 'Instagram uchun',
    tagline: 'O‘z imkoniyatlariga ega ikkinchi Instagram',
    lead: 'Oddiy Instagram yonida o‘rnatiladigan alohida Instagram ilovasi. «Ko‘rildi» belgisisiz hikoyalar, bir martalik rasmlarni qayta ko‘rish, o‘z musiqang, o‘z shriftlaring va aslida yo‘q boshqa qulayliklar.',
    version: '1.0.0', size: '370 MB', android: '8.0+', updated: '27.10.2026',
    points: ['«Ko‘rildi»siz hikoyalar', 'Bir martalik rasm — yana', 'Hikoyalarda o‘z musiqang', 'Ekrandagi rasmni saqlash', 'Instagram yonida o‘rnatiladi'],
    top: [
      { id: 'ghost_mode', icon: 'ghost', title: 'Ko‘rinmas hikoyalar', text: 'Hikoyalarni «ko‘rildi» belgisisiz ko‘r — sen ko‘ruvchilar ro‘yxatida bo‘lmaysan.' },
      { id: 'view_once', icon: 'eye', title: 'Bir martalik rasm — yana bir bor', text: 'Directdagi bir martalik rasm birinchi ko‘rishdan keyin yo‘qolmaydi: uni qayta ochish mumkin.' },
      { id: 'music_unlocker', icon: 'music', title: 'Hikoyalarda o‘z musiqang', text: 'Telefondan trek tanla — hikoya suratga olinayotganda u ovozni almashtiradi yoki ovozing bilan aralashadi.' },
      { id: 'save_photo', icon: 'image', title: 'Ekrandagi rasm — galereyaga', text: 'Ekranda ko‘rib turgan rasmni to‘g‘ridan-to‘g‘ri galereyaga saqla. Skrinshot taqiqlanmagan.' },
      { id: 'fonts', icon: 'type', title: 'O‘z shriftlaring va katta avatarlar', text: 'Shriftlar to‘plami yoki o‘z .ttf fayling; uzoq bosilganda avatar kattaroq.' },
    ],
    more: [
      { id: 'twin', icon: 'layout', title: 'Instagram yonida', text: 'Alohida ilova: oddiy Instagram joyida qoladi.' },
      { id: 'voice', icon: 'mic', title: 'Directda ovozni o‘zgartirish', text: 'Ovozli xabarlarni boshqa ovozda yubor.' },
      { id: 'ads', icon: 'shield', title: 'Kamroq kuzatuv', text: 'Reklama kuzatuvchilarining bir qismi o‘chirilgan.' },
      { id: 'unfollowers', icon: 'user-minus', title: 'Kim obunani bekor qildi', text: 'Obunachilarni telefonda solishtirish. Hozircha sinov: bu versiyada hali ishlamaydi.', test: true },
      { id: 'anti_unsend', icon: 'trash', title: 'O‘chirishga qarshi', text: 'Suhbatdosh o‘chirgan xabarni saqlab qolishga harakat qiladi. Hozircha sinov.', test: true },
    ],
    compare: [
      { topic: 'Hikoyalarni yashirin ko‘rish', official: 'Muallif seni ko‘radi', ours: '«Ko‘rildi»siz' },
      { topic: 'Bir martalik rasm', official: 'Yo‘qoladi', ours: 'Yana ochish mumkin' },
      { topic: 'Skrinshotlar', official: 'Ba’zan taqiqlanadi', ours: 'Ruxsat etilgan' },
      { topic: 'Ikkinchi Instagram', official: 'Faqat bitta ilova', ours: 'Yonida o‘rnatiladi' },
      { topic: 'Hikoyalardagi musiqa', official: 'Faqat katalogdan', ours: 'Telefondagi o‘z treking' },
      { topic: 'Shriftlar', official: 'Tizim shrifti', ours: 'To‘plam + o‘z .ttf' },
      { topic: 'Kim obunani bekor qildi', official: 'Yo‘q', ours: 'Sinov', test: true },
    ],
    changelog: {
      version: '1.0.0', date: '27.10.2026',
      items: ['Ilk reliz: Instagram yonidagi alohida ilova', 'Hikoya va Direct «ko‘rildi»siz, «yozmoqda…»ni yashirish', 'Bir martalik rasmni qayta ko‘rish', 'Skrinshotlarga ruxsat', 'Ekrandagi rasmni galereyaga saqlash'],
    },
  },
  en: {
    name: 'Andusta',
    platform: 'for Instagram',
    tagline: 'A second Instagram with features of its own',
    lead: 'A separate Instagram app that installs next to the regular one. Stories without the “seen” mark, view-once photos again, your own music, your own fonts and other touches the original lacks.',
    version: '1.0.0', size: '370 MB', android: '8.0+', updated: '27.10.2026',
    points: ['Stories without “seen”', 'View-once photos again', 'Your own music in stories', 'Save photos from the screen', 'Installs next to Instagram'],
    top: [
      { id: 'ghost_mode', icon: 'ghost', title: 'Stories in ghost mode', text: 'Watch stories without the “seen” mark — you won’t appear in the viewers list.' },
      { id: 'view_once', icon: 'eye', title: 'View-once photos, again', text: 'A view-once photo in Direct doesn’t burn after the first look: you can open it again.' },
      { id: 'music_unlocker', icon: 'music', title: 'Your own music in stories', text: 'Pick a track from your phone — while you record a story it replaces the sound or mixes with your voice.' },
      { id: 'save_photo', icon: 'image', title: 'Photos from the screen — to the gallery', text: 'Save the photo you see on the screen straight to your gallery. Screenshots aren’t blocked.' },
      { id: 'fonts', icon: 'type', title: 'Your own fonts and bigger avatars', text: 'A set of fonts or your own .ttf; a bigger avatar on long press.' },
    ],
    more: [
      { id: 'twin', icon: 'layout', title: 'Next to Instagram', text: 'A separate app: the regular Instagram stays where it is.' },
      { id: 'voice', icon: 'mic', title: 'Voice changer in Direct', text: 'Send voice messages in another voice.' },
      { id: 'ads', icon: 'shield', title: 'Less tracking', text: 'Some ad trackers are switched off.' },
      { id: 'unfollowers', icon: 'user-minus', title: 'Who unfollowed', text: 'Followers compared on your phone. Still a beta: it doesn’t work in this version yet.', test: true },
      { id: 'anti_unsend', icon: 'trash', title: 'Anti-unsend', text: 'Tries to keep a message the other person deleted. Still a beta.', test: true },
    ],
    compare: [
      { topic: 'Watch stories secretly', official: 'The author sees you', ours: 'No “seen” mark' },
      { topic: 'View-once photo', official: 'Burns', ours: 'Can be opened again' },
      { topic: 'Screenshots', official: 'Sometimes blocked', ours: 'Allowed' },
      { topic: 'A second Instagram', official: 'One app only', ours: 'Installs alongside' },
      { topic: 'Music in stories', official: 'Catalog only', ours: 'Your own track' },
      { topic: 'Fonts', official: 'System font', ours: 'A set + your own .ttf' },
      { topic: 'Who unfollowed', official: 'No', ours: 'Beta', test: true },
    ],
    changelog: {
      version: '1.0.0', date: '27.10.2026',
      items: ['First release: a separate app next to Instagram', 'Stories and Direct without “seen”, hide “typing…”', 'Reopen view-once photos', 'Screenshots allowed', 'Save photos from the screen to the gallery'],
    },
  },
};

/* Andeo — the video & music player (repo Bgnnrscrt/andeo). Not on sale yet: no buy button, «coming soon · 300 ★» (owner 10.11).
 * Claims follow the app's code (10.11.2026): see /root/Apps/andeo/CLAUDE.md. Size = the release APK (4 956 610 B). */
const ANDEO: Record<Language, AppCopy> = {
  ru: {
    name: 'Andeo',
    platform: 'видео и музыка',
    rival: 'Галерея',
    compareTitle: 'Сравнение с обычной галереей',
    price: '300 ★',
    tagline: 'Плеер, который хранит твои секреты',
    lead: 'Видео- и музыкальный плеер для Android. Прячет файлы в зашифрованный Сейф под PIN-кодом, спасает удалённые видео и хранит их без срока, управляется жестами. Без аккаунтов и облаков — всё остаётся на твоём телефоне.',
    version: '1.0', size: '4,7 МБ', android: '7.0+', updated: '10.11.2026',
    points: ['Сейф с шифрованием под PIN-кодом', 'Корзина без срока хранения', 'Сейф и корзина переживают переустановку', 'Ускорение и перемотка пальцем', 'Музыка в фоне и виджет'],
    top: [
      { id: 'vault', icon: 'lock', title: 'Сейф под PIN-кодом', text: 'Спрячь видео, музыку или целую папку: файлы шифруются (AES-256) и исчезают из галереи и других приложений. Смотреть и слушать их можно прямо в Сейфе — он запирается, как только сворачиваешь приложение.' },
      { id: 'trash', icon: 'trash', title: 'Неуязвимая корзина', text: 'Видео длиннее 3 секунд, удалённые в галерее, Andeo копирует к себе и хранит без срока, пока ты сам их не удалишь. Восстановить — одним нажатием, на прежнее место и с прежним именем.' },
      { id: 'reinstall', icon: 'restore', title: 'Переживает переустановку', text: 'Сейф и корзина лежат в скрытой папке на телефоне. Удалил Andeo и поставил снова — корзина вернётся сама, а Сейф откроется прежним PIN-кодом. Нужно разрешение «Доступ ко всем файлам».' },
      { id: 'gestures', icon: 'hand', title: 'Управление жестами', text: 'У левого края — яркость, у правого — громкость, свайп по центру — переключение видео. Двойной тап — ±10 секунд, тройной — ±1 минута, двумя пальцами — зум.' },
      { id: 'speed', icon: 'fast', title: 'Ускорение пальцем', text: 'Держи палец справа — видео ускоряется (от 1,5x до 10x, обычно 2x), слева — плавно идёт назад. Отпустил — обычная скорость.' },
    ],
    more: [
      { id: 'music', icon: 'music', title: 'Музыка в фоне', text: 'Играет со свёрнутым приложением, на экране блокировки и в шторке, слушается кнопок наушников. Есть виджет на рабочий стол.' },
      { id: 'view', icon: 'expand', title: 'Картинка как надо', text: 'Пропорции 16:9, 9:16, 1:1, 3:4 или по размеру экрана, картинка в картинке, блокировка экрана от случайных касаний.' },
      { id: 'audio', icon: 'audio', title: 'Звук из видео', text: 'Достаёт звук из видео в файл M4A и кладёт в «Музыку».' },
      { id: 'trim', icon: 'scissors', title: 'Обрезка без потерь', text: 'Вырежи нужный кусок видео — без перекодирования, качество не падает.' },
      { id: 'playlists', icon: 'playlist', title: 'Плейлисты', text: 'Собирай видео и музыку в одни плейлисты, играй подряд или вперемешку.' },
      { id: 'files', icon: 'folder', title: 'Файлы под контролем', text: 'Перенос, копирование и переименование с отменой. Имя занято — «оставить оба», «заменить» или «пропустить».' },
    ],
    compare: [
      { topic: 'Шифровать скрытые файлы', official: 'Нет', ours: 'AES-256, ключ под PIN-кодом' },
      { topic: 'Удалённые видео', official: 'Через 30 дней — навсегда', ours: 'Хранятся без срока' },
      { topic: 'Ускорение удержанием', official: 'Нет', ours: 'Вперёд до 10x и назад' },
      { topic: 'Звук из видео', official: 'Нет', ours: 'В M4A, в «Музыку»' },
      { topic: 'Музыка в фоне', official: 'Нет', ours: 'Экран блокировки, наушники, виджет' },
      { topic: 'Плейлисты', official: 'Нет', ours: 'Видео и музыка вместе' },
    ],
    changelog: {
      version: '1.0', date: '10.11.2026',
      items: ['Зоны жестов: яркость и громкость у краёв, переключение видео в центре', 'Сейф и корзина переживают переустановку', 'Сейф запирается, как только сворачиваешь приложение', 'Звук из видео — в M4A', 'Поддержка Android 16'],
    },
  },
  uz: {
    name: 'Andeo',
    platform: 'video va musiqa',
    rival: 'Galereya',
    compareTitle: 'Oddiy galereya bilan taqqoslash',
    price: '300 ★',
    tagline: 'Sirlaringni saqlaydigan pleyer',
    lead: 'Android uchun video va musiqa pleyeri. Fayllarni PIN-kod ostidagi shifrlangan Seyfga yashiradi, o‘chirilgan videolarni qutqaradi va muddatsiz saqlaydi, imo-ishoralar bilan boshqariladi. Akkaunt va bulutlarsiz — hammasi telefoningda qoladi.',
    version: '1.0', size: '4,7 MB', android: '7.0+', updated: '10.11.2026',
    points: ['PIN-kodli shifrlangan Seyf', 'Muddatsiz savat', 'Seyf va savat qayta o‘rnatishdan keyin ham qoladi', 'Barmoq bilan tezlatish va orqaga o‘tkazish', 'Fonda musiqa va vidjet'],
    top: [
      { id: 'vault', icon: 'lock', title: 'PIN-kod ostidagi Seyf', text: 'Video, musiqa yoki butun jildni yashir: fayllar shifrlanadi (AES-256) va galereya hamda boshqa ilovalardan yo‘qoladi. Ularni Seyfning o‘zida ko‘rish va tinglash mumkin — ilovani yig‘ishing bilan u qulflanadi.' },
      { id: 'trash', icon: 'trash', title: 'Yo‘qolmaydigan savat', text: 'Galereyada o‘chirilgan 3 soniyadan uzun videolarni Andeo o‘ziga nusxalaydi va sen o‘zing o‘chirmaguningcha muddatsiz saqlaydi. Tiklash — bir bosishda, avvalgi joyiga va avvalgi nomi bilan.' },
      { id: 'reinstall', icon: 'restore', title: 'Qayta o‘rnatishdan keyin ham qoladi', text: 'Seyf va savat telefondagi yashirin jildda turadi. Andeoni o‘chirib, qayta o‘rnatsang — savat o‘zi qaytadi, Seyf esa avvalgi PIN-kod bilan ochiladi. «Barcha fayllarga kirish» ruxsati kerak.' },
      { id: 'gestures', icon: 'hand', title: 'Imo-ishoralar bilan boshqaruv', text: 'Chap chetda — yorqinlik, o‘ng chetda — ovoz balandligi, markazda surish — videoni almashtirish. Ikki marta bosish — ±10 soniya, uch marta — ±1 daqiqa, ikki barmoq — kattalashtirish.' },
      { id: 'speed', icon: 'fast', title: 'Barmoq bilan tezlatish', text: 'Barmog‘ingni o‘ngda ushlab tur — video tezlashadi (1,5x dan 10x gacha, odatda 2x), chapda — silliq orqaga ketadi. Qo‘yib yubording — oddiy tezlik.' },
    ],
    more: [
      { id: 'music', icon: 'music', title: 'Fonda musiqa', text: 'Ilova yig‘ilganda, qulf ekranida va bildirishnomalar panelida ijro etiladi, quloqchin tugmalariga bo‘ysunadi. Ish stoli uchun vidjet bor.' },
      { id: 'view', icon: 'expand', title: 'Tasvir qanday kerak bo‘lsa', text: '16:9, 9:16, 1:1, 3:4 nisbatlari yoki ekran bo‘yicha, rasm ichida rasm, tasodifiy bosishlardan ekran qulfi.' },
      { id: 'audio', icon: 'audio', title: 'Videodan ovoz', text: 'Videodan ovozni M4A faylga ajratib, «Musiqa» jildiga qo‘yadi.' },
      { id: 'trim', icon: 'scissors', title: 'Sifatni yo‘qotmay qirqish', text: 'Videoning kerakli qismini qirqib ol — qayta kodlashsiz, sifat pasaymaydi.' },
      { id: 'playlists', icon: 'playlist', title: 'Pleylistlar', text: 'Video va musiqani bitta pleylistga yig‘, ketma-ket yoki aralash ijro et.' },
      { id: 'files', icon: 'folder', title: 'Fayllar nazoratda', text: 'Ko‘chirish, nusxalash va qayta nomlash — bekor qilish imkoni bilan. Nom band bo‘lsa — «ikkalasini qoldirish», «almashtirish» yoki «o‘tkazib yuborish».' },
    ],
    compare: [
      { topic: 'Yashirin fayllarni shifrlash', official: 'Yo‘q', ours: 'AES-256, kalit PIN-kod ostida' },
      { topic: 'O‘chirilgan videolar', official: '30 kundan keyin — butunlay', ours: 'Muddatsiz saqlanadi' },
      { topic: 'Ushlab turib tezlatish', official: 'Yo‘q', ours: 'Oldinga 10x gacha va orqaga' },
      { topic: 'Videodan ovoz', official: 'Yo‘q', ours: 'M4A, «Musiqa»ga' },
      { topic: 'Fonda musiqa', official: 'Yo‘q', ours: 'Qulf ekrani, quloqchin, vidjet' },
      { topic: 'Pleylistlar', official: 'Yo‘q', ours: 'Video va musiqa birga' },
    ],
    changelog: {
      version: '1.0', date: '10.11.2026',
      items: ['Imo-ishora zonalari: yorqinlik va ovoz — chetlarda, videoni almashtirish — markazda', 'Seyf va savat qayta o‘rnatishdan keyin ham qoladi', 'Ilovani yig‘ishing bilan Seyf qulflanadi', 'Videodan ovoz — M4A formatida', 'Android 16 qo‘llab-quvvatlanadi'],
    },
  },
  en: {
    name: 'Andeo',
    platform: 'video & music',
    rival: 'Gallery',
    compareTitle: 'Compared with the stock gallery',
    price: '300 ★',
    tagline: 'A player that keeps your secrets',
    lead: 'A video and music player for Android. It hides files in an encrypted PIN-locked Vault, rescues deleted videos and keeps them with no time limit, and runs on gestures. No accounts, no clouds — everything stays on your phone.',
    version: '1.0', size: '4.7 MB', android: '7.0+', updated: '10.11.2026',
    points: ['Encrypted Vault behind a PIN', 'A trash bin with no time limit', 'Vault and trash survive a reinstall', 'Speed up and rewind with a finger', 'Background music and a widget'],
    top: [
      { id: 'vault', icon: 'lock', title: 'A PIN-locked Vault', text: 'Hide videos, music or a whole folder: files get encrypted (AES-256) and vanish from the gallery and other apps. Watch and listen right inside the Vault — it locks as soon as you leave the app.' },
      { id: 'trash', icon: 'trash', title: 'A trash bin that doesn’t forget', text: 'Videos longer than 3 seconds deleted in the gallery are copied into Andeo and kept with no time limit until you delete them yourself. Restoring takes one tap — back to the same folder, with the same name.' },
      { id: 'reinstall', icon: 'restore', title: 'Survives a reinstall', text: 'The Vault and the trash live in a hidden folder on the phone. Uninstall Andeo and install it again — the trash comes back by itself, and the Vault opens with your old PIN. Needs the “All files access” permission.' },
      { id: 'gestures', icon: 'hand', title: 'Gesture control', text: 'Left edge — brightness, right edge — volume, swipe in the middle — switch videos. Double tap — ±10 seconds, triple tap — ±1 minute, two fingers — zoom.' },
      { id: 'speed', icon: 'fast', title: 'Speed up with a finger', text: 'Hold your finger on the right — the video speeds up (1.5x to 10x, 2x by default); on the left — it rewinds smoothly. Let go — normal speed.' },
    ],
    more: [
      { id: 'music', icon: 'music', title: 'Background music', text: 'Keeps playing with the app minimized, on the lock screen and in the notification shade, and obeys your headphone buttons. There’s a home-screen widget.' },
      { id: 'view', icon: 'expand', title: 'The picture you want', text: '16:9, 9:16, 1:1, 3:4 or fit to screen, picture-in-picture and a screen lock against accidental taps.' },
      { id: 'audio', icon: 'audio', title: 'Sound from video', text: 'Pulls the sound out of a video into an M4A file and puts it in Music.' },
      { id: 'trim', icon: 'scissors', title: 'Lossless trim', text: 'Cut out the part of a video you need — no re-encoding, no quality loss.' },
      { id: 'playlists', icon: 'playlist', title: 'Playlists', text: 'Mix videos and music in one playlist, play in order or shuffled.' },
      { id: 'files', icon: 'folder', title: 'Files under control', text: 'Move, copy and rename with undo. Name taken — “keep both”, “replace” or “skip”.' },
    ],
    compare: [
      { topic: 'Encrypt hidden files', official: 'No', ours: 'AES-256, key behind a PIN' },
      { topic: 'Deleted videos', official: 'Gone after 30 days', ours: 'Kept with no time limit' },
      { topic: 'Hold to speed up', official: 'No', ours: 'Forward up to 10x and back' },
      { topic: 'Sound from video', official: 'No', ours: 'M4A, into Music' },
      { topic: 'Background music', official: 'No', ours: 'Lock screen, headphones, widget' },
      { topic: 'Playlists', official: 'No', ours: 'Videos and music together' },
    ],
    changelog: {
      version: '1.0', date: '10.11.2026',
      items: ['Gesture zones: brightness and volume at the edges, switching videos in the middle', 'Vault and trash survive a reinstall', 'The Vault locks as soon as you leave the app', 'Sound from video — as M4A', 'Android 16 support'],
    },
  },
};

export const APPS: Record<SiteAppId, Record<Language, AppCopy>> = { andogram: ANDOGRAM, andusta: ANDUSTA, andeo: ANDEO };

/** Apps on sale (the access window → the bot: buy_<app>). */
export const APP_IDS: AppId[] = ['andogram', 'andusta'];

/** Every app on the site, in display order (cards, tabs, menu, footer). Those not in APP_IDS are «coming soon». */
export const SITE_APP_IDS: SiteAppId[] = ['andogram', 'andusta', 'andeo'];

export const isOnSale = (id: SiteAppId): id is AppId => (APP_IDS as SiteAppId[]).includes(id);

export const BOT_URL = 'https://t.me/andouzbot';
