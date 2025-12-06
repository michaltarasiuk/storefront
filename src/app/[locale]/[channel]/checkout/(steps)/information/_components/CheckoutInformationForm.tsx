"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "#app/components/Button";
import {ChannelField} from "#app/components/ChannelField";
import {Form} from "#app/components/Form";
import {LocaleField} from "#app/components/LocaleField";
import {Routes} from "#app/consts/routes";
import {graphql} from "#app/graphql/codegen";
import type {CheckoutInformationForm_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

import {updateCheckoutInformation} from "../../_actions/update-information";
import {ReturnLink} from "../../_components/ReturnLink";
import {ContactSection, SkeletonContactSection} from "./ContactSection";
import {ShippingAddress, SkeletonShippingAddress} from "./ShippingAddress";

const CheckoutInformationForm_CheckoutFragment = graphql(`
  fragment CheckoutInformationForm_Checkout on Checkout {
    id
    ...ContactSection_Checkout
    ...ShippingAddress_Checkout
  }
`);

interface CheckoutInformationFormProps {
  checkout: FragmentType<CheckoutInformationForm_CheckoutFragment>;
}

export function CheckoutInformationForm({
  checkout,
}: CheckoutInformationFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutInformation, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const {data, complete} = useFragment({
    fragment: CheckoutInformationForm_CheckoutFragment,
    fragmentName: "CheckoutInformationForm_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonCheckoutInformationForm />;
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
      <ContactSection checkout={data} />
      <ShippingAddress checkout={data} />
      <LocaleField />
      <ChannelField />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isDisabled={isPending}
          isPending={isPending}>
          <FormattedMessage id="xwOhyd" defaultMessage="Continue to delivery" />
        </Button>
        <ReturnLink href={Routes.cart}>
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </ReturnLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutInformationForm() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonContactSection />
      <SkeletonShippingAddress />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large" isDisabled>
          <FormattedMessage id="xwOhyd" defaultMessage="Continue to delivery" />
        </Button>
        <ReturnLink href={Routes.cart}>
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </ReturnLink>
      </div>
    </div>
  );
}
