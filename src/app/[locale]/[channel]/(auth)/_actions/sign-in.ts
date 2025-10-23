"use server";

import {redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import {
  setAccessTokenCookie,
  setRefreshTokenCookie,
} from "@/modules/account/utils/cookies";
import {toValidationErrors} from "@/modules/account/utils/validation-errors";
import {isDefined} from "@/utils/is-defined";
import {BasePathnameSchema, joinPathSegments} from "@/utils/pathname";

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
    redirect(joinPathSegments(locale, channel, Routes.account.orders));
  }
  return {
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
