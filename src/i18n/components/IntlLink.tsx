"use client";

import {usePathname} from "next/navigation";

import {Link} from "#app/components/Link";
import {isDefined} from "#app/utils/is-defined";
import {joinPathSegments} from "#app/utils/pathname";

import {useBasePathname} from "../../hooks/use-base-pathname";

export function IntlLink({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();
  const basePathname = useBasePathname();
  const href = isDefined(props.href)
    ? joinPathSegments(...basePathname, props.href)
    : undefined;
  return (
    <Link
      {...props}
      {...(href === pathname && {"data-route-match": true})}
      href={href}>
      {children}
    </Link>
  );
}
