import {type NextRequest, NextResponse} from "next/server";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {isDefined} from "@/utils/is-defined";

export async function GET({nextUrl: {origin, searchParams}}: NextRequest) {
  const email = searchParams.get("email");
  const token = searchParams.get("token");
  if (!isDefined(email) || !isDefined(token)) {
    return NextResponse.next();
  }
  const confirmed = await confirmAccount(email, token);
  if (!confirmed) {
    return NextResponse.next();
  }
  const redirectUrl = new URL(Routes.account.signin, origin);
  redirectUrl.searchParams.set("email", email);
  return NextResponse.redirect(redirectUrl);
}

async function confirmAccount(email: string, token: string) {
  const {data} = await getClient().mutate({
    mutation: ConfirmAccountMutation,
    variables: {
      email,
      token,
    },
  });
  return data?.confirmAccount?.user?.isActive ?? false;
}

const ConfirmAccountMutation = gql(`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        isActive
      }
    }
  }
`);
