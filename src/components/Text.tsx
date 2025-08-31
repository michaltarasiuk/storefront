"use client";

import {cva, type VariantProps} from "class-variance-authority";
import {
  Text as AriaText,
  type TextProps as AriaTextProps,
} from "react-aria-components";

import {cn} from "@/utils/cn";

import {text} from "../styles/text";
import {Skeleton} from "./Skeleton";

type TextVariants = VariantProps<typeof text>;

interface TextProps extends AriaTextProps, TextVariants {}

export function Text({
  children,
  appearance,
  emphasis,
  size,
  ...props
}: TextProps) {
  return (
    <AriaText
      elementType="span"
      {...props}
      className={cn(
        text({
          appearance,
          emphasis,
          size,
        }),
        props.className,
      )}>
      {children}
    </AriaText>
  );
}

interface SkeletonTextProps extends VariantProps<typeof skeletonText> {
  size?: TextVariants["size"];
  className?: string;
}

export function SkeletonText({inlineSize, size, className}: SkeletonTextProps) {
  return (
    <div
      role="presentation"
      className={cn(
        skeletonText({
          inlineSize,
        }),
        text({
          size,
        }),
        className,
      )}>
      <Skeleton className={cn("h-[1em] w-full")} />
    </div>
  );
}

const skeletonText = cva("flex h-[1lh] w-full max-w-36 items-center", {
  variants: {
    inlineSize: {
      small: "max-w-20",
      base: "max-w-44",
      large: "max-w-64",
    },
  },
  defaultVariants: {
    inlineSize: "base",
  },
});
