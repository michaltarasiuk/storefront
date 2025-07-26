"use client";

import {cva} from "class-variance-authority";
import {usePathname} from "next/navigation";
import {Button, type ButtonProps, type LinkProps} from "react-aria-components";

import {IntlLink} from "@/i18n/components/IntlLink";
import {useLocale} from "@/i18n/hooks/use-locale";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";
import {joinPathname} from "@/utils/join-pathname";

const menuItem = cva(
  [
    "px-base py-small-100 rounded-base text-base-text w-full cursor-pointer text-start",
    "hover:bg-base-background-subdued hover:underline hover:underline-offset-2",
    "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
  ],
  {
    variants: {
      current: {
        true: "underline underline-offset-2",
      },
    },
  },
);

export function MenuItemLink({children, href, ...props}: LinkProps) {
  const locale = useLocale();
  const pathname = usePathname();
  const hrefWithLocale = isDefined(href) ? joinPathname(locale, href) : href;
  return (
    <IntlLink
      href={href}
      {...props}
      className={cn(
        menuItem({
          current: isDefined(hrefWithLocale) && hrefWithLocale === pathname,
        }),
        props.className,
      )}>
      {children}
    </IntlLink>
  );
}

export function MenuItemButton({children, ...props}: ButtonProps) {
  return (
    <Button {...props} className={cn(menuItem(), props.className)}>
      {children}
    </Button>
  );
}
