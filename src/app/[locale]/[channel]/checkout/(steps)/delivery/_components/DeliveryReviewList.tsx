"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {SkeletonText, Text} from "#app/components/Text";
import {Routes} from "#app/consts/routes";
import {graphql} from "#app/graphql/codegen";
import type {DeliveryReviewList_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {useIntl} from "#app/i18n/react-intl";
import {isDefined} from "#app/utils/is-defined";

import {
  ReviewItem,
  ReviewList,
  SkeletonReviewItem,
  SkeletonReviewList,
} from "../../_components/ReviewList";

const DeliveryReviewList_CheckoutFragment = graphql(`
  fragment DeliveryReviewList_Checkout on Checkout {
    id
    email
  }
`);

interface DeliveryReviewListProps {
  checkout: FragmentType<DeliveryReviewList_CheckoutFragment>;
}

export function DeliveryReviewList({checkout}: DeliveryReviewListProps) {
  const {data, complete} = useFragment({
    fragment: DeliveryReviewList_CheckoutFragment,
    from: checkout,
  });
  const intl = useIntl();
  if (!complete) {
    return <SkeletonDeliveryReviewList />;
  }
  return (
    <ReviewList>
      {isDefined(data.email) && (
        <ReviewItem
          label={intl.formatMessage({
            id: "zFegDD",
            defaultMessage: "Contact",
          })}
          href={Routes.checkout.information}>
          <Text>{data.email}</Text>
        </ReviewItem>
      )}
      <ReviewItem
        label={intl.formatMessage({
          id: "+JsDiH",
          defaultMessage: "Ship to",
        })}
        href={Routes.checkout.information}>
        <SkeletonText />
      </ReviewItem>
    </ReviewList>
  );
}

export function SkeletonDeliveryReviewList() {
  return (
    <SkeletonReviewList>
      <SkeletonReviewItem />
      <SkeletonReviewItem />
    </SkeletonReviewList>
  );
}
