import {createEnv} from "@t3-oss/env-nextjs";
import * as z from "zod";

export const env = createEnv({
  server: {
    SALEOR_AUTH_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
    NEXT_PUBLIC_SALEOR_GRAPHQL_URL: z.url(),
  },
  runtimeEnv: {
    SALEOR_AUTH_TOKEN: process.env.SALEOR_AUTH_TOKEN,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SALEOR_GRAPHQL_URL: process.env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
  },
});
