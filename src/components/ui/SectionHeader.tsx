import React from 'react';
import { Reveal } from '../fx/Reveal';
import { ScrambleText } from '../fx/ScrambleText';

interface SectionHeaderProps {
  badge: string;
  badgeIcon?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Extra controls under the subtitle (e.g. tabs). */
  children?: React.ReactNode;
  maxWidth?: number;
}

/** Shared section intro: decoding badge, blur-in title, then subtitle and controls in sequence. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ badge, badgeIcon, title, subtitle, children, maxWidth = 720 }) => (
  <div className="section-header" style={{ maxWidth }}>
    <Reveal>
      <span className="badge-pill badge-ando section-badge">
        {badgeIcon}
        <ScrambleText text={badge} />
      </span>
    </Reveal>
    <Reveal delay={0.08} blur>
      <h2 className="section-title">{title}</h2>
    </Reveal>
    {subtitle && (
      <Reveal delay={0.16}>
        <p className="section-subtitle">{subtitle}</p>
      </Reveal>
    )}
    {children && (
      <Reveal delay={0.24} style={{ marginTop: 24 }}>
        {children}
      </Reveal>
    )}
  </div>
);
