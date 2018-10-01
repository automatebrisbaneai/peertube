export const LOCALE_FILES = [ 'player', 'server' ]

export const I18N_LOCALES: any = {
  'en-US': 'English',
  'fr-FR': 'Français',
  'eu-ES': 'Euskara',
  'ca-ES': 'Català',
  'cs-CZ': 'Čeština',
  'eo': 'Esperanto',
  'de-DE': 'Deutsch',
  'es-ES': 'Español',
  'oc': 'Occitan',
  'zh-Hant-TW': '繁體中文（台灣）',
  'pt-BR': 'Português (Brasil)',
  'sv-SE': 'svenska',
  // 'pl-PL': 'Polski'
  'zh-Hans-CN': '简体中文（中国）'
}

const I18N_LOCALE_ALIAS: any = {
  'en': 'en-US',
  'fr': 'fr-FR',
  'eu': 'eu-ES',
  'ca': 'ca-ES',
  'cs': 'cs-CZ',
  'de': 'de-DE',
  'es': 'es-ES',
  'pt': 'pt-BR',
  'sv': 'sv-SE'
  // 'pl': 'pl-PL'
}

export const POSSIBLE_LOCALES = Object.keys(I18N_LOCALES)
                                      .concat(Object.keys(I18N_LOCALE_ALIAS))

export function getDefaultLocale () {
  return 'en-US'
}

export function isDefaultLocale (locale: string) {
  return getCompleteLocale(locale) === getCompleteLocale(getDefaultLocale())
}

export function peertubeTranslate (str: string, translations?: { [ id: string ]: string }) {
  return translations && translations[str] ? translations[str] : str
}

const possiblePaths = POSSIBLE_LOCALES.map(l => '/' + l)
export function is18nPath (path: string) {
  return possiblePaths.indexOf(path) !== -1
}

export function is18nLocale (locale: string) {
  return POSSIBLE_LOCALES.indexOf(locale) !== -1
}

export function getCompleteLocale (locale: string) {
  if (!locale) return locale

  if (I18N_LOCALE_ALIAS[locale]) return I18N_LOCALE_ALIAS[locale]

  return locale
}

export function getShortLocale (locale: string) {
  if (locale.indexOf('-') === -1) return locale

  return locale.split('-')[0]
}

export function buildFileLocale (locale: string) {
  const completeLocale = getCompleteLocale(locale)

  return completeLocale.replace(/-/g, '_')
}
