"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId} from "react";

import {Heading, SkeletonHeading} from "@/components/Heading";
import {Money} from "@/components/Money";
import {Radio, SkeletonRadio} from "@/components/Radio";
import {RadioGroup, SkeletonRadioGroup} from "@/components/RadioGroup";
import {graphql} from "@/graphql/codegen";
import type {ShippingMethods_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isShippingMethod} from "@/utils/delivery-method";
import {isDefined} from "@/utils/is-defined";

import {DeliveryDays} from "./DeliveryDays";

const ShippingMethods_CheckoutFragment = graphql(`
  fragment ShippingMethods_Checkout on Checkout {
    id
    deliveryMethod {
      __typename
      ... on ShippingMethod {
        id
      }
    }
    shippingMethods {
      id
      name
      price {
        ...Money_Money @unmask
      }
      ...DeliveryDays_ShippingMethod
    }
  }
`);

interface ShippingMethodsProps {
  checkout: FragmentType<ShippingMethods_CheckoutFragment>;
}

export function ShippingMethods({checkout}: ShippingMethodsProps) {
  const {data, complete} = useFragment({
    fragment: ShippingMethods_CheckoutFragment,
    fragmentName: "ShippingMethods_Checkout",
    from: checkout,
  });
  const headingId = useId();
  if (!complete) {
    return <SkeletonShippingMethods />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="RzsKm8" defaultMessage="Shipping methods" />
      </Heading>
      <RadioGroup
        variant="group"
        name="deliveryMethodId"
        defaultValue={
          isDefined(data.deliveryMethod) &&
          isShippingMethod(data.deliveryMethod)
            ? data.deliveryMethod.id
            : undefined
        }
        aria-labelledby={headingId}
        isRequired>
        {data.shippingMethods.map((shippingMethod) => (
          <Radio
            key={shippingMethod.id}
            value={shippingMethod.id}
            primaryContent={
              <DeliveryDays
                slot="description"
                shippingMethod={shippingMethod}
              />
            }
            secondaryContent={
              <Money slot="description" money={shippingMethod.price} />
            }>
            {shippingMethod.name}
          </Radio>
        ))}
      </RadioGroup>
    </section>
  );
}

export function SkeletonShippingMethods() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonRadioGroup variant="group">
        <SkeletonRadio />
        <SkeletonRadio />
        <SkeletonRadio />
        <SkeletonRadio />
        <SkeletonRadio />
      </SkeletonRadioGroup>
    </div>
  );
}
