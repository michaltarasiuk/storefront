"use client";

import {Input} from "react-aria-components";

import {useChannel} from "@/modules/channel/hooks/use-channel";

export function ChannelField() {
  const channel = useChannel();
  return <Input type="hidden" name="channel" value={channel} />;
}
