import React, { useLayoutEffect, useRef } from 'react';
import { ChevronLeft, FileText, FileType2, Folder, Image as ImageIcon, Menu, Music2 } from 'lucide-react';
import { emojify } from '../../lib/emoji';
import type { CcSwitch, IgCopy } from './igCopy';
import type { Tap } from './TgUi';
import './andusta.css';

/*
 * Andusta's own layer over the Instagram-like screens, as in the app: the ⚡
 * button (a 50 dp circle, purple → red → orange, white ring, bottom right
 * above the tab bar), «Центр Управления» (#0C0C14, cards #151522, pink card
 * titles #E1306C, green statuses), the fonts window and the system file
 * picker. In the demo the Control Center scrolls itself to the card the step
 * needs (in the app you scroll). Prefix as-.
 */

interface TapProps {
  want?: string;
  tap: Tap;
}

function Target({
  sbx,
  want,
  tap,
  className,
  label,
  round,
  children,
}: TapProps & {
  sbx: string;
  className?: string;
  label?: string;
  round?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      data-sbx={sbx}
      data-sbx-round={round ? '' : undefined}
      data-want={want === sbx}
      tabIndex={want === sbx ? 0 : -1}
      aria-label={label}
      onClick={() => tap(sbx)}
    >
      {children}
    </button>
  );
}

/** The ⚡ button (data-sbx="andusta-fab"), bottom right above the tab bar. */
export function AndustaFab({ label, ...tp }: { label: string } & TapProps) {
  return (
    <Target sbx="andusta-fab" className="as-fab" label={label} round {...tp}>
      {emojify('⚡')}
    </Target>
  );
}

/** An on/off switch as drawn by the app. */
function Toggle({ on }: { on: boolean }) {
  return (
    <span className={`as-toggle${on ? ' is-on' : ''}`} aria-hidden="true">
      <span className="as-toggle-knob" />
    </span>
  );
}

function SwitchRow({
  item,
  on,
  sbx,
  want,
  tap,
}: TapProps & { item: CcSwitch; on: boolean; sbx?: string }) {
  const body = (
    <>
      <span className="as-sw-text">
        <span className="as-sw-title">{emojify(item.title)}</span>
        <span className="as-sw-sub">{emojify(item.sub)}</span>
      </span>
      <Toggle on={on} />
    </>
  );
  return sbx ? (
    <Target sbx={sbx} className="as-sw" label={item.title} want={want} tap={tap}>
      {body}
    </Target>
  ) : (
    <div className="as-sw" role="presentation">
      {body}
    </div>
  );
}

function CardButton({ text, tone, sbx, want, tap }: TapProps & { text: string; tone?: string; sbx?: string }) {
  const style = tone ? ({ '--as-btn': tone } as React.CSSProperties) : undefined;
  return sbx ? (
    <Target sbx={sbx} className="as-btn" want={want} tap={tap}>
      <span style={style} className="as-btn-inner">
        {emojify(text)}
      </span>
    </Target>
  ) : (
    <span className="as-btn" role="presentation">
      <span style={style} className="as-btn-inner">
        {emojify(text)}
      </span>
    </span>
  );
}

export type CcFocus = 'privacy' | 'fonts';

/**
 * «Центр Управления»: header, six cards, «Готово» (data-sbx="menu-done").
 * Scrolls to the `focus` card when it opens. Privacy switches: `ghostStory`
 * (data-sbx="sw-ghost-story"). Fonts card: «Менеджер шрифтов» (data-sbx="btn-fonts").
 */
