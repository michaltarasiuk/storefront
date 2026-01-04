"use client";

import {useState} from "react";

import {type OrderView, OrderViewContext} from "../_utils/order-view-context";

export function OrderViewProvider({children}: {children: React.ReactNode}) {
  const [orderView, setOrderView] = useState<OrderView>("grid");
  return (
    <OrderViewContext
      value={{
        orderView,
        setOrderView,
      }}>
      {children}
    </OrderViewContext>
  );
}
