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
  CheckoutInformation_CheckoutQuery,
  CheckoutInformationForm_CheckoutFragment,
} from "@/graphql/codegen/graphql";
import {IntlLink} from "@/i18n/components/IntlLink";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutInformation} from "../_actions/update-checkout-information";
import {
  CheckoutContactSection,
  SkeletonContactSection,
} from "./CheckoutContactSection";
import {
  CheckoutShippingAddress,
  SkeletonShippingAddress,
} from "./CheckoutShippingAddress";

export function CheckoutInformation({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutInformation_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return <CheckoutInformationForm checkout={data.checkout} />;
}

const CheckoutInformationForm_CheckoutFragment = graphql(`
  fragment CheckoutInformationForm_Checkout on Checkout {
    id
    ...CheckoutContactSection_Checkout
    ...CheckoutShippingAddress_Checkout
  }
`);

function CheckoutInformationForm({
  checkout,
}: {
  checkout: FragmentType<CheckoutInformationForm_CheckoutFragment>;
}) {
  const {data, complete} = useFragment({
    fragment: CheckoutInformationForm_CheckoutFragment,
    fragmentName: "CheckoutInformationForm_Checkout",
    from: checkout,
  });
  const [{errors}, formAction] = useActionState(updateCheckoutInformation, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  if (!complete) {
    return <SkeletonCheckoutInformation />;
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
      <CheckoutContactSection checkout={data} />
      <CheckoutShippingAddress checkout={data} />
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
        <IntlLink href={Routes.cart}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </IntlLink>
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
        <Button type="submit" size="large" isDisabled>
          <FormattedMessage id="DgnS8R" defaultMessage="Continue to shipping" />
        </Button>
        <IntlLink href={Routes.cart}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </IntlLink>
      </div>
    </div>
  );
}
