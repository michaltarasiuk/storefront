'use server';

import {GRAPHQL_ENDPOINT} from '@/env/env-local';
import type {UpdateCheckoutBillingAddressVariables} from '@/graphql/generated/documents';
import {UpdateCheckoutBillingAddressDocument} from '@/graphql/generated/documents';
import {fetchQueryData} from '@/lib/tools/fetch-query';
import {raise} from '@/lib/tools/raise';
import {getCheckoutId} from '@/modules/checkout/tools/cookies';

export async function updateCheckoutBillingAddressAction(
  billingAddress: UpdateCheckoutBillingAddressVariables['billingAddress'],
) {
  return (
    await fetchQueryData(GRAPHQL_ENDPOINT, {
      params: {
        query: UpdateCheckoutBillingAddressDocument,
        variables: {
          id: getCheckoutId() ?? raise('Checkout id is not defined'),
          billingAddress,
        },
      },
    })
  ).checkoutBillingAddressUpdate;
}
