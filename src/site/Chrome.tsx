import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Check, ChevronDown, Languages, Menu, Send } from 'lucide-react';
import type { Language } from '../types';
import { BOT_URL } from './copy';
import { Link, useSite } from './context';
import { Sheet } from './Sheet';
import { appHref, homeHref, sectionHref } from './router';

/* The site's frame: top bar, language menu, phone menu, sticky phone CTA, footer. */

const LANGS: { code: Language; label: string }[] = [
  { code: 'uz', label: 'O‘zbekcha' },
  { code: 'ru', label: 'Русский' },
  { code: 'en', label: 'English' },
];

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link to={homeHref} className="brand" ariaLabel="ANDO" onNavigate={onNavigate}>
      <span className="brand-mono" aria-hidden="true">A</span>
      <span className="brand-word" aria-hidden="true">ANDO</span>
    </Link>
  );
}

function LangMenu() {
  const { lang, setLang, t } = useSite();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const current = LANGS.find((l) => l.code === lang) ?? LANGS[0];
  return (
    <div
      className="lang"
      ref={rootRef}
      onBlur={(e) => {
        if (open && !rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={btnRef}
        type="button"
        className="lang-btn"
        aria-expanded={open}
        aria-controls={open ? 'lang-list' : undefined}
        aria-label={`${t.nav.language}: ${current.label}`}
        onClick={() => setOpen((v) => !v)}
      >
        <Languages size={17} strokeWidth={1.6} aria-hidden="true" />
        <span>{lang.toUpperCase()}</span>
        <ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" className="lang-chev" />
      </button>
      {open && (
        <ul id="lang-list" className="lang-list">
          {LANGS.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                aria-current={l.code === lang || undefined}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                  btnRef.current?.focus();
                }}
              >
                <span>{l.label}</span>
                {l.code === lang && <Check size={16} aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function TopBar({ menuOpen, onMenu }: { menuOpen: boolean; onMenu: () => void }) {
  const { t, openAccess } = useSite();
  return (
    <header className="topbar">
      <div className="topbar-in wrap">
        <Brand />
        <nav className="topnav" aria-label={t.nav.menu}>
          <Link to={appHref('andogram')}>AndoGram</Link>
          <Link to={appHref('andusta')}>Andusta</Link>
          <Link to={sectionHref('demos')}>{t.nav.demos}</Link>
          <Link to={sectionHref('install')}>{t.nav.install}</Link>
          <Link to={sectionHref('faq')}>{t.nav.faq}</Link>
        </nav>
        <div className="topbar-actions">
          <LangMenu />
          <button type="button" className="btn btn--primary btn--sm topbar-buy" onClick={() => openAccess()}>
            {t.nav.getAccess}
          </button>
          <button
            type="button"
            className="icon-btn topbar-menu"
            aria-label={t.nav.menu}
            aria-expanded={menuOpen}
            onClick={onMenu}
          >
            <Menu size={22} strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}

export function MenuSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, lang, setLang, openAccess } = useSite();
  const items: [string, string][] = [
    [homeHref, t.nav.home],
    [appHref('andogram'), 'AndoGram'],
    [appHref('andusta'), 'Andusta'],
    [sectionHref('demos'), t.nav.demos],
    [sectionHref('install'), t.nav.install],
    [sectionHref('faq'), t.nav.faq],
  ];
  return (
    <Sheet open={open} onClose={onClose} variant="menu" closeLabel={t.nav.close} ariaLabel={t.nav.menu} className="menu">
      <div className="menu-head">
        <Brand onNavigate={onClose} />
      </div>
      <nav className="menu-nav" aria-label={t.nav.menu}>
        {items.map(([to, label], i) => (
          <Link key={to} to={to} className="menu-link" onNavigate={onClose}>
            <span className="menu-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <span>{label}</span>
          </Link>
        ))}
      </nav>
      <div className="menu-langs" role="group" aria-label={t.nav.language}>
        {LANGS.map((l) => (
          <button
            key={l.code}
            type="button"
            lang={l.code}
            className={`menu-lang${l.code === lang ? ' is-on' : ''}`}
            aria-pressed={l.code === lang}
            onClick={() => setLang(l.code)}
          >
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="menu-foot">
        <button
          type="button"
          className="btn btn--brass btn--block"
          onClick={() => {
            onClose();
            openAccess();
          }}
        >
          {t.nav.getAccess}
          <ArrowRight size={18} aria-hidden="true" />
        </button>
        <a className="menu-bot" href={BOT_URL} target="_blank" rel="noopener noreferrer">
          <Send size={16} strokeWidth={1.7} aria-hidden="true" />
          <span>{t.nav.support}: @Andouzbot</span>
        </a>
      </div>
    </Sheet>
  );
}

/**
 * Phones: a slim «Получить доступ · 1000 ★» bar at the bottom once the hero's own buttons
 * have scrolled away; it steps aside over the footer.
 */
export function StickyCta({ enabled }: { enabled: boolean }) {
  const { t, openAccess } = useSite();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const footer = document.querySelector('.footer');
      const footerTop = footer ? footer.getBoundingClientRect().top : Infinity;
      setShow(window.scrollY > 520 && footerTop > window.innerHeight - 40);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enabled]);

  const visible = enabled && show;
  return (
    <div className={`sticky-cta${visible ? ' is-shown' : ''}`} aria-hidden={!visible}>
      <button type="button" className="btn btn--primary btn--block" tabIndex={visible ? 0 : -1} onClick={() => openAccess()}>
        <span>{t.sticky.text}</span>
        <span className="sticky-price">{t.sticky.price}</span>
      </button>
    </div>
  );
}

export function Footer() {
  const { t } = useSite();
  return (
    <footer className="footer" id="contact">
      <div className="wrap footer-in">
        <div className="footer-brand">
          <Brand />
          <p>{t.footer.about}</p>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">{t.footer.sections}</h2>
          <ul>
            <li><Link to={appHref('andogram')}>AndoGram</Link></li>
            <li><Link to={appHref('andusta')}>Andusta</Link></li>
            <li><Link to={sectionHref('demos')}>{t.nav.demos}</Link></li>
            <li><Link to={sectionHref('install')}>{t.nav.install}</Link></li>
            <li><Link to={sectionHref('faq')}>{t.nav.faq}</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h2 className="footer-title">{t.footer.contact}</h2>
          <a className="footer-bot" href={BOT_URL} target="_blank" rel="noopener noreferrer">
            <Send size={16} strokeWidth={1.7} aria-hidden="true" />
            <span>{t.footer.bot}</span>
          </a>
        </div>
      </div>
      <div className="wrap footer-base">
        <p>{t.footer.disclaimer}</p>
        <p>{t.footer.rights}</p>
      </div>
      <div className="footer-mark" aria-hidden="true">ANDO</div>
    </footer>
  );
}
