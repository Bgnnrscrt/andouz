import React from 'react';
import { ArrowLeft } from 'lucide-react';
import type { AppId, Language } from '../../../types';
import { BridgeSandbox } from '../../sandbox/BridgeSandbox';
import { getBridgePageCopy } from '../../sandbox/bridgeCopy';
import './BridgeDemoView.css';

/*
 * «Как работает» page of the AndoGram A-B-C bridge (#/projects/andogram/archive_bridge):
 * a plain-words explanation plus the «Проверь сам» sandbox. Loaded lazily.
 */

interface BridgeDemoViewProps {
  lang: Language;
  onOpenDownload: (appId: AppId) => void;
}

export const BridgeDemoView: React.FC<BridgeDemoViewProps> = ({ lang, onOpenDownload }) => {
  const p = getBridgePageCopy(lang);

  return (
    <div className="ptl-demo-view">
      <div className="ptl-demo-intro">
        <a className="ptl-demo-back" href="#/projects/andogram">
          <ArrowLeft size={16} aria-hidden="true" />
          {p.back}
        </a>
        <span className="ptl-demo-kicker">{p.kicker}</span>
        <h1 className="ptl-demo-title">{p.title}</h1>
        <p className="ptl-demo-lead">{p.lead}</p>

        <section className="ptl-demo-roles" aria-labelledby="ptl-demo-roles-title">
          <h2 id="ptl-demo-roles-title" className="ptl-demo-roles-title">
            {p.rolesTitle}
          </h2>
          <ul>
            {p.roles.map((role) => (
              <li key={role.letter}>
                <span className={`ptl-demo-role-badge role-${role.letter.toLowerCase()}`} aria-hidden="true">
                  {role.letter}
                </span>
                <span>
                  <strong>{role.who}</strong> {role.what}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <button type="button" className="ptl-btn-secondary ptl-demo-buy" onClick={() => onOpenDownload('andogram')}>
          {p.buy}
        </button>
      </div>

      <div className="ptl-demo-stage">
        <BridgeSandbox lang={lang} onBuy={() => onOpenDownload('andogram')} />
      </div>
    </div>
  );
};

export default BridgeDemoView;
