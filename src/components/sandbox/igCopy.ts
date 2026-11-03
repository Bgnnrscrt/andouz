import type { Language } from '../../types';
import type { HomeAppId } from './HomeUi';

/*
 * Texts shared by Andusta's «Проверь сам» sandboxes, in 3 languages: the heroes
 * (the same people as in AndoGram's bridge), the Instagram-like screens and
 * Andusta's own layer (the ⚡ button, «Центр Управления», the fonts window, the
 * file picker). Andusta's windows say what the app says after its honest-label
 * fixes (scenario §5.9): no jargon, no promises the app doesn't keep. uz and en
 * are drafts: the owner rewrites them later.
 */

export interface Caption {
  title: string;
  sub: string;
}

/** A person of the demos: a name and an Instagram nick. */
export interface IgPerson {
  name: string;
  nick: string;
  /** Avatar colour (a coloured circle with the initial). */
  color: string;
}

export type PersonId = 'you' | 'liza' | 'danil' | 'katya' | 'timur';

/** One switch of a Control Center card. */
export interface CcSwitch {
  title: string;
  sub: string;
}

export interface IgCopy {
  home: { date: string; apps: Record<HomeAppId, string> };
  people: Record<PersonId, IgPerson>;
  /** Katya's post in the feed of every Andusta sandbox. */
  cake: string;
  ig: {
    yourStory: string;
    /** «129 отметок «Нравится»» — {n} is the number. */
    likes: string;
    storyAgo: string;
    viewers: string;
    reply: string;
    message: string;
    /** «timur.a отправил(а) фото» — {nick}. */
    sentPhoto: string;
    photo: string;
    viewOnce: string;
    opened: string;
    tapToView: string;
    now: string;
    back: string;
    nav: { home: string; search: string; create: string; reels: string; profile: string };
    /** aria-labels of the post's buttons. */
    actions: { like: string; comment: string; share: string; save: string; more: string };
  };
  cc: {
    badge: string;
    title: string;
    sub: string;
    done: string;
    /** aria-label of the ⚡ button. */
    fab: string;
    cards: {
      snaps: { title: string; status: string; buttons: string[] };
      voice: { title: string; status: string; buttons: string[] };
      music: { title: string; status: string; buttons: string[] };
      privacy: { title: string; switches: CcSwitch[] };
      download: { title: string; buttons: string[]; switches: CcSwitch[] };
      fonts: { title: string; switches: CcSwitch[]; buttons: string[] };
    };
  };
  fonts: {
    title: string;
    sub: string;
    choose: string;
    options: string[];
    /** Short names for the toast, in the same order. */
    short: string[];
    upload: string;
    pick: string;
    done: string;
    /** «Выбран шрифт: {font}». */
    picked: string;
    loaded: string;
  };
  files: {
    title: string;
    recent: string;
    items: { name: string; meta: string }[];
  };
}

