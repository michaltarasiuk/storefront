import {cookies} from "next/headers";

import {ciEquals} from "@/utils/ci-equals";
import {isDefined} from "@/utils/is-defined";

import {Locales, NextLocaleCookieName} from "../consts";

export async function getLocaleByCookies() {
  const localeCookie = (await cookies()).get(NextLocaleCookieName);
  if (!isDefined(localeCookie)) {
    return;
  }
  for (const locale of Locales) {
    if (ciEquals(localeCookie.value, locale)) {
      return localeCookie.value;
    }
  }
}
