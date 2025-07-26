"use client";

import {Link} from "@/components/Link";
import {isDefined} from "@/utils/is-defined";
import {joinPathname} from "@/utils/join-pathname";

import {useLocale} from "../hooks/use-locale";

export function IntlLink({
  children,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const locale = useLocale();
  const hrefWithLocale = isDefined(href) ? joinPathname(locale, href) : href;
  return (
    <Link href={hrefWithLocale} {...props}>
      {children}
    </Link>
  );
}
