import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AppId, Language } from '../../../types';
import type { DemoId } from '../../sandbox/demos';
import { getCommonCopy, type DemoPageCopy } from '../../sandbox/commonCopy';
import { BridgeSandbox } from '../../sandbox/BridgeSandbox';
import { getBridgePageCopy } from '../../sandbox/bridgeCopy';
import { HoneypotSandbox } from '../../sandbox/HoneypotSandbox';
import { getHoneypotPageCopy } from '../../sandbox/honeypotCopy';
import { NoForwardsSandbox } from '../../sandbox/NoForwardsSandbox';
import { getNoForwardsPageCopy } from '../../sandbox/noForwardsCopy';
import './DemoView.css';

/*
 * «Как работает» page of one AndoGram feature (#/projects/andogram/<feature id>):
 * a plain-words explanation plus its «Проверь сам» sandbox. Loaded lazily.
 */

interface SandboxProps {
  lang: Language;
  onBuy: () => void;
}

const DEMOS: Record<DemoId, { page: (lang: Language) => DemoPageCopy; Sandbox: React.ComponentType<SandboxProps> }> = {
  honeypot: { page: getHoneypotPageCopy, Sandbox: HoneypotSandbox },
  no_forwards_bypass: { page: getNoForwardsPageCopy, Sandbox: NoForwardsSandbox },
  archive_bridge: { page: getBridgePageCopy, Sandbox: BridgeSandbox },
};

/** Words that never break at their hyphens in a title. */
const NOWRAP = /(A-B-C|No-Forwards)/;

interface DemoViewProps {
  demo: DemoId;
  lang: Language;
  onOpenDownload: (appId: AppId) => void;
}

export const DemoView: React.FC<DemoViewProps> = ({ demo, lang, onOpenDownload }) => {
  const { page, Sandbox } = DEMOS[demo];
  const p = page(lang);
  const common = getCommonCopy(lang).page;

  return (
    <div className="ptl-demo-view">
      <div className="ptl-demo-intro">
        <a className="ptl-demo-back" href="#/projects/andogram">
          <ArrowLeft size={16} aria-hidden="true" />
          {common.back}
        </a>
        <span className="ptl-demo-kicker">{common.kicker}</span>
        <h1 className="ptl-demo-title">
          {p.title.split(NOWRAP).map((part, i) =>
            NOWRAP.test(part) ? (
              <span key={i} className="ptl-demo-nowrap">
                {part}
              </span>
            ) : (
              part
            ),
          )}
        </h1>
        <p className="ptl-demo-lead">{p.lead}</p>

        <section className="ptl-demo-roles" aria-labelledby="ptl-demo-roles-title">
          <h2 id="ptl-demo-roles-title" className="ptl-demo-roles-title">
            {p.rolesTitle}
          </h2>
          <ul>
            {p.roles.map((role) => (
              <li key={role.badge}>
                <span className={`ptl-demo-role-badge role-${role.tone}`} aria-hidden="true">
                  {role.badge}
                </span>
                <span>
                  <strong>{role.who}</strong> {role.what}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <button type="button" className="ptl-btn-secondary ptl-demo-buy" onClick={() => onOpenDownload('andogram')}>
          {common.buy}
        </button>
      </div>

      <div className="ptl-demo-stage">
        <Sandbox lang={lang} onBuy={() => onOpenDownload('andogram')} />
      </div>
    </div>
  );
};

export default DemoView;
