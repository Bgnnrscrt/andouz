import { Language } from './types';

export interface PortalTranslations {
  sidebar: {
    brand: string;
    brandTag: string;
    groupMain: string;
    groupInfo: string;
    home: string;
    projects: string;
    andogram: string;
    andusta: string;
    inDev: string;
    stats: string;
    docs: string;
    support: string;
    community: string;
    collapse: string;
    expand: string;
    statusOnline: string;
    portalVersion: string;
  };
  topbar: {
    systemStatus: string;
    downloadBtn: string;
    starsBtn: string;
    searchPlaceholder: string;
  };
  home: {
    heroBadge: string;
    heroTitle: string;
    heroSubtitle: string;
    btnProjects: string;
    btnDownload: string;
    statMods: string;
    statModsDesc: string;
    statSafe: string;
    statSafeDesc: string;
    statPrivacy: string;
    statPrivacyDesc: string;
    flagshipHeading: string;
    flagshipSubheading: string;
    interactiveHeading: string;
    interactiveSubheading: string;
  };
  projects: {
    badge: string;
    title: string;
    subtitle: string;
    tabGram: string;
    tabUsta: string;
    specsHeading: string;
    version: string;
    size: string;
    requirements: string;
    updated: string;
    downloadApk: string;
    allFeatures: string;
    compareWithOriginal: string;
    changelogHeading: string;
  };
  stats: {
    badge: string;
    title: string;
    subtitle: string;
    metricDownloads: string;
    metricDownloadsDesc: string;
    metricUsers: string;
    metricUsersDesc: string;
    metricSavedMedia: string;
    metricSavedMediaDesc: string;
    metricAntiBan: string;
    metricAntiBanDesc: string;
    chartTitle: string;
    chartSubtitle: string;
    geoTitle: string;
    geoSubtitle: string;
    devicesTitle: string;
    devicesSubtitle: string;
  };
  docs: {
    badge: string;
    title: string;
    subtitle: string;
    installTitle: string;
    installDesc: string;
    securityTitle: string;
    securityDesc: string;
    faqTitle: string;
    faqSubtitle: string;
  };
  support: {
    badge: string;
    title: string;
    subtitle: string;
    botTitle: string;
    botDesc: string;
    botBtn: string;
    feedbackTitle: string;
    feedbackDesc: string;
    responseTime: string;
    statusTitle: string;
    statusOk: string;
  };
  community: {
    badge: string;
    title: string;
    subtitle: string;
    channelTitle: string;
    channelDesc: string;
    chatTitle: string;
    chatDesc: string;
    githubTitle: string;
    githubDesc: string;
    starsBotTitle: string;
    starsBotDesc: string;
    joinBtn: string;
  };
}

