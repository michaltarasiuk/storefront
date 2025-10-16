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
import type {CheckoutDeliveryForm_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {updateCheckoutDelivery} from "../../_actions/update-delivery";
import {ReturnLink} from "../../_components/ReturnLink";
import {
  DeliveryReviewList,
  SkeletonDeliveryReviewList,
} from "./DeliveryReviewList";
import {DeliverySection} from "./DeliverySection";
import {SkeletonDeliverySection} from "./DeliverySection";

const CheckoutDeliveryForm_CheckoutFragment = graphql(`
  fragment CheckoutDeliveryForm_Checkout on Checkout {
    id
    ...DeliveryReviewList_Checkout
    ...DeliverySection_Checkout
  }
`);

interface CheckoutDeliveryFormProps {
  checkout: FragmentType<CheckoutDeliveryForm_CheckoutFragment>;
}

export function CheckoutDeliveryForm({checkout}: CheckoutDeliveryFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutDelivery, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const {data, complete} = useFragment({
    fragment: CheckoutDeliveryForm_CheckoutFragment,
    fragmentName: "CheckoutDeliveryForm_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutDeliveryForm />;
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
      <DeliveryReviewList checkout={data} />
      <DeliverySection checkout={data} />
      <LocaleField />
      <ChannelField />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isDisabled={isPending}
          isPending={isPending}>
          <FormattedMessage id="0s5kDf" defaultMessage="Continue to billing" />
        </Button>
        <ReturnLink href={Routes.checkout.information}>
          <FormattedMessage
            id="k2CDuD"
            defaultMessage="Return to information"
          />
        </ReturnLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutDeliveryForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonDeliveryReviewList />
      <SkeletonDeliverySection />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large" isDisabled>
          <FormattedMessage id="0s5kDf" defaultMessage="Continue to billing" />
        </Button>
        <ReturnLink href={Routes.checkout.information}>
          <FormattedMessage
            id="k2CDuD"
            defaultMessage="Return to information"
          />
        </ReturnLink>
      </div>
    </div>
  );
}
