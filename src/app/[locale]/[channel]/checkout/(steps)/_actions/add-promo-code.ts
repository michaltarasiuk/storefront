"use server";

import {notFound} from "next/navigation";
import invariant from "tiny-invariant";

import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/errors";
import {isDefined} from "#app/utils/is-defined";

const AddPromoCodeMutation = graphql(`
  mutation AddPromoCode($id: ID!, $promoCode: String!) {
    checkoutAddPromoCode(id: $id, promoCode: $promoCode) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function addPromoCodeAction(_state: unknown, formData: FormData) {
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
