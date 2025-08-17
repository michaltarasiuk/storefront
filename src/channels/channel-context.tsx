import {createContext} from "react";

export const ChannelContext = createContext<{
  countries: Array<{
    code: string;
    country: string;
  }>;
  taxConfiguration: {
    displayGrossPrices: boolean;
  };
}>(undefined as never);
