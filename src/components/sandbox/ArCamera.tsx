import { useEffect, useRef, useState } from 'react';
import poster from '../../assets/ar/poster.jpg';
import thumbGhoul from '../../assets/ar/thumb-ghoul.jpg';
import thumbPlain from '../../assets/ar/thumb-plain.jpg';
import { loadCamera } from './arCameraClip';
import { prefersReducedMotion } from './engine';

/*
 * The «camera» of the AR masks sandbox: a 5 s loop of a young man in front of
 * the front camera (owner, 2026-11-02: «реалистичнее… фото молодого парня, а
 * не в мультяшном формате», then «гиф 5 секундный»). A generated photo (no
 * real person) animated frame by frame: the head turns a little right, back,
 * a little left, back, he blinks once, the phone shakes a little in the hand;
 * it loops seamlessly. The clip holds two takes side by side, made from the
 * same frames: left without a mask, right with the Ghoul mask («Маска Гуля»).
 * The circle shows one half; picking the mask moves to the other half — the
 * same moment of the same frame, so the mask lands on the face mid-turn and
 * keeps following it. Under reduced motion: the first frame, still (poster).
 * How the clip was made: CLAUDE.md §10 (AR-маски).
 */

/** The front camera inside the circle; `mask`: the Ghoul mask is on. */
export function ArCamera({ mask }: { mask: boolean }) {
  const [still] = useState(prefersReducedMotion);
  const [src, setSrc] = useState<string>();
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (still) return undefined;
    let live = true;
    void loadCamera().then((u) => {
      if (live) setSrc(u);
    });
    return () => {
      live = false;
    };
  }, [still]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !src) return;
    // iOS plays inline only a muted video; React sets the property, not the attribute — set it before play().
    v.muted = true;
    v.play().catch(() => undefined);
  }, [src]);

  return (
    <div className={`ar-cam${mask ? ' is-masked' : ''}`} data-ar-cam={mask ? 'masked' : 'plain'} aria-hidden="true">
      {still ? (
        <img className="ar-cam-media" src={poster} alt="" draggable={false} />
      ) : (
        <video
          ref={ref}
          className="ar-cam-media"
          src={src}
          poster={poster}
          muted
          playsInline
          loop
          autoPlay
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
        />
      )}
    </div>
  );
}

/** Icons in the masks row: «Маска Гуля» — the mask itself, drawn without a face (mask_icon.py); «Без маски» — the man. */
export function MaskThumb({ masked }: { masked: boolean }) {
  return <img className="ar-thumb-img" src={masked ? thumbGhoul : thumbPlain} alt="" draggable={false} />;
}
