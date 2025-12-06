"use client";

import {Input} from "react-aria-components";

import {useLocale} from "#app/i18n/hooks/use-locale";

export function LocaleField() {
  const locale = useLocale();
  return <Input type="hidden" name="locale" value={locale} />;
}
