"use server";

import {redirect} from "next/navigation";

import {routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {Locale} from "#app/i18n/consts";
import {
  getAccessToken,
  removeSessionCookies,
} from "#app/modules/account/utils/cookies";
import {isDefined} from "#app/utils/is-defined";
import {joinPathSegments} from "#app/utils/pathname";

const DeactivateAllTokensMutation = graphql(`
  mutation DeactivateAllTokens {
    tokensDeactivateAll {
      __typename
    }
  }
`);

export async function deactivateAllTokens(locale: Locale, channel: string) {
  const accessToken = await getAccessToken();
  await getClient().mutate({
    mutation: DeactivateAllTokensMutation,
    context: {
      headers: isDefined(accessToken)
        ? {
            Authorization: `Bearer ${accessToken.value}`,
          }
        : undefined,
    },
  });
  await removeSessionCookies();
  redirect(joinPathSegments(locale, channel, routes.account.signin));
}
