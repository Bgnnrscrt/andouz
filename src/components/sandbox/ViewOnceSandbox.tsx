import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { AndustaFab } from './AndustaUi';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, type LineState } from './engine';
import { HomeScreen, type LauncherApp } from './HomeUi';
import { CakeArt, SneakersArt } from './IgArt';
import { fill, getIgCopy } from './igCopy';
import { IgDirect, IgNav, IgNotification, IgPhoto, IgPost, IgSplash, IgStories, IgTopBar, type StoryItem } from './IgUi';
import { DockedHint, EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { useSandbox, useTimeline } from './useSandbox';
import { getViewOnceCopy } from './viewOnceCopy';
import {
  LINE,
  LINE_END,
  OUTRO,
  OUTRO_END,
  PHOTO2_MS,
  PHOTO_MS,
  VIEW_ONCE_FLOW,
  appOf,
  bubbleOf,
  clockOf,
  progressOf,
  screenOf,
  viewOf,
  type Step,
} from './viewOnceFlow';

/*
 * «Проверь сам» for Andusta's view-once photos. One phone, two tries: Timur
 * sends a view-once photo of his new sneakers. In Instagram it opens once and
 * the bubble turns grey; in Andusta it opens again. Nothing is sent anywhere.
 * Script: viewOnceFlow.ts; texts: viewOnceCopy.ts + igCopy.ts; screens: IgUi.tsx.
 */

const GRID: readonly LauncherApp[] = ['instagram', 'andusta', 'telegram', 'tiktok', 'youtube', 'gallery', 'clock', 'weather'];

interface Props {
  lang: Language;
  onBuy: () => void;
}

export function ViewOnceSandbox({ lang, onBuy }: Props) {
  const c = getViewOnceCopy(lang);
  const ig = getIgCopy(lang);
  const common = getCommonCopy(lang, 'andusta');
  const sb = useSandbox<Step>({ flow: VIEW_ONCE_FLOW, initial: 'idle', hints: c.hints, buttons: c.buttons, viewOf, lang });
  const { step, want, tap } = sb;
  const app = appOf(step);
  const screen = screenOf(step);
  const P = ig.people;

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
  const fab = andusta ? <AndustaFab label={ig.cc.fab} want={want} tap={tap} /> : null;

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
    case 'feed': {
      const stories: StoryItem[] = [
        { id: 'you', person: P.you, seen: true, self: true },
        { id: 'timur', person: P.timur, seen: true },
        { id: 'katya', person: P.katya, seen: true },
        { id: 'danil', person: P.danil, seen: true },
        { id: 'liza', person: P.liza, seen: true },
      ];
      view = (
        <div className="ig-app">
          <IgTopBar unread={1} />
          <div className="ig-scroll">
            <IgStories items={stories} yourStory={ig.ig.yourStory} want={want} tap={tap} />
            <IgPost
              author={P.katya}
              art={<CakeArt />}
              caption={ig.cake}
              likes={129}
              liked
              lime={andusta}
              bigHeart={false}
              labels={ig.ig}
              want={want}
              tap={tap}
            />
          </div>
          <IgNav you={P.you} labels={ig.ig} />
          {fab}
          <div className="ig-notif-delay">
            <IgNotification
              from={P.timur}
              text={fill(ig.ig.sentPhoto, { nick: P.timur.nick })}
              now={ig.ig.now}
              want={want}
              tap={tap}
            />
          </div>
        </div>
      );
      break;
    }
    case 'photo':
      view = (
        <div className="ig-app">
          <IgPhoto from={P.timur} art={<SneakersArt />} ms={step === 'aPhoto2' ? PHOTO2_MS : PHOTO_MS} labels={ig.ig} />
          {fab}
        </div>
      );
      break;
    default:
      view = (
        <div className="ig-app">
          <IgDirect
            peer={P.timur}
            messages={[c.message]}
            photo={bubbleOf(step)}
            shake={step === 'tNope'}
            dock={<DockedHint sb={sb} />}
            labels={ig.ig}
            want={want}
            tap={tap}
          />
          {fab}
        </div>
      );
  }

  const onHome = step === 'idle' || step === 'tHome';
  return (
    <SandboxFrame
      sb={sb}
      caption={onHome ? c.captions.home : c.captions[app]}
      phoneKey="phone"
      captionKey={onHome ? 'home' : app}
      viewKey={viewOf(step)}
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

export default ViewOnceSandbox;
