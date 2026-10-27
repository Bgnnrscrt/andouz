import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { CheckCircle2, Clock, Sparkles, Send } from 'lucide-react';

interface RoadmapProps {
  lang: Language;
}

export const Roadmap: React.FC<RoadmapProps> = ({ lang }) => {
  const t = translations.roadmap;

  return (
    <section id="roadmap" style={{ padding: '80px 0', background: 'rgba(8, 10, 15, 0.4)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            ????? ????????
          </span>
          <h2>{t.title[lang]}</h2>
          <p>{t.subtitle[lang]}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {/* Card 1 */}
          <div className="glass-panel" style={{ padding: '24px 20px', borderRadius: 'var(--radius-lg)', borderTop: '3px solid #00b4d8' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00b4d8', marginBottom: '12px' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>????????</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t.p1Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {t.p1Desc[lang]}
            </p>
          </div>

          {/* Card 2 */}
          <div className="glass-panel" style={{ padding: '24px 20px', borderRadius: 'var(--radius-lg)', borderTop: '3px solid #ff007f' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff007f', marginBottom: '12px' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>????????</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t.p2Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {t.p2Desc[lang]}
            </p>
          </div>

          {/* Card 3 */}
          <div className="glass-panel" style={{ padding: '24px 20px', borderRadius: 'var(--radius-lg)', borderTop: '3px solid #00f59b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#00f59b', marginBottom: '12px' }}>
              <Clock size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>? ??????????</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t.p3Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {t.p3Desc[lang]}
            </p>
          </div>

          {/* Card 4 */}
          <div className="glass-panel" style={{ padding: '24px 20px', borderRadius: 'var(--radius-lg)', borderTop: '3px solid #f59e0b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '12px' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>? ??????</span>
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t.p4Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {t.p4Desc[lang]}
            </p>
          </div>
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
            <h4 style={{ fontSize: '1.3rem', marginBottom: '6px' }}>???? ???? ??? ?????? ???? ??? ????????</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              ???????? ? ??????????? ??? ?????????? ? ?? ????????? ?????? ???? ????????????? ? ?????? ?????.
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
            <span>?????????? ???? ? @ando_stars_bot</span>
          </a>
        </div>
      </div>
    </section>
  );
};
