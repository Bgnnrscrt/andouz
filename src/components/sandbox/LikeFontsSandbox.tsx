import React, { useEffect, useMemo } from 'react';
import type { Language } from '../../types';
import { AndustaFab, ControlCenter, FilePicker, FontManager } from './AndustaUi';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, type LineState } from './engine';
import { HomeScreen, type LauncherApp } from './HomeUi';
import { CakeArt } from './IgArt';
import { fill, getIgCopy } from './igCopy';
import { IgNav, IgPost, IgSplash, IgStories, IgToast, IgTopBar, type StoryItem } from './IgUi';
import { getLikeFontsCopy } from './likeFontsCopy';
import {
  LIKE_FONTS_FLOW,
  LINE,
  LINE_END,
  OUTRO,
  OUTRO_END,
  appOf,
  bigHeartAt,
  clockOf,
  customFontAt,
  layerOf,
  likedAt,
  progressOf,
  screenOf,
  viewOf,
  type Step,
} from './likeFontsFlow';
import { EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { useSandbox, useTimeline } from './useSandbox';

/*
 * «Проверь сам» for Andusta's lime-green like and fonts. One phone, two tries:
 * like Katya's first cake with a double tap. In Instagram the heart is red and
 * nothing else changes; in Andusta it is lime green, and ⚡ → «Менеджер
 * кастомных шрифтов» changes the app's font (a built-in one or your own file):
 * the feed comes back in it. Script: likeFontsFlow.ts; texts: likeFontsCopy.ts
 * + igCopy.ts; screens: IgUi.tsx + AndustaUi.tsx.
 */

const GRID: readonly LauncherApp[] = ['instagram', 'andusta', 'telegram', 'tiktok', 'youtube', 'gallery', 'clock', 'weather'];

/**
 * The demo's fonts: Merriweather Bold (OFL) for «С засечками» and Caveat (OFL)
 * as the visitor's «MyFont.ttf». Loaded with the sandbox only.
 */
const FONTS_HREF = 'https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Merriweather:wght@700&display=swap';

interface Props {
  lang: Language;
  onBuy: () => void;
}

export function LikeFontsSandbox({ lang, onBuy }: Props) {
  const c = getLikeFontsCopy(lang);
  const ig = getIgCopy(lang);
  const common = getCommonCopy(lang, 'andusta');
  const sb = useSandbox<Step>({ flow: LIKE_FONTS_FLOW, initial: 'idle', hints: c.hints, buttons: c.buttons, viewOf, lang });
  const { step, want, tap } = sb;
  const app = appOf(step);
  const screen = screenOf(step);
  const layer = layerOf(step);
  const P = ig.people;

  useEffect(() => {
    if (document.querySelector(`link[href="${FONTS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONTS_HREF;
    document.head.appendChild(link);
  }, []);

  const lineT = useTimeline(step === 'tLine', LINE_END, sb.next);
  const outroT = useTimeline(step === 'outro', OUTRO_END, sb.next);
  const lineLen = useMemo(() => Array.from(c.line).length, [c]);
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);
  const restart = () => sb.go('tHome');

  let overlay: React.ReactNode = null;
  let live = '';
  if (step === 'tLine') {
    const line = lineAt(lineT, lineLen, prefersReducedMotion(), LINE);
    overlay = <OutroLayer line={line} text={c.line} dimIn={LINE.dimIn} dimOut={LINE.dimOut} app="andusta" />;
    if (line.chars > 0) live = c.line;
  } else if (step === 'outro' || step === 'finale') {
    const line: LineState =
      step === 'finale' ? { dimmed: true, chars: tagLen, caret: false } : lineAt(outroT, tagLen, prefersReducedMotion(), OUTRO);
    overlay = (
      <>
        <OutroLayer
          line={line}
          text={c.tagline}
          dimIn={OUTRO.dimIn}
          dimOut={OUTRO.dimOut}
          raised={step === 'finale'}
          app="andusta"
        />
        {step === 'finale' && <EndPanel labels={common.end} onBuy={onBuy} onAgain={restart} over app="andusta" />}
      </>
    );
    if (line.chars > 0) live = c.tagline;
  }
  const within = step === 'tLine' ? lineT / LINE_END : step === 'outro' ? outroT / OUTRO_END : 0;

  const andusta = app === 'a';
  // The toasts of the fonts window, also read out by the live region (when no hint is showing).
  let toast: string | null = null;
  if (step === 'aFontPicked') toast = fill(ig.fonts.picked, { font: ig.fonts.short[2] });
  if (step === 'aFontLoaded') toast = ig.fonts.loaded;
  if (toast && !live) live = toast;
  let view: React.ReactNode;
  switch (screen) {
    case 'start':
      view = <StartScreen title={c.start.title} sub={c.start.sub} cta={common.cta} onStart={() => sb.start('tHome')} />;
      break;
    case 'home':
      view = <HomeScreen time={clockOf(step)} date={ig.home.date} labels={ig.home.apps} grid={GRID} want={want} tap={tap} />;
      break;
    case 'splash':
      view = <IgSplash />;
      break;
    default: {
      const liked = likedAt(step);
      const stories: StoryItem[] = [
        { id: 'you', person: P.you, seen: true, self: true },
        { id: 'katya', person: P.katya, seen: true },
        { id: 'danil', person: P.danil, seen: true },
        { id: 'timur', person: P.timur, seen: true },
        { id: 'liza', person: P.liza, seen: true },
      ];
      view = (
        <div className={`ig-app${customFontAt(step) && layer === 'none' ? ' ig-font--custom' : ''}`}>
          <IgTopBar />
          <div className="ig-scroll">
            <IgStories items={stories} yourStory={ig.ig.yourStory} want={want} tap={tap} />
            <IgPost
              author={P.katya}
              art={<CakeArt />}
              caption={ig.cake}
              likes={liked ? 129 : 128}
              liked={liked}
              lime={andusta}
              bigHeart={bigHeartAt(step)}
              labels={ig.ig}
              want={want}
              tap={tap}
            />
          </div>
          <IgNav you={P.you} labels={ig.ig} />
          {andusta && <AndustaFab label={ig.cc.fab} want={want} tap={tap} />}
          {layer === 'menu' && <ControlCenter copy={ig.cc} focus="fonts" ghostStory={false} want={want} tap={tap} />}
          {layer === 'fonts' && (
            <FontManager
              copy={ig.fonts}
              selected={step === 'aFonts' ? 0 : 2}
              custom={customFontAt(step) ? 'MyFont.ttf' : null}
              want={want}
              tap={tap}
            />
          )}
          {layer === 'files' && <FilePicker copy={ig.files} want={want} tap={tap} />}
          {toast && <IgToast key={step} text={toast} />}
        </div>
      );
    }
  }

  const onHome = step === 'idle' || step === 'tHome';
  return (
    <SandboxFrame
      sb={sb}
      caption={onHome ? c.captions.home : c.captions[app]}
      phoneKey="phone"
      captionKey={onHome ? 'home' : app}
      viewKey={step === 'idle' ? 'start' : `${app}-${screen}`}
      screenLabel={c.screenLabel}
      status={screen === 'start' ? null : { time: clockOf(step), tone: screen === 'home' ? 'clear' : 'dark' }}
      screenClassName={screen === 'home' ? 'hp-screen--home' : 'ig-screen'}
      overlay={overlay}
      progress={progressOf(step, within)}
      restartLabel={common.restart}
      onRestart={restart}
      live={live}
    >
      {view}
    </SandboxFrame>
  );
}

export default LikeFontsSandbox;
