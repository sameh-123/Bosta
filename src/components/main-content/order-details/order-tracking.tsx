import { useTranslation } from 'react-i18next';
import type { TrackingData } from '../../../types';
import { useMemo } from 'react';
function formatTime(date: Date): string {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const h = hours.toString().padStart(2, '0');
  return `${h}:${minutes} ${ampm}`;
}

function processData(
  data: TrackingData['TransitEvents']
): Map<string, TrackingData['TransitEvents']> {
  const mp = new Map<string, TrackingData['TransitEvents']>();
  for (const item of data) {
    const date = item.timestamp.slice(0, 10);
    if (!mp.has(date)) mp.set(date, []);
    mp.get(date)?.push(item);
  }
  return mp;
}
export default function OrderTracking({
  data,
}: {
  data: TrackingData['TransitEvents'];
}) {
  const c = useMemo(() => [...data].reverse(), [data]);
  const proccessedData = useMemo(() => processData(c), [c]);
  const dates = [...proccessedData.keys()];

  const { t, i18n } = useTranslation();
  if (data.length == 0)
    return (
      <div className="text-second italic text-xl font-bold my-10">
        {t('noDetails')}
      </div>
    );

  return (
    <section className="my-10">
      <div className="text-gray dark:text-slate-300 text-xl font-bold my-10">
        {t('trackDetails')}
      </div>
      <div>
        {dates.map((item) => {
          const dateDetails = proccessedData.get(item);
          return (
            <div className="">
              <div className="flex items-center gap-4 my-5">
                <div className="size-6 rounded-full bg-gray/40 dark:bg-slate-300"></div>
                {new Date(item).toLocaleDateString(i18n.language, {
                  day: '2-digit',
                  month: 'short',
                  weekday: 'short',
                  year: 'numeric',
                })}
              </div>
              <div className="flex flex-col gap-4 border-s-2 border-slate-300 ps-5 ltr:translate-x-3 rtl:-translate-x-3">
                {dateDetails?.map((detail) => {
                  return (
                    <div className="border-2 border-slate-300 rounded-lg p-3 w-fit">
                      <div>{detail.state}</div>
                      <div className="text-gray rtl:text-end" dir="ltr">
                        {formatTime(new Date(detail.timestamp))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
