"use client";

import {use} from "react";

import {assertNever} from "@/utils/assert-never";

import {OrderViewContext} from "../_utils/order-view-context";
import {OrdersGrid, OrdersGridSkeleton} from "./OrdersGrid";

export function OrdersView() {
  const {orderView} = use(OrderViewContext);
  switch (orderView) {
    case "grid":
      return <OrdersGrid />;
    case "table":
      return null;
    default:
      assertNever(orderView);
  }
}

export function OrdersViewSkeleton() {
  const {orderView} = use(OrderViewContext);
  switch (orderView) {
    case "grid":
      return <OrdersGridSkeleton />;
    case "table":
      return null;
    default:
      assertNever(orderView);
  }
}
