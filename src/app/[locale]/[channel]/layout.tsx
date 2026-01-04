import {notFound} from "next/navigation";

import {getClient} from "#app/graphql/apollo-client";
import {ChannelProvider} from "#app/modules/channel/ChannelProvider";
import {getActiveChannelSlugs} from "#app/modules/channel/utils/get-active-channel-slugs";
import {getChannelContextValue} from "#app/modules/channel/utils/get-channel-context-value";
import {isDefined} from "#app/utils/is-defined";

export default async function ChannelLayout({
  children,
  ...props
}: LayoutProps<"/[locale]/[channel]">) {
  const params = await props.params;
  const channel = await getChannelContextValue(params.channel);
  if (!isDefined(channel)) {
    notFound();
  }
  return <ChannelProvider value={channel}>{children}</ChannelProvider>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const client = getClient();
  const channels = await getActiveChannelSlugs(client);
  return channels.map((channel) => ({
    channel,
  }));
}
