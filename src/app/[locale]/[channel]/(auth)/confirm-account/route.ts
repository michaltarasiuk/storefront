import {type NextRequest, NextResponse} from "next/server";
import * as z from "zod";

import {Routes} from "@/consts/routes";
import {graphql} from "@/graphql/codegen";
import {getClient} from "@/graphql/server-client";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments, splitPathSegments} from "@/utils/pathname";

const ConfirmAccountMutation = graphql(`
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
    const requestUrl = new URL(request.url);
    const [locale, channel] = splitPathSegments(requestUrl.pathname);
    const {email, token} = SearchParamsSchema.parse(
      Object.fromEntries(requestUrl.searchParams),
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
        joinPathSegments(locale!, channel!, Routes.signin),
        request.url,
      );
      redirectUrl.searchParams.set("email", email);
      return NextResponse.redirect(redirectUrl);
    } else {
      throw new AggregateError(
        errors
          .filter((error) => isDefined(error.message))
          .map((error) => new Error(error.message!)),
      );
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {errors: error.issues.map((issue) => issue.message)},
        {status: 400},
      );
    } else if (error instanceof AggregateError) {
      return NextResponse.json(
        {errors: error.errors.map((error) => error.message)},
        {status: 400},
      );
    } else {
      return NextResponse.json(
        {errors: ["Unexpected error occurred."]},
        {status: 500},
      );
    }
  }
}
