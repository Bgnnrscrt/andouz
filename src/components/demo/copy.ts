import type { Language } from '../../types';

export type DemoTab = 'archive' | 'honeypot' | 'mediasort' | 'ghost' | 'viewonce';

type L = Record<Language, string>;

/** Accent per scenario — matches the brand palette (ANDO green, AndoGram cyan, Andusta magenta). */
export const SCENE_COLOR: Record<DemoTab, string> = {
  archive: '#00b4d8',
  honeypot: '#00f59b',
  mediasort: '#00b4d8',
  ghost: '#ff007f',
  viewonce: '#ff007f',
};

export const TAB_ORDER: DemoTab[] = ['archive', 'honeypot', 'mediasort', 'ghost', 'viewonce'];

/** Side-panel "under the hood" badge. */
export const underHood: L = {
  ru: 'Как это работает под капотом',
  uz: 'Ichki mexanizm qanday ishlaydi',
  en: 'How it works under the hood',
};

/** Three benefits shown beside every scenario. */
export const benefits: L[] = [
  {
    ru: 'Работает автономно, без сторонних серверов',
    uz: 'Tashqi serversiz, mustaqil ishlaydi',
    en: 'Runs autonomously, with no third-party servers',
  },
  {
    ru: 'Все ключи и базы данных остаются на телефоне',
    uz: 'Barcha kalit va maʼlumotlar telefonda qoladi',
    en: 'All keys and databases stay on the phone',
  },
  {
    ru: 'Не требует прав суперпользователя (Root)',
    uz: 'Root huquqlari talab qilinmaydi',
    en: 'No superuser (root) access required',
  },
];

/** "Автовоспроизведение" label for the autoplay progress row. */
export const autoplayLabel: L = {
  ru: 'Автопоказ сценариев',
  uz: 'Ssenariylar avtomatik koʻrsatuvi',
  en: 'Auto-playing scenarios',
};

export interface SceneCopy {
  /** Side-panel heading. */
  title: L;
  /** Side-panel paragraph. */
  desc: L;
  /** Strings used inside the phone screen. */
  phone: Record<string, L>;
}

