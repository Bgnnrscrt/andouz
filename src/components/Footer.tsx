import React from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Star } from 'lucide-react';
import { Stagger, StaggerItem } from './fx/Reveal';
import './Footer.css';

interface FooterProps {
  lang: Language;
}

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
              <li><a href="#/projects/andogram" className="footer-link" style={{ '--link-color': '#00b4d8' } as React.CSSProperties}>AndoGram (Telegram Mod)</a></li>
              <li><a href="#/projects/andusta" className="footer-link" style={{ '--link-color': '#ff007f' } as React.CSSProperties}>Andusta (Instagram Mod)</a></li>
              <li><a href="#/projects/andogram" className="footer-link">{c.compare}</a></li>
              <li><a href="#/docs" className="footer-link">{c.guide}</a></li>
            </ul>
          </StaggerItem>

          {/* Col 3: Community & Bot */}
          <StaggerItem>
            <div className="footer-title">{c.comm}</div>
            <div className="footer-actions">
              <a
                href="https://t.me/andouzbot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline footer-btn"
              >
                <Star size={16} color="#f59e0b" fill="#f59e0b" />
                <span>{c.bot}: @Andouzbot</span>
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
