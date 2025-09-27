import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutBilling,
  SkeletonCheckoutBilling,
} from "./_components/CheckoutBilling";

const CheckoutBilling_CheckoutQuery = graphql(`
  query CheckoutBilling_Checkout($id: ID!) {
    checkout(id: $id) {
      deliveryMethod {
        __typename
      }
      ...BillingReviewList_Checkout
      ...BillingAddress_Checkout
    }
  }
`);

export default async function CheckoutBillingPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutBilling_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutBilling />}>
          <CheckoutBilling queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
