import invariant from "tiny-invariant";
import * as z from "zod";

import {Locales} from "@/i18n/consts";

import {splitPathSegments} from "./pathname";

export const BasePathSchema = z.object({
  locale: z.enum(Locales),
  channel: z.string(),
});

export function getBasePath(pathname: string) {
  const [locale, channel] = splitPathSegments(pathname);
  invariant(locale);
  invariant(channel);
  return [locale, channel] as const;
}
