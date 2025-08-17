"use server";

import {redirect} from "next/navigation";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {isDefined} from "@/utils/is-defined";
import {setAccessTokenCookie, setRefreshTokenCookie} from "@/utils/session";

import {toValidationErrors} from "../_utils/validation-errors";

const SigninMutation = gql(`
  mutation Signin($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      errors {
        ...AccountValidationError
      }
    }
  }
`);

const FormDataSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export async function signIn(_state: unknown, formData: FormData) {
  const {email, password} = FormDataSchema.parse(Object.fromEntries(formData));
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
    redirect(Routes.account.orders);
  }
  return {
    errors: toValidationErrors(errors),
  };
}
