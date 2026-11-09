import { Suspense, lazy, type ComponentType, type LazyExoticComponent } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { Language } from '../types';
import { demoApp, splitNoWrap, type DemoId } from '../components/sandbox/demos';
import { getDemoPageCopy } from '../components/sandbox/demoPages';
import { emojify } from '../lib/emoji';
import { APPS } from './copy';
import { Link, useSite } from './context';
import { appHref } from './router';
import './demo.css';

/*
 * A «Проверь сам» page (#/projects/<app>/<demo>): the explanation from demoPages.ts and
 * the interactive phone. Loaded lazily; each sandbox is a chunk of its own. The buy
 * button lives in the sandbox's finale and opens the access window.
 */

interface SandboxProps {
  lang: Language;
  onBuy: () => void;
}

const SANDBOXES: Record<DemoId, LazyExoticComponent<ComponentType<SandboxProps>>> = {
  honeypot: lazy(() => import('../components/sandbox/HoneypotSandbox')),
  no_forwards_bypass: lazy(() => import('../components/sandbox/NoForwardsSandbox')),
  archive_bridge: lazy(() => import('../components/sandbox/BridgeSandbox')),
  ar_masks: lazy(() => import('../components/sandbox/ArMasksSandbox')),
  ghost_mode: lazy(() => import('../components/sandbox/GhostStoriesSandbox')),
  view_once: lazy(() => import('../components/sandbox/ViewOnceSandbox')),
  like_fonts: lazy(() => import('../components/sandbox/LikeFontsSandbox')),
};

export default function DemoPage({ demo }: { demo: DemoId }) {
  const { lang, t, openAccess } = useSite();
  const app = demoApp(demo);
  const p = getDemoPageCopy(demo, lang);
  const Sandbox = SANDBOXES[demo];

  return (
    <div className="demo-page wrap">
      <div className="demo-intro">
        <Link to={appHref(app)} className="back-link">
          <ArrowLeft size={17} aria-hidden="true" />
          {t.demoPage.back(APPS[app][lang].name)}
        </Link>
        <p className="kicker">{t.demoPage.kicker}</p>
        <h1 className="h1 demo-title">
          {splitNoWrap(p.title).map((part, i) =>
            part.keep ? (
              <span key={i} className="nowrap">
                {part.text}
              </span>
            ) : (
              part.text
            ),
          )}
        </h1>
        <p className="lead">{emojify(p.lead)}</p>
        <section className="roles" aria-labelledby="roles-title">
          <h2 id="roles-title" className="roles-title">
            {p.rolesTitle}
          </h2>
          <ul>
            {p.roles.map((role) => (
              <li key={role.badge}>
                <span className={`role role--${role.tone}`}>{role.badge}</span>
                <span>
                  <strong>{emojify(role.who)}</strong> {emojify(role.what)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="demo-stage">
        <Suspense fallback={<div className="demo-loading" aria-hidden="true" />}>
          <Sandbox lang={lang} onBuy={() => openAccess(app)} />
        </Suspense>
      </div>
    </div>
  );
}
