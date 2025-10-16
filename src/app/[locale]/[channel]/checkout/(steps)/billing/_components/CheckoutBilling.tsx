"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, redirect} from "next/navigation";

import {HeadingGroup} from "@/components/Heading";
import {Routes} from "@/consts/routes";
import type {CheckoutBilling_CheckoutQuery} from "@/graphql/codegen/graphql";
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
