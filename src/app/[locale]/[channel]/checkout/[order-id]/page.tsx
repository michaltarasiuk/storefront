import {Suspense} from "react";

import {PreloadQuery} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";

import {
  CheckoutOrder,
  SkeletonCheckoutOrder,
} from "./_components/CheckoutOrder";

const CheckoutOrder_OrderQuery = graphql(`
  query CheckoutOrder_Order($id: ID!) {
    order(id: $id) {
      ...OrderSummary_Order
    }
  }
`);

export default async function CheckoutOrderPage({
  params,
}: PageProps<"/[locale]/[channel]/checkout/[order-id]">) {
  const {"order-id": id} = await params;
  return (
    <PreloadQuery
      query={CheckoutOrder_OrderQuery}
      variables={{
        id,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutOrder />}>
          <CheckoutOrder queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
