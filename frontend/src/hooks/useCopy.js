import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import EnglishUSTranslations from 'locales/en-US.json';

// https://www.i18next.com/overview/configuration-options
i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    lng: 'en',
    // debug: true,
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: EnglishUSTranslations,
    },
  });

// export const getCopy = key => i18n.getResource('en', 'translation', key);

export const useCopy = () => {
  const { t, ...rest } = useTranslation();

  const copy = (key, params) => {
    return t(key, params);
  };

  return {
    t: copy,
    ...rest,
  };
};
