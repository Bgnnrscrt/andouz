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

  return (
    <section id="demo" style={{
      padding: '80px 0',
      background: 'linear-gradient(180deg, rgba(8, 9, 14, 0) 0%, rgba(13, 16, 23, 0.8) 50%, rgba(8, 9, 14, 0) 100%)',
      position: 'relative'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 48px' }}>
          <span className="badge-pill badge-ando" style={{ marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>{t.badge[lang]}</span>
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '16px', fontWeight: 800 }}>
            {t.title[lang]}
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Feature Scenario Selector Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '10px',
          flexWrap: 'wrap',
          marginBottom: '44px'
        }}>
          {(['archive', 'honeypot', 'mediasort', 'ghost', 'viewonce'] as const).map((tabKey) => (
            <button
              key={tabKey}
              onClick={() => setActiveTab(tabKey)}
              className="glass-panel"
              style={{
                padding: '10px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: activeTab === tabKey ? '#fff' : 'var(--text-muted)',
                background: activeTab === tabKey ? 'rgba(0, 245, 155, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                borderColor: activeTab === tabKey ? 'rgba(0, 245, 155, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                boxShadow: activeTab === tabKey ? '0 0 20px rgba(0, 245, 155, 0.2)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {tabKey === 'archive' && <Archive size={16} color="#00b4d8" />}
              {tabKey === 'honeypot' && <Lock size={16} color="#00f59b" />}
              {tabKey === 'mediasort' && <FolderDown size={16} color="#00b4d8" />}
              {tabKey === 'ghost' && <Ghost size={16} color="#ff007f" />}
              {tabKey === 'viewonce' && <Eye size={16} color="#ff007f" />}
              <span>{t.tabs[tabKey][lang]}</span>
            </button>
          ))}
        </div>

        {/* Phone Frame & Interactive Simulator Screen */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '48px',
          flexWrap: 'wrap'
        }}>
          {/* Smartphone Frame */}
          <div className="phone-frame">
            <div className="phone-screen">
              {/* Dynamic Screen Content based on Active Tab */}
              {activeTab === 'archive' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#00b4d8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800 }}>
                        A
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.8rem' }}>Личный Архив (Мост)</div>
                        <div style={{ fontSize: '0.65rem', color: '#00f59b' }}>● Онлайн 24/7 (KeepAlive)</div>
                      </div>
                    </div>
                    <span className="badge-pill badge-gram" style={{ fontSize: '0.65rem', padding: '2px 8px' }}>Topic #104</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto' }}>
                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', fontSize: '0.75rem', alignSelf: 'flex-start', maxWidth: '85%' }}>
                      <div style={{ fontSize: '0.65rem', color: '#00b4d8', fontWeight: 700 }}>Собеседник (Аккаунт C):</div>
                      Привет! Документы отправлены на почту.
                    </div>

                    <div style={{ background: '#005b82', padding: '8px 10px', borderRadius: '10px', fontSize: '0.75rem', alignSelf: 'flex-end', maxWidth: '85%' }}>
                      <div style={{ fontSize: '0.65rem', color: '#00f59b', fontWeight: 700 }}>Ответ через Мост (Телефон 2):</div>
                      Принято, сейчас проверю.
                    </div>

                    <div style={{ background: 'rgba(0, 245, 155, 0.08)', border: '1px dashed rgba(0, 245, 155, 0.3)', padding: '6px 8px', borderRadius: '8px', fontSize: '0.68rem', color: '#00f59b', textAlign: 'center', marginTop: 'auto' }}>
                      ⚡ Сообщение отправлено от имени Аккаунта A
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'honeypot' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(0, 245, 155, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00f59b', marginBottom: '16px' }}>
                    <Lock size={28} />
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.95rem', marginBottom: '6px' }}>
                    Режим Защиты Honeypot
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Введён пин-код под принуждением: <span style={{ color: '#00f59b', fontFamily: 'var(--font-mono)' }}>9941</span>
                  </div>

                  <div style={{ background: '#121e1a', border: '1px solid rgba(0, 245, 155, 0.25)', padding: '10px 14px', borderRadius: '10px', width: '100%', textAlign: 'left', fontSize: '0.72rem' }}>
                    <div style={{ color: '#00f59b', fontWeight: 700, marginBottom: '4px' }}>✓ Активирован безопасный профиль</div>
                    <div style={{ color: 'var(--text-muted)' }}>• Скрыты 14 секретных чатов</div>
                    <div style={{ color: 'var(--text-muted)' }}>• Мост и темы отключены</div>
                    <div style={{ color: 'var(--text-muted)' }}>• Оставлены только публичные каналы</div>
                  </div>
                </div>
              )}

              {activeTab === 'mediasort' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.82rem' }}>Медиа чата (По размеру)</span>
                    <span style={{ fontSize: '0.68rem', color: '#00b4d8' }}>Сверху вниз ↓</span>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Video_Archive_4K.mp4</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Видео 60 fps • 27 мин</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>96.5 МБ</span>
                    </div>

                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Voice_Podcast_HQ.ogg</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Голосовое • 48 kHz</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>34.2 МБ</span>
                    </div>

                    <div style={{ background: '#1c2230', padding: '8px 10px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.78rem' }}>Project_Backup.zip</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>Архив файлов</div>
                      </div>
                      <span className="badge-pill badge-gram" style={{ fontSize: '0.7rem' }}>18.1 МБ</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ghost' && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', marginBottom: '8px', color: '#ff007f' }}>
                    Andusta • Instagram Direct
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ background: '#251728', border: '1px solid rgba(255, 0, 127, 0.25)', padding: '10px', borderRadius: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#ff4d4d', fontWeight: 700, marginBottom: '3px' }}>
                        <span>⚠️ Собеседник удалил сообщение:</span>
                      </div>
                      <div style={{ fontSize: '0.78rem' }}>«Секретный файл отправлен другому человеку»</div>
                      <div style={{ fontSize: '0.65rem', color: 'var(--text-dim)', marginTop: '4px' }}>Сохранено Andusta Anti-Unsend</div>
                    </div>

                    <div style={{ background: 'rgba(255, 0, 127, 0.08)', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Ghost size={20} color="#ff007f" />
                      <div style={{ fontSize: '0.74rem' }}>
                        <b>Режим невидимки включен:</b> Автор истории не увидит вас в зрителях.
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
                    Одноразовое Фото
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    Просмотров: <b>24 раза</b> (Без сгорания)
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                    <div style={{ padding: '8px 12px', background: '#1f1322', borderRadius: '8px', fontSize: '0.72rem', color: '#ff007f', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                      <Shield size={14} />
                      <span>FLAG_SECURE снят: Скриншот разрешён</span>
                    </div>

                    <button style={{ padding: '8px 14px', background: 'linear-gradient(135deg, #ff007f 0%, #7928ca 100%)', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>
                      Сохранить фото в галерею
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
              Как это работает под капотом
            </span>
            <h3 style={{ fontSize: '1.85rem', marginBottom: '14px', lineHeight: 1.25 }}>
              {activeTab === 'archive' && 'Мост между двумя номерами и устройствами'}
              {activeTab === 'honeypot' && 'Защита от принуждения прямо в интерфейсе'}
              {activeTab === 'mediasort' && 'Мгновенная индексация и поиск тяжёлых файлов'}
              {activeTab === 'ghost' && 'Анонимный просмотр историй и сообщений'}
              {activeTab === 'viewonce' && 'Полное отключение самоуничтожения медиа'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px' }}>
              {activeTab === 'archive' && 'Аккаунт A в AndoGram держит постоянную фоновую службу KeepAlive. Новые сообщения пересылаются в топик, а ответ из топика отправляется обратно контакту через API без следов посредника.'}
              {activeTab === 'honeypot' && 'Honeypot перехватывает стандартную проверку SHA-256 пароля. По специальному пин-коду приложение скрывает секретную базу данных и переключается на чистый decoy-профиль.'}
              {activeTab === 'mediasort' && 'В отличие от стандартного клиента, AndoGram запрашивает метаданные пачками по 100 сообщений через MTProto и моментально сортирует файлы прямо в оперативной памяти.'}
              {activeTab === 'ghost' && 'Блокируются API-запросы к media/seen, reel_media_seen и activity_indicator на уровне хуков без модификации оригинального ключа приложения.'}
              {activeTab === 'viewonce' && 'Снимает флаг самоуничтожения перед рендером и отключает системный флаг запрета снимков экрана Android.'}
            </p>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>Работает автономно без сторонних серверов</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>Все ключи и базы данных остаются на телефоне</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.92rem' }}>
                <CheckCircle2 size={18} color="#00f59b" />
                <span>Не требует прав суперпользователя (Root)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
