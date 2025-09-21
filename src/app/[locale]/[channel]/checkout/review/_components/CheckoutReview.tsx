"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import type {CheckoutReview_CheckoutQuery} from "@/graphql/codegen/graphql";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {
  CompleteOrderButton,
  SkeletonCompleteOrderButton,
} from "./CompleteOrderButton";
import {OrderReviewList, SkeletonOrderReviewList} from "./OrderReviewList";

export function CheckoutReview({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutReview_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return (
    <div className={cn("gap-large-300 flex flex-col")}>
      <OrderReviewList checkout={data.checkout} />
      <CompleteOrderButton />
    </div>
  );
}

export function SkeletonCheckoutReview() {
  return (
    <div className={cn("gap-large-300 flex flex-col")}>
      <SkeletonOrderReviewList />
      <SkeletonCompleteOrderButton />
    </div>
  );
}
