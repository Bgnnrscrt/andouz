import type { Language } from '../../types';
import type { DemoPageCopy } from './commonCopy';
import type { DemoId } from './demos';

/*
 * Texts of the «Как работает» pages (title, lead, who is who), 3 languages.
 * Apart from the sandboxes' own copy: the page text loads without them (each
 * sandbox is its own lazy chunk, see views/DemoView.tsx).
 */

const HONEYPOT: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Honeypot-пароли',
    lead: 'В AndoGram можно завести несколько PIN-кодов. Каждый открывает только свои аккаунты, а остальные исчезают из меню и уведомлений — будто их нет. Главный PIN-код по-прежнему открывает всё. Заставили разблокировать телефон? Введи PIN, за которым нет ничего лишнего.',
    rolesTitle: 'PIN-коды в демо',
    roles: [
      { badge: '1111', tone: 'a', who: 'Безопасный.', what: 'Почти пустой аккаунт — для чужих глаз' },
      { badge: '2222', tone: 'c', who: 'Личный.', what: 'Жена, семья, близкие' },
      { badge: '3333', tone: 'b', who: 'Рабочий.', what: 'Два аккаунта: коллеги и клиенты' },
      { badge: '4444', tone: 'd', who: 'Секретный.', what: 'То, о чём знаешь только ты' },
    ],
  },
  uz: {
    title: 'Honeypot parollari',
    lead: 'AndoGram’da bir nechta PIN-kod o‘rnatish mumkin. Har biri faqat o‘z akkauntlarini ochadi, qolganlari esa menyu va bildirishnomalardan yo‘qoladi — go‘yo ular umuman yo‘qdek. Asosiy PIN-kod esa avvalgidek hammasini ochadi. Telefonni ochishga majburlashdimi? Ortiqcha hech narsani ko‘rsatmaydigan PIN-kodni kiriting.',
    rolesTitle: 'Demodagi PIN-kodlar',
    roles: [
      { badge: '1111', tone: 'a', who: 'Xavfsiz.', what: 'Deyarli bo‘sh akkaunt — begona ko‘zlar uchun' },
      { badge: '2222', tone: 'c', who: 'Shaxsiy.', what: 'Xotin, oila, yaqinlar' },
      { badge: '3333', tone: 'b', who: 'Ish.', what: 'Ikki akkaunt: hamkasblar va mijozlar' },
      { badge: '4444', tone: 'd', who: 'Maxfiy.', what: 'Faqat o‘zingiz biladigan narsalar' },
    ],
  },
  en: {
    title: 'Duress passcodes (Honeypot)',
    lead: 'AndoGram lets you set several PIN codes. Each one opens only its own accounts; the rest disappear from the menu and notifications as if they weren’t there. Your main PIN still opens everything. Forced to unlock your phone? Enter the PIN that shows nothing extra.',
    rolesTitle: 'PIN codes in this demo',
    roles: [
      { badge: '1111', tone: 'a', who: 'Safe.', what: 'A nearly empty account for prying eyes' },
      { badge: '2222', tone: 'c', who: 'Personal.', what: 'Wife, family, loved ones' },
      { badge: '3333', tone: 'b', who: 'Work.', what: 'Two accounts: colleagues and clients' },
      { badge: '4444', tone: 'd', who: 'Secret.', what: 'Things only you know about' },
    ],
  },
};

