"use server";

import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../_utils/redirect-to-root";
import {toValidationErrors} from "../_utils/validation-errors";

export async function updateCheckoutShipping(
  _state: unknown,
  _formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    redirectToRoot();
  }
  return {
    errors: toValidationErrors([]),
  };
}
