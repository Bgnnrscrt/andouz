import { AppId, AppInfo, ComparisonRow } from './types';

export const APPS_DATA: AppInfo[] = [
  {
    id: "andogram",
    name: "AndoGram",
    badge: {
      ru: "⚡ Telegram Mod v10.9.2",
      uz: "⚡ Telegram Mod v10.9.2",
      en: "⚡ Telegram Mod v10.9.2"
    },
    tagline: {
      ru: "Максимальный контроль над общением и медиа",
      uz: "Muloqot va media ustidan to'liq nazorat",
      en: "Total Control Over Messaging & Media"
    },
    description: {
      ru: "Автономный клиент Telegram на базе AyuGram с личным архивом-мостом (A-B-C), обходом защиты от сохранения в каналах, Honeypot-паролями под принуждением, умной сортировкой медиа и AR-масками.",
      uz: "AyuGram bazasidagi mustaqil Telegram mijoz: shaxsiy A-B-C arxiv ko'prigi, himoyalangan mediani saqlash, majburiy Honeypot parollari, mediani hajm bo'yicha saralash va AR-niqoblar.",
      en: "Next-gen AyuGram-based Telegram client featuring personal archive bridge (A-B-C), media save protection bypass, duress passcodes, full media size sorter, and real-time AR masks."
    },
    version: "10.9.2 (arm64-v8a)",
    size: "96.5 MB",
    minAndroid: "Android 8.0+",
    updatedAt: "27.10.2026",
    color: "#00b4d8",
    gradient: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
    features: [
      {
        id: "honeypot",
        iconName: "Lock",
        title: {
          ru: "Honeypot-пароли (Принуждение)",
          uz: "Honeypot parollari (Majburlash)",
          en: "Duress Passcodes (Honeypot)"
        },
        description: {
          ru: "Отдельные PIN-коды для разных аккаунтов. Под «безопасным» PIN остальные аккаунты исчезают из меню и уведомлений — будто их нет. Главный PIN по-прежнему открывает всё.",
          uz: "Turli akkauntlar uchun alohida PIN-kodlar. «Xavfsiz» PIN bilan qolgan akkauntlar menyu va bildirishnomalardan yo'qoladi — go'yo ular yo'qdek. Asosiy PIN esa avvalgidek hammasini ochadi.",
          en: "Separate PIN codes for different accounts. Under the “safe” PIN the other accounts disappear from the menu and notifications as if they weren’t there. Your main PIN still opens everything."
        },
        tag: { ru: "Безопасность", uz: "Xavfsizlik", en: "Security" }
      },
      {
        id: "no_forwards_bypass",
        iconName: "Download",
        title: {
          ru: "Обход защиты No-Forwards",
          uz: "Saqlash himoyasini chetlab o'tish",
          en: "No-Forwards Bypass"
        },
        description: {
          ru: "Сохранение фото, видео и документов из каналов и чатов с запретом на пересылку. Снятие с ограничений («копировать ссылку» и сохранение без тегов автора), а также снятие FLAG_SECURE для скриншотов.",
          uz: "Nusxalash va saqlash taqiqlangan yopiq kanallardan foto, video va fayllarni galereyaga saqlash. 'Saqlanganlarga' to'g'ridan-to'g'ri nusxalash.",
          en: "Save photos, videos, and files from protected channels and secret chats. One-click Save to Saved Messages without author tag and screenshot capture allowed."
        },
        tag: { ru: "Без ограничений", uz: "Cheklovlarsiz", en: "Unrestricted" }
      },
      {
        id: "archive_bridge",
        iconName: "Archive",
        title: {
          ru: "Личный Архив & Мост (A-B-C)",
          uz: "Shaxsiy Arxiv & Ko'prik (A-B-C)",
          en: "Personal Archive & Bridge (A-B-C)"
        },
        description: {
          ru: "Автоматическое дублирование всех личных диалогов в закрытый форум. Возможность отвечать собеседникам со второго телефона от имени основного аккаунта 24/7.",
          uz: "Barcha shaxsiy yozishmalarni yopiq forumga avtomatik ko'chirish. Ikkinchi telefondan turib asosiy akkaunt nomidan 24/7 javob qaytarish imkoniyati.",
          en: "Live mirroring of private chats to a secure forum topic. Reply to contacts from a secondary device as Account A through the background bridge 24/7."
        },
        tag: { ru: "Эксклюзив", uz: "Eksklyuziv", en: "Exclusive" }
      },
      {
        id: "ar_masks",
        iconName: "Sparkles",
        title: {
          ru: "3D AR-маски в видеокружках",
          uz: "Video-aylanalarda 3D AR-niqoblar",
          en: "Real-Time 3D AR Masks"
        },
        description: {
          ru: "Аппаратный рендерер MediaPipe с трекингом 468 точек лица, эффектами света, скрытием бороды и кинематографическим слоем пост-обработки в реальном времени.",
          uz: "468 ta yuz nuqtasini real vaqtda kuzatuvchi MediaPipe AR-dvijogi: yorug'lik effektlari, soqolni yashirish va kinematografik filtrlar.",
          en: "MediaPipe 468-landmark facial engine with rigid 3D models, facial concealment, and real-time cinematic post-processing pipeline."
        }
      },
      {
        id: "voice_changer",
        iconName: "Mic",
        title: {
          ru: "Смена голоса в аудиосообщениях",
          uz: "Ovozli xabarlarda ovozni o'zgartirish",
          en: "Voice Changer for Voice Memos"
        },
        description: {
          ru: "Профессиональный C++ вокодер прямо в записи голосовых: глубокий мужской бас, робот, аниме/женский голос, студийное эхо без искажения темпа речи.",
          uz: "Ovozli xabarlarda real vaqtdagi professional C++ vokoder: chuqur erkak ovozi, robot, ayol ovozi, studiya effekti.",
          en: "Studio-grade C++/WORLD vocoder in voice messages: deep bass, robot, high pitch, and studio clarity without tempo distortion."
        },
        tag: { ru: "Приватность", uz: "Maxfiylik", en: "Privacy" }
      }
    ],
    changelog: [
      {
        version: "10.9.2",
        date: "27.10.2026",
        items: {
          ru: [
            "Добавлена умная сортировка медиа по размеру в профилях и каналах",
            "Интегрирован пакет защиты от принуждения Honeypot (Duress Passcodes)",
            "Встроены локальные заметки контактов в меню профиля",
            "Оптимизирован движок рендеринга AR-масок на GPU",
            "Обновлен встроенный движок Bridge v2 для обхода блокировок пересылки"
          ],
          uz: [
            "Profil va kanallarda fayllarni hajm bo'yicha saralash qo'shildi",
            "Majburiy ochishdan himoya qiluvchi Honeypot tizimi joriy etildi",
            "Kontaktlar uchun shaxsiy maxfiy eslatmalar",
            "AR-niqoblar GPU renderlash tezligi optimallashtirildi",
            "Arxiv ko'prigi v2 dvijogi yangilandi"
          ],
          en: [
            "Added media sorting by file size in profile and channel shared media",
            "Integrated duress passcodes (Honeypot decoy mode)",
            "Contact private notes on-device storage",
            "Optimized 3D AR mask GPU pipeline",
            "Enhanced Bridge v2 engine for seamless cross-account messaging"
          ]
        }
      }
    ]
  },
  {
    id: "andusta",
    name: "Andusta",
    badge: {
      ru: "⚡ Instagram Mod v1.0.0",
      uz: "⚡ Instagram Mod v1.0.0",
      en: "⚡ Instagram Mod v1.0.0"
    },
    tagline: {
      ru: "Instagram с невидимкой и своими фишками",
      uz: "Arvoh rejimi va o'z imkoniyatlariga ega Instagram",
      en: "Instagram with Ghost Mode & Extras"
    },
    description: {
      ru: "Отдельный клон Instagram (com.andusta.android): ставится рядом с оригиналом, Root не нужен. Истории и Direct без отметки «просмотрено», повторный просмотр одноразовых фото, детектор отписок, своя музыка в историях, смена голоса, скачивание фото с экрана и меньше рекламной слежки.",
      uz: "Asl ilova yonida alohida o'rnatiladigan Instagram kloni (com.andusta.android), Root kerak emas. Hikoya va Directni «ko'rildi» belgisisiz ko'rish, bir martalik rasmni qayta ochish, obunani bekor qilganlarni aniqlash, hikoyaga o'z musiqangiz, ovozni o'zgartirish, ekrandagi rasmni yuklab olish va kamroq reklama kuzatuvi.",
      en: "A standalone Instagram clone (com.andusta.android) that installs next to the original, no root needed. Stories and Direct without a seen mark, reopening view-once photos, an unfollowers tracker, your own music in stories, a voice changer, saving photos from the screen and less ad tracking."
    },
    version: "1.0.0 (Clone)",
    size: "82.4 MB",
    minAndroid: "Android 8.0+",
    updatedAt: "27.10.2026",
    color: "#ff007f",
    gradient: "linear-gradient(135deg, #ff007f 0%, #7928ca 100%)",
    features: [
      {
        id: "ghost_mode",
        iconName: "Ghost",
        title: {
          ru: "Режим Невидимки (Ghost Mode)",
          uz: "Arvoh Rejimi (Ghost Mode)",
          en: "Full Ghost Mode"
        },
        description: {
          ru: "Смотрите истории и читайте Direct без отметки «просмотрено». Можно скрыть и «печатает…». У каждой части свой переключатель в меню ⚡.",
          uz: "Hikoyalarni ko'ring va Directni «ko'rildi» belgisisiz o'qing. «Yozmoqda…» holatini ham yashirish mumkin. Har birining ⚡ menyusida o'z tugmasi bor.",
          en: "Watch stories and read Direct without a seen mark. You can hide “typing…” too. Each part has its own switch in the ⚡ menu."
        },
        tag: { ru: "Приватность", uz: "Maxfiylik", en: "Privacy" }
      },
      {
        id: "unfollowers_tracker",
        iconName: "UserMinus",
        title: {
          ru: "Детектор отписок (Кто отписался)",
          uz: "Obunani bekor qilganlar (Kim ketdi)",
          en: "On-Device Unfollowers Tracker"
        },
        description: {
          ru: "Подписчики сверяются прямо на телефоне, пароль никуда не уходит. Долистайте список подписчиков до конца — Andusta покажет, кто отписался с прошлого раза. В профиле человека видно, подписан ли он на вас.",
          uz: "Obunachilar telefonning o'zida solishtiriladi, parol hech qayerga ketmaydi. Obunachilar ro'yxatini oxirigacha aylantiring — Andusta o'tgan safardan beri kim obunani bekor qilganini ko'rsatadi. Profilda u sizga obunami yoki yo'qligi ko'rinadi.",
          en: "Followers are compared right on your phone, your password goes nowhere. Scroll your followers list to the end and Andusta shows who unfollowed since last time. A profile shows whether that person follows you."
        },
        tag: { ru: "Безопасность", uz: "Xavfsizlik", en: "Security" }
      },
      {
        id: "music_unlocker",
        iconName: "Music",
        title: {
          ru: "Своя музыка в историях",
          uz: "Hikoyalarga o'z musiqangiz",
          en: "Your Own Music in Stories"
        },
        description: {
          ru: "Выберите трек с телефона: при съёмке истории он заменит звук или смешается с вашим голосом.",
          uz: "Telefondan trek tanlang: hikoya suratga olinayotganda u ovozni almashtiradi yoki ovozingiz bilan aralashadi.",
          en: "Pick a track from your phone: while you record a story, it replaces the sound or mixes with your voice."
        },
        tag: { ru: "Свобода", uz: "Erkinlik", en: "Freedom" }
      },
      {
        id: "anti_unsend",
        iconName: "Shield",
        title: {
          ru: "Анти-удаление в Direct (тест)",
          uz: "Directda o'chirishga qarshi (sinov)",
          en: "Direct Anti-Unsend (Beta)"
        },
        description: {
          ru: "Пробует сохранить у вас сообщение, которое собеседник отменил в Direct. Пока это тестовая функция и срабатывает не всегда.",
          uz: "Suhbatdosh Directda bekor qilgan xabarni sizda saqlab qolishga harakat qiladi. Hozircha bu sinov funksiyasi va har doim ham ishlamaydi.",
          en: "Tries to keep a message the other person unsent in Direct. It's still a test feature and doesn't always work."
        },
        tag: { ru: "Тест", uz: "Sinov", en: "Beta" }
      },
      {
        id: "view_once",
        iconName: "Eye",
        title: {
          ru: "Одноразовые фото — ещё раз",
          uz: "Bir martalik rasmni qayta ko'rish",
          en: "Reopen View-Once Photos"
        },
        description: {
          ru: "Одноразовое фото в Direct не сгорает после первого просмотра — его можно открыть ещё раз.",
          uz: "Directdagi bir martalik rasm birinchi ko'rishdan keyin yo'qolmaydi — uni yana ochish mumkin.",
          en: "A view-once photo in Direct doesn't burn after the first look — you can open it again."
        },
        tag: { ru: "Свобода", uz: "Erkinlik", en: "Freedom" }
      }
    ],
    changelog: [
      {
        version: "1.0.0",
        date: "27.10.2026",
        items: {
          ru: [
            "Первый релиз: отдельный клон com.andusta.android, ставится рядом с Instagram",
            "Режим невидимки: истории и Direct без отметки «просмотрено», скрытие «печатает…»",
            "Повторный просмотр одноразовых фото",
            "Снятие запрета на скриншоты",
            "Скачивание фото с экрана в галерею (Pictures/Andusta)",
            "Меньше рекламной слежки"
          ],
          uz: [
            "Ilk reliz: alohida com.andusta.android kloni, Instagram yonida o'rnatiladi",
            "Arvoh rejimi: hikoya va Direct «ko'rildi» belgisisiz, «yozmoqda…» holatini yashirish",
            "Bir martalik rasmni qayta ko'rish",
            "Skrinshot taqiqini olib tashlash",
            "Ekrandagi rasmni galereyaga yuklab olish (Pictures/Andusta)",
            "Kamroq reklama kuzatuvi"
          ],
          en: [
            "First release: a standalone com.andusta.android clone that installs next to Instagram",
            "Ghost mode: stories and Direct without a seen mark, hide “typing…”",
            "Reopen view-once photos",
            "Screenshot block removed",
            "Save photos from the screen to the gallery (Pictures/Andusta)",
            "Less ad tracking"
          ]
        }
      }
    ]
  }
];

