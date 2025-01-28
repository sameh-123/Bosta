import { useTranslation } from 'react-i18next';
import { clientError } from '../../types';

export default function ClientError({ clientError }: { clientError: clientError }) {
  const { t } = useTranslation();
  return (
    <div className="container mx-auto md:mt-0 mt-10  flex flex-col justify-center items-center gap-1 rounded-lg p-3 bg-red/15 dark:bg-red-700">
      <div className="md:text-2xl text-xl font-bold text-center">
        {clientError?.error || t('invalidNumber')}
      </div>
      <div className="md:text-xl text-lg text-center">{t('errorNumber')}</div>
    </div>
  );
}
