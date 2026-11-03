/*
 * Pictures of Andusta's sandboxes, drawn as SVG (no photos, no new people):
 * Liza's sunset story, Katya's first cake, Timur's new sneakers. They fill
 * their box (slice), so the same picture works in a post and full screen.
 */

/** Liza's story: a sunset over the sea («Новая жизнь ✨»). */
export function SunsetArt() {
  return (
    <svg className="ig-art" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ig-sun-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b1a4f" />
          <stop offset="0.38" stopColor="#8e3b7a" />
          <stop offset="0.62" stopColor="#f0745a" />
          <stop offset="0.74" stopColor="#ffb36b" />
        </linearGradient>
        <linearGradient id="ig-sun-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#d06a6a" />
          <stop offset="1" stopColor="#1f1736" />
        </linearGradient>
        <radialGradient id="ig-sun-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff3c4" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffb36b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="360" height="640" fill="url(#ig-sun-sky)" />
      <circle cx="180" cy="452" r="130" fill="url(#ig-sun-glow)" />
      <circle cx="180" cy="462" r="54" fill="#ffe6a3" />
      <rect y="470" width="360" height="170" fill="url(#ig-sun-sea)" />
      <g fill="#ffd89a" opacity="0.75">
        <rect x="132" y="482" width="96" height="4" rx="2" />
        <rect x="146" y="498" width="68" height="4" rx="2" />
        <rect x="158" y="514" width="44" height="3" rx="1.5" />
        <rect x="166" y="530" width="28" height="3" rx="1.5" />
      </g>
      <g fill="#1b1230" opacity="0.85">
        <path d="M0 470 Q60 452 118 470 Z" />
        <path d="M250 470 Q310 446 360 466 L360 470 Z" />
      </g>
      <g stroke="#2b1a4f" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7">
        <path d="M70 180 q8 -7 16 0 q8 -7 16 0" />
        <path d="M110 150 q6 -5 12 0 q6 -5 12 0" />
      </g>
    </svg>
  );
}

/** Katya's post: her first cake, with candles. */
export function CakeArt() {
  return (
    <svg className="ig-art" viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ig-cake-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe9d6" />
          <stop offset="1" stopColor="#f6cdb8" />
        </linearGradient>
        <linearGradient id="ig-cake-table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c98b5d" />
          <stop offset="1" stopColor="#9a5f3a" />
        </linearGradient>
      </defs>
      <rect width="360" height="360" fill="url(#ig-cake-wall)" />
      <circle cx="300" cy="70" r="34" fill="#fff" opacity="0.35" />
      <rect y="268" width="360" height="92" fill="url(#ig-cake-table)" />
      <ellipse cx="180" cy="276" rx="118" ry="16" fill="#e9eef2" />
      <ellipse cx="180" cy="272" rx="110" ry="12" fill="#fff" />
      {/* bottom tier */}
      <rect x="92" y="196" width="176" height="76" rx="10" fill="#f6b3c8" />
      <path d="M92 206 q11 16 22 0 q11 16 22 0 q11 16 22 0 q11 16 22 0 q11 16 22 0 q11 16 22 0 q11 16 22 0 q11 16 22 0 V196 H92 Z" fill="#fff4f7" />
      <g fill="#e5527f">
        <circle cx="122" cy="240" r="5" />
        <circle cx="158" cy="248" r="5" />
        <circle cx="198" cy="240" r="5" />
        <circle cx="238" cy="248" r="5" />
      </g>
      {/* top tier */}
      <rect x="124" y="142" width="112" height="58" rx="9" fill="#fbd0dc" />
      <path d="M124 150 q9 13 18 0 q9 13 18 0 q9 13 18 0 q9 13 18 0 q9 13 18 0 q9 13 18 0 q4 6 4 0 V142 H124 Z" fill="#fff4f7" />
      <circle cx="180" cy="170" r="9" fill="#e5527f" />
      {/* candles */}
      <g>
        <rect x="150" y="104" width="8" height="40" rx="3" fill="#7fc6f2" />
        <rect x="176" y="96" width="8" height="48" rx="3" fill="#ffd166" />
        <rect x="202" y="104" width="8" height="40" rx="3" fill="#9be38f" />
        <path d="M154 92 q-6 -8 0 -16 q6 8 0 16 Z" fill="#ffb23e" />
        <path d="M180 84 q-6 -8 0 -16 q6 8 0 16 Z" fill="#ffb23e" />
        <path d="M206 92 q-6 -8 0 -16 q6 8 0 16 Z" fill="#ffb23e" />
      </g>
    </svg>
  );
}

/** Timur's view-once photo: his new sneakers. */
export function SneakersArt() {
  return (
    <svg className="ig-art" viewBox="0 0 360 640" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="ig-snk-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a4157" />
          <stop offset="1" stopColor="#252a3a" />
        </linearGradient>
        <linearGradient id="ig-snk-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8b6a4f" />
          <stop offset="1" stopColor="#5c4433" />
        </linearGradient>
      </defs>
      <rect width="360" height="640" fill="url(#ig-snk-wall)" />
      <rect y="390" width="360" height="250" fill="url(#ig-snk-floor)" />
      <g stroke="#4a3527" strokeWidth="2" opacity="0.5">
        <line x1="0" y1="450" x2="360" y2="450" />
        <line x1="0" y1="520" x2="360" y2="520" />
        <line x1="0" y1="590" x2="360" y2="590" />
      </g>
      {/* the box */}
      <rect x="196" y="318" width="132" height="86" rx="6" fill="#e2572f" />
      <rect x="196" y="318" width="132" height="22" rx="6" fill="#f06a42" />
      <ellipse cx="160" cy="478" rx="132" ry="18" fill="#000" opacity="0.28" />
      {/* the sneaker */}
      <path
        d="M44 456 C44 428 58 404 92 396 L150 384 C168 380 178 368 186 356 L204 336 C212 326 228 326 236 336 C250 354 262 372 286 384 C310 396 324 412 324 436 L324 452 C324 466 312 474 298 474 L66 474 C54 474 44 468 44 456 Z"
        fill="#f4f6fb"
      />
      <path d="M44 452 L324 452 L324 462 C324 470 316 476 306 476 L62 476 C52 476 44 470 44 462 Z" fill="#3d7cf5" />
      <path d="M96 420 C130 416 170 400 196 380 C214 398 240 414 270 420 C230 432 150 440 96 420 Z" fill="#3d7cf5" opacity="0.9" />
      <g stroke="#9aa4b8" strokeWidth="5" strokeLinecap="round">
        <line x1="196" y1="350" x2="214" y2="362" />
        <line x1="186" y1="362" x2="206" y2="376" />
        <line x1="176" y1="374" x2="198" y2="388" />
      </g>
      <circle cx="292" cy="414" r="9" fill="#ff5a4f" />
    </svg>
  );
}
