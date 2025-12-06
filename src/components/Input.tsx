"use client";

import {Input as AriaInput, type InputProps} from "react-aria-components";

import {cn} from "#app/utils/cn";

import {SkeletonText} from "./Text";

export function Input(props: InputProps) {
  return (
    <AriaInput
      {...props}
      className={cn(
        "rounded-base font-primary border-control-border bg-control-background text-control-text text-field-value w-full border transition-all",
        "placeholder:text-control-text-subdued",
        "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:ring-3",
        "invalid:border-critical invalid:ring-critical invalid:ring-1",
        "disabled:bg-disabled-input-background disabled:opacity-50",
        "read-only:bg-disabled-input-background read-only:opacity-50",
        props.className,
      )}
    />
  );
}

export function SkeletonInput({className}: {className?: string}) {
  return (
    <div
      className={cn(
        "rounded-base border-base-border px-field-padding-inline py-field-padding-block h-field-height flex items-center border",
        className,
      )}>
      <SkeletonText />
    </div>
  );
}
