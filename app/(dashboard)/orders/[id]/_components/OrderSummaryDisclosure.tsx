"use client";

import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import {ProductList} from "@/shared/components/ProductList";
import {Text} from "@/shared/components/Text";
import {CartIcon} from "@/shared/icons/CartIcon";
import {cn} from "@/shared/utils/cn";

export function OrderSummaryDisclosure() {
  return (
    <Disclosure className={cn("-mx-large-200 bg-base-background-subdued")}>
      <Heading>
        <Button
          slot="trigger"
          className={cn(
            "p-large-200 border-base-border flex w-full cursor-pointer items-center justify-between border-b",
            "focus-visible:ring-base-accent focus-visible:ring-offset-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
          )}>
          <div className={cn("gap-small-200 flex items-center")}>
            <CartIcon aria-hidden className={cn("stroke-base-accent")} />
            <Text appearance="accent">Hide order summary</Text>
          </div>
          <Text emphasis="semibold">$185.36</Text>
        </Button>
      </Heading>
      <DisclosurePanel>
        <div
          className={cn(
            "p-large-200 space-y-large-200",
            "border-base-border border-b",
          )}>
          <ProductList />
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
