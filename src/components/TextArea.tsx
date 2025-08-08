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
      onChange={(newValue) => {
        setValue(newValue);
        props.onChange?.(newValue);
      }}>
      <div
        data-replicated-value={value + " "}
        className={cn(
          "group relative grid min-h-20",
          "after:invisible after:border after:p-3 after:text-base after:break-all after:whitespace-pre-wrap after:transition-all after:duration-300 after:content-[attr(data-replicated-value)] after:[grid-area:1/1/2/2] has-[textarea:not(:placeholder-shown)]:after:pt-6",
        )}>
        <Label
          className={cn(
            "text-control-text-subdued font-primary text-small pointer-events-none absolute start-3 top-3 ms-px translate-y-full leading-[1] opacity-0 transition-all duration-300",
            "group-has-[textarea:not(:placeholder-shown)]:translate-y-0 group-has-[textarea:not(:placeholder-shown)]:opacity-100",
          )}>
          {label}
        </Label>
        <AriaTextArea
          placeholder={label}
          className={cn(
            "rounded-base border-control-border bg-control-background resize-none overflow-hidden border p-3 transition-all duration-300 [grid-area:1/1/2/2]",
            "placeholder:text-control-text-subdued [&:not(:placeholder-shown)]:pt-6",
            "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:shadow-none focus:ring-3",
            "invalid:border-critical invalid:ring-critical invalid:ring-1",
            "disabled:bg-disabled-input-background disabled:opacity-50",
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
