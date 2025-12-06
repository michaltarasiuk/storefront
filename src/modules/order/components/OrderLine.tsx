"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  PlaceholderProductThumbnail,
  ProductThumbnail,
  SkeletonProductThumbnail,
} from "#app/components/ProductThumbnail";
import {TaxedMoney} from "#app/components/TaxedMoney";
import {SkeletonText, Text} from "#app/components/Text";
import {graphql} from "#app/graphql/codegen";
import type {OrderLine_OrderFragment} from "#app/graphql/codegen/graphql";
import {useIntl} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

const OrderLine_OrderFragment = graphql(`
  fragment OrderLine_Order on OrderLine {
    id
    quantity
    variant {
      product {
        name
        ...ProductThumbnail_Product
      }
    }
    totalPrice {
      ...TaxedMoney_TaxedMoney @unmask
    }
  }
`);

interface OrderLineProps {
  orderLine: FragmentType<OrderLine_OrderFragment>;
}

export function OrderLine({orderLine}: OrderLineProps) {
  const {data, complete} = useFragment({
    fragment: OrderLine_OrderFragment,
    fragmentName: "OrderLine_Order",
    from: orderLine,
  });
  const intl = useIntl();
  if (!complete) {
    return <SkeletonOrderLine />;
  }
  return (
    <div className={cn("gap-base flex items-center justify-between")}>
      {isDefined(data.variant) ? (
        <ProductThumbnail product={data.variant.product} />
      ) : (
        <PlaceholderProductThumbnail />
      )}
      <div className={cn("flex-1")}>
        <Text>
          {isDefined(data.variant)
            ? data.variant.product.name
            : intl.formatMessage({
                id: "3kbIhS",
                defaultMessage: "Untitled",
              })}
        </Text>
      </div>
      <TaxedMoney taxedMoney={data.totalPrice} />
    </div>
  );
}

export function SkeletonOrderLine() {
  return (
    <div className={cn("gap-base flex items-center justify-between")}>
      <SkeletonProductThumbnail />
      <div className={cn("flex-1")}>
        <SkeletonText inlineSize="small" />
      </div>
      <SkeletonText inlineSize="small" />
    </div>
  );
}
