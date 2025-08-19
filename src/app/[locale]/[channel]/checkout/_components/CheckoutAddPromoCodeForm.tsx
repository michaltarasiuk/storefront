"use client";

import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {addCheckoutPromoCode} from "../_actions/add-checkout-promo-code";

export function CheckoutAddPromoCodeForm() {
  const [{errors}, formAction] = useActionState(addCheckoutPromoCode, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const intl = useIntl();
  return (
    <Form
      validationErrors={errors}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData));
      }}
      className={cn("gap-base flex")}>
      <TextField
        name="promoCode"
        label={intl.formatMessage({
          id: "CyOkb5",
          defaultMessage: "Promo Code",
        })}
        className={cn("w-full")}
        isRequired
      />
      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className={cn("max-h-input")}>
        <FormattedMessage id="EWw/tK" defaultMessage="Apply" />
      </Button>
    </Form>
  );
}
