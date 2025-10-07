"use server";

import * as z from "zod";

import {Routes} from "@/config/routes";
import {env} from "@/env";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {localeToLanguageCode} from "@/i18n/utils/locale-to-language-code";
import {toValidationErrors} from "@/modules/account/utils/validation-errors";
import {BasePathnameSchema} from "@/utils/base-pathname";
import {joinPathSegments} from "@/utils/pathname";

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
      joinPathSegments(locale, channel, Routes.account.confirmAccount),
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
  ...BasePathnameSchema.shape,
});
function parseFormData(formData: FormData) {
  return FormDataSchema.parse(Object.fromEntries(formData));
}
