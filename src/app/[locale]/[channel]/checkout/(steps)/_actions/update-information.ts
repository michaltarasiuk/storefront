"use server";

import type {ApolloClient} from "@apollo/client";
import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import type {
  AddressUpdateMutationVariables,
  EmailUpdateMutationVariables,
} from "@/graphql/codegen/graphql";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {toValidationErrors} from "@/modules/checkout/utils/validation-errors";
import {AddressSchema} from "@/utils/address";
import {BasePathnameSchema} from "@/utils/base-pathname";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

const EmailUpdateMutation = graphql(`
  mutation EmailUpdate($id: ID!, $email: String!) {
    checkoutEmailUpdate(id: $id, email: $email) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

const AddressUpdateMutation = graphql(`
  mutation AddressUpdate($id: ID!, $address: AddressInput!) {
    checkoutShippingAddressUpdate(id: $id, shippingAddress: $address) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
    checkoutBillingAddressUpdate(id: $id, billingAddress: $address) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

export async function updateCheckoutInformation(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {email, locale, channel, ...address} = parseFormData(formData);
  const client = getClient();
  const [emailUpdate, addressUpdate] = await Promise.all([
    updateEmail(client, {
      id: checkoutId.value,
      email,
    }),
    updateAddress(client, {
      id: checkoutId.value,
      address,
    }),
  ]);
  const errors = [
    ...(addressUpdate?.errors ?? []),
    ...(emailUpdate?.errors ?? []),
  ];
  if (!errors.length) {
    redirect(joinPathSegments(locale, channel, Routes.checkout.delivery));
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  email: z.email(),
  ...AddressSchema.shape,
  ...BasePathnameSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}

async function updateEmail(
  client: ApolloClient<unknown>,
  variables: EmailUpdateMutationVariables,
) {
  const {data} = await client.mutate({
    mutation: EmailUpdateMutation,
    variables,
  });
  return data?.checkoutEmailUpdate;
}

async function updateAddress(
  client: ApolloClient<unknown>,
  variables: AddressUpdateMutationVariables,
) {
  const {data} = await client.mutate({
    mutation: AddressUpdateMutation,
    variables,
  });
  const checkoutAddress =
    data?.checkoutShippingAddressUpdate ?? data?.checkoutBillingAddressUpdate;
  return checkoutAddress;
}
