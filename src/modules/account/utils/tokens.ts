import jwt from "jsonwebtoken";
import * as z from "zod";

import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";

const AccessTokenPayloadSchema = z.object({
  type: z.literal("access"),
  exp: z.number(),
});

export function getAccessTokenExpiry(token: string) {
  const decoded = jwt.decode(token);
  const payload = AccessTokenPayloadSchema.parse(decoded);
  return payload.exp * 1_000;
}

export async function refreshAccessToken(refreshToken: string) {
  const {data} = await getClient().mutate({
    mutation: RefreshAccessTokenMutation,
    variables: {
      refreshToken,
    },
  });
  return data?.tokenRefresh?.token ?? null;
}

const RefreshAccessTokenMutation = graphql(`
  mutation RefreshAccessToken($refreshToken: String!) {
    tokenRefresh(refreshToken: $refreshToken) {
      token
    }
  }
`);
