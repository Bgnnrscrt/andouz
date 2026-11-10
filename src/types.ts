export type Language = 'ru' | 'uz' | 'en';

/** Apps sold through the «Получить доступ» window (bot `?start=buy_<app>`, promo codes, APK links). */
export type AppId = 'andogram' | 'andusta';

/** Every app shown on the site: the ones on sale plus those that are «coming soon» (no buy button yet). */
export type SiteAppId = AppId | 'andeo';
