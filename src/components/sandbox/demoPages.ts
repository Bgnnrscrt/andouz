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
      { badge: '7777', tone: 'e', who: 'Главный.', what: 'Все аккаунты сразу' },
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
      { badge: '7777', tone: 'e', who: 'Asosiy.', what: 'Barcha akkauntlar birdaniga' },
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
      { badge: '7777', tone: 'e', who: 'Main.', what: 'All accounts at once' },
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

const AR_MASKS: Record<Language, DemoPageCopy> = {
  ru: {
    title: '3D AR-маски в кружках',
    lead: 'В обычном Telegram кружок — просто видео с камеры. В AndoGram при записи кружка под ним есть маски: AR-движок MediaPipe следит за 468 точками лица, и маска сидит на нём как настоящая, даже когда ты двигаешься.',
    rolesTitle: 'Что сравниваем',
    roles: [
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'Кружок без масок и эффектов' },
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: '3D-маски прямо при записи кружка' },
    ],
  },
  uz: {
    title: 'Dumaloq videolarda 3D AR-niqoblar',
    lead: 'Oddiy Telegram’da dumaloq video — shunchaki kamera videosi. AndoGram’da dumaloq video yozayotganda uning ostida niqoblar bor: MediaPipe AR-dvijogi yuzning 468 nuqtasini kuzatadi va niqob harakatlansangiz ham haqiqiydek turadi.',
    rolesTitle: 'Nimani solishtiramiz',
    roles: [
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'Niqob va effektlarsiz dumaloq video' },
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: 'Dumaloq video yozishda 3D-niqoblar' },
    ],
  },
  en: {
    title: '3D AR masks in video messages',
    lead: 'In regular Telegram a video message is just your camera. In AndoGram the masks are right under the circle while you record: the MediaPipe AR engine tracks 468 points of your face, so the mask sits like a real one even as you move.',
    rolesTitle: 'What we compare',
    roles: [
      { badge: 'T', tone: 'b', who: 'Telegram.', what: 'Video messages without masks or effects' },
      { badge: 'A', tone: 'a', who: 'AndoGram.', what: '3D masks right while you record' },
    ],
  },
};

/* Andusta (scenario 2026-11-03). Pages say only what the app does (§4 «Честно о функциях»). */

const GHOST_STORIES: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Невидимка в историях',
    lead: 'Andusta не отправляет автору отметку «просмотрено». Ты смотришь историю — а в списке зрителей тебя нет. Невидимка включается в меню ⚡, в карточке «Приватность».',
    rolesTitle: 'Кто в демо',
    roles: [
      { badge: 'Ты', tone: 'b', who: 'Максим.', what: 'Смотришь историю — сначала в Instagram, потом в Andusta' },
      { badge: 'Она', tone: 'd', who: 'Лиза 💔.', what: 'Бывшая. Смотрит, кто видел её историю' },
    ],
  },
  uz: {
    title: 'Hikoyalarda ko‘rinmaslik',
    lead: 'Andusta muallifga «ko‘rildi» belgisini yubormaydi. Siz hikoyani ko‘rasiz — ko‘rganlar ro‘yxatida esa yo‘qsiz. Bu ⚡ menyusidagi «Maxfiylik» kartasida yoqiladi.',
    rolesTitle: 'Demoda kimlar',
    roles: [
      { badge: 'Siz', tone: 'b', who: 'Aziz.', what: 'Hikoyani ko‘rasiz — avval Instagram’da, keyin Andusta’da' },
      { badge: 'U', tone: 'd', who: 'Sabina 💔.', what: 'Sobiq qiz do‘st. Hikoyasini kim ko‘rganini tekshiradi' },
    ],
  },
  en: {
    title: 'Ghost mode in stories',
    lead: 'Andusta doesn’t send the author a seen mark. You watch the story — and you’re not on the list of viewers. Turn it on in the ⚡ menu, on the Privacy card.',
    rolesTitle: 'Who’s in the demo',
    roles: [
      { badge: 'You', tone: 'b', who: 'Max.', what: 'You watch a story — first in Instagram, then in Andusta' },
      { badge: 'She', tone: 'd', who: 'Molly 💔.', what: 'Your ex. Checks who saw her story' },
    ],
  },
};

