"use client";

import {type FragmentType, useFragment} from "@apollo/client";

import {SkeletonText, Text} from "#app/components/Text";
import {routes} from "#app/consts/routes";
import {graphql} from "#app/graphql/codegen";
import type {OrderReviewList_CheckoutFragment} from "#app/graphql/codegen/graphql";
import {useIntl} from "#app/i18n/react-intl";
import {isDefined} from "#app/utils/is-defined";

import {
  ReviewItem,
  ReviewList,
  SkeletonReviewItem,
  SkeletonReviewList,
} from "../../_components/ReviewList";

const OrderReviewList_CheckoutFragment = graphql(`
  fragment OrderReviewList_Checkout on Checkout {
    id
    email
  }
`);

interface OrderReviewListProps {
  checkout: FragmentType<OrderReviewList_CheckoutFragment>;
}

export function OrderReviewList({checkout}: OrderReviewListProps) {
  const {data, complete} = useFragment({
    fragment: OrderReviewList_CheckoutFragment,
    from: checkout,
  });
  const intl = useIntl();
  if (!complete) {
    return <SkeletonOrderReviewList />;
  }
  return (
    <ReviewList>
      {isDefined(data.email) && (
        <ReviewItem
          label={intl.formatMessage({
            id: "zFegDD",
            defaultMessage: "Contact",
          })}
          href={routes.checkout.information}>
          <Text>{data.email}</Text>
        </ReviewItem>
      )}
      <ReviewItem
        label={intl.formatMessage({
          id: "+JsDiH",
          defaultMessage: "Ship to",
        })}
        href={routes.checkout.information}>
        <SkeletonText />
      </ReviewItem>
      <ReviewItem
        label={intl.formatMessage({
          id: "drqP2L",
          defaultMessage: "Delivery",
        })}
        href={routes.checkout.delivery}>
        <SkeletonText />
      </ReviewItem>
    </ReviewList>
  );
}

export function SkeletonOrderReviewList() {
  return (
    <SkeletonReviewList>
      <SkeletonReviewItem />
      <SkeletonReviewItem />
      <SkeletonReviewItem />
    </SkeletonReviewList>
  );
}
