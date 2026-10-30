import React from 'react';
import {
  Headphones,
  Send,
  Lightbulb,
  Clock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { Language } from '../../../types';
import { portalI18n } from '../../../portalTranslations';
import './SupportView.css';

interface SupportViewProps {
  lang: Language;
}

export const SupportView: React.FC<SupportViewProps> = ({ lang }) => {
  const t = portalI18n[lang];

  return (
    <div className="ptl-support-view">
      {/* 1. Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(0,245,155,0.1)', border: '1px solid rgba(0,245,155,0.25)', color: '#00f59b', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={13} />
          <span>{t.support.badge}</span>
        </div>
        <h1 className="ptl-section-title">{t.support.title}</h1>
        <p className="ptl-section-subtitle">{t.support.subtitle}</p>
      </div>

      {/* 2. Support Cards */}
      <div className="ptl-support-cards">
        {/* Support Bot Card */}
        <div className="ptl-support-card">
          <div>
            <div className="ptl-support-icon">
              <Headphones size={26} />
            </div>
            <h2 className="ptl-support-title">{t.support.botTitle}</h2>
            <p className="ptl-support-desc">{t.support.botDesc}</p>
          </div>

          <a
            href="https://t.me/ando_stars_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-support-link-btn"
          >
            <Send size={16} />
            <span>{t.support.botBtn}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Feature Suggestion Card */}
        <div className="ptl-support-card">
          <div>
            <div className="ptl-support-icon blue">
              <Lightbulb size={26} />
            </div>
            <h2 className="ptl-support-title">{t.support.feedbackTitle}</h2>
            <p className="ptl-support-desc">{t.support.feedbackDesc}</p>
          </div>

          <a
            href="https://t.me/ando_stars_bot?start=idea"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-support-link-btn"
            style={{ background: 'linear-gradient(135deg, #00b4d8, #0077b6)' }}
          >
            <MessageSquare size={16} />
            <span>{lang === 'uz' ? 'G‘oya yo‘llash' : lang === 'en' ? 'Suggest a feature' : 'Предложить фичу'}</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* 3. Server & Bot Infrastructure Status */}
      <div className="ptl-support-status-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={18} color="#00f59b" />
          <span>{t.support.statusOk}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-ando)', fontWeight: 600 }}>
          <Clock size={16} />
          <span>{t.support.responseTime}</span>
        </div>
      </div>
    </div>
  );
};

