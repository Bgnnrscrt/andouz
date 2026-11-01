import type { AppId, Language } from '../../types';

/*
 * Features that have an interactive «Проверь сам» page.
 * Keys are feature ids from data.ts. To add a demo: add the id here, its
 * page to PAGES in sandbox/demoPages.ts and its sandbox to SANDBOXES in
 * portal/views/DemoView.tsx.
 */
export const DEMO_IDS = ['honeypot', 'no_forwards_bypass', 'archive_bridge'] as const;
export type DemoId = (typeof DEMO_IDS)[number];

const DEMO_APP: Record<DemoId, AppId> = {
  honeypot: 'andogram',
  no_forwards_bypass: 'andogram',
  archive_bridge: 'andogram',
};

/** Third breadcrumb in the Topbar while a demo page is open. */
export const DEMO_CRUMBS: Record<DemoId, Record<Language, string>> = {
  honeypot: { ru: 'Honeypot-пароли', uz: 'Honeypot parollari', en: 'Duress passcodes' },
  no_forwards_bypass: { ru: 'Обход No-Forwards', uz: 'No-Forwards’ni chetlab o‘tish', en: 'No-Forwards bypass' },
  archive_bridge: { ru: 'Мост A-B-C', uz: 'A-B-C ko‘prigi', en: 'A-B-C bridge' },
};

/** Words a line must not break inside, at their hyphens (page titles, the crumb). */
const NOWRAP = /(A-B-C|No-Forwards)/;

/**
 * Text split into parts; `keep` parts go into a `white-space: nowrap` span.
 * (A U+2011 non-breaking hyphen would do it too, but the Outfit font has no
 * glyph for it: a fallback font would draw that one hyphen.)
 */
export const splitNoWrap = (text: string): { text: string; keep: boolean }[] =>
  text
    .split(NOWRAP)
    .filter((part) => part !== '')
    .map((part) => ({ text: part, keep: NOWRAP.test(part) }));

export const isDemoId = (id: string): id is DemoId =>
  (DEMO_IDS as readonly string[]).includes(id);

/** Hash route of a demo page, e.g. `#/projects/andogram/archive_bridge`. */
export const demoHref = (id: DemoId): string => `#/projects/${DEMO_APP[id]}/${id}`;

/**
 * Hash route of an app's feature list, e.g. `#/projects/andogram/features`
 * (the sandbox finale's «Другие сценарии»): the project page, scrolled to its features.
 */
export const featuresHref = (app: AppId): string => `#/projects/${app}/features`;

/** True for a features route, given a hash path without `#/`. */
export const isFeaturesHash = (hashPath: string): boolean => hashPath.split('/')[2] === 'features';

/** Reads a demo id from a hash path without `#/`, e.g. `projects/andogram/archive_bridge`. */
export const demoFromHash = (hashPath: string): DemoId | undefined => {
  const [, app, id] = hashPath.split('/');
  if (!id || !isDemoId(id)) return undefined;
  return DEMO_APP[id] === app ? id : undefined;
};
