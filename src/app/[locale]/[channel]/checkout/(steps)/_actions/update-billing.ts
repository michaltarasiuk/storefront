"use server";

import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/errors";
import {AddressSchema} from "#app/utils/address";
import {parseFormData} from "#app/utils/form";
import {isDefined} from "#app/utils/is-defined";
import {joinPathname, PathnameParamsSchema} from "#app/utils/pathname";

export async function updateCheckoutBillingAction(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {locale, channel, ...billingAddress} = parseFormData(
    formData,
    FormSchema,
  );
  const {data} = await getClient().mutate({
    mutation: BillingAddressUpdateMutation,
    variables: {
      id: checkoutId.value,
      billingAddress,
    },
  });
  const {errors = []} = data?.checkoutBillingAddressUpdate ?? {};
  if (!errors.length) {
    redirect(joinPathname(locale, channel, ROUTES.checkout.review));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  ...AddressSchema.shape,
  ...PathnameParamsSchema.shape,
});

const BillingAddressUpdateMutation = graphql(`
  mutation BillingAddressUpdate($id: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(id: $id, billingAddress: $billingAddress) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);
