import type { Language } from '../../types';
import type { EndLabels } from './SandboxFrame';

/*
 * Texts every «Проверь сам» sandbox and its page share, in 3 languages:
 * the end buttons, «Начать заново», the start button, the page's kicker,
 * back link and buy button.
 */

/** One line of the page's «who is who» box: a coloured badge, a bold name, a note. */
export interface DemoRole {
  /** Badge text: a letter (A, B, C) or a PIN (1111). */
  badge: string;
  /** Badge colour: a ANDO green, b blue, c orange, d pink. */
  tone: 'a' | 'b' | 'c' | 'd';
  who: string;
  what: string;
}

/** The «Как работает» page of one sandbox (beside the phone). */
export interface DemoPageCopy {
  title: string;
  lead: string;
  rolesTitle: string;
  roles: DemoRole[];
}

export interface CommonCopy {
  end: EndLabels;
  restart: string;
  cta: string;
  page: { back: string; kicker: string; buy: string };
}

const COMMON: Record<Language, CommonCopy> = {
  ru: {
    end: { buy: 'Купить AndoGram', more: 'Другие сценарии', again: 'Пройти ещё раз' },
    restart: 'Начать заново',
    cta: 'Проверь сам',
    page: { back: 'AndoGram', kicker: 'Как работает', buy: 'Купить AndoGram' },
  },
  uz: {
    end: { buy: 'AndoGram sotib olish', more: 'Boshqa ssenariylar', again: 'Yana bir bor' },
    restart: 'Qaytadan boshlash',
    cta: 'O‘zingiz sinab ko‘ring',
    page: { back: 'AndoGram', kicker: 'Qanday ishlaydi', buy: 'AndoGram sotib olish' },
  },
  en: {
    end: { buy: 'Buy AndoGram', more: 'Other scenarios', again: 'Try again' },
    restart: 'Start over',
    cta: 'Try it yourself',
    page: { back: 'AndoGram', kicker: 'How it works', buy: 'Buy AndoGram' },
  },
};

export const getCommonCopy = (lang: Language): CommonCopy => COMMON[lang];
