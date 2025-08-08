"use client";

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

interface TextFieldProps extends AriaTextFieldProps {
  label: string;
  description?: string;
}

export function TextField({label, description, ...props}: TextFieldProps) {
  return (
    <AriaTextField {...props} className={cn("group relative", props.className)}>
      <Label
        className={cn(
          "text-control-text-subdued font-primary text-small pointer-events-none absolute start-3 top-3 ms-px translate-y-full leading-[1] opacity-0 transition-all duration-300",
          "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
        )}>
        {label}
      </Label>
      <Input
        placeholder={label}
        className={cn("h-input p-3", "[&:not(:placeholder-shown)]:pt-6")}
      />
      {isDefined(description) && (
        <Text slot="description" appearance="subdued" size="small">
          {description}
        </Text>
      )}
      <FieldError className={cn("mt-small-400")} />
    </AriaTextField>
  );
}
