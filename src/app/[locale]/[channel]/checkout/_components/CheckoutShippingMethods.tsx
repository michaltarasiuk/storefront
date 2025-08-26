"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId} from "react";

import {Heading, SkeletonHeading} from "@/components/Heading";
import {Radio} from "@/components/Radio";
import {RadioGroup} from "@/components/RadioGroup";
import {graphql} from "@/graphql/codegen";
import type {CheckoutShippingMethods_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";

const CheckoutShippingMethods_CheckoutFragment = graphql(`
  fragment CheckoutShippingMethods_Checkout on Checkout {
    id
    shippingMethods {
      id
      name
    }
  }
`);

interface CheckoutShippingMethodsProps {
  checkout: FragmentType<CheckoutShippingMethods_CheckoutFragment>;
}

export function CheckoutShippingMethods({
  checkout,
}: CheckoutShippingMethodsProps) {
  const {data, complete} = useFragment({
    fragment: CheckoutShippingMethods_CheckoutFragment,
    from: checkout,
  });
  const headingId = useId();
  if (!complete) {
    return <SkeletonCheckoutShippingMethods />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="4RD+CZ" defaultMessage="Shipping method" />
      </Heading>
      <RadioGroup
        name="shippingMethodId"
        variant="group"
        aria-labelledby={headingId}
        isRequired>
        {data.shippingMethods.map(({id, name}) => (
          <Radio key={id} value={id}>
            {name}
          </Radio>
        ))}
      </RadioGroup>
    </section>
  );
}

export function SkeletonCheckoutShippingMethods() {
  return (
    <section className={cn("space-y-base")}>
      <SkeletonHeading />
    </section>
  );
}
