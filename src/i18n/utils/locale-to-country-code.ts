import {CountryCode} from "#app/graphql/codegen/graphql";
import {assertNever} from "#app/utils/assert-never";

import type {Locale} from "../consts";

export function localeToCountryCode(locale: Locale) {
  switch (locale) {
    case "en-US":
      return CountryCode.Us;
    case "de-DE":
      return CountryCode.De;
    case "fr-FR":
      return CountryCode.Fr;
    case "es-ES":
      return CountryCode.Es;
    case "pl-PL":
      return CountryCode.Pl;
    default:
      assertNever(locale);
  }
}
