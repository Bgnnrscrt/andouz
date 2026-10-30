# CLAUDE.md — ANDO / andouz

> **Читать первым.** Это главный и достаточный источник контекста по проекту. Новая сессия Claude, субагент или человек: прочитай файл целиком, и изучать весь репозиторий заново не понадобится.
> Актуально на **2026-10-30**. Проверка свежести: git log --oneline cc1fd5a..HEAD выводит коммиты после последней правки этого файла. Если список не пуст, сверь их diff с файлом.

---

## 0. Правила (обязательные)

### 0.1. Этот файл — источник правды
1. Перед любой работой прочитай CLAUDE.md целиком. Код открывай точечно: только файлы задачи. Их помогут найти раздел 5 «Карта файлов» и раздел 7 «Где что менять». Полный обход репозитория не делай, этот файл его заменяет.
2. Любое изменение проекта (код, стили, тексты, данные, конфиги, ассеты, ссылки, релизы, деплой, домен) не закончено, пока в CLAUDE.md не обновлены затронутые им разделы. Правка CLAUDE.md идёт **в том же коммите**, что и изменение.
3. Правь точечно, только затронутое. Устаревшее исправляй или удаляй, а не дописывай рядом противоречие.
4. Если CLAUDE.md расходится с кодом, верь коду: исправь файл и отметь это в журнале.
5. Пиши факты, а не планы и рассуждения. Держи файл компактным (таблицы, короткие пункты): он грузится в контекст каждой сессии.
6. Каждое изменение добавляет строку в раздел 12 «Журнал». Держи там 20 последних строк, старые удаляй (они остаются в git log). Обнови дату в шапке.

### 0.2. Субагенты
- Субагентов и workflow запускай только с согласия пользователя: квота ограничена. По умолчанию работай сам, в одном контексте.
- Если субагент всё-таки нужен, в его промпте обязательно пиши: *«Прочитай /root/Apps/andouz/CLAUDE.md, там весь нужный контекст. Репозиторий не исследуй, открывай только файлы своей задачи. После изменений обнови в CLAUDE.md затронутые разделы и добавь строку в журнал (раздел 12)».*
- Субагент изучает только CLAUDE.md и файлы своей задачи. Свою часть CLAUDE.md он обновляет сам, по правилам 0.1.
- При параллельной работе каждый субагент правит только свои разделы. Финальную сверку CLAUDE.md (нет противоречий, журнал полный) делает главная сессия.

### 0.3. Общение и порядок работы
- С пользователем говори по-русски. Пишет он неформально и с опечатками.
- Порядок работы:
  1. `cd /root/Apps/andouz && git fetch && git status` — убедись, что ветка актуальна, и проверь свежесть CLAUDE.md командой из шапки.
  2. Сделай задачу.
  3. Запусти `npm run build` и `npm run lint`.
  4. Обнови CLAUDE.md.
  5. Коммить и пушь, только если пользователь попросил.
- Для UI-изменений проверь ширину телефона (~360–400px), десктоп, все 3 языка и `prefers-reduced-motion`. Скриншоты делай экономно, 1–2 штуки.
- Тестов в проекте нет. Минимальная проверка: `npm run build` (это `tsc -b` + `vite build`) и `npm run lint` (oxlint), обе без ошибок. `dist/` не коммитить.

### 0.4. Git и GitHub
- `main` = продакшн: Vercel собирает его на ando.uz. Крупные изменения делай в ветке (`feat/…`, `fix/…`) и оформляй PR, пользователь мёржит сам. Пушить прямо в `main` можно только по явной просьбе.
- Автор коммитов такой же, как во всей истории. Локальный git config на сервере другой, поэтому коммить так: `git -c user.name=Bgnnrscrt -c user.email=haker.mrx10@gmail.com commit …`
- Сообщения коммитов: conventional commits на английском (`feat:`, `fix:`, `docs:`, `chore:`), как в истории.
- Токен GitHub (PAT аккаунта Bgnnrscrt) пользователь присылает в чате. Используй его разово, в одной команде через env или credential helper. Никогда не сохраняй его: ни в файлы, ни в remote URL, ни в git config, ни в память. Remote всегда `https://github.com/Bgnnrscrt/andouz.git`. После работы напомни пользователю отозвать токен.
- **Репозиторий публичный.** Никаких токенов, ключей и личных данных в коде, коммитах и этом файле.

