"use client";

import {use} from "react";

import {assertNever} from "#app/utils/assert-never";

import {OrderViewContext} from "../_utils/order-view-context";
import {OrdersGrid, SkeletonOrdersGrid} from "./OrdersGrid";

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

export function SkeletonOrdersView() {
  const {orderView} = use(OrderViewContext);
  switch (orderView) {
    case "grid":
      return <SkeletonOrdersGrid />;
    case "table":
      return null;
    default:
      assertNever(orderView);
  }
}
