"use server";

import {notFound} from "next/navigation";

import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";
import {toValidationErrors} from "@/utils/validation-errors";

export async function updateCheckoutPayment(
  _state: unknown,
  _formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return {
    errors: toValidationErrors([]),
  };
}