### 0.5. Не трогать без явной просьбы пользователя
- Поток доступа и оплаты (DownloadModal, промокоды, бот) и ссылки на APK (`DOWNLOAD_URLS`). Ими занимается сам пользователь или его другой агент.
- Id секций `apps`, `demo`, `compare`, `install`, `roadmap`. На них завязаны меню, scroll-spy и якоря.

### 0.6. Домен
- Сайт проекта — только **https://ando.uz** (решение владельца от 2026-10-28). Его используй во всех ссылках, мета-тегах, текстах, доках и при проверке живого сайта.
- `andouz.vercel.app` — техническое зеркало того же деплоя Vercel. В проекте его не упоминай и не используй.
- HTTPS шифрует соединение, но не защищает доступ к APK (раздел 9).

---

## 1. Что это
**ANDO** (ando.uz) — веб-портал (SPA с хеш-навигацией по разделам, без бэкенда) экосистемы Android-приложений владельца:

| Продукт | Суть | На сайте |
|---|---|---|
| **AndoGram** | мод Telegram на базе AyuGram. Отдельный проект пользователя на Java, в этом репо его нет | v10.9.2 (arm64-v8a), 96.5 MB, Android 8.0+ |
| **Andusta** | мод/клон Instagram, пакет `com.andusta.android`, ставится рядом с оригиналом | v1.0.0 |
| AndoTube / AndoVPN | только карточки в Roadmap («в разработке 60%» / «в планах») | — |

Задача сайта: показать фичи, сравнить с официальными клиентами, продать доступ (1000 Telegram Stars или промокод), выдать APK и QR-код. Языки: `uz` (по умолчанию, латиница), `ru`, `en`. Тема только тёмная, стиль «неон-киберпанк».

## 2. Инфраструктура
| | |
|---|---|
| GitHub | `github.com/Bgnnrscrt/andouz`, публичный, ветка по умолчанию `main` |
| Локальная копия | `/root/Apps/andouz` (сервер: Node 26.8, npm 11.19) |
| Хостинг | Vercel (`vercel.json`): `npm run build` → `dist`. На 2026-10-28 сайт отдаёт сборку текущего `main`, поэтому считай, что push в `main` = продакшн |
| Домен | **https://ando.uz** — единственный рабочий адрес (0.6). Сертификат Let's Encrypt выпускает и продлевает Vercel. HSTS на 2 года. `http://` → 308 на https, `www` → 307 на ando.uz. DNS: aHOST.uz (по README). Зеркало `andouz.vercel.app` отдаёт тот же деплой, не используем |
| APK | GitHub Release `v1.0.0` этого репо: `Andogram-arm64-v8a-27102026.apk` (101 211 974 Б), `Andusta-v1.0.0.apk` (387 707 487 Б). Обе ссылки отдают 200 |
| Telegram | `@Andouzbot`: оплата Stars (deep-link `?start=buy_<app>`), промокоды, поддержка. Бот вне этого репо (`/root/Apps/andouzbot`), API на `api.ando.uz`. Карточки «канал»/«чат» в Community пока тоже ведут на бота — отдельных канала/чата ещё нет |
| vercel.json | SPA-rewrite: всё → `/index.html`. `/assets/*` кешируется на год (immutable). Заголовки: `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy` (camera/mic/geo off) |

