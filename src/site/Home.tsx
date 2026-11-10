import { useState } from 'react';
import { ArrowRight, Check, Clock, Plus, X } from 'lucide-react';
import type { SiteAppId } from '../types';
import { demoHref } from '../components/sandbox/demos';
import { APPS, SITE_APP_IDS, isOnSale } from './copy';
import { Link, useSite } from './context';
import { Icon } from './icons';
import { Hero } from './Hero';
import { MemberCard, SectionHead } from './parts';
import { appHref } from './router';

const ROMAN = ['I', 'II', 'III', 'IV'];

function Highlights() {
  const { t } = useSite();
  const h = t.highlights;
  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="wrap">
        <SectionHead kicker={h.kicker} title={h.title} id="features-title" />
        <ul className="feat-grid">
          {h.items.map((it) => (
            <li key={it.title} className="feat">
              <span className="feat-icon">
                <Icon name={it.icon} size={22} />
              </span>
              <h3 className="feat-title">{it.title}</h3>
              <p className="feat-text">{it.text}</p>
              <Link to={it.demo ? demoHref(it.demo) : appHref(it.app)} className="text-link">
                {it.demo ? h.try : h.open}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Demos() {
  const { t } = useSite();
  const d = t.demos;
  return (
    <section className="section section--leather" id="demos" aria-labelledby="demos-title">
      <div className="wrap">
        <SectionHead kicker={d.kicker} title={d.title} lead={d.lead} id="demos-title" />
        <ul className="demo-rail">
          {d.items.map((it, i) => (
            <li key={it.id}>
              <Link to={demoHref(it.id)} className="demo-card">
                <span className="demo-num">№ {i + 1}</span>
                <span className="demo-card-title">{it.title}</span>
                <span className="demo-card-text">{it.text}</span>
                <span className="demo-card-foot">
                  <span className="demo-time">
                    <Clock size={15} strokeWidth={1.7} aria-hidden="true" />
                    {it.time}
                  </span>
                  <span className="demo-go">
                    {d.start}
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Apps() {
  const { t, lang, openAccess } = useSite();
  return (
    <section className="section" id="apps" aria-labelledby="apps-title">
      <div className="wrap">
        <SectionHead kicker={t.apps.kicker} title={t.apps.title} id="apps-title" />
        <div className="apps-grid">
          {SITE_APP_IDS.map((id, i) => {
            const a = APPS[id][lang];
            return (
              <article key={id} className="app-block" aria-label={a.name}>
                <MemberCard app={id} num={i + 1}>
                  <p className="mcard-tagline">{a.tagline}</p>
                  <ul className="mcard-points">
                    {a.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <p className="mcard-facts">
                    v{a.version} · {a.size} · Android {a.android}
                  </p>
                </MemberCard>
                <div className="app-actions">
                  <Link to={appHref(id)} className="btn btn--outline">
                    {t.apps.details}
                  </Link>
                  {isOnSale(id) ? (
                    <button type="button" className="btn btn--primary" onClick={() => openAccess(id)}>
                      {t.apps.buy} · 1000 ★
                    </button>
                  ) : (
                    <span className="btn btn--soon">
                      {t.apps.soonShort}
                      {a.price && ` · ${a.price}`}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CompareList({ app }: { app: SiteAppId }) {
  const { lang } = useSite();
  const a = APPS[app][lang];
  const official = a.rival ?? (app === 'andogram' ? 'Telegram' : 'Instagram');
  return (
    <div className="cmp">
      <div className="cmp-head" aria-hidden="true">
        <span />
        <span>{official}</span>
        <span>{a.name}</span>
      </div>
      <ul className="cmp-list">
        {a.compare.map((r) => (
          <li key={r.topic} className="cmp-row">
            <span className="cmp-topic">{r.topic}</span>
            <span className="cmp-cell cmp-cell--off">
              <span className="cmp-label">{official}</span>
              <span className="cmp-val">
                <X size={15} strokeWidth={2} aria-hidden="true" />
                {r.official}
              </span>
            </span>
            <span className={`cmp-cell cmp-cell--ours${r.test ? ' is-test' : ''}`}>
              <span className="cmp-label">{a.name}</span>
              <span className="cmp-val">
                <Check size={15} strokeWidth={2.2} aria-hidden="true" />
                {r.ours}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Compare() {
  const { t } = useSite();
  const [which, setWhich] = useState<SiteAppId>('andogram');
  const tabs: { id: SiteAppId; label: string }[] = SITE_APP_IDS.map((id) => ({ id, label: APPS[id].ru.name }));
  return (
    <section className="section section--paper" id="compare" aria-labelledby="compare-title">
      <div className="wrap">
        <SectionHead kicker={t.compare.kicker} title={t.compare.title} id="compare-title" />
        <div className="switch" role="tablist" aria-labelledby="compare-title">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`cmp-tab-${tab.id}`}
              aria-selected={which === tab.id}
              aria-controls="cmp-panel"
              tabIndex={which === tab.id ? 0 : -1}
              className={`switch-btn${which === tab.id ? ' is-on' : ''}`}
              onClick={() => setWhich(tab.id)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                  const step = e.key === 'ArrowRight' ? 1 : -1;
                  const next = tabs[(tabs.findIndex((x) => x.id === which) + step + tabs.length) % tabs.length].id;
                  setWhich(next);
                  document.getElementById(`cmp-tab-${next}`)?.focus();
                }
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div id="cmp-panel" role="tabpanel" aria-labelledby={`cmp-tab-${which}`}>
          <CompareList app={which} />
        </div>
      </div>
    </section>
  );
}

function Install() {
  const { t, openAccess } = useSite();
  const s = t.install;
  return (
    <section className="section" id="install" aria-labelledby="install-title">
      <div className="wrap">
        <SectionHead kicker={s.kicker} title={s.title} id="install-title" />
        <ol className="steps">
          {s.steps.map((step, i) => (
            <li key={step.title} className="step">
              <span className="step-num" aria-hidden="true">{ROMAN[i]}</span>
              <div>
                <h3 className="step-title">{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="install-cta">
          <button type="button" className="btn btn--primary btn--lg" onClick={() => openAccess()}>
            {s.cta}
          </button>
          <p className="note">{s.note}</p>
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const { t } = useSite();
  return (
    <section className="section section--paper" id="faq" aria-labelledby="faq-title">
      <div className="wrap faq">
        <SectionHead kicker={t.faq.kicker} title={t.faq.title} id="faq-title" />
        <div className="faq-list">
          {t.faq.items.map((it) => (
            <details key={it.q} className="faq-item">
              <summary>
                <span>{it.q}</span>
                <Plus size={20} strokeWidth={1.6} aria-hidden="true" className="faq-plus" />
              </summary>
              <p>{it.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Hero />
      <Highlights />
      <Demos />
      <Apps />
      <Compare />
      <Install />
      <Faq />
    </>
  );
}
