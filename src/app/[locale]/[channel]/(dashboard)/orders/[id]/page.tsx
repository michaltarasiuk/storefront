import {Suspense} from "react";

import {SkeletonSummaryDisclosure} from "@/components/SummaryDisclosure";
import {cn} from "@/utils/cn";

import {OrderSummaryDisclosure} from "./_components/OrderSummary";

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
        <OrderSummaryDisclosure />
      </div>
    </>
  );
}

function SkeletonOrder() {
  return (
    <>
      <div className={cn("mb-small-200 md:hidden")}>
        <SkeletonSummaryDisclosure className={cn("-mx-large-200")} />
      </div>
    </>
  );
}
