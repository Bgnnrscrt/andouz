import { AppInfo, ComparisonRow } from './types';

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
        id: "media_sort",
        iconName: "FolderDown",
        title: {
          ru: "Сортировка медиа по размеру",
          uz: "Mediani hajm bo'yicha saralash",
          en: "Sort Media by File Size"
        },
        description: {
          ru: "Мгновенное упорядочивание гигабайтов фото, видео и голосовых сообщений от самых увесистых к лёгким. Облачный сканер истории MTProto без ручного пролистывания.",
          uz: "Gigabaytlab foto, video va ovozli xabarlarni kattasidan kichigiga qarab saralash. MTProto bulutli to'liq skaneri.",
          en: "Instantly sort gigabytes of channel and chat media by actual file size. Integrated batch cloud indexer scans MTProto history seamlessly."
        }
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
      },
      {
        id: "downloader",
        iconName: "Download",
        title: {
          ru: "Универсальный загрузчик медиа",
          uz: "Barcha mediani to'liq yuklab oluvchi",
          en: "Universal Media Downloader"
        },
        description: {
          ru: "Скачивайте Reels, Stories, посты с каруселью, IGTV и аватарки в оригинальном качестве в 1 клик прямо в галерею телефона.",
          uz: "Reels, Stories, postlar, karusel va profil rasmlarini bir marta bosish orqali asl sifatda to'g'ridan-to'g'ri galereyaga yuklab olish.",
          en: "Download Reels, Stories, carousels, voice memos, and avatar photos in original master quality directly into your device gallery."
        }
      },
      {
        id: "fake_camera",
        iconName: "Camera",
        title: {
          ru: "Подмена камеры (Fake Live Camera)",
          uz: "Soxta kamera (Fake Live Camera)",
          en: "Fake Live Camera"
        },
        description: {
          ru: "Возможность легко отправить сохраненное фото из галереи как живой снимок, только что сделанный камерой в режиме реального времени.",
          uz: "Galereyadagi istalgan rasmni huddi hozirgina kameradan olingan jonli rasm sifatida Directga yuborish imkoniyati.",
          en: "Send pre-selected photos from your gallery pretending they were just captured live through the camera."
        }
      },
      {
        id: "ad_blocker",
        iconName: "Zap",
        title: {
          ru: "Блокировка рекламы и промопостов",
          uz: "Reklama va homiylik postlarini bloklash",
          en: "Ad & Sponsored Blocker"
        },
        description: {
          ru: "Полная очистка ленты и Stories от рекламных объявлений, спонсорских интеграций и навязчивых трекеров.",
          uz: "Lenta va Stories ichidagi barcha reklama postlarini va ortiqcha trekerlarni butunlay olib tashlash.",
          en: "Completely strips out feed ads, sponsored story interruptions, shopping tags, and background telemetry trackers."
        }
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
  }
];

export const INITIAL_VALID_COUPONS = [
  "ANDO-VIP-2026",
  "ANDO-UZ-PRO",
  "VIP-STARS-FREE",
  "ANDOGRAM-SPECIAL",
  "ANDUSTA-PROMO",
  "UZBEKISTAN-2026",
  "CYBER-ANDO-777",
  "MASTER-KEY-ANDO"
];
