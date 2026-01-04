"use server";

import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/errors";
import {isDefined} from "#app/utils/is-defined";
import {joinPathname, PathnameParamsSchema} from "#app/utils/pathname";

export async function updateCheckoutDeliveryAction(
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
    redirect(joinPathname(locale, channel, ROUTES.checkout.billing));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

function parseFormData(formData: FormData) {
  const formDataObject = Object.fromEntries(formData);
  return FormSchema.parse(formDataObject);
}

const FormSchema = z.object({
  deliveryMethodId: z.string(),
  ...PathnameParamsSchema.shape,
});

const DeliveryMethodUpdateMutation = graphql(`
  mutation DeliveryMethodUpdate($id: ID!, $deliveryMethodId: ID!) {
    checkoutDeliveryMethodUpdate(id: $id, deliveryMethodId: $deliveryMethodId) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);
