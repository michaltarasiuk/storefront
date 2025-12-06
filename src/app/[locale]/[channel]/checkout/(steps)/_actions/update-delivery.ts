"use server";

import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/validation-errors";
import {isDefined} from "#app/utils/is-defined";
import {BasePathnameSchema, joinPathSegments} from "#app/utils/pathname";

const DeliveryMethodUpdateMutation = graphql(`
  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function updateCheckoutDelivery(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {deliveryMethodId, locale, channel} = parseFormData(formData);
  const {data} = await getClient().mutate({
    mutation: DeliveryMethodUpdateMutation,
    variables: {
      id: checkoutId.value,
      deliveryMethodId,
    },
  });
  const {errors = []} = data?.checkoutDeliveryMethodUpdate ?? {};
  if (!errors.length) {
    redirect(joinPathSegments(locale, channel, Routes.checkout.billing));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  deliveryMethodId: z.string(),
  ...BasePathnameSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}
