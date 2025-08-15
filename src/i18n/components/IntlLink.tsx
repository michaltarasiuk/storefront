"use client";

import {Link} from "@/components/Link";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

import {useBasePath} from "../../hooks/use-base-path";

export function IntlLink({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  const basePath = useBasePath();
  const href = isDefined(props.href)
    ? joinPathSegments(...basePath, props.href)
    : undefined;
  return (
    <Link {...props} href={href}>
      {children}
    </Link>
  );
}
