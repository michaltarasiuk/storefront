"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {Select} from "@/components/Select";
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
  if (!complete) {
    return null;
  }
  return <AddressFieldset address={data} />;
}

interface AddressFieldsetProps {
  address?: {
    country: {
      code: string;
    };
    firstName: string;
    lastName: string;
    streetAddress1: string;
    streetAddress2: string;
    postalCode: string;
    city: string;
  };
}

export function AddressFieldset({address}: AddressFieldsetProps) {
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
      />
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <TextField
          name="firstName"
          defaultValue={address?.firstName}
          label={intl.formatMessage({
            id: "pONqz8",
            defaultMessage: "First name",
          })}
        />
        <TextField
          name="lastName"
          defaultValue={address?.lastName}
          label={intl.formatMessage({
            id: "txUL0F",
            defaultMessage: "Last name",
          })}
        />
      </div>
      <TextField
        name="address"
        defaultValue={address?.streetAddress1}
        label={intl.formatMessage({
          id: "e6Ph5+",
          defaultMessage: "Address",
        })}
      />
      <TextField
        name="apartment"
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
        />
        <TextField
          name="city"
          defaultValue={address?.city}
          label={intl.formatMessage({
            id: "TE4fIS",
            defaultMessage: "City",
          })}
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
      <div className={cn("gap-base grid grid-cols-1 sm:grid-cols-2")}>
        <SkeletonInput />
        <SkeletonInput />
      </div>
    </div>
  );
}
