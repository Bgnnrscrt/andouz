# CLAUDE.md — ANDO / andouz

> **Читать первым.** Это главный и достаточный источник контекста по проекту. Новая сессия Claude, субагент или человек: прочитай файл целиком, и изучать весь репозиторий заново не понадобится.
> Актуально на **2026-10-28**. Проверка свежести: `git log --oneline $(git log -1 --format=%h -- CLAUDE.md)..HEAD` выводит коммиты после последней правки этого файла. Если список не пуст, сверь их diff с файлом.

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
**ANDO** (ando.uz) — одностраничный лендинг (SPA без роутинга, без бэкенда) экосистемы Android-приложений владельца:

| Продукт | Суть | На сайте |
|---|---|---|
| **AndoGram** | мод Telegram на базе AyuGram. Отдельный проект пользователя на Java, в этом репо его нет | v10.9.2 (arm64-v8a), 96.5 MB, Android 8.0+ |
| **Andusta** | мод/клон Instagram, пакет `com.andusta.android`, ставится рядом с оригиналом | v1.0.0 |
| AndoTube / AndoVPN | только карточки в Roadmap («в разработке 60%» / «в планах») | — |

Задача сайта: показать фичи, сравнить с официальными клиентами, продать доступ (1000 Telegram Stars или промокод), выдать APK и QR-код. Языки: `ru` (по умолчанию), `uz` (латиница), `en`. Тема только тёмная, стиль «неон-киберпанк».

## 2. Инфраструктура
| | |
|---|---|
| GitHub | `github.com/Bgnnrscrt/andouz`, публичный, ветка по умолчанию `main` |
| Локальная копия | `/root/Apps/andouz` (сервер: Node 26.8, npm 11.19) |
| Хостинг | Vercel (`vercel.json`): `npm run build` → `dist`. На 2026-10-28 сайт отдаёт сборку текущего `main`, поэтому считай, что push в `main` = продакшн |
| Домен | **https://ando.uz** — единственный рабочий адрес (0.6). Сертификат Let's Encrypt выпускает и продлевает Vercel. HSTS на 2 года. `http://` → 308 на https, `www` → 307 на ando.uz. DNS: aHOST.uz (по README). Зеркало `andouz.vercel.app` отдаёт тот же деплой, не используем |
| APK | GitHub Release `v1.0.0` этого репо: `Andogram-arm64-v8a-27102026.apk` (101 211 974 Б), `Andusta-v1.0.0.apk` (387 707 487 Б). Обе ссылки отдают 200 |
| Telegram | `@ando_stars_bot`: оплата Stars и кнопка «предложить идею». Бот живёт вне этого репо |
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
- Нет: роутера, стейт-менеджера, контекстов, API, env-переменных, тестов, аналитики. Язык передаётся пропом `lang` из `App` во все секции.
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
src/App.tsx             каркас: язык (state + localStorage), порядок секций, ленивые модалки, PAGE_TITLES, skip-link
src/types.ts            Language, AppId, AppFeature, AppInfo, ComparisonRow
src/data.ts             APPS_DATA, TELEGRAM_COMPARISON, INSTAGRAM_COMPARISON, DOWNLOAD_URLS, INITIAL_VALID_COUPONS
src/translations.ts     словарь translations.<секция>.<ключ>[lang]
src/index.css           токены :root, база, глобальные классы (см. 10)
src/lib/motion.ts       токены анимаций: EASE_OUT/EASE_IN_OUT/EASE_DRAWER, DURATION, SPRING, VIEWPORT, fadeUp/fade, staggerContainer
src/hooks/useMediaQuery.ts  useMediaQuery, useCanHover (hover:hover + pointer:fine)
src/hooks/useTilt.ts        3D-наклон за мышью (владеет transform элемента)
src/components/
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
  DownloadModal.tsx/.css    модалка доступа (lazy): Stars / промокод → APK + QR
  AppDetailsModal.tsx/.css  модалка «Все возможности» (lazy): спеки, фичи, changelog
  ui/Modal.tsx              оболочка диалога: портал, фокус-трап, Esc/клик по фону, блок скролла, возврат фокуса
  ui/SegmentedControl.tsx   доступные вкладки с «едущей» плашкой (variant bar|pills, size sm|md, idPrefix → aria)
  ui/SectionHeader.tsx      шапка секции: бейдж (ScrambleText) + заголовок + подзаголовок + слот
  fx/Reveal.tsx             Reveal, Stagger, StaggerItem — появление при скролле
  fx/ScrambleText.tsx       «расшифровка» коротких однострочных надписей
  fx/spotlight.ts           trackSpotlight — подсветка за курсором (--mx/--my)
```

## 6. Страница (порядок в App.tsx)
| # | Блок | id / якорь | Откуда текст |
|---|---|---|---|
| — | skip-link | → `#main` | App.tsx `SKIP_LINK` |
| 1 | Header | — | `translations.nav` + Header.tsx `LABELS` |
| 2 | Hero | aria `hero-title` | `translations.hero` + Hero.tsx (`STATS[].sub`, `LABELS`) |
| 3 | FeatureMarquee | — | FeatureMarquee.tsx `ROW_A`/`ROW_B` |
| 4 | AppsShowcase | `#apps`, `#app-andogram`, `#app-andusta` | data.ts `APPS_DATA` + AppsShowcase.tsx `COPY` |
| 5 | PhoneMockup | `#demo` | `translations.mockup` + demo/copy.ts |
| 6 | ComparisonTable | `#compare` | data.ts `*_COMPARISON` + ComparisonTable.tsx `getLabels()` |
| 7 | InstallGuide | `#install` | `translations.install` + InstallGuide.tsx `getNotice()` |
| 8 | Roadmap | `#roadmap` | `translations.roadmap` + Roadmap.tsx `getCards()` |
| 9 | Footer | — | Footer.tsx `getColTitles()` + `translations.footer.disclaimer` |
| 10 | BackToTop | — | BackToTop.tsx `LABEL` |
| — | DownloadModal, AppDetailsModal | — | lazy-чанки, монтируются после первого открытия (`modalsRequested`) |

