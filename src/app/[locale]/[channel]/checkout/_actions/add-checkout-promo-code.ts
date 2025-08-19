"use server";

import * as z from "zod";

import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../_utils/redirect-to-root";
import {toValidationErrors} from "../_utils/validation-errors";

const CheckoutAddPromoCodeMutation = gql(`
  mutation CheckoutAddPromoCode($id: ID!, $promoCode: String!) { 
    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function addCheckoutPromoCode(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    redirectToRoot();
  }
  const {promoCode} = parseFormData(formData);
  const {data} = await getClient().mutate({
    mutation: CheckoutAddPromoCodeMutation,
    variables: {
      id: checkoutId.value,
      promoCode,
    },
  });
  return {
    errors: toValidationErrors(data?.checkoutAddPromoCode?.errors ?? []),
  };
}

const FormSchema = z.object({
  promoCode: z.string(),
});

function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}
