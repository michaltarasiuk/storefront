import {createContext} from "react";

export type OrderView = "grid" | "table";

export const OrderViewContext = createContext<{
  orderView: OrderView;
  setOrderView?: (view: OrderView) => void;
}>({
  orderView: "grid",
});
