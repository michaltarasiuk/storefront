"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {Skeleton} from "@/components/Skeleton";
import type {CheckoutInformation_CheckoutQuery} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {redirectToRoot} from "../../_utils/redirect-to-root";
import {ContactSection, SkeletonContactSection} from "./ContactSection";
import {ShippingAddress, SkeletonShippingAddress} from "./ShippingAddress";

export function CheckoutInformation({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutInformation_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    redirectToRoot();
  }
  return (
    <Form className={cn("space-y-large-300")}>
      <ContactSection checkout={data.checkout} />
      <ShippingAddress checkout={data.checkout} />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large">
          <FormattedMessage defaultMessage="Continue to shipping" id="DgnS8R" />
        </Button>
        <Button kind="plain">
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage defaultMessage="Return to cart" id="MRNNXA" />
        </Button>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutInformation() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonContactSection />
      <SkeletonShippingAddress />
      <div className={cn("gap-base flex flex-col")}>
        <Skeleton className={cn("h-16")} />
        <Skeleton className={cn("h-12")} />
      </div>
    </div>
  );
}
