import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Language, AppId } from '../types';
import { translations } from '../translations';
import { INITIAL_VALID_COUPONS, APPS_DATA, DOWNLOAD_URLS } from '../data';
import { Star, Sparkles, Download, AlertCircle, Copy, Check } from 'lucide-react';
import { DURATION, EASE_OUT } from '../lib/motion';
import { Modal } from './ui/Modal';
import { SegmentedControl } from './ui/SegmentedControl';
import './DownloadModal.css';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  initialAppId?: AppId;
}

type Method = 'stars' | 'coupon';
type CouponStatus = 'idle' | 'used' | 'invalid';

const APP_COLORS: Record<AppId, string> = { andogram: '#00b4d8', andusta: '#ff007f' };
const CONFETTI_COLORS = ['#00f59b', '#00b4d8', '#ff007f', '#f59e0b', '#ffffff'];

const readStorage = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private mode) — the unlock still works for this visit.
  }
};

const getLabels = (lang: Language) => {
  switch (lang) {
    case 'uz':
      return {
        close: 'Yopish',
        appLabel: 'Ilova',
        methodLabel: "Kirish usuli",
        afterPay: "To'lovdan so'ng bot darhol ochish kodini yuboradi",
        devCodes: 'Test promokodlari (faqat dev rejimida):',
        copy: 'Havoladan nusxa olish',
        copied: 'Havola nusxalandi',
        download: (name: string, version: string) => `Yuklab olish: ${name} (${version})`
      };
    case 'en':
      return {
        close: 'Close',
        appLabel: 'App',
        methodLabel: 'Access method',
        afterPay: 'Right after payment the bot sends you an unlock code',
        devCodes: 'Test promo codes (dev mode only):',
        copy: 'Copy Direct Download Link',
        copied: 'Link Copied',
        download: (name: string, version: string) => `Download ${name} (${version})`
      };
    default:
      return {
        close: 'Закрыть',
        appLabel: 'Приложение',
        methodLabel: 'Способ доступа',
        afterPay: 'После оплаты бот немедленно пришлёт код разблокировки',
        devCodes: 'Тестовые промокоды (только в режиме разработки):',
        copy: 'Скопировать прямую ссылку',
        copied: 'Ссылка скопирована',
        download: (name: string, version: string) => `Скачать ${name} (${version})`
      };
  }
};

/** Success mark: a ring that glows in and a check that draws itself. */
const SuccessMark: React.FC<{ reduce: boolean }> = ({ reduce }) => (
  <div className="dl-success-mark" aria-hidden="true">
    <motion.span
      className="dl-success-glow"
      initial={{ opacity: 0, transform: reduce ? 'none' : 'scale(0.9)' }}
      animate={{ opacity: 1, transform: 'scale(1)' }}
      transition={{ duration: 0.5, ease: EASE_OUT }}
    />
    <svg viewBox="0 0 64 64" width="64" height="64">
      <motion.circle
        cx="32"
        cy="32"
        r="29"
        className="dl-success-ring"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />
      <motion.path
        d="M20 33.5l8 8 16-17"
        className="dl-success-check"
        initial={{ pathLength: reduce ? 1 : 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35, ease: EASE_OUT, delay: reduce ? 0 : 0.35 }}
      />
    </svg>
  </div>
);

interface PanelProps {
  lang: Language;
  initialAppId: AppId;
}

