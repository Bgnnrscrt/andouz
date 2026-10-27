import React, { useState } from 'react';
import { Language } from '../types';
import { translations } from '../translations';
import { Archive, Lock, FolderDown, Ghost, Eye, CheckCircle2, Shield, Download, Sparkles, Send } from 'lucide-react';

interface PhoneMockupProps {
  lang: Language;
}

export const PhoneMockup: React.FC<PhoneMockupProps> = ({ lang }) => {
  const t = translations.mockup;
  const [activeTab, setActiveTab] = useState<'archive' | 'honeypot' | 'mediasort' | 'ghost' | 'viewonce'>('archive');
  const [pinEntered, setPinEntered] = useState<string>('????');
  const [isDuress, setIsDuress] = useState<boolean>(false);

  return (
    <section style={{ padding: '80px 0', background: 'rgba(10, 12, 18, 0.5)' }}>
      <div className="container">
        <div className="section-header">
          <span className="badge-pill badge-ando" style={{ marginBottom: '12px' }}>
            {t.title[lang]}
          </span>
          <h2>????? ????????? ????????????</h2>
          <p>{t.subtitle[lang]}</p>
        </div>

        {/* Tab Switcher */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          <button
            onClick={() => setActiveTab('archive')}
            className={`btn ${activeTab === 'archive' ? 'btn-primary-ando' : 'btn-outline'}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Archive size={16} />
            <span>{t.tabArchive[lang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('honeypot')}
            className={`btn ${activeTab === 'honeypot' ? 'btn-primary-ando' : 'btn-outline'}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Lock size={16} />
            <span>{t.tabHoneypot[lang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('mediasort')}
            className={`btn ${activeTab === 'mediasort' ? 'btn-primary-ando' : 'btn-outline'}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <FolderDown size={16} />
            <span>{t.tabMediaSort[lang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('ghost')}
            className={`btn ${activeTab === 'ghost' ? 'btn-primary-ando' : 'btn-outline'}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Ghost size={16} />
            <span>{t.tabGhost[lang]}</span>
          </button>

          <button
            onClick={() => setActiveTab('viewonce')}
            className={`btn ${activeTab === 'viewonce' ? 'btn-primary-ando' : 'btn-outline'}`}
            style={{ padding: '10px 18px', fontSize: '0.88rem' }}
          >
            <Eye size={16} />
            <span>{t.tabViewOnce[lang]}</span>
          </button>
        </div>

        {/* Phone Mockup + Side Explanation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
          flexWrap: 'wrap'
        }}>
          {/* Smartphone Frame */}
          <div className="phone-frame animate-float">
            <div className="phone-punchhole" />
            
            {/* Status Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '6px 14px 0',
              fontSize: '0.72rem',
              color: 'rgba(255, 255, 255, 0.7)',
              fontFamily: 'var(--font-mono)'
            }}>
              <span>12:00</span>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* Dynamic Screen Content */}
            <div className="phone-screen">
              {activeTab === 'archive' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Chat Header */}
                  <div style={{
                    padding: '8px 10px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '12px',
                    marginBottom: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      ?
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>?????? ????? ? ?????????? C</div>
                      <div style={{ fontSize: '0.68rem', color: '#00f59b' }}>? ???? ??????? 24/7</div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#1c2230', padding: '10px 12px', borderRadius: '14px 14px 14px 4px', maxWidth: '85%' }}>
                      <div style={{ fontSize: '0.7rem', color: '#00b4d8', fontWeight: 700, marginBottom: '2px' }}>?? ?????????? C:</div>
                      <div>??????! ???????? ???????? ????????? ? PDF. ?????????? ?????????.</div>
                    </div>

                    <div style={{ background: '#0f393b', padding: '10px 12px', borderRadius: '14px 14px 4px 14px', alignSelf: 'flex-end', maxWidth: '85%' }}>
                      <div style={{ fontSize: '0.7rem', color: '#00f59b', fontWeight: 700, marginBottom: '2px' }}>?? ??????? 2 (??????? ?):</div>
                      <div>??? ???????, AndoGram ???????? ???? ? ????????? ??? ???????????!</div>
                    </div>

                    <div style={{ background: 'rgba(0, 245, 155, 0.08)', border: '1px dashed rgba(0, 245, 155, 0.3)', borderRadius: '10px', padding: '8px', fontSize: '0.72rem', color: '#00f59b', textAlign: 'center' }}>
                      ? ????? ???? ? ????? ? ?? ???? ???????? ?
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'honeypot' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                  <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: isDuress ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0, 245, 155, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: isDuress ? '#ef4444' : '#00f59b', marginBottom: '16px' }}>
                    <Lock size={26} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', marginBottom: '6px' }}>
                    {isDuress ? '????????? ??????? ???????????' : '???? ? AndoGram'}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    {isDuress ? '????????? ???????? ?????? ??? ??????' : '??????? PIN-??? ??? ?????????????'}
                  </div>

                  <div style={{ fontSize: '1.6rem', letterSpacing: '0.4em', marginBottom: '24px', color: isDuress ? '#ef4444' : '#00f59b' }}>
                    {pinEntered}
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button
                      onClick={() => { setIsDuress(false); setPinEntered('1234'); }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #00f59b', background: 'transparent', color: '#00f59b', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      ??? ?????????
                    </button>
                    <button
                      onClick={() => { setIsDuress(true); setPinEntered('9999'); }}
                      style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #ef4444', background: 'transparent', color: '#ef4444', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      ??? ???????????
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'mediasort' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span>????? ??????????</span>
                    <span style={{ color: '#00f59b', fontSize: '0.74rem' }}>?? ??????? ?</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Video_Archive_4K.mp4</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>?????? 60 fps ? 27 ???</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>96.5 ??</span>
                    </div>

                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Voice_Podcast_HQ.ogg</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>????????? ? 48 kHz</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>34.2 ??</span>
                    </div>

                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Project_Backup.zip</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>????? ??????</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>18.1 ??</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ghost' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '8px', color: '#ff007f' }}>
                    Andusta ? Instagram Direct
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#251728', border: '1px solid rgba(255, 0, 127, 0.25)', padding: '10px', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#ff4d4d', fontWeight: 700, marginBottom: '3px' }}>
                        <span>??? ?????????? ?????? ?????????:</span>
                      </div>
                      <div style={{ fontSize: '0.78rem' }}>????????? ???? ????????? ??????? ????????</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>????????? Andusta Anti-Unsend</div>
                    </div>

                    <div style={{ background: 'rgba(255, 0, 127, 0.08)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Ghost size={20} color="#ff007f" />
                      <div style={{ fontSize: '0.74rem' }}>
                        <b>??????? ??????????? ????????:</b> ????? ??????? ?? ?????? ??? ??????? ? ??????.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'viewonce' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255, 0, 127, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff007f', marginBottom: '16px' }}>
                    <Eye size={30} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '6px' }}>
                    ??????????? ????
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    ???????????: <b>24 ????</b> (????? ????????)
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <div style={{ padding: '8px 12px', background: '#1f1322', borderRadius: '8px', fontSize: '0.72rem', color: '#ff007f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Shield size={14} />
                      <span>FLAG_SECURE ????: ????????? ?????????</span>
                    </div>

                    <button style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                      ????????? ???? ? ???????
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="phone-bottom-bar" />
          </div>

          {/* Side Explanation Box */}
          <div style={{ maxWidth: '480px' }}>
            <span className="badge-pill badge-ando" style={{ marginBottom: '14px' }}>
              ??? ??? ???????? ??? ???????
            </span>
            <h3 style={{ fontSize: '1.85rem', marginBottom: '14px', lineHeight: 1.25 }}>
              {activeTab === 'archive' && '???? ????? ?????? ??????? ? ?????????'}
              {activeTab === 'honeypot' && '?????? ?? ??????????? ??????? ? ???????????'}
              {activeTab === 'mediasort' && '?????????? ?????????? ? ????? ???????? ??????'}
              {activeTab === 'ghost' && '????????? ???????? ??????? ? ???????'}
              {activeTab === 'viewonce' && '?????? ??????????? ???????????? ????????'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeTab === 'archive' && '??????? 1 ? AndoGram ?????? ?????????? ??????? ?????? KeepAlive. ????? ????????? ??????????? ? ?????, ? ????? ?? ??????? ?????????? ?????? ???????? ????? ?? ??? ??? ?????? ?????????.'}
              {activeTab === 'honeypot' && 'Honeypot ?????????? ??????????? ??????? SHA-256 ???????????. ?? ???????????? ???????, ?? ??????? ?? ??????, ??? ? ?????????? ?????????? ?????? ???????.'}
              {activeTab === 'mediasort' && '? ??????? ?? ???????????? ???????, AndoGram ????????? ?????????? ???????? ?? 100 ???????? ????? MTProto ? ??????????? ????????? ????? ?????? ??????.'}
              {activeTab === 'ghost' && '?????????? API-?????????? media/seen, reel_media_seen ? activity_indicator ?? ?????? Xposed-????? ??? ????????? ? ????????? ?????.'}
              {activeTab === 'viewonce' && '???????? ??????? ??????????????? ????? ? ???????? ?????????? ????? ?????????? ?????????? Android.'}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>???????? ????????? ??? ????????? ????????</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>??? ????? ? ???? ?????? ???????? ?? ????????</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>?? ??????? ???? ????????????????? (Root)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
