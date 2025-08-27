import {match} from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import {headers} from "next/headers";

import {DefaultLocale, Locales} from "../consts";

export async function getLocaleByHeaders() {
  const languages = new Negotiator({
    headers: Object.fromEntries([...(await headers())]),
  }).languages();
  const orderedLocales = Locales.toSorted((a, b) => b.length - a.length);
  try {
    return match(languages, orderedLocales, DefaultLocale);
  } catch {}
}
