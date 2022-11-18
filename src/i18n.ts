import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages(): any {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages: LocaleMessages<VueMessageType> = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

function locale(): string {
  const storageLocale = localStorage.getItem('locale');
  if (storageLocale){
    return storageLocale;
  }
  
  const locales = loadLocaleMessages();
  let currentLocale = navigator.language;

  if (locales[currentLocale]){
    return currentLocale;
  }

  currentLocale = currentLocale.split('-')[0]

  if (locales[currentLocale]){
    return currentLocale;
  }

  return 'en'
}

const numberFormats = {
  'en': {
    "currency": {
      "style": "currency",
      "currency": "USD"
    },
  },
  'en-EN': {
    "currency": {
      "style": "currency",
      "currency": "EUR"
    },
  },
  'pt': {
    "currency": {
      "style": "currency",
      "currency": "BRL"
    },
  },
}

export default createI18n({
  legacy: false,
  locale: locale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  numberFormats
})
