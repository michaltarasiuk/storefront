"use server";

import * as z from "zod";

import {routes} from "#app/consts/routes";
import {env} from "#app/env";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {localeToLanguageCode} from "#app/i18n/utils/locale-to-language-code";
import {toValidationErrors} from "#app/modules/account/utils/validation-errors";
import {basePathnameSchema, joinPathSegments} from "#app/utils/pathname";

import {signIn} from "./sign-in";

const SignupMutation = graphql(`
  mutation Signup($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      requiresConfirmation
      errors {
        ...AccountValidationError @unmask
      }
    }
  }
`);

export async function signUp(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = parseFormData(formData);
  const languageCode = localeToLanguageCode(locale);
  const redirectUrl = String(
    new URL(
      joinPathSegments(locale, channel, routes.account.confirmAccount),
      env.NEXT_PUBLIC_SITE_URL,
    ),
  );
  const {data} = await getClient().mutate({
    mutation: SignupMutation,
    variables: {
      input: {
        email,
        password,
        languageCode,
        channel,
        redirectUrl,
      },
    },
  });
  const {requiresConfirmation, errors = []} = data?.accountRegister ?? {};
  if (!requiresConfirmation) {
    await signIn(undefined, formData);
  }
  return {
    requiresConfirmation,
    errors: toValidationErrors(errors),
  };
}

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
  ...basePathnameSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormDataSchema.parse(Object.fromEntries(formData));
}
