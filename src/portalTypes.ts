import { Language, AppId } from './types';

export type PortalSection =
  | 'home'
  | 'projects'
  | 'stats'
  | 'docs'
  | 'support'
  | 'community';

export interface NavItemConfig {
  id: PortalSection;
  icon: string;
  label: Record<Language, string>;
  badge?: Record<Language, string>;
  subItems?: {
    id: string;
    appId?: AppId;
    label: Record<Language, string>;
    badge?: Record<Language, string>;
  }[];
}

