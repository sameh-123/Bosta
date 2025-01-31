import { useTranslation } from 'react-i18next';
import serverError from '/serverError.svg';
export default function ServerError() {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto flex flex-col items-center justify-center md:mt-0 mt-10">
      <object type="image/svg+xml" data={serverError} className="w-80">
        server error
      </object>
      {/* <img src={serverError} alt="server error" className="w-80" /> */}
      <div className="text-red md:text-2xl text-xl text-center italic">
        {t('serverError')}
      </div>
    </div>
  );
}
