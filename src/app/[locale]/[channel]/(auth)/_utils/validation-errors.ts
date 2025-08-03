import type {ValidationErrors} from "@react-types/shared";

import {graphql} from "@/graphql/codegen";
import type {ValidationErrorFragment} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

graphql(`
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
