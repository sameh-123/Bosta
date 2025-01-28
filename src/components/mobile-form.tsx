import { useState } from 'react';
import search from '/public/search.png';
import searchNav from '/public/searchNav.png';
import { SyntheticEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function MobileForm() {
  const [isOpen, setOpen] = useState(false);
  const [params, setParams] = useSearchParams();
  const { t } = useTranslation();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      id: { value: string };
    };
    const value = target?.id?.value || '';
    if (params.get('id') != value) {
      setParams((prev) => {
        prev.set('id', value);
        return prev;
      });
    }
    setOpen(false)
    console.log(target.id.value);
  };
  return (
    <div className="relative md:hidden">
      <img src={searchNav} alt="search" onClick={() => setOpen(!isOpen)} className='size-8 cursor-pointer'/>
      {isOpen && (
        <div className="p-5 absolute -end-20 shadow-lg  top-16  z-50 bg-white rounded-lg">
          <div className="text-gray text-lg font-bold mb-2">{t('title')}</div>
          <form
            onSubmit={handleSubmit}
            className="flex md:hidden items-center justify-center"
          >
            <div className="flex items-center">
              <button className="bg-red rounded-s-lg p-5 size-16 cursor-pointer">
                <img src={search}  alt="search icon" className=''/>
              </button>
              <input
                defaultValue={params.get('id') || ''}
                placeholder={t('input-placeholder')}
                type="text"
                name="id"
                className="text-2xl max-w-60 sm:w-auto w-40  dark:text-black bg-white focus-visible:outline-0 px-3 py-4 rounded-e-lg shadow-lg text-end"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
