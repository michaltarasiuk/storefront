"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  ProductThumbnail,
  SkeletonProductThumbnail,
} from "@/components/ProductThumbnail";
import {TaxedMoney} from "@/components/TaxedMoney";
import {SkeletonText, Text} from "@/components/Text";
import {graphql} from "@/graphql/codegen";
import type {OrderLine_OrderFragment} from "@/graphql/codegen/graphql";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

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
  if (!isDefined(data.variant) || !complete) {
    return <SkeletonOrderLine />;
  }
  return (
    <div className={cn("gap-base flex items-center justify-between")}>
      <ProductThumbnail product={data.variant.product} />
      <div className={cn("flex-1")}>
        <Text>{data.variant.product.name}</Text>
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
