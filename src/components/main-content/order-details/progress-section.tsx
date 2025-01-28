import { useTranslation } from 'react-i18next';
import checkMark from '/checkMark.png';

export function ProgressBar({
  Left = true,
  Right = true,
  active = false,
  date = '',
  title = '',
}) {
  return (
    <div className="flex md:flex-col items-center gap-5">
      <div className="flex flex-col md:flex-row items-center">
        <div
          className={`${active ? 'border-2 border-second' : 'custom-dash'} ${
            Left ? '' : 'opacity-0'
          }  w-0.5 h-16 md:h-0.5 md:w-20 lg:w-28`}
        ></div>
        {active ? (
          <div className="rounded-full bg-second size-6 flex items-center justify-center p-1">
            <img src={checkMark} loading="lazy" alt="checked" />
          </div>
        ) : (
          <div className="size-6 border-2 border-slate-300 rounded-full"></div>
        )}

        <div
          className={`${active ? 'border-2 border-second' : 'custom-dash'} ${
            Right ? '' : 'opacity-0'
          } w-0.5 h-16 md:h-0.5 md:w-20 lg:w-28`}
        ></div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="font-bold text-sm lg:text-lg">{title}</div>
        <div className="text-sm lg:text-lg text-gray dark:text-slate-200">
          {active ? date : ''}
        </div>
      </div>
    </div>
  );
}

export default function ProgressSection({ status }: { status: number }) {
  const dateOptins: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    weekday: 'long',
  };
  const { t, i18n } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row items-start justify-center px-10 md:py-10">
      <ProgressBar
        Left={false}
        active={status >= 10}
        title={t('status.picked')}
        date={new Date().toLocaleDateString(i18n.language, dateOptins)}
      />
      <ProgressBar
        active={status >= 20}
        title={t('status.processing')}
        date={new Date().toLocaleDateString(i18n.language, dateOptins)}
      />
      <ProgressBar
        active={status >= 30}
        title={t('status.outDelivery')}
        date={new Date().toLocaleDateString(i18n.language, dateOptins)}
      />
      <ProgressBar
        Right={false}
        active={status >= 45}
        title={t('status.delivered')}
        date={new Date().toLocaleDateString(i18n.language, dateOptins)}
      />
    </div>
  );
}
