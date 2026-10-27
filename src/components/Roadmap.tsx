import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';

interface RoadmapProps {
  lang: Language;
}

export const Roadmap: React.FC<RoadmapProps> = ({ lang }) => {
  const t = translations.roadmap;

  const getCards = () => {
    switch (lang) {
      case 'uz':
        return [
          { status: "Chiqarildi", title: "AndoGram v10.9.2", desc: "A-B-C Arxiv ko'prigi, MTProto fayllarni hajm bo'yicha saralash, Honeypot parollari, 3D AR-niqoblar.", color: "#00b4d8", done: true },
          { status: "Chiqarildi", title: "Andusta v1.0.0", desc: "Avtonom com.andusta.android paketi, Arvoh rejimi, Directda o'chirishga qarshi himoya, View-Once cheksiz ko'rish.", color: "#ff007f", done: true },
          { status: "Ishlab chiqilmoqda", title: "AndoTube", desc: "YouTube uchun erkin mijoz: orqa fonda ijro, reklama bloklash, 4K yuklash va SponsorBlock integratsiyasi.", color: "#00f59b", progress: true },
          { status: "Rejada", title: "AndoVPN", desc: "VLESS/XTLS protokollari asosidagi xavfsiz va tezkor shaxsiy tunnel xizmati.", color: "#f59e0b", idea: true }
        ];
      case 'en':
        return [
          { status: "Released", title: "AndoGram v10.9.2", desc: "A-B-C Archive bridge, MTProto size sorter, Duress Honeypot passcodes, 3D AR masks.", color: "#00b4d8", done: true },
          { status: "Released", title: "Andusta v1.0.0", desc: "Autonomous com.andusta.android clone, Ghost Mode, Direct anti-unsend, Unlimited view-once media.", color: "#ff007f", done: true },
          { status: "In Development", title: "AndoTube", desc: "Libre YouTube client: background playback, ad blocking, 4K video downloader, and SponsorBlock.", color: "#00f59b", progress: true },
          { status: "Planned", title: "AndoVPN", desc: "High-speed encrypted tunnel built on modern VLESS/XTLS protocols for complete internet freedom.", color: "#f59e0b", idea: true }
        ];
      default:
        return [
          { status: "Выпущено", title: "AndoGram v10.9.2", desc: "Мост Архива A-B-C, умная сортировка медиа по размеру, Honeypot-пароли, аппаратные 3D AR-маски.", color: "#00b4d8", done: true },
          { status: "Выпущено", title: "Andusta v1.0.0", desc: "Автономный клон com.andusta.android, Режим невидимки, Анти-удаление в Direct, обход одноразовых медиа.", color: "#ff007f", done: true },
          { status: "В разработке", title: "AndoTube", desc: "Свободный клиент YouTube: фоновое воспроизведение, пропуск спонсорских вставок, скачивание 4K и ноль рекламы.", color: "#00f59b", progress: true },
          { status: "В планах", title: "AndoVPN", desc: "Высокоскоростной защищённый туннель на протоколах VLESS/XTLS для полной свободы в сети.", color: "#f59e0b", idea: true }
        ];
    }
  };

  const cards = getCards();

  return (
    <section id="roadmap" style={{ padding: '80px 0', background: 'rgba(8, 10, 15, 0.4)' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            {t.badge[lang]}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '16px', fontWeight: 800 }}>
            {t.title[lang]}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>{t.subtitle[lang]}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '24px 20px',
                borderRadius: 'var(--radius-lg)',
                borderTop: `3px solid ${card.color}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: card.color, marginBottom: '12px' }}>
                {card.done && <CheckCircle2 size={18} />}
                {card.progress && <Clock size={18} />}
                {card.idea && <Sparkles size={18} />}
                <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                  {card.status}
                </span>
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{card.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Suggest Feature Callout */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(0, 245, 155, 0.08) 0%, rgba(0, 180, 216, 0.08) 100%)',
          border: '1px solid rgba(0, 245, 155, 0.2)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <h4 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>{t.suggestTitle[lang]}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              {t.suggestDesc[lang]}
            </p>
          </div>

          <a
            href="https://t.me/ando_stars_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ padding: '12px 24px' }}
          >
            <Send size={18} color="#00f59b" />
            <span>{t.btnSuggest[lang]}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
