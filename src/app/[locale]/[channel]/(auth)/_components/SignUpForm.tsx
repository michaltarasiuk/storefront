"use client";

import {useActionState, useTransition} from "react";
import invariant from "tiny-invariant";

import {Button} from "#app/components/Button";
import {ChannelField} from "#app/components/ChannelField";
import {Form} from "#app/components/Form";
import {LocaleField} from "#app/components/LocaleField";
import {TextField} from "#app/components/TextField";
import {FormattedMessage, useIntl} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";

import {signUpAction} from "../_actions/sign-up";
import {FormHeader} from "./FormHeader";

export function SignUpForm() {
  const [{errors}, formAction] = useActionState(signUpAction, {
    requiresConfirmation: false,
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
      className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title={intl.formatMessage({
          id: "8HJxXG",
          defaultMessage: "Sign up",
        })}
        description={intl.formatMessage({
          id: "FvxRDd",
          defaultMessage: "Enter your email and password to sign up.",
        })}
      />
      <TextField
        name="email"
        type="email"
        label={intl.formatMessage({
          id: "sy+pv5",
          defaultMessage: "Email",
        })}
        isRequired
      />
      <TextField
        name="password"
        type="password"
        label={intl.formatMessage({
          id: "5sg7KC",
          defaultMessage: "Password",
        })}
        isRequired
      />
      <LocaleField />
      <ChannelField />
      <Button type="submit" isPending={isPending} isDisabled={isPending}>
        <FormattedMessage id="8HJxXG" defaultMessage="Sign up" />
      </Button>
    </Form>
  );
}
