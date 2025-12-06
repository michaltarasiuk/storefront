"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  SkeletonSummaryDisclosure,
  SummaryDisclosure,
} from "#app/components/SummaryDisclosure";
import {graphql} from "#app/graphql/codegen";
import type {OrderSummary_OrderFragment} from "#app/graphql/codegen/graphql";
import {OrderLines} from "#app/modules/order/components/OrderLines";
import {
  OrderMoneyLines,
  SkeletonOrderMoneyLines,
} from "#app/modules/order/components/OrderMoneyLines";
import {cn} from "#app/utils/cn";

const OrderSummary_OrderFragment = graphql(`
  fragment OrderSummary_Order on Order {
    id
    total {
      ...TaxedMoney_TaxedMoney @unmask
    }
    ...OrderLines_Order
    ...OrderMoneyLines_Order
  }
`);

interface OrderSummaryProps {
  order: FragmentType<OrderSummary_OrderFragment>;
}

export function OrderSummary({order}: OrderSummaryProps) {
  const {data, complete} = useFragment({
    fragment: OrderSummary_OrderFragment,
    fragmentName: "OrderSummary_Order",
    from: order,
  });
  if (!complete) {
    return <SkeletonOrderSummary />;
  }
  const orderSummary = (
    <>
      <OrderLines order={data} />
      <OrderMoneyLines order={data} />
    </>
  );
  return (
    <>
      <div className={cn("space-y-large-200 hidden", "md:block")}>
        {orderSummary}
      </div>
      <SummaryDisclosure taxedMoney={data.total} className={cn("md:hidden")}>
        {orderSummary}
      </SummaryDisclosure>
    </>
  );
}

export function SkeletonOrderSummary() {
  return (
    <>
      <div className={cn("space-y-large-200 hidden", "md:block")}>
        <SkeletonOrderMoneyLines />
      </div>
      <SkeletonSummaryDisclosure className={cn("md:hidden")} />
    </>
  );
}
