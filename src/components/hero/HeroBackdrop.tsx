import React from 'react';
import { Constellation } from './Constellation';

/**
 * Layered, decorative hero background (all aria-hidden, no pointer events):
 * drifting aurora glows → perspective grid floor → particle constellation → vignette.
 * Every loop is transform/opacity only and stops under prefers-reduced-motion (Hero.css).
 */
export const HeroBackdrop: React.FC = () => (
  <div className="hero-backdrop" aria-hidden="true">
    <div className="hero-aurora hero-aurora--green" />
    <div className="hero-aurora hero-aurora--cyan" />
    <div className="hero-aurora hero-aurora--magenta" />
    <div className="hero-floor">
      <div className="hero-floor-plane" />
    </div>
    <Constellation className="hero-constellation" />
    <div className="hero-vignette" />
  </div>
);
