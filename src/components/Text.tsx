"use client";

import type {VariantProps} from "class-variance-authority";
import {
  Text as AriaText,
  TextProps as AriaTextProps,
} from "react-aria-components";

import {cn} from "@/utils/cn";

import {text} from "../styles/text";

interface TextProps extends AriaTextProps, VariantProps<typeof text> {
  children: React.ReactNode;
}

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

export function TextBlock({
  children,
  appearance,
  emphasis,
  size,
  ...props
}: TextProps) {
  return (
    <AriaText
      elementType="p"
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
