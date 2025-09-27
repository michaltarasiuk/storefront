"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, useRouter} from "next/navigation";
import {useTransition} from "react";

import {Button} from "@/components/Button";
import {Checkbox, SkeletonCheckbox} from "@/components/Checkbox";
import {Divider} from "@/components/Divider";
import {Routes} from "@/consts/routes";
import type {CheckoutOrder_OrderQuery} from "@/graphql/codegen/graphql";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {FormattedMessage} from "@/i18n/react-intl";
import {
  OrderDetails,
  SkeletonOrderDetails,
} from "@/modules/order/components/OrderDetails";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

export function CheckoutOrder({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutOrder_OrderQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  const router = useRouter();
  const basePathname = useBasePathname();
  const [isPending, startTransition] = useTransition();
  if (!isDefined(data.order)) {
    notFound();
  }
  return (
    <form
      className={cn("space-y-large-300")}
      onSubmit={() =>
        startTransition(() =>
          router.push(joinPathSegments(...basePathname, Routes.home)),
        )
      }>
      <div
        className={cn(
          "rounded-base overflow-hidden",
          "border-base-border border",
        )}>
        <OrderDetails />
        <Divider size="small" />
        <div className={cn("bg-base-background-subdued p-base")}>
          <Checkbox>
            <FormattedMessage
              id="g/jo36"
              defaultMessage="Save my information for a faster checkout"
            />
          </Checkbox>
        </div>
      </div>
      <Button
        type="submit"
        size="large"
        className={cn("w-full")}
        isDisabled={isPending}
        isPending={isPending}>
        <FormattedMessage id="Yywm0p" defaultMessage="Continue shopping" />
      </Button>
    </form>
  );
}

export function SkeletonCheckoutOrder() {
  return (
    <div className={cn("space-y-large-300")}>
      <div
        className={cn(
          "rounded-base overflow-hidden",
          "border-base-border border",
        )}>
        <SkeletonOrderDetails />
        <Divider size="small" />
        <div className={cn("bg-base-background-subdued p-base")}>
          <SkeletonCheckbox />
        </div>
      </div>
      <Button type="submit" size="large" className={cn("w-full")} isDisabled>
        <FormattedMessage id="Yywm0p" defaultMessage="Continue shopping" />
      </Button>
    </div>
  );
}
