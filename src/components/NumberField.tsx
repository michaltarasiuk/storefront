"use client";

import {
  Label,
  NumberField as AriaNumberField,
  type NumberFieldProps as AriaNumberFieldProps,
} from "react-aria-components";

import {MinusIcon} from "@/icons/MinusIcon";
import {PlusIcon} from "@/icons/PlusIcon";

import {cn} from "../utils/cn";
import {isDefined} from "../utils/is-defined";
import {FieldError} from "./FieldError";
import {IconButton} from "./IconButton";
import {Input} from "./Input";
import {Text} from "./Text";

interface NumberFieldProps extends AriaNumberFieldProps {
  label: string;
  description?: string;
}

export function NumberField({label, description, ...props}: NumberFieldProps) {
  return (
    <AriaNumberField {...props}>
      <div className={cn("group relative flex items-center")}>
        <Label
          className={cn(
            "text-control-text-subdued font-primary text-small pointer-events-none absolute start-3 top-3 ms-px translate-y-full leading-[1] opacity-0 transition-all duration-300",
            "group-has-[input:not(:placeholder-shown)]:translate-y-0 group-has-[input:not(:placeholder-shown)]:opacity-100",
          )}>
          {label}
        </Label>
        <Input
          placeholder={label}
          className={cn("h-[3.25rem] p-3", "[&:not(:placeholder-shown)]:pt-6")}
        />
        <NumberFieldControls />
      </div>
      {isDefined(description) && (
        <Text slot="description" appearance="subdued" size="small">
          {description}
        </Text>
      )}
      <FieldError className={cn("mt-small-400")} />
    </AriaNumberField>
  );
}

function NumberFieldControls() {
  return (
    <div className={cn("absolute end-0 flex")}>
      <IconButton slot="decrement" className={cn("size-9")}>
        <MinusIcon className={cn("size-3.5")} />
      </IconButton>
      <IconButton slot="increment" className={cn("size-9")}>
        <PlusIcon className={cn("size-3.5")} />
      </IconButton>
    </div>
  );
}
