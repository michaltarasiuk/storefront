"use client";

import {Link} from "@/components/Link";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

import {useChannel} from "../hooks/use-channel";
import {useLocale} from "../hooks/use-locale";

export function IntlLink({
  children,
  href,
  ...props
}: React.ComponentProps<typeof Link>) {
  const locale = useLocale();
  const channel = useChannel();
  const hrefWithLocaleAndChannel = isDefined(href)
    ? joinPathSegments(locale, channel, href)
    : href;
  return (
    <Link href={hrefWithLocaleAndChannel} {...props}>
      {children}
    </Link>
  );
}
