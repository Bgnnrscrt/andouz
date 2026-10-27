import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Send, Star, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  lang: Language;
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations.footer;

  return (
    <footer style={{
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      background: 'rgba(5, 6, 9, 0.95)',
      padding: '60px 0 36px'
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '40px',
          marginBottom: '48px'
        }}>
          {/* Col 1: Brand */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 900 }}>
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
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px' }}>
              ??????????? ???????? ?????????? ??? Android. ????????????, ??????????? ? ??????? ?? ????????????? ???????????.
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
              ? 2026 ANDO Ecosystem. {t.rights[lang]}
            </div>
          </div>

          {/* Col 2: Fast Links */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#fff' }}>
              ??????????
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#apps" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = '#00b4d8')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  AndoGram (??? Telegram)
                </a>
              </li>
              <li>
                <a href="#apps" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = '#ff007f')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  Andusta (???? Instagram)
                </a>
              </li>
              <li>
                <a href="#compare" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = '#00f59b')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  ??????? ?????????
                </a>
              </li>
              <li>
                <a href="#install" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.88rem', transition: 'color 0.2s' }}
                   onMouseEnter={(e) => (e.currentTarget.style.color = '#00f59b')}
                   onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}>
                  ?????????? ?? ?????????
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Community & Bot */}
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '16px', color: '#fff' }}>
              ?????????? & ???
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href="https://t.me/ando_stars_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              >
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span>??? ???????: @ando_stars_bot</span>
              </a>

              <a
                href="https://github.com/Bgnnrscrt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ padding: '10px 18px', fontSize: '0.85rem' }}
              >
                <Send size={16} color="#00b4d8" />
                <span>GitHub: @Bgnnrscrt</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          paddingTop: '24px',
          textAlign: 'center',
          fontSize: '0.78rem',
          color: 'var(--text-dim)',
          lineHeight: 1.6
        }}>
          {t.disclaimer[lang]}
        </div>
      </div>
    </footer>
  );
};
