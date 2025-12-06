"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  AddressFields,
  CompletedAddressFields,
  SkeletonAddressFields,
} from "#app/components/AddressFields";
import {Heading, SkeletonHeading} from "#app/components/Heading";
import {graphql} from "#app/graphql/codegen";
import type {ShippingAddress_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {FormattedMessage} from "#app/i18n/react-intl";
import {cn} from "#app/utils/cn";
import {isDefined} from "#app/utils/is-defined";

const ShippingAddress_CheckoutFragment = graphql(`
  fragment ShippingAddress_Checkout on Checkout {
    shippingAddress {
      ...AddressFields_Address
    }
  }
`);

interface ShippingAddressProps {
  checkout: FragmentType<ShippingAddress_CheckoutFragment>;
}

export function ShippingAddress({checkout}: ShippingAddressProps) {
  const {data, complete} = useFragment({
    fragment: ShippingAddress_CheckoutFragment,
    fragmentName: "ShippingAddress_Checkout",
    from: checkout,
  });
  if (!complete) {
    return <SkeletonShippingAddress />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading>
        <FormattedMessage id="DP5VOH" defaultMessage="Shipping Address" />
      </Heading>
      {isDefined(data.shippingAddress) ? (
        <CompletedAddressFields address={data.shippingAddress} />
      ) : (
        <AddressFields />
      )}
    </section>
  );
}

export function SkeletonShippingAddress() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonAddressFields />
    </div>
  );
}