const VIEW_ONCE: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Одноразовые фото',
    lead: 'В Andusta одноразовое фото в Direct можно открыть ещё раз, пока оно в памяти телефона. Включено сразу, ничего настраивать не нужно.',
    rolesTitle: 'Кто в демо',
    roles: [
      { badge: 'Ты', tone: 'b', who: 'Максим.', what: 'Получаешь одноразовое фото' },
      { badge: 'Друг', tone: 'c', who: 'Тимур.', what: 'Хвастается новыми кроссовками' },
    ],
  },
  uz: {
    title: 'Bir martalik rasmlar',
    lead: 'Andusta’da Direct’dagi bir martalik rasmni telefon xotirasida turguncha yana ochish mumkin. Darhol yoqilgan, hech narsani sozlash shart emas.',
    rolesTitle: 'Demoda kimlar',
    roles: [
      { badge: 'Siz', tone: 'b', who: 'Aziz.', what: 'Bir martalik rasm olasiz' },
      { badge: 'Do‘st', tone: 'c', who: 'Timur.', what: 'Yangi krossovkalari bilan maqtanadi' },
    ],
  },
  en: {
    title: 'View-once photos',
    lead: 'In Andusta a view-once photo in Direct can be opened again while it’s still in the phone’s memory. It’s on from the start, nothing to set up.',
    rolesTitle: 'Who’s in the demo',
    roles: [
      { badge: 'You', tone: 'b', who: 'Max.', what: 'You get a view-once photo' },
      { badge: 'Friend', tone: 'c', who: 'Tim.', what: 'Shows off his new sneakers' },
    ],
  },
};

const LIKE_FONTS: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Салатовый лайк и шрифты',
    lead: 'В Andusta сердечко лайка салатовое — это включено сразу. Шрифт приложения можно сменить на один из пяти или загрузить свой. Новый шрифт видно на экранах, которые открываются после выбора.',
    rolesTitle: 'Кто в демо',
    roles: [
      { badge: 'Ты', tone: 'b', who: 'Максим.', what: 'Лайкаешь пост и меняешь шрифт' },
      { badge: 'Она', tone: 'd', who: 'Катя.', what: 'Подруга. Испекла свой первый торт' },
    ],
  },
  uz: {
    title: 'Och yashil layk va shriftlar',
    lead: 'Andusta’da layk yurakchasi och yashil — bu darhol yoqilgan. Ilova shriftini beshtadan biriga almashtirish yoki o‘zingiznikini yuklash mumkin. Yangi shrift tanlovdan keyin ochiladigan ekranlarda ko‘rinadi.',
    rolesTitle: 'Demoda kimlar',
    roles: [
      { badge: 'Siz', tone: 'b', who: 'Aziz.', what: 'Postga layk bosasiz va shriftni almashtirasiz' },
      { badge: 'U', tone: 'd', who: 'Kamola.', what: 'Dugona. Birinchi tortini pishirdi' },
    ],
  },
  en: {
    title: 'Lime-green like and fonts',
    lead: 'In Andusta the like heart is lime green — on from the start. You can switch the app’s font to one of five or upload your own. The new font shows on screens you open after picking it.',
    rolesTitle: 'Who’s in the demo',
    roles: [
      { badge: 'You', tone: 'b', who: 'Max.', what: 'You like a post and change the font' },
      { badge: 'She', tone: 'd', who: 'Kate.', what: 'A friend. Baked her first cake' },
    ],
  },
};

const PAGES: Record<DemoId, Record<Language, DemoPageCopy>> = {
  honeypot: HONEYPOT,
  no_forwards_bypass: NO_FORWARDS,
  archive_bridge: BRIDGE,
  ar_masks: AR_MASKS,
  ghost_mode: GHOST_STORIES,
  view_once: VIEW_ONCE,
  like_fonts: LIKE_FONTS,
};

export const getDemoPageCopy = (id: DemoId, lang: Language): DemoPageCopy => PAGES[id][lang];
