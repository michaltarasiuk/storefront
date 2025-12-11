"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, redirect} from "next/navigation";

import {HeadingGroup} from "#app/components/Heading";
import {routes} from "#app/consts/routes";
import type {CheckoutDelivery_CheckoutQuery} from "#app/graphql/codegen/graphql";
import {useBasePathname} from "#app/hooks/use-base-pathname";
import {isDefined} from "#app/utils/is-defined";
import {joinPathSegments} from "#app/utils/pathname";

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
    redirect(joinPathSegments(...basePathname, routes.checkout.information));
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
