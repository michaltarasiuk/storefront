"use server";

import {redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import {getClient} from "@/graphql/server-client";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";
import {setAccessTokenCookie, setRefreshTokenCookie} from "@/utils/session";

import {toValidationErrors} from "../_utils/validation-errors";

const SigninMutation = graphql(`
  mutation Signin($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        ...ValidationError
      }
    }
  }
`);

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
  locale: z.string(),
  channel: z.string(),
});

export async function signIn(_state: unknown, formData: FormData) {
  const {email, password, locale, channel} = FormDataSchema.parse(
    Object.fromEntries(formData),
  );
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
    redirect(joinPathSegments(locale, channel, Routes.orders));
  }
  return {
    errors: toValidationErrors(errors),
  };
}
