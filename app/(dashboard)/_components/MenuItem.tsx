"use client";

import {cva} from "class-variance-authority";
import {usePathname} from "next/navigation";
import {
  Button,
  type ButtonProps,
  Link,
  type LinkProps,
} from "react-aria-components";

import {cn} from "@/shared/utils/cn";

const menuItem = cva(
  [
    "px-base py-small-200 rounded-base text-base-text w-full cursor-pointer text-start",
    "hover:bg-base-background-subdued",
    "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2",
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
  return (
    <Link
      {...props}
      className={cn(
        menuItem({
          current: pathname === props.href,
        }),
        props.className,
      )}>
      {children}
    </Link>
  );
}

export function MenuItemButton({children, ...props}: ButtonProps) {
  return (
    <Button {...props} className={cn(menuItem(), props.className)}>
      {children}
    </Button>
  );
}
