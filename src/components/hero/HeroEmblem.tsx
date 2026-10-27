import React from 'react';

/**
 * The ANDO shield inside a dark disc, circled by a slowly rotating conic light ring and an
 * orbit carrying the two apps' colours (AndoGram cyan, Andusta magenta).
 * Decorative: the brand name is already in the header and the badge.
 */
export const HeroEmblem: React.FC = () => (
  <div className="hero-emblem" aria-hidden="true">
    <span className="hero-emblem-glow" />
    <span className="hero-emblem-orbit">
      <span className="hero-emblem-sat hero-emblem-sat--gram" />
      <span className="hero-emblem-sat hero-emblem-sat--usta" />
    </span>
    <span className="hero-emblem-spin">
      <span className="hero-emblem-ring hero-emblem-ring--blur" />
      <span className="hero-emblem-ring" />
    </span>
    <span className="hero-emblem-disc">
      <img src="/logo-256.webp" alt="" width={256} height={256} decoding="async" draggable={false} />
    </span>
  </div>
);
