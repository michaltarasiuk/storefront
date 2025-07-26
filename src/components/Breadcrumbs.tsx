"use client";

import {usePathname} from "next/navigation";
import {
  Breadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  type BreadcrumbsProps,
} from "react-aria-components";

import {useLocale} from "@/i18n/hooks/use-locale";
import {ChevronRightIcon} from "@/icons/ChevronRightIcon";
import {cn} from "@/utils/cn";
import {joinPathname} from "@/utils/join-pathname";

import {Link} from "./Link";

interface BreadcrumbItem {
  href: string;
  label: string;
  isDisabled?: boolean;
}

export function Breadcrumbs({
  items = [],
  ...props
}: BreadcrumbsProps<BreadcrumbItem>) {
  const pathname = usePathname();
  const locale = useLocale();
  function isCurrent(href: string) {
    return joinPathname(locale, href) === pathname;
  }
  return (
    <AriaBreadcrumbs
      {...props}
      items={Array.from(items, (item) => ({key: item.href, ...item}))}
      className={cn("gap-small-200 flex", props.className)}>
      {({href, label, isDisabled}) => (
        <Breadcrumb className={cn("group")}>
          <Link
            href={href}
            isDisabled={isDisabled}
            className={cn("hover:no-underline", {
              "text-base-text": isCurrent(href),
            })}>
            {label}
            <ChevronRightIcon
              aria-hidden
              className={cn("size-3 group-last:hidden")}
            />
          </Link>
        </Breadcrumb>
      )}
    </AriaBreadcrumbs>
  );
}
