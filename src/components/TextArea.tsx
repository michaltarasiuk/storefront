"use client";

import {useState} from "react";
import {
  Label,
  TextArea as AriaTextArea,
  TextField,
  type TextFieldProps,
} from "react-aria-components";

import {text} from "@/styles/text";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {FieldError} from "./FieldError";
import {Text} from "./Text";

interface TextAreaProps extends TextFieldProps {
  label: string;
  description?: string;
}

export function TextArea({label, description, ...props}: TextAreaProps) {
  const [value, setValue] = useState("");
  return (
    <TextField
      value={value}
      {...props}
      className={cn("leading-field-line-height", props.className)}
      onChange={(newValue) => {
        setValue(newValue);
        props.onChange?.(newValue);
      }}>
      <div
        data-replicated-value={value + " "}
        className={cn(
          "group relative grid min-h-20",
          "after:p-small-100 after:invisible after:border after:text-base after:break-all after:whitespace-pre-wrap after:transition-all after:content-[attr(data-replicated-value)] after:[grid-area:1/1/2/2] has-[textarea:not(:placeholder-shown)]:after:pt-6",
        )}>
        <Label
          className={cn(
            "text-control-text-subdued font-primary text-field-label top-label-inset-block-start start-label-inset-inline-start pointer-events-none absolute translate-y-1/4 opacity-0 transition-all",
            "group-has-[textarea:not(:placeholder-shown)]:translate-y-0 group-has-[textarea:not(:placeholder-shown)]:opacity-100",
          )}>
          {label}
        </Label>
        <AriaTextArea
          placeholder={label}
          className={cn(
            "rounded-base text-field-value border-control-border bg-control-background px-field-padding-inline py-field-padding-block resize-none overflow-hidden border transition-all [grid-area:1/1/2/2]",
            "placeholder:text-control-text-subdued [&:not(:placeholder-shown)]:pt-filled-field-padding-block-start [&:not(:placeholder-shown)]:pb-filled-field-padding-block-end",
            "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:ring-3",
            "invalid:border-critical invalid:ring-critical invalid:ring-1",
            "disabled:bg-disabled-input-background disabled:opacity-50",
            "read-only:bg-disabled-input-background read-only:opacity-50",
            text({
              appearance: "control",
            }),
          )}
        />
      </div>
      {isDefined(description) && (
        <Text slot="description" appearance="subdued" size="small">
          {description}
        </Text>
      )}
      <FieldError className={cn("mt-small-400")} />
    </TextField>
  );
}
