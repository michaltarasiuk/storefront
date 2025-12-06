"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {graphql} from "#app/graphql/codegen";
import type {CheckoutLines_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {cn} from "#app/utils/cn";

import {CheckoutLine, SkeletonCheckoutLine} from "./CheckoutLine";

const CheckoutLines_CheckoutFragment = graphql(`
  fragment CheckoutLines_Checkout on Checkout {
    id
    lines {
      id
      ...CheckoutLine_Checkout
    }
  }
`);

interface CheckoutLinesProps {
  checkout: FragmentType<CheckoutLines_CheckoutFragment>;
}

export function CheckoutLines({checkout}: CheckoutLinesProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutLines_CheckoutFragment,
    fragmentName: "CheckoutLines_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutLines />;
  }
  return (
    <ul className={cn("space-y-base")}>
      {data.lines.map((checkoutLine) => (
        <li key={checkoutLine.id}>
          <CheckoutLine checkoutLine={checkoutLine} />
        </li>
      ))}
    </ul>
  );
}

export function SkeletonCheckoutLines() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonCheckoutLine />
      <SkeletonCheckoutLine />
      <SkeletonCheckoutLine />
    </div>
  );
}
