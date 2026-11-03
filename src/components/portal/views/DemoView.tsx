import React, { Suspense, lazy } from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AppId, Language } from '../../../types';
import { demoApp, splitNoWrap, type DemoId } from '../../sandbox/demos';
import { getCommonCopy } from '../../sandbox/commonCopy';
import { getDemoPageCopy } from '../../sandbox/demoPages';
import { emojify } from '../../../lib/emoji';
import './DemoView.css';

/*
 * «Как работает» page of one feature (#/projects/<app>/<feature id>):
 * a plain-words explanation plus its «Проверь сам» sandbox. No buy button on
 * the page (owner, 2026-11-02: it only shows how the feature works); the
 * sandbox's finale has one. Loaded lazily; each sandbox is a chunk of its
 * own, so a demo page loads only its own sandbox.
 */

interface SandboxProps {
  lang: Language;
  onBuy: () => void;
}

const SANDBOXES: Record<DemoId, React.LazyExoticComponent<React.ComponentType<SandboxProps>>> = {
  honeypot: lazy(() => import('../../sandbox/HoneypotSandbox')),
  no_forwards_bypass: lazy(() => import('../../sandbox/NoForwardsSandbox')),
  archive_bridge: lazy(() => import('../../sandbox/BridgeSandbox')),
  ar_masks: lazy(() => import('../../sandbox/ArMasksSandbox')),
  ghost_mode: lazy(() => import('../../sandbox/GhostStoriesSandbox')),
  view_once: lazy(() => import('../../sandbox/ViewOnceSandbox')),
  like_fonts: lazy(() => import('../../sandbox/LikeFontsSandbox')),
};

interface DemoViewProps {
  demo: DemoId;
  lang: Language;
  onOpenDownload: (appId: AppId) => void;
}

export const DemoView: React.FC<DemoViewProps> = ({ demo, lang, onOpenDownload }) => {
  const Sandbox = SANDBOXES[demo];
  const app = demoApp(demo);
  const p = getDemoPageCopy(demo, lang);
  const common = getCommonCopy(lang, app).page;

  return (
    <div className="ptl-demo-view">
      <div className="ptl-demo-intro">
        <a className="ptl-demo-back" href={`#/projects/${app}`}>
          <ArrowLeft size={16} aria-hidden="true" />
          {common.back}
        </a>
        <span className="ptl-demo-kicker">{common.kicker}</span>
        <h1 className="ptl-demo-title">
          {splitNoWrap(p.title).map((part, i) =>
            part.keep ? (
              <span key={i} className="ptl-demo-nowrap">
                {part.text}
              </span>
            ) : (
              part.text
            ),
          )}
        </h1>
        <p className="ptl-demo-lead">{emojify(p.lead)}</p>

        <section className="ptl-demo-roles" aria-labelledby="ptl-demo-roles-title">
          <h2 id="ptl-demo-roles-title" className="ptl-demo-roles-title">
            {p.rolesTitle}
          </h2>
          <ul>
            {p.roles.map((role) => (
              <li key={role.badge}>
                <span className={`ptl-demo-role-badge role-${role.tone}`}>
                  {role.badge}
                </span>
                <span>
                  <strong>{emojify(role.who)}</strong> {emojify(role.what)}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="ptl-demo-stage">
        <Suspense fallback={<div className="ptl-demo-loading" aria-hidden="true" />}>
          <Sandbox lang={lang} onBuy={() => onOpenDownload(app)} />
        </Suspense>
      </div>
    </div>
  );
};

export default DemoView;
