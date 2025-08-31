"use server";

import {notFound} from "next/navigation";

import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {toValidationErrors} from "@/modules/checkout/utils/validation-errors";
import {isDefined} from "@/utils/is-defined";

export async function updateBilling(_state: unknown, _formData: FormData) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return {
    errors: toValidationErrors([]),
  };
}
