"use client";

import {Select} from "@/components/Select";
import {TextField} from "@/components/TextField";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {FullNameFieldset} from "./FullNameFieldset";

export function AddressFieldset() {
  const intl = useIntl();
  return (
    <fieldset className={cn("space-y-base")}>
      <Select
        name="country"
        label={intl.formatMessage({
          id: "ASVYue",
          defaultMessage: "Country/region",
        })}
      />
      <FullNameFieldset />
      <TextField
        name="address"
        label={intl.formatMessage({
          id: "e6Ph5+",
          defaultMessage: "Address",
        })}
      />
      <TextField
        name="apartment"
        label={intl.formatMessage({
          id: "yOsL4f",
          defaultMessage: "Apartment, suite, etc (optional)",
        })}
      />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="postalCode"
          label={intl.formatMessage({
            id: "3EnruA",
            defaultMessage: "Postal code",
          })}
        />
        <TextField
          name="city"
          label={intl.formatMessage({
            id: "TE4fIS",
            defaultMessage: "City",
          })}
        />
      </div>
    </fieldset>
  );
}
