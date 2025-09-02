"use client";

import {use} from "react";

import {graphql} from "@/graphql/codegen";
import type {TaxedMoney_TaxedMoneyFragment} from "@/graphql/codegen/graphql";
import {ChannelContext} from "@/modules/channels/channel-context";

import {Money} from "./Money";
import type {Text} from "./Text";

const TaxedMoney_TaxedMoneyFragment = graphql(`
  fragment TaxedMoney_TaxedMoney on TaxedMoney {
    net {
      ...Money_Money @unmask
    }
    gross {
      ...Money_Money @unmask
    }
  }
`);

interface TaxedMoneyProps extends React.ComponentProps<typeof Text> {
  taxedMoney: TaxedMoney_TaxedMoneyFragment;
}

export function TaxedMoney({taxedMoney, ...props}: TaxedMoneyProps) {
  const {
    taxConfiguration: {displayGrossPrices},
  } = use(ChannelContext);
  return (
    <Money
      {...props}
      money={displayGrossPrices ? taxedMoney.gross : taxedMoney.net}
    />
  );
}
