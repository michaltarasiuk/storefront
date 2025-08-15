import {createContext} from "react";

export const ChannelContext = createContext<{
  taxConfiguration: {
    displayGrossPrices: boolean;
  };
}>(undefined as never);
