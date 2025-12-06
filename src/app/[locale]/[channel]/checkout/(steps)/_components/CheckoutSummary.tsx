"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  SkeletonSummaryDisclosure,
  SummaryDisclosure,
} from "#app/components/SummaryDisclosure";
import {graphql} from "#app/graphql/codegen";
import type {CheckoutSummary_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {
  CheckoutLines,
  SkeletonCheckoutLines,
} from "#app/modules/checkout/components/CheckoutLines";
import {
  CheckoutMoneyLines,
  SkeletonCheckoutMoneyLines,
} from "#app/modules/checkout/components/CheckoutMoneyLines";
import {cn} from "#app/utils/cn";

import {AddPromoCodeForm, SkeletonAddPromoCodeForm} from "./AddPromoCodeForm";

const CheckoutSummary_CheckoutFragment = graphql(`
  fragment CheckoutSummary_Checkout on Checkout {
    id
    totalPrice {
      ...TaxedMoney_TaxedMoney @unmask
    }
    ...CheckoutLines_Checkout
    ...CheckoutMoneyLines_Checkout
  }
`);

interface CheckoutSummaryProps {
  checkout: FragmentType<CheckoutSummary_CheckoutFragment>;
}

export function CheckoutSummary({checkout}: CheckoutSummaryProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutSummary_CheckoutFragment,
    fragmentName: "CheckoutSummary_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutSummary />;
  }
  const checkoutSummary = (
    <>
      <CheckoutLines checkout={data} />
      <AddPromoCodeForm />
      <CheckoutMoneyLines checkout={data} />
    </>
  );
  return (
    <>
      <div className={cn("space-y-large-200 hidden", "md:block")}>
        {checkoutSummary}
      </div>
      <SummaryDisclosure
        taxedMoney={data.totalPrice}
        className={cn("md:hidden")}>
        {checkoutSummary}
      </SummaryDisclosure>
    </>
  );
}

export function SkeletonCheckoutSummary() {
  return (
    <>
      <div className={cn("space-y-large-200 hidden", "md:block")}>
        <SkeletonCheckoutLines />
        <SkeletonAddPromoCodeForm />
        <SkeletonCheckoutMoneyLines />
      </div>
      <SkeletonSummaryDisclosure className={cn("md:hidden")} />
    </>
  );
}
