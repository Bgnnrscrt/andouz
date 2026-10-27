import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Download, ShieldCheck, Zap, Lock, Smartphone, Star } from 'lucide-react';

interface HeroProps {
  lang: Language;
  onOpenDownload: () => void;
}

export const Hero: React.FC<HeroProps> = ({ lang, onOpenDownload }) => {
  const t = translations.hero;

  return (
    <section style={{
      position: 'relative',
      padding: '80px 0 60px',
      overflow: 'hidden'
    }}>
      <div className="cyber-grid" />
      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        {/* Eyebrow Badge */}
        <div style={{ display: 'inline-flex', marginBottom: '24px' }}>
          <span className="badge-pill badge-ando" style={{ padding: '6px 16px', fontSize: '0.85rem' }}>
            <Zap size={14} />
            <span>{t.badge[lang]}</span>
          </span>
        </div>

        {/* Main Heading */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          lineHeight: 1.15,
          maxWidth: '960px',
          margin: '0 auto 24px',
          fontWeight: 900
        }}>
          {t.titleStart[lang]}{' '}
          <span className="gradient-text-ando">
            {t.titleGradient[lang]}
          </span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
          color: 'var(--text-muted)',
          maxWidth: '780px',
          margin: '0 auto 40px',
          lineHeight: 1.65
        }}>
          {t.subtitle[lang]}
        </p>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
          marginBottom: '56px'
        }}>
          <button
            onClick={onOpenDownload}
            className="btn btn-primary-ando"
            style={{ padding: '16px 32px', fontSize: '1.05rem' }}
          >
            <Download size={20} />
            <span>{t.btnDownload[lang]}</span>
          </button>

          <a
            href="#apps"
            className="btn btn-outline"
            style={{ padding: '16px 30px', fontSize: '1.05rem' }}
          >
            <Smartphone size={20} style={{ color: 'var(--accent-ando)' }} />
            <span>{t.btnExplore[lang]}</span>
          </a>

          <button
            onClick={onOpenDownload}
            className="btn btn-stars"
            style={{ padding: '16px 24px', fontSize: '0.95rem' }}
          >
            <Star size={18} fill="#0c0802" />
            <span>1000 ? Stars / ?????</span>
          </button>
        </div>

        {/* Stat Badges Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          maxWidth: '960px',
          margin: '0 auto'
        }}>
          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(0, 245, 155, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-ando)'
            }}>
              <Smartphone size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{t.stat1[lang]}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>Android 8.0 ? 15+</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(0, 180, 216, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gram)'
            }}>
              <ShieldCheck size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{t.stat2[lang]}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>100% ?????????</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(255, 0, 127, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-usta)'
            }}>
              <Lock size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{t.stat3[lang]}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>?????????? ??????</div>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'rgba(245, 158, 11, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-stars)'
            }}>
              <Zap size={22} />
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: '0.98rem' }}>{t.stat4[lang]}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>????????? 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
