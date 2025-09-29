"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Money} from "@/components/Money";
import {TaxedMoney} from "@/components/TaxedMoney";
import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {OrderMoneyLines_OrderFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

const OrderMoneyLines_OrderFragment = graphql(`
  fragment OrderMoneyLines_Order on Order {
    id
    subtotal {
      ...TaxedMoney_TaxedMoney @unmask
    }
    total {
      ...TaxedMoney_TaxedMoney @unmask
    }
  }
`);

interface OrderMoneyLinesProps {
  order: FragmentType<OrderMoneyLines_OrderFragment>;
}

export function OrderMoneyLines({order}: OrderMoneyLinesProps) {
  const {data, complete} = useFragment({
    fragment: OrderMoneyLines_OrderFragment,
    fragmentName: "OrderMoneyLines_Order",
    from: order,
  });
  if (!complete) {
    return <SkeletonOrderMoneyLines />;
  }
  return (
    <div className={cn("space-y-small-300")}>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="L8seEc" defaultMessage="Subtotal" />
        </Text>
        <TaxedMoney taxedMoney={data.subtotal} />
      </div>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="PRlD0A" defaultMessage="Shipping" />
        </Text>
        <Money
          money={{
            currency: "USD",
            amount: 0,
          }}
        />
      </div>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="r+dgiv" defaultMessage="Taxes" />
        </Text>
        <Money
          money={{
            currency: "USD",
            amount: 0,
          }}
        />
      </div>
      <div className={cn("flex justify-between")}>
        <Text size="large" emphasis="semibold">
          <FormattedMessage id="MJ2jZQ" defaultMessage="Total" />
        </Text>
        <TaxedMoney taxedMoney={data.total} size="large" emphasis="semibold" />
      </div>
    </div>
  );
}

export function SkeletonOrderMoneyLines() {
  return (
    <div className={cn("space-y-small-300")}>
      <div className={cn("flex justify-between")}>
        <SkeletonText inlineSize="small" />
        <SkeletonText inlineSize="small" />
      </div>
      <div className={cn("flex justify-between")}>
        <SkeletonText inlineSize="small" />
        <SkeletonText inlineSize="small" />
      </div>
      <div className={cn("flex justify-between")}>
        <SkeletonText />
        <SkeletonText inlineSize="small" />
      </div>
      <div className={cn("flex justify-between")}>
        <SkeletonText size="large" inlineSize="small" />
        <SkeletonText size="large" inlineSize="small" />
      </div>
    </div>
  );
}
