"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  SkeletonSummaryDisclosure,
  SummaryDisclosure,
} from "@/components/SummaryDisclosure";
import {graphql} from "@/graphql/codegen";
import type {OrderSummary_OrderFragment} from "@/graphql/codegen/graphql";
import {OrderLines} from "@/modules/order/components/OrderLines";
import {
  OrderMoneyLines,
  SkeletonOrderMoneyLines,
} from "@/modules/order/components/OrderMoneyLines";
import {cn} from "@/utils/cn";

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
