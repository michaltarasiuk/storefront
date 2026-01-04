"use client";

import {cva} from "cva";
import {Button, type ButtonProps, type LinkProps} from "react-aria-components";

import {IntlLink} from "#app/i18n/components/IntlLink";
import {text} from "#app/styles/text";
import {cn} from "#app/utils/cn";

const menuItem = cva([
  "px-base py-small-100 rounded-base block w-full cursor-pointer text-start",
  "hover:bg-base-background-subdued hover:underline hover:underline-offset-2",
  "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2 focus-visible:ring-offset-0",
  "data-route-match:underline data-route-match:underline-offset-2",
  text(),
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
