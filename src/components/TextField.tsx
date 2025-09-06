"use client";

import {cva, type VariantProps} from "class-variance-authority";
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

const input = cva(["h-input p-small-100", "[&:not(:placeholder-shown)]:pt-6"], {
  variants: {
    isUpper: {
      true: "[&:not(:placeholder-shown)]:uppercase",
    },
  },
});

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
  isUpper,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField {...props}>
      <div className={cn("group relative flex items-center")}>
        <Label
          className={cn(
            "text-control-text-subdued font-primary text-small top-small-100 start-small-100 pointer-events-none absolute ms-px translate-y-full leading-[1] opacity-0 transition-all",
            "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
          )}>
          {label}
        </Label>
        <Input
          placeholder={label}
          className={cn(
            input({
              isUpper,
            }),
          )}
        />
        {isDefined(accessory) && (
          <div className={cn("end-small-100 absolute")}>{accessory}</div>
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
