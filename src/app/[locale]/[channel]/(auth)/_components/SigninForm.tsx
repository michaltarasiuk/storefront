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
import {isDefined} from "#app/utils/is-defined";

import {signInAction} from "../_actions/sign-in";
import {FormHeader} from "./FormHeader";

export function SignInForm({defaultEmail}: {defaultEmail?: string}) {
  const [{errors}, formAction] = useActionState(signInAction, {
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
          id: "SQJto2",
          defaultMessage: "Sign in",
        })}
        description={intl.formatMessage({
          id: "wFE3Rj",
          defaultMessage: "Enter your email and password to sign in.",
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
      <LocaleField />
      <ChannelField />
      <Button type="submit" isPending={isPending} isDisabled={isPending}>
        <FormattedMessage id="SQJto2" defaultMessage="Sign in" />
      </Button>
    </Form>
  );
}
