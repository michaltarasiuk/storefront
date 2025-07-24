import {match} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {cookies, headers} from "next/headers";
import {NextResponse, URLPattern} from "next/server";

import {ciEquals} from "@/utils/ci-equals";
import {isDefined} from "@/utils/is-defined";
import {joinPathname} from "@/utils/join-pathname";

import {DefaultLocale, Locales, NextLocaleCookieName} from "./consts";

export async function intlMiddleware(request: Request) {
  const requestUrl = new URL(request.url);
  if (!hasLocaleInUrl(requestUrl)) {
    const locale =
      (await getLocaleByCookies()) ??
      (await getLocaleByHeaders()) ??
      DefaultLocale;
    return NextResponse.redirect(
      new URL(joinPathname(locale, requestUrl.pathname), request.url),
    );
  }
}

function hasLocaleInUrl(url: URL) {
  const pattern = new URLPattern({
    pathname: `/:locale(${Locales.join("|")})/:path*`,
  });
  return pattern.test(url);
}

async function getLocaleByCookies() {
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

async function getLocaleByHeaders() {
  const languages = new Negotiator({
    headers: Object.fromEntries([...(await headers())]),
  }).languages();
  const orderedLocales = Locales.toSorted((a, b) => b.length - a.length);
  try {
    return match(languages, orderedLocales, DefaultLocale);
  } catch {}
}
