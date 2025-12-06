import {useSuspenseQuery} from "@apollo/client";
import invariant from "tiny-invariant";
import type * as z from "zod";

import {graphql} from "#app/graphql/codegen";
import type {CountryCode} from "#app/graphql/codegen/graphql";
import type {AddressSchema} from "#app/utils/address";
import {isDefined} from "#app/utils/is-defined";

type AddressField =
  | "name"
  | Exclude<keyof z.infer<typeof AddressSchema>, "firstName" | "lastName">;

export function useAddressValidationRules(countryCode: CountryCode) {
  const {data} = useSuspenseQuery(AddressValidationRulesQuery, {
    variables: {
      countryCode,
    },
  });
  invariant(isDefined(data.addressValidationRules));
  const {
    allowedFields,
    requiredFields,
    upperFields,
    ...addressValidationRules
  } = data.addressValidationRules;
  return {
    isFieldAllowed(field: AddressField) {
      return allowedFields.includes(field);
    },
    isFieldRequired(field: AddressField) {
      return requiredFields.includes(field);
    },
    isFieldUppercased(field: AddressField) {
      return upperFields.includes(field);
    },
    ...addressValidationRules,
  };
}

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
    }
  }
`);
