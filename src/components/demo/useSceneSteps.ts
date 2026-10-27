import { useEffect, useState } from 'react';

/**
 * Drives a short, one-shot micro-story. `delays` are the gaps (ms) between step
 * advances; the hook returns the current step (0 … delays.length) and advances
 * through them with timers that are cleaned up on unmount or when the scene
 * remounts (AnimatePresence keys each scene by tab, so a tab change restarts it).
 *
 * Under reduced motion it jumps straight to the final, readable state — the story
 * never plays, but the end result is identical.
 *
 * `delays` must be a stable reference (declare it at module scope).
 */
export function useSceneSteps(delays: readonly number[], reduce: boolean): number {
  // Start already at the final state under reduced motion; otherwise at step 0.
  // Each scene is remounted on tab change (AnimatePresence keys it), so this
  // initializer re-runs per scene and the story restarts cleanly.
  const [step, setStep] = useState(() => (reduce ? delays.length : 0));

  useEffect(() => {
    if (reduce) return;
    const timers: number[] = [];
    let acc = 0;
    for (let i = 0; i < delays.length; i++) {
      acc += delays[i];
      const target = i + 1;
      timers.push(window.setTimeout(() => setStep(target), acc));
    }
    return () => {
      for (const t of timers) clearTimeout(t);
    };
  }, [delays, reduce]);

  return step;
}
