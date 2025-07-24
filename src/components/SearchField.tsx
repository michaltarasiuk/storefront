"use client";

import {
  Input,
  SearchField as AriaSearchField,
  type SearchFieldProps as AriaSearchFieldProps,
} from "react-aria-components";

import {Text} from "@/components/Text";
import {useIntl} from "@/i18n/react-intl";
import {CloseIcon} from "@/icons/CloseIcon";
import {MagnifyIcon} from "@/icons/MagnifyIcon";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {FieldError} from "./FieldError";
import {IconButton} from "./IconButton";

interface SearchFieldProps extends AriaSearchFieldProps {
  placeholder?: string;
  description?: string;
}

export function SearchField({
  placeholder,
  description,
  ...props
}: SearchFieldProps) {
  const intl = useIntl();
  return (
    <AriaSearchField {...props} className={cn("flex flex-col")}>
      {({isEmpty}) => (
        <>
          <div className={cn("relative flex items-center")}>
            <MagnifyIcon
              aria-hidden
              className={cn("start-small-100 pointer-events-none absolute")}
            />
            <Input
              placeholder={placeholder}
              className={cn(
                "rounded-base font-primary border-control-border bg-control-background text-control-text py-small-300 px-large-500 w-full border text-base transition-all duration-300",
                "placeholder:text-control-text-subdued",
                "focus:ring-control-accent/50 focus:border-control-accent outline-none focus:shadow-none focus:ring-3",
                "invalid:border-critical invalid:ring-critical invalid:ring-1",
                "disabled:bg-[#F8F8F8] disabled:opacity-50",
                "appearance-none [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden [&::-webkit-search-results-button]:hidden [&::-webkit-search-results-decoration]:hidden",
              )}
            />
            {!isEmpty && (
              <IconButton
                aria-label={intl.formatMessage({
                  id: "4YJHut",
                  defaultMessage: "Clear search",
                })}
                className={cn("end-small-100 absolute")}>
                <CloseIcon aria-hidden />
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
