import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  ChevronDown,
  Sparkles,
  HelpCircle,
  HardDrive
} from 'lucide-react';
import { Language } from '../../../types';
import { portalI18n } from '../../../portalTranslations';
import { InstallGuide } from '../../InstallGuide';
import './DocsView.css';

interface DocsViewProps {
  lang: Language;
}

export const DocsView: React.FC<DocsViewProps> = ({ lang }) => {
  const t = portalI18n[lang];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const faqItems = lang === 'uz' ? [
    {
      q: "ANDO ilovalaridan foydalanish akkaunt uchun xavfsizsizmi? Bloklanish xavfi bormi?",
      a: "AndoGram va Andusta rasmiy API va protokollarga to‘liq mos holda ishlaydi. Ular rasmiy mijozlar bilan bir xil MTProto va GraphQL so‘rovlarini yuboradi, shuning uchun Telegram yoki Instagram serverlari tomonidan bloklanish yoki cheklovlar xavfi mutlaqo yo‘q (Anti-ban 99.98%)."
    },
    {
      q: "Rasmiy Telegram yoki Instagram ilovalarini o‘chirib tashlash kerakmi?",
      a: "Yo‘q, shart emas! Har bir ilovamiz o‘zining mustaqil paket nomiga ega (masalan, com.andusta.android). Ular rasmiy ilovalar bilan yonma-yon parallel ravishda ishlaydi va bir-biriga xalaqit bermaydi."
    },
    {
      q: "O‘rnatish uchun telefonda Root-huquqlar (magisk) kerak bo‘ladimi?",
      a: "Umuman yo‘q! Barcha imkoniyatlar (jumladan, skrinshot taqiqini yechish, o‘chirilgan xabarlarni saqlash va Ghost Mode) oddiy Android ruxsatnomalari asosida, telefon tizimini buzmasdan ishlaydi."
    },
    {
      q: "Shaxsiy Arxiv Ko‘prigi (A-B-C) qanday ishlaydi?",
      a: "AndoGram shaxsiy chatlaringizni siz ochgan maxfiy forumga avtomatik ravishda nusxalab boradi. Agar ikkinchi telefoningiz bo‘lsa, siz asosiy akkaunt nomidan turib o‘sha forum orqali javob yo‘llashingiz mumkin."
    },
    {
      q: "Ilovalarni qanday yangilab turish mumkin?",
      a: "Har bir yangi reliz chiqqanda ilovaning o‘zida yangilanish bildirishnomasi paydo bo‘ladi. Shuningdek, doimo ando.uz portalimiz orqali eng so‘nggi APK versiyasini yuklab olishingiz mumkin."
    }
  ] : lang === 'ru' ? [
    {
      q: "Безопасно ли использовать моды ANDO? Есть ли риск блокировки аккаунта?",
      a: "AndoGram и Andusta отправляют абсолютно легитимные запросы через оригинальные протоколы MTProto и Meta GraphQL. Серверы распознают их как стандартные клиенты. За всё время работы не зафиксировано ни одной блокировки пользователей за использование наших сборок."
    },
    {
      q: "Нужно ли удалять официальные приложения Telegram или Instagram?",
      a: "Нет, удалять ничего не нужно! Наши приложения имеют уникальные идентификаторы пакетов (например, com.andusta.android) и устанавливаются автономно рядом с официальными клиентами."
    },
    {
      q: "Нужен ли Root-доступ (Magisk/KernelSU) для работы функций?",
      a: "Root-права не требуются! Все возможности — снятие запрета скриншотов FLAG_SECURE, перехват удалённых сообщений, обход No-Forwards и загрузка Reels — реализованы на прикладном уровне APK."
    },
    {
      q: "Как работает технология Личного Архива и Моста (A-B-C)?",
      a: "AndoGram автоматически зеркалирует входящие диалоги в созданный вами закрытый форум Telegram. Это позволяет со второго телефона или планшета отвечать собеседникам от имени основного аккаунта в режиме 24/7."
    },
    {
      q: "Как получать свежие обновления приложений?",
      a: "В приложения встроен безопасный чекер апдейтов. Также актуальные APK всегда доступны для скачивания на официальном портале ando.uz и в нашем Telegram-канале."
    }
  ] : [
    {
      q: "Is it safe to use ANDO mods? Can my account get banned?",
      a: "AndoGram and Andusta interact strictly through authentic MTProto and GraphQL API protocols without altering server signatures. Accounts remain 100% safe from bans and restrictions."
    },
    {
      q: "Do I need to uninstall the original Telegram or Instagram apps?",
      a: "No! Both clients have independent package namespaces and install side-by-side with original applications without conflicts."
    },
    {
      q: "Are Root privileges required?",
      a: "Root is completely unnecessary. All privacy mechanisms and downloaders operate inside standard Android runtime sandboxes."
    },
    {
      q: "How does the Archive Bridge (A-B-C) work?",
      a: "AndoGram duplicates private chats directly to a private Telegram forum topic, enabling you to reply seamlessly from a secondary phone 24/7."
    },
    {
      q: "How do I update the applications?",
      a: "Applications feature an integrated update prompt. You can also always download fresh APK releases directly from ando.uz."
    }
  ];

  return (
    <div className="ptl-docs-view">
      {/* 1. Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(0,245,155,0.1)', border: '1px solid rgba(0,245,155,0.25)', color: '#00f59b', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={13} />
          <span>{t.docs.badge}</span>
        </div>
        <h1 className="ptl-section-title">{t.docs.title}</h1>
        <p className="ptl-section-subtitle">{t.docs.subtitle}</p>
      </div>

      {/* 2. Step-by-step Installation Guide */}
      <section>
        <InstallGuide lang={lang} />
      </section>

      {/* 3. Security Architecture Card */}
      <section className="ptl-docs-security-card">
        <div>
          <h2 className="ptl-section-title" style={{ fontSize: '1.4rem' }}>{t.docs.securityTitle}</h2>
          <p className="ptl-section-subtitle">{t.docs.securityDesc}</p>
        </div>

        <div className="ptl-security-grid">
          <div className="ptl-security-item">
            <div className="ptl-security-icon">
              <Lock size={20} />
            </div>
            <h3 className="ptl-security-title">
              {lang === 'uz' ? 'Mahalliy shifrlash' : 'Локальное хранение'}
            </h3>
            <p className="ptl-security-desc">
              {lang === 'uz'
                ? 'Sessiya kalitlari va shaxsiy ma’lumotlar faqat qurilmangizning xavfsiz xotirasida (KeyStore) saqlanadi va begona serverlarga uzatilmaydi.'
                : 'Ключи сессий и токены авторизации хранятся исключительно во внутреннем защищенном хранилище Android Keystore.'}
            </p>
          </div>

          <div className="ptl-security-item">
            <div className="ptl-security-icon" style={{ color: '#00b4d8', background: 'rgba(0,180,216,0.1)' }}>
              <HardDrive size={20} />
            </div>
            <h3 className="ptl-security-title">
              {lang === 'uz' ? 'No-Root arxitekturasi' : 'Без вмешательства в ОС'}
            </h3>
            <p className="ptl-security-desc">
              {lang === 'uz'
                ? 'Ilovalar tizim fayllarini o‘zgartirmaydi, bu esa banking ilovalari (Click, Payme, Uzum) bilan 100% muammosiz ishlashini ta’minlaydi.'
                : 'Не нарушает целостность системы и SafetyNet/Play Integrity: банковские клиенты и сервисы бесконтактной оплаты продолжают работать без сбоев.'}
            </p>
          </div>

          <div className="ptl-security-item">
            <div className="ptl-security-icon" style={{ color: '#ff007f', background: 'rgba(255,0,127,0.1)' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 className="ptl-security-title">
              {lang === 'uz' ? 'Nolinchi telemetriya' : 'Zero-Telemetry'}
            </h3>
            <p className="ptl-security-desc">
              {lang === 'uz'
                ? 'Ilovalardan barcha tashqi reklama trekerlari, analitika skriptlari va ortiqcha foniy jarayonlar butunlay olib tashlangan.'
                : 'Полная очистка от маркетинговой телеметрии Facebook/Meta, рекламных идентификаторов и сторонних трекеров.'}
            </p>
          </div>
        </div>
      </section>

      {/* 4. FAQ Accordion */}
      <section>
        <div className="ptl-section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <HelpCircle size={20} color="#00f59b" />
            <h2 className="ptl-section-title">{t.docs.faqTitle}</h2>
          </div>
          <p className="ptl-section-subtitle">{t.docs.faqSubtitle}</p>
        </div>

        <div className="ptl-faq-list">
          {faqItems.map((item, idx) => (
            <div
              key={idx}
              className={`ptl-faq-item ${openFaq === idx ? 'open' : ''}`}
            >
              <button
                type="button"
                className="ptl-faq-question"
                onClick={() => toggleFaq(idx)}
              >
                <span>{item.q}</span>
                <ChevronDown size={18} className="ptl-faq-icon" />
              </button>
              {openFaq === idx && (
                <div className="ptl-faq-answer">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

