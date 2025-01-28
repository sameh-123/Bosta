import { SyntheticEvent } from 'react';
import searchIcon from '/public/search.png';
import { SetURLSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
export default function Form({
  params,
  setParams,
}: {
  params: URLSearchParams;
  setParams: SetURLSearchParams;
}) {
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
    console.log(target.id.value);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="container mx-auto hidden md:flex items-center justify-center -translate-y-[50%] z-50"
    >
      <div className="flex items-center">
        <button className="bg-red rounded-s-lg p-5 cursor-pointer">
          <img src={searchIcon} loading="lazy" alt="search icon" />
        </button>
        <input
          defaultValue={params.get('id') || ''}
          placeholder={t('input-placeholder')}
          type="text"
          name="id"
          className="text-2xl dark:text-black bg-white focus-visible:outline-0 px-3 py-4 rounded-e-lg shadow-lg text-end"
        />
      </div>
    </form>
  );
}
