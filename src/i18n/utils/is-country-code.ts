import {CountryCode} from "#app/graphql/codegen/graphql";
import {capitalize} from "#app/utils/capitalize";

export function isCountryCode(value: unknown): value is CountryCode {
  return typeof value === "string" && capitalize(value) in CountryCode;
}
