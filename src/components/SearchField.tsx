"use client";

import {
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import {Text} from "#app/components/Text";
import {CloseIcon} from "#app/icons/CloseIcon";
import {MagnifyIcon} from "#app/icons/MagnifyIcon";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

import {FieldError} from "./FieldError";
import {IconButton} from "./IconButton";
import {Input} from "./Input";

interface SearchFieldProps extends AriaSearchFieldProps {
  label?: string;
  description?: string;
}

export function SearchField({label, description, ...props}: SearchFieldProps) {
  return (
    <AriaSearchField
      {...props}
      className={cn("leading-field-line-height", props.className)}>
      {({isEmpty}) => (
        <>
          <div className={cn("relative flex items-center")}>
            <MagnifyIcon
              aria-hidden
              className={cn(
                "start-field-padding-inline pointer-events-none absolute",
              )}
            />
            <Input
              placeholder={label}
              className={cn(
                "py-small-300 px-large-500",
                "[&::-webkit-search-cancel-button]:hidden",
              )}
            />
            {!isEmpty && (
              <IconButton className={cn("end-field-padding-inline absolute")}>
                <CloseIcon aria-hidden className={cn("size-3.5")} />
              </IconButton>
            )}
          </div>
          {isDefined(description) && (
            <Text slot="description" appearance="subdued" size="small">
              {description}
            </Text>
          )}
          <FieldError className={cn("mt-small-400")} />
        </>
      )}
    </AriaSearchField>
  );
}
