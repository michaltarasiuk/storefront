"use server";

import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/validation-errors";
import {addressSchema} from "#app/utils/address";
import {isDefined} from "#app/utils/is-defined";
import {basePathnameSchema, joinPathSegments} from "#app/utils/pathname";

const BillingAddressUpdateMutation = graphql(`
  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function updateCheckoutBilling(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {locale, channel, ...billingAddress} = parseFormData(formData);
  const {data} = await getClient().mutate({
    mutation: BillingAddressUpdateMutation,
    variables: {
      id: checkoutId.value,
      billingAddress,
    },
  });
  const {errors = []} = data?.checkoutBillingAddressUpdate ?? {};
  if (!errors.length) {
    redirect(joinPathSegments(locale, channel, routes.checkout.review));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  ...addressSchema.shape,
  ...basePathnameSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}
