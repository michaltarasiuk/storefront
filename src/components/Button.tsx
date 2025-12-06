"use client";

import {cva, type VariantProps} from "cva";
import {
  Button as AriaButton,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components";

import {cn} from "#app/utils/cn";

import {Spinner} from "./Spinner";

const button = cva(
  [
    "rounded-base font-primary relative flex cursor-pointer items-center justify-center border text-base font-medium transition-all",
    "outline-none focus-visible:ring-3",
    "disabled:cursor-default",
  ],
  {
    variants: {
      appearance: {
        base: null,
        critical: null,
      },
      kind: {
        primary: null,
        secondary: null,
        plain: null,
      },
      size: {
        small: "p-small-200",
        base: "p-base",
        large: "p-large-200",
        extraLarge: "p-large-300",
      },
    },
    compoundVariants: [
      {
        appearance: "base",
        kind: "primary",
        className: [
          "text-primary-button-text bg-primary-button-background border-primary-button-background",
          "hover:text-primary-button-hover-text hover:bg-primary-button-hover-background",
          "focus-visible:ring-primary-button-background/50",
        ],
      },
      {
        appearance: "base",
        kind: "secondary",
        className: [
          "text-secondary-button-text border-secondary-button-border bg-base-background",
          "hover:text-secondary-button-hover-text hover:border-secondary-button-hover-border",
          "focus-visible:ring-secondary-button-border/50",
        ],
      },
      {
        appearance: "base",
        kind: "plain",
        className: [
          "text-base-accent border-transparent",
          "focus-visible:ring-base-accent/50",
        ],
      },
      {
        appearance: "critical",
        kind: "primary",
        className: [
          "text-critical-text-contrast bg-critical border-critical",
          "focus-visible:ring-critical/50",
        ],
      },
      {
        appearance: "critical",
        kind: "secondary",
        className: [
          "text-critical border-critical bg-base-background",
          "focus-visible:ring-critical/50",
        ],
      },
      {
        appearance: "critical",
        kind: "plain",
        className: [
          "text-critical border-transparent",
          "focus-visible:ring-critical/50",
        ],
      },
      {
        kind: "primary",
        className:
          "disabled:text-control-text-subdued disabled:bg-base-background-subdued disabled:border-base-border",
      },
      {
        kind: "secondary",
        className:
          "disabled:text-control-text-subdued disabled:border-control-border",
      },
      {
        kind: "plain",
        className: "disabled:opacity-50",
      },
    ],
    defaultVariants: {
      appearance: "base",
      kind: "primary",
      size: "base",
    },
  },
);

interface ButtonProps extends AriaButtonProps, VariantProps<typeof button> {}

export function Button({
  children,
  appearance,
  kind,
  size,
  ...props
}: ButtonProps) {
  return (
    <AriaButton
      {...props}
      className={cn(
        button({
          appearance,
          kind,
          size,
        }),
        props.className,
      )}>
      {({isPending, ...renderProps}) => (
        <>
          <span
            aria-hidden={isPending}
            className={cn("gap-small-200 flex items-center", {
              invisible: isPending,
            })}>
            {typeof children === "function"
              ? children({
                  isPending,
                  ...renderProps,
                })
              : children}
          </span>
          {isPending && <Spinner className={cn("absolute")} />}
        </>
      )}
    </AriaButton>
  );
}