/** Mounted fresh on every open, so the selected app always starts from `initialAppId`. */
const DownloadPanel: React.FC<PanelProps> = ({ lang, initialAppId }) => {
  const t = translations.modal;
  const l = getLabels(lang);
  const reduce = useReducedMotion() ?? false;
  const [selectedApp, setSelectedApp] = useState<AppId>(initialAppId);
  const [method, setMethod] = useState<Method>('stars');
  const [couponInput, setCouponInput] = useState('');
  const [couponStatus, setCouponStatus] = useState<CouponStatus>('idle');
  const [isUnlocked, setIsUnlocked] = useState(() => readStorage('ando_app_unlocked') === 'true');
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  const [inputScope, animateInput] = useAnimate<HTMLDivElement>();

  useEffect(() => () => window.clearTimeout(copyTimer.current), []);

  const currentApp = APPS_DATA.find((a) => a.id === selectedApp) || APPS_DATA[0];
  const downloadUrl = DOWNLOAD_URLS[selectedApp];

  const shake = () => {
    if (reduce || !inputScope.current) return;
    animateInput(
      inputScope.current,
      { transform: ['translateX(0px)', 'translateX(-8px)', 'translateX(7px)', 'translateX(-5px)', 'translateX(3px)', 'translateX(0px)'] },
      { duration: 0.4, ease: 'easeOut' }
    );
  };

  const celebrate = async () => {
    if (reduce) return;
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({ particleCount: 90, spread: 75, origin: { y: 0.55 }, colors: CONFETTI_COLORS, disableForReducedMotion: true });
    } catch {
      // Confetti is decoration only.
    }
  };

  const handleActivateCoupon = () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode) return;

    let redeemedList: string[] = [];
    try {
      redeemedList = JSON.parse(readStorage('ando_redeemed_coupons') || '[]');
    } catch {
      redeemedList = [];
    }

    if (redeemedList.includes(cleanCode)) {
      setCouponStatus('used');
      shake();
      return;
    }

    if (INITIAL_VALID_COUPONS.includes(cleanCode)) {
      redeemedList.push(cleanCode);
      writeStorage('ando_redeemed_coupons', JSON.stringify(redeemedList));
      writeStorage('ando_app_unlocked', 'true');
      setCouponStatus('idle');
      setJustUnlocked(true);
      setIsUnlocked(true);
      void celebrate();
    } else {
      setCouponStatus('invalid');
      shake();
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(downloadUrl);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — the link stays visible via the QR code.
    }
  };

  const swap = {
    initial: { opacity: 0, transform: reduce ? 'none' : 'translateY(8px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    exit: { opacity: 0, transform: reduce ? 'none' : 'translateY(-6px)', transition: { duration: 0.15, ease: EASE_OUT } },
    transition: { duration: DURATION.ui, ease: EASE_OUT }
  };

  const reveal = (i: number) => ({
    initial: { opacity: 0, transform: reduce ? 'none' : 'translateY(10px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { duration: 0.4, ease: EASE_OUT, delay: reduce || !justUnlocked ? 0 : 0.45 + i * 0.08 }
  });

  return (
    <>
      {/* Modal Header */}
      <div className="dl-head">
        <h3 id="dl-title" className="dl-title">{t.downloadTitle[lang]}</h3>
        <SegmentedControl
          ariaLabel={l.appLabel}
          layoutId="dl-app"
          size="sm"
          value={selectedApp}
          onChange={setSelectedApp}
          options={[
            { value: 'andogram', label: 'AndoGram', color: APP_COLORS.andogram },
            { value: 'andusta', label: 'Andusta', color: APP_COLORS.andusta }
          ]}
        />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        {isUnlocked ? (
          /* UNLOCKED STATE */
          <motion.div key="unlocked" className="dl-unlocked" {...swap}>
            <SuccessMark reduce={reduce || !justUnlocked} />

            <motion.h4 className="dl-unlocked-title" {...reveal(0)}>{t.unlockedTitle[lang]}</motion.h4>
            <motion.p className="dl-muted" {...reveal(1)}>{t.unlockedDesc[lang]}</motion.p>

            <motion.div {...reveal(2)}>
              <a href={downloadUrl} className="btn btn-primary-ando btn-shine dl-wide" data-autofocus>
                <Download size={20} />
                <span>{l.download(currentApp.name, currentApp.version)}</span>
              </a>
            </motion.div>

            <motion.div className="dl-qr-box" {...reveal(3)}>
              <div className="dl-qr-hint">{t.qrHint[lang]}</div>
              <div className="dl-qr">
                <QRCodeSVG
                  value={downloadUrl}
                  size={148}
                  level="M"
                  bgColor="#ffffff"
                  fgColor="#0a0b10"
                  imageSettings={{ src: '/logo-96.webp', height: 28, width: 28, excavate: true }}
                  title={currentApp.name}
                />
              </div>

              <button type="button" onClick={handleCopyLink} className={`btn btn-outline dl-copy${copied ? ' is-copied' : ''}`}>
                {copied ? <Check size={14} color="#00f59b" /> : <Copy size={14} />}
                <span aria-live="polite">{copied ? l.copied : l.copy}</span>
              </button>
            </motion.div>
          </motion.div>
        ) : (
          /* LOCKED STATE */
          <motion.div key="locked" {...swap}>
            <div className="dl-method">
              <SegmentedControl
                ariaLabel={l.methodLabel}
                layoutId="dl-method"
                fullWidth
                value={method}
                onChange={setMethod}
                idPrefix="dl"
                options={[
                  { value: 'stars', label: t.starsTab[lang], icon: <Star size={16} />, color: '#f59e0b' },
                  { value: 'coupon', label: t.couponTab[lang], icon: <Sparkles size={16} />, color: '#00f59b' }
                ]}
              />
            </div>

            <AnimatePresence mode="wait" initial={false}>
              {method === 'stars' ? (
                <motion.div key="stars" className="dl-center" role="tabpanel" id="dl-panel-stars" aria-labelledby="dl-tab-stars" {...swap}>
                  <div className="dl-price">
                    <span className="dl-price-sparkle" aria-hidden="true">
                      <Star size={18} fill="currentColor" />
                    </span>
                    <div className="dl-price-value">{t.starsPrice[lang]}</div>
                    <div className="dl-muted dl-price-desc">{t.starsDesc[lang]}</div>
                  </div>

                  <a
                    href={`https://t.me/ando_stars_bot?start=buy_${selectedApp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-stars btn-shine dl-wide"
                  >
                    <Star size={20} fill="#0c0802" />
                    <span>{t.btnPayBot[lang]}</span>
                  </a>

                  <div className="dl-hint">{l.afterPay}</div>
                </motion.div>
              ) : (
                <motion.div key="coupon" role="tabpanel" id="dl-panel-coupon" aria-labelledby="dl-tab-coupon" {...swap}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleActivateCoupon();
                    }}
                  >
                    <div ref={inputScope} className="dl-input-wrap">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => {
                          setCouponInput(e.target.value.toUpperCase());
                          setCouponStatus('idle');
                        }}
                        placeholder={t.couponPlaceholder[lang]}
                        aria-label={t.couponTab[lang]}
                        aria-invalid={couponStatus === 'invalid' || undefined}
                        aria-describedby="dl-coupon-status"
                        autoComplete="off"
                        spellCheck={false}
                        className={`dl-input${couponStatus !== 'idle' ? ` is-${couponStatus}` : ''}`}
                      />
                    </div>

                    <div id="dl-coupon-status" aria-live="polite">
                      <AnimatePresence initial={false}>
                        {couponStatus !== 'idle' && (
                          <motion.div
                            key={couponStatus}
                            className={`dl-status dl-status--${couponStatus}`}
                            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-4px)' }}
                            animate={{ opacity: 1, transform: 'translateY(0px)' }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                          >
                            <AlertCircle size={16} />
                            <span>{couponStatus === 'invalid' ? t.couponInvalid[lang] : t.couponAlreadyUsed[lang]}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button type="submit" className="btn btn-primary-ando btn-shine dl-wide">
                      <Sparkles size={18} />
                      <span>{t.btnActivate[lang]}</span>
                    </button>
                  </form>

                  {import.meta.env.DEV && (
                    <div className="dl-dev-codes">
                      <div>{l.devCodes}</div>
                      <div className="dl-dev-chips">
                        {INITIAL_VALID_COUPONS.slice(0, 3).map((code) => (
                          <button
                            key={code}
                            type="button"
                            className="dl-dev-chip"
                            onClick={() => {
                              setCouponInput(code);
                              setCouponStatus('idle');
                            }}
                          >
                            {code}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  lang,
  initialAppId = 'andogram'
}) => (
  <Modal open={isOpen} onClose={onClose} labelledBy="dl-title" closeLabel={getLabels(lang).close} maxWidth={560}>
    {isOpen && <DownloadPanel lang={lang} initialAppId={initialAppId} />}
  </Modal>
);
