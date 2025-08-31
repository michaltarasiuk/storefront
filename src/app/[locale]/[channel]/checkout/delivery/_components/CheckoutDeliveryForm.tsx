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
import type {CheckoutDelivery_CheckoutQuery} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateDelivery} from "../../_actions/update-delivery";
import {ShippingMethods, SkeletonShippingMethods} from "./ShippingMethods";

export function CheckoutDeliveryForm({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutDelivery_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  const [{errors}, formAction] = useActionState(updateDelivery, {
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
      <ShippingMethods checkout={data.checkout} />
      <LocaleField />
      <ChannelField />
      <CheckoutDeliveryActions>
        <Button
          type="submit"
          size="large"
          isPending={isPending}
          isDisabled={isPending}>
          <FormattedMessage id="xwOhyd" defaultMessage="Continue to delivery" />
        </Button>
      </CheckoutDeliveryActions>
    </Form>
  );
}

export function SkeletonCheckoutDeliveryForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonShippingMethods />
      <CheckoutDeliveryActions>
        <Button type="submit" size="large" isDisabled>
          <FormattedMessage id="xwOhyd" defaultMessage="Continue to delivery" />
        </Button>
      </CheckoutDeliveryActions>
    </div>
  );
}

function CheckoutDeliveryActions({children}: {children: React.ReactNode}) {
  return (
    <div className={cn("gap-base flex flex-col")}>
      {children}
      <IntlLink href={Routes.checkout.information}>
        <ChevronLeftIcon aria-hidden className={cn("stroke-base-accent")} />
        <FormattedMessage id="k2CDuD" defaultMessage="Return to information" />
      </IntlLink>
    </div>
  );
}
