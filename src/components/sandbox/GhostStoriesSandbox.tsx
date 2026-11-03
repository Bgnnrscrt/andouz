import React, { useMemo } from 'react';
import type { Language } from '../../types';
import { AndustaFab, ControlCenter } from './AndustaUi';
import { getCommonCopy } from './commonCopy';
import { lineAt, prefersReducedMotion, type LineState } from './engine';
import {
  GHOST_FLOW,
  LINE,
  LINE_END,
  OUTRO,
  OUTRO_END,
  STORY_MS,
  appOf,
  clockOf,
  ghostOn,
  phoneOf,
  progressOf,
  screenOf,
  secondVisit,
  storySeen,
  viewOf,
  type Step,
} from './ghostStoriesFlow';
import { getGhostStoriesCopy } from './ghostStoriesCopy';
import { HomeScreen, type LauncherApp } from './HomeUi';
import { CakeArt, SunsetArt } from './IgArt';
import { getIgCopy } from './igCopy';
import { IgNav, IgPost, IgSplash, IgStories, IgStory, IgTopBar, IgViewers, type StoryItem } from './IgUi';
import { EndPanel, OutroLayer, SandboxFrame, StartScreen } from './SandboxFrame';
import { useSandbox, useTimeline } from './useSandbox';

/*
 * «Проверь сам» for Andusta's ghost mode in stories. Your phone and Liza's.
 * Try 1 (Instagram): you watch her story; on her phone you are first among
 * the viewers. Try 2 (Andusta): ⚡ → «Невидимка в Stories…» on → «Готово» →
 * watch again; on her phone you are not on the list. Nothing is sent anywhere.
 * Script: ghostStoriesFlow.ts; texts: ghostStoriesCopy.ts + igCopy.ts; screens:
 * IgUi.tsx (Instagram) + AndustaUi.tsx (Andusta's layer); engine: useSandbox.ts.
 */

/** Instagram first on the home screen, Andusta right after it (as Telegram / AndoGram in the AR masks). */
const GRID: readonly LauncherApp[] = ['instagram', 'andusta', 'telegram', 'tiktok', 'youtube', 'gallery', 'clock', 'weather'];

interface Props {
  lang: Language;
  onBuy: () => void;
}

export function GhostStoriesSandbox({ lang, onBuy }: Props) {
  const c = getGhostStoriesCopy(lang);
  const ig = getIgCopy(lang);
  const common = getCommonCopy(lang, 'andusta');
  const sb = useSandbox<Step>({ flow: GHOST_FLOW, initial: 'idle', hints: c.hints, buttons: c.buttons, viewOf, lang });
  const { step, want, tap } = sb;
  const phone = phoneOf(step);
  const app = appOf(step);
  const screen = screenOf(step);
  const P = ig.people;

  const lineT = useTimeline(step === 'tLine', LINE_END, sb.next);
  const outroT = useTimeline(step === 'outro', OUTRO_END, sb.next);
  const lineLen = useMemo(() => Array.from(c.line).length, [c]);
  const tagLen = useMemo(() => Array.from(c.tagline).length, [c]);

  // «Начать заново» / «Пройти ещё раз»: back to the home screen of try 1.
  const restart = () => sb.go('tHome');

  // ── Over the screen: the line after try 1, the outro and the end buttons ──
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

  const andusta = phone === 'you' && app === 'a';
  const fab = andusta ? <AndustaFab label={ig.cc.fab} want={want} tap={tap} /> : null;

  // ── Screen ───────────────────────────────────────────────────────────────
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
    case 'story':
      view = (
        <div className="ig-app">
          <IgStory
            author={P.liza}
            art={<SunsetArt />}
            text={c.story}
            ago={ig.ig.storyAgo}
            playing
            ms={STORY_MS}
            own={false}
            labels={ig.ig}
            want={want}
            tap={tap}
          />
          {fab}
        </div>
      );
      break;
    case 'own':
    case 'viewers': {
      // Liza's phone: her own story with «👁 N»; then the sheet of viewers.
      const again = secondVisit(step);
      const viewers = again
        ? [
            { id: 'danil', person: P.danil },
            { id: 'katya', person: P.katya },
          ]
        : [
            { id: 'you', person: P.you },
            { id: 'danil', person: P.danil },
            { id: 'katya', person: P.katya },
          ];
      view = (
        <div className="ig-app">
          <IgStory
            author={P.liza}
            art={<SunsetArt />}
            text={c.story}
            ago={ig.ig.storyAgo}
            playing={false}
            ms={STORY_MS}
            own
            viewersCount={viewers.length}
            labels={ig.ig}
            want={want}
            tap={tap}
          />
          {screen === 'viewers' && <IgViewers viewers={viewers} youId="you" labels={ig.ig} />}
        </div>
      );
      break;
    }
    default: {
      // The feed: stories on top (Liza's ring bright until you watched it), Katya's post
      // (liked: red in Instagram, lime in Andusta), and in Andusta ⚡ and its menu.
      const stories: StoryItem[] = [
        { id: 'you', person: P.you, seen: true, self: true },
        { id: 'liza', person: P.liza, seen: storySeen(step) },
        { id: 'danil', person: P.danil, seen: true },
        { id: 'katya', person: P.katya, seen: true },
        { id: 'timur', person: P.timur, seen: true },
      ];
      view = (
        <div className="ig-app">
          <IgTopBar />
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
          {(step === 'aMenu' || step === 'aMenuOn') && (
            <ControlCenter copy={ig.cc} focus="privacy" ghostStory={ghostOn(step)} want={want} tap={tap} />
          )}
        </div>
      );
    }
  }

  const onHome = step === 'idle' || step === 'tHome';
  const caption = onHome ? c.captions.home : phone === 'liza' ? c.captions.liza : c.captions[app];
  const captionKey = onHome ? 'home' : phone === 'liza' ? `liza-${secondVisit(step) ? 2 : 1}` : app;
  return (
    <SandboxFrame
      sb={sb}
      caption={caption}
      phoneKey={phone}
      captionKey={captionKey}
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

export default GhostStoriesSandbox;
