import "server-only";

import type {ResolvedIntlConfig} from "@formatjs/intl";

import type {Locale} from "../consts";

export async function loadCompiledMessages(locale: Locale) {
  const compliedMessages = await import(`#messages/compiled/${locale}.json`, {
    with: {
      type: "json",
    },
  });
  return compliedMessages.default as ResolvedIntlConfig["messages"];
}
