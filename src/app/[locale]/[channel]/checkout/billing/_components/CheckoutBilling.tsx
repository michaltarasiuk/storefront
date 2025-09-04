"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {notFound} from "next/navigation";
import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "@/components/Button";
import {ChannelField} from "@/components/ChannelField";
import {Form} from "@/components/Form";
import {LocaleField} from "@/components/LocaleField";
import {Routes} from "@/consts/routes";
import type {CheckoutBilling_CheckoutQuery} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateBilling} from "../../_actions/update-billing";
import {ReturnLink} from "../../_components/ReturnLink";
import {BillingAddress, SkeletonBillingAddress} from "./BillingAddress";

export function CheckoutBillingForm({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutBilling_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  const [{errors}, formAction] = useActionState(updateBilling, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
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
      <BillingAddress checkout={data.checkout} />
      <LocaleField />
      <ChannelField />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isDisabled={isPending}
          isPending={isPending}>
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
        <ReturnLink href={Routes.checkout.delivery}>
          <FormattedMessage id="HJkcfg" defaultMessage="Return to delivery" />
        </ReturnLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutBillingForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonBillingAddress />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large" isDisabled>
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
        <ReturnLink href={Routes.checkout.delivery}>
          <FormattedMessage id="HJkcfg" defaultMessage="Return to delivery" />
        </ReturnLink>
      </div>
    </div>
  );
}
