"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {Skeleton} from "@/components/Skeleton";
import {Routes} from "@/consts/routes";
import type {CheckoutPayment_CheckoutQuery} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutPayment} from "../_actions/update-checkout-payment";
import {redirectToRoot} from "../_utils/redirect-to-root";

interface CheckoutPaymentFormProps {
  queryRef: QueryRef<CheckoutPayment_CheckoutQuery>;
}

export function CheckoutPaymentForm({queryRef}: CheckoutPaymentFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutPayment, {
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
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
        <IntlLink href={Routes.checkout.shipping}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage id="Akc1Gk" defaultMessage="Return to shipping" />
        </IntlLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutPaymentForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <div className={cn("gap-base flex flex-col")}>
        <Skeleton className={cn("h-16")} />
        <Skeleton className={cn("h-5")} />
      </div>
    </div>
  );
}
