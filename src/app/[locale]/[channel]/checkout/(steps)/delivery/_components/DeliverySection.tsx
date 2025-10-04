"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId, useState} from "react";

import {Heading, HeadingGroup, SkeletonHeading} from "@/components/Heading";
import {Radio, SkeletonRadio} from "@/components/Radio";
import {RadioGroup, SkeletonRadioGroup} from "@/components/RadioGroup";
import {graphql} from "@/graphql/codegen";
import type {DeliverySection_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {StoreIcon} from "@/icons/StoreIcon";
import {TruckIcon} from "@/icons/TruckIcon";
import {cn} from "@/utils/cn";
import {isCollectionPoint} from "@/utils/delivery-method";
import {isDefined} from "@/utils/is-defined";

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
  const shipId = useId();
  const pickUpId = useId();
  const [value, setValue] = useState(
    isDefined(data.deliveryMethod) && isCollectionPoint(data.deliveryMethod)
      ? pickUpId
      : shipId,
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
        onChange={setValue}
        aria-labelledby={headingId}>
        <Radio
          value={shipId}
          secondaryContent={
            <TruckIcon
              aria-hidden
              className={cn("group-selected:stroke-base-accent")}
            />
          }>
          <FormattedMessage id="riCv7f" defaultMessage="Ship" />
        </Radio>
        <Radio
          value={pickUpId}
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
        {value === shipId ? (
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