## 3. Команды
```bash
npm install
npm run dev       # Vite dev server (HMR); в dev модалка показывает тестовые промокоды
npm run build     # tsc -b && vite build → dist/
npm run lint      # oxlint
npm run preview   # раздать dist/
```

## 4. Стек
- **React 19.3 + Vite 8 (rolldown) + TypeScript ~7.0**. Линтер **oxlint** (плагины react/typescript/oxc; `rules-of-hooks` = error, `only-export-components` = warn).
- `motion` (`motion/react`) — все JS-анимации. `lucide-react` v1 — иконки; брендовых иконок нет, поэтому GitHub в футере нарисован своим SVG. `qrcode.react` — QR-код. `canvas-confetti` грузится динамически при активации промокода.
- **Стили — ванильный CSS**: глобальный `src/index.css` и отдельный `.css` у каждого компонента (импортируется в самом компоненте). Без Tailwind и CSS-модулей. У классов префикс компонента: `hdr-`, `hero-`, `marquee-`, `apps-`/`app-`, `demo-`/`phone-`, `cmp-`, `install-`, `rm-`, `footer-`, `to-top`, `dl-`, `adm-`.
- Шрифты подключены в `index.html` через Google Fonts: Outfit (заголовки), Inter (текст), JetBrains Mono.
- Роутинг свой: по `window.location.hash` (`#/projects/andogram`, `#/docs`, …) в `PortalLayout`; библиотеки-роутера нет. Нет стейт-менеджера, контекстов, бэкенда, env-переменных, тестов, аналитики. Язык — проп `lang` из `App` во все разделы.
- tsconfig.app: `noUnusedLocals`/`noUnusedParameters` выключены, `allowImportingTsExtensions` включён.

