"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import type {CheckoutReview_CheckoutQuery} from "#app/graphql/codegen/graphql";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

import {CheckoutLayout} from "../../../_components/CheckoutLayout";
import {CheckoutBreadcrumbs} from "../../_components/CheckoutBreadcrumbs";
import {
  CheckoutSummary,
  SkeletonCheckoutSummary,
} from "../../_components/CheckoutSummary";
import {
  CompleteOrderButton,
  SkeletonCompleteOrderButton,
} from "./CompleteOrderButton";
import {OrderReviewList, SkeletonOrderReviewList} from "./OrderReviewList";

interface CheckoutReviewProps {
  queryRef: QueryRef<CheckoutReview_CheckoutQuery>;
}

export function CheckoutReview({queryRef}: CheckoutReviewProps) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return (
    <CheckoutLayout summary={<CheckoutSummary checkout={data.checkout} />}>
      <CheckoutBreadcrumbs />
      <div className={cn("space-y-large-300")}>
        <OrderReviewList checkout={data.checkout} />
        <CompleteOrderButton />
      </div>
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutReview() {
  return (
    <CheckoutLayout summary={<SkeletonCheckoutSummary />}>
      <CheckoutBreadcrumbs />
      <div className={cn("space-y-large-300")}>
        <SkeletonOrderReviewList />
        <SkeletonCompleteOrderButton />
      </div>
    </CheckoutLayout>
  );
}
