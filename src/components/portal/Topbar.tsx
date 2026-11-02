import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Languages, Menu } from 'lucide-react';
import { Language } from '../../types';
import './Topbar.css';

/*
 * The bar over every portal page: only the language button in the right
 * corner (owner, 2026-11-02: no breadcrumb, no ☰ on wide screens; the
 * sidebar has its own collapse button). Below 900px the sidebar is a drawer,
 * so ☰ stays there: it is the only way to open it.
 */

interface TopbarProps {
  lang: Language;
  setLang: (l: Language) => void;
  /** The mobile sidebar drawer is open (☰'s aria-expanded). */
  menuOpen: boolean;
  onToggleSidebar: () => void;
}

const LANGUAGES: { code: Language; name: string }[] = [
  { code: 'uz', name: 'O‘zbekcha' },
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
];

const LABELS: Record<Language, { language: string; menu: string }> = {
  ru: { language: 'Язык', menu: 'Меню' },
  uz: { language: 'Til', menu: 'Menyu' },
  en: { language: 'Language', menu: 'Menu' },
};

/** The current language with an icon; a click opens the list of all three. */
function LanguageMenu({ lang, setLang }: { lang: Language; setLang: (l: Language) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const listId = useId();
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[1];

  // Close on a press outside or on Escape (focus goes back to the button).
  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const choose = (code: Language) => {
    setLang(code);
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div
      className="ptl-lang"
      ref={rootRef}
      // Tabbing out of the list closes it.
      onBlur={(e) => {
        if (!rootRef.current?.contains(e.relatedTarget as Node | null)) setOpen(false);
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`ptl-lang-trigger${open ? ' is-open' : ''}`}
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-label={`${LABELS[lang].language}: ${current.name}`}
        onClick={() => setOpen((o) => !o)}
      >
        <Languages size={16} aria-hidden="true" />
        <span className="ptl-lang-current">{lang.toUpperCase()}</span>
        <ChevronDown size={14} className="ptl-lang-chevron" aria-hidden="true" />
      </button>
      {open && (
        <ul id={listId} className="ptl-lang-menu">
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                type="button"
                lang={l.code}
                className={`ptl-lang-option${l.code === lang ? ' is-current' : ''}`}
                aria-current={l.code === lang ? 'true' : undefined}
                onClick={() => choose(l.code)}
              >
                <span className="ptl-lang-code" aria-hidden="true">
                  {l.code.toUpperCase()}
                </span>
                <span className="ptl-lang-name">{l.name}</span>
                {l.code === lang && <Check size={15} className="ptl-lang-check" aria-hidden="true" />}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const Topbar: React.FC<TopbarProps> = ({ lang, setLang, menuOpen, onToggleSidebar }) => (
  <header className="ptl-topbar">
    <button
      type="button"
      className="ptl-menu-trigger"
      onClick={onToggleSidebar}
      aria-label={LABELS[lang].menu}
      aria-expanded={menuOpen}
    >
      <Menu size={20} aria-hidden="true" />
    </button>

    <LanguageMenu lang={lang} setLang={setLang} />
  </header>
);
