import {Suspense} from "react";

import {
  OrderSummaryDisclosure,
  SkeletonOrderSummaryDisclosure,
} from "@/components/OrderSummaryDisclosure";
import {cn} from "@/utils/cn";

import {OrderHeader} from "./_components/OrderHeader";

export default async function OrderPage() {
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
        <OrderSummaryDisclosure className={cn("-mx-large-200")} />
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
