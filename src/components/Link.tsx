"use client";

import {Link as AriaLink, type LinkProps} from "react-aria-components";

import {text} from "@/styles/text";

import {cn} from "../utils/cn";

export function Link({children, ...props}: LinkProps) {
  return (
    <AriaLink
      {...props}
      className={cn(
        "rounded-base gap-small-200 flex items-center justify-center",
        "hover:underline hover:underline-offset-2",
        "focus-visible:ring-control-accent outline-none focus-visible:ring-2 focus-visible:ring-offset-3",
        "disabled:text-base-text-subdued",
        text({
          appearance: "accent",
        }),
        props.className,
      )}>
      {children}
    </AriaLink>
  );
}
