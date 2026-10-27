import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Star } from 'lucide-react';
import { Stagger, StaggerItem } from './fx/Reveal';
import './Footer.css';

interface FooterProps {
  lang: Language;
}

/** GitHub mark (lucide v1 no longer ships brand icons). */
const GitHubMark: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  const t = translations.footer;

  const getColTitles = () => {
    switch (lang) {
      case 'uz':
        return {
          about: "Android uchun mustaqil ekotizim. Maxfiylik, erkinlik va platformalar cheklovlaridan to'liq ozod bo'lish.",
          nav: "Navigatsiya",
          comm: "Hamjamiyat & Bot",
          rights: "Barcha huquqlar himoyalangan.",
          guide: "O'rnatish qo'llanmasi",
          compare: "Taqqoslash jadvali",
          bot: "To'lov boti"
        };
      case 'en':
        return {
          about: "Autonomous app ecosystem for Android. True privacy, freedom, and liberation from corporate limits.",
          nav: "Navigation",
          comm: "Community & Bot",
          rights: "All rights reserved.",
          guide: "Installation Guide",
          compare: "Comparison Matrix",
          bot: "Payment bot"
        };
      default:
        return {
          about: "Независимая экосистема приложений для Android. Приватность, свобода и освобождение от ограничений корпораций.",
          nav: "Навигация",
          comm: "Сообщество & Бот",
          rights: "Все права защищены.",
          guide: "Инструкция по установке",
          compare: "Таблица сравнения",
          bot: "Бот оплаты"
        };
    }
  };

  const c = getColTitles();

  return (
    <footer className="site-footer">
      <span className="footer-glow" aria-hidden="true" />
      <div className="container">
        <Stagger className="footer-cols" stagger={0.08}>
          {/* Col 1: Brand */}
          <StaggerItem className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-word">ANDO</span>
              <span className="footer-logo-tld">.UZ</span>
            </div>
            <p className="footer-about">{c.about}</p>
            <div className="footer-copy">
              © 2026 ANDO Ecosystem. {c.rights}
            </div>
          </StaggerItem>

          {/* Col 2: Fast Links */}
          <StaggerItem>
            <div className="footer-title">{c.nav}</div>
            <ul className="footer-links">
              <li><a href="#apps" className="footer-link" style={{ '--link-color': '#00b4d8' } as React.CSSProperties}>AndoGram (Telegram Mod)</a></li>
              <li><a href="#apps" className="footer-link" style={{ '--link-color': '#ff007f' } as React.CSSProperties}>Andusta (Instagram Mod)</a></li>
              <li><a href="#compare" className="footer-link">{c.compare}</a></li>
              <li><a href="#install" className="footer-link">{c.guide}</a></li>
            </ul>
          </StaggerItem>

          {/* Col 3: Community & Bot */}
          <StaggerItem>
            <div className="footer-title">{c.comm}</div>
            <div className="footer-actions">
              <a
                href="https://t.me/ando_stars_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline footer-btn"
              >
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span>{c.bot}: @ando_stars_bot</span>
              </a>

              <a
                href="https://github.com/Bgnnrscrt"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline footer-btn"
              >
                <GitHubMark />
                <span>GitHub: @Bgnnrscrt</span>
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        {/* Bottom Disclaimer */}
        <div className="footer-disclaimer">
          {t.disclaimer[lang]}
        </div>

        <div className="footer-wordmark" aria-hidden="true">ANDO</div>
      </div>
    </footer>
  );
};
