import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Globe, Star, Sparkles } from 'lucide-react';

interface HeaderProps {
  lang: Language;
  setLang: (l: Language) => void;
  onOpenDownload: () => void;
}

export const Header: React.FC<HeaderProps> = ({ lang, setLang, onOpenDownload }) => {
  const t = translations.nav;

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      background: 'rgba(8, 9, 14, 0.85)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '74px'
      }}>
        {/* Brand Logo */}
        <a href="#" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          textDecoration: 'none',
          color: '#fff'
        }}>
          <img
            src="/logo.jpg"
            alt="ANDO Logo"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              objectFit: 'cover',
              boxShadow: '0 0 20px rgba(0, 245, 155, 0.35)',
              border: '1px solid rgba(0, 245, 155, 0.3)'
            }}
          />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.35rem',
                fontWeight: 800,
                letterSpacing: '-0.02em',
                color: '#fff'
              }}>
                ANDO
              </span>
              <span style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '2px 6px',
                borderRadius: '6px',
                background: 'rgba(0, 245, 155, 0.15)',
                color: '#00f59b',
                border: '1px solid rgba(0, 245, 155, 0.3)'
              }}>
                .UZ
              </span>
            </div>
            <div style={{
              fontSize: '0.68rem',
              color: 'var(--text-dim)',
              letterSpacing: '0.05em',
              textTransform: 'uppercase'
            }}>
              Ecosystem
            </div>
          </div>
        </a>

        {/* Navigation Links */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }} className="desktop-nav">
          <a href="#apps" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
             onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
             onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {t.andogram[lang]} & {t.andusta[lang]}
          </a>
          <a href="#compare" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
             onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
             onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {t.compare[lang]}
          </a>
          <a href="#install" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
             onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
             onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {t.install[lang]}
          </a>
          <a href="#roadmap" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500, transition: 'color 0.2s' }}
             onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
             onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
            {t.roadmap[lang]}
          </a>
        </nav>

        {/* Actions (Lang + Download Button) */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Language Switcher */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: 'var(--radius-pill)',
            padding: '3px',
            gap: '2px'
          }}>
            {(['ru', 'uz', 'en'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  background: lang === l ? 'rgba(0, 245, 155, 0.2)' : 'transparent',
                  color: lang === l ? '#00f59b' : 'var(--text-dim)',
                  border: lang === l ? '1px solid rgba(0, 245, 155, 0.4)' : '1px solid transparent',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  transition: 'all 0.2s ease'
                }}
              >
                {l}
              </button>
            ))}
          </div>

          {/* Download / Get Access Button */}
          <button
            onClick={onOpenDownload}
            className="btn btn-primary-ando"
            style={{ padding: '9px 18px', fontSize: '0.88rem' }}
          >
            <Sparkles size={16} />
            <span>{t.getAccess[lang]}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
