import {type NextRequest, NextResponse} from "next/server";

import {Routes} from "@/consts/routes";
import {getClient} from "@/graphql/apollo-client";
import {graphql} from "@/graphql/codegen";
import type {CheckoutLineInput} from "@/graphql/codegen/graphql";
import {DefaultLocale} from "@/i18n/consts";
import {DefaultChannel} from "@/modules/channel/consts";
import {setCheckoutId} from "@/modules/checkout/utils/cookies";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

const DemoCheckoutCreateMutation = graphql(`
  mutation DemoCheckoutCreate($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
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
        lines: CheckoutLines,
      },
    },
  });
  const checkoutId = data?.checkoutCreate?.checkout?.id;
  if (!isDefined(checkoutId)) {
    return NextResponse.json(null, {status: 400});
  }
  await setCheckoutId(checkoutId);
  const pathname = joinPathSegments(
    DefaultLocale,
    DefaultChannel,
    Routes.checkout.information,
  );
  return NextResponse.redirect(new URL(pathname, origin));
}

const CheckoutLines: CheckoutLineInput[] = [
  {
    variantId: "UHJvZHVjdFZhcmlhbnQ6Mzg3",
    quantity: 1,
  },
];
