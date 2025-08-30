"use client";

import type {FragmentType} from "@apollo/client";
import {useFragment} from "@apollo/client";
import {use, useState, useTransition} from "react";
import * as z from "zod";

import {graphql} from "@/graphql/codegen";
import type {AddressFields_AddressFragment} from "@/graphql/codegen/graphql";
import {useAddressValidationRules} from "@/hooks/use-address-validation-rules";
import {useLocale} from "@/i18n/hooks/use-locale";
import {useIntl} from "@/i18n/react-intl";
import {isCountryCode} from "@/i18n/utils/is-country-code";
import {localeToCountryCode} from "@/i18n/utils/locale-to-country-code";
import {ChannelContext} from "@/modules/channels/channel-context";
import type {AddressSchema} from "@/utils/address";
import {cn} from "@/utils/cn";

import {SkeletonInput} from "./Input";
import {Select, SelectItem} from "./Select";
import {TextField} from "./TextField";

const AddressFields_AddressFragment = graphql(`
  fragment AddressFields_Address on Address {
    id
    country {
      code
    }
    firstName
    lastName
    companyName
    phone
    streetAddress1
    streetAddress2
    postalCode
    countryArea
    city
    cityArea
  }
`);

export function CompletedAddressFields({
  address,
}: {
  address: FragmentType<AddressFields_AddressFragment>;
}) {
  const {data, complete} = useFragment({
    fragment: AddressFields_AddressFragment,
    from: address,
  });
  if (!complete) {
    return <SkeletonAddressFields />;
  }
  return (
    <AddressFields
      defaultValues={{
        ...data,
        country: data.country.code,
        phone: data.phone ?? undefined,
      }}
    />
  );
}

type AddressField = keyof z.infer<typeof AddressSchema>;
type DefaultValues = Partial<Record<AddressField, string>>;

