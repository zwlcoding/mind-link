// https://juejin.cn/post/7139855730105942030
import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import en from './lang/en.ts';
import zh from './lang/zh.ts';

i18n
  .use(I18nextBrowserLanguageDetector) //自动检测语言环境
  .use(initReactI18next) //注入实例
  .init({
    debug: import.meta.env.DEV,
    supportedLngs: ['en', 'zh'],
    fallbackLng: 'zh',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en,
      zh,
    },
  });
