import {cva, type VariantProps} from "class-variance-authority";
import {
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
  Label,
} from "react-aria-components";

import {text} from "../styles/text";
import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";

const checkboxGroup = cva("group", {
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

interface CheckboxGroupProps
  extends AriaCheckboxGroupProps,
    VariantProps<typeof checkboxGroup> {
  label?: string;
}

export function CheckboxGroup({
  label,
  children,
  variant,
  ...props
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup {...props}>
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
              checkboxGroup({
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
    </AriaCheckboxGroup>
  );
}
