import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";

import {
  CheckoutOrder,
  SkeletonCheckoutOrder,
} from "./_components/CheckoutOrder";

const CheckoutOrder_OrderQuery = graphql(`
  query CheckoutOrder_Order($id: ID!) {
    order(id: $id) {
      __typename
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
