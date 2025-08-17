"use client";

import {useActionState, useEffect, useRef, useTransition} from "react";
import ReactDOM from "react-dom";

import {Button} from "@/components/Button";
import {Form} from "@/components/Form";
import {TextField} from "@/components/TextField";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {signIn} from "../_actions/sign-in";
import {FormHeader} from "./FormHeader";

interface SigninFormProps {
  defaultEmail?: string;
}

export function SigninForm({defaultEmail}: SigninFormProps) {
  const [formState, formAction] = useActionState(signIn, {
    errors: {},
  });
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const intl = useIntl();
  useEffect(() => {
    if (!Object.keys(formState.errors).length) {
      startTransition(() => {
        if (isDefined(formRef.current)) {
          ReactDOM.requestFormReset(formRef.current);
        }
      });
    }
  }, [formState]);
  return (
    <Form
      ref={formRef}
      validationErrors={formState.errors}
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
