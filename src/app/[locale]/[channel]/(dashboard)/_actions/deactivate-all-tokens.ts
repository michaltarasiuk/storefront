"use server";

import {redirect} from "next/navigation";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import type {Locale} from "@/i18n/consts";
import {
  getAccessToken,
  removeSessionCookies,
} from "@/modules/account/utils/cookies";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

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
  redirect(joinPathSegments(locale, channel, Routes.account.signin));
}
