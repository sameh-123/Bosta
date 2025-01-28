import { i18n } from 'i18next';
import logo_arabic from '/logo_arabic.png';
import logo_english from '/logo_english.png';
import MobileForm from './mobile-form';
export default function MobileNav({ langOptions }: { langOptions: i18n }) {
  const lang = langOptions.language.slice(0, 2);
  const handleLanguageChange = () => {
    const newLanguage = lang == 'ar' ? 'en' : 'ar';
    langOptions.changeLanguage(newLanguage);
  };
  return (
    <header className="shadow-lg shadow-slate-200 dark:shadow-gray-950 mb-11 lg:hidden block">
      <nav className="container w-full flex justify-between items-center py-4 ">
        <img
          src={lang == 'ar' ? logo_arabic : logo_english}
          loading="lazy"
          alt="bosta logo"
        />

        <div className="flex items-center gap-2 sm:gap-6">
          <MobileForm />
          <div
            onClick={handleLanguageChange}
            className="text-gray dark:text-white text-lg font-semibold hover:text-red cursor-pointer"
          >
            {lang == 'ar' ? 'English' : 'عربي'}
          </div>
          <div
            onClick={() => {
              document.documentElement.classList.toggle('dark');
              if (localStorage.getItem('theme') == 'dark')
                localStorage.setItem('theme', 'light');
              else localStorage.setItem('theme', 'dark');
            }}
            className="size-6 rounded-full border-2 border-slate-400 dark:bg-white bg-black cursor-pointer"
          ></div>
        </div>
      </nav>
    </header>
  );
}
