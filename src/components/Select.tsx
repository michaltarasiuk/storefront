"use client";

import {useState} from "react";
import type {
  Key,
  ListBoxItemProps,
  ListBoxProps,
  SelectProps as AriaSelectProps,
} from "react-aria-components";
import {
  Button,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select as AriaSelect,
  SelectValue,
} from "react-aria-components";

import {CheckmarkIcon} from "#app/icons/CheckmarkIcon";
import {ChevronDownIcon} from "#app/icons/ChevronDownIcon";
import {ChevronUpIcon} from "#app/icons/ChevronUpIcon";
import {text} from "#app/styles/text";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

import {FieldError} from "./FieldError";
import {Text} from "./Text";

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children">,
    Pick<ListBoxProps<T>, "children"> {
  label: string;
  description?: string;
}

export function Select<T extends object>({
  label,
  description,
  children,
  ...props
}: SelectProps<T>) {
  const [value, setValue] = useState<Key | null>(
    (props.value ?? props.defaultValue) || null,
  );
  return (
    <AriaSelect
      value={value}
      {...props}
      className={cn("leading-field-line-height", props.className)}
      onChange={(key) => {
        setValue(key);
        props.onChange?.(key);
      }}>
      {({isDisabled, isFocused, isInvalid, isOpen}) => (
        <>
          <Button
            className={cn(
              "rounded-base border-control-border bg-control-background px-field-padding-inline py-empty-field-padding-block h-field-height relative flex w-full cursor-pointer items-center justify-between border transition-all",
              {
                "pt-filled-field-padding-block-start pb-filled-field-padding-block-end":
                  isDefined(value),
                "border-critical ring-critical ring-1": isInvalid,
                "ring-control-accent/50 border-control-accent shadow-none ring-3 outline-none":
                  isFocused,
                "bg-disabled-input-background opacity-50": isDisabled,
              },
            )}>
            <Label
              className={cn(
                "text-control-text-subdued font-primary text-small start-label-inset-inline-start top-label-inset-block-start pointer-events-none absolute translate-y-1/4 opacity-0 transition-all",
                {
                  "translate-y-0 opacity-100": isDefined(value),
                },
              )}>
              {label}
            </Label>
            <SelectValue
              className={({isPlaceholder}) =>
                cn(
                  text({
                    appearance: isPlaceholder ? "subdued" : "control",
                  }),
                )
              }>
              {({isPlaceholder, selectedText}) =>
                isPlaceholder ? label : selectedText
              }
            </SelectValue>
            <div
              className={cn("end-small-100 absolute top-1/2 -translate-y-1/2")}>
              {isOpen ? (
                <ChevronUpIcon aria-hidden className={cn("size-3")} />
              ) : (
                <ChevronDownIcon aria-hidden className={cn("size-3")} />
              )}
            </div>
          </Button>
          {isDefined(description) && (
            <Text slot="description">{description}</Text>
          )}
          <FieldError />
          <Popover
            className={cn(
              "bg-base-background rounded-base border-base-border shadow-extra-large border",
              "entering:animate-in entering:fade-in entering:zoom-in-95",
              "entering:placement-top:slide-in-from-bottom-5 entering:placement-right:slide-in-from-left-5 entering:placement-bottom:slide-in-from-top-5 entering:placement-left:slide-in-from-right-5",
              "exiting:animate-out exiting:fade-out exiting:zoom-out-95",
              "exiting:placement-top:slide-out-to-bottom-5 exiting:placement-right:slide-out-to-left-5 exiting:placement-bottom:slide-out-to-top-5 exiting:placement-left:slide-out-to-right-5",
            )}>
            <ListBox
              className={cn(
                "space-y-small-500 py-small-400 max-h-44 overflow-y-scroll",
                "outline-none",
              )}>
              {children}
            </ListBox>
          </Popover>
        </>
      )}
    </AriaSelect>
  );
}

export function SelectItem({children, ...props}: ListBoxItemProps) {
  return (
    <ListBoxItem
      {...props}
      className={cn(
        "px-small-100 py-small-400 flex w-[var(--trigger-width)] cursor-pointer items-center justify-between",
        "hover:bg-base-background-subdued",
        "focus-visible:bg-base-background-subdued outline-none",
        "selected:bg-base-background-subdued",
        text(),
        props.className,
      )}>
      {({isSelected, ...renderProps}) => (
        <>
          {typeof children === "function"
            ? children({
                isSelected,
                ...renderProps,
              })
            : children}
          {isSelected && <CheckmarkIcon aria-hidden className={cn("size-3")} />}
        </>
      )}
    </ListBoxItem>
  );
}
