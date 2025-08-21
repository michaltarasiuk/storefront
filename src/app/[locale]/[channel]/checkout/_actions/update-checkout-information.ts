"use server";

import type {ApolloClient} from "@apollo/client";
import {redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import type {
  CheckoutAddressUpdateMutationVariables,
  CheckoutEmailUpdateMutationVariables,
} from "@/graphql/codegen/graphql";
import {AddressSchema} from "@/utils/address";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../_utils/redirect-to-root";
import {toValidationErrors} from "../_utils/validation-errors";

const CheckoutEmailUpdateMutation = graphql(`
  mutation CheckoutEmailUpdate($id: ID!, $email: String!) {
    checkoutEmailUpdate(id: $id, email: $email) {
      errors {
        ...CheckoutValidationError @unmask
      }
    }
  }
`);

const CheckoutAddressUpdateMutation = graphql(`
  mutation CheckoutAddressUpdate($id: ID!, $address: AddressInput!) {
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
    redirectToRoot();
  }
  const {email, ...address} = parseFormData(formData);
  const client = getClient();
  const [emailUpdate, addressUpdate] = await Promise.all([
    updateCheckoutEmail(client, {
      id: checkoutId.value,
      email,
    }),
    updateCheckoutAddress(client, {
      id: checkoutId.value,
      address,
    }),
  ]);
  const errors = addressUpdate.errors.concat(emailUpdate?.errors ?? []);
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

async function updateCheckoutAddress(
  client: ApolloClient<unknown>,
  variables: CheckoutAddressUpdateMutationVariables,
) {
  const {data} = await client.mutate({
    mutation: CheckoutAddressUpdateMutation,
    variables,
  });
  return {
    errors: [
      ...(data?.checkoutBillingAddressUpdate?.errors ?? []),
      ...(data?.checkoutShippingAddressUpdate?.errors ?? []),
    ],
  };
}
