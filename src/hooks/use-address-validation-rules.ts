import {useSuspenseQuery} from "@apollo/client";
import type * as z from "zod";

import {graphql} from "@/graphql/codegen";
import type {CountryCode} from "@/graphql/codegen/graphql";
import type {AddressSchema} from "@/utils/address";
import {raise} from "@/utils/raise";

const AddressValidationRulesQuery = graphql(`
  query AddressValidationRules($countryCode: CountryCode!) {
    addressValidationRules(countryCode: $countryCode) {
      allowedFields
      requiredFields
      upperFields
      countryAreaChoices {
        raw
        verbose
      }
      cityChoices {
        raw
        verbose
      }
      cityAreaChoices {
        raw
        verbose
      }
      postalCodeExamples
    }
  }
`);

export function useAddressValidationRules(countryCode: CountryCode) {
  const {data} = useSuspenseQuery(AddressValidationRulesQuery, {
    variables: {
      countryCode,
    },
  });
  const {
    allowedFields,
    requiredFields,
    upperFields,
    ...addressValidationRules
  } =
    data.addressValidationRules ??
    raise(`No address rules for: ${countryCode}`);
  return {
    isFieldAllowed(field: AddressField) {
      return allowedFields.includes(field);
    },
    isFieldRequired(field: AddressField) {
      return requiredFields.includes(field);
    },
    isFieldUpper(field: AddressField) {
      return upperFields.includes(field);
    },
    ...addressValidationRules,
  };
}
type AddressField =
  | "name"
  | Exclude<keyof z.infer<typeof AddressSchema>, "firstName" | "lastName">;
