import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutPaymentForm,
  SkeletonCheckoutPaymentForm,
} from "../_components/CheckoutPaymentForm";
import {redirectToRoot} from "../_utils/redirect-to-root";

const CheckoutPayment_CheckoutQuery = gql(`
  query CheckoutPayment_Checkout($id: ID!) { 
    checkout(id: $id) {
      id
    }
  }
`);

export default async function CheckoutPaymentPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    redirectToRoot();
  }
  return (
    <PreloadQuery
      query={CheckoutPayment_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutPaymentForm />}>
          <CheckoutPaymentForm queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
