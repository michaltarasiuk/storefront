import {notFound} from "next/navigation";
import {Suspense} from "react";

import {PreloadQuery} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {getCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";

import {
  CheckoutSteps,
  SkeletonCheckoutSteps,
} from "./_components/CheckoutSteps";

const CheckoutSteps_CheckoutQuery = graphql(`
  query CheckoutSteps_Checkout($id: ID!) {
    checkout(id: $id) {
      ...CheckoutSummary_Checkout
    }
  }
`);

export default async function CheckoutStepsLayout({
  children,
}: LayoutProps<"/[locale]/[channel]/checkout">) {
  const checkoutId = await getCheckoutId();
  if (!isDefined(checkoutId)) {
    notFound();
  }
  return (
    <PreloadQuery
      query={CheckoutSteps_CheckoutQuery}
      variables={{
        id: checkoutId.value,
      }}>
      {(queryRef) => (
        <Suspense
          fallback={<SkeletonCheckoutSteps>{children}</SkeletonCheckoutSteps>}>
          <CheckoutSteps queryRef={queryRef}>{children}</CheckoutSteps>
        </Suspense>
      )}
    </PreloadQuery>
  );
}
