import { useSearchParams } from 'react-router-dom';
import Nav from '../components/nav';
import MobileNav from '../components/mobile-nav';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import location from '/public/location.png';
import shadow from '/public/shadow.png';
import Form from '../components/form';
import useFetchData from '../hooks/use-fetch-data';
import ContentLayout from '../components/main-content/layout';
function App() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language.slice(0, 2) || 'en';
  const [params, setParams] = useSearchParams();

  const id = params.get('id') || '';
  const { data, isLoading, isServerError, clientError } = useFetchData(
    id,
    lang
  );
  console.log(params.get('id'));
  console.log(i18n.language.slice(0, 2));
  useEffect(() => {
    if (localStorage.getItem('theme') == 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  useEffect(() => {
    const direction = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
  }, [i18n.language]);
  return (
    <>
      <Nav langOptions={i18n} />
      <MobileNav langOptions={i18n} />
      <section className="bg-main dark:bg-gradient-to-t dark:from-slate-950 dark:to-slate-300 flex flex-col items-center justify-center rounded-t-xl md:rounded-t-none pb-2 md:pb-20 dark:rounded-xl">
        <div className="flex flex-col items-center relative mb-5">
          <img
            src={location}
            loading="lazy"
            className="animate-bounce md:h-32 h-28 z-20"
          />
          <img src={shadow} loading="lazy" className="w-56 absolute bottom-0" />
        </div>
        <div className="md:text-5xl text-2xl md:font-bold font-semibold mb-3 text-center">
          {t('title')}
        </div>
        <div className="text-center px-1">{t('link')}</div>
      </section>
      <Form params={params} setParams={setParams} />
      <ContentLayout
        data={data}
        isLoading={isLoading}
        isServerError={isServerError}
        clientError={clientError}
      />
    </>
  );
}

export default App;
