import "@/styles/globals.css";

import {notFound} from "next/navigation";

import {ChannelProvider} from "@/channels/ChannelProvider";
import {getChannelContextValue} from "@/channels/utils/get-channel-context-value";
import {getChannelSlugs} from "@/channels/utils/get-channel-slugs";
import {getClient} from "@/graphql/apollo-client";
import {isDefined} from "@/utils/is-defined";

interface ChannelLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    channel: string;
  }>;
}

export default async function ChannelLayout({
  children,
  ...props
}: ChannelLayoutProps) {
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
