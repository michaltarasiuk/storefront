"use client";

import {ChannelContext} from "./channel-context";

type CheckoutContextValue =
  typeof ChannelContext extends React.Context<infer T> ? T : never;

export function ChannelProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: CheckoutContextValue;
}) {
  return <ChannelContext value={value}>{children}</ChannelContext>;
}
