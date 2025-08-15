"use client";

import {ChannelContext} from "./channel-context";

type Channel = typeof ChannelContext extends React.Context<infer T> ? T : never;

export function ChannelProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: Channel;
}) {
  return <ChannelContext value={value}>{children}</ChannelContext>;
}
