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
import {ChannelField} from "@/components/ChannelField";
import {Form} from "@/components/Form";
import {LocaleField} from "@/components/LocaleField";
import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import type {
  CheckoutShipping_CheckoutQuery,
  CheckoutShippingForm_CheckoutFragment,
} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutShipping} from "../_actions/update-checkout-shipping";
import {
  CheckoutShippingMethods,
  SkeletonCheckoutShippingMethods,
} from "./CheckoutShippingMethods";

export function CheckoutShipping({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutShipping_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return <CheckoutShippingForm checkout={data.checkout} />;
}

const CheckoutShippingForm_CheckoutFragment = graphql(`
  fragment CheckoutShippingForm_Checkout on Checkout {
    id
    ...CheckoutShippingMethods_Checkout
  }
`);

function CheckoutShippingForm({
  checkout,
}: {
  checkout: FragmentType<CheckoutShippingForm_CheckoutFragment>;
}) {
  const {data, complete} = useFragment({
    fragment: CheckoutShippingForm_CheckoutFragment,
    fragmentName: "CheckoutShippingForm_Checkout",
    from: checkout,
  });
  const [{errors}, formAction] = useActionState(updateCheckoutShipping, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  if (!complete) {
    return <SkeletonCheckoutShipping />;
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
      <CheckoutShippingMethods checkout={data} />
      <LocaleField />
      <ChannelField />
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

export function SkeletonCheckoutShipping() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonCheckoutShippingMethods />
      <div className={cn("gap-base flex flex-col")}>
        <Button type="submit" size="large" isDisabled>
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
    </div>
  );
}
