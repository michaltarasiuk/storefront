"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId, useState} from "react";

import {Heading, HeadingGroup, SkeletonHeading} from "#app/components/Heading";
import {Radio, SkeletonRadio} from "#app/components/Radio";
import {RadioGroup, SkeletonRadioGroup} from "#app/components/RadioGroup";
import {graphql} from "#app/graphql/codegen";
import type {DeliverySection_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {FormattedMessage} from "#app/i18n/react-intl";
import {StoreIcon} from "#app/icons/StoreIcon";
import {TruckIcon} from "#app/icons/TruckIcon";
import {cn} from "#app/utils/cn";
import {isCollectionPoint} from "#app/utils/delivery-method";
import {isDefined} from "#app/utils/is-defined";

import {CollectionPoints} from "./DeliverySection/CollectionPoints";
import {ShippingMethods} from "./DeliverySection/ShippingMethods";

const DeliverySection_CheckoutFragment = graphql(`
  fragment DeliverySection_Checkout on Checkout {
    deliveryMethod {
      __typename
    }
    ...ShippingMethods_Checkout
    ...CollectionPoints_Checkout
  }
`);

interface DeliverySectionProps {
  checkout: FragmentType<DeliverySection_CheckoutFragment>;
}

export function DeliverySection({checkout}: DeliverySectionProps) {
  const {data, complete} = useFragment({
    fragment: DeliverySection_CheckoutFragment,
    fragmentName: "DeliverySection_Checkout",
    from: checkout,
  });
  const headingId = useId();
  const [value, setValue] = useState(
    isDefined(data.deliveryMethod) && isCollectionPoint(data.deliveryMethod)
      ? ("PICK_UP" as const)
      : ("SHIP_IT" as const),
  );
  if (!complete) {
    return <SkeletonDeliverySection />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="drqP2L" defaultMessage="Delivery" />
      </Heading>
      <RadioGroup
        variant="group"
        value={value}
        onChange={(newValue) => setValue(newValue as typeof value)}
        aria-labelledby={headingId}>
        <Radio
          value={"SHIP_IT" satisfies typeof value}
          secondaryContent={
            <TruckIcon
              aria-hidden
              className={cn("group-selected:stroke-base-accent")}
            />
          }>
          <FormattedMessage id="riCv7f" defaultMessage="Ship" />
        </Radio>
        <Radio
          value={"PICK_UP" satisfies typeof value}
          secondaryContent={
            <StoreIcon
              aria-hidden
              className={cn("group-selected:stroke-base-accent")}
            />
          }>
          <FormattedMessage id="aAMkSq" defaultMessage="Pick up" />
        </Radio>
      </RadioGroup>
      <HeadingGroup>
        {value === "SHIP_IT" ? (
          <ShippingMethods checkout={data} />
        ) : (
          <CollectionPoints checkout={data} />
        )}
      </HeadingGroup>
    </section>
  );
}

export function SkeletonDeliverySection() {
  return (
    <div className={cn("space-y-base")}>
      <SkeletonHeading />
      <SkeletonRadioGroup variant="group">
        <SkeletonRadio />
        <SkeletonRadio />
      </SkeletonRadioGroup>
      <HeadingGroup>
        <SkeletonHeading />
        <SkeletonRadioGroup variant="group">
          <SkeletonRadio />
          <SkeletonRadio />
          <SkeletonRadio />
          <SkeletonRadio />
          <SkeletonRadio />
        </SkeletonRadioGroup>
      </HeadingGroup>
    </div>
  );
}
