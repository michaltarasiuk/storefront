"use client";

import {cva, type VariantProps} from "cva";
import {Button, type ButtonProps, type LinkProps} from "react-aria-components";

import {IntlLink} from "#app/i18n/components/IntlLink";

import {cn} from "../utils/cn";

const iconButton = cva(
  [
    "rounded-base flex aspect-square cursor-pointer items-center justify-center",
    "outline-none focus-visible:ring-2",
    "disabled:cursor-default disabled:opacity-50",
  ],
  {
    variants: {
      appearance: {
        base: "focus-visible:ring-base-accent",
        info: "focus-visible:ring-info-border",
        success: "focus-visible:ring-success-border",
        warning: "focus-visible:ring-warning-border",
        critical: "focus-visible:ring-critical-border",
      },
      variant: {
        outline: [
          "border-control-border border transition-all",
          "focus-visible:ring-control-accent/50 focus-visible:border-control-accent outline-none focus-visible:ring-3",
        ],
      },
    },
    defaultVariants: {
      appearance: "base",
    },
  },
);

interface IconButtonProps
  extends ButtonProps,
    VariantProps<typeof iconButton> {}

export function IconButton({
  children,
  appearance,
  variant,
  ...props
}: IconButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        cn(
          iconButton({
            appearance,
            variant,
          }),
        ),
        props.className,
      )}>
      {children}
    </Button>
  );
}

interface IconLinkProps extends LinkProps, VariantProps<typeof iconButton> {}

export function IconLink({
  children,
  appearance,
  variant,
  ...props
}: IconLinkProps) {
  return (
    <IntlLink
      {...props}
      className={cn(
        cn(
          iconButton({
            appearance,
            variant,
          }),
        ),
        props.className,
      )}>
      {children}
    </IntlLink>
  );
}
