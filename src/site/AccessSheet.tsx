import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, ExternalLink, Star, Ticket } from 'lucide-react';
import type { AppId, Language } from '../types';
import { APPS, APP_IDS, BOT_URL, COPY } from './copy';
import { AppEmblem } from './icons';
import { Sheet } from './Sheet';
import './access.css';

/*
 * «Получить доступ» window. Since 11.11 the site only sends the visitor to the bot (owner: «APK only through the
 * bot, the site sends buyers to the bot»): choose the app, see the price, «Оплатить в боте» →
 * t.me/andouzbot?start=buy_<app>. The bot takes the Stars and sends the installation code AND the APK file (its
 * APK shelf). A coupon or a promo code is entered in the bot too (?start=redeem). On a computer a QR of the same link opens the
 * bot on the phone, where the app gets installed. No downloads, codes or API calls on the site.
 */

function AccessPanel({ lang, initialApp }: { lang: Language; initialApp: AppId }) {
  const a = COPY[lang].access;
  const [selected, setSelected] = useState<AppId>(initialApp);
  const buyUrl = `${BOT_URL}?start=buy_${selected}`;

  return (
    <div className="access-body">
      <h2 id="access-title" className="access-title">
        {a.title}
      </h2>

      <fieldset className="app-picks">
        <legend className="access-label">{a.whichApp}</legend>
        {APP_IDS.map((id) => {
          const info = APPS[id][lang];
          return (
            <label key={id} className={`app-pick${selected === id ? ' is-on' : ''}`}>
              <input
                type="radio"
                name="access-app"
                value={id}
                checked={selected === id}
                onChange={() => setSelected(id)}
                className="app-pick-input"
              />
              <AppEmblem app={id} size="sm" />
              <span className="app-pick-text">
                <span className="app-pick-name">{info.name}</span>
                <span className="app-pick-platform">{info.platform}</span>
              </span>
              <span className="app-pick-mark" aria-hidden="true">
                {selected === id && <Check size={16} strokeWidth={2.2} />}
              </span>
            </label>
          );
        })}
      </fieldset>

      <div className="price">
        <span className="price-value">{a.price}</span>
        <span className="price-note">{a.priceNote}</span>
      </div>

      <a className="btn btn--brass btn--block btn--lg" href={buyUrl} target="_blank" rel="noopener noreferrer" data-autofocus>
        <Star size={18} fill="currentColor" aria-hidden="true" />
        {a.pay}
        <ExternalLink size={16} aria-hidden="true" />
      </a>
      <p className="access-hint">{a.payHint}</p>

      <a className="promo-link" href={`${BOT_URL}?start=redeem`} target="_blank" rel="noopener noreferrer">
        <Ticket size={18} aria-hidden="true" />
        {a.promo}
      </a>

      <div className="qr-box">
        <div className="qr">
          <QRCodeSVG value={buyUrl} size={112} level="M" bgColor="#faf7f0" fgColor="#17251e" title={APPS[selected][lang].name} />
        </div>
        <p className="qr-side">{a.qrHint}</p>
      </div>
    </div>
  );
}

export default function AccessSheet({ open, app, lang, onClose }: { open: boolean; app: AppId; lang: Language; onClose: () => void }) {
  // A fresh panel on every opening (it starts from the requested app): a render-time update.
  const [session, setSession] = useState(0);
  const [wasOpen, setWasOpen] = useState(open);
  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSession((s) => s + 1);
  }
  return (
    <Sheet open={open} onClose={onClose} closeLabel={COPY[lang].access.close} labelledBy="access-title" className="access">
      <AccessPanel key={session} lang={lang} initialApp={app} />
    </Sheet>
  );
}
