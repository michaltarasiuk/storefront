"use client";

import {
  ToggleButton as AriaToggleButton,
  ToggleButtonProps,
} from "react-aria-components";

import {cn} from "@/shared/utils/cn";

export function ToggleButton({children, ...props}: ToggleButtonProps) {
  return (
    <AriaToggleButton
      {...props}
      className={cn(
        "p-base rounded-base bg-control-background border-control-border flex cursor-pointer flex-col justify-center border transition-all",
        "focus-visible:ring-control-border/50 outline-none focus-visible:ring-3",
        "pressed:border-control-selected-border pressed:focus-visible:ring-control-selected-border/50",
        "selected:bg-control-selected-background selected:border-control-selected-border selected:focus-visible:ring-control-selected-border/50",
        "disabled:cursor-default disabled:opacity-50",
        props.className,
      )}>
      {children}
    </AriaToggleButton>
  );
}
