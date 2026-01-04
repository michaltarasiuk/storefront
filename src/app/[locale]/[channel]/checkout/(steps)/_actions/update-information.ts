"use server";

import type {ApolloClient} from "@apollo/client";
import {notFound, redirect} from "next/navigation";
import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {
  AddressUpdateMutationVariables,
  EmailUpdateMutationVariables,
} from "#app/graphql/codegen/graphql";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {toValidationErrors} from "#app/modules/checkout/utils/errors";
import {AddressSchema} from "#app/utils/address";
import {parseFormData} from "#app/utils/form";
import {isDefined} from "#app/utils/is-defined";
import {joinPathname, PathnameParamsSchema} from "#app/utils/pathname";

export async function updateCheckoutInformationAction(
  _state: unknown,
  formData: FormData,
) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {email, locale, channel, ...address} = parseFormData(
    formData,
    FormSchema,
  );
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
    redirect(joinPathname(locale, channel, ROUTES.checkout.delivery));
  }
  return {
    errors: toValidationErrors(errors),
  };
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

const FormSchema = z.object({
  email: z.email(),
  ...AddressSchema.shape,
  ...PathnameParamsSchema.shape,
});

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
