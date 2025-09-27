"use server";

import {notFound, redirect} from "next/navigation";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import type {Locale} from "@/i18n/consts";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

const CompleteCheckoutMuatation = graphql(`
  mutation CompleteCheckout($id: ID!) {
    checkoutComplete(id: $id) {
      order {
        id
      }
    }
  }
`);

export async function completeCheckout(locale: Locale, channel: string) {
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
  redirect(joinPathSegments(locale, channel, Routes.checkout.order(order.id)));
}
