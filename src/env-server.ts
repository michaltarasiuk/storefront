import "server-only";

import * as z from "zod";

const ServerEnvSchema = z.object({
  SALEOR_AUTH_TOKEN: z.string(),
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_SALEOR_GRAPHQL_URL: z.url(),
});
export const serverEnv = ServerEnvSchema.parse({
  SALEOR_AUTH_TOKEN: process.env.SALEOR_AUTH_TOKEN,
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SALEOR_GRAPHQL_URL: process.env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
});
