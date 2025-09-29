import type {ValidationErrors} from "@react-types/shared";

import {graphql} from "@/graphql/codegen";
import type {CheckoutValidationErrorFragment} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

const CheckoutValidationErrorFragment = graphql(`
  fragment CheckoutValidationError on CheckoutError {
    field
    message
  }
`);

export function toValidationErrors(errors: CheckoutValidationErrorFragment[]) {
  return errors.reduce<ValidationErrors>((acc, {field, message}) => {
    if (isDefined(field) && isDefined(message)) {
      acc[field] = message;
    }
    return acc;
  }, {});
}
