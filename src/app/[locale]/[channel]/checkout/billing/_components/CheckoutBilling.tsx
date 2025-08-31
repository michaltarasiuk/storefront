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
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateBilling} from "../../_actions/update-billing";
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
      <CheckoutBillingActions>
        <Button
          type="submit"
          size="large"
          isPending={isPending}
          isDisabled={isPending}>
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
      </CheckoutBillingActions>
    </Form>
  );
}

export function SkeletonCheckoutBillingForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonBillingAddress />
      <CheckoutBillingActions>
        <Button type="submit" size="large" isDisabled>
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
      </CheckoutBillingActions>
    </div>
  );
}

function CheckoutBillingActions({children}: {children: React.ReactNode}) {
  return (
    <div className={cn("gap-base flex flex-col")}>
      {children}
      <IntlLink href={Routes.checkout.delivery}>
        <ChevronLeftIcon aria-hidden className={cn("stroke-base-accent")} />
        <FormattedMessage id="Akc1Gk" defaultMessage="Return to shipping" />
      </IntlLink>
    </div>
  );
}
