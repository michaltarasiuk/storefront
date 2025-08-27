import type {Locale} from "../consts";

export function getLanguageDisplayName(locale: Locale) {
  const displayNames = new Intl.DisplayNames([locale], {
    type: "language",
  });
  return displayNames.of(locale);
}
