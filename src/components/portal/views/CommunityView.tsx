import React from 'react';
import {
  Send,
  Users,
  Star,
  ExternalLink,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { Language } from '../../../types';
import { portalI18n } from '../../../portalTranslations';
import './CommunityView.css';

interface CommunityViewProps {
  lang: Language;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ lang }) => {
  const t = portalI18n[lang];

  return (
    <div className="ptl-community-view">
      {/* 1. Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(0,245,155,0.1)', border: '1px solid rgba(0,245,155,0.25)', color: '#00f59b', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={13} />
          <span>{t.community.badge}</span>
        </div>
        <h1 className="ptl-section-title">{t.community.title}</h1>
        <p className="ptl-section-subtitle">{t.community.subtitle}</p>
      </div>

      {/* 2. Grid Cards */}
      <div className="ptl-community-grid">
        {/* Telegram Channel */}
        <div className="ptl-community-card">
          <div>
            <div className="ptl-community-icon">
              <Send size={24} />
            </div>
            <h2 className="ptl-community-title">{t.community.channelTitle}</h2>
            <p className="ptl-community-desc">{t.community.channelDesc}</p>
          </div>

          <a
            href="https://t.me/ando_stars_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-community-btn"
          >
            <span>{t.community.joinBtn}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Telegram Stars Bot */}
        <div className="ptl-community-card">
          <div>
            <div className="ptl-community-icon stars">
              <Star size={24} />
            </div>
            <h2 className="ptl-community-title">{t.community.starsBotTitle}</h2>
            <p className="ptl-community-desc">{t.community.starsBotDesc}</p>
          </div>

          <a
            href="https://t.me/andouzbot"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-community-btn"
            style={{ color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)' }}
          >
            <span>@Andouzbot</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* Community Chat */}
        <div className="ptl-community-card">
          <div>
            <div className="ptl-community-icon" style={{ color: '#00f59b', background: 'rgba(0,245,155,0.1)' }}>
              <Users size={24} />
            </div>
            <h2 className="ptl-community-title">{t.community.chatTitle}</h2>
            <p className="ptl-community-desc">{t.community.chatDesc}</p>
          </div>

          <a
            href="https://t.me/ando_stars_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-community-btn"
          >
            <span>{t.community.joinBtn}</span>
            <ExternalLink size={14} />
          </a>
        </div>

        {/* GitHub Repository */}
        <div className="ptl-community-card">
          <div>
            <div className="ptl-community-icon github">
              <GitBranch size={24} />
            </div>
            <h2 className="ptl-community-title">{t.community.githubTitle}</h2>
            <p className="ptl-community-desc">{t.community.githubDesc}</p>
          </div>

          <a
            href="https://github.com/Bgnnrscrt/andouz"
            target="_blank"
            rel="noopener noreferrer"
            className="ptl-community-btn"
          >
            <span>GitHub</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