const RU: IgCopy = {
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
  people: {
    you: { name: 'Максим', nick: 'maksim_k', color: '#5b8def' },
    liza: { name: 'Лиза', nick: 'liza.m', color: '#ee7aae' },
    danil: { name: 'Даниль', nick: 'danil_k', color: '#e8a33d' },
    katya: { name: 'Катя', nick: 'katya.v', color: '#b07cf0' },
    timur: { name: 'Тимур', nick: 'timur.a', color: '#3fb5a3' },
  },
  cake: 'Мой первый торт 🎂',
  ig: {
    yourStory: 'Ваша история',
    likes: '{n} отметок «Нравится»',
    storyAgo: '1 ч',
    viewers: 'Зрители',
    reply: 'Отправить сообщение',
    message: 'Сообщение…',
    sentPhoto: '{nick} отправил(а) фото',
    photo: 'Фото',
    viewOnce: 'просмотр один раз',
    opened: 'Просмотрено',
    tapToView: 'Нажмите, чтобы посмотреть',
    now: 'сейчас',
    back: 'Назад',
    nav: { home: 'Главная', search: 'Поиск', create: 'Создать', reels: 'Reels', profile: 'Профиль' },
    actions: { like: 'Нравится', comment: 'Комментировать', share: 'Поделиться', save: 'Сохранить', more: 'Ещё' },
  },
  cc: {
    badge: '⚡ ANDUSTA',
    title: 'Центр Управления',
    sub: 'Все функции с инструкциями и статусом в 1 клик',
    done: 'Готово',
    fab: 'Меню Andusta',
    cards: {
      snaps: {
        title: '📸 МОМЕНТАЛЬНЫЕ СНИМКИ',
        status: '⚪ Камера живая',
        buttons: ['📁 Выбрать фото из Галереи', '🎭 Каталог масок', '🕓 Сейф снимков друзей'],
      },
      voice: {
        title: '🎙️ ГОЛОСОВЫЕ В DIRECT',
        status: '⚪ Обычный голос',
        buttons: ['🎛️ Выбрать голос (7 голосов)', '🎧 Проверить свой голос'],
      },
      music: {
        title: '🎵 СВОЯ МУЗЫКА ДЛЯ ИСТОРИЙ',
        status: '⚪ Музыка не выбрана',
        buttons: ['🎶 Музыка и время старта'],
      },
      privacy: {
        title: '👻 ПРИВАТНОСТЬ И РЕЖИМ ПРИЗРАКА',
        switches: [
          { title: 'Невидимка в Stories и Моментальных снимках', sub: 'Автор не получит отметку «просмотрено»' },
          { title: 'Невидимка в Direct (нечиталка)', sub: 'Собеседник не увидит, что вы прочитали' },
          { title: 'Скрыть статус «Печатает...»', sub: 'Собеседник не увидит, что вы печатаете' },
          { title: 'Повторный просмотр одноразовых', sub: 'Одноразовое фото не исчезает после открытия' },
          { title: 'Разрешить скриншоты везде', sub: 'Снять запрет на скриншоты' },
          { title: 'Анти-удаление сообщений (тест)', sub: 'Пробует сохранить сообщение, которое удалил собеседник' },
          { title: 'Блокировка рекламы', sub: 'Меньше рекламной слежки' },
        ],
      },
      download: {
        title: '⬇️ СКАЧИВАНИЕ ФОТО И АВАТАРОК',
        buttons: ['⬇️ Скачать фото с текущего экрана'],
        switches: [{ title: 'Аватарка крупно по долгому нажатию', sub: 'Открыть аватарку крупно и скачать' }],
      },
      fonts: {
        title: '🔤 ШРИФТЫ И ОТПИСКИ',
        switches: [
          { title: '💚 Салатовое сердечко лайка', sub: 'Ярко-зелёный цвет вместо красного' },
          { title: 'Индикатор подписки в чужих профилях', sub: 'Показывать «Подписан(а) на вас»' },
        ],
        buttons: ['📉 Кто отписался', '🔤 Менеджер кастомных шрифтов'],
      },
    },
  },
  fonts: {
    title: '🔤 ШРИФТЫ',
    sub: 'Шрифт интерфейса: встроенный или свой .ttf / .otf',
    choose: 'ВЫБОР ШРИФТА ИНТЕРФЕЙСА:',
    options: [
      '⚪ По умолчанию (Instagram)',
      '🔠 Гротеск (Roboto Medium)',
      '📜 С засечками (Merriweather Bold)',
      '💥 Жирный узкий (Roboto Condensed Bold)',
      '🖋️ Курсив (Roboto Italic)',
      '💻 Моноширинный (Roboto Mono)',
    ],
    short: ['По умолчанию', 'Гротеск', 'С засечками', 'Жирный узкий', 'Курсив', 'Моноширинный'],
    upload: 'ЗАГРУЗИТЬ СВОЙ ШРИФТ:',
    pick: '📁 Выбрать .ttf / .otf файл через проводник',
    done: 'ГОТОВО',
    picked: 'Выбран шрифт: {font}',
    loaded: '✅ Шрифт загружен и применён',
  },
  files: {
    title: 'Загрузки',
    recent: 'Файлы',
    items: [
      { name: 'MyFont.ttf', meta: '312 КБ · сегодня' },
      { name: 'summer_mix.mp3', meta: '4,1 МБ · вчера' },
      { name: 'IMG_2045.jpg', meta: '2,3 МБ · 29 окт.' },
      { name: 'notes.txt', meta: '1 КБ · 27 окт.' },
    ],
  },
};

