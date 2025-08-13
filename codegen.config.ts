import type {CodegenConfig} from "@graphql-codegen/cli";

import {env} from "./env";

const config: CodegenConfig = {
  schema: env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/codegen/": {
      preset: "client",
      presetConfig: {
        gqlTagName: "gql",
        fragmentMasking: false,
      },
      config: {
        customDirectives: {
          apolloUnmask: true,
        },
        inlineFragmentTypes: "mask",
      },
    },
    "./src/graphql/codegen/introspection.json": {
      plugins: ["fragment-matcher"],
    },
  },
  ignoreNoDocuments: true,
  hooks: {
    afterAllFileWrite: ["bun run prettier --write"],
  },
};
export default config;
