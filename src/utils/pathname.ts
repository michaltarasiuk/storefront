import * as z from "zod";

import {DefaultLocale, Locales} from "#app/i18n/consts";
import {DefaultChannel} from "#app/modules/channel/consts";

export const PathnameParamsSchema = z.object({
  locale: z.enum(Locales),
  channel: z.string(),
});

export function parsePathnameParams(pathname: string) {
  const [locale = DefaultLocale, channel = DefaultChannel] =
    splitPathname(pathname);
  return [locale, channel] as const;
}

export function joinPathname(...segments: string[]) {
  function trimLeadingSlash(s: string) {
    return s.startsWith("/") ? s.slice(1) : s;
  }
  return "/" + segments.map(trimLeadingSlash).join("/");
}

export function splitPathname(pathname: string) {
  return pathname.split("/").filter((s) => s.length > 0);
}
