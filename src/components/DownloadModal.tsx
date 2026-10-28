import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimate, useReducedMotion } from 'motion/react';
import { QRCodeSVG } from 'qrcode.react';
import { Language, AppId } from '../types';
import { translations } from '../translations';
import { APPS_DATA, DOWNLOAD_URLS } from '../data';
import { Star, Sparkles, Download, AlertCircle, Copy, Check, KeyRound, Loader2 } from 'lucide-react';
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
type CouponStatus = 'idle' | 'used' | 'invalid' | 'error';

/** The bot's activation API (see andouzbot). Override at build time with VITE_ANDO_API. */
const API_BASE =
  ((import.meta.env as Record<string, string | undefined>).VITE_ANDO_API || 'https://api.ando.uz').replace(/\/$/, '');
const STORAGE_KEY = 'ando_activation';
const APP_IDS: AppId[] = ['andogram', 'andusta'];

/** What the server hands back on a successful coupon redeem and what we persist for the user. */
interface Activation {
  app: AppId | 'all';
  apkUrl: string | null;
  code: string;
}

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

/** Last successful activation, so a refresh never loses the user's one-time code. */
const readActivation = (): Activation | null => {
  try {
    const raw = readStorage(STORAGE_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as Activation;
    return a && typeof a.code === 'string' ? a : null;
  } catch {
    return null;
  }
};

const getLabels = (lang: Language) => {
  switch (lang) {
    case 'uz':
      return {
        close: 'Yopish',
        appLabel: 'Ilova',
        methodLabel: 'Kirish usuli',
        afterPay: "To'lovdan so'ng bot darhol o'rnatish kodini yuboradi",
        copy: 'Havoladan nusxa olish',
        copied: 'Havola nusxalandi',
        verifying: 'Promokod tekshirilmoqda…',
        errorNet: 'Serverga ulanib bo‘lmadi. Birozdan so‘ng urinib ko‘ring.',
        codeTitle: "Sizning o'rnatish kodingiz",
        codeHint: 'Ilovani birinchi marta ochganda shu kodni kiriting. Kod qurilmangizga bog‘lanadi.',
        copyCode: 'Kodni nusxalash',
        codedCopied: 'Kod nusxalandi',
        download: (name: string, version: string) => `Yuklab olish: ${name} (${version})`
      };
    case 'en':
      return {
        close: 'Close',
        appLabel: 'App',
        methodLabel: 'Access method',
        afterPay: 'Right after payment the bot sends you an installation code',
        copy: 'Copy Direct Download Link',
        copied: 'Link Copied',
        verifying: 'Checking coupon…',
        errorNet: 'Could not reach the server. Please try again later.',
        codeTitle: 'Your installation code',
        codeHint: 'Enter this code on first launch. It binds to your device.',
        copyCode: 'Copy code',
        codedCopied: 'Code copied',
        download: (name: string, version: string) => `Download ${name} (${version})`
      };
    default:
      return {
        close: 'Закрыть',
        appLabel: 'Приложение',
        methodLabel: 'Способ доступа',
        afterPay: 'После оплаты бот немедленно пришлёт код установки',
        copy: 'Скопировать прямую ссылку',
        copied: 'Ссылка скопирована',
        verifying: 'Проверяем купон…',
        errorNet: 'Не удалось связаться с сервером. Попробуйте позже.',
        codeTitle: 'Ваш код установки',
        codeHint: 'Введите этот код при первом запуске приложения. Он привязан к вашему устройству.',
        copyCode: 'Скопировать код',
        codedCopied: 'Код скопирован',
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
  const [loading, setLoading] = useState(false);
  const [activation, setActivation] = useState<Activation | null>(readActivation);
  const [justUnlocked, setJustUnlocked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const copyTimer = useRef<number | undefined>(undefined);
  const codeTimer = useRef<number | undefined>(undefined);
  const [inputScope, animateInput] = useAnimate<HTMLDivElement>();

  useEffect(() => () => {
    window.clearTimeout(copyTimer.current);
    window.clearTimeout(codeTimer.current);
  }, []);

  const isUnlocked = activation !== null;
  // The app(s) the redeemed coupon grants — the server decides, not the toggle above.
  const grantedApps: AppId[] = activation ? (activation.app === 'all' ? APP_IDS : [activation.app]) : [];
  const primaryApp = grantedApps[0] ?? selectedApp;
  const primaryUrl = activation?.apkUrl || DOWNLOAD_URLS[primaryApp];

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

  /** Redeem the coupon against the bot API: burns it server-side and returns the APK + one install code. */
  const handleActivateCoupon = async () => {
    const cleanCode = couponInput.trim().toUpperCase();
    if (!cleanCode || loading) return;
    setLoading(true);
    setCouponStatus('idle');
    try {
      const res = await fetch(`${API_BASE}/api/redeem-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: cleanCode, user_identifier: 0 })
      });
      const data = await res.json().catch(() => ({}));

      if (data?.success && data.activation_code) {
        const act: Activation = {
          app: (data.app as Activation['app']) || 'all',
          apkUrl: typeof data.apk_url === 'string' ? data.apk_url : null,
          code: String(data.activation_code)
        };
        writeStorage(STORAGE_KEY, JSON.stringify(act));
        setActivation(act);
        setJustUnlocked(true);
        void celebrate();
      } else if (data?.status === 'already_used') {
        setCouponStatus('used');
        shake();
      } else {
        setCouponStatus('invalid');
        shake();
      }
    } catch {
      // Network / CORS / server down — tell the user instead of silently failing.
      setCouponStatus('error');
      shake();
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(primaryUrl);
      setCopied(true);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked (insecure context / permissions) — the link stays visible via the QR code.
    }
  };

  const handleCopyCode = async () => {
    if (!activation) return;
    try {
      await navigator.clipboard.writeText(activation.code);
      setCodeCopied(true);
      window.clearTimeout(codeTimer.current);
      codeTimer.current = window.setTimeout(() => setCodeCopied(false), 2000);
    } catch {
      // Clipboard blocked — the code stays selectable on screen.
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

  const statusMessage =
    couponStatus === 'invalid'
      ? t.couponInvalid[lang]
      : couponStatus === 'used'
        ? t.couponAlreadyUsed[lang]
        : couponStatus === 'error'
          ? l.errorNet
          : '';

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

            {/* APK download(s) — one per granted app */}
            <motion.div {...reveal(2)} className="dl-dl-row">
              {grantedApps.map((appId) => {
                const info = APPS_DATA.find((a) => a.id === appId) || APPS_DATA[0];
                const url = grantedApps.length === 1 ? primaryUrl : DOWNLOAD_URLS[appId];
                return (
                  <a key={appId} href={url} className="btn btn-primary-ando btn-shine dl-wide" data-autofocus={appId === primaryApp || undefined}>
                    <Download size={20} />
                    <span>{l.download(info.name, info.version)}</span>
                  </a>
                );
              })}
            </motion.div>

            {/* The one install code — tap to copy */}
            <motion.div className="dl-code-box" {...reveal(3)}>
              <div className="dl-code-head">
                <KeyRound size={16} aria-hidden="true" />
                <span>{l.codeTitle}</span>
              </div>
              <button type="button" className="dl-code-value" onClick={handleCopyCode} title={l.copyCode} aria-label={l.copyCode}>
                <code>{activation!.code}</code>
                {codeCopied ? <Check size={16} color="#00f59b" /> : <Copy size={16} />}
              </button>
              <div className="dl-code-hint" aria-live="polite">{codeCopied ? l.codedCopied : l.codeHint}</div>
            </motion.div>

            {grantedApps.length === 1 && (
              <motion.div className="dl-qr-box" {...reveal(4)}>
                <div className="dl-qr-hint">{t.qrHint[lang]}</div>
                <div className="dl-qr">
                  <QRCodeSVG
                    value={primaryUrl}
                    size={148}
                    level="M"
                    bgColor="#ffffff"
                    fgColor="#0a0b10"
                    imageSettings={{ src: '/logo-96.webp', height: 28, width: 28, excavate: true }}
                    title={APPS_DATA.find((a) => a.id === primaryApp)?.name || 'ANDO'}
                  />
                </div>

                <button type="button" onClick={handleCopyLink} className={`btn btn-outline dl-copy${copied ? ' is-copied' : ''}`}>
                  {copied ? <Check size={14} color="#00f59b" /> : <Copy size={14} />}
                  <span aria-live="polite">{copied ? l.copied : l.copy}</span>
                </button>
              </motion.div>
            )}
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
                      void handleActivateCoupon();
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
                        aria-invalid={couponStatus === 'invalid' || couponStatus === 'error' || undefined}
                        aria-describedby="dl-coupon-status"
                        autoComplete="off"
                        spellCheck={false}
                        disabled={loading}
                        className={`dl-input${couponStatus !== 'idle' ? ` is-${couponStatus === 'error' ? 'invalid' : couponStatus}` : ''}`}
                      />
                    </div>

                    <div id="dl-coupon-status" aria-live="polite">
                      <AnimatePresence initial={false}>
                        {couponStatus !== 'idle' && (
                          <motion.div
                            key={couponStatus}
                            className={`dl-status dl-status--${couponStatus === 'used' ? 'used' : 'invalid'}`}
                            initial={{ opacity: 0, transform: reduce ? 'none' : 'translateY(-4px)' }}
                            animate={{ opacity: 1, transform: 'translateY(0px)' }}
                            exit={{ opacity: 0, transition: { duration: 0.12 } }}
                            transition={{ duration: DURATION.fast, ease: EASE_OUT }}
                          >
                            <AlertCircle size={16} />
                            <span>{statusMessage}</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <button type="submit" className="btn btn-primary-ando btn-shine dl-wide" disabled={loading}>
                      {loading ? <Loader2 size={18} className="dl-spin" /> : <Sparkles size={18} />}
                      <span>{loading ? l.verifying : t.btnActivate[lang]}</span>
                    </button>
                  </form>
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
