import type {ValidationErrors} from "@react-types/shared";

import {graphql} from "@/graphql/codegen";
import type {AccountValidationErrorFragment} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

const AccountValidationErrorFragment = graphql(`
  fragment AccountValidationError on AccountError {
    field
    message
  }
`);

export function toValidationErrors(errors: AccountValidationErrorFragment[]) {
  return errors.reduce<ValidationErrors>((acc, {field, message}) => {
    if (isDefined(field) && isDefined(message)) {
      acc[field] = message;
    }
    return acc;
  }, {});
}
