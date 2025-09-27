"use server";

import {notFound} from "next/navigation";
import invariant from "tiny-invariant";

import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {toValidationErrors} from "@/modules/checkout/utils/validation-errors";
import {isDefined} from "@/utils/is-defined";

const AddPromoCodeMutation = graphql(`
  mutation AddPromoCode($id: ID!, $promoCode: String!) {
    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function addPromoCode(_state: unknown, formData: FormData) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const promoCode = formData.get("promoCode");
  invariant(typeof promoCode === "string");
  const {data} = await getClient().mutate({
    mutation: AddPromoCodeMutation,
    variables: {
      id: checkoutId.value,
      promoCode,
    },
  });
  const {errors = []} = data?.checkoutAddPromoCode ?? {};
  return {
    errors: toValidationErrors(errors),
  };
}
