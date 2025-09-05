"use client";

import type {FragmentType} from "@apollo/client";
import {useFragment} from "@apollo/client";
import {use, useState, useTransition} from "react";
import * as z from "zod";

import {graphql} from "@/graphql/codegen";
import type {AddressFields_AddressFragment} from "@/graphql/codegen/graphql";
import {useAddressValidationRules} from "@/hooks/use-address-validation-rules";
import {useLocale} from "@/i18n/hooks/use-locale";
import {FormattedMessage, useIntl} from "@/i18n/react-intl";
import {isCountryCode} from "@/i18n/utils/is-country-code";
import {localeToCountryCode} from "@/i18n/utils/locale-to-country-code";
import {QuestionIcon} from "@/icons/QuestionIcon";
import {ChannelContext} from "@/modules/channels/channel-context";
import type {AddressSchema} from "@/utils/address";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

import {IconButton} from "./IconButton";
import {SkeletonInput} from "./Input";
import {Select, SelectItem} from "./Select";
import {TextField} from "./TextField";
import {Tooltip, TooltipTrigger} from "./Tooltip";

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
    isCountryCode(defaultValues?.country.code)
      ? defaultValues.country.code
      : localeToCountryCode(locale),
  );
  const [isPending, startTransition] = useTransition();
  const {
    countryAreaChoices,
    cityChoices,
    cityAreaChoices,
    postalCodeExamples,
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
              defaultValue={defaultValues?.countryArea}
              label={intl.formatMessage({
                id: "AuwpCm",
                defaultMessage: "Country area",
              })}
              isRequired={isFieldRequired("countryArea")}
            />
          ) : (
            <Select
              key={countryCode}
              name={"countryArea" satisfies AddressField}
              defaultSelectedKey={
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
                .filter(isValidChoice)
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
          accessory={
            <TooltipTrigger>
              <IconButton className={cn("rounded-fully")}>
                <QuestionIcon />
              </IconButton>
              <Tooltip offset={10}>
                <FormattedMessage
                  id="pfbcZN"
                  defaultMessage="Examples: {examples}"
                  values={{
                    examples: postalCodeExamples.join(", "),
                  }}
                />
              </Tooltip>
            </TooltipTrigger>
          }
          isRequired={isFieldRequired("postalCode")}
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
                  {cityChoices.filter(isValidChoice).map(({raw, verbose}) => (
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
                  {cityAreaChoices
                    .filter(isValidChoice)
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

const ChoiceSchema = z.object({
  raw: z.string(),
  verbose: z.string(),
});
function isValidChoice(value: unknown): value is z.infer<typeof ChoiceSchema> {
  return ChoiceSchema.safeParse(value).success;
}
