"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {graphql} from "#app/graphql/codegen";
import type {OrderLines_OrderFragment} from "#app/graphql/codegen/graphql";
import {cn} from "#app/utils/cn";

import {OrderLine, SkeletonOrderLine} from "./OrderLine";

const OrderLines_OrderFragment = graphql(`
  fragment OrderLines_Order on Order {
    id
    lines {
      id
      ...OrderLine_Order
    }
  }
`);

interface OrderLinesProps {
  order: FragmentType<OrderLines_OrderFragment>;
}

export function OrderLines({order}: OrderLinesProps) {
  const {data, complete} = useFragment({
    fragment: OrderLines_OrderFragment,
    fragmentName: "OrderLines_Order",
    from: order,
  });
  if (!complete) {
    return <SkeletonOrderLines />;
  }
  return (
    <ul className={cn("space-y-base")}>
      {data.lines.map((orderLine) => (
        <li key={orderLine.id}>
          <OrderLine orderLine={orderLine} />
        </li>
      ))}
    </ul>
  );
}

export function SkeletonOrderLines() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonOrderLine />
      <SkeletonOrderLine />
      <SkeletonOrderLine />
    </div>
  );
}
