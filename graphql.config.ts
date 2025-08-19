import type {IGraphQLConfig} from "graphql-config";

import {env} from "./env";

const config: IGraphQLConfig = {
  schema: [
    env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
    "src/graphql/apollo-directives.graphql",
  ],
  documents: ["src/**/*.{ts,tsx}"],
};
export default config;
