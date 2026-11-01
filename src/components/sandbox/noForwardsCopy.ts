import type { Language } from '../../types';
import type { DemoPageCopy } from './commonCopy';

/*
 * Texts of the No-Forwards bypass sandbox and its page, in 3 languages.
 */

const PAGE: Record<Language, DemoPageCopy> = {
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

export const getNoForwardsPageCopy = (lang: Language): DemoPageCopy => PAGE[lang];
