"use client";

import {Heading} from "@/components/Heading";
import {IconButton} from "@/components/IconButton";
import {useIntl} from "@/i18n/react-intl";
import {CloseIcon} from "@/icons/CloseIcon";
import {cn} from "@/utils/cn";

export function DialogHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  const intl = useIntl();
  return (
    <header className={cn("flex items-center justify-between")}>
      <Heading level={2}>{title}</Heading>
      <IconButton
        aria-label={intl.formatMessage({
          id: "rbrahO",
          defaultMessage: "Close",
        })}
        className={cn("size-6")}
        onClick={onClose}>
        <CloseIcon aria-hidden />
      </IconButton>
    </header>
  );
}