## 5. Карта файлов
```
index.html              SEO/OG-мета (только RU, все URL на https://ando.uz), шрифты, #root
vercel.json             деплой, rewrite, заголовки (см. 2)
public/                 favicon.svg · logo-96.webp (хедер, центр QR) · logo-256.webp (эмблема hero)
                        logo-192.png / logo-512.png (manifest) · apple-touch-icon.png · og-image.jpg (1200×630)
                        site.webmanifest · logo.jpg (644 КБ, нигде не используется)
README.md, CHANGELOG.md документация для людей (RU): фичи приложений, стек, история релизов
src/main.tsx            вход (StrictMode)
src/App.tsx             каркас: язык (state+localStorage, по умолчанию uz), рендерит PortalLayout, ленивые модалки, PAGE_TITLES, skip-link
src/types.ts            Language, AppId, AppFeature, AppInfo, ComparisonRow
src/data.ts             APPS_DATA (расширен: tagline, minAndroid, updatedAt, features[].tag, changelog[].items), *_COMPARISON, DOWNLOAD_URLS
src/translations.ts     словарь старых переиспользуемых секций translations.<секция>.<ключ>[lang]
src/portalTypes.ts      PortalSection = 'home'|'projects'|'stats'|'docs'|'support'|'community'
src/portalTranslations.ts  portalI18n[lang] — весь текст портала (сайдбар/топбар/разделы), 3 языка
src/index.css           токены :root, база, глобальные классы (см. 10)
src/lib/motion.ts       токены анимаций: EASE_OUT/EASE_IN_OUT/EASE_DRAWER, DURATION, SPRING, VIEWPORT, fadeUp/fade, staggerContainer
src/hooks/useMediaQuery.ts  useMediaQuery, useCanHover (hover:hover + pointer:fine)
src/hooks/useTilt.ts        3D-наклон за мышью (владеет transform элемента)
src/components/
  portal/                   КАРКАС ПОРТАЛА (рендерится из App):
    PortalLayout.tsx        сайдбар+топбар+активный раздел; хеш-роутинг (#/projects/andogram…), back/forward, общий Footer+BackToTop
    Sidebar.tsx             боковое меню (сворачивание, мобильный оверлей), подменю Проектов (AndoTube «в разработке», другие «в планах»)
    Topbar.tsx              хлебные крошки + переключатель языка (бейдж статуса и кнопка «Скачать APK» убраны 30.10)
    views/HomeView          баннер, 3 стата, FeatureMarquee, 2 карточки продуктов, PhoneMockup
    views/ProjectView       вкладки AndoGram/Andusta: спеки, все фичи (из data.ts), ComparisonTable, changelog
    views/DocsView          InstallGuide + карточка безопасности + FAQ (3 языка)
    views/SupportView       карточки → @Andouzbot + статус-бар
    views/CommunityView     канал/чат (заглушки на бота) + бот оплаты @Andouzbot + GitHub
    views/StatsView         ⛔ ВЫКЛЮЧЕН (не смонтирован): цифры были выдуманы, вернуть на реальных данных API бота
  Header.tsx/.css           шапка: меню + scroll-spy, язык, CTA, бургер-панель <960px, полоса прогресса скролла
  header/useActiveSection.ts  SECTION_IDS + scroll-spy (pin при клике)
  Hero.tsx/.css             первый экран: STATS, тайминги интро T
  hero/                     HeroBackdrop (аврора, сетка, Constellation, виньетка) · Constellation (canvas с частицами)
                            HeroEmblem · HeroTitle (слова + градиент) · Magnetic (магнитная кнопка) · ScrollCue
  FeatureMarquee.tsx/.css   2 бегущие строки чипов (чистый CSS)
  AppsShowcase.tsx/.css     #apps — карточки приложений; экспортирует AppIcon и FeatureIcon (FEATURE_ICONS)
  PhoneMockup.tsx/.css      #demo — телефон с 5 сценами и автопоказом
  demo/copy.ts              тексты демо: DemoTab, TAB_ORDER, SCENE_COLOR, scenes, benefits, underHood, autoplayLabel
  demo/Scenes.tsx           сцены Archive, Honeypot, MediaSort, Ghost, ViewOnce
  demo/useSceneSteps.ts     пошаговые таймеры сцен
  ComparisonTable.tsx/.css  #compare — таблица (десктоп) / карточки (телефон)
  InstallGuide.tsx/.css     #install — 3 шага + предупреждение «неизвестные источники»
  Roadmap.tsx/.css          #roadmap — 4 карточки + призыв «предложить идею»
  Footer.tsx/.css           футер
  BackToTop.tsx/.css        кнопка «наверх» с кольцом прогресса
  DownloadModal.tsx/.css    модалка доступа (lazy): Stars / промокод → API бота → APK + код установки + QR
  AppDetailsModal.tsx/.css  модалка «Все возможности» (lazy): спеки, фичи, changelog
  ui/Modal.tsx              оболочка диалога: портал, фокус-трап, Esc/клик по фону, блок скролла, возврат фокуса
  ui/SegmentedControl.tsx   доступные вкладки с «едущей» плашкой (variant bar|pills, size sm|md, idPrefix → aria)
  ui/SectionHeader.tsx      шапка секции: бейдж (ScrambleText) + заголовок + подзаголовок + слот
  fx/Reveal.tsx             Reveal, Stagger, StaggerItem — появление при скролле
  fx/ScrambleText.tsx       «расшифровка» коротких однострочных надписей
  fx/spotlight.ts           trackSpotlight — подсветка за курсором (--mx/--my)
```

**Сейчас НЕ смонтированы** (остались от старого лендинга, порталом не используются; удалять по согласованию): `Header`+`header/`, `Hero`+`hero/`, `Roadmap`, `AppDetailsModal` (его роль теперь у ProjectView) и `AppsShowcase` (нужен только AppDetailsModal). Порталом переиспользуются: `PhoneMockup`, `ComparisonTable`, `InstallGuide`, `FeatureMarquee`, `Footer`, `BackToTop`.

