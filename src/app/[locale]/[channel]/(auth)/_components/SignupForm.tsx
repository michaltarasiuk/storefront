"use client";

import {useActionState} from "react";
import {Input} from "react-aria-components";
import {useFormStatus} from "react-dom";

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
  const locale = useLocale();
  const channel = useChannel();
  const intl = useIntl();
  return (
    <Form
      validationErrors={errors}
      className={cn("gap-small-100 flex flex-col")}
      action={formAction}>
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
        placeholder={intl.formatMessage({
          id: "sy+pv5",
          defaultMessage: "Email",
        })}
      />
      <TextField
        name="password"
        type="password"
        placeholder={intl.formatMessage({
          id: "5sg7KC",
          defaultMessage: "Password",
        })}
        autoComplete="new-password"
      />
      <Input name="locale" type="hidden" value={locale} />
      <Input name="channel" type="hidden" value={channel} />
      <SubmitButton />
    </Form>
  );
}

function SubmitButton() {
  const {pending} = useFormStatus();
  return (
    <Button type="submit" isDisabled={pending} isPending={pending}>
      <FormattedMessage id="8HJxXG" defaultMessage="Sign up" />
    </Button>
  );
}