export function ControlCenter({
  copy,
  focus,
  ghostStory,
  want,
  tap,
}: TapProps & { copy: IgCopy['cc']; focus: CcFocus; ghostStory: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cards = copy.cards;

  // Like in the demo script: the window shows the card the step is about.
  useLayoutEffect(() => {
    const box = scrollRef.current;
    const card = box?.querySelector<HTMLElement>(`[data-card="${focus}"]`);
    if (box && card) box.scrollTop = Math.max(0, card.offsetTop - 8);
  }, [focus]);

  // Defaults as in the app: re-view of view-once photos, screenshots and ad blocking on.
  const privacyOn = [ghostStory, false, false, true, true, false, true];

  return (
    <div className="as-scrim">
      <div className="as-cc" role="dialog" aria-label={copy.title}>
        <div className="as-cc-head">
          <span className="as-cc-badge">{emojify(copy.badge)}</span>
          <span className="as-cc-title">{copy.title}</span>
          <span className="as-cc-sub">{copy.sub}</span>
        </div>
        <div className="as-cc-scroll" ref={scrollRef}>
          <section className="as-card" data-card="snaps">
            <h3 className="as-card-title">{emojify(cards.snaps.title)}</h3>
            <p className="as-status">{emojify(cards.snaps.status)}</p>
            {cards.snaps.buttons.map((b, i) => (
              <CardButton key={b} text={b} tone={['#E1306C', '#8A3AB9', '#3F51B5'][i]} tap={tap} />
            ))}
          </section>
          <section className="as-card" data-card="voice">
            <h3 className="as-card-title">{emojify(cards.voice.title)}</h3>
            <p className="as-status">{emojify(cards.voice.status)}</p>
            {cards.voice.buttons.map((b, i) => (
              <CardButton key={b} text={b} tone={['#E1306C', '#8A3AB9'][i]} tap={tap} />
            ))}
          </section>
          <section className="as-card" data-card="music">
            <h3 className="as-card-title">{emojify(cards.music.title)}</h3>
            <p className="as-status">{emojify(cards.music.status)}</p>
            {cards.music.buttons.map((b) => (
              <CardButton key={b} text={b} tone="#E1306C" tap={tap} />
            ))}
          </section>
          <section className="as-card" data-card="privacy">
            <h3 className="as-card-title">{emojify(cards.privacy.title)}</h3>
            {cards.privacy.switches.map((s, i) => (
              <SwitchRow
                key={s.title}
                item={s}
                on={privacyOn[i]}
                sbx={i === 0 ? 'sw-ghost-story' : undefined}
                want={want}
                tap={tap}
              />
            ))}
          </section>
          <section className="as-card" data-card="download">
            <h3 className="as-card-title">{emojify(cards.download.title)}</h3>
            {cards.download.buttons.map((b) => (
              <CardButton key={b} text={b} tone="#00B0FF" tap={tap} />
            ))}
            {cards.download.switches.map((s) => (
              <SwitchRow key={s.title} item={s} on tap={tap} />
            ))}
          </section>
          <section className="as-card" data-card="fonts">
            <h3 className="as-card-title">{emojify(cards.fonts.title)}</h3>
            {cards.fonts.switches.map((s) => (
              <SwitchRow key={s.title} item={s} on tap={tap} />
            ))}
            <CardButton text={cards.fonts.buttons[0]} tone="#2A2A3E" tap={tap} />
            <CardButton text={cards.fonts.buttons[1]} tone="#2A2A3E" sbx="btn-fonts" want={want} tap={tap} />
          </section>
        </div>
        <Target sbx="menu-done" className="as-done" want={want} tap={tap}>
          {copy.done}
        </Target>
      </div>
    </div>
  );
}

/**
 * Andusta's fonts window: the built-in fonts (the serif one is
 * data-sbx="font-serif"), «Выбрать .ttf / .otf» (data-sbx="pick-file") and
 * «ГОТОВО» (data-sbx="fonts-done").
 */
export function FontManager({
  copy,
  selected,
  custom,
  want,
  tap,
}: TapProps & { copy: IgCopy['fonts']; selected: number; custom: string | null }) {
  return (
    <div className="as-scrim">
      <div className="as-fonts" role="dialog" aria-label={copy.title}>
        <h3 className="as-fonts-title">{emojify(copy.title)}</h3>
        <p className="as-fonts-sub">{copy.sub}</p>
        <p className="as-fonts-label">{copy.choose}</p>
        <div className="as-fonts-list">
          {copy.options.map((o, i) => {
            const on = custom === null && selected === i;
            const body = (
              <>
                <span className={`as-radio${on ? ' is-on' : ''}`} aria-hidden="true" />
                <span className={`as-font-name as-font-name--${i}`}>{emojify(o)}</span>
              </>
            );
            return i === 2 ? (
              <Target key={o} sbx="font-serif" className="as-font" label={o} want={want} tap={tap}>
                {body}
              </Target>
            ) : (
              <div key={o} className="as-font" role="presentation">
                {body}
              </div>
            );
          })}
          {custom !== null && (
            <div className="as-font" role="presentation">
              <span className="as-radio is-on" aria-hidden="true" />
              <span className="as-font-name as-font-name--custom">{emojify(`📁 ${custom}`)}</span>
            </div>
          )}
        </div>
        <p className="as-fonts-label">{copy.upload}</p>
        <Target sbx="pick-file" className="as-btn" want={want} tap={tap}>
          <span className="as-btn-inner" style={{ '--as-btn': '#2A2A3E' } as React.CSSProperties}>
            {emojify(copy.pick)}
          </span>
        </Target>
        <Target sbx="fonts-done" className="as-done as-done--fonts" want={want} tap={tap}>
          {copy.done}
        </Target>
      </div>
    </div>
  );
}

const FILE_ICON = [FileType2, Music2, ImageIcon, FileText];

/** The system file picker, «Загрузки»: MyFont.ttf is data-sbx="file-myfont". */
export function FilePicker({ copy, want, tap }: TapProps & { copy: IgCopy['files'] }) {
  return (
    <div className="as-files">
      <div className="as-files-bar">
        <Menu size={22} aria-hidden="true" />
        <span className="as-files-title">{copy.title}</span>
      </div>
      <div className="as-files-path" aria-hidden="true">
        <ChevronLeft size={16} />
        <Folder size={16} />
        <span>{copy.title}</span>
      </div>
      <p className="as-files-label">{copy.recent}</p>
      <ul className="as-files-list">
        {copy.items.map((f, i) => {
          const Icon = FILE_ICON[i] ?? FileText;
          const body = (
            <>
              <span className={`as-file-icon as-file-icon--${i}`} aria-hidden="true">
                <Icon size={20} />
              </span>
              <span className="as-file-text">
                <b>{f.name}</b>
                <span>{f.meta}</span>
              </span>
            </>
          );
          return (
            <li key={f.name}>
              {i === 0 ? (
                <Target sbx="file-myfont" className="as-file" label={f.name} want={want} tap={tap}>
                  {body}
                </Target>
              ) : (
                <div className="as-file" role="presentation">
                  {body}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
