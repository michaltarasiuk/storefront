import {env} from "#app/env";
import {query} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import {isDefined} from "#app/utils/is-defined";

const ChannelContextValueQuery = graphql(`
  query ChannelContextValue($slug: String!) {
    channel(slug: $slug) {
      countries {
        code
        country
      }
      taxConfiguration {
        displayGrossPrices
      }
    }
  }
`);

export async function queryChannelContextValue(slug: string) {
  const {data} = await query({
    query: ChannelContextValueQuery,
    variables: {
      slug,
    },
    context: {
      headers: {
        Authorization: `Bearer ${env.SALEOR_AUTH_TOKEN}`,
      },
    },
  });
  if (!isDefined(data.channel)) {
    return;
  }
  return {
    ...data.channel,
    countries: data.channel.countries ?? [],
  };
}
