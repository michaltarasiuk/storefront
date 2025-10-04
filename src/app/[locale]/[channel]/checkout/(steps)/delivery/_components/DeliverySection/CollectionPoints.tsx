"use client";

import {type FragmentType, useFragment} from "@apollo/client";
import {useId} from "react";

import {Heading, SkeletonHeading} from "@/components/Heading";
import {Radio, SkeletonRadio} from "@/components/Radio";
import {RadioGroup, SkeletonRadioGroup} from "@/components/RadioGroup";
import {graphql} from "@/graphql/codegen";
import type {CollectionPoints_CheckoutFragment} from "@/graphql/codegen/graphql";
import {FormattedMessage} from "@/i18n/react-intl";
import {cn} from "@/utils/cn";
import {isCollectionPoint} from "@/utils/delivery-method";
import {isDefined} from "@/utils/is-defined";

const CollectionPoints_CheckoutFragment = graphql(`
  fragment CollectionPoints_Checkout on Checkout {
    id
    deliveryMethod {
      __typename
      ... on Warehouse {
        id
      }
    }
    availableCollectionPoints {
      id
      address {
        companyName
      }
    }
  }
`);

interface CollectionPointsProps {
  checkout: FragmentType<CollectionPoints_CheckoutFragment>;
}

export function CollectionPoints({checkout}: CollectionPointsProps) {
  const {data, complete} = useFragment({
    fragment: CollectionPoints_CheckoutFragment,
    fragmentName: "CollectionPoints_Checkout",
    from: checkout,
  });
  const headingId = useId();
  if (!complete) {
    return <SkeletonCollectionPoints />;
  }
  return (
    <section className={cn("space-y-base")}>
      <Heading id={headingId}>
        <FormattedMessage id="pRVSgm" defaultMessage="Collection points" />
      </Heading>
      <RadioGroup
        variant="group"
        name="deliveryMethodId"
        defaultValue={
          isDefined(data.deliveryMethod) &&
          isCollectionPoint(data.deliveryMethod)
            ? data.deliveryMethod.id
            : undefined
        }
        aria-labelledby={headingId}
        isRequired>
        {data.availableCollectionPoints.map((collectionPoint) => (
          <Radio key={collectionPoint.id} value={collectionPoint.id}>
            {collectionPoint.address.companyName}
          </Radio>
        ))}
      </RadioGroup>
    </section>
  );
}

export function SkeletonCollectionPoints() {
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