## 6. Портал (разделы и навигация)
Единый экран `PortalLayout`: слева `Sidebar`, сверху `Topbar`, в центре активный раздел, снизу общий `Footer` + `BackToTop`. Навигация — свой хеш-роутер; работает back/forward, при переходе скролл наверх.

| Раздел | hash | Что внутри |
|---|---|---|
| Home | `#/` | баннер, 3 стата, `FeatureMarquee`, 2 карточки продуктов, интерактивное демо `PhoneMockup` |
| Projects | `#/projects/andogram`·`/andusta` | вкладки приложений, спеки, все фичи (из `data.ts`), `ComparisonTable`, changelog |
| Docs | `#/docs` | `InstallGuide`, карточка «Архитектура безопасности», FAQ |
| Support | `#/support` | карточки → бот `@Andouzbot`, статус-бар |
| Community | `#/community` | канал/чат (пока заглушки на бота), бот оплаты `@Andouzbot`, GitHub |
| ~~Stats~~ | — | ВЫКЛЮЧЕН 30.10 (цифры были выдуманы; вернуть только на реальных данных API бота) |

Поведение:
- Весь текст портала — в `portalTranslations.ts` (3 языка); часть ручного текста во вью — инлайн тернаром на 3 языка (§8).
- Все кнопки «Скачать»/«Получить доступ»/«1000 Stars» открывают `DownloadModal` (`onOpenDownload(appId)`, по умолчанию `andogram`). Оплата Stars ведёт на `@Andouzbot` (`?start=buy_<app>`).
- Решение владельца: у каждого приложения ровно **5 фич** (топ, порядок = приоритет). AndoGram: `honeypot`, `no_forwards_bypass`, `archive_bridge`, `ar_masks`, `voice_changer`. Andusta: `ghost_mode`, `unfollowers_tracker`, `music_unlocker`, `anti_unsend`, `view_once`. На карточках Home — превью, в ProjectView — все (из `data.ts`). Широта — в сравнении и бегущей строке.
- Подменю «Проекты» декоративно показывает будущее: **AndoTube — в разработке**, другие — в планах.
- `PhoneMockup` листает сцены сам; пауза вне экрана и при reduced-motion.

