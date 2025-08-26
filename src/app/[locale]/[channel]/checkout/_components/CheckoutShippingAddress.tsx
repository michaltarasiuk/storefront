"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {
  AddressFieldset,
  CompletedAddressFieldset,
  SkeletonAddressFieldset,
} from "@/components/AddressFieldset";
import {Heading, SkeletonHeading} from "@/components/Heading";
import {graphql} from "@/graphql/codegen";
import type {CheckoutShippingAddress_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

const CheckoutShippingAddress_CheckoutFragment = graphql(`
  fragment CheckoutShippingAddress_Checkout on Checkout {
    shippingAddress {
      ...AddressFieldset_Address
    }
  }
`);

interface CheckoutShippingAddressProps {
  checkout: FragmentType<CheckoutShippingAddress_CheckoutFragment>;
}

export function CheckoutShippingAddress({
  checkout,
}: CheckoutShippingAddressProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutShippingAddress_CheckoutFragment,
    fragmentName: "CheckoutShippingAddress_Checkout",
    from: checkout,
  });
  return (
    <section className={cn("space-y-base")}>
      <Heading>
        <FormattedMessage id="DP5VOH" defaultMessage="Shipping Address" />
      </Heading>
      {isDefined(data.shippingAddress) && complete ? (
        <CompletedAddressFieldset address={data.shippingAddress} />
      ) : (
        <AddressFieldset />
      )}
    </section>
  );
}

export function SkeletonShippingAddress() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonAddressFieldset />
    </div>
  );
}
