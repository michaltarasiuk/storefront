import {HttpLink} from "@apollo/client";
import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

import {env} from "@/env";

import {InMemoryCacheConfig} from "./in-memory-cache-config";

export const {getClient, query, PreloadQuery} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(InMemoryCacheConfig),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_SALEOR_GRAPHQL_ENDPOINT,
    }),
  });
});
