import "server-only";

import {HttpLink} from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

import {env} from "@/env";
import introspection from "@/graphql/codegen/introspection.json" with {type: "json"};

export const {getClient, query, PreloadQuery} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache({
      possibleTypes: introspection.possibleTypes,
    }),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
    }),
    dataMasking: true,
  });
});