Поведение:
- Все кнопки «Скачать», «Получить доступ» и «1000 Stars» открывают DownloadModal через `onOpenDownload(appId)` (по умолчанию `andogram`). «Изучить приложения» ведёт на `#apps`. «Все возможности» на карточке открывает AppDetailsModal, а её кнопка скачивания — DownloadModal для этого приложения.
- Меню хедера построено по `SECTION_IDS = ['apps','demo','compare','install','roadmap']`. Чтобы добавить пункт: id у секции, затем `SECTION_IDS`, затем `navLabel()` в Header.tsx. Полное меню показывается от 960px (`DESKTOP_QUERY`, синхронно с Header.css), ниже — бургер. Стекло хедера включается после 12px скролла.
- Интро hero длится ~1.3 с. После 1.9 с смена языка не перезапускает интро, а делает только кроссфейд.
- Демо листает сцены каждые 6.5 с, пока секция видна и пользователь не кликнул вкладку. На паузе: при скрытой вкладке браузера и при reduced-motion.
- На карточке приложения видны первые 4 фичи (`features.slice(0, 4)`), в модалке — все фичи и changelog.
- BackToTop появляется после прокрутки на 90% высоты экрана.

## 7. Где что менять
| Что | Где |
|---|---|
| Версия, размер, описание, фичи, changelog приложения | `src/data.ts` → `APPS_DATA` |
| Иконка фичи (`iconName`) | имя из `FEATURE_ICONS` в AppsShowcase.tsx; неизвестное имя превращается в Sparkles |
| Ссылки на APK | `src/data.ts` → `DOWNLOAD_URLS` (⚠ 0.5) |
| Промокоды | `src/data.ts` → `INITIAL_VALID_COUPONS` (⚠ 0.5, раздел 9) |
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
- `Language = 'ru' | 'uz' | 'en'`. Выбор хранится в localStorage `ando_lang`, по умолчанию `ru`. App выставляет `<html lang>` и `document.title`.
- Тексты лежат в трёх местах:
  1. `translations.ts`: `translations.<секция>.<ключ>[lang]`;
  2. локальные словари в компонентах: `COPY`, `LABELS`, `getLabels()`, `switch (lang)`;
  3. `data.ts` и `demo/copy.ts`: поля `Record<Language, string>`.
  Новый текст клади рядом с соседними, в том же стиле.
- **Каждый видимый текст и aria-label пишется сразу на трёх языках.** Узбекский — латиница; в нём встречается и `'`, и `‘` (o‘, g‘).
- Мёртвые ключи `translations.ts`, не используются нигде: вся секция `apps`, вся секция `compare`, `install.playProtectNotice`, `footer.copyright`, `footer.communityTitle`, `footer.channelLink`, `footer.botLink`. Прежде чем править текст, найди по разделу 6, какой источник реально выводится.

## 9. Доступ, оплата, скачивание (DownloadModal)
- Переключатели: приложение (AndoGram / Andusta) и способ доступа.
  - **Stars**: ссылка `https://t.me/ando_stars_bot?start=buy_<appId>`, цена 1000 Telegram Stars, подпись «после оплаты бот пришлёт код».
  - **Промокод**: ввод нормализуется (`trim` + верхний регистр) и сверяется с `INITIAL_VALID_COUPONS`.
- При успехе пишутся localStorage `ando_app_unlocked='true'` и код в `ando_redeemed_coupons` (повтор того же кода выдаёт «уже активирован»), затем конфетти. После этого экран показывает кнопку скачивания (`DOWNLOAD_URLS[app]`), QR-код (`qrcode.react`, логотип в центре) и «скопировать ссылку». Разблокировка одна на оба приложения и бессрочная.
- В dev-режиме (`import.meta.env.DEV`) под формой выводятся первые 3 промокода.
- ⚠ **Вся проверка идёт на клиенте**: список кодов лежит в публичном репо и в бандле, признак доступа — флаг в localStorage, APK — публичные ассеты релиза. Реальной защиты доступа нет. Коды, которые выдаёт бот, работают, только если они есть в `INITIAL_VALID_COUPONS`. Настоящее решение требует серверной проверки (функция Vercel, одноразовые или подписанные ссылки). Делать его только по решению пользователя (0.5).

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
1. Платный доступ проверяется только на клиенте (раздел 9).
2. Размер Andusta: в data.ts `82.4 MB`, а APK в релизе весит 387 707 487 Б ≈ 369.7 MiB. Сайт пишет MiB как «MB»: у AndoGram 101 211 974 Б = 96.5 MiB, совпадает.
3. SEO-мета в index.html только на русском и не меняется при смене языка.
4. Главный JS-чанк ~505 kB (gzip ~164 kB), Vite предупреждает о превышении 500 kB.
5. Мёртвые ключи в translations.ts (раздел 8). Неиспользуемый `public/logo.jpg` (644 КБ) попадает в `dist`.
6. В спеках AppDetailsModal архитектура `ARM64-v8a` захардкожена для обоих приложений.
7. «Сообщество» и «Предложить идею» ведут на бота оплаты: отдельного канала нет, хотя ключ `footer.channelLink` есть.

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
