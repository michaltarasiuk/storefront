"use client";

import {HttpLink} from "@apollo/client";
import {
  ApolloClient,
  ApolloNextAppProvider,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

import {env} from "#app/env";

import {InMemoryCacheConfig} from "./in-memory-cache-config";

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
      uri: env.NEXT_PUBLIC_SALEOR_GRAPHQL_ENDPOINT,
    }),
  });
}
