"use client";

import {Button} from "@/components/Button";
import {Skeleton, SkeletonText} from "@/components/Skeleton";
import {Text} from "@/components/Text";
import {Routes} from "@/consts/routes";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedDate, FormattedMessage} from "@/i18n/react-intl";
import {SuccessIcon} from "@/icons/SuccessIcon";
import {cn} from "@/utils/cn";

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
            role="status"
            aria-live="polite"
            emphasis="semibold"
            className={cn("[grid-area:status]")}>
            <FormattedMessage id="dX7+Rv" defaultMessage="Confirmed" />
          </Text>
          <Text className={cn("[grid-area:updated]")}>
            <FormattedDate value={new Date()} month="short" day="numeric" />
          </Text>
        </OrderCardStatus>
      </OrderCardHeader>
      <OrderCardContent>
        <div className={cn("flex flex-col")}>
          <Text emphasis="semibold">
            <FormattedMessage
              id="ItDqLZ"
              defaultMessage="{count} items"
              values={{count: 3}}
            />
          </Text>
          <Text appearance="subdued">
            <FormattedMessage
              id="I4Qr0O"
              defaultMessage="Order #{number}"
              values={{number: "1014"}}
            />
          </Text>
        </div>
        <Text emphasis="semibold">$75.55</Text>
      </OrderCardContent>
      <OrderCardContextualButtons>
        <Button>
          <FormattedMessage id="7tOz+m" defaultMessage="Pay now" />
        </Button>
        <Button kind="secondary">
          <FormattedMessage id="0Azlrb" defaultMessage="Manage" />
        </Button>
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
        <Button>
          <FormattedMessage id="7tOz+m" defaultMessage="Pay now" />
        </Button>
        <Button kind="secondary">
          <FormattedMessage id="0Azlrb" defaultMessage="Manage" />
        </Button>
      </OrderCardContextualButtons>
    </OrderCardRoot>
  );
}

function OrderCardRoot({children}: {children: React.ReactNode}) {
  return (
    <article
      className={cn(
        "gap-large-200 bg-base-background p-large-200 rounded-large relative flex flex-col",
      )}>
      {children}
    </article>
  );
}

function OrderCardLink({id}: {id: string}) {
  return (
    <IntlLink
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
        "gap-x-small-300 grid grid-cols-[auto_1fr] grid-rows-2 items-center",
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
    <footer className={cn("gap-base z-10 grid grid-cols-2")}>{children}</footer>
  );
}
