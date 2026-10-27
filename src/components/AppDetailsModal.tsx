import React, { useId, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cpu, Download, HardDrive, ShieldCheck, Smartphone } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Language, AppInfo } from '../types';
import { DURATION, EASE_OUT } from '../lib/motion';
import { Modal } from './ui/Modal';
import { AppIcon, FeatureIcon } from './AppsShowcase';
import './AppDetailsModal.css';

interface AppDetailsModalProps {
  app: AppInfo | null;
  onClose: () => void;
  lang: Language;
  onOpenDownload: () => void;
}

interface DetailsCopy {
  close: string;
  size: string;
  compat: string;
  arch: string;
  root: string;
  noRoot: string;
  features: string;
  changelog: string;
  latest: string;
  download: (name: string) => string;
}

const COPY: Record<Language, DetailsCopy> = {
  ru: {
    close: 'Закрыть',
    size: 'Размер APK',
    compat: 'Совместимость',
    arch: 'Архитектура',
    root: 'Root-права',
    noRoot: 'Не требуются',
    features: 'Все возможности',
    changelog: 'История изменений',
    latest: 'Актуальная',
    download: (name) => `Скачать ${name}`,
  },
  uz: {
    close: 'Yopish',
    size: 'APK hajmi',
    compat: 'Moslik',
    arch: 'Arxitektura',
    root: 'Root-huquqlari',
    noRoot: 'Talab qilinmaydi',
    features: 'Barcha imkoniyatlar',
    changelog: "O'zgarishlar tarixi",
    latest: "So'nggi",
    download: (name) => `${name}ni yuklab olish`,
  },
  en: {
    close: 'Close',
    size: 'APK size',
    compat: 'Compatibility',
    arch: 'Architecture',
    root: 'Root access',
    noRoot: 'Not required',
    features: 'All features',
    changelog: 'Changelog',
    latest: 'Latest',
    download: (name) => `Download ${name}`,
  },
};

/** "27.10.2026" → "2026-10-27" for <time dateTime>. */
const isoDate = (date: string) => {
  const [d, m, y] = date.split('.');
  return d && m && y ? `${y}-${m}-${d}` : undefined;
};

/** Content cascade after the panel starts to open: blocks follow 40ms apart, top to bottom. */
const STEP = 0.04;
const FIRST = 0.08;

export const AppDetailsModal: React.FC<AppDetailsModalProps> = ({ app, onClose, lang, onOpenDownload }) => {
  // Keep the last app so the panel still has content while it animates out after `app` becomes null.
  const [shown, setShown] = useState(app);
  if (app && app !== shown) setShown(app);
  const current = app ?? shown;

  const reduce = useReducedMotion() ?? false;
  const titleId = useId();
  const featuresId = useId();
  const changelogId = useId();
  const t = COPY[lang];

  const enter = (step: number) =>
    reduce
      ? {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: DURATION.fast, ease: EASE_OUT },
        }
      : {
          initial: { opacity: 0, transform: 'translateY(10px)' },
          animate: { opacity: 1, transform: 'translateY(0px)' },
          transition: { duration: DURATION.scene, ease: EASE_OUT, delay: FIRST + step * STEP },
        };

  const specs: { key: string; label: string; value: string; Icon: LucideIcon; ok?: boolean }[] = current
    ? [
        { key: 'size', label: t.size, value: current.size, Icon: HardDrive },
        { key: 'compat', label: t.compat, value: current.minAndroid, Icon: Smartphone },
        { key: 'arch', label: t.arch, value: 'ARM64-v8a', Icon: Cpu },
        { key: 'root', label: t.root, value: t.noRoot, Icon: ShieldCheck, ok: true },
      ]
    : [];
  const featuresStart = specs.length;
  const changelogStart = featuresStart + (current?.features.length ?? 0);

  return (
    <Modal
      open={app !== null}
      onClose={onClose}
      labelledBy={titleId}
      closeLabel={t.close}
      maxWidth={760}
      panelClassName="adm-panel"
      panelStyle={current ? ({ '--app-color': current.color, '--app-gradient': current.gradient } as React.CSSProperties) : undefined}
    >
      {current && (
        <>
          <header className="adm-head">
            <AppIcon app={current} size="lg" glintDelay={0.5} />
            <div className="adm-head-text">
              <div className="adm-title-row">
                <h2 id={titleId} className="adm-title">
                  {current.name}
                </h2>
                <span className="adm-version">{current.version}</span>
              </div>
              <p className="adm-tagline">{current.tagline[lang]}</p>
            </div>
          </header>

          <dl className="adm-specs">
            {specs.map(({ key, label, value, Icon, ok }, i) => (
              <motion.div key={key} className={`adm-spec${ok ? ' is-ok' : ''}`} {...enter(i)}>
                <dt>
                  <Icon size={14} aria-hidden="true" />
                  <span>{label}</span>
                </dt>
                <dd>{value}</dd>
              </motion.div>
            ))}
          </dl>

          <section className="adm-section" aria-labelledby={featuresId}>
            <h3 id={featuresId} className="adm-h3">
              {t.features}
              <span className="adm-count">{current.features.length}</span>
            </h3>
            <ul className="adm-features">
              {current.features.map((feat, i) => (
                <motion.li key={feat.id} className="adm-feature" {...enter(featuresStart + i)}>
                  <span className="adm-feature-icon">
                    <FeatureIcon name={feat.iconName} size={18} />
                  </span>
                  <div className="adm-feature-body">
                    <div className="adm-feature-head">
                      <h4 className="adm-feature-title">{feat.title[lang]}</h4>
                      {feat.tag && <span className="app-tag">{feat.tag[lang]}</span>}
                    </div>
                    <p className="adm-feature-desc">{feat.description[lang]}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>

          <section className="adm-section" aria-labelledby={changelogId}>
            <h3 id={changelogId} className="adm-h3">
              {t.changelog}
            </h3>
            <ol className="adm-timeline">
              {current.changelog.map((log, i) => (
                <motion.li key={log.version} className="adm-release" {...enter(changelogStart + i)}>
                  <span className={`adm-node${i === 0 ? ' is-latest' : ''}`} aria-hidden="true" />
                  <div className="adm-release-head">
                    <span className="adm-release-version">v{log.version}</span>
                    {i === 0 && <span className="adm-latest">{t.latest}</span>}
                    <time className="adm-release-date" dateTime={isoDate(log.date)}>
                      {log.date}
                    </time>
                  </div>
                  <ul className="adm-release-items">
                    {log.items[lang].map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                </motion.li>
              ))}
            </ol>
          </section>

          <div className="adm-footer">
            <button
              type="button"
              className="btn btn-shine adm-cta"
              onClick={() => {
                onClose();
                onOpenDownload();
              }}
            >
              <Download size={20} aria-hidden="true" />
              <span>{t.download(current.name)}</span>
              <span className="adm-cta-size">{current.size}</span>
            </button>
          </div>
        </>
      )}
    </Modal>
  );
};
