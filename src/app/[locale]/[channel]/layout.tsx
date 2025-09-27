import {notFound} from "next/navigation";

import {getClient} from "@/graphql/apollo-client";
import {ChannelProvider} from "@/modules/channel/ChannelProvider";
import {getChannelContextValue} from "@/modules/channel/utils/get-channel-context-value";
import {getChannelSlugs} from "@/modules/channel/utils/get-channel-slugs";
import {isDefined} from "@/utils/is-defined";

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
  const channels = await getChannelSlugs(client);
  return channels.map((channel) => ({
    channel,
  }));
}
