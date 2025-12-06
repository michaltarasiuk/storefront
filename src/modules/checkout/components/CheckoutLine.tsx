"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  ProductThumbnail,
  SkeletonProductThumbnail,
} from "#app/components/ProductThumbnail";
import {TaxedMoney} from "#app/components/TaxedMoney";
import {SkeletonText, Text} from "#app/components/Text";
import {graphql} from "#app/graphql/codegen";
import type {CheckoutLine_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {cn} from "#app/utils/cn";

const CheckoutLine_CheckoutFragment = graphql(`
  fragment CheckoutLine_Checkout on CheckoutLine {
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

interface CheckoutLineProps {
  checkoutLine: FragmentType<CheckoutLine_CheckoutFragment>;
}

export function CheckoutLine({checkoutLine}: CheckoutLineProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutLine_CheckoutFragment,
    fragmentName: "CheckoutLine_Checkout",
    from: checkoutLine,
  });
  if (!complete) {
    return <SkeletonCheckoutLine />;
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

export function SkeletonCheckoutLine() {
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
