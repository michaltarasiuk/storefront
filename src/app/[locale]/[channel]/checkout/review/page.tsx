import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutReview,
  SkeletonCheckoutReview,
} from "./_components/CheckoutReview";

const CheckoutReview_CheckoutQuery = graphql(`
  query CheckoutReview_Checkout($id: ID!) {
    checkout(id: $id) {
      ...OrderReviewList_Checkout
    }
  }
`);

export default async function CheckoutReviewPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutReview_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutReview />}>
          <CheckoutReview queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
