"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import {HeadingGroup} from "@/components/Heading";
import type {CheckoutSteps_CheckoutQuery} from "@/graphql/codegen/graphql";
import {isDefined} from "@/utils/is-defined";

import {CheckoutLayout} from "../../_components/CheckoutLayout";
import {CheckoutBreadcrumbs} from "./CheckoutBreadcrumbs";
import {CheckoutSummary, SkeletonCheckoutSummary} from "./CheckoutSummary";

interface CheckoutStepsProps {
  queryRef: QueryRef<CheckoutSteps_CheckoutQuery>;
  children: React.ReactNode;
}

export function CheckoutSteps({queryRef, children}: CheckoutStepsProps) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return (
    <CheckoutLayout summary={<CheckoutSummary checkout={data.checkout} />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>{children}</HeadingGroup>
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutSteps({children}: {children: React.ReactNode}) {
  return (
    <CheckoutLayout summary={<SkeletonCheckoutSummary />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>{children}</HeadingGroup>
    </CheckoutLayout>
  );
}
