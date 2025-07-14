"use client";

import {
  Input,
  Label,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {FieldError} from "./FieldError";
import {Text} from "./Text";

interface TextFieldProps extends AriaTextFieldProps {
  label: string;
  description?: string;
}

export function TextField({label, description, ...props}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={cn("group relative flex flex-col", props.className)}>
      <Label
        className={cn(
          "text-control-text-subdued font-primary text-small pointer-events-none absolute start-3 top-3 ms-px translate-y-full leading-[1] opacity-0 transition-all duration-300",
          "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
        )}>
        {label}
      </Label>
      <Input
        placeholder={label}
        className={cn(
          "rounded-base font-primary border-control-border bg-control-background text-control-text h-[3.25rem] border p-3 text-base transition-all duration-300",
          "placeholder:text-control-text-subdued",
          "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:shadow-none focus:ring-3",
          "invalid:border-critical invalid:ring-critical invalid:ring-1",
          "disabled:bg-[#F8F8F8] disabled:opacity-50",
          "[&:not(:placeholder-shown)]:pt-6",
        )}
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
