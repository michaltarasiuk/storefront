import type {InMemoryCacheConfig as InMemoryCacheConfigType} from "@apollo/client";

import introspection from "#app/graphql/codegen/introspection.json" with {type: "json"};

export const InMemoryCacheConfig: InMemoryCacheConfigType = {
  possibleTypes: introspection.possibleTypes,
};
