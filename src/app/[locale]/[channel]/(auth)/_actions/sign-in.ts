"use server";

import {redirect} from "next/navigation";
import * as z from "zod";

import {routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "#app/modules/account/utils/cookies";
import {toValidationErrors} from "#app/modules/account/utils/validation-errors";
import {isDefined} from "#app/utils/is-defined";
import {basePathnameSchema, joinPathSegments} from "#app/utils/pathname";

const SigninMutation = graphql(`
  mutation Signin($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        ...AccountValidationError @unmask
      }
    }
  }
`);

export async function signIn(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = parseFormData(formData);
  const {data} = await getClient().mutate({
    mutation: SigninMutation,
    variables: {
      email,
      password,
    },
  });
  const {token, refreshToken, errors = []} = data?.tokenCreate ?? {};
  if (isDefined(token) && isDefined(refreshToken)) {
    await setAccessTokenCookie(token);
    await setRefreshTokenCookie(refreshToken);
    redirect(joinPathSegments(locale, channel, routes.account.orders));
  }
  return {
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
