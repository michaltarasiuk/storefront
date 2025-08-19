"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {Skeleton} from "@/components/Skeleton";
import {Routes} from "@/consts/routes";
import type {CheckoutShipping_CheckoutQuery} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutShipping} from "../_actions/update-checkout-shipping";
import {redirectToRoot} from "../_utils/redirect-to-root";

interface CheckoutShippingFormProps {
  queryRef: QueryRef<CheckoutShipping_CheckoutQuery>;
}

export function CheckoutShippingForm({queryRef}: CheckoutShippingFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutShipping, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    redirectToRoot();
  }
  return (
    <Form
      validationErrors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData));
      }}
      className={cn("space-y-large-300")}>
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isPending={isPending}
          isDisabled={isPending}>
          <FormattedMessage id="DgnS8R" defaultMessage="Continue to shipping" />
        </Button>
        <IntlLink href={Routes.checkout.information}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage
            id="k2CDuD"
            defaultMessage="Return to information"
          />
        </IntlLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutShippingForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <div className={cn("gap-base flex flex-col")}>
        <Skeleton className={cn("h-16")} />
        <Skeleton className={cn("h-5")} />
      </div>
    </div>
  );
}