const UZ: IgCopy = {
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
  people: {
    you: { name: 'Aziz', nick: 'aziz_r', color: '#5b8def' },
    liza: { name: 'Sabina', nick: 'sabina.r', color: '#ee7aae' },
    danil: { name: 'Sanjar', nick: 'sanjar.t', color: '#e8a33d' },
    katya: { name: 'Kamola', nick: 'kamola.n', color: '#b07cf0' },
    timur: { name: 'Timur', nick: 'timur.u', color: '#3fb5a3' },
  },
  cake: 'Mening birinchi tortim 🎂',
  ig: {
    yourStory: 'Hikoyangiz',
    likes: '{n} ta «Yoqdi»',
    storyAgo: '1 soat',
    viewers: 'Ko‘rganlar',
    reply: 'Xabar yuborish',
    message: 'Xabar…',
    sentPhoto: '{nick} rasm yubordi',
    photo: 'Rasm',
    viewOnce: 'bir marta ko‘rish',
    opened: 'Ko‘rildi',
    tapToView: 'Ko‘rish uchun bosing',
    now: 'hozir',
    back: 'Orqaga',
    nav: { home: 'Bosh sahifa', search: 'Qidiruv', create: 'Yaratish', reels: 'Reels', profile: 'Profil' },
    actions: { like: 'Yoqdi', comment: 'Izoh', share: 'Ulashish', save: 'Saqlash', more: 'Yana' },
  },
  cc: {
    badge: '⚡ ANDUSTA',
    title: 'Boshqaruv markazi',
    sub: 'Barcha funksiyalar yo‘riqnoma va holati bilan — 1 bosishda',
    done: 'Tayyor',
    fab: 'Andusta menyusi',
    cards: {
      snaps: {
        title: '📸 TEZKOR SURATLAR',
        status: '⚪ Kamera jonli',
        buttons: ['📁 Galereyadan rasm tanlash', '🎭 Niqoblar katalogi', '🕓 Do‘stlar suratlari seyfi'],
      },
      voice: {
        title: '🎙️ DIRECT’DAGI OVOZLI XABARLAR',
        status: '⚪ Oddiy ovoz',
        buttons: ['🎛️ Ovoz tanlash (7 ta ovoz)', '🎧 Ovozingizni tekshirish'],
      },
      music: {
        title: '🎵 HIKOYALAR UCHUN O‘Z MUSIQANGIZ',
        status: '⚪ Musiqa tanlanmagan',
        buttons: ['🎶 Musiqa va boshlanish vaqti'],
      },
      privacy: {
        title: '👻 MAXFIYLIK VA ARVOH REJIMI',
        switches: [
          { title: 'Stories va tezkor suratlarda ko‘rinmaslik', sub: 'Muallif «ko‘rildi» belgisini olmaydi' },
          { title: 'Direct’da ko‘rinmaslik', sub: 'Suhbatdosh o‘qiganingizni ko‘rmaydi' },
          { title: '«Yozmoqda...» holatini yashirish', sub: 'Suhbatdosh yozayotganingizni ko‘rmaydi' },
          { title: 'Bir martalik rasmni qayta ko‘rish', sub: 'Bir martalik rasm ochilgandan keyin yo‘qolmaydi' },
          { title: 'Hamma joyda skrinshotga ruxsat', sub: 'Skrinshot taqiqini olib tashlash' },
          { title: 'O‘chirishga qarshi (sinov)', sub: 'Suhbatdosh o‘chirgan xabarni saqlashga harakat qiladi' },
          { title: 'Reklamani bloklash', sub: 'Kamroq reklama kuzatuvi' },
        ],
      },
      download: {
        title: '⬇️ RASM VA AVATARLARNI YUKLASH',
        buttons: ['⬇️ Ekrandagi rasmni yuklab olish'],
        switches: [{ title: 'Uzoq bosilganda avatar kattaroq', sub: 'Avatarni katta ochish va yuklab olish' }],
      },
      fonts: {
        title: '🔤 SHRIFTLAR VA OBUNALAR',
        switches: [
          { title: '💚 Och yashil layk', sub: 'Qizil o‘rniga yorqin yashil rang' },
          { title: 'Begona profillarda obuna belgisi', sub: '«Sizga obuna» belgisini ko‘rsatish' },
        ],
        buttons: ['📉 Kim obunani bekor qildi', '🔤 Shriftlar menejeri'],
      },
    },
  },
  fonts: {
    title: '🔤 SHRIFTLAR',
    sub: 'Interfeys shrifti: o‘rnatilgan yoki o‘zingizning .ttf / .otf',
    choose: 'INTERFEYS SHRIFTINI TANLASH:',
    options: [
      '⚪ Standart (Instagram)',
      '🔠 Grotesk (Roboto Medium)',
      '📜 Serifli (Merriweather Bold)',
      '💥 Qalin tor (Roboto Condensed Bold)',
      '🖋️ Kursiv (Roboto Italic)',
      '💻 Monoshirinli (Roboto Mono)',
    ],
    short: ['Standart', 'Grotesk', 'Serifli', 'Qalin tor', 'Kursiv', 'Monoshirinli'],
    upload: 'O‘Z SHRIFTINGIZNI YUKLASH:',
    pick: '📁 Fayl menejeridan .ttf / .otf tanlash',
    done: 'TAYYOR',
    picked: 'Tanlangan shrift: {font}',
    loaded: '✅ Shrift yuklandi va qo‘llandi',
  },
  files: {
    title: 'Yuklanmalar',
    recent: 'Fayllar',
    items: [
      { name: 'MyFont.ttf', meta: '312 KB · bugun' },
      { name: 'summer_mix.mp3', meta: '4,1 MB · kecha' },
      { name: 'IMG_2045.jpg', meta: '2,3 MB · 29-okt.' },
      { name: 'notes.txt', meta: '1 KB · 27-okt.' },
    ],
  },
};

