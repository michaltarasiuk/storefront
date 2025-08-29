"use client";

import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

import {InMemoryCacheConfig} from "./in-memory-cache-config";
import {HttpLink} from "@apollo/client";
import {env} from "@/env";

export function ApolloProvider({children}: {children: React.ReactNode}) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}

function makeClient() {
  return new ApolloClient({
    cache: new InMemoryCache(InMemoryCacheConfig),
    link: new HttpLink({
      uri: env.NEXT_PUBLIC_SALEOR_GRAPHQL_URL,
    }),
    dataMasking: true,
  });
}
