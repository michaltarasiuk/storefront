import {dirname} from "node:path";
import {fileURLToPath} from "node:url";

import type {CodegenConfig} from "@graphql-codegen/cli";
import {loadEnvConfig} from "@next/env";
import invariant from "tiny-invariant";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

loadEnvConfig(__dirname);

const saleorGraphqlEndpoint = process.env.NEXT_PUBLIC_SALEOR_GRAPHQL_ENDPOINT;
invariant(
  saleorGraphqlEndpoint,
  "Environment variable NEXT_PUBLIC_SALEOR_GRAPHQL_ENDPOINT must be defined.",
);

const codegenConfig: CodegenConfig = {
  schema: saleorGraphqlEndpoint,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/graphql/codegen/": {
      preset: "client",
      presetConfig: {
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
export default codegenConfig;
