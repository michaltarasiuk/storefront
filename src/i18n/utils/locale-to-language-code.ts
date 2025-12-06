import {LanguageCodeEnum} from "#app/graphql/codegen/graphql";
import {assertNever} from "#app/utils/assert-never";

import type {Locale} from "../consts";

export function localeToLanguageCode(locale: Locale) {
  switch (locale) {
    case "en-US":
      return LanguageCodeEnum.EnUs;
    case "de-DE":
      return LanguageCodeEnum.DeDe;
    case "fr-FR":
      return LanguageCodeEnum.FrFr;
    case "es-ES":
      return LanguageCodeEnum.EsEs;
    case "pl-PL":
      return LanguageCodeEnum.PlPl;
    default:
      assertNever(locale);
  }
}
