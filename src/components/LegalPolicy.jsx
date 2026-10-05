import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function LegalPolicy({ initialTab = 'cookies' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on path or initial prop
  const currentTab = location.pathname.includes('privacy') ? 'privacy' : 'cookies';
  const [activeTab, setActiveTab] = useState(currentTab);

  useEffect(() => {
    if (location.pathname.includes('privacy')) {
      setActiveTab('privacy');
      document.title = 'Политика за поверителност | kkreativ';
    } else {
      setActiveTab('cookies');
      document.title = 'Политика за бисквитките | kkreativ';
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'privacy') {
      navigate('/privacy');
    } else {
      navigate('/cookies');
    }
  };

  const openCookiePreferences = () => {
    window.dispatchEvent(new CustomEvent('openCookieSettings'));
  };

  return (
    <div className="page-wrapper legal-page" style={{ minHeight: '100vh', paddingTop: '7.5rem', paddingBottom: '7rem' }}>
      <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Navigation Breadcrumb / Back button */}
        <div style={{ marginBottom: '2.5rem' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--gold-main)', 
              fontSize: '0.92rem', 
              textDecoration: 'none',
              fontWeight: 500,
              transition: 'opacity 0.2s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.opacity = '0.75'}
            onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
          >
            ← Обратно към началната страница
          </Link>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '2.5rem', textAlign: 'left' }}>
          <span 
            className="font-mono" 
            style={{ 
              fontSize: '0.82rem', 
              color: 'var(--gold-main)', 
              letterSpacing: '0.12em', 
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '0.75rem'
            }}
          >
            kkreativ · правна информация
          </span>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 4vw, 3rem)', 
            fontWeight: 800, 
            letterSpacing: '-0.02em', 
            color: '#fff', 
            margin: '0 0 0.75rem 0',
            lineHeight: 1.15
          }}>
            {activeTab === 'cookies' ? 'Политика за бисквитките' : 'Политика за поверителност'}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap', color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            <span>www.kkreativ.eu</span>
            <span>•</span>
            <span>Последна актуализация: 5 октомври 2026 г.</span>
          </div>
        </div>

        {/* Tab Switcher */}
        <div 
          style={{ 
            display: 'inline-flex', 
            background: 'rgba(255, 255, 255, 0.03)', 
            border: '1px solid rgba(255, 255, 255, 0.08)', 
            borderRadius: '12px', 
            padding: '0.35rem', 
            marginBottom: '3rem',
            gap: '0.35rem',
            maxWidth: '100%',
            overflowX: 'auto'
          }}
        >
          <button
            type="button"
            onClick={() => switchTab('cookies')}
            style={{
              background: activeTab === 'cookies' ? 'var(--gold-main)' : 'transparent',
              color: activeTab === 'cookies' ? '#08080a' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'cookies' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            🍪 Политика за бисквитките
          </button>

          <button
            type="button"
            onClick={() => switchTab('privacy')}
            style={{
              background: activeTab === 'privacy' ? 'var(--gold-main)' : 'transparent',
              color: activeTab === 'privacy' ? '#08080a' : 'var(--text-secondary)',
              border: 'none',
              borderRadius: '8px',
              padding: '0.65rem 1.4rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === 'privacy' ? 600 : 500,
              cursor: 'pointer',
              transition: 'all 0.25s ease',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap'
            }}
          >
            🔒 Политика за поверителност
          </button>
        </div>

        {/* CONTENT CONTAINER */}
        <div 
          style={{
            background: 'rgba(14, 14, 18, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '18px',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            lineHeight: 1.7,
            color: 'rgba(255, 255, 255, 0.86)'
          }}
        >

          {/* ============================================================ */}
          {/* TAB 1: ПОЛИТИКА ЗА БИСКВИТКИТЕ                                */}
          {/* ============================================================ */}
          {activeTab === 'cookies' && (
            <div className="legal-article" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
              
              {/* Introduction */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)', paddingBottom: '1.75rem' }}>
                <p style={{ margin: 0, fontSize: '1.02rem', color: '#fff' }}>
                  Настоящата Политика за бисквитките описва използването на бисквитки и сходни технологии на <strong>www.kkreativ.eu</strong>, управляван от <strong>ККРЕАТИВ ООД</strong>, ЕИК <strong>208820251</strong>.
                </p>
              </div>

              {/* Section 1 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>1.</span> Какво представляват бисквитките
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Бисквитките представляват малки файлове или части от информация, които могат да бъдат съхранявани на устройството Ви при посещение на уебсайт. Те могат да се използват за нормалното функциониране на сайта, сигурност, запомняне на настройки, запомняне на избора Ви относно бисквитките и измерване и анализ на използването на сайта.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>2.</span> Какви категории използваме
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '3px solid var(--gold-main)' }}>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '1rem' }}>2.1. Строго необходими технологии</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Тези технологии са необходими за основното функциониране, сигурността или запомнянето на Вашия избор относно поверителността. Те могат да бъдат активни без предварително съгласие, когато са необходими за предоставянето на изрично поискана услуга или когато приложимото законодателство допуска това.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '3px solid rgba(212, 175, 55, 0.5)' }}>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '1rem' }}>2.2. Аналитични технологии</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      С Ваше предварително съгласие използваме Google Analytics 4. Тези технологии ни позволяват да получаваме статистическа информация, като брой посещения, разгледани страници, източници на трафик, взаимодействия със сайта, продължителност на сесиите, характеристики на устройствата и браузърите и приблизителна географска информация.
                    </p>
                    <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Те не са необходими за основното функциониране на сайта. Ако ги откажете, сайтът продължава да функционира.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.25rem', borderRadius: '10px', borderLeft: '3px solid rgba(255, 255, 255, 0.2)' }}>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '1rem' }}>2.3. Маркетингови технологии</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Към момента не използваме Meta Pixel, TikTok Pixel или други маркетингови пиксели в описаната настояща конфигурация. Ако в бъдеще добавим такива технологии, тази политика и механизмът за съгласие ще бъдат актуализирани.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>3.</span> Google Analytics 4
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Google Analytics 4 се използва за статистически анализ и подобряване на сайта. Аналитичното съхранение се активира само след предоставяне на съответното съгласие. GA4 е конфигуриран с 14-месечен период за съхранение на съответните user-level и event-level данни.
                </p>
              </div>

              {/* Section 4 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>4.</span> Управление на избора Ви
                </h3>
                <p style={{ margin: '0 0 0.75rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  При първо посещение на сайта получавате възможност да приемете незадължителните аналитични технологии, да ги откажете или да управлявате настройките си. Аналитичните технологии не се активират предварително без необходимото съгласие.
                </p>
                <p style={{ margin: '0 0 1.25rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можете да промените или оттеглите избора си по всяко време чрез „Настройки за бисквитки“ на сайта. Отказът от незадължителните технологии не блокира достъпа до основното съдържание на сайта.
                </p>

                {/* Direct Action Trigger Button */}
                <button
                  type="button"
                  onClick={openCookiePreferences}
                  style={{
                    background: 'rgba(212, 175, 55, 0.12)',
                    border: '1px solid var(--gold-main)',
                    borderRadius: '8px',
                    padding: '0.75rem 1.4rem',
                    color: 'var(--gold-main)',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--gold-main)';
                    e.currentTarget.style.color = '#08080a';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 175, 55, 0.12)';
                    e.currentTarget.style.color = 'var(--gold-main)';
                  }}
                >
                  ⚙️ Управление на настройките за бисквитки
                </button>
              </div>

              {/* Section 5 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>5.</span> Google Consent Mode
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  При използване на Google Analytics сайтът може да използва Google Consent Mode, чрез който състоянието на Вашия избор се предава към съответните Google тагове. При отказ аналитичното съхранение остава деактивирано съобразно избраната конфигурация.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>6.</span> Шрифтове
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Шрифтовете, използвани в сайта, се хостват локално. При нормалното им зареждане браузърът не е необходимо да прави заявка към Google Fonts само с цел получаване на използваните шрифтови файлове.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>7.</span> Социални мрежи
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Сайтът може да съдържа линкове към наши профили в платформи като Instagram и TikTok. Тези линкове сами по себе си не представляват Meta Pixel или TikTok Pixel и не зареждат такива tracking технологии на сайта. При преминаване към съответната външна платформа се прилагат нейните собствени политики за поверителност и бисквитки.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>8.</span> Срок на действие на технологиите
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.78)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li>настройките, необходими за работа на consent механизма, се пазят за периода, необходим за запомняне на Вашия избор;</li>
                  <li>съответните данни на ниво потребител и събитие в Google Analytics са конфигурирани със срок на съхранение 14 месеца;</li>
                  <li>други технически технологии се използват само за периода, необходим за съответната техническа цел.</li>
                </ul>
              </div>

              {/* Section 9 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>9.</span> Настройки на браузъра
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можете допълнително да управлявате или изтривате бисквитки чрез настройките на своя браузър. Блокирането на строго необходими технологии на ниво браузър може да засегне определени функции на сайта.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>10.</span> Промени в политиката
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можем да актуализираме настоящата Политика за бисквитките при промяна на използваните технологии, доставчиците, целите на обработването, функционалностите на сайта или приложимото законодателство.
                </p>
              </div>

              {/* Section 11 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>11.</span> Контакт
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>ККРЕАТИВ ООД</strong></li>
                  <li>ЕИК: 208820251</li>
                  <li>Адрес: гр. София 1113, р-н Изгрев, ул. „Незабравка“, бл. 52, ет. 1, ап. 1, България</li>
                  <li>
                    Имейл: <a href="mailto:info@kkreativ.eu" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>info@kkreativ.eu</a>
                  </li>
                </ul>
              </div>

            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: ПОЛИТИКА ЗА ПОВЕРИТЕЛНОСТ                             */}
          {/* ============================================================ */}
          {activeTab === 'privacy' && (
            <div className="legal-article" style={{ display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
              
              {/* Introduction */}
              <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.07)', paddingBottom: '1.75rem' }}>
                <p style={{ margin: '0 0 0.85rem 0', fontSize: '1.02rem', color: '#fff' }}>
                  Настоящата Политика за поверителност описва начина, по който <strong>ККРЕАТИВ ООД</strong> („kkreativ“, „ние“, „нас“) събира, използва, съхранява и защитава личните данни на посетителите на уебсайта <strong>www.kkreativ.eu</strong>.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Обработваме личните данни в съответствие с Регламент (ЕС) 2016/679 („GDPR“), Закона за защита на личните данни, Закона за електронната търговия и другото приложимо българско и европейско законодателство.
                </p>
              </div>

              {/* Section 1 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>1.</span> Администратор на лични данни
                </h3>
                <ul style={{ margin: '0 0 0.85rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>ККРЕАТИВ ООД</strong></li>
                  <li>ЕИК: 208820251</li>
                  <li>Адрес: гр. София 1113, р-н Изгрев, ул. „Незабравка“, бл. 52, ет. 1, ап. 1, България</li>
                  <li>Уебсайт: <a href="https://www.kkreativ.eu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>www.kkreativ.eu</a></li>
                  <li>Имейл: <a href="mailto:info@kkreativ.eu" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>info@kkreativ.eu</a></li>
                </ul>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.92rem' }}>
                  За въпроси относно обработването на лични данни или упражняването на Вашите права можете да се свържете с нас на посочения имейл адрес.
                </p>
              </div>

              {/* Section 2 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>2.</span> Какви лични данни обработваме
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '0.75rem' }}>
                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1rem' }}>2.1. Данни, предоставяни чрез контактната форма</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>Когато използвате контактната форма на сайта, можем да получим:</p>
                    <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.75)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <li>име;</li>
                      <li>имейл адрес;</li>
                      <li>телефонен номер;</li>
                      <li>име на компания или бранд;</li>
                      <li>съобщение и информация относно проекта или целите Ви;</li>
                      <li>дата и час на изпращане на формата.</li>
                    </ul>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Предоставените чрез контактната форма данни се записват в защитена база данни, използваща инфраструктурата на Supabase. Те не се изпращат автоматично към CRM система, mailing платформа или друг външен маркетингов инструмент.
                    </p>
                    <p style={{ margin: 0, color: 'var(--gold-main)', fontSize: '0.88rem' }}>
                      Молим да не предоставяте чрез формата чувствителни лични данни или информация, която не е необходима за обработване на Вашето запитване.
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1rem' }}>2.2. Технически данни</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                      При посещение на сайта нашият хостинг доставчик може автоматично да обработва стандартни технически данни и логове за достъп, включително:
                    </p>
                    <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.75)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <li>IP адрес;</li>
                      <li>дата и час на посещението;</li>
                      <li>браузър и операционна система чрез User-Agent информация;</li>
                      <li>заявена страница или ресурс;</li>
                      <li>друга техническа информация, необходима за функционирането, сигурността и защитата на сайта.</li>
                    </ul>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Хостинг инфраструктурата на сайта се предоставя от <strong>Vercel Inc.</strong>
                    </p>
                  </div>

                  <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.25rem', borderRadius: '10px' }}>
                    <h4 style={{ margin: '0 0 0.5rem 0', color: '#fff', fontSize: '1rem' }}>2.3. Аналитични данни</h4>
                    <p style={{ margin: '0 0 0.5rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                      При предоставено от Вас предварително съгласие използваме Google Analytics 4, за да анализираме използването на сайта. В зависимост от конфигурацията могат да се обработват данни като:
                    </p>
                    <ul style={{ margin: '0 0 0.75rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.75)', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <li>посетени страници;</li>
                      <li>продължителност и характеристики на сесиите;</li>
                      <li>взаимодействия със съдържанието;</li>
                      <li>източник на трафик;</li>
                      <li>тип устройство и браузър;</li>
                      <li>приблизително местоположение;</li>
                      <li>събития и действия в сайта.</li>
                    </ul>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Google Analytics се активира само съобразно избора Ви относно аналитичните бисквитки и сходни технологии.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 3 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>3.</span> Цели и правни основания
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '0.98rem' }}>3.1. Обработване на запитвания и потенциално сътрудничество</h4>
                    <p style={{ margin: '0 0 0.4rem 0', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Данните от контактната форма се използват за получаване и разглеждане на запитването, осъществяване на обратна връзка, обсъждане на потенциално сътрудничество, изготвяне на индивидуално предложение и предприемане на действия по Ваше искане преди евентуално сключване на договор.
                    </p>
                    <p style={{ margin: '0 0 0.4rem 0', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Когато запитването е свързано с потенциално предоставяне на наши услуги, правното основание е чл. 6, пар. 1, б. „б“ GDPR - предприемане на стъпки по искане на субекта на данните преди сключване на договор.
                    </p>
                    <p style={{ margin: '0 0 0.4rem 0', color: 'rgba(255, 255, 255, 0.75)' }}>
                      Когато запитването няма пряка връзка с потенциален договор, обработването може да се основава на нашия легитимен интерес по чл. 6, пар. 1, б. „е“ GDPR да комуникираме с лица, които доброволно са се свързали с нас.
                    </p>
                    <p style={{ margin: 0, color: 'var(--gold-main)', fontWeight: 600 }}>
                      Самото изпращане на контактната форма не се третира като съгласие за маркетинг.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '0.98rem' }}>3.2. Анализ и подобряване на сайта</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      При Ваше съгласие използваме Google Analytics 4, за да получаваме статистическа информация относно използването на сайта и да подобряваме съдържанието и потребителското изживяване. Правно основание: чл. 6, пар. 1, б. „а“ GDPR - съгласие. Съгласието може да бъде оттеглено по всяко време чрез настройките за бисквитки.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '0.98rem' }}>3.3. Техническа сигурност</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Техническите логове могат да бъдат обработвани за осигуряване на нормалното функциониране на сайта, предотвратяване на злоупотреби и кибератаки, диагностика на технически проблеми и защита на нашите системи и законни интереси. Правно основание: чл. 6, пар. 1, б. „е“ GDPR - легитимен интерес.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '0.98rem' }}>3.4. Изпълнение на договор</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Ако станете наш клиент или партньор, можем да обработваме необходимите лични данни за сключване и изпълнение на договорните отношения. Правно основание: чл. 6, пар. 1, б. „б“ GDPR.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ margin: '0 0 0.35rem 0', color: '#fff', fontSize: '0.98rem' }}>3.5. Законови задължения</h4>
                    <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.75)' }}>
                      Определени данни могат да бъдат обработвани или съхранявани, когато това се изисква от приложимото счетоводно, данъчно или друго законодателство. Правно основание: чл. 6, пар. 1, б. „в“ GDPR.
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>4.</span> Google Analytics 4
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  С Ваше предварително съгласие сайтът използва Google Analytics 4, предоставян от Google. Услугата ни помага да разбираме как посетителите използват сайта и как можем да подобрим неговото съдържание, структура и ефективност.
                </p>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Аналитичното съхранение се активира само след предоставяне на съответното съгласие. Данните на ниво потребител и събитие в Google Analytics са конфигурирани със срок на съхранение 14 месеца, след което подлежащите на тази настройка данни се изтриват съобразно механизмите на Google Analytics.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Ако откажете аналитичните технологии, основното съдържание и функционалност на сайта остават достъпни.
                </p>
              </div>

              {/* Section 5 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>5.</span> Къде се съхраняват данните от контактната форма
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Данните, предоставени чрез контактната форма, се съхраняват в база данни чрез <strong>Supabase</strong>. Достъп до тях имат само лица, за които това е необходимо във връзка с обработването на запитванията и управлението на сайта.
                </p>
              </div>

              {/* Section 6 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>6.</span> Срокове за съхранение
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Прилагаме принципа на ограничение на съхранението съгласно GDPR.
                </p>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Данните от контактната форма, когато от запитването не възникнат договорни отношения, се съхраняват до 24 месеца след последната съществена комуникация, след което се изтриват или анонимизират, освен ако има конкретно законово основание за по-дълго съхранение.
                </p>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Ако от запитването възникнат договорни отношения, съответните данни могат да се съхраняват за срока на договора и след това за приложимите законови, счетоводни, данъчни и давностни срокове.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Техническите логове се пазят за сроковете, необходими за сигурността и функционирането на услугата и съобразно приложимите настройки и правила на съответния доставчик. Данните на ниво потребител и събитие в Google Analytics са конфигурирани със срок на съхранение 14 месеца.
                </p>
              </div>

              {/* Section 7 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>7.</span> Получатели и доставчици
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  В зависимост от начина на използване на сайта лични или технически данни могат да бъдат обработвани от:
                </p>
                <ul style={{ margin: '0 0 0.85rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.78)', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                  <li><strong>Vercel Inc.</strong> - хостинг, CDN и техническа инфраструктура;</li>
                  <li><strong>Supabase</strong> - инфраструктура за базата данни, в която се съхраняват изпратените чрез контактната форма данни;</li>
                  <li><strong>Google</strong> - във връзка с Google Analytics 4, само съобразно приложимите настройки и Вашия избор за аналитични технологии;</li>
                  <li><strong>професионални консултанти или компетентни държавни и съдебни органи</strong>, когато това е необходимо или изискано от закона.</li>
                </ul>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Използваните шрифтове се self-host-ват от нашия сайт и не се зареждат чрез Google Fonts при посещение.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Външните връзки към Instagram и TikTok са обикновени линкове. Сайтът не зарежда Meta Pixel или TikTok Pixel само вследствие на наличието на тези линкове.
                </p>
              </div>

              {/* Section 8 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>8.</span> Международно предаване на данни
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Някои технологични доставчици могат да обработват данни извън Европейското икономическо пространство. Когато това представлява международно предаване на лични данни, се използват приложимите механизми по GDPR, като решение на Европейската комисия за адекватност, стандартни договорни клаузи или други допустими гаранции по GDPR.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  За допълнителна информация можете да се свържете с нас на <a href="mailto:info@kkreativ.eu" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>info@kkreativ.eu</a>.
                </p>
              </div>

              {/* Section 9 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>9.</span> Маркетингови съобщения
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Изпращането на контактна форма не означава, че сте се абонирали за маркетингови съобщения. Ако в бъдеще предлагаме newsletter или друга услуга за директен маркетинг, когато е необходимо, ще поискаме отделно и ясно съгласие.
                </p>
              </div>

              {/* Section 10 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>10.</span> Вашите права
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  При наличие на законовите предпоставки имате право:
                </p>
                <ul style={{ margin: '0 0 0.85rem 0', paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.78)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>на достъп до личните си данни;</li>
                  <li>на коригиране на неточни данни;</li>
                  <li>на изтриване;</li>
                  <li>на ограничаване на обработването;</li>
                  <li>на възражение срещу обработване на основание легитимен интерес;</li>
                  <li>на преносимост на данните;</li>
                  <li>да оттеглите дадено съгласие по всяко време;</li>
                  <li>да подадете жалба до компетентния надзорен орган.</li>
                </ul>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можете да упражните правата си чрез <a href="mailto:info@kkreativ.eu" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>info@kkreativ.eu</a>.
                </p>
              </div>

              {/* Section 11 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>11.</span> Жалба до КЗЛД
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можете да подадете жалба до <strong>Комисия за защита на личните данни (КЗЛД)</strong>:
                </p>
                <ul style={{ margin: 0, paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li>гр. София 1592, бул. „Проф. Цветан Лазаров“ № 2;</li>
                  <li>Имейл: <a href="mailto:kzld@cpdp.bg" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>kzld@cpdp.bg</a>;</li>
                  <li>Уебсайт: <a href="https://www.cpdp.bg" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>www.cpdp.bg</a>.</li>
                </ul>
              </div>

              {/* Section 12 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>12.</span> Задължително ли е предоставянето на данните
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Използването на контактната форма е доброволно. Някои полета могат да бъдат задължителни, когато без тях не можем да обработим запитването или да се свържем с Вас.
                </p>
              </div>

              {/* Section 13 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>13.</span> Автоматизирано вземане на решения
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Не използваме данните от контактната форма за автоматизирано вземане на решения, което поражда правни последици или Ви засяга по сходен значителен начин.
                </p>
              </div>

              {/* Section 14 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>14.</span> Сигурност
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Прилагаме подходящи технически и организационни мерки за защита на личните данни срещу неразрешен достъп, загуба, унищожаване, неправомерно разкриване, неправомерна промяна или обработка.
                </p>
              </div>

              {/* Section 15 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>15.</span> Бисквитки и сходни технологии
                </h3>
                <p style={{ margin: '0 0 0.6rem 0', color: 'rgba(255, 255, 255, 0.78)' }}>
                  Сайтът използва технологии, които могат да включват бисквитки или други механизми за локално съхранение. Строго необходимите технологии могат да се използват без предварително съгласие, когато това е допустимо по закон. Аналитичните технологии, включително Google Analytics 4, се активират съобразно Вашия избор и когато е необходимо - след получаване на предварително съгласие.
                </p>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Допълнителна информация е предоставена в нашата <button type="button" onClick={() => switchTab('cookies')} style={{ background: 'none', border: 'none', padding: 0, color: 'var(--gold-main)', textDecoration: 'underline', cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit' }}>Политика за бисквитките</button>.
                </p>
              </div>

              {/* Section 16 */}
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>16.</span> Промени в политиката
                </h3>
                <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.78)' }}>
                  Можем да актуализираме тази политика при промяна на сайта, използваните технологии, доставчиците или приложимото законодателство. Актуалната версия се публикува на <strong>www.kkreativ.eu</strong>.
                </p>
              </div>

              {/* Section 17 */}
              <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ color: 'var(--gold-main)', fontFamily: 'monospace' }}>17.</span> Контакт
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.4rem', color: 'rgba(255, 255, 255, 0.85)', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  <li><strong>ККРЕАТИВ ООД</strong>;</li>
                  <li>ЕИК: 208820251;</li>
                  <li>Адрес: гр. София 1113, р-н Изгрев, ул. „Незабравка“, бл. 52, ет. 1, ап. 1, България;</li>
                  <li>
                    Имейл: <a href="mailto:info@kkreativ.eu" style={{ color: 'var(--gold-main)', textDecoration: 'none' }}>info@kkreativ.eu</a>.
                  </li>
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Bottom Back Button */}
        <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
          <Link 
            to="/" 
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              color: 'var(--gold-main)', 
              fontSize: '0.92rem', 
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              background: 'rgba(212, 175, 55, 0.05)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.15)';
              e.currentTarget.style.borderColor = 'var(--gold-main)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(212, 175, 55, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(212, 175, 55, 0.3)';
            }}
          >
            ← Върни се на началната страница
          </Link>
        </div>

      </div>
    </div>
  );
}
