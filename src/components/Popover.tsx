"use client";

import {
  Dialog,
  Popover as AriaPopover,
  type PopoverProps,
} from "react-aria-components";

import {cn} from "@/utils/cn";

export {DialogTrigger as PopoverTrigger} from "react-aria-components";

export function Popover({children, ...props}: PopoverProps) {
  return (
    <AriaPopover
      {...props}
      className={cn(
        "bg-base-background rounded-base border-base-border shadow-extra-large p-small-300 border",
        props.className,
      )}>
      {(renderProps) => (
        <Dialog className={cn("min-w-52 outline-none")}>
          {typeof children === "function" ? children(renderProps) : children}
        </Dialog>
      )}
    </AriaPopover>
  );
}
