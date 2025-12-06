"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, redirect} from "next/navigation";

import {HeadingGroup} from "#app/components/Heading";
import {Routes} from "#app/consts/routes";
import type {CheckoutBilling_CheckoutQuery} from "#app/graphql/codegen/graphql";
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
  CheckoutBillingForm,
  SkeletonCheckoutBillingForm,
} from "./CheckoutBillingForm";

interface CheckoutBillingProps {
  queryRef: QueryRef<CheckoutBilling_CheckoutQuery>;
}

export function CheckoutBilling({queryRef}: CheckoutBillingProps) {
  const {data} = useReadQuery(queryRef);
  const basePathname = useBasePathname();
  if (!isDefined(data.checkout)) {
    notFound();
  } else if (!isDefined(data.checkout.deliveryMethod)) {
    redirect(joinPathSegments(...basePathname, Routes.checkout.delivery));
  }
  return (
    <CheckoutLayout summary={<CheckoutSummary checkout={data.checkout} />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <CheckoutBillingForm checkout={data.checkout} />
      </HeadingGroup>
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutBilling() {
  return (
    <CheckoutLayout summary={<SkeletonCheckoutSummary />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <SkeletonCheckoutBillingForm />
      </HeadingGroup>
    </CheckoutLayout>
  );
}
