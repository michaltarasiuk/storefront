"use client";

import {
  Radio as AriaRadio,
  type RadioProps as AriaRadioProps,
} from "react-aria-components";

import {isDefined} from "#app/utils/is-defined";

import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {SkeletonText} from "./Text";

interface RadioProps extends AriaRadioProps {
  primaryContent?: React.ReactNode;
  secondaryContent?: React.ReactNode;
}

export function Radio({
  children,
  primaryContent,
  secondaryContent,
  ...props
}: RadioProps) {
  return (
    <AriaRadio
      {...props}
      className={cn(
        "gap-small-100 group relative flex cursor-pointer",
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
              "rounded-fully border-control-border bg-control-background size-5 shrink-0 border transition-all",
              {
                "ring-base-accent/50 ring-2": isFocusVisible,
                "border-base-accent": isFocused || isPressed || isSelected,
                "border-critical ring-critical/50 border-2": isInvalid,
                "border-7": isSelected,
              },
            )}
          />
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
    </AriaRadio>
  );
}

export function SkeletonRadio() {
  return (
    <div
      className={cn(
        "gap-small-100 flex items-center",
        "group-data-[variant=group]:p-base group-data-[variant=group]:border-base-border group-data-[variant=group]:bg-base-background group-data-[variant=group]:border",
        "group-data-[variant=group]:first:rounded-t-base group-data-[variant=group]:last:rounded-b-base group-data-[variant=group]:not-first:border-t-0",
      )}>
      <div
        className={cn(
          "rounded-fully border-base-border bg-control-background size-5 shrink-0 border",
        )}
      />
      <SkeletonText />
    </div>
  );
}
