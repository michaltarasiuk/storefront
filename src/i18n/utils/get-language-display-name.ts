import type {Locale} from "../consts";

export function getLanguageDisplayName(locale: Locale) {
  return new Intl.DisplayNames([locale], {type: "language"}).of(locale);
}
