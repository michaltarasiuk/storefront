"use server";

import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {BasePathSchema} from "@/utils/base-path";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";
import {toValidationErrors} from "@/utils/validation-errors";

const CheckoutShippingMethodUpdateMutation = graphql(`
  mutation CheckoutShippingMethodUpdate($id: ID!, $shippingMethodId: ID!) {
    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $shippingMethodId) {
      errors {
        ...CheckoutValidationError
      }
    }
  }
`);

export async function updateCheckoutShipping(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {shippingMethodId, locale, channel} = parseFormData(formData);
  const {data} = await getClient().mutate({
    mutation: CheckoutShippingMethodUpdateMutation,
    variables: {
      id: checkoutId.value,
      shippingMethodId,
    },
  });
  const errors = data?.checkoutDeliveryMethodUpdate?.errors ?? [];
  if (!errors.length) {
    redirect(joinPathSegments(locale, channel, Routes.checkout.payment));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  shippingMethodId: z.string(),
  ...BasePathSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}
