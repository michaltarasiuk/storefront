"use client";

import {cva, VariantProps} from "class-variance-authority";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps,
  MenuTrigger,
  Popover,
} from "react-aria-components";

import {cn} from "../utils/cn";

export {MenuTrigger};

export function Menu<T extends Record<PropertyKey, unknown>>({
  children,
  ...props
}: MenuProps<T>) {
  return (
    <Popover>
      <AriaMenu
        {...props}
        className={cn(
          "p-base gap-small-500 bg-base-background rounded-base border-base-border shadow-extra-large flex w-64 flex-col border",
          "outline-none",
          props.className,
        )}>
        {children}
      </AriaMenu>
    </Popover>
  );
}

const menuItem = cva(
  [
    "py-small-200 px-base text-control-text font-primary rounded-small cursor-pointer text-base",
    "hover:bg-base-background-subdued",
    "disabled:cursor-default disabled:opacity-50",
    "focus-visible:bg-base-background-subdued outline-none",
  ],
  {
    variants: {
      critical: {
        true: "text-critical hover:bg-critical-background-subdued",
      },
    },
  },
);

interface MenuItemProps<T>
  extends AriaMenuItemProps<T>,
    VariantProps<typeof menuItem> {}

export function MenuItem<T extends Record<PropertyKey, unknown>>({
  children,
  critical,
  ...props
}: MenuItemProps<T>) {
  return (
    <AriaMenuItem
      {...props}
      className={cn(
        menuItem({
          critical,
        }),
        props.className,
      )}>
      {children}
    </AriaMenuItem>
  );
}
