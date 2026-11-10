import type { ReactNode } from 'react';
import type { SiteAppId } from '../types';
import { APPS } from './copy';
import { useSite } from './context';
import { AppEmblem } from './icons';

/** Kicker + serif title (+ lead) that opens every section. */
export function SectionHead({ kicker, title, lead, id }: { kicker: string; title: string; lead?: string; id?: string }) {
  return (
    <header className="shead">
      <p className="kicker">{kicker}</p>
      <h2 className="h2" id={id}>
        {title}
      </h2>
      {lead && <p className="lead shead-lead">{lead}</p>}
    </header>
  );
}

/**
 * An app as a private-club membership card: navy for AndoGram, burgundy for Andusta, cognac for Andeo,
 * a brass frame, the emblem, «№ 01», the name and the platform. Extra content (points,
 * facts) goes below the name.
 */
export function MemberCard({ app, num, big, children }: { app: SiteAppId; num: number; big?: boolean; children?: ReactNode }) {
  const { lang } = useSite();
  const a = APPS[app][lang];
  return (
    <div className={`mcard mcard--${app}${big ? ' mcard--big' : ''}`}>
      <div className="mcard-top">
        <AppEmblem app={app} size={big ? 'lg' : 'md'} />
        <span className="mcard-num">№ {String(num).padStart(2, '0')}</span>
      </div>
      <div className="mcard-id">
        <div className="mcard-name">{a.name}</div>
        <div className="mcard-platform">{a.platform}</div>
      </div>
      {children}
    </div>
  );
}