export function AddressFields({
  defaultValues,
}: {
  defaultValues?: DefaultValues;
}) {
  const locale = useLocale();
  const [countryCode, setCountryCode] = useState(
    isCountryCode(defaultValues?.country)
      ? defaultValues.country
      : localeToCountryCode(locale),
  );
  const [isPending, startTransition] = useTransition();
  const {
    countryAreaChoices,
    cityChoices,
    cityAreaChoices,
    isFieldAllowed,
    isFieldRequired,
  } = useAddressValidationRules(countryCode);
  const intl = useIntl();
  return (
    <fieldset
      className={cn("space-y-base transition-opacity", {
        "opacity-50": isPending,
      })}>
      <Select
        name={"country" satisfies AddressField}
        selectedKey={countryCode}
        label={intl.formatMessage({
          id: "vONi+O",
          defaultMessage: "Country",
        })}
        onSelectionChange={(key) => {
          if (isCountryCode(key)) {
            startTransition(() => setCountryCode(key));
          }
        }}>
        {use(ChannelContext).countries.map(({code, country}) => (
          <SelectItem key={code} id={code} textValue={country}>
            {country}
          </SelectItem>
        ))}
      </Select>
      <div
        className={cn("gap-base flex", {
          hidden: !isFieldAllowed("name"),
        })}>
        <TextField
          name={"firstName" satisfies AddressField}
          defaultValue={defaultValues?.firstName}
          label={intl.formatMessage({
            id: "pONqz8",
            defaultMessage: "First name",
          })}
          isRequired={isFieldRequired("name")}
          className={cn("flex-1")}
        />
        <TextField
          name={"lastName" satisfies AddressField}
          defaultValue={defaultValues?.lastName}
          label={intl.formatMessage({
            id: "txUL0F",
            defaultMessage: "Last name",
          })}
          isRequired={isFieldRequired("name")}
          className={cn("flex-1")}
        />
      </div>
      <TextField
        name={"phone" satisfies AddressField}
        defaultValue={defaultValues?.phone}
        label={intl.formatMessage({
          id: "O95R3Z",
          defaultMessage: "Phone",
        })}
        isRequired={isFieldRequired("phone")}
        className={cn({
          hidden: !isFieldAllowed("phone"),
        })}
      />
      <TextField
        name={"companyName" satisfies AddressField}
        defaultValue={defaultValues?.companyName}
        label={intl.formatMessage({
          id: "FPGwAt",
          defaultMessage: "Company name",
        })}
        isRequired={isFieldRequired("companyName")}
        className={cn({
          hidden: !isFieldAllowed("companyName"),
        })}
      />
      <div
        className={cn("gap-base flex", {
          hidden:
            !isFieldAllowed("streetAddress1") &&
            !isFieldAllowed("streetAddress2"),
        })}>
        <TextField
          name={"streetAddress1" satisfies AddressField}
          defaultValue={defaultValues?.streetAddress1}
          label={intl.formatMessage({
            id: "ZP5fRS",
            defaultMessage: "Street address 1",
          })}
          isRequired={isFieldRequired("streetAddress1")}
          className={cn("flex-1", {
            hidden: !isFieldAllowed("streetAddress1"),
          })}
        />
        <TextField
          name={"streetAddress2" satisfies AddressField}
          defaultValue={defaultValues?.streetAddress2}
          label={intl.formatMessage({
            id: "xULK8s",
            defaultMessage: "Street address 2",
          })}
          isRequired={isFieldRequired("streetAddress2")}
          className={cn("flex-1", {
            hidden: !isFieldAllowed("streetAddress2"),
          })}
        />
      </div>
      <div
        className={cn("flex-1", {
          hidden: !isFieldAllowed("countryArea"),
        })}>
        {!countryAreaChoices.length ? (
          <TextField
            name={"countryArea" satisfies AddressField}
            defaultValue={defaultValues?.countryArea}
            label={intl.formatMessage({
              id: "AuwpCm",
              defaultMessage: "Country area",
            })}
            isRequired={isFieldRequired("countryArea")}
          />
        ) : (
          <Select
            name={"countryArea" satisfies AddressField}
            defaultSelectedKey={defaultValues?.countryArea}
            label={intl.formatMessage({
              id: "AuwpCm",
              defaultMessage: "Country area",
            })}
            isRequired={isFieldRequired("countryArea")}>
            {countryAreaChoices.filter(isValidChoice).map(({raw, verbose}) => (
              <SelectItem key={raw} id={raw} textValue={verbose}>
                {verbose}
              </SelectItem>
            ))}
          </Select>
        )}
      </div>
      <TextField
        name={"postalCode" satisfies AddressField}
        defaultValue={defaultValues?.postalCode}
        label={intl.formatMessage({
          id: "3EnruA",
          defaultMessage: "Postal code",
        })}
        isRequired={isFieldRequired("postalCode")}
        className={cn({
          hidden: !isFieldAllowed("postalCode"),
        })}
      />
      <div
        className={cn("gap-base flex", {
          hidden: !isFieldAllowed("city") && !isFieldAllowed("cityArea"),
        })}>
        <div
          className={cn("flex-1", {
            hidden: !isFieldAllowed("city"),
          })}>
          {!cityChoices.length ? (
            <TextField
              name={"city" satisfies AddressField}
              defaultValue={defaultValues?.city}
              label={intl.formatMessage({
                id: "TE4fIS",
                defaultMessage: "City",
              })}
              isRequired={isFieldRequired("city")}
            />
          ) : (
            <Select
              name={"city" satisfies AddressField}
              defaultSelectedKey={defaultValues?.city}
              label={intl.formatMessage({
                id: "TE4fIS",
                defaultMessage: "City",
              })}
              isRequired={isFieldRequired("city")}>
              {cityAreaChoices.filter(isValidChoice).map(({raw, verbose}) => (
                <SelectItem key={raw} id={raw} textValue={verbose}>
                  {verbose}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
        <div
          className={cn("flex-1", {
            hidden: !isFieldAllowed("cityArea"),
          })}>
          {!cityAreaChoices.length ? (
            <TextField
              name={"cityArea" satisfies AddressField}
              defaultValue={defaultValues?.cityArea}
              label={intl.formatMessage({
                id: "BWpuSS",
                defaultMessage: "City area",
              })}
              isRequired={isFieldRequired("cityArea")}
            />
          ) : (
            <Select
              name={"cityArea" satisfies AddressField}
              defaultSelectedKey={defaultValues?.cityArea}
              label={intl.formatMessage({
                id: "BWpuSS",
                defaultMessage: "City area",
              })}
              isRequired={isFieldRequired("cityArea")}>
              {cityAreaChoices.filter(isValidChoice).map(({raw, verbose}) => (
                <SelectItem key={raw} id={raw} textValue={verbose}>
                  {verbose}
                </SelectItem>
              ))}
            </Select>
          )}
        </div>
      </div>
    </fieldset>
  );
}

export function SkeletonAddressFields() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonInput />
      <div className={cn("gap-base flex")}>
        <SkeletonInput className={cn("flex-1")} />
        <SkeletonInput className={cn("flex-1")} />
      </div>
      <SkeletonInput />
      <SkeletonInput />
      <div className={cn("gap-base flex")}>
        <SkeletonInput className={cn("flex-1")} />
        <SkeletonInput className={cn("flex-1")} />
      </div>
      <SkeletonInput />
      <SkeletonInput />
      <div className={cn("gap-base flex")}>
        <SkeletonInput className={cn("flex-1")} />
        <SkeletonInput className={cn("flex-1")} />
      </div>
    </div>
  );
}

const ChoiceSchema = z.object({
  raw: z.string(),
  verbose: z.string(),
});
function isValidChoice(value: unknown): value is z.infer<typeof ChoiceSchema> {
  return ChoiceSchema.safeParse(value).success;
}
