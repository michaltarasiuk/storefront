import type {ApolloClient} from "@apollo/client";

import {env} from "#app/env";
import {graphql} from "#app/graphql/codegen";

const ChannelSlugsQuery = graphql(`
  query ChannelSlugs {
    channels {
      slug
      isActive
    }
  }
`);

export async function getActiveChannelSlugs(client: ApolloClient) {
  const {data} = await client.query({
    query: ChannelSlugsQuery,
    context: {
      headers: {
        Authorization: `Bearer ${env.SALEOR_AUTH_TOKEN}`,
      },
    },
  });
  const activeSlugs: string[] = [];
  for (const channel of data.channels ?? []) {
    if (channel.isActive) {
      activeSlugs.push(channel.slug);
    }
  }
  return activeSlugs;
}
