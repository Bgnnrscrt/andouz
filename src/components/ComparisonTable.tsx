import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { TELEGRAM_COMPARISON, INSTAGRAM_COMPARISON } from '../data';
import { Check, X, Sparkles } from 'lucide-react';

interface ComparisonTableProps {
  lang: Language;
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ lang }) => {
  const t = translations.comparison;
  const [activeTab, setActiveTab] = useState<'telegram' | 'instagram'>('telegram');

  const rows = activeTab === 'telegram' ? TELEGRAM_COMPARISON : INSTAGRAM_COMPARISON;
  const activeColor = activeTab === 'telegram' ? 'var(--accent-gram)' : 'var(--accent-usta)';

  return (
    <section id="compare" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            {t.title[lang]}
          </span>
          <h2>????????? ? ???????????</h2>
          <p>{t.subtitle[lang]}</p>

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
              {t.tabGram[lang]}
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
              {t.tabUsta[lang]}
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
                  ??????????? / ???????
                </th>
                <th style={{ padding: '20px', fontSize: '0.92rem', color: 'var(--text-muted)', width: '28%' }}>
                  {t.colOfficial[lang]}
                </th>
                <th style={{ padding: '20px', fontSize: '0.98rem', fontWeight: 700, color: activeColor, width: '34%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sparkles size={16} />
                    <span>{t.colAndo[lang]}</span>
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
