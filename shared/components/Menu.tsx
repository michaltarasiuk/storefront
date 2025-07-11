"use client";

import {cva, VariantProps} from "class-variance-authority";
import {usePathname} from "next/navigation";
import {
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  type MenuItemProps as AriaMenuItemProps,
  type MenuProps,
  Popover,
} from "react-aria-components";

import {cn} from "../utils/cn";

export {MenuTrigger} from "react-aria-components";

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
    "current:underline current:underline-offset-2",
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
  const pathname = usePathname();
  const current = props.href === pathname;
  return (
    <AriaMenuItem
      {...(current && {"data-current": true})}
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
