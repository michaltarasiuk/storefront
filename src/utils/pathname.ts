import * as z from "zod";

import {DefaultLocale, Locales} from "#app/i18n/consts";
import {DefaultChannel} from "#app/modules/channel/consts";

export const BasePathnameSchema = z.object({
  locale: z.enum(Locales),
  channel: z.string(),
});

export function getBasePathname(pathname: string) {
  const [locale = DefaultLocale, channel = DefaultChannel] =
    splitPathSegments(pathname);
  return [locale, channel] as const;
}

export function joinPathSegments(...segments: string[]) {
  function trimLeadingSlash(s: string) {
    return s.startsWith("/") ? s.slice(1) : s;
  }
  return "/" + segments.map(trimLeadingSlash).join("/");
}

export function splitPathSegments(pathname: string) {
  return pathname.split("/").filter((segment) => segment.length > 0);
}
