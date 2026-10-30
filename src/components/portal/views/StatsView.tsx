import React from 'react';
import {
  Download,
  Users,
  ShieldCheck,
  Eye,
  TrendingUp,
  Globe2,
  Smartphone,
  Activity,
  Sparkles
} from 'lucide-react';
import { Language } from '../../../types';
import { portalI18n } from '../../../portalTranslations';
import './StatsView.css';

interface StatsViewProps {
  lang: Language;
}

export const StatsView: React.FC<StatsViewProps> = ({ lang }) => {
  const t = portalI18n[lang];

  const months = lang === 'uz'
    ? ['May', 'Iyun', 'Iyul', 'Avg', 'Sen', 'Okt']
    : lang === 'ru'
    ? ['Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт']
    : ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];

  const chartData = [
    { month: months[0], height: '42%', value: '4.8k' },
    { month: months[1], height: '58%', value: '6.9k' },
    { month: months[2], height: '70%', value: '8.4k' },
    { month: months[3], height: '82%', value: '10.2k' },
    { month: months[4], height: '90%', value: '11.8k' },
    { month: months[5], height: '100%', value: '12.7k' }
  ];

  const geoData = lang === 'uz' ? [
    { name: "O'zbekiston (Toshkent & Viloyatlar)", percent: 74, width: '74%' },
    { name: "Qozog'iston", percent: 12, width: '12%' },
    { name: "MDH davlatlari", percent: 9, width: '9%' },
    { name: "Boshqa davlatlar", percent: 5, width: '5%' }
  ] : [
    { name: 'Узбекистан (Ташкент и регионы)', percent: 74, width: '74%' },
    { name: 'Казахстан', percent: 12, width: '12%' },
    { name: 'Страны СНГ', percent: 9, width: '9%' },
    { name: 'Другие страны', percent: 5, width: '5%' }
  ];

  const deviceData = [
    { name: 'Android 14 & 15 (HyperOS 2, OneUI 6/7)', percent: 58, width: '58%' },
    { name: 'Android 12 & 13 (OneUI 4/5, MIUI 13/14)', percent: 32, width: '32%' },
    { name: 'Android 8.0 - 11 (Legacy devices)', percent: 10, width: '10%' }
  ];

  return (
    <div className="ptl-stats-view">
      {/* 1. Page Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '9999px', background: 'rgba(0,245,155,0.1)', border: '1px solid rgba(0,245,155,0.25)', color: '#00f59b', fontSize: '0.75rem', fontWeight: 700, marginBottom: '12px' }}>
          <Sparkles size={13} />
          <span>{t.stats.badge}</span>
        </div>
        <h1 className="ptl-section-title">{t.stats.title}</h1>
        <p className="ptl-section-subtitle">{t.stats.subtitle}</p>
      </div>

      {/* 2. Top Metric Cards */}
      <div className="ptl-stats-grid">
        {/* Card 1: Downloads */}
        <div className="ptl-metric-card">
          <div className="ptl-metric-top">
            <div className="ptl-metric-icon">
              <Download size={22} />
            </div>
            <span className="ptl-metric-growth">
              <TrendingUp size={13} /> +18.4%
            </span>
          </div>
          <div className="ptl-metric-value">{t.stats.metricDownloads}</div>
          <div className="ptl-metric-desc">{t.stats.metricDownloadsDesc}</div>
        </div>

        {/* Card 2: Active Users */}
        <div className="ptl-metric-card">
          <div className="ptl-metric-top">
            <div className="ptl-metric-icon blue">
              <Users size={22} />
            </div>
            <span className="ptl-metric-growth" style={{ color: '#00b4d8', borderColor: 'rgba(0,180,216,0.3)', background: 'rgba(0,180,216,0.1)' }}>
              <Activity size={13} /> Live
            </span>
          </div>
          <div className="ptl-metric-value">{t.stats.metricUsers}</div>
          <div className="ptl-metric-desc">{t.stats.metricUsersDesc}</div>
        </div>

        {/* Card 3: Saved Media */}
        <div className="ptl-metric-card">
          <div className="ptl-metric-top">
            <div className="ptl-metric-icon pink">
              <Eye size={22} />
            </div>
            <span className="ptl-metric-growth" style={{ color: '#ff007f', borderColor: 'rgba(255,0,127,0.3)', background: 'rgba(255,0,127,0.1)' }}>
              Anti-Delete
            </span>
          </div>
          <div className="ptl-metric-value">{t.stats.metricSavedMedia}</div>
          <div className="ptl-metric-desc">{t.stats.metricSavedMediaDesc}</div>
        </div>

        {/* Card 4: Anti-ban uptime */}
        <div className="ptl-metric-card">
          <div className="ptl-metric-top">
            <div className="ptl-metric-icon amber">
              <ShieldCheck size={22} />
            </div>
            <span className="ptl-metric-growth" style={{ color: '#f59e0b', borderColor: 'rgba(245,158,11,0.3)', background: 'rgba(245,158,11,0.1)' }}>
              100% Safe
            </span>
          </div>
          <div className="ptl-metric-value">{t.stats.metricAntiBan}</div>
          <div className="ptl-metric-desc">{t.stats.metricAntiBanDesc}</div>
        </div>
      </div>

      {/* 3. Analytics Chart & Breakdown */}
      <div className="ptl-analytics-row">
        {/* Monthly Downloads Bar Chart */}
        <div className="ptl-analytics-card">
          <div className="ptl-analytics-header">
            <h2 className="ptl-analytics-title">{t.stats.chartTitle}</h2>
            <p className="ptl-analytics-subtitle">{t.stats.chartSubtitle}</p>
          </div>

          <div className="ptl-chart-bars">
            {chartData.map((bar, idx) => (
              <div key={idx} className="ptl-bar-col">
                <span className="ptl-bar-tooltip">{bar.value}</span>
                <div
                  className="ptl-bar-fill"
                  style={{ height: bar.height }}
                  title={`${bar.month}: ${bar.value}`}
                />
                <span className="ptl-bar-label">{bar.month}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-dim)', paddingTop: '10px' }}>
            <span>⚡ {lang === 'uz' ? 'Ma’lumotlar har 24 soatda yangilanadi' : 'Данные синхронизируются каждые 24 часа'}</span>
            <span style={{ color: '#00f59b', fontWeight: 600 }}>↑ +320% {lang === 'uz' ? 'yillik o‘sish' : 'годовой рост'}</span>
          </div>
        </div>

        {/* Geo Distribution */}
        <div className="ptl-analytics-card">
          <div className="ptl-analytics-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <Globe2 size={18} color="#00f59b" />
              <h2 className="ptl-analytics-title">{t.stats.geoTitle}</h2>
            </div>
            <p className="ptl-analytics-subtitle">{t.stats.geoSubtitle}</p>
          </div>

          <div className="ptl-dist-list">
            {geoData.map((item, idx) => (
              <div key={idx} className="ptl-dist-item">
                <div className="ptl-dist-info">
                  <span className="ptl-dist-name">{item.name}</span>
                  <span className="ptl-dist-percent">{item.percent}%</span>
                </div>
                <div className="ptl-dist-track">
                  <div className="ptl-dist-bar" style={{ width: item.width }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Supported OS Generations */}
      <div className="ptl-analytics-card">
        <div className="ptl-analytics-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Smartphone size={18} color="#00b4d8" />
            <h2 className="ptl-analytics-title">{t.stats.devicesTitle}</h2>
          </div>
          <p className="ptl-analytics-subtitle">{t.stats.devicesSubtitle}</p>
        </div>

        <div className="ptl-dist-list">
          {deviceData.map((item, idx) => (
            <div key={idx} className="ptl-dist-item">
              <div className="ptl-dist-info">
                <span className="ptl-dist-name">{item.name}</span>
                <span className="ptl-dist-percent">{item.percent}%</span>
              </div>
              <div className="ptl-dist-track">
                <div
                  className="ptl-dist-bar"
                  style={{
                    width: item.width,
                    background: idx === 1 ? 'linear-gradient(90deg, #00b4d8, #0077b6)' : idx === 2 ? 'linear-gradient(90deg, #f59e0b, #d97706)' : undefined
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

