"use client";

import {Input as AriaInput, type InputProps} from "react-aria-components";

import {cn} from "@/utils/cn";

import {SkeletonText} from "./Text";

export function Input(props: InputProps) {
  return (
    <AriaInput
      {...props}
      className={cn(
        "rounded-base font-primary border-control-border bg-control-background text-control-text w-full border text-base transition-all",
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
        "rounded-base border-base-border p-base flex h-13 items-center border",
        className,
      )}>
      <SkeletonText />
    </div>
  );
}