export const TELEGRAM_COMPARISON: ComparisonRow[] = [
  {
    feature: { ru: "Личный архив и мост сообщений (A-B-C)", uz: "Shaxsiy arxiv va xabarlar ko'prigi (A-B-C)", en: "Archive bridge & live relay (A-B-C)" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "Авто-дублирование и ответ со 2-го телефона 24/7", uz: "Avto-ko'chirish va 2-telefondan javob berish", en: "Live topic mirror & reply as Account A 24/7" },
    isWin: true
  },
  {
    feature: { ru: "Сохранение медиа из защищенных каналов", uz: "Himoyalangan kanallardan saqlash", en: "Save media from protected channels" },
    official: { ru: "Заблокировано (No-Forwards)", uz: "Taqiqlangan", en: "Blocked" },
    ando: { ru: "В галерею и Избранное в 1 клик", uz: "Galereyaga va Saqlanganlarga 1 bosishda", en: "Save to Gallery & Saved Messages in 1 tap" },
    isWin: true
  },
  {
    feature: { ru: "Защита под принуждением (Honeypot)", uz: "Majburiy ochishdan himoya (Honeypot)", en: "Duress Passcodes (Honeypot)" },
    official: { ru: "Один общий пин-код", uz: "Faqat bitta umumiy parol", en: "Single app passcode" },
    ando: { ru: "Аварийные пароли скрывают секретные данные", uz: "Soxta parollar maxfiy profillarni yashiradi", en: "Duress passcodes expose safe dummy profiles only" },
    isWin: true
  },
  {
    feature: { ru: "Сортировка медиа в чате по размеру", uz: "Chatdagi fayllarni hajm bo'yicha saralash", en: "Sort chat media by file size" },
    official: { ru: "Только по дате", uz: "Faqat sana bo'yicha", en: "Only by date" },
    ando: { ru: "От больших к маленьким + полный сканер", uz: "Kattadan kichikka + to'liq skaner", en: "Largest to smallest + full cloud scanner" },
    isWin: true
  },
  {
    feature: { ru: "Режим невидимки (Прочтение + Онлайн)", uz: "Arvoh rejimi (O'qilmaganlik + Onlayn)", en: "Ghost Mode (Incognito read)" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "Полное инкогнито чтения и набора", uz: "To'liq anonim o'qish va yozish", en: "Read & type without delivery receipts" },
    isWin: true
  },
  {
    feature: { ru: "Смена голоса в голосовых сообщениях", uz: "Ovozli xabarlarda ovozni o'zgartirish", en: "Voice changer for voice messages" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "C++ вокодер: бас, робот, высокий голос, студия", uz: "C++ vokoder: bas, robot, baland ovoz, studiya", en: "C++ vocoder: bass, robot, high pitch, studio" },
    isWin: true
  },
  {
    feature: { ru: "Подмена геопозиции и Live Location", uz: "Geolokatsiya va Live Location soxtasi", en: "Location & Live Location spoofing" },
    official: { ru: "Только реальный GPS", uz: "Faqat haqiqiy GPS", en: "Real GPS only" },
    ando: { ru: "Любая точка и виртуальные маршруты без root", uz: "Istalgan nuqta va virtual marshrutlar, rootsiz", en: "Any point & simulated routes, no root" },
    isWin: true
  },
  {
    feature: { ru: "Заметки к контактам", uz: "Kontaktlarga eslatmalar", en: "Contact notes" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "Приватная заметка в шапке чата, только на устройстве", uz: "Chat sarlavhasida maxfiy eslatma, faqat qurilmada", en: "Private note in the chat header, on-device only" },
    isWin: true
  },
  {
    feature: { ru: "Эргономика главного экрана", uz: "Asosiy ekran ergonomikasi", en: "Home screen ergonomics" },
    official: { ru: "Базовый список чатов", uz: "Oddiy chatlar ro'yxati", en: "Basic chat list" },
    ando: { ru: "Карусель историй, поиск-пилюля, иконки папок со счётчиками", uz: "Stories karuseli, qidiruv-tabletka, hisoblagichli jild ikonkalari", en: "Stories carousel, pill search, folder icons with counters" },
    isWin: true
  }
];

