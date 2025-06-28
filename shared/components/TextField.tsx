"use client";

import {
  Input,
  Label,
  TextField as AriaTextField,
  type TextFieldProps as AriaTextFieldProps,
} from "react-aria-components";

import {cn} from "../utils/cn";
import {FieldError} from "./FieldError";

interface TextFieldProps extends AriaTextFieldProps {
  label: string;
}

export function TextField({label, ...props}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={cn(
        "gap-small-400 font-primary group relative flex flex-col",
        props.className,
      )}>
      <Label
        className={cn(
          "text-control-text-subdued text-small pointer-events-none absolute top-3 left-3 ml-px translate-y-full leading-[1] opacity-0 transition-all duration-300",
          "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
        )}>
        {label}
      </Label>
      <Input
        placeholder={label}
        className={cn(
          "rounded-base border-control-border text-control-text h-[3.25rem] border p-3 text-base transition-all duration-300",
          "placeholder:text-control-text-subdued",
          "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:shadow-none focus:ring-3",
          "disabled:bg-[#F8F8F8] disabled:opacity-50",
          "invalid:border-critical invalid:ring-critical invalid:ring-1",
          "group-has-[input:not(:placeholder-shown)]:pt-6",
        )}
      />
      <FieldError />
    </AriaTextField>
  );
}
