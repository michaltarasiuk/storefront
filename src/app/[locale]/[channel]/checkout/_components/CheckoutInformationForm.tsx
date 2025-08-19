"use client";

import {type QueryRef, useReadQuery} from "@apollo/client";
import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {Link} from "@/components/Link";
import {Skeleton} from "@/components/Skeleton";
import {Routes} from "@/consts/routes";
import type {CheckoutInformation_CheckoutQuery} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {ChevronLeftIcon} from "@/icons/ChevronLeftIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {updateCheckoutInformation} from "../_actions/update-checkout-information";
import {redirectToRoot} from "../_utils/redirect-to-root";
import {
  CheckoutContactSection,
  SkeletonContactSection,
} from "./CheckoutContactSection";
import {
  CheckoutShippingAddress,
  SkeletonShippingAddress,
} from "./CheckoutShippingAddress";

interface CheckoutInformationFormProps {
  queryRef: QueryRef<CheckoutInformation_CheckoutQuery>;
}

export function CheckoutInformationForm({
  queryRef,
}: CheckoutInformationFormProps) {
  const [{errors}, formAction] = useActionState(updateCheckoutInformation, {
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
      <CheckoutContactSection checkout={data.checkout} />
      <CheckoutShippingAddress checkout={data.checkout} />
      <div className={cn("gap-base flex flex-col")}>
        <Button
          type="submit"
          size="large"
          isPending={isPending}
          isDisabled={isPending}>
          <FormattedMessage id="DgnS8R" defaultMessage="Continue to shipping" />
        </Button>
        <Link href={Routes.cart}>
          <ChevronLeftIcon aria-hidden />
          <FormattedMessage id="MRNNXA" defaultMessage="Return to cart" />
        </Link>
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
        <Skeleton className={cn("h-16")} />
        <Skeleton className={cn("h-5")} />
      </div>
    </div>
  );
}
