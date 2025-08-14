"use client";

import {TextField} from "@/components/TextField";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

export function FullNameFieldset() {
  const intl = useIntl();
  return (
    <fieldset className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
      <TextField
        name="firstName"
        label={intl.formatMessage({
          id: "pONqz8",
          defaultMessage: "First name",
        })}
      />
      <TextField
        name="lastName"
        label={intl.formatMessage({
          id: "txUL0F",
          defaultMessage: "Last name",
        })}
      />
    </fieldset>
  );
}
