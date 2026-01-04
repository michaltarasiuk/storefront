"use server";

import {notFound, redirect} from "next/navigation";

import {ROUTES} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {Locale} from "#app/i18n/consts";
import {getCheckoutId} from "#app/modules/checkout/utils/cookies";
import {isDefined} from "#app/utils/is-defined";
import {joinPathname} from "#app/utils/pathname";

const CompleteCheckoutMuatation = graphql(`
  mutation CompleteCheckout($id: ID!) {
    checkoutComplete(id: $id) {
      order {
        id
      }
    }
  }
`);

export async function completeCheckoutAction(locale: Locale, channel: string) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  const {data} = await getClient().mutate({
    mutation: CompleteCheckoutMuatation,
    variables: {
      id: checkoutId.value,
    },
  });
  const {order} = data?.checkoutComplete ?? {};
  if (!isDefined(order)) {
    return;
  }
  redirect(joinPathname(locale, channel, ROUTES.checkout.order(order.id)));
}
