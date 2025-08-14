"use client";

import {cva} from "class-variance-authority";
import {usePathname} from "next/navigation";
import {
  Breadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbsProps,
} from "react-aria-components";

import {useBasePath} from "@/hooks/use-base-path";
import {IntlLink} from "@/i18n/components/IntlLink";
import {ChevronRightIcon} from "@/icons/ChevronRightIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

interface BreadcrumbItem extends React.ComponentProps<typeof BreadcrumbLink> {
  id: string;
  label: string;
}

export function Breadcrumbs({
  children = ({label, ...props}) => (
    <BreadcrumbLink {...props}>{label}</BreadcrumbLink>
  ),
  ...props
}: BreadcrumbsProps<BreadcrumbItem>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={cn("gap-small-200 flex flex-wrap", props.className)}>
      {children}
    </AriaBreadcrumbs>
  );
}

export function BreadcrumbLink({
  children,
  ...props
}: React.ComponentProps<typeof IntlLink>) {
  const pathname = usePathname();
  const basePath = useBasePath();
  const href = isDefined(props.href)
    ? joinPathSegments(...basePath, props.href)
    : props.href;
  return (
    <Breadcrumb className={cn("group")}>
      <IntlLink
        {...props}
        href={href}
        className={cn(
          "hover:no-underline",
          {
            "text-base-text": pathname === href,
          },
          props.className,
        )}>
        {(renderProps) => (
          <>
            {typeof children === "function" ? children(renderProps) : children}
            <ChevronRightIcon
              aria-hidden
              className={cn("size-3 group-last:hidden")}
            />
          </>
        )}
      </IntlLink>
    </Breadcrumb>
  );
}
