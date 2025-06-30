"use client";

import {Button, ButtonProps} from "react-aria-components";

import {cn} from "../utils/cn";

export function IconButton({children, ...props}: ButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        "rounded-base flex size-10 cursor-pointer items-center justify-center",
        "hover:bg-base-background-subdued",
        "focus-visible:ring-base-accent focus-visible:bg-base-background-subdued outline-none focus-visible:ring-2",
        "disabled:cursor-default disabled:opacity-50",
        props.className,
      )}>
      {children}
    </Button>
  );
}
