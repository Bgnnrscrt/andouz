import React from 'react';
import { Language, AppId, AppInfo } from '../types';
import { APPS_DATA } from '../data';
import { Download, Sparkles, Archive, Lock, Ghost, Shield, Eye, FolderDown, ArrowRight } from 'lucide-react';

interface AppsShowcaseProps {
  lang: Language;
  onSelectApp: (app: AppInfo) => void;
  onOpenDownload: (appId?: AppId) => void;
}

export const AppsShowcase: React.FC<AppsShowcaseProps> = ({ lang, onSelectApp, onOpenDownload }) => {
  const getFeatureIcon = (iconName: string, color: string) => {
    const props = { size: 18, color };
    switch (iconName) {
      case 'Archive': return <Archive {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'Ghost': return <Ghost {...props} />;
      case 'Shield': return <Shield {...props} />;
      case 'Eye': return <Eye {...props} />;
      case 'FolderDown': return <FolderDown {...props} />;
      default: return <Sparkles {...props} />;
    }
  };

  const getSectionTitle = () => {
    switch (lang) {
      case 'uz': return { badge: "ANDO Flagmentlari", title: "Asosiy Ilovalar", sub: "Android qurilmalari uchun mustaqil, erkin va kuchaytirilgan mijozlar" };
      case 'en': return { badge: "ANDO Flagships", title: "Flagship Applications", sub: "Independent, liberated power-user clients designed exclusively for Android" };
      default: return { badge: "Флагманы ANDO", title: "Флагманские Приложения", sub: "Автономные, свободные и расширенные клиенты специально для Android" };
    }
  };

  const getButtonText = (size: string) => {
    switch (lang) {
      case 'uz': return { download: `APK yuklash (${size})`, more: "Barcha imkoniyatlar" };
      case 'en': return { download: `Download APK (${size})`, more: "All Specs" };
      default: return { download: `Скачать APK (${size})`, more: "Все фичи" };
    }
  };

  const sec = getSectionTitle();

  return (
    <section id="apps" style={{ padding: '80px 0' }}>
      <div className="container">
        <div className="section-header" style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            {sec.badge}
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '16px', fontWeight: 800 }}>
            {sec.title}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {sec.sub}
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '32px'
        }}>
          {APPS_DATA.map((app) => {
            const btn = getButtonText(app.size);
            return (
              <div
                key={app.id}
                className="glass-panel"
                style={{
                  padding: '36px 32px',
                  borderRadius: 'var(--radius-xl)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  overflow: 'hidden',
                  border: app.id === 'andogram' 
                    ? '1px solid rgba(0, 180, 216, 0.25)' 
                    : '1px solid rgba(255, 0, 127, 0.25)'
                }}
              >
                {/* Glow backdrop header */}
                <div style={{
                  position: 'absolute',
                  top: '-60px',
                  right: '-60px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: app.color,
                  filter: 'blur(70px)',
                  opacity: 0.18,
                  pointerEvents: 'none'
                }} />

                {/* Top Row: App Icon & Badges */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: app.gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: `0 8px 24px -4px ${app.color}66`,
                      color: '#fff',
                      fontWeight: 900,
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-heading)'
                    }}>
                      {app.name === 'AndoGram' ? 'AG' : 'AU'}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.75rem', lineHeight: 1.1 }}>{app.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                        {app.version}
                      </div>
                    </div>
                  </div>

                  <span className={`badge-pill ${app.id === 'andogram' ? 'badge-gram' : 'badge-usta'}`}>
                    {app.badge[lang]}
                  </span>
                </div>

                {/* Tagline & Description */}
                <div style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: app.color,
                  marginBottom: '10px'
                }}>
                  {app.tagline[lang]}
                </div>

                <p style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.94rem',
                  lineHeight: 1.6,
                  marginBottom: '28px',
                  flex: 1
                }}>
                  {app.description[lang]}
                </p>

                {/* Features List */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  marginBottom: '32px'
                }}>
                  {app.features.slice(0, 4).map((feat) => (
                    <div
                      key={feat.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                      }}
                    >
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: `${app.color}1a`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        {getFeatureIcon(feat.iconName, app.color)}
                      </div>
                      <div style={{ flex: 1, fontSize: '0.88rem', fontWeight: 600 }}>
                        {feat.title[lang]}
                      </div>
                      {feat.tag && (
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          background: `${app.color}1f`,
                          color: app.color
                        }}>
                          {feat.tag[lang]}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => onOpenDownload(app.id)}
                    className="btn"
                    style={{
                      flex: 1,
                      background: app.gradient,
                      color: '#fff',
                      boxShadow: `0 0 20px ${app.color}40`,
                      padding: '13px 20px'
                    }}
                  >
                    <Download size={18} />
                    <span>{btn.download}</span>
                  </button>

                  <button
                    onClick={() => onSelectApp(app)}
                    className="btn btn-outline"
                    style={{ padding: '13px 18px' }}
                  >
                    <span>{btn.more}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
