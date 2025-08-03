import "client-only";

import * as z from "zod";

const ClientEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.url(),
  NEXT_PUBLIC_SALEOR_GRAPHQL_URL: z.url(),
});
export const clientEnv = ClientEnvSchema.parse({
  NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  NEXT_PUBLIC_SALEOR_GRAPHQL_URL: process.env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
});
