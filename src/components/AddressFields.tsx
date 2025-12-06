"use client";

import type {FragmentType} from "@apollo/client";
import {useFragment} from "@apollo/client";
import {use, useState, useTransition} from "react";
import type * as z from "zod";

import {graphql} from "#app/graphql/codegen";
import type {
  AddressFields_AddressFragment,
  ChoiceValue,
} from "#app/graphql/codegen/graphql";
import {useAddressValidationRules} from "#app/hooks/use-address-validation-rules";
import {useLocale} from "#app/i18n/hooks/use-locale";
import {useIntl} from "#app/i18n/react-intl";
import {isCountryCode} from "#app/i18n/utils/is-country-code";
import {localeToCountryCode} from "#app/i18n/utils/locale-to-country-code";
import {ChannelContext} from "#app/modules/channel/channel-context";
import type {AddressSchema} from "#app/utils/address";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

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
  return <AddressFields defaultValues={data} />;
}

type AddressField = keyof z.infer<typeof AddressSchema>;

export function AddressFields({
  defaultValues,
}: {
  defaultValues?: AddressFields_AddressFragment;
}) {
  const locale = useLocale();
  const [countryCode, setCountryCode] = useState(
    isDefined(defaultValues) && isCountryCode(defaultValues.country.code)
      ? defaultValues.country.code
      : localeToCountryCode(locale),
  );
  const [isPending, startTransition] = useTransition();
  const {countries} = use(ChannelContext);
  const {
    countryAreaChoices,
    cityChoices,
    cityAreaChoices,
    isFieldAllowed,
    isFieldRequired,
    isFieldUppercased,
  } = useAddressValidationRules(countryCode);
  const intl = useIntl();
  return (
    <fieldset
      className={cn("space-y-base transition-opacity", {
        "opacity-50": isPending,
      })}>
      <Select
        name={"country" satisfies AddressField}
        value={countryCode}
        label={intl.formatMessage({
          id: "vONi+O",
          defaultMessage: "Country",
        })}
        onChange={(key) => {
          if (isCountryCode(key)) {
            startTransition(() => setCountryCode(key));
          }
        }}>
        {countries.map(({code, country}) => (
          <SelectItem key={code} id={code} textValue={country}>
            {country}
          </SelectItem>
        ))}
      </Select>
      {isFieldAllowed("name") && (
        <div className={cn("gap-base flex")}>
          <TextField
            name={"firstName" satisfies AddressField}
            defaultValue={defaultValues?.firstName}
            label={intl.formatMessage({
              id: "pONqz8",
              defaultMessage: "First name",
            })}
            isRequired={isFieldRequired("name")}
            isUppercased={isFieldUppercased("name")}
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
            isUppercased={isFieldUppercased("name")}
            className={cn("flex-1")}
          />
        </div>
      )}
      {isFieldAllowed("phone") && (
        <TextField
          name={"phone" satisfies AddressField}
          defaultValue={defaultValues?.phone ?? undefined}
          label={intl.formatMessage({
            id: "O95R3Z",
            defaultMessage: "Phone",
          })}
          isRequired={isFieldRequired("phone")}
          isUppercased={isFieldUppercased("phone")}
        />
      )}
      {isFieldAllowed("companyName") && (
        <TextField
          name={"companyName" satisfies AddressField}
          defaultValue={defaultValues?.companyName}
          label={intl.formatMessage({
            id: "FPGwAt",
            defaultMessage: "Company name",
          })}
          isRequired={isFieldRequired("companyName")}
          isUppercased={isFieldUppercased("companyName")}
        />
      )}
      {(isFieldAllowed("streetAddress1") ||
        isFieldAllowed("streetAddress2")) && (
        <div className={cn("gap-base flex")}>
          {isFieldAllowed("streetAddress1") && (
            <TextField
              name={"streetAddress1" satisfies AddressField}
              defaultValue={defaultValues?.streetAddress1}
              label={intl.formatMessage({
                id: "ZP5fRS",
                defaultMessage: "Street address 1",
              })}
              isRequired={isFieldRequired("streetAddress1")}
              isUppercased={isFieldUppercased("streetAddress1")}
              className={cn("flex-1")}
            />
          )}
          {isFieldAllowed("streetAddress2") && (
            <TextField
              name={"streetAddress2" satisfies AddressField}
              defaultValue={defaultValues?.streetAddress2}
              label={intl.formatMessage({
                id: "xULK8s",
                defaultMessage: "Street address 2",
              })}
              isRequired={isFieldRequired("streetAddress2")}
              isUppercased={isFieldUppercased("streetAddress2")}
              className={cn("flex-1")}
            />
          )}
        </div>
      )}
      {isFieldAllowed("countryArea") && (
        <div className={cn("flex-1")}>
          {!countryAreaChoices.length ? (
            <TextField
              name={"countryArea" satisfies AddressField}
              defaultValue={
                isDefined(defaultValues) &&
                countryCode === defaultValues.country.code
                  ? defaultValues.countryArea
                  : undefined
              }
              label={intl.formatMessage({
                id: "AuwpCm",
                defaultMessage: "Country area",
              })}
              isRequired={isFieldRequired("countryArea")}
              isUppercased={isFieldUppercased("countryArea")}
            />
          ) : (
            <Select
              key={countryCode}
              name={"countryArea" satisfies AddressField}
              defaultValue={
                isDefined(defaultValues) &&
                countryCode === defaultValues.country.code
                  ? defaultValues.countryArea
                  : undefined
              }
              label={intl.formatMessage({
                id: "AuwpCm",
                defaultMessage: "Country area",
              })}
              isRequired={isFieldRequired("countryArea")}>
              {countryAreaChoices
                .filter(isValidChoiceValue)
                .map(({raw, verbose}) => (
                  <SelectItem key={verbose} id={raw} textValue={verbose}>
                    {verbose}
                  </SelectItem>
                ))}
            </Select>
          )}
        </div>
      )}
      {isFieldAllowed("postalCode") && (
        <TextField
          name={"postalCode" satisfies AddressField}
          defaultValue={defaultValues?.postalCode}
          label={intl.formatMessage({
            id: "3EnruA",
            defaultMessage: "Postal code",
          })}
          isRequired={isFieldRequired("postalCode")}
          isUppercased={isFieldUppercased("postalCode")}
        />
      )}
      {(isFieldAllowed("city") || isFieldAllowed("cityArea")) && (
        <div className={cn("gap-base flex")}>
          {isFieldAllowed("city") && (
            <div className={cn("flex-1")}>
              {!cityChoices.length ? (
                <TextField
                  name={"city" satisfies AddressField}
                  defaultValue={defaultValues?.city}
                  label={intl.formatMessage({
                    id: "TE4fIS",
                    defaultMessage: "City",
                  })}
                  isRequired={isFieldRequired("city")}
                  isUppercased={isFieldUppercased("city")}
                />
              ) : (
                <Select
                  name={"city" satisfies AddressField}
                  defaultValue={defaultValues?.city}
                  label={intl.formatMessage({
                    id: "TE4fIS",
                    defaultMessage: "City",
                  })}
                  isRequired={isFieldRequired("city")}>
                  {cityChoices
                    .filter(isValidChoiceValue)
                    .map(({raw, verbose}) => (
                      <SelectItem key={raw} id={raw} textValue={verbose}>
                        {verbose}
                      </SelectItem>
                    ))}
                </Select>
              )}
            </div>
          )}
          {isFieldAllowed("cityArea") && (
            <div className={cn("flex-1")}>
              {!cityAreaChoices.length ? (
                <TextField
                  name={"cityArea" satisfies AddressField}
                  defaultValue={defaultValues?.cityArea}
                  label={intl.formatMessage({
                    id: "BWpuSS",
                    defaultMessage: "City area",
                  })}
                  isRequired={isFieldRequired("cityArea")}
                  isUppercased={isFieldUppercased("cityArea")}
                />
              ) : (
                <Select
                  name={"cityArea" satisfies AddressField}
                  defaultValue={defaultValues?.cityArea}
                  label={intl.formatMessage({
                    id: "BWpuSS",
                    defaultMessage: "City area",
                  })}
                  isRequired={isFieldRequired("cityArea")}>
                  {cityAreaChoices
                    .filter(isValidChoiceValue)
                    .map(({raw, verbose}) => (
                      <SelectItem key={raw} id={raw} textValue={verbose}>
                        {verbose}
                      </SelectItem>
                    ))}
                </Select>
              )}
            </div>
          )}
        </div>
      )}
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

function isValidChoiceValue(
  value: ChoiceValue,
): value is Record<"raw" | "verbose", string> {
  return isDefined(value.raw) && isDefined(value.verbose);
}
