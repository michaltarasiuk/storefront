"use client";

import {useActionState, useTransition} from "react";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {signIn} from "../_actions/sign-in";
import {FormHeader} from "./FormHeader";

export function SigninForm({defaultEmail}: {defaultEmail?: string}) {
  const [{errors}, formAction] = useActionState(signIn, {
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
          id: "SQJto2",
          defaultMessage: "Sign in",
        })}
        description={intl.formatMessage({
          id: "rFxf+e",
          defaultMessage:
            "Please enter your email and password to access your account",
        })}
      />
      <TextField
        name="email"
        type="email"
        defaultValue={defaultEmail}
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
        autoFocus={isDefined(defaultEmail)}
        isRequired
      />
      <Button type="submit" isPending={isPending} isDisabled={isPending}>
        <FormattedMessage id="SQJto2" defaultMessage="Sign in" />
      </Button>
    </Form>
  );
}
