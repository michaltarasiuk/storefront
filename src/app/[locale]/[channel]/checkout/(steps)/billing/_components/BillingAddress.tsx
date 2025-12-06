"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId, useState} from "react";
import {VisuallyHidden} from "react-aria";

import {
  AddressFields,
  CompletedAddressFields,
  SkeletonAddressFields,
} from "#app/components/AddressFields";
import {Heading, SkeletonHeading} from "#app/components/Heading";
import {Radio, SkeletonRadio} from "#app/components/Radio";
import {RadioGroup, SkeletonRadioGroup} from "#app/components/RadioGroup";
import {graphql} from "#app/graphql/codegen";
import type {BillingAddress_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

const BillingAddress_CheckoutFragment = graphql(`
  fragment BillingAddress_Checkout on Checkout {
    id
    shippingAddress {
      ...AddressFields_Address
    }
    billingAddress {
      ...AddressFields_Address
    }
  }
`);

interface BillingAddressProps {
  checkout: FragmentType<BillingAddress_CheckoutFragment>;
}

export function BillingAddress({checkout}: BillingAddressProps) {
  const {data, complete} = useFragment({
    fragment: BillingAddress_CheckoutFragment,
    fragmentName: "BillingAddress_Checkout",
    from: checkout,
  });
  const [value, setValue] = useState<"YES" | "NO">("YES");
  const headingId = useId();
  if (!complete) {
    return <SkeletonAddressFields />;
  }
  const {shippingAddress, billingAddress = shippingAddress} = data;
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="6orx1c" defaultMessage="Billing address" />
      </Heading>
      <RadioGroup
        variant="group"
        value={value}
        onChange={(newValue) => setValue(newValue as typeof value)}
        aria-labelledby={headingId}>
        <Radio value={"YES" satisfies typeof value}>
          <FormattedMessage
            id="ipwTkh"
            defaultMessage="Same as shipping address"
          />
        </Radio>
        <Radio value={"NO" satisfies typeof value}>
          <FormattedMessage
            id="o58q+n"
            defaultMessage="Use a different billing address"
          />
        </Radio>
      </RadioGroup>
      {value === "YES" && (
        <VisuallyHidden>
          <CompletedAddressFields address={shippingAddress!} />
        </VisuallyHidden>
      )}
      {value === "NO" &&
        (isDefined(billingAddress) ? (
          <CompletedAddressFields address={billingAddress} />
        ) : (
          <AddressFields />
        ))}
    </section>
  );
}

export function SkeletonBillingAddress() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonRadioGroup variant="group">
        <SkeletonRadio />
        <SkeletonRadio />
      </SkeletonRadioGroup>
    </div>
  );
}
