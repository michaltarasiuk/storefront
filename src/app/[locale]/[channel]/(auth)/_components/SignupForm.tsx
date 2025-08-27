"use client";

import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {ChannelField} from "@/components/ChannelField";
import {Form} from "@/components/Form";
import {LocaleField} from "@/components/LocaleField";
import {TextField} from "@/components/TextField";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {signUp} from "../_actions/sign-up";
import {FormHeader} from "./FormHeader";

export function SignupForm() {
  const [{errors}, formAction] = useActionState(signUp, {
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
        const formData = new FormData(event.target as HTMLFormElement);
        startTransition(() => formAction(formData));
      }}
      className={cn("gap-small-100 flex flex-col")}>
      <FormHeader
        title={intl.formatMessage({
          id: "8HJxXG",
          defaultMessage: "Sign up",
        })}
        description={intl.formatMessage({
          id: "p99EyA",
          defaultMessage:
            "Create your account by entering your email and a password",
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
