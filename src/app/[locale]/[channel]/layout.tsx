import "@/styles/globals.css";

import {notFound} from "next/navigation";

import {ChannelProvider} from "@/channels/ChannelProvider";
import {getActiveChannelSlugs} from "@/channels/utils/get-active-channels";
import {getChannel} from "@/channels/utils/get-channel";
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
  const channel = await getChannel(params.channel);
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