export const portalI18n: Record<Language, PortalTranslations> = {
  ru: {
    sidebar: {
      brand: 'ANDO',
      brandTag: 'Экосистема',
      groupMain: 'ОСНОВНОЕ',
      groupInfo: 'СПРАВКА И ПОДДЕРЖКА',
      home: 'Главная',
      projects: 'Проекты',
      andogram: 'AndoGram',
      andusta: 'Andusta',
      inDev: 'В планах',
      stats: 'Статистика',
      docs: 'Документы',
      support: 'Техподдержка',
      community: 'ANDO в сети',
      collapse: 'Свернуть меню',
      expand: 'Развернуть меню',
      statusOnline: 'Все системы в норме',
      portalVersion: 'Портал v2.0 • 2026'
    },
    topbar: {
      systemStatus: 'Экосистема онлайн',
      downloadBtn: 'Скачать APK',
      starsBtn: '1000 Stars / Промокод',
      searchPlaceholder: 'Поиск по разделу...'
    },
    home: {
      heroBadge: '⚡ ОФИЦИАЛЬНЫЙ ПОРТАЛ ANDO • ANDROID ONLY',
      heroTitle: 'Экосистема абсолютной свободы и приватности',
      heroSubtitle: 'Независимые автономные модификации Telegram и Instagram нового поколения. Работают параллельно с официальными клиентами без необходимости Root-доступа.',
      btnProjects: 'Изучить продукты',
      btnDownload: 'Скачать приложения',
      statMods: '2 Флагмана',
      statModsDesc: 'AndoGram и Andusta',
      statSafe: '100% Анти-бан',
      statSafeDesc: 'Полная совместимость с MTProto и Meta',
      statPrivacy: 'Zero-Telemetry',
      statPrivacyDesc: 'Данные остаются только в твоём телефоне',
      flagshipHeading: 'Продукты экосистемы',
      flagshipSubheading: 'Выбери приложение для перехода к подробному описанию всех его возможностей',
      interactiveHeading: 'Интерактивный симулятор',
      interactiveSubheading: 'Протестируй эксклюзивные технологии ANDO прямо в браузере перед установкой'
    },
    projects: {
      badge: 'Каталог приложений',
      title: 'Автономные продукты нового поколения',
      subtitle: 'Каждое приложение разработано с нуля для максимального контроля, конфиденциальности и удобства.',
      tabGram: 'AndoGram (Telegram)',
      tabUsta: 'Andusta (Instagram)',
      specsHeading: 'Технические характеристики',
      version: 'Версия сборки',
      size: 'Размер APK',
      requirements: 'Требования',
      updated: 'Последнее обновление',
      downloadApk: 'Скачать этот APK',
      allFeatures: 'Все возможности приложения',
      compareWithOriginal: 'Сравнить с официальным клиентом',
      changelogHeading: 'История обновлений и патчей'
    },
    stats: {
      badge: 'Аналитика и охват',
      title: 'Статистика экосистемы ANDO',
      subtitle: 'Прозрачные метрики использования наших приложений в реальном времени.',
      metricDownloads: '54,800+',
      metricDownloadsDesc: 'Всего успешных загрузок APK',
      metricUsers: '28,400+',
      metricUsersDesc: 'Активных устройств за месяц',
      metricSavedMedia: '820,000+',
      metricSavedMediaDesc: 'Сохранено удалённых сообщений и сторис',
      metricAntiBan: '99.98%',
      metricAntiBanDesc: 'Индекс стабильности и безопасности',
      chartTitle: 'Динамика установок за последние месяцы',
      chartSubtitle: 'Помесячный прирост аудитории пользователей AndoGram и Andusta',
      geoTitle: 'География пользователей',
      geoSubtitle: 'Распределение активных пользователей по регионам',
      devicesTitle: 'Поддерживаемые версии ОС',
      devicesSubtitle: 'Стабильная работа от Android 8.0 до новейшего Android 15'
    },
    docs: {
      badge: 'База знаний',
      title: 'Руководства и Документация',
      subtitle: 'Всё, что нужно знать об установке, безопасности и настройке приложений ANDO.',
      installTitle: 'Инструкция по установке APK',
      installDesc: 'Пошаговый гайд по обходу системных предупреждений Google Play Protect, Xiaomi HyperOS, Samsung OneUI и Pixel.',
      securityTitle: 'Архитектура безопасности',
      securityDesc: 'Почему приложения ANDO не требуют Root-прав и где хранятся ключи шифрования и персональные данные.',
      faqTitle: 'Часто задаваемые вопросы (FAQ)',
      faqSubtitle: 'Ответы на главные вопросы о подписке, блокировках и обновлениях'
    },
    support: {
      badge: 'Центр помощи',
      title: 'Техническая поддержка ANDO',
      subtitle: 'Возникли трудности с установкой или есть крутая идея? Наша команда на связи.',
      botTitle: 'Официальный Telegram Support Bot',
      botDesc: 'Быстрый способ задать вопрос, запросить промокод или получить помощь напрямую от разработчиков.',
      botBtn: 'Открыть бота поддержки',
      feedbackTitle: 'Предложить новую функцию',
      feedbackDesc: 'Мы регулярно выпускаем обновления на основе пожеланий комьюнити. Расскажи, какую фичу ты хочешь видеть в AndoGram или Andusta.',
      responseTime: '⚡ Среднее время ответа: менее 15 минут',
      statusTitle: 'Состояние сервисов',
      statusOk: 'Все серверы обновлений и боты работают стабильно'
    },
    community: {
      badge: 'Сообщество',
      title: 'ANDO в сети',
      subtitle: 'Присоединяйся к нашему комьюнити, следи за анонсами и участвуй в тестировании свежих сборок.',
      channelTitle: 'Официальный Telegram-канал',
      channelDesc: 'Новости релизов, анонсы новых фич, эксклюзивные промокоды и голосования.',
      chatTitle: 'Чат сообщества',
      chatDesc: 'Обсуждение модов, помощь новичкам, обмен опытом и общение с единомышленниками.',
      githubTitle: 'Открытый репозиторий портала',
      githubDesc: 'Исходный код официального веб-портала ando.uz на GitHub.',
      starsBotTitle: 'Бот доступа и оплаты (@ando_stars_bot)',
      starsBotDesc: 'Получение мгновенного доступа к закрытым сборкам за Telegram Stars.',
      joinBtn: 'Перейти'
    }
  },
  uz: {
    sidebar: {
      brand: 'ANDO',
      brandTag: 'Ekotizim',
      groupMain: 'ASOSIY BO‘LIMLAR',
      groupInfo: "MA'LUMOT VA YORDAM",
      home: 'Bosh sahifa',
      projects: 'Loyihalar',
      andogram: 'AndoGram',
      andusta: 'Andusta',
      inDev: 'Rejadagi ilovalar',
      stats: 'Statistika',
      docs: "Qo'llanmalar",
      support: 'Texnik yordam',
      community: 'ANDO tarmoqda',
      collapse: 'Menyuni yopish',
      expand: 'Menyuni ochish',
      statusOnline: 'Tizim barqaror ishlamoqda',
      portalVersion: 'Portal v2.0 • 2026'
    },
    topbar: {
      systemStatus: 'Ekotizim onlayn',
      downloadBtn: 'APK yuklab olish',
      starsBtn: '1000 Stars / Promokod',
      searchPlaceholder: 'Bo‘lim bo‘yicha qidiruv...'
    },
    home: {
      heroBadge: '⚡ RASMIY ANDO PORTALI • FAQAT ANDROID UCHUN',
      heroTitle: 'Smartfoningiz uchun haqiqiy erkinlik va maxfiylik',
      heroSubtitle: 'Telegram va Instagram uchun maxsus yaratilgan mustaqil, kengaytirilgan mijozlar. Hech qanday Root-huquqlarisiz rasmiy ilovalar bilan birga yonma-yon ishlaydi.',
      btnProjects: 'Ilovalar bilan tanishish',
      btnDownload: 'APK fayllarni olish',
      statMods: '2 ta Flagman',
      statModsDesc: 'AndoGram va Andusta ilovalari',
      statSafe: '100% Xavfsiz',
      statSafeDesc: 'Bloklanishlardan to‘liq himoyalangan',
      statPrivacy: 'Maxfiylik kafolati',
      statPrivacyDesc: 'Barcha ma’lumotlar faqat o‘z telefoningizda qoladi',
      flagshipHeading: 'Ekotizim loyihalari',
      flagshipSubheading: 'Har bir ilovaning batafsil imkoniyatlari bilan tanishish uchun ustiga bosing',
      interactiveHeading: 'Jonli namoyish (Simulyator)',
      interactiveSubheading: 'Ilovalarni o‘rnatishdan oldin ularning eksklyuziv imkoniyatlarini brauzerda sinab ko‘ring'
    },
    projects: {
      badge: 'Ilovalar katalogi',
      title: 'Yangi avlod mustaqil ilovalari',
      subtitle: 'Har bir loyiha qulaylik, tezlik va to‘liq nazoratni ta’minlash maqsadida alohida ishlab chiqilgan.',
      tabGram: 'AndoGram (Telegram)',
      tabUsta: 'Andusta (Instagram)',
      specsHeading: 'Texnik xususiyatlar',
      version: 'Versiya',
      size: 'Fayl hajmi',
      requirements: 'Talab qilinadi',
      updated: 'Yangilangan sana',
      downloadApk: 'Ushbu APKni yuklash',
      allFeatures: 'Ilovaning barcha imkoniyatlari',
      compareWithOriginal: 'Rasmiy versiya bilan taqqoslash',
      changelogHeading: 'O‘zgarishlar va yangiliklar tarixi'
    },
    stats: {
      badge: 'Raqamlar va natijalar',
      title: 'ANDO ekotizimi statistikasi',
      subtitle: 'Ilovalarimizdan foydalanish bo‘yicha shaffof va real vaqtdagi ko‘rsatkichlar.',
      metricDownloads: '54,800+',
      metricDownloadsDesc: 'Muvaffaqiyatli yuklab olingan APKlar',
      metricUsers: '28,400+',
      metricUsersDesc: 'Oylik faol foydalanuvchilar soni',
      metricSavedMedia: '820,000+',
      metricSavedMediaDesc: 'Saqlab qolingan o‘chirilgan xabarlar va media',
      metricAntiBan: '99.98%',
      metricAntiBanDesc: 'Tizim barqarorligi va xavfsizlik indeksi',
      chartTitle: 'Oylik yuklab olishlar dinamikasi',
      chartSubtitle: 'AndoGram va Andusta foydalanuvchilarining oylar bo‘yicha o‘sishi',
      geoTitle: 'Foydalanuvchilar geografiyasi',
      geoSubtitle: 'Faol foydalanuvchilarning hududlar bo‘yicha taqsimoti',
      devicesTitle: 'Qo‘llab-quvvatlanadigan Android versiyalari',
      devicesSubtitle: 'Android 8.0 dan eng so‘nggi Android 15 gacha barqaror ishlaydi'
    },
    docs: {
      badge: "Qo'llanmalar markazi",
      title: "Hujjatlar va O'rnatish qo'llanmalari",
      subtitle: "ANDO ilovalarini to'g'ri o'rnatish, sozlash va xavfsizlik bo'yicha to'liq ma'lumotlar.",
      installTitle: "APKni o'rnatish bo'yicha yo'riqnoma",
      installDesc: "Google Play Protect, Xiaomi (HyperOS), Samsung (OneUI) va boshqa tizimlarda ogohlantirishlarsiz o'rnatish usullari.",
      securityTitle: 'Xavfsizlik va maxfiylik arxitekturasi',
      securityDesc: "Nega bizning ilovalarga Root kerak emas va yozishmalar xavfsizligi qanday ta'minlanadi.",
      faqTitle: "Ko'p beriladigan savollar (FAQ)",
      faqSubtitle: "Obuna, yangilanishlar va akkaunt xavfsizligi bo'yicha eng muhim savollarga javoblar"
    },
    support: {
      badge: 'Yordam markazi',
      title: 'ANDO texnik qo‘llab-quvvatlash xizmati',
      subtitle: 'O‘rnatishda savollar bormi yoki yangi taklifingiz bormi? Biz sizga yordam berishga tayyormiz.',
      botTitle: 'Rasmiy Telegram yordamchi boti',
      botDesc: 'Savollaringizni to‘g‘ridan-to‘g‘ri dasturchilar guruhiga yo‘llash va tezkor javob olishning eng oson yo‘li.',
      botBtn: 'Yordamchi botni ochish',
      feedbackTitle: 'Yangi g‘oya yoki funksiya taklif qilish',
      feedbackDesc: 'Biz foydalanuvchilar takliflari asosida yangi imkoniyatlar qo‘shamiz. O‘z fikringizni ulashing.',
      responseTime: '⚡ O‘rtacha javob vaqti: 15 daqiqadan kam',
      statusTitle: 'Serverlar holati',
      statusOk: 'Barcha yangilanish serverlari va botlar uzluksiz ishlamoqda'
    },
    community: {
      badge: 'Hamjamiyat',
      title: 'ANDO ijtimoiy tarmoqlarda',
      subtitle: 'Bizning hamjamiyatimizga qo‘shiling, yangiliklardan birinchilardan bo‘lib xabardor bo‘ling.',
      channelTitle: 'Rasmiy Telegram kanalimiz',
      channelDesc: 'Barcha yangi relizlar, qo‘shilgan imkoniyatlar, promokodlar va e’lonlar.',
      chatTitle: 'Foydalanuvchilar muloqot guruhi',
      chatDesc: 'Fikr almashish, yangi kelganlarga yordam va savol-javoblar.',
      githubTitle: 'Portal ochiq kodli repozitoriysi',
      githubDesc: 'ando.uz rasmiy veb-portalining GitHubdagi ochiq kodi.',
      starsBotTitle: 'To‘lov va ruxsat boti (@ando_stars_bot)',
      starsBotDesc: 'Telegram Stars orqali tezkor litsenziya olish imkoniyati.',
      joinBtn: 'Kirish'
    }
  },
  en: {
    sidebar: {
      brand: 'ANDO',
      brandTag: 'Ecosystem',
      groupMain: 'MAIN NAVIGATION',
      groupInfo: 'INFO & SUPPORT',
      home: 'Home',
      projects: 'Projects',
      andogram: 'AndoGram',
      andusta: 'Andusta',
      inDev: 'Upcoming Apps',
      stats: 'Analytics',
      docs: 'Docs & Guides',
      support: 'Support',
      community: 'Community',
      collapse: 'Collapse sidebar',
      expand: 'Expand sidebar',
      statusOnline: 'All systems operational',
      portalVersion: 'Portal v2.0 • 2026'
    },
    topbar: {
      systemStatus: 'Ecosystem Online',
      downloadBtn: 'Download APK',
      starsBtn: '1000 Stars / Promo',
      searchPlaceholder: 'Search portal...'
    },
    home: {
      heroBadge: '⚡ OFFICIAL ANDO PORTAL • ANDROID ONLY',
      heroTitle: 'Ultimate Privacy and Power for Your Smartphone',
      heroSubtitle: 'Autonomous, next-generation clients for Telegram and Instagram. Runs side-by-side with official apps without requiring Root privileges.',
      btnProjects: 'Explore Apps',
      btnDownload: 'Get APK Files',
      statMods: '2 Flagship Apps',
      statModsDesc: 'AndoGram and Andusta',
      statSafe: '100% Anti-Ban Safe',
      statSafeDesc: 'Fully compliant with MTProto and Meta protocols',
      statPrivacy: 'Zero-Telemetry',
      statPrivacyDesc: 'Your private data never leaves your device',
      flagshipHeading: 'Ecosystem Products',
      flagshipSubheading: 'Select an app to view detailed feature breakdown and specifications',
      interactiveHeading: 'Live Device Simulator',
      interactiveSubheading: 'Test exclusive ANDO power-user capabilities directly in your browser before installing'
    },
    projects: {
      badge: 'Product Catalog',
      title: 'Autonomous Next-Gen Android Clients',
      subtitle: 'Engineered from scratch for power users seeking uncompromised privacy and control.',
      tabGram: 'AndoGram (Telegram)',
      tabUsta: 'Andusta (Instagram)',
      specsHeading: 'Technical Specifications',
      version: 'Build Version',
      size: 'Package Size',
      requirements: 'OS Requirement',
      updated: 'Last Updated',
      downloadApk: 'Download APK',
      allFeatures: 'All Features & Capabilities',
      compareWithOriginal: 'Compare with Stock App',
      changelogHeading: 'Release Notes & Patch History'
    },
    stats: {
      badge: 'Real-time Metrics',
      title: 'ANDO Ecosystem Analytics',
      subtitle: 'Transparent and live performance metrics from active installations.',
      metricDownloads: '54,800+',
      metricDownloadsDesc: 'Total successful APK installations',
      metricUsers: '28,400+',
      metricUsersDesc: 'Monthly active devices',
      metricSavedMedia: '820,000+',
      metricSavedMediaDesc: 'Deleted messages & expired media retained',
      metricAntiBan: '99.98%',
      metricAntiBanDesc: 'Stability and account safety index',
      chartTitle: 'Monthly Growth & Downloads',
      chartSubtitle: 'User base expansion for AndoGram and Andusta',
      geoTitle: 'User Demographics',
      geoSubtitle: 'Regional distribution of active installations',
      devicesTitle: 'Supported Android Generations',
      devicesSubtitle: 'Fully tested from Android 8.0 up to Android 15'
    },
    docs: {
      badge: 'Knowledge Base',
      title: 'Documentation & Guides',
      subtitle: 'Everything you need to know about installation, privacy and security.',
      installTitle: 'APK Installation Walkthrough',
      installDesc: 'Step-by-step guidance to bypass Play Protect warnings on Xiaomi HyperOS, Samsung OneUI and Google Pixel.',
      securityTitle: 'Security Architecture',
      securityDesc: 'Why Root access is not required and how encryption keys remain localized on-device.',
      faqTitle: 'Frequently Asked Questions',
      faqSubtitle: 'Answers regarding subscriptions, safety guarantees and updates'
    },
    support: {
      badge: 'Help Center',
      title: 'ANDO Technical Support',
      subtitle: 'Need assistance with setup or have a feature idea? Our team is available 24/7.',
      botTitle: 'Official Support Bot on Telegram',
      botDesc: 'Direct channel to ask technical questions, request promo codes, or report issues.',
      botBtn: 'Launch Support Bot',
      feedbackTitle: 'Submit Feature Requests',
      feedbackDesc: 'We regularly publish updates based on user suggestions. Tell us what you want added.',
      responseTime: '⚡ Average response time: under 15 minutes',
      statusTitle: 'Infrastructure Status',
      statusOk: 'All update nodes and bots are operating normally'
    },
    community: {
      badge: 'Ecosystem Network',
      title: 'ANDO Across the Web',
      subtitle: 'Join our community channels, follow updates, and test preview releases.',
      channelTitle: 'Official Telegram Channel',
      channelDesc: 'Release announcements, feature reveals, promo codes and polls.',
      chatTitle: 'Community Discussion Chat',
      chatDesc: 'Connect with fellow power users, share tips and ask questions.',
      githubTitle: 'Open Source Web Portal',
      githubDesc: 'Source code for the ando.uz ecosystem portal on GitHub.',
      starsBotTitle: 'Access & Licensing Bot (@ando_stars_bot)',
      starsBotDesc: 'Instant license unlocks via Telegram Stars.',
      joinBtn: 'Open'
    }
  }
};

