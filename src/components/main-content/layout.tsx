import ClientError from './client-error';
import ServerError from './server-error';
import Loading from '../loading';
import type { TrackingData, clientError } from '../../types';
import { useTranslation } from 'react-i18next';
import ProgressSection from './order-details/progress-section';
import OrderTracking from './order-details/order-tracking';
export default function ContentLayout({
  data,
  isLoading,
  isServerError,
  clientError,
}: {
  data: TrackingData | null;
  isLoading: boolean;
  isServerError: boolean;
  clientError: clientError | null;
}) {
  const dateOptins: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    weekday: 'long',
  };
  const { t, i18n } = useTranslation();
  if (isLoading) return <Loading />;
  if (isServerError) return <ServerError />;
  if (clientError?.isClientError)
    return <ClientError clientError={clientError} />;
  if (!data) return null;
  return (
    <main className="container mx-auto mt-5 md:mt-0">
      <section className="shadow-lg shadow-slate-300 rounded-lg divide-y divide-slate-200">
        <div className="p-3">
          <div className="text-lg text-gray dark:text-slate-200">
            {t('order')} #{data?.TrackingNumber}
          </div>
          <div className="sm:text-2xl text-xl font-bold flex items-center flex-wrap gap-x-2">
            {data?.CurrentStatus.state || ''}
            <span className="text-second">
              {new Date(
                data?.CurrentStatus?.timestamp || ''
              ).toLocaleDateString(i18n.language, dateOptins)}
            </span>
          </div>
          <div className="text-gray dark:text-slate-200 text-lg">
            {data?.ScheduleDate &&
            new Date(data?.ScheduleDate || '') > new Date()
              ? `${t('expected')} ${new Date(
                  data?.ScheduleDate || ''
                ).toLocaleDateString(i18n.language, dateOptins)}`
              : data?.CurrentStatus.state}
          </div>
        </div>
        <ProgressSection status={data?.CurrentStatus.code || 0} />
      </section>
      <OrderTracking data={data?.TransitEvents || []} />
    </main>
  );
}
