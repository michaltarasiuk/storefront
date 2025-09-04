import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutDeliveryForm,
  SkeletonCheckoutDeliveryForm,
} from "./_components/CheckoutDeliveryForm";

const CheckoutDelivery_CheckoutQuery = graphql(`
  query CheckoutDelivery_Checkout($id: ID!) {
    checkout(id: $id) {
      ...Delivery_Checkout
    }
  }
`);

export default async function CheckoutDeliveryPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutDelivery_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutDeliveryForm />}>
          <CheckoutDeliveryForm queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
