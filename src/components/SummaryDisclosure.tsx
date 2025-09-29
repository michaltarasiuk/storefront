"use client";

import {
  Button,
  Disclosure,
  DisclosurePanel,
  type DisclosureProps,
  Heading,
} from "react-aria-components";

import type {TaxedMoney_TaxedMoneyFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {CartIcon} from "@/icons/CartIcon";
import {cn} from "@/utils/cn";

import {TaxedMoney} from "./TaxedMoney";
import {SkeletonText} from "./Text";
import {Text} from "./Text";

interface SummaryDisclosureProps extends DisclosureProps {
  children: React.ReactNode;
  taxedMoney: TaxedMoney_TaxedMoneyFragment;
}

export function SummaryDisclosure({
  children,
  taxedMoney,
  ...props
}: SummaryDisclosureProps) {
  return (
    <Disclosure
      {...props}
      className={cn("bg-base-background-subdued", props.className)}>
      {({isExpanded}) => (
        <>
          <Heading>
            <Button
              slot="trigger"
              className={cn(
                "p-large-200 border-base-border gap-base flex w-full cursor-pointer items-center justify-between border-b",
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
              <TaxedMoney taxedMoney={taxedMoney} emphasis="semibold" />
            </Button>
          </Heading>
          <DisclosurePanel
            className={cn(
              "overflow-hidden transition-discrete duration-300",
              isExpanded ? "animate-accordion-down" : "animate-accordion-up",
            )}>
            <div
              className={cn(
                "p-large-200 space-y-large-200",
                "border-base-border border-b",
              )}>
              {children}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}

interface SkeletonSummaryDisclosureProps {
  className?: string;
}

export function SkeletonSummaryDisclosure({
  className,
}: SkeletonSummaryDisclosureProps) {
  return (
    <div
      className={cn(
        "p-large-200 gap-base flex justify-between",
        "bg-base-background-subdued border-base-border border-b",
        className,
      )}>
      <SkeletonText />
      <SkeletonText inlineSize="small" />
    </div>
  );
}
