"use client";

import {use} from "react";

import {assertNever} from "@/shared/utils/assert-never";
import {cn} from "@/shared/utils/cn";

import {OrderViewContext} from "../_utils/order-view-context";
import {OrderCard} from "./OrderCard";

export function OrdersView() {
  const {orderView} = use(OrderViewContext);
  switch (orderView) {
    case "grid":
      return <OrdersGrid />;
    case "table":
      return <OrdersTable />;
    default:
      assertNever(orderView);
  }
}

function OrdersGrid() {
  return (
    <ul className={cn("grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3")}>
      <li>
        <OrderCard />
      </li>
      <li>
        <OrderCard />
      </li>
      <li>
        <OrderCard />
      </li>
    </ul>
  );
}

function OrdersTable() {
  return null;
}
