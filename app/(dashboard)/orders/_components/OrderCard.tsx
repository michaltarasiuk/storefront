"use client";

import {Link} from "react-aria-components";

import {Button} from "@/shared/components/Button";
import {Skeleton, SkeletonText} from "@/shared/components/Skeleton";
import {Text} from "@/shared/components/Text";
import {Routes} from "@/shared/consts/routes";
import {SuccessIcon} from "@/shared/icons/SuccessIcon";
import {cn} from "@/shared/utils/cn";

export function OrderCard() {
  return (
    <OrderCardRoot>
      <OrderCardLink id="1" />
      <OrderCardHeader>
        <OrderCardStatus>
          <SuccessIcon
            aria-hidden
            className={cn("stroke-base-text [grid-area:icon]")}
          />
          <Text
            emphasis="semibold"
            className={cn("[grid-area:status]")}
            role="status"
            aria-live="polite">
            Confirmed
          </Text>
          <Text className={cn("[grid-area:updated]")}>
            <time dateTime="2024-10-17">Updated Oct 17</time>
          </Text>
        </OrderCardStatus>
      </OrderCardHeader>
      <OrderCardContent>
        <div className={cn("flex flex-col")}>
          <Text emphasis="semibold">3 items</Text>
          <Text appearance="subdued">Order #1014</Text>
        </div>
        <Text emphasis="semibold">$75.55</Text>
      </OrderCardContent>
      <OrderCardContextualButtons>
        <Button>Pay now</Button>
        <Button kind="secondary">Manage</Button>
      </OrderCardContextualButtons>
    </OrderCardRoot>
  );
}

export function SkeletonOrderCard() {
  return (
    <OrderCardRoot>
      <OrderCardHeader>
        <OrderCardStatus>
          <Skeleton className={cn("size-4.5 [grid-area:icon]")} />
          <SkeletonText
            inlineSize="large"
            className={cn("[grid-area:status]")}
          />
          <SkeletonText className={cn("[grid-area:updated]")} />
        </OrderCardStatus>
      </OrderCardHeader>
      <OrderCardContent>
        <div className={cn("flex flex-col")}>
          <SkeletonText />
          <SkeletonText inlineSize="small" />
        </div>
        <SkeletonText inlineSize="small" />
      </OrderCardContent>
      <OrderCardContextualButtons>
        <Button>Pay now</Button>
        <Button kind="secondary">Manage</Button>
      </OrderCardContextualButtons>
    </OrderCardRoot>
  );
}

function OrderCardRoot({children}: {children: React.ReactNode}) {
  return (
    <article
      className={cn(
        "gap-large-200 flex flex-col",
        "bg-base-background p-large-200 rounded-large relative",
      )}>
      {children}
    </article>
  );
}

function OrderCardLink({id}: {id: string}) {
  return (
    <Link
      href={Routes.order(id)}
      className={cn(
        "rounded-large absolute inset-0",
        "hover:shadow-small transition-shadow",
        "focus-visible:ring-base-accent focus-visible:ring-offset-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      )}
    />
  );
}

function OrderCardHeader({children}: {children: React.ReactNode}) {
  return (
    <header className={cn("bg-base-background-subdued rounded-base p-5")}>
      {children}
    </header>
  );
}

function OrderCardStatus({children}: {children: React.ReactNode}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-1.5",
        "[grid-template-areas:'icon_status'_'empty_updated']",
      )}>
      {children}
    </div>
  );
}

function OrderCardContent({children}: {children: React.ReactNode}) {
  return <div className={cn("gap-base flex flex-col")}>{children}</div>;
}

function OrderCardContextualButtons({children}: {children: React.ReactNode}) {
  return (
    <footer className={cn("grid grid-cols-2 gap-3.5", "z-10")}>
      {children}
    </footer>
  );
}
