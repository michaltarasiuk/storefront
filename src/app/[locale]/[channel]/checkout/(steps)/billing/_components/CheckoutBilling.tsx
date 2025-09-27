"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound, redirect} from "next/navigation";
import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "@/components/Button";
import {ChannelField} from "@/components/ChannelField";
import {Form} from "@/components/Form";
import {LocaleField} from "@/components/LocaleField";
import {Routes} from "@/consts/routes";
import type {CheckoutBilling_CheckoutQuery} from "@/graphql/codegen/graphql";
import {useBasePathname} from "@/hooks/use-base-pathname";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

import {updateBilling} from "../../_actions/update-billing";
import {ReturnLink} from "../../_components/ReturnLink";
import {BillingAddress, SkeletonBillingAddress} from "./BillingAddress";
import {
  BillingReviewList,
  SkeletonBillingReviewList,
} from "./BillingReviewList";

export function CheckoutBilling({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutBilling_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  const [{errors}, formAction] = useActionState(updateBilling, {
    errors: {},
  });
  const basePathname = useBasePathname();
  const [isPending, startTransition] = useTransition();
  if (!isDefined(data.checkout)) {
    notFound();
  } else if (!isDefined(data.checkout.deliveryMethod)) {
    redirect(joinPathSegments(...basePathname, Routes.checkout.delivery));
  }
  return (
    <Form
      validationErrors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        startTransition(() => {
          invariant(event.target instanceof HTMLFormElement);
          const formData = new FormData(event.target);
          formAction(formData);
        });
      }}
      className={cn("space-y-large-300")}>
      <BillingReviewList checkout={data.checkout} />
      <BillingAddress checkout={data.checkout} />
      <LocaleField />
      <ChannelField />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isDisabled={isPending}
          isPending={isPending}>
          <FormattedMessage id="vqYYF3" defaultMessage="Continue to review" />
        </Button>
        <ReturnLink href={Routes.checkout.delivery}>
          <FormattedMessage id="HJkcfg" defaultMessage="Return to delivery" />
        </ReturnLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutBilling() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonBillingReviewList />
      <SkeletonBillingAddress />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large" isDisabled>
          <FormattedMessage id="vqYYF3" defaultMessage="Continue to review" />
        </Button>
        <ReturnLink href={Routes.checkout.delivery}>
          <FormattedMessage id="HJkcfg" defaultMessage="Return to delivery" />
        </ReturnLink>
      </div>
    </div>
  );
}
