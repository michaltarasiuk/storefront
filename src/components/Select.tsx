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

import {CheckmarkIcon} from "@/icons/CheckmarkIcon";
import {ChevronDownIcon} from "@/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/icons/ChevronUpIcon";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

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
  const [selectedKey, setSelectedKey] = useState<Key | null>(
    props.defaultSelectedKey ?? null,
  );
  return (
    <AriaSelect
      selectedKey={selectedKey}
      {...props}
      onSelectionChange={(key) => {
        setSelectedKey(key);
        props.onSelectionChange?.(key);
      }}>
      {({isDisabled, isFocused, isInvalid, isOpen}) => (
        <>
          <Button
            className={cn(
              "rounded-base border-control-border bg-control-background h-input p-small-100 relative flex w-full cursor-pointer items-center justify-between border transition-all",
              {
                "pt-6": isDefined(selectedKey),
                "ring-control-accent/50 border-control-accent shadow-none ring-3 outline-none":
                  isFocused,
                "border-critical ring-critical ring-1": isInvalid,
                "bg-disabled-input-background opacity-50": isDisabled,
              },
            )}>
            <Label
              className={cn(
                "text-control-text-subdued font-primary text-small start-small-100 top-small-100 pointer-events-none absolute translate-y-full leading-[1] opacity-0 transition-all",
                {
                  "translate-y-0 opacity-100": isDefined(selectedKey),
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
            )}>
            <ListBox
              className={cn(
                "space-y-small-500 py-small-400 max-h-44 overflow-y-scroll",
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
