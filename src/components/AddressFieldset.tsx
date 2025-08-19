"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {use} from "react";
import invariant from "tiny-invariant";

import {ChannelContext} from "@/channels/channel-context";
import {Select, SelectItem} from "@/components/Select";
import {TextField} from "@/components/TextField";
import {gql} from "@/graphql/codegen";
import type {AddressFieldset_AddressFragment} from "@/graphql/codegen/graphql";
import {useIntl} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

import {SkeletonInput} from "./Input";

const AddressFieldset_AddressFragment = gql(`
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
    city
  }
`);

export function CompletedAddressFieldset({
  address,
}: {
  address: FragmentType<AddressFieldset_AddressFragment>;
}) {
  const {data, complete} = useFragment({
    fragment: AddressFieldset_AddressFragment,
    from: address,
  });
  invariant(complete);
  return <AddressFieldset address={data} />;
}

interface AddressFieldsetProps {
  address?: {
    country: {
      code: string;
    };
    firstName: string;
    lastName: string;
    companyName?: string;
    streetAddress1: string;
    streetAddress2?: string;
    postalCode: string;
    city: string;
  };
}

export function AddressFieldset({address}: AddressFieldsetProps) {
  const {countries} = use(ChannelContext);
  const intl = useIntl();
  return (
    <fieldset className={cn("space-y-base")}>
      <Select
        name="country"
        defaultSelectedKey={address?.country.code}
        label={intl.formatMessage({
          id: "ASVYue",
          defaultMessage: "Country/region",
        })}
        isRequired>
        {countries.map((country) => (
          <SelectItem
            key={country.code}
            id={country.code}
            textValue={country.country}>
            {country.country}
          </SelectItem>
        ))}
      </Select>
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="firstName"
          defaultValue={address?.firstName}
          label={intl.formatMessage({
            id: "pONqz8",
            defaultMessage: "First name",
          })}
          isRequired
        />
        <TextField
          name="lastName"
          defaultValue={address?.lastName}
          label={intl.formatMessage({
            id: "txUL0F",
            defaultMessage: "Last name",
          })}
          isRequired
        />
      </div>
      <TextField
        name="companyName"
        defaultValue={address?.companyName}
        label={intl.formatMessage({
          id: "FPGwAt",
          defaultMessage: "Company name",
        })}
      />
      <TextField
        name="streetAddress1"
        defaultValue={address?.streetAddress1}
        label={intl.formatMessage({
          id: "e6Ph5+",
          defaultMessage: "Address",
        })}
        isRequired
      />
      <TextField
        name="streetAddress2"
        defaultValue={address?.streetAddress2}
        label={intl.formatMessage({
          id: "yOsL4f",
          defaultMessage: "Apartment, suite, etc (optional)",
        })}
      />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="postalCode"
          defaultValue={address?.postalCode}
          label={intl.formatMessage({
            id: "3EnruA",
            defaultMessage: "Postal code",
          })}
          isRequired
        />
        <TextField
          name="city"
          defaultValue={address?.city}
          label={intl.formatMessage({
            id: "TE4fIS",
            defaultMessage: "City",
          })}
          isRequired
        />
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
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <SkeletonInput />
        <SkeletonInput />
      </div>
    </div>
  );
}