export const INSTAGRAM_COMPARISON: ComparisonRow[] = [
  {
    feature: { ru: "Просмотр историй невидимкой", uz: "Hikoyalarni yashirin ko'rish", en: "Stealth Stories" },
    official: { ru: "Автор видит вас в списке зрителей", uz: "Muallif sizni ro'yxatda ko'radi", en: "Author sees you in viewer list" },
    ando: { ru: "Без отметки «просмотрено»", uz: "«Ko'rildi» belgisisiz", en: "No seen mark sent" },
    isWin: true
  },
  {
    feature: { ru: "Анти-удаление сообщений в Direct", uz: "Directda o'chirilgan xabarlarni saqlash", en: "Anti-unsend for Direct messages" },
    official: { ru: "Сообщение исчезает бесследно", uz: "Xabar izsiz yo'qoladi", en: "Message disappears permanently" },
    ando: { ru: "Тест: пробует сохранить сообщение", uz: "Sinov: xabarni saqlashga harakat qiladi", en: "Beta: tries to keep the message" },
    isWin: true
  },
  {
    feature: { ru: "Одноразовые фото", uz: "Bir martalik rasmlar", en: "View-once photos" },
    official: { ru: "Сгорает после 1 просмотра", uz: "1 marta ko'riladi va yo'qoladi", en: "Plays once and expires" },
    ando: { ru: "Можно открыть ещё раз", uz: "Yana ochish mumkin", en: "Can be opened again" },
    isWin: true
  },
  {
    feature: { ru: "Скриншоты в Direct", uz: "Directda skrinshot qilish", en: "Direct screenshots" },
    official: { ru: "Блокируются или шлют уведомление", uz: "Bloklanadi yoki ogohlantiradi", en: "Blocked or alerts sender" },
    ando: { ru: "Запрет на скриншоты снят", uz: "Skrinshot taqiqi olib tashlangan", en: "Screenshot block removed" },
    isWin: true
  },
  {
    feature: { ru: "Установка рядом с официальным приложением", uz: "Asli yoniga ikkinchi ilova sifatida", en: "Install alongside official app" },
    official: { ru: "Только замена оригинального", uz: "Faqat bittasi o'rnatiladi", en: "Replaces original only" },
    ando: { ru: "com.andusta.android — независимый клон", uz: "com.andusta.android mustaqil klon", en: "Autonomous parallel package com.andusta.android" },
    isWin: true
  },
  {
    feature: { ru: "Своя музыка в историях", uz: "Hikoyalarga o'z musiqangiz", en: "Your own music in stories" },
    official: { ru: "Только треки из библиотеки Instagram", uz: "Faqat Instagram kutubxonasidagi treklar", en: "Only tracks from Instagram's library" },
    ando: { ru: "Свой трек с телефона при съёмке", uz: "Suratga olishda telefondagi o'z trekingiz", en: "Your own track from the phone while recording" },
    isWin: true
  },
  {
    feature: { ru: "Детектор отписок", uz: "Obunani bekor qilganlar", en: "Unfollowers tracker" },
    official: { ru: "Нет / риск бана через сторонние сервисы", uz: "Yo'q / begona servislar orqali ban xavfi", en: "None / ban risk via third-party apps" },
    ando: { ru: "На телефоне, без пароля", uz: "Telefonda, parolsiz", en: "On your phone, no password" },
    isWin: true
  },
  {
    feature: { ru: "Голосовой чейнджер в Direct", uz: "Directda ovozni o'zgartirish", en: "Voice changer in Direct" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "Смена голоса + свой трек вместо голоса", uz: "Ovozni o'zgartirish + ovoz o'rniga o'z trekingiz", en: "Voice presets + your own track instead of your voice" },
    isWin: true
  },
  {
    feature: { ru: "Шрифты", uz: "Shriftlar", en: "Fonts" },
    official: { ru: "Системный шрифт", uz: "Tizim shrifti", en: "System font" },
    ando: { ru: "Набор шрифтов + свой .ttf", uz: "Shriftlar to'plami + o'z .ttf shriftingiz", en: "Font picks + your own .ttf" },
    isWin: true
  },
  {
    feature: { ru: "Аватарка крупно", uz: "Profil rasmi kattaroq", en: "Bigger profile photos" },
    official: { ru: "Только маленький кружок", uz: "Faqat kichik doira", en: "Small circle only" },
    ando: { ru: "Крупно по долгому нажатию + скачать", uz: "Uzoq bosilganda kattaroq + yuklab olish", en: "Larger on long-press + download" },
    isWin: true
  }
];

/** Direct APK links per app (GitHub release assets). */
/**
 * Fallback APK links when the activation API does not return one. The real download URL now
 * comes from the bot's `/api/redeem-coupon` response (see DownloadModal); these stay as a
 * safety net and for the QR code.
 */
export const DOWNLOAD_URLS: Record<AppId, string> = {
  andogram: 'https://github.com/Bgnnrscrt/andouz/releases/download/v1.0.0/Andogram-arm64-v8a-27102026.apk',
  andusta: 'https://github.com/Bgnnrscrt/andouz/releases/download/v1.0.0/Andusta-v1.0.0.apk'
};

// Coupons are now validated server-side by the ANDO bot API (api.ando.uz). The old hard-coded,
// client-side list has been removed — it offered no real protection (it shipped in the bundle).
