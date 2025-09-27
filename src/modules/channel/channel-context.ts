"use client";

import {createContext} from "react";

import type {getChannelContextValue} from "./utils/get-channel-context-value";

type ContextValue = NonNullable<
  Awaited<ReturnType<typeof getChannelContextValue>>
>;

export const ChannelContext = createContext<ContextValue>(undefined as never);
