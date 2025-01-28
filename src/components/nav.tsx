import { i18n } from 'i18next';
import logo_arabic from '/logo_arabic.png';
import logo_english from '/logo_english.png';

export default function Nav({ langOptions }: { langOptions: i18n }) {
  const lang = langOptions.language;
  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    const newLanguage = e?.target?.value || 'ar';
    langOptions.changeLanguage(newLanguage);
  };
  return (
    <header className="bg-main dark:bg-black">
      <nav className="container mx-auto hidden lg:flex items-center justify-between py-10">
        <img
          src={lang == 'ar' ? logo_arabic : logo_english}
          loading="lazy"
          alt="bosta logo"
        />
        <div className="flex items-center gap-10">
          <select
            onChange={handleLanguageChange}
            name="language"
            id="language"
            className="focus-visible:outline-0"
            // value={lang}
          >
            <option className="dark:text-black" value="ar">
              عربي
            </option>
            <option className="dark:text-black" value="en">
              English
            </option>
          </select>
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