## 7. Где что менять
| Что | Где |
|---|---|
| Версия, размер, описание, фичи, changelog приложения | `src/data.ts` → `APPS_DATA` |
| Иконка фичи (`iconName`) | имя из `FEATURE_ICONS` в AppsShowcase.tsx; неизвестное имя превращается в Sparkles |
| Откуда брать тексты фич | `ECOSYSTEM_FEATURES.md` в репозитории дирижёра `Bgnnrscrt/andouzcto`: полный список фич обоих приложений на ru/uz/en. На карточки идёт только топ-5 (раздел 6), остальное — в сравнение и бегущую строку |
| Ссылки на APK | `src/data.ts` → `DOWNLOAD_URLS` (⚠ 0.5) |
| Проверка промокода, код установки | DownloadModal.tsx (`handleActivateCoupon` → `API_BASE/api/redeem-coupon`); адрес API — `VITE_ANDO_API` или `https://api.ando.uz` |
| Строки сравнения | `src/data.ts` → `TELEGRAM_COMPARISON` / `INSTAGRAM_COMPARISON` |
| Цена и тексты модалки доступа | `translations.modal` + DownloadModal.tsx `getLabels()` |
| Ссылка на бота | DownloadModal.tsx (`?start=buy_<appId>`), Footer.tsx, Roadmap.tsx |
| Карточки roadmap и % готовности | Roadmap.tsx `getCards()`, `PROGRESS` |
| Заголовок вкладки браузера | App.tsx `PAGE_TITLES` |
| SEO, OG, canonical | `index.html` (только RU, от выбранного языка не зависит; URL только https://ando.uz) |
| Цвета, радиусы, шрифты | `src/index.css` `:root` |

**Новая версия приложения** обновляется во всех местах сразу:
- data.ts: `badge` (3 языка), `version`, `size`, новая запись в `changelog`;
- Roadmap.tsx: заголовки карточек (3 языка);
- `CHANGELOG.md`;
- `DOWNLOAD_URLS` и ассет релиза.

## 8. i18n
- `Language = 'ru' | 'uz' | 'en'`. Выбор хранится в localStorage `ando_lang`, по умолчанию `uz`. App выставляет `<html lang>` и `document.title`.
- Тексты лежат в нескольких местах:
  1. `portalTranslations.ts`: `portalI18n[lang].<раздел>.<ключ>` — весь текст портала (сайдбар, топбар, разделы);
  2. `translations.ts`: `translations.<секция>.<ключ>[lang]` — для переиспользованных старых секций (демо, сравнение, установка);
  3. локальные словари/тернары в компонентах: вью портала местами держат текст инлайн тернаром `lang === 'uz' ? … : lang === 'en' ? … : …` (все 3 языка; `en` не забывать — раньше падал в русский);
  4. `data.ts` и `demo/copy.ts`: поля `Record<Language, string>`.
  Новый текст клади рядом с соседними, в том же стиле.
- **Каждый видимый текст и aria-label пишется сразу на трёх языках.** Узбекский — латиница; в нём встречается и `'`, и `‘` (o‘, g‘).
- Мёртвые ключи `translations.ts`, не используются нигде: вся секция `apps`, вся секция `compare`, `install.playProtectNotice`, `footer.copyright`, `footer.communityTitle`, `footer.channelLink`, `footer.botLink`. Прежде чем править текст, найди по разделу 6, какой источник реально выводится.

## 9. Доступ, оплата, скачивание (DownloadModal)
- Переключатели: приложение (AndoGram / Andusta) и способ доступа.
  - **Stars**: ссылка `https://t.me/ando_stars_bot?start=buy_<appId>`, цена 1000 Telegram Stars, подпись «после оплаты бот пришлёт код установки».
  - **Промокод**: ввод нормализуется (`trim` + верхний регистр) и отправляется на **реальный API бота** `POST ${API_BASE}/api/redeem-coupon` (`API_BASE` = `VITE_ANDO_API` или `https://api.ando.uz`). Сервер сжигает купон и возвращает `{ success, app, apk_url, activation_code }`. Статусы: успех → разблокировка; `already_used` → «уже активирован»; прочее → «неверный»; сеть/CORS недоступны → ошибка связи (все на 3 языках).
- При успехе результат (`{app, apkUrl, code}`) пишется в localStorage `ando_activation` (переживает рефреш — чтобы не потерять одноразовый код), затем конфетти. Экран показывает: кнопку(и) скачивания APK (из `apk_url`, для `all` — обе), **карточку кода установки с копированием в один клик** (`.dl-code-*`), QR-код и «скопировать ссылку».
- **Код установки** — это одноразовый код, который вводится в приложении при первом запуске (привязка к устройству, см. CLAUDE.md бота andouzbot). Сайт его только показывает; проверяет и привязывает его API бота `/api/activate`.
- Проверка купона теперь **серверная** (бот + БД). Если API недоступен (бот не развёрнут / нет сети), купон не проверится — показывается ошибка связи, кнопка не разблокирует. Захардкоженного списка кодов на клиенте больше нет.

## 10. Дизайн-система и анимации
**Токены** (`src/index.css` `:root`):
- Фон `--bg-dark #08090e`, карточки `--bg-card`, `--bg-card-hover`, рамки `--border-subtle`, `--border-hover`.
- Текст: `--text-main #f8fafc`, `--text-muted #94a3b8`, `--text-dim #64748b`.
- Акценты:

  | Токен | Цвет | Назначение |
  |---|---|---|
  | `--accent-ando` | `#00f59b` | бренд, зелёный |
  | `--accent-gram` | `#00b4d8` | AndoGram |
  | `--accent-usta` | `#ff007f` | Andusta |
  | `--accent-stars` | `#f59e0b` | Stars |

- Радиусы `--radius-sm/md/lg/xl/pill` = 8 / 14 / 20 / 32 / 9999. `--header-h: 74px`. Шрифты `--font-heading` / `--font-body` / `--font-mono`. Кривые `--ease-out`, `--ease-in-out`, `--ease-drawer`.

**Глобальные классы** (index.css):
- `.container`;
- кнопки: `.btn` + `.btn-primary-ando` / `.btn-outline` / `.btn-stars` / `.btn-shine`;
- бейджи: `.badge-pill` + `.badge-ando` / `.badge-gram` / `.badge-usta`;
- `.glass-panel`, `.spotlight` (вместе с `trackSpotlight`), `.gradient-text-ando/-gram/-usta`;
- `.section-header/-title/-subtitle/-badge`, `.seg*`, `.modal-root/-panel/-close`;
- `.sr-only`, `.skip-link`;
- `.nowrap` — объявлен в Hero.css.

Брейкпоинты свои в каждом компоненте (max-width 359–1000px). Основной — 960px, меню хедера. Hover-стили только внутри `@media (hover: hover) and (pointer: fine)`.

**Правила анимаций:**
- Анимируются только `transform` и `opacity`. `filter: blur` и `clip-path` — точечно, только на входе.
- Кривые и длительности бери из `src/lib/motion.ts` (JS) и `--ease-*` (CSS), значения в них зеркальные. UI-анимации не дольше 0.3 с.
- У каждой анимации есть вариант для `prefers-reduced-motion`: `<MotionConfig reducedMotion="user">` в App, `useReducedMotion()` в компонентах, CSS-медиа в стилях.
- Эффекты от курсора (tilt, magnetic, spotlight, частицы) работают только с мышью: `useCanHover()` или `pointerType === 'mouse'`.
- Canvas и бесконечные циклы ставятся на паузу вне экрана и в фоновой вкладке. Constellation стартует после первой отрисовки, DPR ≤ 2, на тач-устройствах 30 fps.
- `useTilt`, `Reveal` и `Magnetic` владеют transform своего элемента. Hover-transform вешай на обёртку.
- Готовые примитивы, новые не изобретать:
  - появление при скролле — `Reveal`, `Stagger`/`StaggerItem`, `SectionHeader`;
  - вкладки — `SegmentedControl` (с уникальным `layoutId`);
  - диалоги — `ui/Modal`.

**Доступность:**
- skip-link; aria-label на всех трёх языках;
- tablist/tabpanel связываются через `idPrefix`;
- в модалках фокус-трап и возврат фокуса;
- `aria-current` в меню; декор помечен `aria-hidden`.

## 11. Известные проблемы и долги
1. Платный доступ теперь проверяется на сервере (API бота). Но APK-ссылки по-прежнему публичные (GitHub-релиз) — купон/код защищают запуск приложения, а не скачивание файла. API бота должен быть развёрнут на `api.ando.uz`, иначе промокод-вкладка не работает.
2. Размер Andusta: в data.ts `82.4 MB`, а APK в релизе весит 387 707 487 Б ≈ 369.7 MiB. Сайт пишет MiB как «MB»: у AndoGram 101 211 974 Б = 96.5 MiB, совпадает.
3. SEO-мета в index.html только на русском, не меняется при смене языка и описывает старый лендинг (не портал).
4. Главный JS-чанк ~536 kB (gzip ~172 kB), один бандл; Vite предупреждает о >500 kB. Code-split по вью не делали (скоро большой редизайн).
5. Мёртвые ключи в translations.ts (раздел 8). Неиспользуемый `public/logo.jpg` (644 КБ) попадает в `dist`.
6. В спеках AppDetailsModal архитектура `ARM64-v8a` захардкожена для обоих приложений.
7. Community (канал/чат) и Support ведут на бота `@Andouzbot`: отдельных Telegram-канала/чата/Instagram пока нет — ждём реальные ссылки владельца.
8. Stats-раздел выключен 30.10 (были выдуманные метрики). Вернуть только на реальных данных (API бота `api.ando.uz` / статистика andouzbot), иначе не возвращать.

## 12. Журнал
История до CLAUDE.md (2026-10-27, `d14fdff`…`b672fc5`):
- первый релиз портала;
- логотип и SEO;
- vercel.json;
- починка UTF-8;
- README и CHANGELOG;
- ссылки на APK из релиза v1.0.0;
- редизайн с анимациями, мобильной вёрсткой и полным i18n (ветка `feat/animations-redesign` смержена в main).

| Дата | Изменение | Файлы |
|---|---|---|
| 2026-10-28 | Создан CLAUDE.md по полному разбору проекта (main `b672fc5`); build и lint чистые | CLAUDE.md |
| 2026-10-28 | Домен: только https://ando.uz. canonical, og:url, og:image и twitter:image переведены на него, зеркало убрано из README, добавлено правило 0.6 | index.html, README.md, CLAUDE.md |
| 2026-10-28 | Промокод-вкладка теперь ходит в API бота (`/api/redeem-coupon`): сервер сжигает купон и возвращает APK + одноразовый код установки; добавлена карточка кода с копированием в один клик; захардкоженный список `INITIAL_VALID_COUPONS` удалён (ветка `feat/license-activation`); build+lint чистые | DownloadModal.tsx/.css, data.ts, CLAUDE.md |
| 2026-10-29 | Фичи по `ECOSYSTEM_FEATURES.md` (andouzcto): топ-5 фич на приложение — AndoGram +`voice_changer`, `media_sort` снят с карточек; Andusta +`unfollowers_tracker` +`music_unlocker`, `downloader`/`fake_camera`/`ad_blocker` сняты с карточек. Сравнение: Telegram +4 строки (голос, гео/Live Location, заметки, главный экран), Instagram +6 (история правок, своя музыка, отписки, голос, iOS-эмодзи/шрифты, Full HD аватарки). Бегущая строка: +3 чипа в каждый ряд, длительности 72/84 с под 9 чипов. `FEATURE_ICONS` + Mic/Music/UserMinus. Версия Andusta 1.0.0 не менялась (решение владельца). build+lint чистые | data.ts, FeatureMarquee.tsx/.css, AppsShowcase.tsx, CLAUDE.md |
| 2026-10-30 | Трансформация в веб-портал с боковым меню (сайдбар), разделами (Главная, Проекты [AndoGram, Andusta], Статистика, Документы, Поддержка, В сети), адаптивной локализацией на узбекский язык (без БД/Clerk); build+lint чистые | src/App.tsx, src/components/portal/*, src/portalTranslations.ts, src/portalTypes.ts, CLAUDE.md |
| 2026-10-30 | Правки портала (ветка `feat/portal-fixes`): Stats скрыт (цифры были выдуманы); смягчены абсолютные обещания («100% анти-бан», «99.98%», «банки работают 100%») в Home/Docs; английский в ручном тексте вью доведён до 3 языков (Home/Project/Docs/Support — EN раньше падал в русский); бот оплаты `@ando_stars_bot`→`@Andouzbot` (DownloadModal, Footer, карточка оплаты в Community; канал/чат/Support оставлены до реальных ссылок); подменю «Проекты» → AndoTube «в разработке» + другие «в планах»; из топбара убраны «Экосистема онлайн» и «Скачать APK»; футер: мёртвые якоря `#apps/#compare/#install` → хеш-разделы портала (`#/projects/*`, `#/docs`). §1/§2/§4/§5/§6/§8/§11 синхронизированы. build+lint чистые | portalTranslations.ts, portal/{PortalLayout,Sidebar,Topbar}, portal/views/*, DownloadModal.tsx, Footer.tsx, CLAUDE.md |