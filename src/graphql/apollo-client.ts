import {
  ApolloClient,
  InMemoryCache,
  registerApolloClient,
} from "@apollo/client-integration-nextjs";

import {InMemoryCacheConfig} from "./in-memory-cache-config";
import {HttpLink} from "@apollo/client";
import {env} from "@/env";

export const {getClient, query, PreloadQuery} = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(InMemoryCacheConfig),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
    }),
    dataMasking: true,
  });
});
