import { useEffect, useRef, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, ChevronDown, CircleAlert, Copy, Download, ExternalLink, KeyRound, LoaderCircle, Star } from 'lucide-react';
import type { AppId, Language } from '../types';
import { APPS, APP_IDS, BOT_URL, COPY, DOWNLOAD_URLS } from './copy';
import { AppEmblem } from './icons';
import { Sheet } from './Sheet';
import './access.css';

/*
 * «Получить доступ» window. The logic is the old DownloadModal's, unchanged:
 * - Stars: https://t.me/andouzbot?start=buy_<app> — the bot takes 1000 Stars and sends a code;
 * - promo code: POST {API_BASE}/api/redeem-coupon {code, user_identifier: 0} → success +
 *   activation_code (+ app, apk_url, apk_urls per app) | status «already_used» | anything else = invalid |
 *   network error. When the bot's APK shelf has a file, apk_url(s) are t.me links (?start=apk_<app>): the bot
 *   sends the current file — so the button drops the version and a hint says the bot sends it;
 * - a success is kept in localStorage «ando_activation» (a refresh never loses the code).
 * Only the look is new: app cards, the price, the bot button, a folded promo-code field.
 */

type CouponStatus = 'idle' | 'used' | 'invalid' | 'error';

/** The bot's activation API (see andouzbot). Override at build time with VITE_ANDO_API. */
const API_BASE = ((import.meta.env as Record<string, string | undefined>).VITE_ANDO_API || 'https://api.ando.uz').replace(/\/$/, '');
const STORAGE_KEY = 'ando_activation';
const CONFETTI = ['#1e4a37', '#b08d57', '#d8b878', '#23395d', '#7a2c3a', '#f6f1e6'];
const ROMAN = ['I', 'II', 'III'];

interface Activation {
  app: AppId | 'all';
  apkUrl: string | null;
  /** Per app (the bundle too): the server's current download links. Missing in activations saved before 11.11. */
  apkUrls?: Partial<Record<AppId, string>>;
  code: string;
}

/** A link that opens our bot, which sends the newest APK (andouzbot APK shelf), not a fixed file. */
const isBotLink = (url: string) => url.startsWith('https://t.me/');

const readActivation = (): Activation | null => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const a = JSON.parse(raw) as Activation;
    return a && typeof a.code === 'string' ? a : null;
  } catch {
    return null;
  }
};

const writeActivation = (a: Activation) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(a));
  } catch {
    // Private mode: the unlock still works for this visit.
  }
};

const prefersReducedMotion = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

