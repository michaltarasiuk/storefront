"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "@/components/Button";
import {ChannelField} from "@/components/ChannelField";
import {Form} from "@/components/Form";
import {LocaleField} from "@/components/LocaleField";
import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import type {CheckoutBillingForm_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {updateCheckoutBilling} from "../../_actions/update-billing";
import {ReturnLink} from "../../_components/ReturnLink";
import {BillingAddress, SkeletonBillingAddress} from "./BillingAddress";
import {
  BillingReviewList,
  SkeletonBillingReviewList,
} from "./BillingReviewList";

const CheckoutBillingForm_CheckoutFragment = graphql(`
  fragment CheckoutBillingForm_Checkout on Checkout {
    id
    ...BillingReviewList_Checkout
    ...BillingAddress_Checkout
  }
`);

interface CheckoutBillingFormProps {
  checkout: FragmentType<CheckoutBillingForm_CheckoutFragment>;
}

export function CheckoutBillingForm({checkout}: CheckoutBillingFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutBilling, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const {data, complete} = useFragment({
    fragment: CheckoutBillingForm_CheckoutFragment,
    fragmentName: "CheckoutBillingForm_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutBillingForm />;
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
      <BillingReviewList checkout={data} />
      <BillingAddress checkout={data} />
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

export function SkeletonCheckoutBillingForm() {
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
