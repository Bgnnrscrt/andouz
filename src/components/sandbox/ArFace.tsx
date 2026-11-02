import { useId } from 'react';

/*
 * The «camera» of the AR masks sandbox: a young man in front of the front
 * camera, drawn in SVG (owner, 2026-11-02: «сгенерируй человеческое лицо,
 * молодого парня» — a drawing, so no real person's face). His head turns a
 * little right, back, a little left, back — a 5 s loop, like a GIF — and he
 * blinks. `mask`: the black Ghoul mask (the app's «Маска Гуля») sits on his
 * face. It is part of the same drawing, inside the head that moves, so it
 * follows the face exactly. Motion: armasks.css (ar-head / ar-features /
 * ar-eye); none under reduced motion.
 */

const SKIN = '#d59f7e';
const SKIN_SHADE = '#b47a5b';
const HAIR = '#1b1512';

export function ArFace({ mask }: { mask: boolean }) {
  // Gradient ids must be unique per instance (two recorders can be mounted).
  const id = useId().replace(/[^\w-]/g, '');
  const u = (name: string) => `${name}-${id}`;
  const url = (name: string) => `url(#${u(name)})`;
  return (
    <svg className="ar-face" viewBox="0 0 300 300" aria-hidden="true">
      <defs>
        <linearGradient id={u('wall')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ece4da" />
          <stop offset="1" stopColor="#d6ccc0" />
        </linearGradient>
        <linearGradient id={u('curtain')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#f7f3ec" />
          <stop offset="1" stopColor="#e6ded2" />
        </linearGradient>
        <radialGradient id={u('skin')} cx="0.5" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#e6b493" />
          <stop offset="0.62" stopColor={SKIN} />
          <stop offset="1" stopColor={SKIN_SHADE} />
        </radialGradient>
        <linearGradient id={u('neck')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9d6549" />
          <stop offset="0.45" stopColor="#c58c6b" />
          <stop offset="1" stopColor="#cf9877" />
        </linearGradient>
        <linearGradient id={u('shirt')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34383f" />
          <stop offset="1" stopColor="#1d2025" />
        </linearGradient>
        <linearGradient id={u('hair')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4a3a31" />
          <stop offset="0.2" stopColor={HAIR} />
          <stop offset="0.8" stopColor={HAIR} />
          <stop offset="1" stopColor="#4a3a31" />
        </linearGradient>
        <radialGradient id={u('stubble')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.55" stopColor="#3a2418" stopOpacity="0.2" />
          <stop offset="1" stopColor="#3a2418" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={u('iris')} cx="0.4" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#6b4630" />
          <stop offset="1" stopColor="#24150c" />
        </radialGradient>
        <linearGradient id={u('mask')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#141518" />
          <stop offset="0.45" stopColor="#2a2c31" />
          <stop offset="0.55" stopColor="#2a2c31" />
          <stop offset="1" stopColor="#141518" />
        </linearGradient>
        <radialGradient id={u('vignette')} cx="0.5" cy="0.5" r="0.55">
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </radialGradient>
      </defs>

      {/* The room behind him: a light wall, a curtained window on the left. */}
      <rect width="300" height="300" fill={url('wall')} />
      <path d="M0 0 L300 0 L300 26 C210 40 90 40 0 26 Z" fill="#f3eee8" opacity="0.7" />
      <rect x="-6" y="150" width="96" height="160" fill={url('curtain')} />
      <path
        d="M12 150 V300 M30 150 V300 M48 150 V300 M66 150 V300"
        stroke="#d9cfc2"
        strokeWidth="5"
        opacity="0.45"
      />
      <rect x="236" y="96" width="70" height="210" rx="4" fill="#cdc0b2" opacity="0.6" />

      {/* Shoulders and neck: they move a little less than the head. */}
      <g className="ar-body">
        <path d="M24 300 C34 266 78 250 118 245 L182 245 C222 250 266 266 276 300 Z" fill={url('shirt')} />
        <path d="M126 198 C126 222 124 238 120 248 C134 262 166 262 180 248 C176 238 174 222 174 198 Z" fill={url('neck')} />
        <path d="M116 247 C128 264 172 264 184 247" fill="none" stroke="#2a2d33" strokeWidth="6" strokeLinecap="round" />
      </g>

      <g className="ar-head">
        {/* Ears */}
        <path d="M93 140 C82 134 78 146 80 156 C82 167 88 174 96 172 Z" fill={SKIN_SHADE} />
        <path d="M91 146 C86 145 85 152 87 158 C88 163 91 165 94 164" fill="none" stroke="#97603f" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />
        <path d="M207 140 C218 134 222 146 220 156 C218 167 212 174 204 172 Z" fill={SKIN_SHADE} />
        <path d="M209 146 C214 145 215 152 213 158 C212 163 209 165 206 164" fill="none" stroke="#97603f" strokeWidth="1.6" strokeLinecap="round" opacity="0.7" />

        {/* Head: an oval that narrows to the jaw and a firm chin */}
        <path
          d="M150 62 C190 62 210 92 210 130 C210 158 206 180 196 197 C185 214 168 226 150 227 C132 226 115 214 104 197 C94 180 90 158 90 130 C90 92 110 62 150 62 Z"
          fill={url('skin')}
        />
        {/* Temples, cheekbones, jaw: soft shade at the sides, light on the forehead and nose */}
        <path d="M92 132 C92 160 98 184 112 202 C104 186 100 164 101 136 Z" fill={SKIN_SHADE} opacity="0.45" />
        <path d="M208 132 C208 160 202 184 188 202 C196 186 200 164 199 136 Z" fill={SKIN_SHADE} opacity="0.45" />
        <ellipse cx="150" cy="112" rx="34" ry="12" fill="#f0c3a2" opacity="0.35" />
        <path d="M118 223 C128 230 172 230 182 223 C172 229 160 232 150 232 C140 232 128 229 118 223 Z" fill="#8f5a40" opacity="0.4" />

        {/* Hair: short, textured, a fringe, faded at the sides */}
        <path
          d="M88 134 C82 92 104 56 150 54 C198 54 220 90 212 134 C209 122 205 113 199 107 C186 101 170 99 150 101 C130 99 114 101 101 107 C95 113 91 122 88 134 Z"
          fill={url('hair')}
        />
        <path
          d="M101 107 C106 103 110 104 113 101 C117 104 121 101 125 100 C129 103 134 99 139 99 C143 102 147 98 151 99 C155 102 160 98 164 99 C168 102 173 99 177 100 C181 103 186 101 189 103 C193 102 196 104 199 107 C186 103 170 102 150 103 C130 102 114 103 101 107 Z"
          fill="#120d0b"
        />
        <path d="M118 70 C130 64 170 64 182 70" fill="none" stroke="#3b2f28" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        <path d="M108 82 C122 76 140 75 150 76" fill="none" stroke="#3b2f28" strokeWidth="2" strokeLinecap="round" opacity="0.4" />

        <g className="ar-features">
          {/* Stubble: a soft shadow along the jaw, upper lip and chin */}
          <path
            d="M104 182 C110 204 128 222 150 224 C172 222 190 204 196 182 C188 200 174 214 162 210 C156 208 152 207 150 207 C148 207 144 208 138 210 C126 214 112 200 104 182 Z"
            fill="#3a2418"
            opacity="0.16"
          />
          <path d="M134 186 C142 183 158 183 166 186 C160 189 140 189 134 186 Z" fill="#3a2418" opacity="0.16" />
          <path d="M141 211 C146 215 154 215 159 211 C157 219 143 219 141 211 Z" fill="#2e1d14" opacity="0.2" />

          {/* Eyebrows */}
          <path d="M109 122 C118 113 132 111 142 116 L142 121 C132 117 120 118 111 126 Z" fill="#231711" />
          <path d="M191 122 C182 113 168 111 158 116 L158 121 C168 117 180 118 189 126 Z" fill="#231711" />

          {/* Eyes (they blink): a lid crease above, a soft shade below */}
          <path d="M113 131 C119 125 132 124 140 130" fill="none" stroke="#a5694c" strokeWidth="1.2" opacity="0.5" />
          <path d="M187 131 C181 125 168 124 160 130" fill="none" stroke="#a5694c" strokeWidth="1.2" opacity="0.5" />
          <g className="ar-eye">
            <path d="M113 137 C118 130 132 129 140 135 C133 141 120 142 113 137 Z" fill="#f1e8e0" />
            <circle cx="127" cy="135.3" r="5.2" fill={url('iris')} />
            <circle cx="127" cy="135.3" r="2.3" fill="#0c0705" />
            <circle cx="129" cy="133.6" r="1.2" fill="#fff" opacity="0.9" />
            <path d="M112 137 C118 129 133 128 141 134" fill="none" stroke="#3a2519" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <g className="ar-eye">
            <path d="M187 137 C182 130 168 129 160 135 C167 141 180 142 187 137 Z" fill="#f1e8e0" />
            <circle cx="173" cy="135.3" r="5.2" fill={url('iris')} />
            <circle cx="173" cy="135.3" r="2.3" fill="#0c0705" />
            <circle cx="175" cy="133.6" r="1.2" fill="#fff" opacity="0.9" />
            <path d="M188 137 C182 129 167 128 159 134" fill="none" stroke="#3a2519" strokeWidth="1.8" strokeLinecap="round" />
          </g>
          <path d="M116 143 C123 147 132 147 138 143" fill="none" stroke="#a5694c" strokeWidth="1.4" opacity="0.3" />
          <path d="M184 143 C177 147 168 147 162 143" fill="none" stroke="#a5694c" strokeWidth="1.4" opacity="0.3" />

          {/* Nose: a lit bridge between soft shades, the tip and its wings */}
          <path d="M144 138 C141 152 139 162 140 170 C142 162 144 150 147 140 Z" fill="#a5694c" opacity="0.18" />
          <path d="M156 138 C159 152 161 162 160 170 C158 162 156 150 153 140 Z" fill="#a5694c" opacity="0.18" />
          <path d="M150 136 C149 150 149 160 150 168" fill="none" stroke="#f0c3a2" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          <path d="M140 172 C141 165 146 163 150 165 C154 163 159 165 160 172 C158 178 154 179 150 178 C146 179 142 178 140 172 Z" fill="#dfa886" />
          <path d="M137 174 C138 179 142 181 145 179" fill="none" stroke="#9a5f45" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M163 174 C162 179 158 181 155 179" fill="none" stroke="#9a5f45" strokeWidth="1.6" strokeLinecap="round" />
          <ellipse cx="145.5" cy="177.5" rx="2.6" ry="1.5" fill="#6f412f" opacity="0.65" />
          <ellipse cx="154.5" cy="177.5" rx="2.6" ry="1.5" fill="#6f412f" opacity="0.65" />

          {/* Mouth */}
          <path d="M132 195 C140 190 145 191 150 193 C155 191 160 190 168 195 C159 197.5 141 197.5 132 195 Z" fill="#a9604f" />
          <path d="M134 196 C141 205 159 205 166 196 C158 199 142 199 134 196 Z" fill="#bf7968" />
          <path d="M131 195 C140 197 160 197 169 195" fill="none" stroke="#7a4134" strokeWidth="1.3" strokeLinecap="round" />
          <path d="M143 201 C147 202.5 153 202.5 157 201" fill="none" stroke="#e0a08f" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />

          {/* The Ghoul mask: black cloth over the nose, mouth and chin */}
          {mask && (
            <g className="ar-face-mask">
              <path d="M95 158 C86 150 84 140 88 132" fill="none" stroke="#4b5058" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M98 190 C88 185 85 172 88 163" fill="none" stroke="#4b5058" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M205 158 C214 150 216 140 212 132" fill="none" stroke="#4b5058" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M202 190 C212 185 215 172 212 163" fill="none" stroke="#4b5058" strokeWidth="2.8" strokeLinecap="round" />
              <path
                d="M93 157 C111 149 132 145 150 146 C168 145 189 149 207 157 C209 182 200 213 178 228 C166 236 158 239 150 239 C142 239 134 236 122 228 C100 213 91 182 93 157 Z"
                fill={url('mask')}
                stroke="#5a5f67"
                strokeWidth="2.4"
                strokeLinejoin="round"
              />
              <path d="M150 147 C151 180 151 212 150 238" fill="none" stroke="#33363c" strokeWidth="1.6" />
              <ellipse cx="150" cy="170" rx="16" ry="12" fill="#fff" opacity="0.05" />
              <path d="M104 162 C110 190 124 214 140 226" fill="none" stroke="#000" strokeWidth="3" opacity="0.18" />
              <path d="M196 162 C190 190 176 214 160 226" fill="none" stroke="#000" strokeWidth="3" opacity="0.18" />
            </g>
          )}
        </g>
      </g>

      {/* A soft vignette, as a front camera has */}
      <rect width="300" height="300" fill={url('vignette')} />
    </svg>
  );
}

/** The mask's own icon in the masks row: a grey mannequin head in the black mask. */
export function GhoulThumb() {
  return (
    <svg className="ar-thumb-svg" viewBox="0 0 56 56" aria-hidden="true">
      <rect width="56" height="56" fill="#2b2e34" />
      <path d="M8 56 C10 47 18 43 24 42 L32 42 C38 43 46 47 48 56 Z" fill="#9aa0a8" />
      <path d="M23 34 L23 43 L33 43 L33 34 Z" fill="#b9bec5" />
      <ellipse cx="28" cy="24" rx="12" ry="15" fill="#d3d7dc" />
      <path d="M17 26 C22 23.5 34 23.5 39 26 C39 33 35 39 28 40 C21 39 17 33 17 26 Z" fill="#141518" stroke="#5a5f67" strokeWidth="0.8" />
    </svg>
  );
}

/** «Без маски»: the same head, no mask. */
export function PlainThumb() {
  return (
    <svg className="ar-thumb-svg" viewBox="0 0 56 56" aria-hidden="true">
      <rect width="56" height="56" fill="#2b2e34" />
      <path d="M8 56 C10 47 18 43 24 42 L32 42 C38 43 46 47 48 56 Z" fill="#9aa0a8" />
      <path d="M23 34 L23 43 L33 43 L33 34 Z" fill="#b9bec5" />
      <ellipse cx="28" cy="24" rx="12" ry="15" fill="#d3d7dc" />
    </svg>
  );
}
