"use client";

import {cva, VariantProps} from "class-variance-authority";
import {
  Button,
  type ButtonProps,
  Link,
  type LinkProps,
} from "react-aria-components";

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
    },
    defaultVariants: {
      appearance: "base",
    },
  },
);

interface IconButtonProps
  extends ButtonProps,
    VariantProps<typeof iconButton> {}

export function IconButton({children, appearance, ...props}: IconButtonProps) {
  return (
    <Button
      {...props}
      className={cn(
        cn(
          iconButton({
            appearance,
          }),
        ),
        props.className,
      )}>
      {children}
    </Button>
  );
}

interface IconLinkProps extends LinkProps, VariantProps<typeof iconButton> {}

export function IconLink({children, appearance, ...props}: IconLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        cn(
          iconButton({
            appearance,
          }),
        ),
        props.className,
      )}>
      {children}
    </Link>
  );
}
