"use client";

import {useNumberFormatter} from "react-aria";

import {graphql} from "#app/graphql/codegen";
import type {Money_MoneyFragment} from "#app/graphql/codegen/graphql";

import {Text} from "./Text";

const Money_MoneyFragment = graphql(`
  fragment Money_Money on Money {
    currency
    amount
  }
`);

interface MoneyProps extends React.ComponentProps<typeof Text> {
  money: Money_MoneyFragment;
}

export function Money({money, ...props}: MoneyProps) {
  const formatter = useNumberFormatter({
    style: "currency",
    currency: money.currency,
    minimumFractionDigits: 0,
  });
  return <Text {...props}>{formatter.format(money.amount)}</Text>;
}
