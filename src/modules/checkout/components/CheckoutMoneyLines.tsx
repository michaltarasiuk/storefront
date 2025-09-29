"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Money} from "@/components/Money";
import {TaxedMoney} from "@/components/TaxedMoney";
import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {CheckoutMoneyLines_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

const CheckoutMoneyLines_CheckoutFragment = graphql(`
  fragment CheckoutMoneyLines_Checkout on Checkout {
    id
    subtotalPrice {
      ...TaxedMoney_TaxedMoney @unmask
    }
    totalPrice {
      ...TaxedMoney_TaxedMoney @unmask
    }
  }
`);

interface CheckoutMoneyLinesProps {
  checkout: FragmentType<CheckoutMoneyLines_CheckoutFragment>;
}

export function CheckoutMoneyLines({checkout}: CheckoutMoneyLinesProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutMoneyLines_CheckoutFragment,
    fragmentName: "CheckoutMoneyLines_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutMoneyLines />;
  }
  return (
    <div className={cn("space-y-small-300")}>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="L8seEc" defaultMessage="Subtotal" />
        </Text>
        <TaxedMoney taxedMoney={data.subtotalPrice} />
      </div>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="PRlD0A" defaultMessage="Shipping" />
        </Text>
        <Text appearance="subdued">
          <FormattedMessage
            id="/Da0uc"
            defaultMessage="Enter shipping address"
          />
        </Text>
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
        <TaxedMoney
          taxedMoney={data.totalPrice}
          size="large"
          emphasis="semibold"
        />
      </div>
    </div>
  );
}

export function SkeletonCheckoutMoneyLines() {
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
        <SkeletonText inlineSize="small" />
        <SkeletonText inlineSize="small" />
      </div>
      <div className={cn("flex justify-between")}>
        <SkeletonText size="large" />
        <SkeletonText size="large" />
      </div>
    </div>
  );
}
