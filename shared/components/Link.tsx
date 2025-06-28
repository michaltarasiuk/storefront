"use client";

import {Link as AriaLink, LinkProps} from "react-aria-components";

import {cn} from "../utils/cn";

export function Link({children, ...props}: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={cn(
        "rounded-base font-primary text-base-accent text-base leading-none",
        "hover:underline",
        "focus-visible:ring-control-accent focus-visible:ring-offset-base-background outline-none focus-visible:ring-2 focus-visible:ring-offset-3",
        props.className,
      )}>
      {children}
    </AriaLink>
  );
}
