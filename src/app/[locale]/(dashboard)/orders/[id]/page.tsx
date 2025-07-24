import {Suspense} from "react";

import {cn} from "@/utils/cn";

import {OrderHeader} from "./_components/OrderHeader";
import {
  OrderSummaryDisclosure,
  SkeletonOrderSummaryDisclosure,
} from "./_components/OrderSummaryDisclosure";

export default function OrderPage() {
  return (
    <Suspense fallback={<SkeletonOrder />}>
      <Order />
    </Suspense>
  );
}

function Order() {
  return (
    <>
      <div className={cn("mb-small-200 md:hidden")}>
        <OrderSummaryDisclosure />
      </div>
      <OrderHeader />
    </>
  );
}

function SkeletonOrder() {
  return (
    <>
      <div className={cn("mb-small-200 md:hidden")}>
        <SkeletonOrderSummaryDisclosure />
      </div>
    </>
  );
}
