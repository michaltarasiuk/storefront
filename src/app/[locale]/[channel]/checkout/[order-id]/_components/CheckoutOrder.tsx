"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import type {CheckoutOrder_OrderQuery} from "#app/graphql/codegen/graphql";
import {isDefined} from "#app/utils/is-defined";

import {CheckoutLayout} from "../../_components/CheckoutLayout";
import {
  CheckoutOrderForm,
  SkeletonCheckoutOrderForm,
} from "./CheckoutOrderForm";
import {OrderSummary, SkeletonOrderSummary} from "./OrderSummary";

interface CheckoutOrderProps {
  queryRef: QueryRef<CheckoutOrder_OrderQuery>;
}

export function CheckoutOrder({queryRef}: CheckoutOrderProps) {
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
