"use client";

import type {VariantProps} from "cva";
import {
  Text as AriaText,
  type TextProps as AriaTextProps,
} from "react-aria-components";

import {cn} from "#app/utils/cn";

import {text} from "../styles/text";

interface TextBlockProps extends AriaTextProps, VariantProps<typeof text> {}

export function TextBlock({
  children,
  appearance,
  emphasis,
  size,
  ...props
}: TextBlockProps) {
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
