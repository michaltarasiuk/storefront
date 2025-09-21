import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutDelivery,
  SkeletonCheckoutDelivery,
} from "./_components/CheckoutDelivery";

const CheckoutDelivery_CheckoutQuery = graphql(`
  query CheckoutDelivery_Checkout($id: ID!) {
    checkout(id: $id) {
      shippingAddress {
        __typename
      }
      ...DeliveryReviewList_Checkout
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
        <Suspense fallback={<SkeletonCheckoutDelivery />}>
          <CheckoutDelivery queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
