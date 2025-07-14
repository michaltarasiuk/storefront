import {cn} from "@/utils/cn";

import {OrderHeader} from "./_components/OrderHeader";
import {OrderSummaryDisclosure} from "./_components/OrderSummaryDisclosure";

export default function OrderPage() {
  return (
    <>
      <div className={cn("mb-small-200 md:hidden")}>
        <OrderSummaryDisclosure />
      </div>
      <OrderHeader />
    </>
  );
}
