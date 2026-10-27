import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Download, Settings, ShieldCheck, HelpCircle } from 'lucide-react';

interface InstallGuideProps {
  lang: Language;
}

export const InstallGuide: React.FC<InstallGuideProps> = ({ lang }) => {
  const t = translations.install;

  const getNotice = () => {
    switch (lang) {
      case 'uz':
        return {
          title: "Android noma'lum manba haqida ogohlantirishi mumkin",
          desc: "Bu Google Play Store'dan tashqari yuklab olingan har qanday mustaqil APK uchun standart himoya xabari. Ilovalarimizda zararli kod yo'q. 'Baribir o'rnatish' (Install anyway) tugmasini bosing."
        };
      case 'en':
        return {
          title: "Android system notice for Unknown Sources",
          desc: "This is a standard Android prompt shown for any APK installed outside the Play Store. ANDO builds contain zero telemetry or adware. Simply tap 'Install anyway'."
        };
      default:
        return {
          title: "Предупреждение Android о неизвестных источниках",
          desc: "Это стандартное уведомление системы безопасности для любого APK-файла, скачанного вне Google Play. В приложениях ANDO нет вредоносного кода и рекламы. Нажмите «Все равно установить» (Install anyway)."
        };
    }
  };

  const n = getNotice();

  return (
    <section id="install" style={{ padding: '80px 0' }}>
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.steps.s1Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.steps.s1Desc[lang]}
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.steps.s2Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.steps.s2Desc[lang]}
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
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{t.steps.s3Title[lang]}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6 }}>
              {t.steps.s3Desc[lang]}
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
              {n.title}
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
              {n.desc}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