const EN: IgCopy = {
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
  people: {
    you: { name: 'Max', nick: 'max.j', color: '#5b8def' },
    liza: { name: 'Molly', nick: 'molly.j', color: '#ee7aae' },
    danil: { name: 'Alex', nick: 'alex.w', color: '#e8a33d' },
    katya: { name: 'Kate', nick: 'kate.s', color: '#b07cf0' },
    timur: { name: 'Tim', nick: 'tim.a', color: '#3fb5a3' },
  },
  cake: 'My first cake 🎂',
  ig: {
    yourStory: 'Your story',
    likes: '{n} likes',
    storyAgo: '1h',
    viewers: 'Viewers',
    reply: 'Send message',
    message: 'Message…',
    sentPhoto: '{nick} sent a photo',
    photo: 'Photo',
    viewOnce: 'view once',
    opened: 'Opened',
    tapToView: 'Tap to view',
    now: 'now',
    back: 'Back',
    nav: { home: 'Home', search: 'Search', create: 'Create', reels: 'Reels', profile: 'Profile' },
    actions: { like: 'Like', comment: 'Comment', share: 'Share', save: 'Save', more: 'More' },
  },
  cc: {
    badge: '⚡ ANDUSTA',
    title: 'Control Center',
    sub: 'Every feature with how-to and status, in 1 tap',
    done: 'Done',
    fab: 'Andusta menu',
    cards: {
      snaps: {
        title: '📸 QUICK SNAPS',
        status: '⚪ Live camera',
        buttons: ['📁 Pick a photo from the Gallery', '🎭 Mask catalogue', '🕓 Friends’ snaps vault'],
      },
      voice: {
        title: '🎙️ VOICE MESSAGES IN DIRECT',
        status: '⚪ Normal voice',
        buttons: ['🎛️ Pick a voice (7 voices)', '🎧 Test your voice'],
      },
      music: {
        title: '🎵 YOUR OWN MUSIC FOR STORIES',
        status: '⚪ No music picked',
        buttons: ['🎶 Music and start time'],
      },
      privacy: {
        title: '👻 PRIVACY & GHOST MODE',
        switches: [
          { title: 'Ghost mode in Stories and Quick Snaps', sub: 'The author gets no seen mark' },
          { title: 'Ghost mode in Direct', sub: 'They won’t see that you’ve read it' },
          { title: 'Hide “Typing...”', sub: 'They won’t see that you’re typing' },
          { title: 'Reopen view-once photos', sub: 'A view-once photo stays after you open it' },
          { title: 'Allow screenshots everywhere', sub: 'Remove the screenshot block' },
          { title: 'Anti-unsend (beta)', sub: 'Tries to keep a message the other person deleted' },
          { title: 'Ad blocking', sub: 'Less ad tracking' },
        ],
      },
      download: {
        title: '⬇️ SAVING PHOTOS & AVATARS',
        buttons: ['⬇️ Save the photo on screen'],
        switches: [{ title: 'Bigger avatar on long-press', sub: 'Open an avatar big and save it' }],
      },
      fonts: {
        title: '🔤 FONTS & UNFOLLOWERS',
        switches: [
          { title: '💚 Lime-green like', sub: 'Bright green instead of red' },
          { title: 'Follow badge on other profiles', sub: 'Show “Follows you”' },
        ],
        buttons: ['📉 Who unfollowed', '🔤 Custom font manager'],
      },
    },
  },
  fonts: {
    title: '🔤 FONTS',
    sub: 'Interface font: built-in or your own .ttf / .otf',
    choose: 'INTERFACE FONT:',
    options: [
      '⚪ Default (Instagram)',
      '🔠 Grotesque (Roboto Medium)',
      '📜 Serif (Merriweather Bold)',
      '💥 Bold condensed (Roboto Condensed Bold)',
      '🖋️ Italic (Roboto Italic)',
      '💻 Monospace (Roboto Mono)',
    ],
    short: ['Default', 'Grotesque', 'Serif', 'Bold condensed', 'Italic', 'Monospace'],
    upload: 'UPLOAD YOUR OWN FONT:',
    pick: '📁 Pick a .ttf / .otf file',
    done: 'DONE',
    picked: 'Font selected: {font}',
    loaded: '✅ Font loaded and applied',
  },
  files: {
    title: 'Downloads',
    recent: 'Files',
    items: [
      { name: 'MyFont.ttf', meta: '312 KB · today' },
      { name: 'summer_mix.mp3', meta: '4.1 MB · yesterday' },
      { name: 'IMG_2045.jpg', meta: '2.3 MB · Oct 29' },
      { name: 'notes.txt', meta: '1 KB · Oct 27' },
    ],
  },
};

const COPY: Record<Language, IgCopy> = { ru: RU, uz: UZ, en: EN };

export const getIgCopy = (lang: Language): IgCopy => COPY[lang];

/** «{n}» / «{nick}» / «{font}» placeholders. */
export const fill = (text: string, values: Record<string, string | number>): string =>
  text.replace(/\{(\w+)\}/g, (m, key: string) => (key in values ? String(values[key]) : m));
