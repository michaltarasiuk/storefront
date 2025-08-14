"use client";

import {useActionState, useTransition} from "react";
import {Input} from "react-aria-components";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {useChannel} from "@/i18n/hooks/use-channel";
import {useLocale} from "@/i18n/hooks/use-locale";
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
  const locale = useLocale();
  const channel = useChannel();
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
      <Input name="locale" type="hidden" value={locale} />
      <Input name="channel" type="hidden" value={channel} />
      <Button type="submit" isDisabled={isPending} isPending={isPending}>
        <FormattedMessage id="8HJxXG" defaultMessage="Sign up" />
      </Button>
    </Form>
  );
}
