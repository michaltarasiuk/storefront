"use server";

import type {ApolloClient} from "@apollo/client";
import {redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import type {
  CheckoutEmailUpdateMutationVariables,
  CheckoutShippingAddressUpdateMutationVariables,
} from "@/graphql/codegen/graphql";
import {AddressSchema} from "@/utils/address";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../_utils/redirect-to-root";
import {toValidationErrors} from "../_utils/validation-errors";

const CheckoutEmailUpdateMutation = gql(`
  mutation CheckoutEmailUpdate($id: ID!, $email: String!) { 
    checkoutEmailUpdate(id: $id, email: $email) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }  
`);

const CheckoutShippingAddressUpdateMutation = gql(`
  mutation CheckoutShippingAddressUpdate($id: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(id: $id, shippingAddress: $shippingAddress) {
      errors {
        message
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
    redirectToRoot();
  }
  const {email, ...shippingAddress} = parseFormData(formData);
  const client = await getClient();
  const [emailUpdate, shippingAddressUpdate] = await Promise.all([
    updateCheckoutEmail(client, {
      id: checkoutId.value,
      email,
    }),
    updateCheckoutShippingAddress(client, {
      id: checkoutId.value,
      shippingAddress,
    }),
  ]);
  const errors = [
    ...(emailUpdate?.errors ?? []),
    ...(shippingAddressUpdate?.errors ?? []),
  ];
  if (!errors.length) {
    redirect(Routes.checkout.shipping);
  }
  return {
    errors: toValidationErrors(errors),
  };
}

const FormSchema = z.object({
  email: z.email(),
  ...AddressSchema.shape,
});

function parseFormData(formData: FormData) {
  return FormSchema.parse(Object.fromEntries(formData));
}

async function updateCheckoutEmail(
  client: ApolloClient<unknown>,
  variables: CheckoutEmailUpdateMutationVariables,
) {
  const {data} = await client.mutate({
    mutation: CheckoutEmailUpdateMutation,
    variables,
  });
  return data?.checkoutEmailUpdate;
}

async function updateCheckoutShippingAddress(
  client: ApolloClient<unknown>,
  variables: CheckoutShippingAddressUpdateMutationVariables,
) {
  const {data} = await client.mutate({
    mutation: CheckoutShippingAddressUpdateMutation,
    variables,
  });
  return data?.checkoutShippingAddressUpdate;
}
