import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutInformation,
  SkeletonCheckoutInformation,
} from "./_components/CheckoutInformation";

const CheckoutInformation_CheckoutQuery = graphql(`
  query CheckoutInformation_Checkout($id: ID!) {
    checkout(id: $id) {
      ...Contact_Checkout
      ...ShippingAddress_Checkout
    }
  }
`);

export default async function CheckoutInformationPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutInformation_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense fallback={<SkeletonCheckoutInformation />}>
          <CheckoutInformation queryRef={queryRef} />
        </Suspense>
      )}
    </PreloadQuery>
  );
}
