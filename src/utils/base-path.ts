import * as z from "zod";

import {DefaultLocale, Locales} from "@/i18n/consts";
import {DefaultChannel} from "@/modules/channel/consts";

import {splitPathSegments} from "./pathname";

export const BasePathSchema = z.object({
  locale: z.enum(Locales),
  channel: z.string(),
});

export function getBasePath(pathname: string) {
  const [locale = DefaultLocale, channel = DefaultChannel] =
    splitPathSegments(pathname);
  return [locale, channel] as const;
}
