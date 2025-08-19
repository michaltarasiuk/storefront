import {type NextRequest, NextResponse} from "next/server";

import {DefaultChannel} from "@/channels/consts";
import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {gql} from "@/graphql/codegen";
import {setCheckoutId} from "@/utils/checkout";
import {isDefined} from "@/utils/is-defined";

const DemoCheckoutCreateMutation = gql(`
  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(
      input: $input
    ) {
      checkout {
        id
      }
    }
  }
`);

export async function GET({nextUrl: {origin}}: NextRequest) {
  const {data} = await getClient().mutate({
    mutation: DemoCheckoutCreateMutation,
    variables: {
      input: {
        channel: DefaultChannel,
        lines: [],
      },
    },
  });
  const {checkout} = data?.checkoutCreate ?? {};
  if (!isDefined(checkout)) {
    return NextResponse.json(null, {status: 400});
  }
  await setCheckoutId(checkout.id);
  return NextResponse.redirect(new URL(Routes.checkout.information, origin));
}
