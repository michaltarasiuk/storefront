"use client";

import {
  Autocomplete as AriaAutocomplete,
  type AutocompleteProps as AriaAutocompleteProps,
  Menu,
  MenuItem,
  type MenuItemProps,
  type MenuProps,
  useFilter,
} from "react-aria-components";

import {CheckmarkIcon} from "#app/icons/CheckmarkIcon";
import {text} from "#app/styles/text";
import {cn} from "#app/utils/cn";

import {SearchField} from "./SearchField";

interface AutocompleteProps<T>
  extends AriaAutocompleteProps,
    Pick<MenuProps<T>, "selectionMode" | "selectedKeys" | "onAction"> {
  label?: string;
}

export function Autocomplete<T>({
  children,
  selectionMode,
  selectedKeys,
  label,
  onAction,
  ...props
}: AutocompleteProps<T>) {
  const {contains} = useFilter({
    sensitivity: "base",
  });
  return (
    <div className={cn("space-y-base")}>
      <AriaAutocomplete filter={contains} {...props}>
        <SearchField aria-label={label} label={label} />
        <Menu
          selectionMode={selectionMode}
          selectedKeys={selectedKeys}
          className={cn("space-y-small-500 h-62 overflow-scroll")}
          onAction={onAction}>
          {children}
        </Menu>
      </AriaAutocomplete>
    </div>
  );
}

export function AutocompleteItem<T extends object>({
  children,
  ...props
}: MenuItemProps<T>) {
  return (
    <MenuItem
      {...props}
      className={cn(
        "px-small-100 py-small-200 bg-base-background rounded-base cursor-pointer",
        "hover:bg-base-background-subdued",
        "focus-visible:bg-base-background-subdued outline-none",
        "selected:bg-base-background-subdued",
        "disabled:opacity-50",
        text(),
        props.className,
      )}>
      {({isSelected, ...renderProps}) => (
        <div className={cn("flex w-full items-center justify-between")}>
          {typeof children === "function"
            ? children({
                isSelected,
                ...renderProps,
              })
            : children}
          {isSelected && (
            <CheckmarkIcon aria-hidden className={cn("size-3.5")} />
          )}
        </div>
      )}
    </MenuItem>
  );
}
