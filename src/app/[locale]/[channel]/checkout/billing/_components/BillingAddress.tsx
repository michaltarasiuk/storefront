"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {Suspense, useId, useState} from "react";

import {
  AddressFields,
  CompletedAddressFields,
  SkeletonAddressFields,
} from "@/components/AddressFields";
import {Heading, SkeletonHeading} from "@/components/Heading";
import {Radio} from "@/components/Radio";
import {RadioGroup} from "@/components/RadioGroup";
import {graphql} from "@/graphql/codegen";
import type {BillingAddress_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

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
  const [value, setValue] = useState<"yes" | "no">("yes");
  const headingId = useId();
  const address = complete
    ? (data.billingAddress ?? data.shippingAddress)
    : null;
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="6orx1c" defaultMessage="Billing address" />
      </Heading>
      <RadioGroup
        value={value}
        onChange={(newValue) => setValue(newValue as typeof value)}
        variant="group"
        aria-labelledby={headingId}>
        <Radio value="yes">
          <FormattedMessage
            id="ipwTkh"
            defaultMessage="Same as shipping address"
          />
        </Radio>
        <Radio value="no">
          <FormattedMessage
            id="o58q+n"
            defaultMessage="Use a different billing address"
          />
        </Radio>
      </RadioGroup>
      {value === "no" && (
        <Suspense fallback={<SkeletonAddressFields />}>
          {isDefined(address) ? (
            <CompletedAddressFields address={address} />
          ) : (
            <AddressFields />
          )}
        </Suspense>
      )}
    </section>
  );
}

export function SkeletonBillingAddress() {
  return (
    <section className={cn("space-y-base")}>
      <SkeletonHeading />
    </section>
  );
}
