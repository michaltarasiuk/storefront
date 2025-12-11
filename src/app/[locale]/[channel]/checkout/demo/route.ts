import {type NextRequest, NextResponse} from "next/server";

import {routes} from "#app/consts/routes";
import {getClient} from "#app/graphql/apollo-client";
import {graphql} from "#app/graphql/codegen";
import type {CheckoutLineInput} from "#app/graphql/codegen/graphql";
import {DefaultLocale} from "#app/i18n/consts";
import {DefaultChannel} from "#app/modules/channel/consts";
import {setCheckoutId} from "#app/modules/checkout/utils/cookies";
import {isDefined} from "#app/utils/is-defined";
import {joinPathSegments} from "#app/utils/pathname";

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
    routes.checkout.information,
  );
  return NextResponse.redirect(new URL(pathname, origin));
}

const CheckoutLines: CheckoutLineInput[] = [
  {
    variantId: "UHJvZHVjdFZhcmlhbnQ6Mzg0",
    quantity: 1,
  },
  {
    variantId: "UHJvZHVjdFZhcmlhbnQ6Mzg2",
    quantity: 1,
  },
  {
    variantId: "UHJvZHVjdFZhcmlhbnQ6Mzg3",
    quantity: 1,
  },
];
