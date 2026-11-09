import type { AppId } from '../types';
import { demoFromHash, isFeaturesHash, type DemoId } from '../components/sandbox/demos';

/*
 * Hash routes. The old portal's addresses keep working: #/projects/<app>, its
 * /features, every demo #/projects/<app>/<demo> (the bot sends these links), and
 * #/docs, #/support, #/community now open the matching part of the home page.
 */

export type SectionId = 'features' | 'demos' | 'apps' | 'compare' | 'install' | 'faq' | 'contact';

export type Route =
  | { page: 'home'; section?: SectionId }
  | { page: 'app'; app: AppId; features?: boolean }
  | { page: 'demo'; app: AppId; demo: DemoId };

const SECTIONS: Record<string, SectionId> = {
  features: 'features',
  demos: 'demos',
  apps: 'apps',
  compare: 'compare',
  install: 'install',
  faq: 'faq',
  contact: 'contact',
  // the old portal's sections
  projects: 'apps',
  docs: 'install',
  support: 'faq',
  community: 'contact',
};

export const parseHash = (hash: string = window.location.hash): Route => {
  const path = hash.replace(/^#\/?/, '');
  const [first, second] = path.split('/');
  if (first === 'projects' && (second === 'andogram' || second === 'andusta')) {
    const demo = demoFromHash(path);
    if (demo) return { page: 'demo', app: second, demo };
    return { page: 'app', app: second, features: isFeaturesHash(path) };
  }
  if (first && SECTIONS[first]) return { page: 'home', section: SECTIONS[first] };
  return { page: 'home' };
};

/** One key per page (not per section): a new key scrolls to the top. */
export const pageKey = (r: Route): string =>
  r.page === 'home' ? 'home' : r.page === 'app' ? `app/${r.app}` : `demo/${r.demo}`;

export const homeHref = '#/';
export const appHref = (app: AppId): string => `#/projects/${app}`;
export const sectionHref = (s: SectionId): string => `#/${s}`;
