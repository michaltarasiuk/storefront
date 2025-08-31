import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutBillingForm,
  SkeletonCheckoutBillingForm,
} from "./_components/CheckoutBilling";

const CheckoutBilling_CheckoutQuery = graphql(`
  query CheckoutBilling_Checkout($id: ID!) {
    checkout(id: $id) {
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
        <Suspense fallback={<SkeletonCheckoutBillingForm />}>
          <CheckoutBillingForm queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
