"use client";

import {useState} from "react";
import {Button} from "react-aria-components";

import {Autocomplete, AutocompleteItem} from "@/components/Autocomplete";
import {Popover, PopoverTrigger} from "@/components/Popover";
import {Locales} from "@/i18n/consts";
import {useLocale} from "@/i18n/hooks/use-locale";
import {useSetLocale} from "@/i18n/hooks/use-set-locale";
import {useIntl} from "@/i18n/react-intl";
import {getLanguageDisplayName} from "@/i18n/utils/get-language-display-name";
import {isLocaleSupported} from "@/i18n/utils/is-locale-supported";
import {ChevronDownIcon} from "@/icons/ChevronDownIcon";
import {ChevronUpIcon} from "@/icons/ChevronUpIcon";
import {text} from "@/styles/text";
import {cn} from "@/utils/cn";

export function LanguageSelectorPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const {setLocale} = useSetLocale();
  const intl = useIntl();
  return (
    <PopoverTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <LanguageSelectorButton isOpen={isOpen} />
      <Popover>
        <Autocomplete
          selectionMode="single"
          selectedKeys={[currentLocale]}
          placeholder={intl.formatMessage({
            id: "xmcVZ0",
            defaultMessage: "Search",
          })}
          onAction={(key) => {
            if (typeof key === "string" && isLocaleSupported(key)) {
              setLocale(key);
            }
          }}>
          {[
            currentLocale,
            ...Locales.toSpliced(Locales.indexOf(currentLocale), 1),
          ].map((locale) => {
            const textValue = getLanguageDisplayName(locale);
            return (
              <AutocompleteItem key={locale} id={locale} textValue={textValue}>
                {textValue}
              </AutocompleteItem>
            );
          })}
        </Autocomplete>
      </Popover>
    </PopoverTrigger>
  );
}

export function LanguageSelectorButton({isOpen}: {isOpen?: boolean}) {
  const currentLocale = useLocale();
  return (
    <Button
      className={cn(
        "rounded-base gap-small-500 flex cursor-pointer items-center",
        "hover:underline hover:underline-offset-2",
        "focus-visible:ring-control-accent outline-none focus-visible:ring-2 focus-visible:ring-offset-3",
        text({
          appearance: "accent",
        }),
      )}>
      {getLanguageDisplayName(currentLocale)}
      {isOpen ? (
        <ChevronUpIcon aria-hidden className={cn("size-3")} />
      ) : (
        <ChevronDownIcon aria-hidden className={cn("size-3")} />
      )}
    </Button>
  );
}
