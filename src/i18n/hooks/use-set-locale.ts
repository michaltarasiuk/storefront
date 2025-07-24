import {usePathname, useRouter, useSearchParams} from "next/navigation";

import type {Locale} from "../consts";
import {setNextLocaleCookie} from "../utils/set-next-locale";
import {useLocale} from "./use-locale";

export function useSetLocale() {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  function setLocale(newLocale: Locale) {
    setNextLocaleCookie(newLocale);
    let newPathname = pathname.replace(
      new RegExp(`^/${currentLocale}`),
      `/${newLocale}`,
    );
    if (searchParams.size > 0) {
      newPathname += "?" + searchParams;
    }
    router.push(newPathname);
  }
  return {
    setLocale,
  };
}
