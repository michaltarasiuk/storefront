"use client";

import {cva} from "class-variance-authority";
import {Button, type ButtonProps, type LinkProps} from "react-aria-components";

import {IntlLink} from "@/i18n/components/IntlLink";
import {cn} from "@/utils/cn";

const menuItem = cva([
  "px-base py-small-100 rounded-base text-base-text w-full cursor-pointer text-start",
  "hover:bg-base-background-subdued hover:underline hover:underline-offset-2",
  "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
  "current:underline current:underline-offset-2",
]);

export function MenuItemLink({children, ...props}: LinkProps) {
  return (
    <IntlLink {...props} className={cn(menuItem(), props.className)}>
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
