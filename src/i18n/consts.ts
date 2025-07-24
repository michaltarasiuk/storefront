import {assertValidLocale} from "@/i18n/utils/assert-valid-locale";

export type Locale = (typeof Locales)[number];

export const NextLocaleCookieName = "NEXT_LOCALE";

export const DefaultLocale = "en-US";
export const Locales = [
  DefaultLocale,
  "de-DE",
  "fr-FR",
  "es-ES",
  "it-IT",
  "pl-PL",
  "pt-PT",
  "nl-NL",
  "ru-RU",
  "ja-JP",
  "zh-CN",
  "ko-KR",
  "sv-SE",
  "tr-TR",
] as const;

for (const locale of Locales) {
  assertValidLocale(locale);
}
