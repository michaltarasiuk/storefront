import {type Locale, Locales} from "../consts";

export function isLocaleSupported(locale: string): locale is Locale {
  const locales: readonly string[] = Locales;
  return locales.includes(locale);
}
