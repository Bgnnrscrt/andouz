import { useCallback, useEffect, useRef, useState } from 'react';
import { useMotionValueEvent } from 'motion/react';
import type { MotionValue } from 'motion/react';

/** Page sections the header links to, in document order. Ids are owned by the section components. */
export const SECTION_IDS = ['apps', 'demo', 'compare', 'install', 'roadmap'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

/** A section is current once its top passes this fraction of the viewport height. */
const LINE = 0.5;
/** Scrolling must pause this long before a clicked link stops overriding the scroll spy. */
const SETTLE_MS = 160;

/**
 * Scroll spy for the header navigation.
 *
 * An IntersectionObserver band across the middle of the viewport only *triggers* the check;
 * the check itself reads the sections' positions, so gaps between sections, the footer and
 * fast jumps (Home/End, reduced-motion scrolling) all resolve to the right link.
 * Per scroll frame the hook only compares a boolean; React state changes when the section does.
 *
 * `pin(id)` highlights a clicked link straight away and holds it while the smooth scroll runs,
 * so the indicator moves once to the target instead of stepping through every section on the way.
 */
export function useActiveSection(scrollY: MotionValue<number>, scrollYProgress: MotionValue<number>) {
  const [active, setActive] = useState<SectionId | null>(null);
  const pinned = useRef<SectionId | null>(null);
  const atBottom = useRef(false);
  const settleTimer = useRef(0);

  const compute = useCallback(() => {
    if (pinned.current) return;
    const vh = window.innerHeight;
    let current: SectionId | null = null;
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (!el) continue;
      const top = el.getBoundingClientRect().top;
      // At the very bottom a short last section may never reach the line: count it once it is visible.
      if (top <= vh * LINE || (atBottom.current && top < vh)) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(compute, { rootMargin: '-45% 0px -50% 0px' });
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    // observe() reports the initial state, so the first check runs without an explicit call.
    return () => io.disconnect();
  }, [compute]);

  useEffect(() => () => window.clearTimeout(settleTimer.current), []);

  const release = useCallback(() => {
    pinned.current = null;
    compute();
  }, [compute]);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    const bottom = p > 0.995;
    if (bottom === atBottom.current) return;
    atBottom.current = bottom;
    compute();
  });

  // A scrollend that works in every browser: release the pin once scrolling has paused.
  useMotionValueEvent(scrollY, 'change', () => {
    if (!pinned.current) return;
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(release, SETTLE_MS);
  });

  const pin = useCallback(
    (id: SectionId) => {
      pinned.current = id;
      setActive(id);
      window.clearTimeout(settleTimer.current);
      // Covers the case where the page is already there and no scroll event follows.
      settleTimer.current = window.setTimeout(release, SETTLE_MS * 2);
    },
    [release],
  );

  return { active, pin };
}
