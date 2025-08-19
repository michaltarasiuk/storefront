import "server-only";

import {cookies} from "next/headers";

const CheckoutIdCookieName = "checkout-id";

export async function getCheckoutId() {
  return (await cookies()).get(CheckoutIdCookieName);
}

export async function setCheckoutId(checkoutId: string) {
  (await cookies()).set(CheckoutIdCookieName, checkoutId, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
}
