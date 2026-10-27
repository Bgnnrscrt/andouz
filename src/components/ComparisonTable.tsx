import React, { useState } from 'react';
import { Language } from '../types';
import { TELEGRAM_COMPARISON, INSTAGRAM_COMPARISON } from '../data';
import { Check, X, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  lang: Language;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  const [activeTab, setActiveTab] = useState<'telegram' | 'instagram'>('telegram');

  const rows = activeTab === 'telegram' ? TELEGRAM_COMPARISON : INSTAGRAM_COMPARISON;
  const activeColor = activeTab === 'telegram' ? 'var(--accent-gram)' : 'var(--accent-usta)';

  const getLabels = () => {
    switch (lang) {
      case 'uz':
        return {
          badge: "To'g'ridan-to'g'ri taqqoslash",
          title: "Rasmiy Ilovalar Bilan Taqqoslash",
          subtitle: "Nega ilg'or foydalanuvchilar cheklangan rasmiy ilovalar o'rniga ANDO ekotizimini tanlashadi",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Imkoniyat / Funksiya",
          thOfficial: "Rasmiy Ilova",
          thAndo: "ANDO Versiyasi"
        };
      case 'en':
        return {
          badge: "Direct Comparison",
          title: "Comparison with Official Apps",
          subtitle: "Why power users choose ANDO ecosystem over restricted official clients",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Feature / Capability",
          thOfficial: "Official App",
          thAndo: "ANDO Version"
        };
      default:
        return {
          badge: "Прямое сравнение",
          title: "Сравнение с Официальными Клиентами",
          subtitle: "Почему продвинутые пользователи выбирают экосистему ANDO вместо ограниченных стандартных приложений",
          tabGram: "Telegram vs AndoGram",
          tabUsta: "Instagram vs Andusta",
          thFeature: "Возможность / Функция",
          thOfficial: "Официальное приложение",
          thAndo: "Версия ANDO"
        };
    }
  };

  const l = getLabels();

  return (
    <section id="compare" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            {l.badge}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '16px', fontWeight: 800 }}>
            {l.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>{l.subtitle}</p>

          <div style={{
            display: 'inline-flex',
            marginTop: '24px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '4px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}>
            <button
              onClick={() => setActiveTab('telegram')}
              style={{
                background: activeTab === 'telegram' ? 'rgba(0, 180, 216, 0.25)' : 'transparent',
                color: activeTab === 'telegram' ? '#00b4d8' : 'var(--text-muted)',
                border: activeTab === 'telegram' ? '1px solid rgba(0, 180, 216, 0.4)' : '1px solid transparent',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {l.tabGram}
            </button>
            <button
              onClick={() => setActiveTab('instagram')}
              style={{
                background: activeTab === 'instagram' ? 'rgba(255, 0, 127, 0.25)' : 'transparent',
                color: activeTab === 'instagram' ? '#ff007f' : 'var(--text-muted)',
                border: activeTab === 'instagram' ? '1px solid rgba(255, 0, 127, 0.4)' : '1px solid transparent',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 20px',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {l.tabUsta}
            </button>
          </div>
        </div>

        {/* Comparison Table Grid */}
        <div className="glass-panel" style={{
          overflowX: 'auto',
          borderRadius: 'var(--radius-xl)',
          padding: '8px'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <th style={{ padding: '20px', fontSize: '0.92rem', color: 'var(--text-dim)', width: '38%' }}>
                  {l.thFeature}
                </th>
                <th style={{ padding: '20px', fontSize: '0.92rem', color: 'var(--text-muted)', width: '28%' }}>
                  {l.thOfficial}
                </th>
                <th style={{ padding: '20px', fontSize: '0.98rem', fontWeight: 700, color: activeColor, width: '34%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} />
                    <span>{l.thAndo}</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx === rows.length - 1 ? 'none' : '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                >
                  <td style={{ padding: '20px', fontWeight: 600, fontSize: '0.95rem' }}>
                    {row.feature[lang]}
                  </td>
                  <td style={{ padding: '20px', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        background: 'rgba(239, 68, 68, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ef4444'
                      }}>
                        <X size={12} />
                      </div>
                      <span>{row.official[lang]}</span>
                    </div>
                  </td>
                  <td style={{ padding: '20px', color: '#fff', fontWeight: 600, fontSize: '0.94rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '22px',
                        height: '22px',
                        borderRadius: '50%',
                        background: `${activeColor}26`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: activeColor
                      }}>
                        <Check size={14} />
                      </div>
                      <span>{row.ando[lang]}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
