"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";

import {HeadingGroup} from "#app/components/Heading";
import type {CheckoutInformation_CheckoutQuery} from "#app/graphql/codegen/graphql";
import {isDefined} from "#app/utils/is-defined";

import {CheckoutLayout} from "../../../_components/CheckoutLayout";
import {CheckoutBreadcrumbs} from "../../_components/CheckoutBreadcrumbs";
import {
  CheckoutSummary,
  SkeletonCheckoutSummary,
} from "../../_components/CheckoutSummary";
import {
  CheckoutInformationForm,
  SkeletonCheckoutInformationForm,
} from "./CheckoutInformationForm";

interface CheckoutInformationProps {
  queryRef: QueryRef<CheckoutInformation_CheckoutQuery>;
}

export function CheckoutInformation({queryRef}: CheckoutInformationProps) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return (
    <CheckoutLayout summary={<CheckoutSummary checkout={data.checkout} />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <CheckoutInformationForm checkout={data.checkout} />
      </HeadingGroup>
    </CheckoutLayout>
  );
}

export function SkeletonCheckoutInformation() {
  return (
    <CheckoutLayout summary={<SkeletonCheckoutSummary />}>
      <CheckoutBreadcrumbs />
      <HeadingGroup>
        <SkeletonCheckoutInformationForm />
      </HeadingGroup>
    </CheckoutLayout>
  );
}
