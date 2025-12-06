import {cookies} from "next/headers";

import {ciEquals} from "#app/utils/ci-equals";
import {isDefined} from "#app/utils/is-defined";

import {Locales, NextLocaleCookieName} from "../consts";

export async function getLocaleByCookies() {
  const localeCookie = (await cookies()).get(NextLocaleCookieName);
  if (!isDefined(localeCookie)) {
    return;
  }
  let matchedLocale: string | undefined;
  for (const locale of Locales) {
    if (ciEquals(localeCookie.value, locale)) {
      matchedLocale = localeCookie.value;
    }
  }
  return matchedLocale;
}
