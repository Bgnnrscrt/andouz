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
          ru: "Специальные аварийные пароли разблокировки. При вводе ложного пароля открывается пустой или фейковый профиль, а реальные секретные чаты и мосты бесследно скрываются.",
          uz: "Maxsus xavfsizlik parollari. Soxta parol kiritilganda begona shaxsga faqat bo'sh profil ko'rsatiladi, haqiqiy yozishmalar esa butunlay yashiriladi.",
          en: "Emergency duress passcodes. Unlocking with a fake pin displays safe dummy profile data while sensitive private chats and bridge topics remain completely hidden."
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
      ru: "Instagram без рекламы, ограничений и слежки",
      uz: "Reklamasiz, cheklovlarsiz va kuzatuvlarsiz Instagram",
      en: "Instagram Free from Ads, Tracking & Restrictions"
    },
    description: {
      ru: "Полностью автономный клон Instagram (com.andusta.android) без необходимости Root-доступа. Включает режим невидимки, сохранение удалённых сообщений в Direct, обход одноразовых фото, скачивание любых медиа и блокировку рекламы.",
      uz: "Mustaqil com.andusta.android paketi bilan alohida o'rnatiladigan Instagram kloni: arvoh rejimi, o'chirilgan xabarlarni saqlash, bir martalik mediani cheksiz ko'rish va to'liq yuklab oluvchi.",
      en: "Fully autonomous rootless Instagram clone (com.andusta.android). Features ghost mode, anti-unsend for Direct messages, view-once media replay, master quality downloader, and zero ads."
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
          ru: "Смотрите Stories, трансляции и читайте Direct без отметки о прочтении (seen). Скрытие статуса онлайн и анимации набора текста.",
          uz: "Stories va jonli efirlarni yashirin ko'ring, Direct xabarlarini o'qilganlik holatisiz oching. Onlayn va yozmoqda holatini butunlay yashirish.",
          en: "Stealth viewing for Stories and Live streams. Read Direct messages without sending seen receipts. Conceal online status and typing activity."
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
          ru: "100% безопасный локальный анализ подписчиков без передачи пароля сторонним сервисам. Бейдж взаимной подписки прямо в профиле человека.",
          uz: "Parol bermasdan ishlaydigan xavfsiz tahlil: kim obunani bekor qilganini va o'zaro obuna holatini bevosita profilda ko'ring.",
          en: "100% credential-free on-device follower analysis. Unmask who unfollowed you and see mutual follow badges directly in profiles."
        },
        tag: { ru: "Безопасность", uz: "Xavfsizlik", en: "Security" }
      },
      {
        id: "music_unlocker",
        iconName: "Music",
        title: {
          ru: "Своя музыка на видео & Снятие гео-блока",
          uz: "Videoga o'z musiqangizni qo'yish & Cheklovni yechish",
          en: "Custom Audio Muxer & Music Region Bypass"
        },
        description: {
          ru: "Наложение любого MP3/M4A с телефона на Stories и Reels с заменой или микшированием звука, плюс разблокировка недоступной в регионе музыки.",
          uz: "Telefondan istalgan MP3-ni Stories/Reels-ga qo'yish va 'Musiqa mintaqangizda mavjud emas' cheklovlarini butunlay olib tashlash.",
          en: "Attach local MP3 audio files onto Stories and Reels with audio mixing, plus full bypass of regional music lockouts."
        },
        tag: { ru: "Свобода", uz: "Erkinlik", en: "Freedom" }
      },
      {
        id: "anti_unsend",
        iconName: "Shield",
        title: {
          ru: "Анти-Удаление в Direct (Anti-Unsend)",
          uz: "Directda O'chirishga Qarshi Himoya",
          en: "Direct Anti-Unsend"
        },
        description: {
          ru: "Если собеседник отменил отправку сообщения в Direct, оно навсегда остаётся в вашем чате с пометкой ⚠️ [Удалено] и точным временем.",
          uz: "Suhbatdoshingiz Directda xabarni o'chirib tashlasa ham, u sizda ⚠️ [O'chirildi] belgisi bilan abadiy saqlanib qoladi.",
          en: "When someone unsends a Direct message, it remains permanently in your conversation marked with an unmistakable ⚠️ [Unsent] badge."
        },
        tag: { ru: "Эксклюзив", uz: "Eksklyuziv", en: "Exclusive" }
      },
      {
        id: "view_once",
        iconName: "Eye",
        title: {
          ru: "Обход одноразовых фото & видео",
          uz: "Bir martalik mediani cheksiz ko'rish",
          en: "Unlimited View-Once Media"
        },
        description: {
          ru: "Просматривайте исчезающие фото и видео в Direct неограниченное количество раз, делайте скриншоты без уведомления и сохраняйте их в галерею.",
          uz: "Directdagi 1 marta ko'riladigan rasm va videolarni istalgancha qayta ko'ring, skrinshot qiling va galereyaga saqlab oling.",
          en: "Replay expiring view-once photos and videos indefinitely, bypass screenshot blocks without notifying the sender, and save them straight to storage."
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
            "Первый публичный релиз автономного клона com.andusta.android",
            "Режим невидимки (истории, статус прочтения, набор текста)",
            "Анти-удаление сообщений в Direct с пометкой ⚠️",
            "Бесконечный просмотр одноразовых фото и видео",
            "Снятие запрета скриншотов со всех экранов",
            "Универсальный загрузчик медиа в Pictures/Andusta и Movies/Andusta",
            "Блокировка рекламы в ленте и историях"
          ],
          uz: [
            "Mustaqil com.andusta.android klonining ilk rasmiy chiqishi",
            "Arvoh rejimi (hikoyalar, o'qilganlik holati, yozish ko'rsatkichi)",
            "Directda o'chirilgan xabarlarni ⚠️ belgisi bilan saqlash",
            "Bir martalik foto va videolarni cheksiz ko'rish",
            "Barcha ekranlardan skrinshot taqiqini olib tashlash",
            "Pictures/Andusta va Movies/Andusta jildlariga yuklovchi",
            "Lenta va hikoyalarda reklamani bloklash"
          ],
          en: [
            "Initial public release of autonomous clone com.andusta.android",
            "Ghost mode (stories, seen status, typing indicator)",
            "Anti-unsend for Direct messages marked with ⚠️",
            "Unlimited view once for disappearing media",
            "Screenshot protection stripped from all surfaces",
            "Universal downloader to Pictures/Andusta & Movies/Andusta",
            "In-feed and stories ad blocker"
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
    feature: { ru: "Анонимный просмотр историй и эфиров", uz: "Hikoyalarni yashirin ko'rish", en: "Stealth Stories & Live" },
    official: { ru: "Автор видит вас в списке зрителей", uz: "Muallif sizni ro'yxatda ko'radi", en: "Author sees you in viewer list" },
    ando: { ru: "100% анонимно, без отметки seen", uz: "100% anonim, belgisiz", en: "100% anonymous, no seen marker sent" },
    isWin: true
  },
  {
    feature: { ru: "Анти-удаление сообщений в Direct", uz: "Directda o'chirilgan xabarlarni saqlash", en: "Anti-unsend for Direct messages" },
    official: { ru: "Сообщение исчезает бесследно", uz: "Xabar izsiz yo'qoladi", en: "Message disappears permanently" },
    ando: { ru: "Сохраняется с меткой ⚠️ [Удалено]", uz: "⚠️ [O'chirildi] belgisi bilan qoladi", en: "Preserved with ⚠️ [Unsent] tag" },
    isWin: true
  },
  {
    feature: { ru: "Бесконечные одноразовые фото и видео", uz: "Bir martalik o'chuvchi media", en: "Disappearing view-once media" },
    official: { ru: "Сгорает после 1 просмотра", uz: "1 marta ko'riladi va yo'qoladi", en: "Plays once and expires" },
    ando: { ru: "Бесконечный просмотр + скачивание", uz: "Cheksiz qayta ko'rish va saqlash", en: "Unlimited replay + save to gallery" },
    isWin: true
  },
  {
    feature: { ru: "Скриншоты в исчезающих чатах Direct", uz: "Directda skrinshot qilish", en: "Direct screenshots" },
    official: { ru: "Блокируются или шлют уведомление", uz: "Bloklanadi yoki ogohlantiradi", en: "Blocked or alerts sender" },
    ando: { ru: "FLAG_SECURE снят, без уведомлений", uz: "Taqiq yo'q, xabarsiz", en: "FLAG_SECURE bypassed cleanly" },
    isWin: true
  },
  {
    feature: { ru: "Установка поверх официального клиента", uz: "Asli yoniga ikkinchi ilova sifatida", en: "Install alongside official app" },
    official: { ru: "Только замена оригинального", uz: "Faqat bittasi o'rnatiladi", en: "Replaces original only" },
    ando: { ru: "com.andusta.android — независимый клон", uz: "com.andusta.android mustaqil klon", en: "Autonomous parallel package com.andusta.android" },
    isWin: true
  },
  {
    feature: { ru: "История правок сообщений в Direct", uz: "Direct xabarlari tahrir tarixi", en: "Direct message edit history" },
    official: { ru: "Только текущий текст", uz: "Faqat joriy matn", en: "Current text only" },
    ando: { ru: "Вся история правок: Было / Стало", uz: "Barcha tahrirlar: Dastlab / O'zgartirildi", en: "Full edit history: before / after" },
    isWin: true
  },
  {
    feature: { ru: "Своя музыка на Stories и Reels", uz: "Stories va Reels uchun o'z musiqangiz", en: "Your own music on Stories & Reels" },
    official: { ru: "Ограничения по регионам", uz: "Mintaqaviy cheklovlar", en: "Region-locked tracks" },
    ando: { ru: "Любой MP3 с телефона + снятие гео-блока", uz: "Telefondagi istalgan MP3 + geo-blokni yechish", en: "Any MP3 from your phone + region bypass" },
    isWin: true
  },
  {
    feature: { ru: "Детектор отписок", uz: "Obunani bekor qilganlar", en: "Unfollowers tracker" },
    official: { ru: "Нет / риск бана через сторонние сервисы", uz: "Yo'q / begona servislar orqali ban xavfi", en: "None / ban risk via third-party apps" },
    ando: { ru: "100% безопасный локальный анализ без пароля", uz: "Parolsiz 100% xavfsiz lokal tahlil", en: "100% safe on-device analysis, no password" },
    isWin: true
  },
  {
    feature: { ru: "Голосовой чейнджер в Direct", uz: "Directda ovozni o'zgartirish", en: "Voice changer in Direct" },
    official: { ru: "Отсутствует", uz: "Mavjud emas", en: "Not available" },
    ando: { ru: "Смена тембра + отправка MP3 как голосового", uz: "Tembrni o'zgartirish + MP3 ni ovozli xabar qilib yuborish", en: "Voice presets + send any MP3 as a voice note" },
    isWin: true
  },
  {
    feature: { ru: "Эмодзи и шрифты", uz: "Emoji va shriftlar", en: "Emojis & fonts" },
    official: { ru: "Системные Android", uz: "Tizimdagi Android", en: "Stock Android" },
    ando: { ru: "Оригинальные Apple iOS Emoji + свои .ttf", uz: "Asl Apple iOS Emoji + o'z .ttf shriftlaringiz", en: "Authentic Apple iOS emojis + custom .ttf" },
    isWin: true
  },
  {
    feature: { ru: "Аватарки в Full HD", uz: "Full HD profil rasmlari", en: "Full HD avatars" },
    official: { ru: "Сжатая превью 150×150", uz: "Siqilgan 150×150 eskiz", en: "Compressed 150×150 preview" },
    ando: { ru: "Оригинал в полном разрешении с зумом", uz: "To'liq o'lchamdagi asl rasm, kattalashtirish bilan", en: "Full-resolution original with zoom" },
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
