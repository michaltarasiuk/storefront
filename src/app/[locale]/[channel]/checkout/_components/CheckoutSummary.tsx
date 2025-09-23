import {ProductList} from "@/components/ProductList";
import {SummaryDisclosure} from "@/components/SummaryDisclosure";
import {cn} from "@/utils/cn";

import {AddPromoCodeForm, SkeletonAddPromoCodeForm} from "./AddPromoCodeForm";
import {
  CheckoutMoneyLines,
  SkeletonCheckoutMoneyLines,
} from "./CheckoutMoneyLines";

export function CheckoutSummary() {
  return (
    <>
      <ProductList />
      <AddPromoCodeForm />
      <CheckoutMoneyLines />
    </>
  );
}

export function SkeletonCheckoutSummary() {
  return (
    <>
      <SkeletonAddPromoCodeForm />
      <SkeletonCheckoutMoneyLines />
    </>
  );
}

export function CheckoutSummaryDisclosure() {
  return (
    <SummaryDisclosure
      taxedMoney={{
        gross: {amount: 0, currency: "USD"},
        net: {amount: 0, currency: "USD"},
      }}
      className={cn("md:hidden")}>
      <CheckoutSummary />
    </SummaryDisclosure>
  );
}
