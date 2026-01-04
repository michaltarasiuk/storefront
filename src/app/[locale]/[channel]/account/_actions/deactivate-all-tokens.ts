"use server";

import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {Locale} from "#app/i18n/consts";
import {auth} from "#app/modules/account/auth";
import {isDefined} from "#app/utils/is-defined";

import {signOutAction} from "./sign-out";

const DeactivateAllTokensMutation = graphql(`
  mutation DeactivateAllTokens {
    tokensDeactivateAll {
      __typename
    }
  }
`);

export async function deactivateAllTokensAction(
  locale: Locale,
  channel: string,
) {
  const session = await auth();
  if (!isDefined(session)) {
    return;
  }
  await getClient().mutate({
    mutation: DeactivateAllTokensMutation,
    context: {
      headers: {
        ...(isDefined(session) && {
          Authorization: `Bearer ${session.accessToken}`,
        }),
      },
    },
  });
  return signOutAction(locale, channel);
}
