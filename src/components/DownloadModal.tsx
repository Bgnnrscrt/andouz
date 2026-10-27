import React, { useState, useEffect } from 'react';
import { Language, AppId } from '../types';
import { translations } from '../translations';
import { INITIAL_VALID_COUPONS, APPS_DATA } from '../data';
import { X, Star, Sparkles, Download, CheckCircle2, AlertCircle, QrCode, Copy, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialAppId?: AppId;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialAppId = 'andogram'
}) => {
  const t = translations.modal;
  const [selectedApp, setSelectedApp] = useState<AppId>(initialAppId);
  const [activeTab, setActiveTab] = useState<'stars' | 'coupon'>('stars');
  const [couponInput, setCouponInput] = useState<string>('');
  const [couponStatus, setCouponStatus] = useState<'idle' | 'success' | 'used' | 'invalid'>('idle');
  const [isUnlocked, setIsUnlocked] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  useEffect(() => {
    setSelectedApp(initialAppId);
  }, [initialAppId]);

  useEffect(() => {
    // Check if user already unlocked
    const saved = localStorage.getItem('ando_app_unlocked');
    if (saved === 'true') {
      setIsUnlocked(true);
      setCouponStatus('success');
    }
  }, []);

  if (!isOpen) return null;

  const currentApp = APPS_DATA.find((a) => a.id === selectedApp) || APPS_DATA[0];

  const handleActivateCoupon = () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    // Check redeemed list in localStorage
    const redeemedList: string[] = JSON.parse(localStorage.getItem('ando_redeemed_coupons') || '[]');

    if (redeemedList.includes(cleanCode)) {
      setCouponStatus('used');
      return;
    }

    if (INITIAL_VALID_COUPONS.includes(cleanCode)) {
      // Mark as redeemed
      redeemedList.push(cleanCode);
      localStorage.setItem('ando_redeemed_coupons', JSON.stringify(redeemedList));
      localStorage.setItem('ando_app_unlocked', 'true');
      setIsUnlocked(true);
      setCouponStatus('success');

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    } else {
      setCouponStatus('invalid');
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const downloadUrl = selectedApp === 'andogram'
    ? 'https://github.com/Bgnnrscrt/andogram/releases/download/v10.9.2/Andogram-arm64-v8a-27102026.apk'
    : 'https://github.com/Bgnnrscrt/andusta/releases/download/v1.0.0/Andusta-v1.apk';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(16px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }} onClick={onClose}>
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '560px',
          background: '#0d1017',
          borderRadius: 'var(--radius-xl)',
          padding: '32px',
          position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 60px rgba(0, 245, 155, 0.15)'
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
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          <X size={18} />
        </button>

        {/* Modal Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>
            {t.title[lang]}
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
            {t.subtitle[lang]}
          </p>
        </div>

        {/* App Selector Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '20px',
          background: 'rgba(255, 255, 255, 0.04)',
          padding: '4px',
          borderRadius: 'var(--radius-pill)'
        }}>
          <button
            onClick={() => setSelectedApp('andogram')}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: selectedApp === 'andogram' ? 'linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            AndoGram (TG)
          </button>
          <button
            onClick={() => setSelectedApp('andusta')}
            style={{
              flex: 1,
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: selectedApp === 'andusta' ? 'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)' : 'transparent',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.88rem',
              cursor: 'pointer'
            }}
          >
            Andusta (Insta)
          </button>
        </div>

        {/* Tab Toggle (Stars vs Coupon) */}
        {!isUnlocked && (
          <div style={{
            display: 'flex',
            gap: '10px',
            marginBottom: '24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '12px'
          }}>
            <button
              onClick={() => setActiveTab('stars')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'stars' ? 'rgba(245, 158, 11, 0.15)' : 'transparent',
                color: activeTab === 'stars' ? '#f59e0b' : 'var(--text-muted)',
                border: activeTab === 'stars' ? '1px solid rgba(245, 158, 11, 0.3)' : '1px solid transparent',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Star size={16} fill={activeTab === 'stars' ? '#f59e0b' : 'transparent'} />
              <span>{t.tabStars[lang]}</span>
            </button>

            <button
              onClick={() => setActiveTab('coupon')}
              style={{
                flex: 1,
                padding: '10px',
                borderRadius: 'var(--radius-md)',
                background: activeTab === 'coupon' ? 'rgba(0, 245, 155, 0.15)' : 'transparent',
                color: activeTab === 'coupon' ? '#00f59b' : 'var(--text-muted)',
                border: activeTab === 'coupon' ? '1px solid rgba(0, 245, 155, 0.3)' : '1px solid transparent',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Sparkles size={16} />
              <span>{t.tabCoupon[lang]}</span>
            </button>
          </div>
        )}

        {/* UNLOCKED STATE: Direct Download + QR Code */}
        {isUnlocked ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(0, 245, 155, 0.1)',
              border: '1px solid rgba(0, 245, 155, 0.3)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              color: '#00f59b',
              fontWeight: 700,
              fontSize: '0.95rem',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={20} />
              <span>{t.couponSuccess[lang]}</span>
            </div>

            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary-ando"
              style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '16px' }}
            >
              <Download size={20} />
              <span>??????? {currentApp.name} ({currentApp.version})</span>
            </a>

            {/* QR Code Demo Representation */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 'var(--radius-lg)',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              marginTop: '16px'
            }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                {t.qrHint[lang]}
              </div>
              <div style={{
                width: '130px',
                height: '130px',
                margin: '0 auto 12px',
                background: '#fff',
                borderRadius: '12px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {/* Clean inline SVG QR code mock with high contrast */}
                <svg viewBox="0 0 100 100" width="100%" height="100%">
                  <rect width="100" height="100" fill="#fff" />
                  <rect x="10" y="10" width="25" height="25" fill="#0a0b10" />
                  <rect x="15" y="15" width="15" height="15" fill="#fff" />
                  <rect x="18" y="18" width="9" height="9" fill="#0a0b10" />
                  <rect x="65" y="10" width="25" height="25" fill="#0a0b10" />
                  <rect x="70" y="15" width="15" height="15" fill="#fff" />
                  <rect x="73" y="18" width="9" height="9" fill="#0a0b10" />
                  <rect x="10" y="65" width="25" height="25" fill="#0a0b10" />
                  <rect x="15" y="70" width="15" height="15" fill="#fff" />
                  <rect x="18" y="73" width="9" height="9" fill="#0a0b10" />
                  <rect x="42" y="42" width="16" height="16" fill="#0a0b10" />
                  <rect x="42" y="15" width="8" height="8" fill="#0a0b10" />
                  <rect x="42" y="75" width="8" height="8" fill="#0a0b10" />
                  <rect x="75" y="42" width="8" height="8" fill="#0a0b10" />
                  <rect x="65" y="65" width="25" height="25" fill="#0a0b10" />
                </svg>
              </div>

              <button
                onClick={() => handleCopyLink(downloadUrl)}
                className="btn btn-outline"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                {copiedLink ? <Check size={14} color="#00f59b" /> : <Copy size={14} />}
                <span>{copiedLink ? '?????? ???????????' : '??????????? ?????? ??????'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* LOCKED STATE */
          <div>
            {activeTab === 'stars' ? (
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  background: 'rgba(245, 158, 11, 0.08)',
                  border: '1px solid rgba(245, 158, 11, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 20px',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 900, color: '#f59e0b', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
                    {t.starsPrice[lang]}
                  </div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {t.starsDesc[lang]}
                  </div>
                </div>

                <a
                  href={`https://t.me/ando_stars_bot?start=buy_${selectedApp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-stars"
                  style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginBottom: '14px' }}
                >
                  <Star size={20} fill="#0c0802" />
                  <span>{t.btnPayBot[lang]}</span>
                </a>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  ????? ?????? ??? ????????? ???????? ??? ??????????? ????? ??? ????????
                </div>
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '16px' }}>
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => {
                      setCouponInput(e.target.value.toUpperCase());
                      setCouponStatus('idle');
                    }}
                    placeholder={t.couponPlaceholder[lang]}
                    style={{
                      width: '100%',
                      padding: '14px 18px',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#fff',
                      fontSize: '1rem',
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: '0.05em',
                      outline: 'none',
                      textTransform: 'uppercase'
                    }}
                  />
                </div>

                {couponStatus === 'invalid' && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={16} />
                    <span>{t.couponInvalid[lang]}</span>
                  </div>
                )}

                {couponStatus === 'used' && (
                  <div style={{ color: '#f59e0b', fontSize: '0.85rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <AlertCircle size={16} />
                    <span>{t.couponAlreadyUsed[lang]}</span>
                  </div>
                )}

                <button
                  onClick={handleActivateCoupon}
                  className="btn btn-primary-ando"
                  style={{ width: '100%', padding: '15px', fontSize: '1rem', marginBottom: '16px' }}
                >
                  <Sparkles size={18} />
                  <span>{t.btnActivate[lang]}</span>
                </button>

                {/* Helpful quick demo coupon test badges */}
                <div style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: '0.78rem',
                  color: 'var(--text-dim)'
                }}>
                  <div style={{ marginBottom: '6px' }}>???????? ?????? (??????? ??? ???????):</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {INITIAL_VALID_COUPONS.slice(0, 3).map((code) => (
                      <span
                        key={code}
                        onClick={() => { setCouponInput(code); setCouponStatus('idle'); }}
                        style={{
                          cursor: 'pointer',
                          padding: '3px 8px',
                          background: 'rgba(0, 245, 155, 0.1)',
                          border: '1px solid rgba(0, 245, 155, 0.25)',
                          borderRadius: '4px',
                          color: '#00f59b',
                          fontFamily: 'var(--font-mono)'
                        }}
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
