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
import type {CheckoutInformation_CheckoutQuery} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateInformation} from "../../_actions/update-information";
import {ReturnLink} from "../../_components/ReturnLink";
import {Contact, SkeletonContact} from "./Contact";
import {ShippingAddress, SkeletonShippingAddress} from "./ShippingAddress";

export function CheckoutInformation({
  queryRef,
}: {
  queryRef: QueryRef<CheckoutInformation_CheckoutQuery>;
}) {
  const {data} = useReadQuery(queryRef);
  const [{errors}, formAction] = useActionState(updateInformation, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  if (!isDefined(data.checkout)) {
    notFound();
  }
  return (
    <Form
      validationErrors={errors}
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        startTransition(() => {
          invariant(event.target instanceof HTMLFormElement);
          const formData = new FormData(event.target);
          formAction(formData);
        });
      }}
      className={cn("space-y-large-300")}>
      <Contact checkout={data.checkout} />
      <ShippingAddress checkout={data.checkout} />
      <LocaleField />
      <ChannelField />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isDisabled={isPending}
          isPending={isPending}>
          <FormattedMessage id="DgnS8R" defaultMessage="Continue to shipping" />
        </Button>
        <ReturnLink href={Routes.cart}>
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </ReturnLink>
      </div>
    </Form>
  );
}

export function SkeletonCheckoutInformation() {
  return (
    <div className={cn("space-y-large-300")}>
      <SkeletonContact />
      <SkeletonShippingAddress />
      <div className={cn("gap-base flex flex-col")}>
        <Button size="large" isDisabled>
          <FormattedMessage id="DgnS8R" defaultMessage="Continue to shipping" />
        </Button>
        <ReturnLink href={Routes.cart}>
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </ReturnLink>
      </div>
    </div>
  );
}
