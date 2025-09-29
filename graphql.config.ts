import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

import {loadEnvConfig} from "@next/env";
import type {IGraphQLConfig} from "graphql-config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnvConfig(__dirname);

const config: IGraphQLConfig = {
  schema: [
    process.env.NEXT_PUBLIC_SALEOR_GRAPHQL_ENDPOINT!,
    "src/graphql/client-directives.graphql",
  ],
  documents: ["src/**/*.{ts,tsx}"],
};
export default config;
