"use client";

import {
  Checkbox as AriaCheckbox,
  type CheckboxProps as AriaCheckboxProps,
} from "react-aria-components";

import {isDefined} from "@/utils/is-defined";

import {CheckmarkIcon} from "../icons/CheckmarkIcon";
import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {SkeletonText} from "./Text";

interface CheckboxProps extends AriaCheckboxProps {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

export function Checkbox({
  children,
  primaryContent,
  secondaryContent,
  ...props
}: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={cn(
        "gap-small-100 relative flex cursor-pointer",
        "disabled:cursor-default disabled:opacity-50",
        "read-only:opacity-50",
        "group-data-[variant=group]:p-base group-data-[variant=group]:border-control-border group-data-[variant=group]:bg-base-background group-data-[variant=group]:border",
        "group-data-[variant=group]:after:absolute group-data-[variant=group]:after:inset-[-1px] group-data-[variant=group]:after:border group-data-[variant=group]:after:border-transparent group-data-[variant=group]:after:transition-all",
        "group-data-[variant=group]:first:rounded-t-base group-data-[variant=group]:last:rounded-b-base group-data-[variant=group]:not-first:border-t-0",
        "group-data-[variant=group]:first:after:rounded-t-base group-data-[variant=group]:last:after:rounded-b-base",
        "group-data-[variant=group]:selected:bg-control-selected-background",
        "group-data-[variant=group]:selected:after:border-control-selected-border",
        text(),
        props.className,
      )}>
      {({
        isFocusVisible,
        isFocused,
        isInvalid,
        isPressed,
        isSelected,
        ...renderProps
      }) => (
        <>
          <div
            className={cn(
              "border-control-border bg-control-background rounded-small flex size-5 shrink-0 items-center justify-center border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused || isPressed,
                "border-critical ring-critical/50 border-2": isInvalid,
                "bg-critical border-critical": isInvalid && isSelected,
                "bg-control-accent border-control-accent":
                  isSelected && !isInvalid,
              },
            )}>
            <CheckmarkIcon
              aria-hidden
              className={cn("stroke-control-accent-contrast size-3")}
            />
          </div>
          <div className={cn("gap-small-300 flex w-full justify-between")}>
            <div className={cn("gap-small-400 flex flex-col")}>
              {typeof children === "function"
                ? children({
                    isFocusVisible,
                    isFocused,
                    isInvalid,
                    isPressed,
                    isSelected,
                    ...renderProps,
                  })
                : children}
              {primaryContent}
            </div>
            {isDefined(secondaryContent) && (
              <div className={cn("hidden", "group-data-[variant=group]:block")}>
                {secondaryContent}
              </div>
            )}
          </div>
        </>
      )}
    </AriaCheckbox>
  );
}

export function SkeletonCheckbox() {
  return (
    <div
      className={cn(
        "gap-small-100 flex items-center",
        "group-data-[variant=group]:p-base group-data-[variant=group]:border-base-border group-data-[variant=group]:bg-base-background group-data-[variant=group]:border",
        "group-data-[variant=group]:first:rounded-t-base group-data-[variant=group]:last:rounded-b-base group-data-[variant=group]:not-first:border-t-0",
      )}>
      <div
        className={cn(
          "border-base-border rounded-small size-5 shrink-0 border",
        )}
      />
      <SkeletonText />
    </div>
  );
}
