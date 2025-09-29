"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import type {CheckoutOrder_OrderQuery} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

import {CheckoutLayout} from "../../_components/CheckoutLayout";
import {
  CheckoutOrderForm,
  SkeletonCheckoutOrderForm,
} from "./CheckoutOrderForm";
import {OrderSummary, SkeletonOrderSummary} from "./OrderSummary";

export function CheckoutOrder({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutOrder_OrderQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.order)) {
    notFound();
  }
  return (
    <CheckoutLayout summary={<OrderSummary order={data.order} />}>
      <CheckoutOrderForm />
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutOrder() {
  return (
    <CheckoutLayout summary={<SkeletonOrderSummary />}>
      <SkeletonCheckoutOrderForm />
    </CheckoutLayout>
  );
}
