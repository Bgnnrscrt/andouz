import type { Language } from '../../types';
import type { Caption } from './igCopy';
import type { Step } from './likeFontsFlow';

/*
 * Texts of the «Салатовый лайк и шрифты» sandbox, 3 languages (its page:
 * demoPages.ts; shared Instagram / Andusta texts: igCopy.ts). Katya posted her
 * first cake. The fonts' names are the honest ones (scenario §5.9).
 */

export interface LikeFontsCopy {
  captions: { home: Caption; t: Caption; a: Caption };
  hints: Partial<Record<Step, string>>;
  buttons: Partial<Record<Step, string>>;
  line: string;
  tagline: string;
  start: Caption;
  screenLabel: string;
}

const RU: LikeFontsCopy = {
  captions: {
    home: { title: 'Твой телефон', sub: 'Instagram и Andusta' },
    t: { title: 'Попытка 1 · Instagram', sub: 'Обычный Instagram' },
    a: { title: 'Попытка 2 · Andusta', sub: 'Свой лайк и шрифт' },
  },
  hints: {
    tHome: 'Открой Instagram',
    tFeed: 'Лайкни пост Кати: нажми на фото два раза',
    tLiked: 'Цвет сердечка и шрифт в Instagram не меняются',
    aHome: 'Теперь открой Andusta',
    aFeed: 'Лайкни: два раза по фото',
    aLiked: 'Сердечко салатовое 💚',
    aFab: 'А теперь шрифт: нажми ⚡',
    aMenu: 'Открой «Менеджер кастомных шрифтов»',
    aFonts: 'Выбери «С засечками»',
    aFontPicked: 'Или загрузи свой шрифт',
    aFiles: 'Выбери MyFont.ttf',
    aFontLoaded: 'Нажми «ГОТОВО»',
    aFeedFont: 'Лента — твоим шрифтом',
  },
  buttons: { tLiked: 'Дальше' },
  line: 'Как у всех ❤️\nТеперь попробуй в\nAndusta',
  tagline: 'Andusta\nДаже лайк —\nне как у всех',
  start: { title: 'Салатовый лайк и шрифты', sub: '1 минута. Ничего устанавливать не нужно' },
  screenLabel: 'Демо Andusta: салатовый лайк и шрифты',
};

const UZ: LikeFontsCopy = {
  captions: {
    home: { title: 'Sizning telefoningiz', sub: 'Instagram va Andusta' },
    t: { title: '1-urinish · Instagram', sub: 'Oddiy Instagram' },
    a: { title: '2-urinish · Andusta', sub: 'O‘z layk va shriftingiz' },
  },
  hints: {
    tHome: 'Instagram’ni oching',
    tFeed: 'Kamolaning postiga layk bosing: rasmga ikki marta bosing',
    tLiked: 'Instagram’da yurakcha rangi va shrift o‘zgarmaydi',
    aHome: 'Endi Andusta’ni oching',
    aFeed: 'Layk bosing: rasmga ikki marta',
    aLiked: 'Yurakcha och yashil 💚',
    aFab: 'Endi shrift: ⚡ ni bosing',
    aMenu: '«Shriftlar menejeri»ni oching',
    aFonts: '«Serifli»ni tanlang',
    aFontPicked: 'Yoki o‘z shriftingizni yuklang',
    aFiles: 'MyFont.ttf ni tanlang',
    aFontLoaded: '«TAYYOR»ni bosing',
    aFeedFont: 'Lenta — sizning shriftingizda',
  },
  buttons: { tLiked: 'Davom etish' },
  line: 'Hammanikidek ❤️\nEndi buni sinab ko‘ring\nAndusta’da',
  tagline: 'Andusta\nHatto layk ham —\nboshqacha',
  start: { title: 'Och yashil layk va shriftlar', sub: '1 daqiqa. Hech narsa o‘rnatish shart emas' },
  screenLabel: 'Andusta demosi: och yashil layk va shriftlar',
};

const EN: LikeFontsCopy = {
  captions: {
    home: { title: 'Your phone', sub: 'Instagram and Andusta' },
    t: { title: 'Try 1 · Instagram', sub: 'Regular Instagram' },
    a: { title: 'Try 2 · Andusta', sub: 'Your own like and font' },
  },
  hints: {
    tHome: 'Open Instagram',
    tFeed: 'Like Kate’s post: tap the photo twice',
    tLiked: 'In Instagram the heart’s colour and the font don’t change',
    aHome: 'Now open Andusta',
    aFeed: 'Like it: tap the photo twice',
    aLiked: 'The heart is lime green 💚',
    aFab: 'Now the font: tap ⚡',
    aMenu: 'Open “Custom font manager”',
    aFonts: 'Pick “Serif”',
    aFontPicked: 'Or upload your own font',
    aFiles: 'Pick MyFont.ttf',
    aFontLoaded: 'Tap “DONE”',
    aFeedFont: 'The feed is in your font',
  },
  buttons: { tLiked: 'Next' },
  line: 'Same as everyone ❤️\nNow try it in\nAndusta',
  tagline: 'Andusta\nEven your likes\nstand out',
  start: { title: 'Lime-green like and fonts', sub: '1 minute. Nothing to install' },
  screenLabel: 'Andusta demo: lime-green like and fonts',
};

const COPY: Record<Language, LikeFontsCopy> = { ru: RU, uz: UZ, en: EN };

export const getLikeFontsCopy = (lang: Language): LikeFontsCopy => COPY[lang];
