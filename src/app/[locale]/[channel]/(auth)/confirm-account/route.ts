import {type NextRequest, NextResponse} from "next/server";

import {ROUTES} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {isDefined} from "#app/utils/is-defined";
import {joinPathname, parsePathnameParams} from "#app/utils/pathname";

export async function GET({nextUrl}: NextRequest) {
  const email = nextUrl.searchParams.get("email");
  const token = nextUrl.searchParams.get("token");
  if (!isDefined(email) || !isDefined(token)) {
    return NextResponse.json(null, {status: 422});
  }
  const isAccountActive = await confirmAccount(email, token);
  if (!isAccountActive) {
    return NextResponse.json(null, {status: 400});
  }
  const redirectUrl = new URL(
    joinPathname(...parsePathnameParams(nextUrl.pathname), ROUTES.auth.signin),
    nextUrl.origin,
  );
  redirectUrl.searchParams.set("email", email);
  return NextResponse.redirect(redirectUrl);
}

async function confirmAccount(email: string, token: string): Promise<boolean> {
  const {data} = await getClient().mutate({
    mutation: ConfirmAccountMutation,
    variables: {email, token},
  });
  return data?.confirmAccount?.user?.isActive ?? false;
}

const ConfirmAccountMutation = graphql(`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        isActive
      }
    }
  }
`);