const NO_FORWARDS: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Обход защиты No-Forwards',
    lead: 'Каналы и группы могут запретить сохранять и пересылать свои посты. В официальном Telegram у таких постов просто нет кнопок «Сохранить» и «Переслать». В AndoGram они на месте: видео и фото сохраняются в галерею или в «Избранное».',
    rolesTitle: 'Что сравниваем',
    roles: [
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: 'Сохраняет и пересылает даже из защищённых каналов' },
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'Официальное приложение: кнопок «Сохранить» и «Переслать» нет' },
    ],
  },
  uz: {
    title: 'No-Forwards himoyasini chetlab o‘tish',
    lead: 'Kanal va guruhlar o‘z postlarini saqlash va uzatishni taqiqlashi mumkin. Rasmiy Telegram’da bunday postlarda «Saqlash» va «Uzatish» tugmalari shunchaki yo‘q. AndoGram’da esa ular joyida: video va rasmlar galereyaga yoki «Saqlangan xabarlar»ga saqlanadi.',
    rolesTitle: 'Nimani solishtiramiz',
    roles: [
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: 'Himoyalangan kanallardan ham saqlaydi va uzatadi' },
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'Rasmiy ilova: «Saqlash» va «Uzatish» tugmalari yo‘q' },
    ],
  },
  en: {
    title: 'No-Forwards bypass',
    lead: 'Channels and groups can forbid saving and forwarding their posts. In the official Telegram such posts simply have no “Save” or “Forward” buttons. In AndoGram they are there: videos and photos go to your gallery or to Saved Messages.',
    rolesTitle: 'What we compare',
    roles: [
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: 'Saves and forwards even from protected channels' },
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'The official app: no “Save” and no “Forward”' },
    ],
  },
};

const BRIDGE: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Личный архив и мост A-B-C',
    lead: 'AndoGram сам копирует личные переписки в закрытую группу «Личный архив» — по отдельной теме на каждого собеседника. Там остаётся даже то, что потом изменили или удалили. А из архива можно отвечать со второго телефона от имени основного аккаунта.',
    rolesTitle: 'Кто есть кто',
    roles: [
      { badge: 'A', tone: 'a', who: 'Ты — Максим.', what: 'Телефон с AndoGram' },
      { badge: 'B', tone: 'b', who: 'Твой второй аккаунт.', what: 'Любой Telegram, даже официальный' },
      { badge: 'C', tone: 'c', who: 'Даниль.', what: 'Обычный собеседник' },
    ],
  },
  uz: {
    title: 'Shaxsiy arxiv va A-B-C ko‘prigi',
    lead: 'AndoGram shaxsiy yozishmalarni «Shaxsiy arxiv» yopiq guruhiga o‘zi nusxalaydi — har bir suhbatdosh uchun alohida mavzu bilan. Keyin tahrirlangan yoki o‘chirilgan xabarlar ham saqlanib qoladi. Arxivdan esa ikkinchi telefondan asosiy akkaunt nomidan javob berish mumkin.',
    rolesTitle: 'Kim kim',
    roles: [
      { badge: 'A', tone: 'a', who: 'Siz — Aziz.', what: 'AndoGram o‘rnatilgan telefon' },
      { badge: 'B', tone: 'b', who: 'Ikkinchi akkauntingiz.', what: 'Istalgan Telegram, hatto rasmiysi ham' },
      { badge: 'C', tone: 'c', who: 'Sanjar.', what: 'Oddiy suhbatdosh' },
    ],
  },
  en: {
    title: 'Personal archive & the A-B-C bridge',
    lead: 'AndoGram copies your private chats into a closed “Personal archive” group by itself — one topic per contact. Even messages edited or deleted later stay there. And from the archive you can reply from a second phone as your main account.',
    rolesTitle: 'Who is who',
    roles: [
      { badge: 'A', tone: 'a', who: 'You — Max.', what: 'The phone with AndoGram' },
      { badge: 'B', tone: 'b', who: 'Your second account.', what: 'Any Telegram, even the official one' },
      { badge: 'C', tone: 'c', who: 'Alex.', what: 'A regular contact' },
    ],
  },
};

const PAGES: Record<DemoId, Record<Language, DemoPageCopy>> = {
  honeypot: HONEYPOT,
  no_forwards_bypass: NO_FORWARDS,
  archive_bridge: BRIDGE,
};

export const getDemoPageCopy = (id: DemoId, lang: Language): DemoPageCopy => PAGES[id][lang];
