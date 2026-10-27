import React from 'react';
import { Language, AppInfo } from '../types';
import { X, Download, CheckCircle2, Cpu, Calendar, Smartphone, Sparkles } from 'lucide-react';

interface AppDetailsModalProps {
  app: AppInfo | null;
  onClose: () => void;
  lang: Language;
  onOpenDownload: () => void;
}

export const AppDetailsModal: React.FC<AppDetailsModalProps> = ({
  app,
  onClose,
  lang,
  onOpenDownload
}) => {
  if (!app) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.85)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '740px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: '#0c0f17',
          borderRadius: 'var(--radius-xl)',
          padding: '36px',
          position: 'relative',
          border: `1px solid ${app.color}40`,
          boxShadow: `0 25px 60px -15px ${app.color}33`
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '18px',
            background: app.gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 8px 24px ${app.color}55`,
            color: '#fff',
            fontWeight: 900,
            fontSize: '1.8rem',
            fontFamily: 'var(--font-heading)'
          }}>
            {app.name === 'AndoGram' ? 'AG' : 'AU'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '2rem' }}>{app.name}</h2>
              <span className="badge-pill" style={{ color: app.color, borderColor: `${app.color}44` }}>
                {app.version}
              </span>
            </div>
            <div style={{ color: app.color, fontWeight: 600, fontSize: '0.98rem', marginTop: '4px' }}>
              {app.tagline[lang]}
            </div>
          </div>
        </div>

        {/* Quick Specs Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: 'var(--radius-lg)',
          padding: '16px 20px',
          marginBottom: '32px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>?????? APK</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{app.size}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>?????????????</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>{app.minAndroid}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>???????????</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>ARM64-v8a</div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Root-?????</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: '#00f59b' }}>?? ?????????</div>
          </div>
        </div>

        {/* Detailed Features List */}
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>???????? ???????????</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '36px' }}>
          {app.features.map((feat) => (
            <div
              key={feat.id}
              style={{
                padding: '16px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff' }}>
                  {feat.title[lang]}
                </div>
                {feat.tag && (
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 'var(--radius-pill)', background: `${app.color}22`, color: app.color }}>
                    {feat.tag[lang]}
                  </span>
                )}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.55 }}>
                {feat.description[lang]}
              </div>
            </div>
          ))}
        </div>

        {/* Changelog */}
        <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>??????? ????????? (Changelog)</h3>
        <div style={{ marginBottom: '36px' }}>
          {app.changelog.map((log) => (
            <div key={log.version} style={{
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '18px 20px',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '1.05rem', color: app.color }}>
                  ?????? {log.version}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                  {log.date}
                </span>
              </div>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {log.items[lang].map((item, i) => (
                  <li key={i} style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Modal Bottom CTA */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <button
            onClick={() => {
              onClose();
              onOpenDownload();
            }}
            className="btn"
            style={{
              flex: 1,
              background: app.gradient,
              color: '#fff',
              padding: '16px',
              fontSize: '1.05rem',
              boxShadow: `0 0 25px ${app.color}55`
            }}
          >
            <Download size={20} />
            <span>??????? {app.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
