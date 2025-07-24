import "server-only";

import {cache} from "react";
import {createIntl, createIntlCache, type ResolvedIntlConfig} from "react-intl";

import {DefaultLocale, type Locale} from "../consts";
import {loadCompiledMessages} from "./load-compiled-messages";

const intlCache = createIntlCache();

export const getIntl = cache(async (locale: Locale = DefaultLocale) => {
  let messages: ResolvedIntlConfig["messages"];
  try {
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
