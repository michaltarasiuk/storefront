import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutShipping,
  SkeletonCheckoutShipping,
} from "../_components/CheckoutShipping";
import {redirectToRoot} from "../_utils/redirect-to-root";

const CheckoutShipping_CheckoutQuery = graphql(`
  query CheckoutShipping_Checkout($id: ID!) {
    checkout(id: $id) {
      ...CheckoutShippingForm_Checkout
    }
  }
`);

export default async function CheckoutShippingPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    redirectToRoot();
  }
  return (
    <PreloadQuery
      query={CheckoutShipping_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutShipping />}>
          <CheckoutShipping queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
