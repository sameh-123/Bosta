import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import english from './locales/en.json';
import arabic from './locales/ar.json';

type TranslationResources = {
  [key: string]: {
    translation: Record<string, string>;
  };
};

const resources: TranslationResources = {
  en: { translation: english },
  ar: { translation: arabic },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
