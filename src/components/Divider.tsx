"use client";

import {cva, type VariantProps} from "cva";
import {useSeparator} from "react-aria";
import type {SeparatorProps} from "react-aria-components";

import {cn} from "#app/utils/cn";

const divider = cva("border-base-border", {
  variants: {
    orientation: {
      horizontal: "h-0 w-full",
      vertical: "h-full w-0",
    },
    size: {
      small: null,
      base: null,
      large: null,
      extraLarge: null,
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "small",
      className: "border-t-px",
    },
    {
      orientation: "horizontal",
      size: "base",
      className: "border-t-2",
    },
    {
      orientation: "horizontal",
      size: "large",
      className: "border-t-5",
    },
    {
      orientation: "horizontal",
      size: "extraLarge",
      className: "border-t-10",
    },
    {
      orientation: "vertical",
      size: "small",
      className: "border-s-px",
    },
    {
      orientation: "vertical",
      size: "base",
      className: "border-s-2",
    },
    {
      orientation: "vertical",
      size: "large",
      className: "border-s-5",
    },
    {
      orientation: "vertical",
      size: "extraLarge",
      className: "border-s-10",
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "base",
  },
});

export function Divider({
  orientation,
  size,
  ...props
}: SeparatorProps & VariantProps<typeof divider>) {
  const {separatorProps} = useSeparator(props);
  return (
    <div
      className={cn(
        divider({
          orientation,
          size,
        }),
      )}
      {...separatorProps}
    />
  );
}
