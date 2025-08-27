"use client";

import {
  type FragmentType,
  type QueryRef,
  useFragment,
  useReadQuery,
} from "@apollo/client";
import {notFound} from "next/navigation";
import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import type {
  CheckoutPayment_CheckoutQuery,
  CheckoutPaymentForm_CheckoutFragment,
} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutPayment} from "../_actions/update-checkout-payment";
import {
  CheckoutBillingAddressSection,
  SkeletonCheckoutBillingAddressSection,
} from "./CheckoutBillingAddressSection";

export function CheckoutPayment({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutPayment_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return <CheckoutPaymentForm checkout={data.checkout} />;
}

const CheckoutPaymentForm_CheckoutFragment = graphql(`
  fragment CheckoutPaymentForm_Checkout on Checkout {
    id
    ...CheckoutBillingAddressSection_Checkout
  }
`);

function CheckoutPaymentForm({
  checkout,
}: {
  checkout: FragmentType<CheckoutPaymentForm_CheckoutFragment>;
}) {
  const {data, complete} = useFragment({
    fragment: CheckoutPaymentForm_CheckoutFragment,
    fragmentName: "CheckoutPaymentForm_Checkout",
    from: checkout,
  });
  const [{errors}, formAction] = useActionState(updateCheckoutPayment, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  if (!complete) {
    return <SkeletonCheckoutPayment />;
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
      <CheckoutBillingAddressSection checkout={data} />
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

export function SkeletonCheckoutPayment() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonCheckoutBillingAddressSection />
      <div className={cn("gap-base flex flex-col")}>
        <Button type="submit" size="large" isDisabled>
          <FormattedMessage id="lD3+8a" defaultMessage="Pay" />
        </Button>
        <IntlLink href={Routes.checkout.shipping}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage id="Akc1Gk" defaultMessage="Return to shipping" />
        </IntlLink>
      </div>
    </div>
  );
}
