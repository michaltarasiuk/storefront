import {URLPattern} from "next/server";

import {isDefined} from "@/utils/is-defined";

import {type Locale, Locales} from "../consts";

export function getLocaleByUrl(url: URL) {
  const localePattern = new URLPattern({
    pathname: `/:locale(${Locales.join("|")})/:path*`,
  });
  const match = localePattern.exec(url);
  if (!isDefined(match)) {
    return;
  }
  return match.pathname.groups.locale as Locale;
}
