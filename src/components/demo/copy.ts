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
    desc: {
      ru: 'Аварийный пароль переключает приложение на чистый decoy-профиль. Секретные чаты, мост и темы бесследно скрываются — остаются только публичные каналы.',
      uz: 'Favqulodda parol ilovani toza decoy-profilga oʻtkazadi. Maxfiy chatlar, koʻprik va mavzular izsiz yashiriladi — faqat ochiq kanallar qoladi.',
      en: 'A duress passcode switches the app to a clean decoy profile. Secret chats, the bridge and topics vanish without a trace — only public channels remain.',
    },
    phone: {
      title: { ru: 'Режим Honeypot', uz: 'Honeypot rejimi', en: 'Honeypot mode' },
      sub: { ru: 'Введён аварийный пароль', uz: 'Favqulodda parol kiritildi', en: 'Duress passcode entered' },
      locked: { ru: 'Заблокировано', uz: 'Qulflangan', en: 'Locked' },
      unlocked: { ru: 'Безопасный профиль активен', uz: 'Xavfsiz profil faol', en: 'Safe profile active' },
      line1: { ru: 'Скрыто секретных чатов', uz: 'Yashirilgan maxfiy chatlar', en: 'Secret chats hidden' },
      line2: { ru: 'Мост и темы отключены', uz: 'Koʻprik va mavzular oʻchirildi', en: 'Bridge and topics disabled' },
      line3: { ru: 'Остались только публичные каналы', uz: 'Faqat ochiq kanallar qoldi', en: 'Only public channels remain' },
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
      ru: 'Невидимый просмотр и защита от удаления',
      uz: 'Koʻrinmas koʻrish va oʻchirishdan himoya',
      en: 'Invisible viewing and anti-unsend',
    },
    desc: {
      ru: 'Andusta читает Direct и смотрит истории без отметки «просмотрено», скрывает онлайн и набор текста. А если собеседник удаляет сообщение — оно остаётся у вас с пометкой [Удалено].',
      uz: 'Andusta Direct va Storieslarni «koʻrildi» belgisisiz oʻqiydi, onlayn va yozish holatini yashiradi. Suhbatdosh xabarni oʻchirsa — u sizda [Oʻchirildi] belgisi bilan qoladi.',
      en: 'Andusta reads Direct and watches stories without a seen receipt, hiding online and typing status. If the other person unsends a message, it stays with you marked [Unsent].',
    },
    phone: {
      header: { ru: 'Andusta · Instagram Direct', uz: 'Andusta · Instagram Direct', en: 'Andusta · Instagram Direct' },
      seenBefore: { ru: 'Просмотрено', uz: 'Koʻrildi', en: 'Seen' },
      seenAfter: { ru: 'Без отметки о прочтении', uz: 'Koʻrildi belgisisiz', en: 'No seen receipt' },
      deletedTag: { ru: 'Собеседник удалил сообщение', uz: 'Suhbatdosh xabarni oʻchirdi', en: 'Contact unsent a message' },
      deletedText: { ru: '«…и всё же оно сохранилось»', uz: '«…baribir saqlanib qoldi»', en: '“…but it was preserved anyway”' },
      preserved: { ru: 'Сохранено · Anti-Unsend', uz: 'Saqlandi · Anti-Unsend', en: 'Preserved · Anti-Unsend' },
      ghost: { ru: 'Режим невидимки: вас нет в списке зрителей', uz: 'Arvoh rejimi: koʻruvchilar roʻyxatida yoʻqsiz', en: 'Ghost mode: you are not in the viewer list' },
    },
  },
  viewonce: {
    title: {
      ru: 'Одноразовое медиа больше не сгорает',
      uz: 'Bir martalik media endi yoʻqolmaydi',
      en: 'View-once media no longer disappears',
    },
    desc: {
      ru: 'Исчезающие фото и видео в Direct можно пересматривать сколько угодно, сохранять в галерею и делать скриншоты — без уведомления отправителю.',
      uz: 'Directdagi yoʻqoluvchi foto va videolarni istalgancha qayta koʻrish, galereyaga saqlash va skrinshot olish mumkin — joʻnatuvchiga xabar bermasdan.',
      en: 'Disappearing photos and videos in Direct can be replayed any number of times, saved to the gallery and screenshotted — with no notice to the sender.',
    },
    phone: {
      title: { ru: 'Одноразовое фото', uz: 'Bir martalik foto', en: 'View-once photo' },
      views: { ru: 'Просмотров', uz: 'Koʻrishlar', en: 'Views' },
      flag: { ru: 'FLAG_SECURE снят', uz: 'FLAG_SECURE olib tashlandi', en: 'FLAG_SECURE cleared' },
      save: { ru: 'Сохранить в галерею', uz: 'Galereyaga saqlash', en: 'Save to gallery' },
      note: { ru: 'Без уведомления отправителю', uz: 'Joʻnatuvchiga xabarsiz', en: 'No notice to the sender' },
    },
  },
};
