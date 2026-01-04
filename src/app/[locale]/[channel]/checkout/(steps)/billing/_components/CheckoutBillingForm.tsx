"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "#app/components/Button";
import {ChannelField} from "#app/components/ChannelField";
import {Form} from "#app/components/Form";
import {LocaleField} from "#app/components/LocaleField";
import {ROUTES} from "#app/consts/routes";
import {graphql} from "#app/graphql/codegen";
import type {CheckoutBillingForm_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

import {updateCheckoutBillingAction} from "../../_actions/update-billing";
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
  const [{errors}, formAction] = useActionState(updateCheckoutBillingAction, {
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
        <ReturnLink href={ROUTES.checkout.delivery}>
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
        <ReturnLink href={ROUTES.checkout.delivery}>
          <FormattedMessage id="HJkcfg" defaultMessage="Return to delivery" />
        </ReturnLink>
      </div>
    </div>
  );
}
