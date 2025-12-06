"use client";

import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "#app/components/Button";
import {Form} from "#app/components/Form";
import {SkeletonInput} from "#app/components/Input";
import {TextField} from "#app/components/TextField";
import {FormattedMessage, useIntl} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

import {addPromoCode} from "../_actions/add-promo-code";

export function AddPromoCodeForm() {
  const [{errors}, formAction] = useActionState(addPromoCode, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const intl = useIntl();
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
      className={cn("gap-base flex")}>
      <TextField
        name="promoCode"
        label={intl.formatMessage({
          id: "CyOkb5",
          defaultMessage: "Promo Code",
        })}
        className={cn("flex-1")}
        isRequired
      />
      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className={cn("max-h-field-height")}>
        <FormattedMessage id="EWw/tK" defaultMessage="Apply" />
      </Button>
    </Form>
  );
}

export function SkeletonAddPromoCodeForm() {
  return (
    <div className={cn("gap-base flex")}>
      <SkeletonInput className={cn("flex-1")} />
      <Button isDisabled className={cn("min-h-field-height")}>
        <FormattedMessage id="EWw/tK" defaultMessage="Apply" />
      </Button>
    </div>
  );
}
