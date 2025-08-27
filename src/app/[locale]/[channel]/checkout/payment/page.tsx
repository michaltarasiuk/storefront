import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutPayment,
  SkeletonCheckoutPayment,
} from "../_components/CheckoutPayment";

const CheckoutPayment_CheckoutQuery = graphql(`
  query CheckoutPayment_Checkout($id: ID!) {
    checkout(id: $id) {
      ...CheckoutPaymentForm_Checkout
    }
  }
`);

export default async function CheckoutPaymentPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutPayment_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutPayment />}>
          <CheckoutPayment queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
