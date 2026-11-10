import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { SiteAppId } from '../types';
import { demoHref, isListedDemo } from '../components/sandbox/demos';
import { APPS, SITE_APP_IDS, isOnSale } from './copy';
import { Link, useSite } from './context';
import { CompareList } from './Home';
import { Icon } from './icons';
import { MemberCard, SectionHead } from './parts';
import { homeHref } from './router';

export function AppPage({ app }: { app: SiteAppId }) {
  const { t, lang, openAccess } = useSite();
  const a = APPS[app][lang];
  const p = t.appPage;
  const firstDemo = a.top.find((f) => f.demo && isListedDemo(f.demo))?.demo;
  /** «Купить» for an app on sale; «Скоро в продаже» (plain text, not a button) for the others. */
  const buy = (className: string) =>
    isOnSale(app) ? (
      <button type="button" className={className} onClick={() => openAccess(app)}>
        {p.buy}
      </button>
    ) : (
      <span className={`${className} btn--soon`}>
        {t.apps.soon}
        {a.price && ` · ${a.price}`}
      </span>
    );

  return (
    <>
      <section className="app-hero" aria-labelledby="app-title">
        <div className="wrap">
          <Link to={homeHref} className="back-link">
            <ArrowLeft size={17} aria-hidden="true" />
            {p.back}
          </Link>
          <div className="app-hero-in">
            <div className="app-hero-copy">
              <p className="kicker">
                {p.kicker} · {a.platform}
              </p>
              <h1 className="h1" id="app-title">
                {a.name}
              </h1>
              <p className="app-tagline">{a.tagline}</p>
              <p className="lead">{a.lead}</p>
              <div className="hero-actions">
                {buy('btn btn--primary btn--lg')}
                {firstDemo && (
                  <Link to={demoHref(firstDemo)} className="btn btn--outline btn--lg">
                    {p.tryDemo}
                  </Link>
                )}
              </div>
            </div>
            <div className="app-hero-card" aria-hidden="true">
              <MemberCard app={app} num={SITE_APP_IDS.indexOf(app) + 1} big />
            </div>
          </div>
          <dl className="facts">
            <div>
              <dt>{p.facts.version}</dt>
              <dd>{a.version}</dd>
            </div>
            <div>
              <dt>{p.facts.size}</dt>
              <dd>{a.size}</dd>
            </div>
            <div>
              <dt>{p.facts.android}</dt>
              <dd>{a.android}</dd>
            </div>
            <div>
              <dt>{p.facts.updated}</dt>
              <dd>{a.updated}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="features" aria-labelledby="top-title">
        <div className="wrap">
          <SectionHead kicker={a.name} title={p.top} id="top-title" />
          <ul className="top-list">
            {a.top.map((f, i) => (
              <li key={f.id} className="top-item">
                <span className="top-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                <div className="top-body">
                  <h3 className="top-title">
                    <Icon name={f.icon} size={20} />
                    {f.title}
                  </h3>
                  <p>{f.text}</p>
                  {f.demo && isListedDemo(f.demo) && (
                    <Link to={demoHref(f.demo)} className="text-link">
                      {p.tryDemo}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="more-title">
        <div className="wrap">
          <SectionHead kicker={a.name} title={p.more} id="more-title" />
          <ul className="more-grid">
            {a.more.map((f) => (
              <li key={f.id} className="more-item">
                <span className="feat-icon">
                  <Icon name={f.icon} size={20} />
                </span>
                <div>
                  <h3 className="more-title">
                    {f.title}
                    {f.test && <span className="tag">{p.test}</span>}
                  </h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="cmp-title">
        <div className="wrap">
          <SectionHead kicker={t.compare.kicker} title={a.compareTitle ?? p.compare} id="cmp-title" />
          <CompareList app={app} />
        </div>
      </section>

      <section className="section section--paper" aria-labelledby="news-title">
        <div className="wrap news">
          <SectionHead kicker={`v${a.changelog.version} · ${a.changelog.date}`} title={p.whatsNew} id="news-title" />
          <ul className="news-list">
            {a.changelog.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-band">
        <div className="wrap cta-band-in">
          <p className="cta-band-title">{a.tagline}</p>
          {buy('btn btn--brass btn--lg')}
        </div>
      </section>
    </>
  );
}
