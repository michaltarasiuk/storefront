import "@/styles/globals.css";

import type {ApolloClient} from "@apollo/client";

import {serverEnv} from "@/env-server";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";

interface ChannelLayoutProps {
  children: React.ReactNode;
}

export default async function ChannelLayout({children}: ChannelLayoutProps) {
  return children;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const client = getClient();
  const channels = await getActiveChannelSlugs(client);
  return channels.map((channel) => ({
    channel,
  }));
}

async function getActiveChannelSlugs(client: ApolloClient<unknown>) {
  const {data} = await client.query({
    query: ChannelSlugsQuery,
    context: {
      headers: {
        Authorization: `Bearer ${serverEnv.SALEOR_AUTH_TOKEN}`,
      },
    },
  });
  const slugs: string[] = [];
  for (const channel of data.channels ?? []) {
    if (channel.isActive) {
      slugs.push(channel.slug);
    }
  }
  return slugs;
}

const ChannelSlugsQuery = gql(`
  query ChannelSlugs {
    channels {
      slug
      isActive
    }
  }
`);
