"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Money} from "@/components/Money";
import {TaxedMoney} from "@/components/TaxedMoney";
import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {OrderMoneyLines_OrderFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isShippingMethod} from "@/utils/delivery-method";
import {isDefined} from "@/utils/is-defined";

const OrderMoneyLines_OrderFragment = graphql(`
  fragment OrderMoneyLines_Order on Order {
    id
    subtotal {
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
    total {
      tax {
        ...Money_Money @unmask
      }
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
        <Money money={data.total.tax} />
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
