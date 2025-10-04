"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Money} from "@/components/Money";
import {TaxedMoney} from "@/components/TaxedMoney";
import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {CheckoutMoneyLines_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {isShippingMethod} from "../../../utils/delivery-method";

const CheckoutMoneyLines_CheckoutFragment = graphql(`
  fragment CheckoutMoneyLines_Checkout on Checkout {
    id
    subtotalPrice {
      ...TaxedMoney_TaxedMoney @unmask
    }
    deliveryMethod {
      __typename
      ... on ShippingMethod {
        price {
          ...Money_Money @unmask
        }
      }
    }
    totalPrice {
      tax {
        ...Money_Money @unmask
      }
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
          <FormattedMessage id="drqP2L" defaultMessage="Delivery" />
        </Text>
        {!isDefined(data.deliveryMethod) ? (
          <Text appearance="subdued">
            <FormattedMessage
              id="Qu4wRW"
              defaultMessage="Select delivery method"
            />
          </Text>
        ) : !isShippingMethod(data.deliveryMethod) ? (
          <Text emphasis="semibold">
            <FormattedMessage id="Fce58X" defaultMessage="No delivery charge" />
          </Text>
        ) : (
          <Text>
            <Money money={data.deliveryMethod.price} />
          </Text>
        )}
      </div>
      <div className={cn("flex justify-between")}>
        <Text>
          <FormattedMessage id="r+dgiv" defaultMessage="Taxes" />
        </Text>
        <Money money={data.totalPrice.tax} />
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
