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

interface BreadcrumbItem extends BreadcrumbLinkProps {
  id: string;
  label: string;
}

export function Breadcrumbs({
  children,
  ...props
}: BreadcrumbsProps<BreadcrumbItem>) {
  return (
    <AriaBreadcrumbs
      {...props}
      className={cn("gap-small-200 flex flex-wrap", props.className)}>
      {children ??
        (({label, ...props}) => (
          <BreadcrumbLink {...props}>{label}</BreadcrumbLink>
        ))}
    </AriaBreadcrumbs>
  );
}

const breadcrumbLink = cva("hover:no-underline", {
  variants: {
    current: {
      true: "text-base-text",
    },
  },
});

type BreadcrumbLinkProps = React.ComponentProps<typeof IntlLink>;

export function BreadcrumbLink({
  children,
  isDisabled = false,
  ...props
}: BreadcrumbLinkProps) {
  const pathname = usePathname();
  const basePath = useBasePath();
  const href = isDefined(props.href)
    ? joinPathSegments(...basePath, props.href)
    : undefined;
  return (
    <Breadcrumb className={cn("group")}>
      <IntlLink
        isDisabled={isDisabled}
        {...props}
        className={cn(
          breadcrumbLink({
            current: pathname === href,
          }),
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
