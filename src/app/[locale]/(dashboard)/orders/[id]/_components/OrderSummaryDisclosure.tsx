"use client";

import {
  Button,
  Disclosure,
  DisclosurePanel,
  Heading,
} from "react-aria-components";

import {ProductList} from "@/components/ProductList";
import {SkeletonText} from "@/components/Skeleton";
import {Text} from "@/components/Text";
import {FormattedMessage} from "@/i18n/react-intl";
import {CartIcon} from "@/icons/CartIcon";
import {cn} from "@/utils/cn";

export function OrderSummaryDisclosure() {
  return (
    <Disclosure className={cn("-mx-large-200 bg-base-background-subdued")}>
      {({isExpanded}) => (
        <>
          <Heading>
            <Button
              slot="trigger"
              className={cn(
                "p-large-200 border-base-border flex w-full cursor-pointer items-center justify-between border-b",
                "focus-visible:ring-base-accent focus-visible:ring-offset-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
              )}>
              <div className={cn("gap-small-200 flex items-center")}>
                <CartIcon aria-hidden className={cn("stroke-base-accent")} />
                <Text appearance="accent">
                  {isExpanded ? (
                    <FormattedMessage
                      id="lcPfsu"
                      defaultMessage="Hide order summary"
                    />
                  ) : (
                    <FormattedMessage
                      id="b7BHTd"
                      defaultMessage="Show order summary"
                    />
                  )}
                </Text>
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
        </>
      )}
    </Disclosure>
  );
}

export function SkeletonOrderSummaryDisclosure() {
  return (
    <div
      className={cn(
        "-mx-large-200 p-large-200 flex justify-between",
        "bg-base-background-subdued border-base-border border-b",
      )}>
      <SkeletonText />
      <SkeletonText inlineSize="small" />
    </div>
  );
}
