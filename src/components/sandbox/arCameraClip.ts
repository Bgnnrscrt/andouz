import camMp4 from '../../assets/ar/cam.mp4';
import camWebm from '../../assets/ar/cam.webm';

/*
 * The AR sandbox's camera clip (ArCamera.tsx shows it): 5 s, 1440 × 720, two
 * takes side by side. WebM (VP9, ~330 kB) where it plays, else MP4 (H.264,
 * ~575 kB; Safari).
 */

let pending: Promise<string> | null = null;

/**
 * The clip as a blob URL, fetched once (the sandbox asks for it as soon as it
 * starts, so it is there by the recording): WebM (VP9) where it plays, else
 * MP4 (H.264). If the fetch fails, the file's own URL.
 */
export function loadCamera(): Promise<string> {
  if (!pending) {
    const url = document.createElement('video').canPlayType('video/webm; codecs="vp9"') ? camWebm : camMp4;
    pending = fetch(url)
      .then((r) => (r.ok ? r.blob() : Promise.reject(new Error(`HTTP ${r.status}`))))
      .then((b) => URL.createObjectURL(b))
      .catch(() => url);
  }
  return pending;
}
