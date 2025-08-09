"use client";

import {Switch as AriaSwitch, type SwitchProps} from "react-aria-components";

import {CheckmarkIcon} from "@/icons/CheckmarkIcon";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

export function Switch({children, ...props}: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={cn(
        "gap-small-100 flex cursor-pointer items-center",
        "disabled:opacity-50",
        text(),
        props.className,
      )}>
      {({isFocusVisible, isFocused, isPressed, isSelected, ...renderProps}) => (
        <>
          {typeof children === "function"
            ? children({
                isFocusVisible,
                isFocused,
                isPressed,
                isSelected,
                ...renderProps,
              })
            : children}
          <div
            className={cn(
              "rounded-fully border-control-border bg-control-background relative flex h-6 w-10 items-center border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused || isPressed,
                "bg-control-accent border-control-accent": isSelected,
              },
            )}>
            <div
              className={cn(
                "rounded-fully absolute flex items-center justify-center transition-all",
                isSelected
                  ? "bg-control-accent-contrast start-[calc((var(--spacing)*5-var(--spacing-small-500)))] size-5"
                  : "bg-control-text-subdued size-base start-small-400",
              )}>
              <CheckmarkIcon
                aria-hidden
                className={cn("size-3 opacity-0", {
                  "opacity-100 transition-opacity delay-150": isSelected,
                })}
              />
            </div>
          </div>
        </>
      )}
    </AriaSwitch>
  );
}
