import {type FragmentType, useFragment} from "@apollo/client";

import {
  AddressFieldset,
  CompletedAddressFieldset,
  SkeletonAddressFieldset,
} from "@/components/AddressFieldset";
import {Heading, SkeletonHeading} from "@/components/Heading";
import {gql} from "@/graphql/codegen";
import type {ShippingAddress_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isDefined} from "@/utils/is-defined";

const ShippingAddress_CheckoutFragment = gql(`
  fragment ShippingAddress_Checkout on Checkout {
    shippingAddress {
      ...AddressFieldset_Address
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
