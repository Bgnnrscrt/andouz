export type Language = 'ru' | 'uz' | 'en';

export type AppId = 'andogram' | 'andusta';

export interface AppFeature {
  id: string;
  iconName: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  tag?: Record<Language, string>;
}

export interface AppInfo {
  id: AppId;
  name: string;
  badge: Record<Language, string>;
  tagline: Record<Language, string>;
  description: Record<Language, string>;
  version: string;
  size: string;
  minAndroid: string;
  updatedAt: string;
  color: string;
  gradient: string;
  features: AppFeature[];
  changelog: {
    version: string;
    date: string;
    items: Record<Language, string[]>;
  }[];
}

export interface ComparisonRow {
  feature: Record<Language, string>;
  official: Record<Language, string>;
  ando: Record<Language, string>;
  isWin: boolean;
}
