"use client";

import {cva, type VariantProps} from "class-variance-authority";
import {
  Label,
  RadioGroup as AriaRadioGroup,
  type RadioGroupProps as AriaRadioGroupProps,
} from "react-aria-components";

import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

const radioGroup = cva("group", {
  variants: {
    variant: {
      base: "gap-base flex flex-col",
      group: null,
    },
  },
  defaultVariants: {
    variant: "base",
  },
});

interface RadioGroupProps
  extends AriaRadioGroupProps,
    VariantProps<typeof radioGroup> {
  label?: string;
}

export function RadioGroup({
  label,
  children,
  variant,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup {...props}>
      {(renderProps) => (
        <>
          {isDefined(label) && (
            <Label
              className={cn(
                text({
                  font: "secondary",
                  emphasis: "semibold",
                }),
              )}>
              {label}
            </Label>
          )}
          <div
            data-variant={variant}
            className={cn(
              radioGroup({
                variant,
              }),
              {
                "ms-base mt-base": isDefined(label),
              },
            )}>
            {typeof children === "function" ? children(renderProps) : children}
          </div>
        </>
      )}
    </AriaRadioGroup>
  );
}

interface SkeletonRadioGroupProps extends VariantProps<typeof radioGroup> {
  children: React.ReactNode;
  label?: React.ReactNode;
}

export function SkeletonRadioGroup({
  children,
  label,
  variant,
}: SkeletonRadioGroupProps) {
  return (
    <>
      {label}
      <div
        data-variant={variant}
        className={cn(
          radioGroup({
            variant,
          }),
        )}>
        {children}
      </div>
    </>
  );
}
