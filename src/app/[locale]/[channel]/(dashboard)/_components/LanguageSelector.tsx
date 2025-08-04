"use client";

import {useState} from "react";
import {Button} from "react-aria-components";

import {Autocomplete, AutocompleteItem} from "@/components/Autocomplete";
import {Dialog, DialogTrigger, Modal} from "@/components/Dialog";
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

import {DialogHeader} from "../profile/_components/DialogHeader";

export function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const intl = useIntl();
  return (
    <>
      <PopoverTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
        <LanguageSelectorButton
          isOpen={isOpen}
          className={cn("hidden sm:flex")}
        />
        <Popover>
          <LanguageSelectorAutocomplete />
        </Popover>
      </PopoverTrigger>
      <DialogTrigger>
        <LanguageSelectorButton className={cn("flex sm:hidden")} />
        <Modal isDismissable>
          <Dialog className={cn("space-y-base")}>
            {({close}) => (
              <>
                <DialogHeader
                  title={intl.formatMessage({
                    id: "ZMXbRJ",
                    defaultMessage: "Select Language",
                  })}
                  onClose={close}
                />
                <LanguageSelectorAutocomplete />
              </>
            )}
          </Dialog>
        </Modal>
      </DialogTrigger>
    </>
  );
}

export function LanguageSelectorButton({
  isOpen,
  className,
}: {
  isOpen?: boolean;
  className?: string;
}) {
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
        className,
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

function LanguageSelectorAutocomplete() {
  const currentLocale = useLocale();
  const {setLocale} = useSetLocale();
  const intl = useIntl();
  return (
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
  );
}
