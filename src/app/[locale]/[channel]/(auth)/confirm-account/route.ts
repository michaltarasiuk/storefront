import {type NextRequest, NextResponse} from "next/server";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import type {Locale} from "@/i18n/consts";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments, splitPathSegments} from "@/utils/pathname";

const ConfirmAccountMutation = gql(`
  mutation ConfirmAccount($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      user {
        isActive
      }
      errors {
        message
      }
    }
  }
`);

const SearchParamsSchema = z.object({
  email: z.email(),
  token: z.string(),
});

export async function GET(request: NextRequest) {
  try {
    const {pathname, searchParams} = new URL(request.url);
    const [locale, channel] = splitPathSegments(pathname) as [Locale, string];
    const {email, token} = SearchParamsSchema.parse(
      Object.fromEntries(searchParams),
    );
    const {data} = await getClient().mutate({
      mutation: ConfirmAccountMutation,
      variables: {
        email,
        token,
      },
    });
    const {user, errors = []} = data?.confirmAccount ?? {};
    if (isDefined(user) && user.isActive) {
      const redirectUrl = new URL(
        joinPathSegments(locale, channel, Routes.account.signin),
        request.url,
      );
      redirectUrl.searchParams.set("email", email);
      return NextResponse.redirect(redirectUrl);
    } else {
      throw new AggregateError(
        errors
          .flatMap((error) => error.message ?? [])
          .map((message) => new Error(message)),
      );
    }
  } catch (error) {
    let status = 500;
    let errors = ["An error occurred while confirming your account."];
    if (error instanceof AggregateError) {
      status = 400;
      errors = error.errors
        .filter((error) => error instanceof Error)
        .map((error) => error.message);
    } else if (error instanceof z.ZodError) {
      status = 400;
      errors = error.issues.map((issue) => issue.message);
    }
    return NextResponse.json({errors}, {status});
  }
}
