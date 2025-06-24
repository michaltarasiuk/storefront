"use client";

import {
  Text as AriaText,
  TextProps as AriaTextProps,
} from "react-aria-components";
import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/shared/utils/cn";

const text = cva("font-primary", {
  variants: {
    appearance: {
      base: "text-base-text",
      accent: "text-base-accent",
      subdued: "text-base-text-subdued",
      info: "text-info",
      success: "text-success-text",
      warning: "text-warning-warning",
      critical: "text-critical",
      decorative: "text-base-decorative",
    },
    emphasis: {
      base: "font-normal",
      italic: "italic",
      bold: "font-bold",
    },
    size: {
      extraSmall: "text-extra-small",
      small: "text-small",
      base: "text-base",
      medium: "text-medium",
      large: "text-large",
      extraLarge: "text-extra-large",
    },
  },
  defaultVariants: {
    appearance: "base",
    emphasis: "base",
    size: "base",
  },
});

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
      className={cn(
        text({
          appearance,
          emphasis,
          size,
        }),
        props.className,
      )}
      {...props}>
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
      className={cn(
        text({
          appearance,
          emphasis,
          size,
        }),
        props.className,
      )}
      {...props}>
      {children}
    </AriaText>
  );
}
