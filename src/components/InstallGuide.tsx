import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Download, Settings, ShieldCheck, HelpCircle } from 'lucide-react';

interface InstallGuideProps {
  lang: Language;
}

export const InstallGuide: React.FC<InstallGuideProps> = ({ lang }) => {
  const t = translations.guide;

  return (
    <section id="install" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            ??????? ??????????
          </span>
          <h2>{t.title[lang]}</h2>
          <p>{t.subtitle[lang]}</p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '40px'
        }}>
          {/* Step 1 */}
          <div className="glass-panel" style={{ padding: '32px 28px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'rgba(0, 245, 155, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-ando)',
              marginBottom: '20px'
            }}>
              <Download size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.step1Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.step1Desc[lang]}
            </p>
          </div>

          {/* Step 2 */}
          <div className="glass-panel" style={{ padding: '32px 28px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'rgba(0, 180, 216, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-gram)',
              marginBottom: '20px'
            }}>
              <Settings size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.step2Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.step2Desc[lang]}
            </p>
          </div>

          {/* Step 3 */}
          <div className="glass-panel" style={{ padding: '32px 28px', borderRadius: 'var(--radius-xl)' }}>
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'rgba(255, 0, 127, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-usta)',
              marginBottom: '20px'
            }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.step3Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.step3Desc[lang]}
            </p>
          </div>
        </div>

        {/* Play Protect Notice Banner */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.06)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          display: 'flex',
          alignItems: 'flex-start',
          gap: '16px'
        }}>
          <div style={{ color: 'var(--accent-stars)', marginTop: '2px' }}>
            <HelpCircle size={22} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f8fafc', marginBottom: '4px' }}>
              ?????? Android ????? ???????? ?????????????? ? ???????????? ??????????????
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              ??? ??????????? ???????? ?????? Google Play ??? ????? APK-??????, ??????????? ??? ???????? Play Store. ?????????? ?????????? ANDO ????????????? ????????, ?? ???????? ??????? ???????? ? ???????????? ????. ????? ????????? ??????????? ? ???? ????? ???????????.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