function AccessPanel({ lang, initialApp }: { lang: Language; initialApp: AppId }) {
  const a = COPY[lang].access;
  const [selected, setSelected] = useState<AppId>(initialApp);
  const [promoOpen, setPromoOpen] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [status, setStatus] = useState<CouponStatus>('idle');
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [activation, setActivation] = useState<Activation | null>(readActivation);
  const [copied, setCopied] = useState<'code' | 'link' | null>(null);
  const copyTimer = useRef<number | undefined>(undefined);
  const shakeTimer = useRef<number | undefined>(undefined);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => () => {
      window.clearTimeout(copyTimer.current);
      window.clearTimeout(shakeTimer.current);
    },
    [],
  );

  useEffect(() => {
    if (promoOpen) inputRef.current?.focus();
  }, [promoOpen]);

  const granted: AppId[] = activation ? (activation.app === 'all' ? APP_IDS : [activation.app]) : [];
  const primary = granted[0] ?? selected;
  const primaryUrl = activation?.apkUrl || activation?.apkUrls?.[primary] || DOWNLOAD_URLS[primary];
  const urlFor = (id: AppId) => activation?.apkUrls?.[id] || (granted.length === 1 ? primaryUrl : DOWNLOAD_URLS[id]);

  const nudge = () => {
    setShake(true);
    window.clearTimeout(shakeTimer.current);
    shakeTimer.current = window.setTimeout(() => setShake(false), 450);
  };

  const celebrate = async () => {
    if (prefersReducedMotion()) return;
    try {
      const { default: confetti } = await import('canvas-confetti');
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: CONFETTI, disableForReducedMotion: true });
    } catch {
      // decoration only
    }
  };

  /** Redeems the code against the bot API: burns it server-side, returns the APK + one install code. */
  const redeem = async () => {
    const code = coupon.trim().toUpperCase();
    if (!code || loading) return;
    setLoading(true);
    setStatus('idle');
    try {
      const res = await fetch(`${API_BASE}/api/redeem-coupon`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, user_identifier: 0 }),
      });
      const data = await res.json().catch(() => ({}));
      if (data?.success && data.activation_code) {
        const apkUrls: Partial<Record<AppId, string>> = {};
        for (const id of APP_IDS) {
          const url = data.apk_urls?.[id];
          if (typeof url === 'string' && url) apkUrls[id] = url;
        }
        const act: Activation = {
          app: (data.app as Activation['app']) || 'all',
          apkUrl: typeof data.apk_url === 'string' ? data.apk_url : null,
          apkUrls,
          code: String(data.activation_code),
        };
        writeActivation(act);
        setActivation(act);
        void celebrate();
      } else if (data?.status === 'already_used') {
        setStatus('used');
        nudge();
      } else {
        setStatus('invalid');
        nudge();
      }
    } catch {
      setStatus('error');
      nudge();
    } finally {
      setLoading(false);
    }
  };

  const copy = async (what: 'code' | 'link') => {
    const text = what === 'code' ? activation?.code : primaryUrl;
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(what);
      window.clearTimeout(copyTimer.current);
      copyTimer.current = window.setTimeout(() => setCopied(null), 2000);
    } catch {
      // Clipboard blocked: the code stays visible and selectable.
    }
  };

  if (activation) {
    return (
      <div className="unlocked">
        <span className="unlocked-mark" aria-hidden="true">
          <Check size={30} strokeWidth={1.8} />
        </span>
        <h2 id="access-title" className="access-title">
          {a.unlockedTitle}
        </h2>
        <p className="access-text">{a.unlockedText}</p>
        <div className="unlocked-downloads">
          {granted.map((id) => {
            const info = APPS[id][lang];
            const url = urlFor(id);
            const viaBot = isBotLink(url);
            return (
              <a
                key={id}
                href={url}
                className="btn btn--primary btn--block btn--lg"
                data-autofocus={id === primary || undefined}
                {...(viaBot ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                <Download size={19} aria-hidden="true" />
                {a.download(info.name, viaBot ? '' : info.version).replace(/\s+/g, ' ').trim()}
              </a>
            );
          })}
        </div>
        {granted.some((id) => isBotLink(urlFor(id))) && <p className="access-text">{a.viaBot}</p>}
        <div className="code-box">
          <div className="code-head">
            <KeyRound size={16} strokeWidth={1.7} aria-hidden="true" />
            {a.codeTitle}
          </div>
          <button type="button" className="code-value" onClick={() => void copy('code')} aria-label={`${a.codeTitle}: ${activation.code}`}>
            <code>{activation.code}</code>
            {copied === 'code' ? <Check size={18} aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
          </button>
          <p className="code-hint" aria-live="polite">
            {copied === 'code' ? a.codeCopied : a.codeHint}
          </p>
        </div>
        <ol className="mini-steps" aria-label={a.next}>
          {a.steps.map((s, i) => (
            <li key={s}>
              <span aria-hidden="true">{ROMAN[i]}</span>
              {s}
            </li>
          ))}
        </ol>
        {granted.length === 1 && (
          <div className="qr-box">
            <div className="qr">
              <QRCodeSVG value={primaryUrl} size={128} level="M" bgColor="#faf7f0" fgColor="#17251e" title={APPS[primary][lang].name} />
            </div>
            <div className="qr-side">
              <p>{a.qrHint}</p>
              <button type="button" className="btn btn--outline btn--sm" onClick={() => void copy('link')}>
                {copied === 'link' ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                <span aria-live="polite">{copied === 'link' ? a.linkCopied : a.copyLink}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  const message = status === 'invalid' ? a.invalid : status === 'used' ? a.used : status === 'error' ? a.network : '';

  return (
    <div className="access-body">
      <h2 id="access-title" className="access-title">
        {a.title}
      </h2>

      <fieldset className="app-picks">
        <legend className="access-label">{a.whichApp}</legend>
        {APP_IDS.map((id) => {
          const info = APPS[id][lang];
          return (
            <label key={id} className={`app-pick${selected === id ? ' is-on' : ''}`}>
              <input
                type="radio"
                name="access-app"
                value={id}
                checked={selected === id}
                onChange={() => setSelected(id)}
                className="app-pick-input"
              />
              <AppEmblem app={id} size="sm" />
              <span className="app-pick-text">
                <span className="app-pick-name">{info.name}</span>
                <span className="app-pick-platform">{info.platform}</span>
              </span>
              <span className="app-pick-mark" aria-hidden="true">
                {selected === id && <Check size={16} strokeWidth={2.2} />}
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="price">
        <span className="price-value">{a.price}</span>
        <span className="price-note">{a.priceNote}</span>
      </div>

      <a
        className="btn btn--brass btn--block btn--lg"
        href={`${BOT_URL}?start=buy_${selected}`}
        target="_blank"
        rel="noopener noreferrer"
        data-autofocus
      >
        <Star size={18} fill="currentColor" aria-hidden="true" />
        {a.pay}
        <ExternalLink size={16} aria-hidden="true" />
      </a>
      <p className="access-hint">{a.payHint}</p>

      <div className="promo">
        <button
          type="button"
          className="promo-toggle"
          aria-expanded={promoOpen}
          aria-controls="promo-form"
          onClick={() => setPromoOpen((v) => !v)}
        >
          {a.promoToggle}
          <ChevronDown size={18} aria-hidden="true" className="promo-chev" />
        </button>
        {promoOpen && (
          <form
            id="promo-form"
            className="promo-form"
            onSubmit={(e) => {
              e.preventDefault();
              void redeem();
            }}
          >
            <label className="access-label" htmlFor="promo-input">
              {a.promoLabel}
            </label>
            <input
              id="promo-input"
              ref={inputRef}
              type="text"
              className={`promo-input${status !== 'idle' ? ' is-bad' : ''}${shake ? ' is-shake' : ''}`}
              value={coupon}
              onChange={(e) => {
                setCoupon(e.target.value.toUpperCase());
                setStatus('idle');
              }}
              placeholder={a.promoPlaceholder}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              disabled={loading}
              aria-invalid={status === 'idle' ? undefined : true}
              aria-describedby="promo-status"
            />
            <p id="promo-status" className="promo-status" aria-live="polite">
              {message && (
                <>
                  <CircleAlert size={16} aria-hidden="true" />
                  {message}
                </>
              )}
            </p>
            <button type="submit" className="btn btn--primary btn--block" disabled={loading || !coupon.trim()}>
              {loading ? (
                <>
                  <LoaderCircle size={18} className="spin" aria-hidden="true" />
                  {a.checking}
                </>
              ) : (
                a.promoBtn
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function AccessSheet({ open, app, lang, onClose }: { open: boolean; app: AppId; lang: Language; onClose: () => void }) {
  // A fresh panel on every opening (it starts from the requested app): a render-time update.
  const [session, setSession] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSession((s) => s + 1);
  }
  return (
    <Sheet open={open} onClose={onClose} closeLabel={COPY[lang].access.close} labelledBy="access-title" className="access">
      <AccessPanel key={session} lang={lang} initialApp={app} />
    </Sheet>
  );
}
