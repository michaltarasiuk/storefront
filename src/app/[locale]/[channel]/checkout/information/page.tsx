import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {getCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../_utils/redirect-to-root";
import {
  CheckoutInformation,
  SkeletonCheckoutInformation,
} from "./_components/CheckoutInformation";

const CheckoutInformation_CheckoutQuery = gql(`
  query CheckoutInformation_Checkout($id: ID!) { 
    checkout(id: $id) {
      ...ContactSection_Checkout
      ...ShippingAddress_Checkout
    }
  }
`);

export default async function CheckoutInformationPage() {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    redirectToRoot();
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
