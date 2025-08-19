"use server";

import * as z from "zod";

import {Routes} from "@/consts/routes";
import {env} from "@/env";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {Locales} from "@/i18n/consts";
import {localeToLanguageCode} from "@/i18n/utils/locale-to-language-code";
import {joinPathSegments} from "@/utils/pathname";

import {toValidationErrors} from "../_utils/validation-errors";
import {signIn} from "./sign-in";

const SignupMutation = gql(`
  mutation Signup($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      requiresConfirmation
      errors {
        ...AccountValidationError @unmask
      }
    }
  }
`);

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
  locale: z.union(Locales.map((locale) => z.literal(locale))),
  channel: z.string(),
});

export async function signUp(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = FormDataSchema.parse(
    Object.fromEntries(formData),
  );
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
