import type { Language } from '../../types';
import type { DemoPageCopy } from './commonCopy';

/*
 * Texts of the Honeypot (duress PIN) sandbox and its page, in 3 languages.
 */

const PAGE: Record<Language, DemoPageCopy> = {
  ru: {
    title: 'Honeypot-пароли',
    lead: 'В AndoGram можно завести несколько PIN-кодов. Каждый открывает только свои аккаунты, а остальные исчезают из меню и уведомлений — будто их нет. Заставили разблокировать телефон? Введи PIN, за которым нет ничего лишнего.',
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
    lead: 'AndoGram’da bir nechta PIN-kod o‘rnatish mumkin. Har biri faqat o‘z akkauntlarini ochadi, qolganlari esa menyu va bildirishnomalardan yo‘qoladi — go‘yo ular umuman yo‘qdek. Telefonni ochishga majburlashdimi? Ortida ortiqcha hech narsa yo‘q PIN-kodni kiriting.',
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
    lead: 'AndoGram lets you set several PIN codes. Each one opens only its own accounts; the rest disappear from the menu and notifications as if they never existed. Forced to unlock your phone? Enter the PIN that shows nothing extra.',
    rolesTitle: 'PIN codes in this demo',
    roles: [
      { badge: '1111', tone: 'a', who: 'Safe.', what: 'A nearly empty account for prying eyes' },
      { badge: '2222', tone: 'c', who: 'Personal.', what: 'Wife, family, close ones' },
      { badge: '3333', tone: 'b', who: 'Work.', what: 'Two accounts: colleagues and clients' },
      { badge: '4444', tone: 'd', who: 'Secret.', what: 'What only you know about' },
    ],
  },
};

export const getHoneypotPageCopy = (lang: Language): DemoPageCopy => PAGE[lang];