export const scenes: Record<DemoTab, SceneCopy> = {
  archive: {
    title: {
      ru: 'Мост между двумя номерами и устройствами',
      uz: 'Ikki raqam va qurilma orasidagi koʻprik',
      en: 'A bridge between two numbers and devices',
    },
    desc: {
      ru: 'Аккаунт A держит фоновую службу KeepAlive. Входящие зеркалируются в закрытый топик, а ответ из топика уходит собеседнику от имени основного аккаунта — со второго телефона, 24/7.',
      uz: 'Akkaunt A fonda KeepAlive xizmatini ushlab turadi. Kiruvchi xabarlar yopiq mavzuga koʻchiriladi, javob esa asosiy akkaunt nomidan ikkinchi telefondan 24/7 yuboriladi.',
      en: 'Account A keeps a background KeepAlive service. Incoming chats mirror to a private topic, and replies go back to the contact as the main account — from a second phone, 24/7.',
    },
    phone: {
      header: { ru: 'Личный архив · Мост', uz: 'Shaxsiy arxiv · Koʻprik', en: 'Personal archive · Bridge' },
      status: { ru: 'Онлайн 24/7 · KeepAlive', uz: 'Onlayn 24/7 · KeepAlive', en: 'Online 24/7 · KeepAlive' },
      topic: { ru: 'Топик #104', uz: 'Mavzu #104', en: 'Topic #104' },
      nodeA: { ru: 'Аккаунт A', uz: 'Akkaunt A', en: 'Account A' },
      nodeB: { ru: 'Мост', uz: 'Koʻprik', en: 'Bridge' },
      nodeC: { ru: 'Контакт', uz: 'Kontakt', en: 'Contact' },
      inSender: { ru: 'Контакт', uz: 'Kontakt', en: 'Contact' },
      inText: { ru: 'Привет! Документы отправил на почту.', uz: 'Salom! Hujjatlarni pochtaga yubordim.', en: 'Hi! Sent the documents to your email.' },
      replySender: { ru: 'Ответ через мост · Телефон 2', uz: 'Koʻprik orqali javob · Telefon 2', en: 'Reply via bridge · Phone 2' },
      replyText: { ru: 'Принято, сейчас проверю.', uz: 'Qabul qildim, hozir tekshiraman.', en: 'Got it, checking now.' },
      confirm: { ru: 'Отправлено от имени Аккаунта A', uz: 'Akkaunt A nomidan yuborildi', en: 'Sent as Account A' },
    },
  },
  honeypot: {
    title: {
      ru: 'Защита от принуждения прямо в интерфейсе',
      uz: 'Majburlashdan himoya — interfeysning oʻzida',
      en: 'Duress protection built into the interface',
    },
    // What the feature really does (owner, 2026-11-02): each PIN opens its own
    // accounts; the others leave the menu and the notifications; the main PIN opens all.
    desc: {
      ru: 'У каждого PIN-кода свои аккаунты. Введёшь «безопасный» PIN — остальные аккаунты исчезнут из меню и уведомлений, будто их нет. Главный PIN по-прежнему открывает всё.',
      uz: 'Har bir PIN-kodning oʻz akkauntlari bor. «Xavfsiz» PIN kiritilsa, qolgan akkauntlar menyu va bildirishnomalardan yoʻqoladi — goʻyo ular yoʻqdek. Asosiy PIN esa avvalgidek hammasini ochadi.',
      en: 'Each PIN code opens its own accounts. Enter the “safe” PIN and the other accounts disappear from the menu and notifications as if they weren’t there. Your main PIN still opens everything.',
    },
    phone: {
      title: { ru: 'Режим Honeypot', uz: 'Honeypot rejimi', en: 'Honeypot mode' },
      sub: { ru: 'Введён безопасный PIN', uz: 'Xavfsiz PIN kiritildi', en: 'Safe PIN entered' },
      locked: { ru: 'Заблокировано', uz: 'Qulflangan', en: 'Locked' },
      unlocked: { ru: 'Открыт безопасный аккаунт', uz: 'Xavfsiz akkaunt ochildi', en: 'Safe account open' },
      line1: { ru: 'Скрыто аккаунтов', uz: 'Yashirilgan akkauntlar', en: 'Accounts hidden' },
      line2: { ru: 'Их нет ни в меню, ни в уведомлениях', uz: 'Ular menyuda ham, bildirishnomalarda ham yoʻq', en: 'Not in the menu, not in notifications' },
      line3: { ru: 'Главный PIN откроет всё', uz: 'Asosiy PIN hammasini ochadi', en: 'The main PIN opens everything' },
    },
  },
  mediasort: {
    title: {
      ru: 'Мгновенная сортировка тяжёлых файлов',
      uz: 'Ogʻir fayllarni bir zumda saralash',
      en: 'Instant sorting of heavy files',
    },
    desc: {
      ru: 'AndoGram читает метаданные медиа пачками через MTProto и сортирует файлы по реальному размеру прямо в памяти — от самых увесистых к лёгким, без ручного пролистывания.',
      uz: 'AndoGram media metamaʼlumotlarini MTProto orqali toʻplam-toʻplam oʻqiydi va fayllarni haqiqiy hajmi boʻyicha xotirada saralaydi — kattadan kichikka, qoʻlda varaqlamasdan.',
      en: 'AndoGram reads media metadata in batches over MTProto and sorts files by real size in memory — largest to smallest, with no manual scrolling.',
    },
    phone: {
      header: { ru: 'Медиа чата', uz: 'Chat mediasi', en: 'Chat media' },
      sorting: { ru: 'Сортировка…', uz: 'Saralanmoqda…', en: 'Sorting…' },
      sorted: { ru: 'По размеру ↓', uz: 'Hajm boʻyicha ↓', en: 'By size ↓' },
      file1: { ru: 'Видео · 60 fps · 27 мин', uz: 'Video · 60 fps · 27 daq', en: 'Video · 60 fps · 27 min' },
      file2: { ru: 'Голосовое · 48 kHz', uz: 'Ovozli · 48 kHz', en: 'Voice · 48 kHz' },
      file3: { ru: 'Архив файлов', uz: 'Fayllar arxivi', en: 'File archive' },
      file4: { ru: 'Фото · RAW', uz: 'Foto · RAW', en: 'Photo · RAW' },
    },
  },
  ghost: {
    title: {
      ru: 'Невидимый просмотр историй и Direct',
      uz: 'Hikoya va Directni koʻrinmas koʻrish',
      en: 'Invisible stories and Direct',
    },
    desc: {
      ru: 'Andusta смотрит истории и читает Direct без отметки «просмотрено». Можно скрыть и «печатает…» — у каждой части свой переключатель.',
      uz: 'Andusta hikoyalarni koʻradi va Directni «koʻrildi» belgisisiz oʻqiydi. «Yozmoqda…» holatini ham yashirish mumkin — har birining oʻz tugmasi bor.',
      en: 'Andusta watches stories and reads Direct without a seen mark. You can hide “typing…” too — each part has its own switch.',
    },
    phone: {
      header: { ru: 'Andusta · Instagram', uz: 'Andusta · Instagram', en: 'Andusta · Instagram' },
      story: { ru: 'История', uz: 'Hikoya', en: 'Story' },
      seenBefore: { ru: 'Просмотрено', uz: 'Koʻrildi', en: 'Seen' },
      seenAfter: { ru: 'Без отметки «просмотрено»', uz: '«Koʻrildi» belgisisiz', en: 'No seen mark' },
      dmTag: { ru: 'Сообщение в Direct', uz: 'Directdagi xabar', en: 'Direct message' },
      dmText: { ru: '«Ты видел мою историю?»', uz: '«Hikoyamni koʻrdingmi?»', en: '“Did you see my story?”' },
      dmRead: { ru: 'Прочитано, а отметки «просмотрено» нет', uz: 'Oʻqildi, lekin «koʻrildi» belgisi yoʻq', en: 'Read, yet no seen mark' },
      ghost: { ru: 'Режим невидимки: вас нет в списке зрителей', uz: 'Arvoh rejimi: koʻruvchilar roʻyxatida yoʻqsiz', en: 'Ghost mode: you are not in the viewer list' },
    },
  },
  viewonce: {
    title: {
      ru: 'Одноразовое фото не сгорает',
      uz: 'Bir martalik rasm yoʻqolmaydi',
      en: 'A view-once photo doesn’t burn',
    },
    desc: {
      ru: 'Одноразовое фото в Direct не исчезает после первого просмотра: его можно открыть ещё раз.',
      uz: 'Directdagi bir martalik rasm birinchi koʻrishdan keyin yoʻqolmaydi: uni yana ochish mumkin.',
      en: 'A view-once photo in Direct doesn’t vanish after the first look: you can open it again.',
    },
    phone: {
      title: { ru: 'Одноразовое фото', uz: 'Bir martalik rasm', en: 'View-once photo' },
      views: { ru: 'Просмотров', uz: 'Koʻrishlar', en: 'Views' },
      kept: { ru: 'Фото не сгорело', uz: 'Rasm yoʻqolmadi', en: 'The photo didn’t burn' },
      again: { ru: 'Открыть ещё раз', uz: 'Yana ochish', en: 'Open again' },
      note: { ru: 'Включается в меню Andusta', uz: 'Andusta menyusida yoqiladi', en: 'Turned on in the Andusta menu' },
    },
  },
};
