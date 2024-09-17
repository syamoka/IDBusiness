import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'src/assets/i18n/',
  langs: ['ru', 'am', 'en'],
  keysManager: {},
  defaultLang: 'en',
};

export default config;
