import "server-only";

import {cache} from "react";
import {createIntl, createIntlCache, type ResolvedIntlConfig} from "react-intl";
import invariant from "tiny-invariant";

import {DefaultLocale} from "../consts";
import {isLocaleSupported} from "./is-locale-supported";
import {loadCompiledMessages} from "./load-compiled-messages";

const intlCache = createIntlCache();

export const getIntl = cache(async (locale = DefaultLocale) => {
  let messages: ResolvedIntlConfig["messages"];
  try {
    invariant(isLocaleSupported(locale));
    messages = await loadCompiledMessages(locale);
  } catch {
    messages = await loadCompiledMessages(DefaultLocale);
  }
  return createIntl(
    {
      locale,
      messages,
      defaultLocale: DefaultLocale,
    },
    intlCache,
  );
});
