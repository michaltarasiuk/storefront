"use server";

import * as z from "zod";

import {ROUTES} from "#app/consts/routes";
import {env} from "#app/env";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {localeToLanguageCode} from "#app/i18n/utils/locale-to-language-code";
import {signIn} from "#app/modules/account/auth";
import {toValidationErrors} from "#app/modules/account/utils/errors";
import {joinPathname, PathnameParamsSchema} from "#app/utils/pathname";

const SignUpMutation = graphql(`
  mutation SignUp($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      requiresConfirmation
      errors {
        ...AccountValidationError @unmask
      }
    }
  }
`);

export async function signUpAction(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = parseFormData(formData);
  const redirectUrl = new URL(
    joinPathname(locale, channel, ROUTES.auth.confirmAccount),
    env.NEXT_PUBLIC_SITE_URL,
  );
  const {data} = await getClient().mutate({
    mutation: SignUpMutation,
    variables: {
      input: {
        email,
        password,
        languageCode: localeToLanguageCode(locale),
        channel,
        redirectUrl: String(redirectUrl),
      },
    },
  });
  const {requiresConfirmation, errors = []} = data?.accountRegister ?? {};
  if (!requiresConfirmation) {
    return signIn("saleor", {
      email,
      password,
      redirectTo: joinPathname(locale, channel, ROUTES.account.orders),
    });
  }
  return {
    requiresConfirmation: requiresConfirmation as boolean,
    errors: toValidationErrors(errors),
  };
}

function parseFormData(formData: FormData) {
  const formDataObject = Object.fromEntries(formData);
  return FormDataSchema.parse(formDataObject);
}

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
  ...PathnameParamsSchema.shape,
});
