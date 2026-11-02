import React from 'react';

/*
 * Emoji as Apple's pictures, everywhere on the site (owner, 2026-11-02:
 * «везде должна быть смайлики ios»): the system ones differ per OS (Windows'
 * Segoe, Android's Noto). The pictures are src/assets/emoji/<code>.png —
 * 64px PNGs from emoji-datasource-apple 15.1.2, named by their codepoints
 * without FE0F (❤️ → 2764.png, 👨‍👩‍👧 → 1f468-200d-1f469-200d-1f467.png).
 * An emoji without a picture stays text: to add one, drop its PNG there.
 */

// ?no-inline: the smaller PNGs would otherwise land in the JS as base64.
const FILES = import.meta.glob<string>('../assets/emoji/*.png', {
  eager: true,
  import: 'default',
  query: '?no-inline',
});

const URLS = new Map<string, string>(
  Object.entries(FILES).map(([file, url]) => [file.slice(file.lastIndexOf('/') + 1, -'.png'.length), url]),
);

/** One emoji: a pictograph with VS16 / a skin tone, ZWJ sequences of them, or a flag. */
const SEQUENCE =
  /\p{Regional_Indicator}{2}|\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})*(?:‍\p{Extended_Pictographic}(?:️|\p{Emoji_Modifier})*)*/gu;

const codeOf = (emoji: string): string =>
  Array.from(emoji, (c) => (c.codePointAt(0) ?? 0).toString(16))
    .filter((hex) => hex !== 'fe0f')
    .join('-');

/**
 * The text with its emoji as pictures. alt is the emoji itself, so copying,
 * search and screen readers still get it.
 */
export function emojify(text: string): React.ReactNode {
  let parts: React.ReactNode[] | null = null;
  let last = 0;
  for (const m of text.matchAll(SEQUENCE)) {
    const url = URLS.get(codeOf(m[0]));
    if (!url) continue;
    parts ??= [];
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<img key={m.index} className="emoji" src={url} alt={m[0]} draggable={false} />);
    last = m.index + m[0].length;
  }
  if (!parts) return text;
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

/**
 * emojify() through a small React tree: strings, arrays, fragments and
 * elements with children (<span>, <mark>…). Elements without children
 * (<Avatar … />, icons) are left as they are.
 */
export function emojifyNode(node: React.ReactNode): React.ReactNode {
  if (typeof node === 'string') return emojify(node);
  if (Array.isArray(node)) return React.Children.map(node, emojifyNode);
  if (React.isValidElement<{ children?: React.ReactNode }>(node) && node.props.children !== undefined) {
    return React.cloneElement(node, undefined, React.Children.map(node.props.children, emojifyNode));
  }
  return node;
}
