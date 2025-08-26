"use client";

import type {FragmentType} from "@apollo/client";
import {useFragment, useSuspenseQuery} from "@apollo/client";
import {use, useState, useTransition} from "react";

import {ChannelContext} from "@/channels/channel-context";
import {Select, SelectItem} from "@/components/Select";
import {graphql} from "@/graphql/codegen";
import type {
  AddressFieldset_AddressFragment,
  CountryCode,
} from "@/graphql/codegen/graphql";
import {useLocale} from "@/i18n/hooks/use-locale";
import {useIntl} from "@/i18n/react-intl";
import {localeToCountryCode} from "@/i18n/utils/locale-to-country-code";
import {AddressFields, isCountryAreaChoice} from "@/utils/address";
import {cn} from "@/utils/cn";

import {SkeletonInput} from "./Input";
import {TextField} from "./TextField";

const AddressFieldset_AddressFragment = graphql(`
  fragment AddressFieldset_Address on Address {
    id
    country {
      code
    }
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    postalCode
    countryArea
    city
  }
`);

interface CompletedAddressFieldsetProps {
  address: FragmentType<AddressFieldset_AddressFragment>;
}

export function CompletedAddressFieldset({
  address,
}: CompletedAddressFieldsetProps) {
  const {data, complete} = useFragment({
    fragment: AddressFieldset_AddressFragment,
    from: address,
  });
  if (!complete) {
    return <SkeletonAddressFieldset />;
  }
  return (
    <AddressFieldset
      address={{
        countryCode: data.country.code,
        ...data,
      }}
    />
  );
}

interface AddressFieldsetProps {
  address?: Partial<{
    countryCode: string;
    firstName: string;
    lastName: string;
    companyName: string;
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    countryArea: string;
    city: string;
  }>;
}

export function AddressFieldset({address}: AddressFieldsetProps) {
  const locale = useLocale();
  const [countryCode, setCountryCode] = useState(() => {
    const {countryCode = localeToCountryCode(locale)} = address ?? {};
    return countryCode as CountryCode;
  });
  const {data} = useSuspenseQuery(AddressValidationRulesQuery, {
    variables: {
      countryCode,
    },
  });
  const [isPending, startTransition] = useTransition();
  const intl = useIntl();
  const {
    allowedFields = [],
    requiredFields = [],
    countryAreaChoices = [],
  } = data.addressValidationRules ?? {};
  return (
    <fieldset
      className={cn("space-y-base transition-opacity", {
        "opacity-50": isPending,
      })}>
      <Select
        name={AddressFields.country}
        selectedKey={countryCode}
        label={intl.formatMessage({
          id: "ASVYue",
          defaultMessage: "Country/region",
        })}
        onSelectionChange={(key) =>
          startTransition(() => setCountryCode(key as CountryCode))
        }>
        {use(ChannelContext).countries.map((country) => (
          <SelectItem
            key={country.code}
            id={country.code}
            textValue={country.country}>
            {country.country}
          </SelectItem>
        ))}
      </Select>
      {allowedFields.includes(AddressFields.name.key) && (
        <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
          <TextField
            name={AddressFields.name.fields.firstName}
            defaultValue={address?.firstName}
            label={intl.formatMessage({
              id: "pONqz8",
              defaultMessage: "First name",
            })}
            isRequired={requiredFields.includes(AddressFields.name.key)}
          />
          <TextField
            name={AddressFields.name.fields.firstName}
            defaultValue={address?.lastName}
            label={intl.formatMessage({
              id: "txUL0F",
              defaultMessage: "Last name",
            })}
            isRequired={requiredFields.includes(AddressFields.name.key)}
          />
        </div>
      )}
      {allowedFields.includes(AddressFields.companyName) && (
        <TextField
          name={AddressFields.companyName}
          defaultValue={address?.companyName}
          label={intl.formatMessage({
            id: "FPGwAt",
            defaultMessage: "Company name",
          })}
          isRequired={requiredFields.includes(AddressFields.companyName)}
        />
      )}
      {allowedFields.includes(AddressFields.streetAddress1) && (
        <TextField
          name={AddressFields.streetAddress1}
          defaultValue={address?.streetAddress1}
          label={intl.formatMessage({
            id: "e6Ph5+",
            defaultMessage: "Address",
          })}
          isRequired={requiredFields.includes(AddressFields.streetAddress1)}
        />
      )}
      {allowedFields.includes(AddressFields.streetAddress2) && (
        <TextField
          name={AddressFields.streetAddress2}
          defaultValue={address?.streetAddress2}
          label={intl.formatMessage({
            id: "/j5hls",
            defaultMessage: "Apartment, suite, etc",
          })}
          isRequired={requiredFields.includes(AddressFields.streetAddress2)}
        />
      )}
      <div className={cn("gap-base flex")}>
        {allowedFields.includes(AddressFields.postalCode) && (
          <TextField
            name={AddressFields.postalCode}
            defaultValue={address?.postalCode}
            label={intl.formatMessage({
              id: "3EnruA",
              defaultMessage: "Postal code",
            })}
            isRequired={requiredFields.includes(AddressFields.postalCode)}
            className={cn("flex-1")}
          />
        )}
        {allowedFields.includes(AddressFields.countryArea) && (
          <Select
            name={AddressFields.countryArea}
            defaultSelectedKey={address?.countryArea}
            label={intl.formatMessage({
              id: "AuwpCm",
              defaultMessage: "Country area",
            })}
            isRequired={requiredFields.includes(AddressFields.countryArea)}
            className={cn("flex-1")}>
            {countryAreaChoices
              .filter(isCountryAreaChoice)
              .map((countryAreaChoice) => (
                <SelectItem
                  key={countryAreaChoice.raw}
                  id={countryAreaChoice.raw}
                  textValue={countryAreaChoice.verbose}>
                  {countryAreaChoice.verbose}
                </SelectItem>
              ))}
          </Select>
        )}
        {allowedFields.includes(AddressFields.city) && (
          <TextField
            name={AddressFields.city}
            defaultValue={address?.city}
            label={intl.formatMessage({
              id: "TE4fIS",
              defaultMessage: "City",
            })}
            isRequired={requiredFields.includes(AddressFields.city)}
            className={cn("flex-1")}
          />
        )}
      </div>
    </fieldset>
  );
}

export function SkeletonAddressFieldset() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonInput />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <SkeletonInput />
        <SkeletonInput />
      </div>
      <SkeletonInput />
      <SkeletonInput />
      <SkeletonInput />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-3")}>
        <SkeletonInput />
        <SkeletonInput />
        <SkeletonInput />
      </div>
    </div>
  );
}

const AddressValidationRulesQuery = graphql(`
  query AddressValidationRules($countryCode: CountryCode!) {
    addressValidationRules(countryCode: $countryCode) {
      allowedFields
      requiredFields
      countryAreaChoices {
        raw
        verbose
      }
    }
  }
`);
