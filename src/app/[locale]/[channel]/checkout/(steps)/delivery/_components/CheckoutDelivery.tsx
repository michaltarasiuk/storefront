"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, redirect} from "next/navigation";

import {HeadingGroup} from "@/components/Heading";
import {Routes} from "@/consts/routes";
import type {CheckoutDelivery_CheckoutQuery} from "@/graphql/codegen/graphql";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

import {CheckoutLayout} from "../../../_components/CheckoutLayout";
import {CheckoutBreadcrumbs} from "../../_components/CheckoutBreadcrumbs";
import {
  CheckoutSummary,
  SkeletonCheckoutSummary,
} from "../../_components/CheckoutSummary";
import {
  CheckoutDeliveryForm,
  SkeletonCheckoutDeliveryForm,
} from "./CheckoutDeliveryForm";

interface CheckoutDeliveryProps {
  queryRef: QueryRef<CheckoutDelivery_CheckoutQuery>;
}

export function CheckoutDelivery({queryRef}: CheckoutDeliveryProps) {
  const {data} = useReadQuery(queryRef);
  const basePathname = useBasePathname();
  if (!isDefined(data.checkout)) {
    notFound();
  } else if (!isDefined(data.checkout.shippingAddress)) {
    redirect(joinPathSegments(...basePathname, Routes.checkout.information));
  }
  return (
    <CheckoutLayout summary={<CheckoutSummary checkout={data.checkout} />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <CheckoutDeliveryForm checkout={data.checkout} />
      </HeadingGroup>
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutDelivery() {
  return (
    <CheckoutLayout summary={<SkeletonCheckoutSummary />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <SkeletonCheckoutDeliveryForm />
      </HeadingGroup>
    </CheckoutLayout>
  );
}
