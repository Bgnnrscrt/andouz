import type { AppId, Language } from '../../types';

/*
 * Features that have an interactive «Проверь сам» page.
 * Keys are feature ids from data.ts. To add a demo: add the id here,
 * build its page and render it in PortalLayout.
 */
export const DEMO_IDS = ['archive_bridge'] as const;
export type DemoId = (typeof DEMO_IDS)[number];

const DEMO_APP: Record<DemoId, AppId> = {
  archive_bridge: 'andogram',
};

/** Third breadcrumb in the Topbar while a demo page is open. */
export const DEMO_CRUMBS: Record<DemoId, Record<Language, string>> = {
  archive_bridge: { ru: 'Мост A-B-C', uz: 'A-B-C ko‘prigi', en: 'A-B-C bridge' },
};

export const isDemoId = (id: string): id is DemoId =>
  (DEMO_IDS as readonly string[]).includes(id);

/** Hash route of a demo page, e.g. `#/projects/andogram/archive_bridge`. */
export const demoHref = (id: DemoId): string => `#/projects/${DEMO_APP[id]}/${id}`;

/** Reads a demo id from a hash path without `#/`, e.g. `projects/andogram/archive_bridge`. */
export const demoFromHash = (hashPath: string): DemoId | undefined => {
  const [, app, id] = hashPath.split('/');
  if (!id || !isDemoId(id)) return undefined;
  return DEMO_APP[id] === app ? id : undefined;
};
