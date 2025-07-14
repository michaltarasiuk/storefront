"use client";

import {Link as AriaLink, LinkProps} from "react-aria-components";

import {cn} from "../utils/cn";

export function Link({children, ...props}: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={cn(
        "rounded-base font-primary text-base-accent text-base",
        "hover:underline",
        "focus-visible:ring-control-accent outline-none focus-visible:ring-2 focus-visible:ring-offset-3",
        props.className,
      )}>
      {children}
    </AriaLink>
  );
}
