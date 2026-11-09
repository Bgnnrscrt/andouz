import { createContext, useContext, type MouseEvent, type ReactNode } from 'react';
import type { AppId, Language } from '../types';
import type { SiteCopy } from './copy';

export interface SiteApi {
  lang: Language;
  t: SiteCopy;
  setLang: (lang: Language) => void;
  /** Go to a hash route; from an open menu it replaces the menu's history entry. */
  navigate: (hash: string) => void;
  openAccess: (app?: AppId) => void;
}

export const SiteContext = createContext<SiteApi | null>(null);

export const useSite = (): SiteApi => {
  const api = useContext(SiteContext);
  if (!api) throw new Error('useSite outside <Site>');
  return api;
};

/** An in-site link: plain <a href> for new tabs and crawlers, `navigate` on a normal tap. */
export function Link({
  to,
  className,
  children,
  ariaLabel,
  onNavigate,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onNavigate?: () => void;
}) {
  const { navigate } = useSite();
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onNavigate?.();
    navigate(to);
  };
  return (
    <a href={to} className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
