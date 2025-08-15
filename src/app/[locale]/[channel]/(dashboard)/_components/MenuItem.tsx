"use client";

import {cva} from "class-variance-authority";
import {usePathname} from "next/navigation";
import {Button, type ButtonProps, type LinkProps} from "react-aria-components";

import {useBasePath} from "@/hooks/use-base-path";
import {IntlLink} from "@/i18n/components/IntlLink";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";
import {joinPathSegments} from "@/utils/pathname";

const menuItem = cva(
  [
    "px-base py-small-100 rounded-base w-full cursor-pointer text-start",
    "hover:bg-base-background-subdued hover:underline hover:underline-offset-2",
    "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
    text(),
  ],
  {
    variants: {
      current: {
        true: "underline underline-offset-2",
      },
    },
  },
);

export function MenuItemLink({children, ...props}: LinkProps) {
  const pathname = usePathname();
  const basePath = useBasePath();
  const href = isDefined(props.href)
    ? joinPathSegments(...basePath, props.href)
    : undefined;
  return (
    <IntlLink
      href={href}
      {...props}
      className={cn(
        menuItem({
          current: pathname === href,
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
