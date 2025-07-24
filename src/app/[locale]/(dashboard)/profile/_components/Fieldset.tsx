"use client";

import {TextField} from "@/components/TextField";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

export function FullNameFieldset() {
  const intl = useIntl();
  return (
    <fieldset className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
      <legend className={cn("sr-only")}>
        <FormattedMessage id="TemVby" defaultMessage="Full Name" />
      </legend>
      <TextField
        name="firstName"
        placeholder={intl.formatMessage({
          id: "pONqz8",
          defaultMessage: "First name",
        })}
        autoComplete="given-name"
      />
      <TextField
        name="lastName"
        placeholder={intl.formatMessage({
          id: "txUL0F",
          defaultMessage: "Last name",
        })}
        autoComplete="family-name"
      />
    </fieldset>
  );
}

export function AddressFieldset() {
  const intl = useIntl();
  return (
    <fieldset className={cn("space-y-base")}>
      <legend className={cn("sr-only")}>
        <FormattedMessage id="RvpBdy" defaultMessage="Address Information" />
      </legend>
      <FullNameFieldset />
      <TextField
        name="address"
        placeholder={intl.formatMessage({
          id: "e6Ph5+",
          defaultMessage: "Address",
        })}
        autoComplete="street-address"
      />
      <TextField
        name="apartment"
        placeholder={intl.formatMessage({
          id: "yOsL4f",
          defaultMessage: "Apartment, suite, etc (optional)",
        })}
        autoComplete="address-line2"
      />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="postalCode"
          placeholder="Postal code"
          autoComplete="postal-code"
        />
        <TextField
          name="city"
          placeholder={intl.formatMessage({
            id: "TE4fIS",
            defaultMessage: "City",
          })}
          autoComplete="address-level2"
        />
      </div>
    </fieldset>
  );
}
