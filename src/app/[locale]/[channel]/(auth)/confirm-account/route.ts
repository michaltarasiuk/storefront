import {type NextRequest, NextResponse} from "next/server";

import {routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {ConfirmAccountMutationVariables} from "#app/graphql/codegen/graphql";
import {isDefined} from "#app/utils/is-defined";
import {getBasePathname, joinPathSegments} from "#app/utils/pathname";

const ConfirmAccountMutation = graphql(`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        isActive
      }
    }
  }
`);

export async function GET({nextUrl}: NextRequest) {
  const confirmationParams = getConfirmationParams(nextUrl.searchParams);
  if (!isDefined(confirmationParams)) {
    return NextResponse.json(null, {status: 422});
  }
  const isAccountActive = await confirmAccount(confirmationParams);
  if (!isAccountActive) {
    return NextResponse.json(null, {status: 400});
  }
  const redirectUrl = new URL(
    joinPathSegments(
      ...getBasePathname(nextUrl.pathname),
      routes.account.signin,
    ),
    nextUrl.origin,
  );
  redirectUrl.searchParams.set("email", confirmationParams.email);
  return NextResponse.redirect(redirectUrl);
}

function getConfirmationParams(searchParams: URLSearchParams) {
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  if (!isDefined(email) || !isDefined(token)) {
    return;
  }
  return {
    email,
    token,
  };
}

async function confirmAccount(variables: ConfirmAccountMutationVariables) {
  const {data} = await getClient().mutate({
    mutation: ConfirmAccountMutation,
    variables,
  });
  return data?.confirmAccount?.user?.isActive;
}
