import type {ValidationErrors} from "@react-types/shared";

import {graphql} from "@/graphql/codegen";
import type {
  AccountValidationErrorFragment,
  CheckoutValidationErrorFragment,
} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

type ErrorFragment =
  | AccountValidationErrorFragment
  | CheckoutValidationErrorFragment;

export function toValidationErrors(errors: ErrorFragment[]) {
  return errors.reduce<ValidationErrors>((acc, {field, message}) => {
    if (isDefined(field) && isDefined(message)) {
      acc[field] = message;
    }
    return acc;
  }, {});
}

graphql(`
  fragment AccountValidationError on AccountError {
    field
    message
  }
`);

graphql(`
  fragment CheckoutValidationError on CheckoutError {
    field
    message
  }
`);
