import type {ValidationErrors} from "@react-types/shared";

import {gql} from "@/graphql/codegen";
import type {ValidationErrorFragment} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

gql(`
  fragment ValidationError on AccountError {
    field
    message
  }
`);

export function toValidationErrors(errors: ValidationErrorFragment[]) {
  return errors.reduce<ValidationErrors>((acc, {field, message}) => {
    if (isDefined(field) && isDefined(message)) {
      acc[field] = message;
    }
    return acc;
  }, {});
}
