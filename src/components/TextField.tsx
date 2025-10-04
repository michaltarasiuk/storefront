"use client";

import {cva, type VariantProps} from "cva";
import {
  Label,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {FieldError} from "./FieldError";
import {Input} from "./Input";
import {Text} from "./Text";

const input = cva(
  [
    "px-field-padding-inline py-empty-field-padding-block h-field-height",
    "[&:not(:placeholder-shown)]:pt-filled-field-padding-block-start [&:not(:placeholder-shown)]:pb-filled-field-padding-block-end",
  ],
  {
    variants: {
      isUppercased: {
        true: "[&:not(:placeholder-shown)]:uppercase",
      },
    },
  },
);

interface TextFieldProps
  extends AriaTextFieldProps,
    VariantProps<typeof input> {
  label: string;
  description?: string;
  accessory?: React.ReactNode;
}

export function TextField({
  label,
  description,
  accessory,
  isUppercased,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={cn("leading-field-line-height", props.className)}>
      <div className={cn("group relative flex items-center")}>
        <Label
          className={cn(
            "text-control-text-subdued font-primary text-field-label start-label-inset-inline-start top-label-inset-block-start pointer-events-none absolute translate-y-1/4 opacity-0 transition-all",
            "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
          )}>
          {label}
        </Label>
        <Input
          placeholder={label}
          className={cn(
            input({
              isUppercased,
            }),
          )}
        />
        {isDefined(accessory) && (
          <div className={cn("end-field-padding-inline absolute")}>
            {accessory}
          </div>
        )}
      </div>
      {isDefined(description) && (
        <Text slot="description" appearance="subdued" size="small">
          {description}
        </Text>
      )}
      <FieldError className={cn("mt-small-400")} />
    </AriaTextField>
  );
}
