import {useParams} from "next/navigation";

import type {Locale} from "../consts";

export function useLocale() {
  return useParams<{locale: Locale}>().locale;
}
