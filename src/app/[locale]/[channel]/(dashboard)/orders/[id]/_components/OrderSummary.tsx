import {ProductList} from "@/components/ProductList";
import {SummaryDisclosure} from "@/components/SummaryDisclosure";
import {cn} from "@/utils/cn";

import {OrderMoneyLines, SkeletonOrderMoneyLines} from "./OrderMoneyLines";

export function OrderSummary() {
  return (
    <>
      <ProductList />
      <OrderMoneyLines />
    </>
  );
}

export function SkeletonOrderSummary() {
  return <SkeletonOrderMoneyLines />;
}

export function OrderSummaryDisclosure() {
  return (
    <SummaryDisclosure
      taxedMoney={{
        gross: {amount: 0, currency: "USD"},
        net: {amount: 0, currency: "USD"},
      }}
      className={cn("-mx-large-200")}>
      <OrderSummary />
    </SummaryDisclosure>
  );
}
